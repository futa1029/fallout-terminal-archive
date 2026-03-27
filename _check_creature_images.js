// クリーチャー記事の画像欠損チェック＆Wiki画像名特定
const fs = require('fs');
const path = require('path');

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

// Wikiデータ読み込み
const wikiData = JSON.parse(fs.readFileSync('F:/Fallout/_creatures_wiki_data.json', 'utf8'));

// Wiki titleとslugのマッピング
const slugToWikiTitle = {
  'scorchbeast-fo76': 'Scorchbeast',
  'scorchbeast-queen': 'Scorchbeast queen',
  'feral-ghoul-fo76': 'Feral ghoul (Fallout 76)',
  'grafton-monster': 'Grafton Monster',
  'mirelurk-fo76': 'Mirelurk (Fallout 76)',
  'radscorpion-fo76': 'Radscorpion (Fallout 76)',
  'snallygaster-fo76': 'Snallygaster',
  'wendigo-colossus': 'Wendigo colossus',
  'yao-guai-fo76': 'Yao guai (Fallout 76)',
  'the-interloper': 'The Interloper',
  'ultracite-titan': 'Ultracite Titan',
  'honey-beast-fo76': 'Honey beast',
  'mega-sloth-fo76': 'Mega sloth',
  'fog-crawler-fo76': 'Fog crawler (Fallout 76)',
  'floater-fo76': 'Floater (Fallout 76)',
  'gulper-fo76': 'Gulper (Fallout 76)',
  'hermit-crab-fo76': 'Hermit crab (Fallout 76)',
  'mirelurk-hunter-fo76': 'Mirelurk hunter (Fallout 76)',
  'mirelurk-king-fo76': 'Mirelurk king (Fallout 76)',
  'mirelurk-queen-fo76': 'Mirelurk queen (Fallout 76)',
  'mole-rat-fo76': 'Mole rat (Fallout 76)',
  'mongrel-fo76': 'Mongrel (Fallout 76)',
  'mutant-hound-fo76': 'Mutant hound (Fallout 76)',
  'radroach-fo76': 'Radroach (Fallout 76)',
  'radstag-fo76': 'Radstag (Fallout 76)',
  'stingwing-fo76': 'Stingwing (Fallout 76)',
  'radtoad-fo76': 'Radtoad (Fallout 76)',
  'radhog-fo76': 'Radhog (Fallout 76)',
  'radrat-fo76': 'Radrat (Fallout 76)',
  'tick-fo76': 'Tick',
  'strangler-heart-fo76': 'Strangler heart',
  'super-mutant-behemoth-fo76': 'Super mutant behemoth (Fallout 76)',
  'ultracite-terror-fo76': 'Ultracite Terror',
  'visitor-fo76': 'Visitor',
  'wise-mothman-fo76': 'Wise Mothman',
  'mirelurk-spawn-fo76': 'Mirelurk spawn (Fallout 76)',
  'aliens-fo76': 'Aliens',
  'fish-fo76': 'Fish (Fallout 76)',
  'dolphish-fo76': 'Dolphish (Fallout 76)',
  'firefly-fo76': 'Firefly',
  'fly-fo76': 'Fly',
  'fox-fo76': 'Fox',
  'frog-fo76': 'Frog',
  'iguana-fo76': 'Iguana',
  'leech-fo76': 'Leech',
  'opossum-fo76': 'Opossum',
  'owl-fo76': 'Owl',
  'owlet-fo76': 'Owlet',
  'rabbit-fo76': 'Rabbit',
  'squirrel-fo76': 'Squirrel (Fallout 76)',
  'vulture-fo76': 'Vulture (Fallout 76)',
  'wolf-fo76': 'Wolf (Fallout 76)',
};

const missing = [];
const present = [];

creatures.forEach(slug => {
  const imgPath = `F:/Fallout/images/note_extracted/${slug}/img_main.png`;
  const exists = fs.existsSync(imgPath);
  const size = exists ? fs.statSync(imgPath).size : 0;

  if (!exists || size < 1000) {
    const wikiTitle = slugToWikiTitle[slug];
    const data = wikiData[wikiTitle];
    // Wikitextからinfobox画像を抽出
    let infoImg = '';
    if (data) {
      const wt = data.wikitext;
      // |image = パターンを探す
      const imgMatch = wt.match(/\|image\s*=\s*([^\n|]+)/);
      if (imgMatch) infoImg = imgMatch[1].trim();
      // 画像リストから候補を探す
      const candidates = data.images.filter(img =>
        !img.includes('Icon_') && !img.includes('Gametitle') &&
        !img.includes('Bugintro') && !img.includes('icon') &&
        (img.toLowerCase().includes('fo76') || img.toLowerCase().includes('fallout_76') ||
         img.toLowerCase().includes(slug.split('-')[0]))
      );
      missing.push({
        slug,
        wikiTitle,
        infoboxImage: infoImg,
        topCandidates: candidates.slice(0, 5),
        allImages: data.images.slice(0, 15),
      });
    } else {
      missing.push({ slug, wikiTitle, infoboxImage: 'N/A', topCandidates: [], allImages: [] });
    }
  } else {
    present.push(slug);
  }
});

console.log(`✅ 画像あり: ${present.length}件`);
console.log(`❌ 画像なし/不正: ${missing.length}件\n`);

missing.forEach(m => {
  console.log(`--- ${m.slug} (${m.wikiTitle}) ---`);
  console.log(`  Infobox image: ${m.infoboxImage}`);
  console.log(`  Top candidates: ${m.topCandidates.join(', ')}`);
  console.log(`  All images[0..14]: ${m.allImages.join(', ')}`);
});
