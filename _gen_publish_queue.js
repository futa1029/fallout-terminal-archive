// 公開順序リスト生成 - ファクション/地域ベースでグループ化
const fs = require('fs');

// manualEntriesからDraft記事を抽出
const rd = fs.readFileSync('F:/Fallout/remove_duplicates.js', 'utf8');
const entries = [];
const regex = /\{\s*name:\s*"([^"]+)",\s*yomi:\s*"([^"]*)",\s*url:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*appearance:\s*\[([^\]]*)\],\s*date:\s*"([^"]*)",\s*status:\s*"([^"]+)"\s*\}/g;
let m;
while ((m = regex.exec(rd)) !== null) {
  entries.push({ name: m[1], url: m[3], category: m[4], appearance: m[5].replace(/"/g,'').trim(), status: m[7] });
}

const drafts = entries.filter(e => e.status === 'draft');
const urlToEntry = {};
entries.forEach(e => urlToEntry[e.url] = e);

// 各記事のHTML解析: 所属・場所情報と内部リンクを抽出
const articleMeta = {};
for (const d of drafts) {
  const fp = `F:/Fallout/${d.url}`;
  if (!fs.existsSync(fp)) continue;
  const html = fs.readFileSync(fp, 'utf8');
  
  const faction = (html.match(/所属<\/span><span>([^<]+)/) || [])[1] || '';
  const location = (html.match(/場所<\/span><span>([^<]+)/) || [])[1] || '';
  
  // 内部リンク
  const links = [];
  const lr = /href="([a-z0-9_-]+\.html)"/g;
  let lm;
  while ((lm = lr.exec(html)) !== null) {
    if (lm[1] !== 'lore.html' && lm[1] !== d.url) links.push(lm[1]);
  }
  
  articleMeta[d.url] = { ...d, faction, location, links: [...new Set(links)] };
}

// ファクション別グループ化（人物）
const factionGroups = {};
const locationArticles = [];
const creatureArticles = [];
const otherArticles = [];

for (const [url, meta] of Object.entries(articleMeta)) {
  if (meta.category === '人物') {
    const key = meta.faction || 'その他';
    if (!factionGroups[key]) factionGroups[key] = [];
    factionGroups[key].push(meta);
  } else if (meta.category === '場所' || meta.category === 'ロケーション') {
    locationArticles.push(meta);
  } else if (meta.category === 'クリーチャー') {
    creatureArticles.push(meta);
  } else {
    otherArticles.push(meta);
  }
}

// 公開順序リストをMarkdown形式で生成
let md = `# Fallout 76 Draft記事 公開キュー\n\n`;
md += `> 生成日: ${new Date().toISOString().split('T')[0]}\n`;
md += `> 総Draft数: ${drafts.length}件\n\n`;
md += `## 使い方\n\n`;
md += `記事を公開する際は以下のコマンドを実行:\n\n`;
md += '```\nnode _publish.js <slug>       # 単一記事を公開\n';
md += 'node _publish.js --group <N>  # グループN番を一括公開\n```\n\n';
md += `---\n\n`;

// ファクション順序定義
const factionOrder = [
  // Base game
  'レスポンダーズ','ブラザーフッド・オブ・スティール','フリー・ステイツ','レイダー','エンクレイヴ','Vault 76','ホワイトスプリング・リゾート',
  // Wastelanders
  'レイダー（クレーター）','入植者（ファウンデーション）','シークレットサービス','ウェイワード','ブルーリッジ・キャラバン','フリー・ラジカルズ','アンカー農場','ブラッドイーグルズ',
  // DLC
  'B.O.S.（アトラス砦）','Steel Dawn / Steel Reign','Vault 96','モスマン教団',
  'ファスナハト','ホワイトスプリング・レフュージ','Test Your Metal','Invaders from Beyond','Nuclear Winter',
  'Expeditions: The Pitt','Nuka-World on Tour','Once in a Blue Moon',
  'Gleaming Depths','Ghoul Within','Gone Fission','Milepost Zero','Burning Springs','Mutation Invasion',
  'Miscellaneous','Wild Appalachia','Wastelanders','Steel Dawn',
];

let groupNum = 1;
const publishGroups = [];

// === 人物記事（ファクション別）===
md += `## 人物記事 (${Object.values(factionGroups).reduce((a,b)=>a+b.length,0)}件)\n\n`;

const sortedFactions = Object.entries(factionGroups).sort((a, b) => {
  const ai = factionOrder.indexOf(a[0]);
  const bi = factionOrder.indexOf(b[0]);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
});

for (const [faction, chars] of sortedFactions) {
  md += `### グループ${groupNum}: ${faction} (${chars.length}件)\n\n`;
  md += `| # | 記事名 | スラッグ | 場所 |\n`;
  md += `|---|--------|---------|------|\n`;
  chars.sort((a,b) => a.name.localeCompare(b.name));
  chars.forEach((c, i) => {
    md += `| ${i+1} | ${c.name} | \`${c.url.replace('.html','')}\` | ${c.location || '-'} |\n`;
  });
  md += `\n`;
  publishGroups.push({ group: groupNum, faction, type: '人物', slugs: chars.map(c => c.url.replace('.html','')) });
  groupNum++;
}

// === 場所記事 ===
md += `---\n\n## 場所記事 (${locationArticles.length}件)\n\n`;

// appearance別にグループ化
const locByApp = {};
locationArticles.forEach(l => {
  const key = l.appearance || 'Fallout 76';
  if (!locByApp[key]) locByApp[key] = [];
  locByApp[key].push(l);
});

for (const [app, locs] of Object.entries(locByApp).sort((a,b) => b[1].length - a[1].length)) {
  md += `### グループ${groupNum}: 場所 - ${app} (${locs.length}件)\n\n`;
  md += `| # | 記事名 | スラッグ |\n`;
  md += `|---|--------|---------|n`;
  locs.sort((a,b) => a.name.localeCompare(b.name));
  locs.forEach((l, i) => {
    md += `| ${i+1} | ${l.name} | \`${l.url.replace('.html','')}\` |\n`;
  });
  md += `\n`;
  publishGroups.push({ group: groupNum, faction: `場所 - ${app}`, type: '場所', slugs: locs.map(l => l.url.replace('.html','')) });
  groupNum++;
}

// === クリーチャー ===
if (creatureArticles.length > 0) {
  md += `---\n\n### グループ${groupNum}: クリーチャー (${creatureArticles.length}件)\n\n`;
  md += `| # | 記事名 | スラッグ |\n`;
  md += `|---|--------|---------|n`;
  creatureArticles.sort((a,b) => a.name.localeCompare(b.name));
  creatureArticles.forEach((c, i) => {
    md += `| ${i+1} | ${c.name} | \`${c.url.replace('.html','')}\` |\n`;
  });
  md += `\n`;
  publishGroups.push({ group: groupNum, type: 'クリーチャー', slugs: creatureArticles.map(c => c.url.replace('.html','')) });
  groupNum++;
}

// === その他 ===
if (otherArticles.length > 0) {
  md += `---\n\n### グループ${groupNum}: その他 (${otherArticles.length}件)\n\n`;
  otherArticles.forEach((o, i) => {
    md += `- \`${o.url.replace('.html','')}\` - ${o.name} (${o.category})\n`;
  });
  md += `\n`;
  publishGroups.push({ group: groupNum, type: 'その他', slugs: otherArticles.map(o => o.url.replace('.html','')) });
  groupNum++;
}

// 保存
fs.writeFileSync('F:/Fallout/_publish_queue.md', md, 'utf8');
fs.writeFileSync('F:/Fallout/_publish_groups.json', JSON.stringify(publishGroups, null, 2), 'utf8');

console.log(`✅ _publish_queue.md 生成完了 (${groupNum-1}グループ)`);
console.log(`✅ _publish_groups.json 生成完了`);
console.log(`\n人物グループ: ${sortedFactions.length}`);
console.log(`場所グループ: ${Object.keys(locByApp).length}`);
console.log(`クリーチャー: ${creatureArticles.length}件`);
console.log(`その他: ${otherArticles.length}件`);
