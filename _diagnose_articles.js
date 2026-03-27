// 感想なし記事の詳細診断
const fs = require('fs');
const path = require('path');
const files = [
  'athens-armory.html','athens-lunatic-asylum.html','big-muskies-bucket.html',
  'chained-up-farm.html','checkpoint-canyon.html','dino-peaks-mini-golf.html',
  'dow-lake-watershed.html','enclave-vertibird-crash-site.html','fort-steuben.html',
  'highway-town.html','hocking-hills-station.html','hocking-hills-state-park.html',
  'moonvale-tunnel.html','shade-hill-church.html','south-ohio-evacuation-center.html',
  'starlight-drive-in-bs.html','strouds-run-state-park.html',
  'executives-apartment.html','jackson-junkyard.html',
  'super-duper-mart-bs.html','the-chop-shop-bs.html','the-rust-kingdom.html',
  'westbrook-horse-ranch.html','world-of-corn.html'
];

files.forEach(f => {
  const p = path.join('F:/Fallout', f);
  const c = fs.readFileSync(p, 'utf8');
  
  // 本文の長さ（<main>タグ内）
  const mainMatch = c.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const mainLen = mainMatch ? mainMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().length : 0;
  
  // h2セクション数
  const h2Count = (c.match(/<h2>/g) || []).length;
  
  // 画像ディレクトリの有無
  const slug = f.replace('.html', '');
  const imgDir = path.join('F:/Fallout/images/note_extracted', slug);
  let imgCount = 0;
  if (fs.existsSync(imgDir)) {
    imgCount = fs.readdirSync(imgDir).filter(x => /\.(png|jpg|jpeg|webp)$/i.test(x)).length;
  }
  
  // 感想/所感の有無
  const hasKanso = c.includes('感想') || c.includes('所感');
  
  // ギャラリーの有無
  const hasGallery = c.includes('gallery-section');
  
  // 日本語テキスト量（ひらがな・カタカナ・漢字の数）
  const jpChars = (mainMatch ? mainMatch[1] : '').match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g);
  const jpCount = jpChars ? jpChars.length : 0;
  
  console.log(`${f}`);
  console.log(`  本文長: ${mainLen}文字 | 日本語: ${jpCount}文字 | h2: ${h2Count} | 画像: ${imgCount} | ギャラリー: ${hasGallery} | 感想: ${hasKanso}`);
});
