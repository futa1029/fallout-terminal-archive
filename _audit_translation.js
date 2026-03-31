// 翻訳品質監査スクリプト
// 各記事を分析し、翻訳状態と品質の問題を検出する
const fs = require('fs');
const files = fs.readdirSync('./').filter(f => 
    f.endsWith('.html') && 
    !f.startsWith('_') && 
    !['lore.html','index.html','about.html','donate.html','rules.html','admin.html','admin-drafts.html','f76.html','nw.html','fo76-guide.html','resources.html','season.html'].includes(f)
);

const results = { broken: [], noHolotapeCheck: [], genericQuote: [], good: [] };

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(/<main class="content">([\s\S]*?)<\/main>/);
    if (!match) continue;
    
    const mainContent = match[1];
    // コメントセクションとcopyrightを除外
    let bodyText = mainContent
        .replace(/<div class="comments-section"[\s\S]*$/, '')
        .replace(/<div style="margin-top: 30px;[\s\S]*?<\/div>/, '')
        .replace(/<p name="copyright-default">[\s\S]*?<\/p>/, '');
    
    // HTMLタグを除外
    const plainText = bodyText.replace(/<[^>]+>/g, '');
    
    // 壊れた翻訳パターンの検出（英語と日本語が混在した壊れた文）
    const brokenPatterns = [
        /は[\w\s]+にある[\w\s]+です/,          // 「は...にある...です」パターン
        /にある(unmarked |marked )?ロケーション/,
        /付近で見つけることができます$/m,      // 文末の定型文
        /入手できます[\s\S]*?nearby/,
        /'''[\w\s.']+'''/,                      // Wiki記法の残骸
        /はthe [a-z]/i,                         // 「はthe ...」
        /にある(reference|location|home|farm|house|building)/i,
    ];
    
    let isBroken = false;
    for (const pattern of brokenPatterns) {
        if (pattern.test(plainText)) {
            isBroken = true;
            break;
        }
    }
    
    // ギャラリーキャプションが英語のままか
    const engCaptions = (bodyText.match(/<div class="caption">img [a-z0-9_]+<\/div>/gi) || []).length;
    
    // 英語テキストの比率チェック（タグ除去後）
    const englishChars = (plainText.match(/[A-Za-z]/g) || []).length;
    const japaneseChars = (plainText.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) || []).length;
    const enRatio = japaneseChars > 0 ? englishChars / japaneseChars : 999;
    
    // 感想がテンプレのままか
    const genericQuotePatterns = [
        'アパラチアの歴史の一端に触れることができます',
        'Vault-Tecの実験施設は、いつ訪れてもゾクゾクする発見があります',
        'ウエイストランドの中でも印象的なロケーションです',
        'ベセスダの環境デザインチームの丁寧な仕事が',
        '探索を続けるほどに新しい発見がある——それがアパラチアの冒険の魅力です',
        'ターミナルやメモに残された記録を読み解いていくと',
    ];
    const hasGenericQuote = genericQuotePatterns.some(p => plainText.includes(p));
    
    // 分類
    if (isBroken || enRatio > 0.5) {
        results.broken.push({ file, en: englishChars, ja: japaneseChars, engCaptions, isBroken, hasGenericQuote });
    } else if (hasGenericQuote) {
        results.genericQuote.push({ file, en: englishChars, ja: japaneseChars, engCaptions, hasGenericQuote });
    } else if (engCaptions > 0) {
        // ギャラリーキャプション英語のみ
        results.genericQuote.push({ file, en: englishChars, ja: japaneseChars, engCaptions, hasGenericQuote });
    } else {
        results.good.push(file);
    }
}

console.log(`=== 翻訳品質監査結果 ===`);
console.log(`壊れた翻訳/未翻訳: ${results.broken.length}件`);
console.log(`テンプレ感想/英語キャプション: ${results.genericQuote.length}件`);
console.log(`問題なし: ${results.good.length}件`);
console.log(`\n--- 壊れた翻訳（優先修正） ---`);
results.broken.slice(0, 30).forEach(r => console.log(`  ${r.file} (EN:${r.en} JA:${r.ja} broken:${r.isBroken} generic:${r.hasGenericQuote} engCap:${r.engCaptions})`));
if (results.broken.length > 30) console.log(`  ...他 ${results.broken.length - 30}件`);

// ファイルに出力
const output = {
    broken: results.broken.map(r => r.file),
    genericQuote: results.genericQuote.map(r => r.file),
    good: results.good,
    summary: {
        broken: results.broken.length,
        genericQuote: results.genericQuote.length,
        good: results.good.length,
        total: files.length
    }
};
fs.writeFileSync('_audit_translation_result.json', JSON.stringify(output, null, 2));
console.log(`\n結果を _audit_translation_result.json に保存しました。`);
