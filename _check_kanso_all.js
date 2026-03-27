// 全Draft記事の感想セクション有無を確認
const fs = require('fs');
const path = require('path');

// remove_duplicates.jsからmanualEntriesを抽出
const src = fs.readFileSync('F:/Fallout/remove_duplicates.js', 'utf8');
const start = src.indexOf('const manualEntries = [');
const end = src.indexOf('];', start) + 2;
const block = src.substring(start, end).replace('const manualEntries', 'var manualEntries');

// eval で抽出
eval(block);

const drafts = manualEntries.filter(e => e.status === 'draft');
console.log(`Draft記事総数: ${drafts.length}件\n`);

let missing = [];
let ok = 0;
let notFound = [];

drafts.forEach(e => {
  const p = path.join('F:/Fallout', e.url);
  if (!fs.existsSync(p)) {
    notFound.push(`${e.name} (${e.url}) — ファイルなし`);
    return;
  }
  const c = fs.readFileSync(p, 'utf8');
  if (!c.includes('感想')) {
    missing.push(`${e.name} (${e.url})`);
  } else {
    ok++;
  }
});

console.log(`✅ 感想あり: ${ok}件`);
console.log(`❌ 感想なし: ${missing.length}件`);
if (missing.length > 0) {
  console.log('\n--- 感想なしの記事 ---');
  missing.forEach(m => console.log('  - ' + m));
}
if (notFound.length > 0) {
  console.log(`\n⚠️ ファイル未検出: ${notFound.length}件`);
  notFound.forEach(m => console.log('  - ' + m));
}
