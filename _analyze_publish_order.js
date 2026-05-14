// Draft記事の関連性分析 & 公開順序リスト生成
const fs = require('fs');
const path = require('path');

// 1. manualEntriesからDraft記事を抽出
const rd = fs.readFileSync('F:/Fallout/remove_duplicates.js', 'utf8');
const m = rd.match(/const manualEntries\s*=\s*\[([\s\S]*?)\];/);
const entries = [];
if (m) {
  const lines = m[1].split('\n');
  for (const line of lines) {
    const match = line.match(/\{\s*name:\s*"([^"]+)",\s*yomi:\s*"([^"]+)",\s*url:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*appearance:\s*\[([^\]]+)\],\s*date:\s*"([^"]+)",\s*status:\s*"([^"]+)"/);
    if (match) {
      entries.push({
        name: match[1],
        url: match[3],
        category: match[4],
        appearance: match[5].replace(/"/g, '').trim(),
        status: match[7]
      });
    }
  }
}

const drafts = entries.filter(e => e.status === 'draft');
const published = entries.filter(e => e.status !== 'draft');

console.log(`Draft: ${drafts.length}件, 公開済: ${published.length}件`);

// カテゴリ別集計
const catCount = {};
drafts.forEach(d => { catCount[d.category] = (catCount[d.category] || 0) + 1; });
console.log('\nカテゴリ別Draft:');
Object.entries(catCount).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}件`));

// 2. 各Draft記事HTMLを読み込み、内部リンク(href="xxx.html")を抽出
console.log('\n=== 内部リンク分析 ===');
const linkMap = {}; // url -> [linked urls]
const locationChars = {}; // location url -> [character urls]

let scanned = 0, withLinks = 0;
for (const d of drafts) {
  const htmlPath = `F:/Fallout/${d.url}`;
  if (!fs.existsSync(htmlPath)) continue;
  
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  // 内部リンク抽出（自サイトのHTML）
  const internalLinks = [];
  const linkRegex = /href="([a-z0-9-]+\.html)"/g;
  let lm;
  while ((lm = linkRegex.exec(html)) !== null) {
    const href = lm[1];
    if (href !== 'lore.html' && href !== d.url && href !== 'index.html') {
      internalLinks.push(href);
    }
  }
  
  if (internalLinks.length > 0) {
    linkMap[d.url] = [...new Set(internalLinks)];
    withLinks++;
  }
  
  // 場所記事 → 人物の関連を構築
  if (d.category === '場所') {
    // この場所記事が参照する人物記事を特定
    const charRefs = internalLinks.filter(href => {
      const entry = entries.find(e => e.url === href);
      return entry && entry.category === '人物';
    });
    if (charRefs.length > 0) {
      locationChars[d.url] = charRefs;
    }
  }
  
  scanned++;
}

console.log(`スキャン: ${scanned}件, リンクあり: ${withLinks}件`);

// 3. 場所→人物の関連マッピング（逆引きも）
const charToLocation = {}; // character url -> [location urls]
for (const d of drafts) {
  if (d.category !== '人物') continue;
  const htmlPath = `F:/Fallout/${d.url}`;
  if (!fs.existsSync(htmlPath)) continue;
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  // Infoboxの場所情報を抽出
  const locMatch = html.match(/場所<\/span><span>([^<]+)/);
  if (locMatch) {
    const locName = locMatch[1].trim();
    // 場所名からURL候補を推定
    charToLocation[d.url] = locName;
  }
}

// 4. 公開順序グループを構築
// 場所A → 関連人物B,C,D のグループを作成
const groups = [];
const assigned = new Set();

// 場所記事をベースにグループ化
const locationDrafts = drafts.filter(d => d.category === '場所');
const charDrafts = drafts.filter(d => d.category === '人物');
const otherDrafts = drafts.filter(d => d.category !== '場所' && d.category !== '人物');

// 場所のappearance別にソート
const fo76Locations = locationDrafts.filter(d => d.appearance.includes('Fallout 76'));
const otherLocations = locationDrafts.filter(d => !d.appearance.includes('Fallout 76'));

console.log(`\n場所Draft: ${locationDrafts.length}件`);
console.log(`人物Draft: ${charDrafts.length}件`);
console.log(`その他Draft: ${otherDrafts.length}件`);

// 人物記事の所属情報を取得
const charFactions = {};
for (const d of charDrafts) {
  const htmlPath = `F:/Fallout/${d.url}`;
  if (!fs.existsSync(htmlPath)) continue;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const facMatch = html.match(/所属<\/span><span>([^<]+)/);
  if (facMatch) charFactions[d.url] = facMatch[1].trim();
}

// ファクション別に人物をグループ化
const factionGroups = {};
for (const [url, faction] of Object.entries(charFactions)) {
  if (!factionGroups[faction]) factionGroups[faction] = [];
  factionGroups[faction].push(url);
}

console.log('\n=== ファクション別人物グループ ===');
Object.entries(factionGroups).sort((a,b) => b[1].length - a[1].length).forEach(([k,v]) => {
  console.log(`  ${k}: ${v.length}件`);
});

// 5. 推奨公開順序を生成
const publishOrder = [];

// まず場所記事 → 関連ファクションの人物という順序で
// 場所をリージョン順にソート
const regionOrder = ['フォレスト', 'アッシュヒープ', '荒れた大地', 'サヴェージ・ディバイド', 'クランベリー湿原', '積灰の山'];

// ファクション順
const factionOrder = [
  'レスポンダーズ', 'ブラザーフッド・オブ・スティール', 'フリー・ステイツ', 'レイダー',
  'エンクレイヴ', 'Vault 76', 'ホワイトスプリング・リゾート',
  'レイダー（クレーター）', '入植者（ファウンデーション）', 'シークレットサービス',
  'ウェイワード', 'ブルーリッジ・キャラバン', 'フリー・ラジカルズ', 'アンカー農場',
  'ブラッドイーグルズ', 'B.O.S.（アトラス砦）', 'Steel Dawn / Steel Reign',
  'Vault 96', 'モスマン教団', 'ファスナハト', 'ホワイトスプリング・レフュージ',
  'Expeditions: The Pitt', 'Nuka-World on Tour', 'Once in a Blue Moon',
  'Gleaming Depths', 'Ghoul Within', 'Gone Fission', 'Milepost Zero',
  'Burning Springs', 'Miscellaneous', 'Wild Appalachia', 'Wastelanders',
  'Steel Dawn', 'Test Your Metal', 'Invaders from Beyond', 'Nuclear Winter',
  'Mutation Invasion',
];

// JSON出力
const output = {
  summary: {
    totalDrafts: drafts.length,
    locations: locationDrafts.length,
    characters: charDrafts.length,
    others: otherDrafts.length,
    withInternalLinks: withLinks,
  },
  factionGroups: Object.fromEntries(
    Object.entries(factionGroups).sort((a,b) => {
      const ai = factionOrder.indexOf(a[0]);
      const bi = factionOrder.indexOf(b[0]);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    }).map(([k,v]) => [k, v.map(u => {
      const e = entries.find(e => e.url === u);
      return e ? e.name : u;
    })])
  ),
  locationToCharacters: locationChars,
  characterLocations: charToLocation,
};

fs.writeFileSync('F:/Fallout/_publish_order.json', JSON.stringify(output, null, 2), 'utf8');
console.log('\n✅ _publish_order.json 保存完了');
