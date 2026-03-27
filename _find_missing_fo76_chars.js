// Fallout 76 キャラクターリスト抽出＆既存記事との照合
const fs = require('fs');
const path = require('path');

const wikitext = fs.readFileSync('F:/Fallout/_fo76_chars_wikitext.txt', 'utf8');

// [[キャラクター名]]のパターンを全て抽出
const linkPattern = /\[\[([^\]|]+?)(?:\|[^\]]+?)?\]\]/g;
const allLinks = new Set();
let match;
while ((match = linkPattern.exec(wikitext)) !== null) {
  const name = match[1].trim();
  // カテゴリリンクや画像リンクを除外
  if (name.startsWith('Category:') || name.startsWith('File:') || 
      name.startsWith(':Category') || name.startsWith('#') ||
      name.startsWith('Fallout 76') || name.startsWith('Wastelanders') ||
      name.startsWith('Steel Dawn') || name.startsWith('Steel Reign') ||
      name.startsWith('Expeditions') || name.startsWith('Skyline Valley') ||
      name.startsWith('Gleaming Depths') || name.startsWith('Burning Springs') ||
      name.startsWith('Nuka-World') || name.startsWith('Atlantic City') ||
      name.startsWith('Night of the Moth') || name.startsWith('Once in a Blue Moon') ||
      name.startsWith('Locked ') || name.startsWith('Milepost') ||
      name.startsWith('The Ritual') || name === 'characters') continue;
  allLinks.add(name);
}

console.log(`Wiki上のリンク数: ${allLinks.size}`);

// 既存HTMLファイル一覧を取得
const existingFiles = fs.readdirSync('F:/Fallout')
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', ''));

// loreEntries.jsonからも既存記事名を取得
let existingNames = new Set();
if (fs.existsSync('F:/Fallout/loreEntries.json')) {
  const entries = JSON.parse(fs.readFileSync('F:/Fallout/loreEntries.json', 'utf8'));
  entries.forEach(e => {
    existingNames.add(e.name);
    existingNames.add(e.url.replace('.html', ''));
  });
}

// URLスラッグ化関数
function slugify(name) {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/'/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 照合
const missing = [];
const existing = [];
const nonCharacter = ['Fallout 76', 'Vault-Tec Corporation', 'Raiders', 'Cult of the Mothman',
  'Brotherhood of Steel', 'Enclave', 'New California Republic', 'Free States',
  'Appalachian Brotherhood of Steel', 'Blue Ridge Caravan Company', 'Blood Eagles',
  'Order of Mysteries', 'Responders', 'Secret Service', 'Settlers', 'Super mutant',
  'Robot', 'Note', 'Holotape', 'Terminal', 'Quest', 'Event', 'Location', 'Weapon',
  'Armor', 'Perk', 'Mutation', 'Disease', 'Bug', 'Patch', 'Update'];

for (const name of allLinks) {
  // 非キャラクターリンクを除外
  if (nonCharacter.some(nc => name.startsWith(nc))) continue;
  
  const slug = slugify(name);
  const isExisting = existingFiles.includes(slug) || 
    existingFiles.some(f => f.includes(slug) || slug.includes(f)) ||
    existingNames.has(name);
  
  if (isExisting) {
    existing.push(name);
  } else {
    missing.push(name);
  }
}

// セクションごとに分類（Wikitextからセクション構成を取得）
const sections = wikitext.match(/^==.+==$/gm) || [];
console.log('\n=== セクション構成 ===');
sections.slice(0, 30).forEach(s => console.log(s));

console.log(`\n=== 結果 ===`);
console.log(`既存: ${existing.length}件`);
console.log(`未記事化: ${missing.length}件`);

// 主要な未記事化キャラクターを絞り込む
// Wikitextで「人物」として言及されているものを優先
const charPatterns = ['* [[', '*[['];
const charLines = wikitext.split('\n').filter(line => 
  charPatterns.some(p => line.trim().startsWith(p)) && 
  !line.includes('Category:') && !line.includes('File:')
);

const charNames = new Set();
charLines.forEach(line => {
  const m = line.match(/\[\[([^\]|]+?)(?:\|[^\]]+?)?\]\]/);
  if (m) charNames.add(m[1].trim());
});

const missingChars = [...charNames].filter(name => {
  const slug = slugify(name);
  const isExisting = existingFiles.includes(slug) || 
    existingFiles.some(f => f.includes(slug.split('-')[0]) && f.includes(slug.split('-').pop()));
  return !isExisting;
}).filter(name => {
  // 一般用語やゲームタイトルなどを除外
  return !name.startsWith('Fallout') && !name.startsWith('Category') &&
    !name.startsWith('File:') && !name.includes('update') &&
    name.length > 2;
});

console.log(`\n=== 未記事化キャラクター候補（リストアイテムのみ） ===`);
console.log(`候補数: ${missingChars.length}件`);
missingChars.sort();
missingChars.forEach(c => console.log('  ' + c));

// JSONファイルに保存
fs.writeFileSync('F:/Fallout/_fo76_missing_chars.json', JSON.stringify(missingChars, null, 2), 'utf8');
