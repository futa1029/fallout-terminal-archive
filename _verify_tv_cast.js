// TVキャスト記事 最終検証
const fs = require('fs');
const slugs = [
  'maximus-tv','norm-maclean','the-ghoul',
  'betty-pearson','chet-tv','dane-tv','siggi-wilzig','barb-howard','thaddeus-tv','bud-askins',
  'reg-mcphee','steph-harper','woody-thomas','veronica-tv','davey-tv','marianne-tv',
  'lloyd-hawthorne','birdie-tv','cassandra-hawthorne','benjamin-tv','nose-edmundson',
  'freed-ghoul-tv','snake-oil-salesman','ma-june','sorrel-booker','monty-tv',
  'shortsight-tv','quintus-tv','titus-tv','felix-tv',
  'george-yaffe','bud-askins','jorge-tv','charles-whiteknife','frederick-sinclair-tv',
  'robert-house-tv','julia-masters','leon-von-felden'
];

const unique = [...new Set(slugs)];
let ok = 0, ng = 0, noImg = 0, noKanso = 0, noX = 0;
const issues = [];

unique.forEach(s => {
  const htmlPath = 'F:/Fallout/' + s + '.html';
  const imgPath = 'F:/Fallout/images/note_extracted/' + s + '/img_main.png';
  const xPath = 'F:/Fallout/_X/' + s + '/post.md';

  if (!fs.existsSync(htmlPath)) { ng++; issues.push('❌ HTML: ' + s); return; }
  ok++;
  const c = fs.readFileSync(htmlPath, 'utf8');
  if (!c.includes('感想')) { noKanso++; issues.push('⚠️ 感想なし: ' + s); }
  if (!fs.existsSync(imgPath) || fs.statSync(imgPath).size < 1000) { noImg++; issues.push('⚠️ 画像なし: ' + s); }
  if (!fs.existsSync(xPath)) { noX++; issues.push('⚠️ X素材なし: ' + s); }
});

console.log('=== TVキャスト記事 最終検証 ===');
console.log('対象: ' + unique.length + '件 (重複除去済)');
console.log('HTML: ' + ok + '件 OK / ' + ng + '件 NG');
console.log('画像なし: ' + noImg + '件');
console.log('感想なし: ' + noKanso + '件');
console.log('X素材なし: ' + noX + '件');
if (issues.length > 0) {
  console.log('\n--- 問題 ---');
  issues.forEach(i => console.log('  ' + i));
} else {
  console.log('\n✅ 全件正常！');
}
