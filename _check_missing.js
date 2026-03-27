// 全地域のWikiロケーションとローカルHTMLファイルを照合するスクリプト
const fs = require('fs');
const path = require('path');

// ローカルのHTMLファイル一覧を取得
const htmlFiles = fs.readdirSync('F:\\Fallout')
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', '').toLowerCase());

// title_to_slug.jsonを読み込み
let slugMap = {};
try {
  slugMap = JSON.parse(fs.readFileSync('F:\\Fallout\\title_to_slug.json', 'utf8'));
} catch(e) {
  console.log('Warning: title_to_slug.json読み込みエラー');
}

// remove_duplicates.jsからmanualEntriesのurlを抽出
const rdContent = fs.readFileSync('F:\\Fallout\\remove_duplicates.js', 'utf8');
const urlMatches = rdContent.match(/url:\s*["']([^"']+)["']/g) || [];
const registeredUrls = urlMatches.map(m => {
  const match = m.match(/url:\s*["']([^"']+)["']/);
  return match ? match[1].replace('.html', '').toLowerCase() : '';
}).filter(Boolean);

// 各地域のカテゴリメンバーを読み込む
const regions = [
  { name: '森林地帯 (The Forest)', file: 'C:\\Users\\futa1\\.gemini\\antigravity\\brain\\317d330d-388a-410b-b102-74162ca295ba\\.system_generated\\steps\\65\\content.md' },
  { name: '積灰の山 (Ash Heap)', file: 'C:\\Users\\futa1\\.gemini\\antigravity\\brain\\317d330d-388a-410b-b102-74162ca295ba\\.system_generated\\steps\\66\\content.md' },
  { name: '毒の峡谷 (Toxic Valley)', file: 'C:\\Users\\futa1\\.gemini\\antigravity\\brain\\317d330d-388a-410b-b102-74162ca295ba\\.system_generated\\steps\\67\\content.md' },
  { name: '荒れた境域 (Savage Divide)', file: 'C:\\Users\\futa1\\.gemini\\antigravity\\brain\\317d330d-388a-410b-b102-74162ca295ba\\.system_generated\\steps\\68\\content.md' },
  { name: '沼地地帯 (The Mire)', file: 'C:\\Users\\futa1\\.gemini\\antigravity\\brain\\317d330d-388a-410b-b102-74162ca295ba\\.system_generated\\steps\\69\\content.md' },
  { name: 'クランベリー湿原 (Cranberry Bog)', file: 'C:\\Users\\futa1\\.gemini\\antigravity\\brain\\317d330d-388a-410b-b102-74162ca295ba\\.system_generated\\steps\\70\\content.md' },
  { name: 'スカイライン・バレー (Skyline Valley)', file: 'C:\\Users\\futa1\\.gemini\\antigravity\\brain\\317d330d-388a-410b-b102-74162ca295ba\\.system_generated\\steps\\71\\content.md' },
  { name: 'バーニング・スプリングス (Burning Springs)', file: 'C:\\Users\\futa1\\.gemini\\antigravity\\brain\\317d330d-388a-410b-b102-74162ca295ba\\.system_generated\\steps\\50\\content.md' },
];

let totalMissing = 0;

for (const region of regions) {
  try {
    const raw = fs.readFileSync(region.file, 'utf8');
    // JSONの部分を抽出
    const jsonMatch = raw.match(/\{.*\}/s);
    if (!jsonMatch) continue;
    
    const data = JSON.parse(jsonMatch[0]);
    const members = data.query.categorymembers
      .filter(m => m.ns === 0) // 記事のみ（カテゴリは除外）
      .map(m => m.title);
    
    // 地域ページ自体やカテゴリを除外
    const skipTitles = [
      'The Forest (region)', 'Ash Heap (region)', 'Toxic Valley (region)',
      'Savage Divide (region)', 'The Mire (region)', 'Cranberry Bog (region)',
      'Skyline Valley (region)', 'Burning Springs (region)',
      'The Forest', 'Ash Heap', 'Toxic Valley', 'Savage Divide', 'The Mire',
      'Cranberry Bog', 'Skyline Valley', 'Burning Springs'
    ];
    
    const locations = members.filter(t => !skipTitles.includes(t));
    
    const missing = [];
    for (const loc of locations) {
      // slugMapで確認
      if (slugMap[loc]) {
        const slug = slugMap[loc].toLowerCase();
        if (htmlFiles.includes(slug) || registeredUrls.includes(slug)) continue;
      }
      
      // ファイル名を推測して確認
      const slug = loc
        .replace(/\s*\([^)]*\)\s*/g, '') // 括弧を除去
        .replace(/['']/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase();
      
      const variations = [
        slug,
        slug + '-bs',
        slug.replace('the-', ''),
        loc.replace(/\s*\([^)]*\)\s*/g, '-').replace(/['']/g, '').replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').replace(/-+/g, '-').replace(/-$/, '').toLowerCase(),
      ];
      
      let found = false;
      for (const v of variations) {
        if (htmlFiles.includes(v) || htmlFiles.some(h => h.includes(v) || v.includes(h))) {
          found = true;
          break;
        }
        if (registeredUrls.includes(v) || registeredUrls.some(r => r.includes(v) || v.includes(r))) {
          found = true;
          break;
        }
      }
      
      if (!found) {
        missing.push(loc);
      }
    }
    
    if (missing.length > 0) {
      console.log(`\n=== ${region.name} — 不足: ${missing.length}件 ===`);
      missing.forEach(m => console.log(`  - ${m}`));
      totalMissing += missing.length;
    } else {
      console.log(`✅ ${region.name} — 完了（${locations.length}件）`);
    }
  } catch(e) {
    console.log(`❌ ${region.name}: エラー — ${e.message}`);
  }
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`合計不足: ${totalMissing}件`);
