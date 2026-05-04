/**
 * lore.html内のloreEntriesで英語名のままになっているエントリを
 * 各記事HTMLファイルの<title>タグから日本語名を取得し修正するスクリプト
 */
const fs = require('fs');

// lore.htmlの内容を読み込み
const loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf8');

// loreEntries部分を抽出
const m = loreHtml.match(/const loreEntries = \[([\s\S]*?)\];/);
if (!m) { console.error('loreEntries not found'); process.exit(1); }

const entriesBlock = m[1];
const lines = entriesBlock.split('\n');

// name行を見つけて、英語名かどうかチェック
// 英語名: ASCII文字のみ（日本語を含まない）
function isEnglishOnly(str) {
    return /^[A-Za-z0-9\s\-\'\.\,\(\)\!\?\&\/\:\|\#\"\;\+\=\[\]\{\}\_\~\`\@\$\%\^\*\\]+$/.test(str);
}

// 各記事HTMLの<title>から日本語名を取得
function getJapaneseTitle(url) {
    const filePath = 'f:/Fallout/' + url;
    if (!fs.existsSync(filePath)) return null;
    
    try {
        const html = fs.readFileSync(filePath, 'utf8');
        
        // <title>タグから取得 (通常フォーマット: "記事名 | サイト名")
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch) {
            let title = titleMatch[1].trim();
            // " | Overseer Mohi's Terminal" などのサフィックスを除去
            title = title.replace(/\s*[\|｜]\s*Overseer.*$/i, '').trim();
            title = title.replace(/\s*[\|｜]\s*監督官モヒ.*$/i, '').trim();
            // "- Fallout 76 Wiki" 系のサフィックスも除去
            title = title.replace(/\s*[-–]\s*Fallout.*$/i, '').trim();
            
            if (title && !isEnglishOnly(title)) {
                return title;
            }
        }
        
        // <h1>タグからも取得を試みる
        const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
        if (h1Match) {
            let h1 = h1Match[1].trim();
            if (h1 && !isEnglishOnly(h1)) {
                return h1;
            }
        }
        
        // infobox-titleからも取得を試みる
        const infoboxMatch = html.match(/<div class="infobox-title">\s*([^<]+)\s*<\/div>/i);
        if (infoboxMatch) {
            let infoTitle = infoboxMatch[1].trim();
            if (infoTitle && !isEnglishOnly(infoTitle)) {
                return infoTitle;
            }
        }
        
        return null;
    } catch(e) {
        return null;
    }
}

// エントリを解析して修正
let updatedContent = entriesBlock;
let fixedCount = 0;
let failedNames = [];

// name:とurl:のペアを検出
const entryRegex = /name:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"/g;
let match;

while ((match = entryRegex.exec(entriesBlock)) !== null) {
    const currentName = match[1];
    const url = match[2];
    
    if (!isEnglishOnly(currentName)) continue; // 既に日本語
    
    const jpName = getJapaneseTitle(url);
    if (jpName) {
        // 置換を実行（name行の値のみ）
        // 正確にこの特定のname-url組み合わせを置き換えるため、
        // マッチした前後のテキストを使う
        const oldNameStr = `name: "${currentName}"`;
        const newNameStr = `name: "${jpName}"`;
        
        // この特定のエントリのみ置換（最初の出現）
        const idx = updatedContent.indexOf(oldNameStr);
        if (idx !== -1) {
            updatedContent = updatedContent.substring(0, idx) + newNameStr + updatedContent.substring(idx + oldNameStr.length);
            fixedCount++;
            console.log(`[Fixed] ${currentName} -> ${jpName}`);
        }
    } else {
        failedNames.push({ name: currentName, url });
    }
}

// lore.htmlを更新
const newLoreHtml = loreHtml.replace(
    /const loreEntries = \[([\s\S]*?)\];/,
    `const loreEntries = [${updatedContent}];`
);

fs.writeFileSync('f:/Fallout/lore.html', newLoreHtml);

console.log(`\n========== SUMMARY ==========`);
console.log(`Fixed: ${fixedCount} entries`);
console.log(`Failed (no JP title found): ${failedNames.length} entries`);
if (failedNames.length > 0) {
    console.log('\nEntries still in English:');
    failedNames.forEach(e => console.log(`  - ${e.name} (${e.url})`));
}
