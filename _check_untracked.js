/**
 * 未追跡HTMLファイルと lore.html エントリのクロスチェック
 */
const fs = require('fs');
const { execSync } = require('child_process');

// lore.html から全URLを抽出
const lore = fs.readFileSync('lore.html', 'utf8');
const loreUrls = new Set([...lore.matchAll(/url:\s*["']([^"']+)["']/g)].map(m => m[1]));
console.log(`lore.html 登録URL数: ${loreUrls.size}`);

// git 未追跡ファイル一覧を取得
const untrackedRaw = execSync('git ls-files --others --exclude-standard', { encoding: 'utf8' });
const untrackedHtml = untrackedRaw.trim().split('\n')
    .filter(f => f.endsWith('.html') && !f.includes('/') && !f.includes('backup') && !f.startsWith('_'));

console.log(`未コミットHTMLファイル: ${untrackedHtml.length}`);

// クロスチェック
const inIndex = untrackedHtml.filter(f => loreUrls.has(f));
const notInIndex = untrackedHtml.filter(f => !loreUrls.has(f));

console.log(`  lore.htmlに登録済み（コミットだけ未実施）: ${inIndex.length}`);
console.log(`  lore.htmlにもインデックス未登録: ${notInIndex.length}`);

if (notInIndex.length > 0) {
    console.log(`\n=== lore.htmlに未登録のファイル（最大30件） ===`);
    notInIndex.slice(0, 30).forEach(f => console.log(`  ${f}`));
}

// FO3/FO4/NV/TV の未登録ファイルがあるかチェック
// ファイルのbodyタグからappearance属性を読む
let fo3Count = 0, fo4Count = 0, nvCount = 0, tvCount = 0, otherCount = 0;
for (const f of notInIndex) {
    try {
        const head = fs.readFileSync(f, 'utf8').substring(0, 2000);
        if (head.includes('Fallout 3')) fo3Count++;
        else if (head.includes('Fallout 4')) fo4Count++;
        else if (head.includes('New Vegas')) nvCount++;
        else if (head.includes('Fallout TV')) tvCount++;
        else otherCount++;
    } catch(e) {
        otherCount++;
    }
}
console.log(`\n=== 未登録ファイルの内訳 ===`);
console.log(`  Fallout 3: ${fo3Count}`);
console.log(`  Fallout 4: ${fo4Count}`);
console.log(`  New Vegas: ${nvCount}`);
console.log(`  Fallout TV: ${tvCount}`);
console.log(`  その他: ${otherCount}`);
