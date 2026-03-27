// 最終検証スクリプト
const fs = require('fs');
const creatures = [
  'scorchbeast-fo76','scorchbeast-queen','feral-ghoul-fo76','grafton-monster',
  'mirelurk-fo76','radscorpion-fo76','snallygaster-fo76','wendigo-colossus',
  'yao-guai-fo76','the-interloper','ultracite-titan','honey-beast-fo76',
  'mega-sloth-fo76','fog-crawler-fo76','floater-fo76','gulper-fo76',
  'hermit-crab-fo76','mirelurk-hunter-fo76','mirelurk-king-fo76','mirelurk-queen-fo76',
  'mole-rat-fo76','mongrel-fo76','mutant-hound-fo76','radroach-fo76','radstag-fo76',
  'stingwing-fo76','radtoad-fo76','radhog-fo76','radrat-fo76','tick-fo76',
  'strangler-heart-fo76','super-mutant-behemoth-fo76','ultracite-terror-fo76',
  'visitor-fo76','wise-mothman-fo76','mirelurk-spawn-fo76','aliens-fo76',
  'fish-fo76','dolphish-fo76','firefly-fo76','fly-fo76','fox-fo76','frog-fo76',
  'iguana-fo76','leech-fo76','opossum-fo76','owl-fo76','owlet-fo76','rabbit-fo76',
  'squirrel-fo76','vulture-fo76','wolf-fo76'
];

let ok = 0, ng = 0, warn = 0;
const issues = [];

creatures.forEach(s => {
  const p = 'F:/Fallout/' + s + '.html';
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, 'utf8');
    const hasKanso = c.includes('感想');
    const hasBack = c.includes('BACK TO TERMINAL');
    const hasCopy = c.includes('CC BY-SA');
    const hasXPost = fs.existsSync('F:/Fallout/_X/' + s + '/post.md');
    ok++;
    if (!hasKanso || !hasBack || !hasCopy) {
      warn++;
      issues.push(s + ': kanso=' + hasKanso + ' back=' + hasBack + ' copy=' + hasCopy);
    }
    if (!hasXPost) {
      issues.push(s + ': X投稿素材なし');
    }
  } else {
    ng++;
    issues.push('未生成: ' + s);
  }
});

console.log('=== クリーチャー記事最終検証 ===');
console.log('存在: ' + ok + '件');
console.log('未生成: ' + ng + '件');
console.log('警告: ' + warn + '件');
if (issues.length > 0) {
  console.log('\n--- 問題リスト ---');
  issues.forEach(i => console.log('  ' + i));
} else {
  console.log('\n✅ 全件正常！');
}
