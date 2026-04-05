/**
 * 全TV記事の著作権リンクを修正するスクリプト
 * Ava_West → 正しいWikiページ名に置換
 */
const fs = require('fs');
const path = require('path');

const dir = 'f:/Fallout';
const files = fs.readdirSync(dir).filter(f => 
    f.endsWith('.html') && f !== 'ava-west.html' && !f.startsWith('_') && !f.startsWith('admin')
);

let fixedCount = 0;
let errorCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    if (!html.includes('Ava_West')) continue;
    
    // ファイル名からWikiページ名を推定
    // 例: siggi-wilzig.html → Siggi_Wilzig
    //     tom-tv-series.html → Tom_(TV_series)
    const slug = file.replace('.html', '');
    
    // スラッグからWikiページ名を生成
    let wikiName = slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join('_');
    
    // 特殊ケースの処理
    // tv-series → (TV_series) 形式
    wikiName = wikiName.replace(/_Tv_Series$/, '_(TV_series)');
    wikiName = wikiName.replace(/_Tv$/, '_(TV)');
    // fallout-76 系
    wikiName = wikiName.replace(/_Fallout_76$/, '_(Fallout_76)');
    
    // 著作権リンクを修正
    const oldLink = `https://fallout.fandom.com/wiki/Ava_West`;
    const newLink = `https://fallout.fandom.com/wiki/${wikiName}`;
    
    // 表示テキストも修正（"Ava West" → 記事の英語名）
    // まずinfoboxのh3から英語名を取得
    const h3Match = html.match(/<h3[^>]*>([^<]+)<\/h3>/);
    const enName = h3Match ? h3Match[1].trim() : wikiName.replace(/_/g, ' ');
    
    // 著作権部分を置換
    html = html.replace(
        /href="https:\/\/fallout\.fandom\.com\/wiki\/Ava_West"/g,
        `href="${newLink}"`
    );
    html = html.replace(
        />Ava West<\/a> from/g,
        `>${enName}</a> from`
    );
    // "Siggi Wilzig" 等の表示テキストが既に入っている場合は置き換えない
    html = html.replace(
        />Siggi Wilzig<\/a> from/g,
        `>${enName}</a> from`
    );

    fs.writeFileSync(filePath, html);
    fixedCount++;
    console.log(`[Fixed] ${file} → wiki/${wikiName}`);
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Fixed: ${fixedCount} files`);
console.log(`Errors: ${errorCount} files`);
