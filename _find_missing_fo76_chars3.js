// Fallout 76 キャラクター完全抽出（テーブル形式対応）
const fs = require('fs');

const wikitext = fs.readFileSync('F:/Fallout/_fo76_chars_wikitext.txt', 'utf8');
const lines = wikitext.split('\n');

// テーブル行からキャラクター名を抽出
// パターン: | [[Character Name|Display Name]] or | [[Character Name]]
let currentSection = '';
const characters = [];

for (const line of lines) {
  const secMatch = line.match(/^(={2,})\s*(.+?)\s*\1/);
  if (secMatch) {
    currentSection = secMatch[2].replace(/\[\[.+?\|(.+?)\]\]/g, '$1').replace(/\[\[(.+?)\]\]/g, '$1').trim();
    continue;
  }
  // テーブルの名前列（最初の |）にあるリンク
  const trimmed = line.trim();
  if (trimmed.startsWith('| [[') || trimmed.startsWith('|[[')) {
    const m = trimmed.match(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/);
    if (m) {
      const wikiName = m[1].trim();
      const displayName = m[2] ? m[2].trim() : wikiName;
      // 除外: Dialogue, Form ID, Location系
      if (wikiName.includes('/Dialogue') || wikiName === 'Form ID' || 
          wikiName.startsWith('File:') || wikiName.startsWith('Category:')) continue;
      characters.push({ wikiName, displayName, section: currentSection });
    }
  }
}

console.log('抽出キャラクター数: ' + characters.length);

// 既存ファイル確認
const existingFiles = new Set(
  fs.readdirSync('F:/Fallout')
    .filter(f => f.endsWith('.html'))
    .map(f => f.replace('.html', ''))
);

// 既存loreEntriesのURL確認
let existingUrls = new Set();
if (fs.existsSync('F:/Fallout/loreEntries.json')) {
  const entries = JSON.parse(fs.readFileSync('F:/Fallout/loreEntries.json', 'utf8'));
  entries.forEach(e => existingUrls.add(e.url.replace('.html', '')));
}

function slugify(name) {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()''""]/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 照合
const missing = [];
const existing = [];
const seen = new Set();

for (const c of characters) {
  if (seen.has(c.wikiName)) continue;
  seen.add(c.wikiName);
  
  const slug = slugify(c.wikiName);
  // より広い照合ロジック
  const found = existingFiles.has(slug) || existingUrls.has(slug) ||
    [...existingFiles].some(f => {
      // 部分一致（メイン名部分）
      const mainName = slug.replace(/-fallout-76$/, '').replace(/-fo76$/, '');
      return f === mainName || f === mainName + '-fo76' || f === slug.replace(/-/g, '_');
    });
  
  if (found) {
    existing.push(c);
  } else {
    missing.push(c);
  }
}

console.log('既存: ' + existing.length + '件');
console.log('未記事化: ' + missing.length + '件');

// セクション別集計
const bySec = {};
for (const m of missing) {
  if (!bySec[m.section]) bySec[m.section] = [];
  bySec[m.section].push(m);
}

console.log('\n=== セクション別 未記事化キャラクター ===');
for (const [sec, chars] of Object.entries(bySec)) {
  console.log('\n[' + sec + '] (' + chars.length + '件)');
  chars.forEach(c => console.log('  ' + c.wikiName + (c.displayName !== c.wikiName ? ' (' + c.displayName + ')' : '')));
}

// JSONに保存
fs.writeFileSync('F:/Fallout/_fo76_missing_chars.json', JSON.stringify(missing, null, 2), 'utf8');
console.log('\n保存完了: ' + missing.length + '件');
