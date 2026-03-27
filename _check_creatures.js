// クリーチャー記事の既存チェック
const fs = require('fs');
const path = require('path');

// Wiki上の全クリーチャー一覧（概要ページ3件を除く71件）
const creatures = [
  'Alien (Fallout 76)', 'Aliens', 'Angler (Fallout 76)', 'Ant (Fallout 76)', 'Beaver',
  'Bee swarm', 'Bloatfly (Fallout 76)', 'Bloodbug (Fallout 76)', 'Brahmin (Fallout 76)',
  'Cat (Fallout 76)', 'Cave cricket (Fallout 76)', 'Chicken (Fallout 76)',
  'Deathclaw (Fallout 76)', 'Dog (Fallout 76)', 'Dolphish (Fallout 76)',
  'Feral ghoul (Fallout 76)', 'Firefly', 'Fish (Fallout 76)', 'Flatwoods monster',
  'Floater (Fallout 76)', 'Fly', 'Fog crawler (Fallout 76)', 'Fox', 'Frog',
  'Grafton Monster', 'Gulper (Fallout 76)', 'Hermit crab (Fallout 76)', 'Honey beast',
  'Iguana', 'Leech', 'Mega sloth', 'Mirelurk (Fallout 76)', 'Mirelurk hunter (Fallout 76)',
  'Mirelurk king (Fallout 76)', 'Mirelurk queen (Fallout 76)', 'Mirelurk spawn (Fallout 76)',
  'Mole miner', 'Mole rat (Fallout 76)', 'Mongrel (Fallout 76)', 'Mothman',
  'Mutant hound (Fallout 76)', 'Opossum', 'Owl', 'Owlet', 'Rabbit',
  'Radhog (Fallout 76)', 'Radrat (Fallout 76)', 'Radroach (Fallout 76)',
  'Radscorpion (Fallout 76)', 'Radstag (Fallout 76)', 'Radtoad (Fallout 76)',
  'Scorchbeast', 'Scorchbeast queen', 'Scorched', 'Snallygaster',
  'Squirrel (Fallout 76)', 'Stingwing (Fallout 76)', 'Strangler heart',
  'Super mutant (Fallout 76)', 'Super mutant behemoth (Fallout 76)', 'The Interloper',
  'Tick', 'Ultracite Terror', 'Ultracite Titan', 'Visitor',
  'Vulture (Fallout 76)', 'Wendigo', 'Wendigo colossus', 'Wise Mothman',
  'Wolf (Fallout 76)', 'Yao guai (Fallout 76)'
];

// title_to_slug.jsonを読み込み
const slugMap = JSON.parse(fs.readFileSync('F:/Fallout/title_to_slug.json', 'utf8'));

// remove_duplicates.jsからmanualEntriesを抽出
const src = fs.readFileSync('F:/Fallout/remove_duplicates.js', 'utf8');
const start = src.indexOf('const manualEntries = [');
const end = src.indexOf('];', start) + 2;
const block = src.substring(start, end).replace('const manualEntries', 'var manualEntries');
eval(block);
const existingUrls = new Set(manualEntries.map(e => e.url));

// 既存HTMLファイルもチェック
const htmlFiles = fs.readdirSync('F:/Fallout').filter(f => f.endsWith('.html'));
const htmlSet = new Set(htmlFiles);

let existing = [];
let missing = [];

creatures.forEach(title => {
  // 可能なslugパターンを生成
  const baseName = title.replace(/ \(Fallout 76\)/, '').replace(/ /g, '-').toLowerCase()
    .replace(/['']/g, '').replace(/[^a-z0-9-]/g, '');
  const possibleSlugs = [
    baseName + '.html',
    baseName + '-fo76.html',
    title.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '').replace(/fallout-76/,'fo76') + '.html',
  ];

  // slugMapで確認
  const slugFromMap = slugMap[title];

  let found = false;
  if (slugFromMap && htmlSet.has(slugFromMap + '.html')) {
    existing.push({ title, file: slugFromMap + '.html' });
    found = true;
  } else {
    for (const s of possibleSlugs) {
      if (htmlSet.has(s)) {
        existing.push({ title, file: s });
        found = true;
        break;
      }
    }
  }

  if (!found) {
    // より広い検索
    const keywords = baseName.split('-').filter(w => w.length > 2);
    const matchFile = htmlFiles.find(f => {
      const fn = f.replace('.html','');
      return keywords.every(k => fn.includes(k));
    });
    if (matchFile) {
      existing.push({ title, file: matchFile });
    } else {
      missing.push(title);
    }
  }
});

console.log('=== 既存記事 (' + existing.length + '件) ===');
existing.forEach(e => console.log('  ✅ ' + e.title + ' → ' + e.file));
console.log('\n=== 未作成記事 (' + missing.length + '件) ===');
missing.forEach(m => console.log('  ❌ ' + m));
