// Fallout 76 キャラクター完全抽出 - セクションごとの箇条書きリンクを解析
const fs = require('fs');

const wikitext = fs.readFileSync('F:/Fallout/_fo76_chars_wikitext.txt', 'utf8');

// Wiki箇条書きリスト行からキャラクター名を抽出
// パターン: * [[Character Name]] or * [[Character Name|Display Name]] - ...
const lines = wikitext.split('\n');
const charMap = {}; // name -> { section, line }
let currentSection = '';

for (const line of lines) {
  const secMatch = line.match(/^(={2,})\s*(.+?)\s*\1/);
  if (secMatch) {
    currentSection = secMatch[2].replace(/\[\[.+?\|(.+?)\]\]/g, '$1').replace(/\[\[(.+?)\]\]/g, '$1');
    continue;
  }
  
  // 箇条書きリンク行のみ（キャラクターリスト行）
  if (!line.trim().startsWith('*')) continue;
  
  // 最初のリンクを取得（キャラクター名）
  const linkMatch = line.match(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/);
  if (!linkMatch) continue;
  
  const wikiName = linkMatch[1].trim();
  const displayName = linkMatch[2] ? linkMatch[2].trim() : wikiName;
  
  // 非キャラクター除外
  if (wikiName.startsWith('File:') || wikiName.startsWith('Category:') ||
      wikiName.startsWith('#') || wikiName.includes('update') ||
      wikiName.length < 3) continue;
  
  charMap[wikiName] = { section: currentSection, displayName };
}

console.log(`抽出キャラクター数: ${Object.keys(charMap).length}`);

// 既存ファイル確認
const existingFiles = fs.readdirSync('F:/Fallout')
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', ''));

// URL slug化
function slugify(name) {
  return name.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[()'']/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// キャラ名→記事slug対応（よくある変換パターン）
function findExistingSlug(wikiName) {
  const slug = slugify(wikiName);
  // 完全一致
  if (existingFiles.includes(slug)) return slug;
  // Fallout 76サフィックス除去
  const noSuffix = slug.replace(/-fallout-76$/, '').replace(/-fo76$/, '');
  if (existingFiles.includes(noSuffix)) return noSuffix;
  // _付きパターン
  const underscore = slug.replace(/-/g, '_');
  if (existingFiles.includes(underscore)) return underscore;
  // -fo76付きパターン
  if (existingFiles.includes(noSuffix + '-fo76')) return noSuffix + '-fo76';
  // 部分一致（名前の主要部分）
  const mainPart = slug.split('-')[0];
  if (mainPart.length >= 4) {
    const partial = existingFiles.find(f => f.startsWith(mainPart) && f.length < slug.length + 10);
    if (partial) return partial;
  }
  return null;
}

const missing = [];
const existing = [];

for (const [wikiName, info] of Object.entries(charMap)) {
  const found = findExistingSlug(wikiName);
  if (found) {
    existing.push({ name: wikiName, slug: found, section: info.section });
  } else {
    missing.push({ name: wikiName, section: info.section, displayName: info.displayName });
  }
}

console.log(`既存: ${existing.length}件`);
console.log(`未記事化: ${missing.length}件`);

// セクション別にまとめて出力
const bySec = {};
for (const m of missing) {
  if (!bySec[m.section]) bySec[m.section] = [];
  bySec[m.section].push(m.name);
}

console.log('\n=== セクション別 未記事化キャラクター ===');
for (const [sec, names] of Object.entries(bySec)) {
  console.log(`\n[${sec}] (${names.length}件)`);
  names.forEach(n => console.log(`  ${n}`));
}

// 全体のリストをJSONに保存
fs.writeFileSync('F:/Fallout/_fo76_missing_chars.json', JSON.stringify(missing, null, 2), 'utf8');
console.log(`\n保存完了: _fo76_missing_chars.json (${missing.length}件)`);
