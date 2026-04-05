const fs = require('fs');
const entries = [
  "santa-monica", "donut-shop", "starlight-drive-in-theatre-tv-series", "camp-golf-tent", "santa-monica-pier", "affordable-al-s-discount-hospital", "headquarters-of-the-united-nations", "westside-medical-clinic", "yao-guai-cave-tv-series", "sonny-s-sundries", "the-ghoul-s-grave", "bbq-shack-tv-series", "soviet-satellite", "red-rocket-tv-series", "hawthorne-medical-laboratories"
];

let allOk = true;
for (const slug of entries) {
  try {
    const html = fs.readFileSync('f:/Fallout/' + slug + '.html', 'utf8');
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g,'') : 'NO TITLE';
    
    // Check if main image exists
    const imgPath = 'f:/Fallout/images/note_extracted/' + slug + '/img_main.png';
    const imgExists = fs.existsSync(imgPath) ? 'YES' : 'NO ';
    
    // Check if X post exists
    const postPath = 'f:/Fallout/_X/' + slug + '/post.md';
    const postExists = fs.existsSync(postPath) ? 'YES' : 'NO ';
    
    console.log(`${slug.padEnd(40)} | img: ${imgExists} | post: ${postExists} | title: ${title}`);
    if (imgExists === 'NO ' || postExists === 'NO ') allOk = false;
  } catch(e) {
    console.log(`${slug.padEnd(40)} | ERROR: ${e.message}`);
    allOk = false;
  }
}
if (allOk) console.log('\n✅ すべてのTVロケーション記事・画像・X投稿素材が正常に生成・確認されました。');
