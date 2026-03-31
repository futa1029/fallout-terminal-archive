const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imgDir = 'images/note_extracted/birdwatchers-platform';
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const images = [
  'FO76_birdwatcherstreehouse_01.png',
  'Birdwatcher\'s_note_location_map.jpg',
  'Birdwatcher\'s_treehouse.png',
  'Birdwatcher\'s_note.jpg'
];

async function getImageUrl(filename) {
  const apiUrl = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
  return new Promise((resolve, reject) => {
    https.get(apiUrl, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const page = Object.values(pages)[0];
          if (page.imageinfo && page.imageinfo[0]) {
            resolve(page.imageinfo[0].url);
          } else {
            resolve(null);
          }
        } catch { resolve(null); }
      });
    }).on('error', reject);
  });
}

async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
      }
      const stream = fs.createWriteStream(filepath);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(); });
    }).on('error', reject);
  });
}

const htmlBody = `
            <h2>概要</h2>
            <p>
                <b>野鳥観察者のプラットフォーム</b>（Birdwatcher's platform）は、アパラチアの森林地帯にある未マークのロケーションである。
            </p>

            <h2>背景</h2>
            <p>
                森の隔離された尾根の上に建てられた展望台で、バードウォッチングに最適な場所である。
            </p>

            <h2>レイアウト</h2>
            <p>
                野鳥観察者のプラットフォームは、クロスヘアの西南西、山の尾根の反対側にある。大きな木の下にひっそりと佇んでおり、光る液体が入った吊るし瓶で飾られている。展望台の端には杖と双眼鏡が置かれており、その近くに「野鳥観察者のメモ」がある。
            </p>

            <h2>備考</h2>
            <ul>
                <li>これは名前のないロケーション（POI）である。この場所に付けられた「野鳥観察者のプラットフォーム」という名称は公式のものではない。</li>
            </ul>

            <h2>登場作品</h2>
            <p>
                野鳥観察者のプラットフォームは<a href="fallout76.html" class="auto-link">Fallout 76</a>にのみ登場する。
            </p>

            <!-- ===== ギャラリー ===== -->
            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item">
                        <img src="images/note_extracted/birdwatchers-platform/birdwatcher_s_treehouse.png" alt="野鳥観察者のツリーハウス">
                        <div class="caption">野鳥観察者のツリーハウス</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/note_extracted/birdwatchers-platform/birdwatcher_s_note.jpg" alt="野鳥観察者のメモ">
                        <div class="caption">野鳥観察者のメモ</div>
                    </div>
                </div>
            </div>
            `;

async function main() {
  for (const img of images) {
    const url = await getImageUrl(img);
    if (url) {
      const dbgImgName = img.replace(/'/g, '_');
      const localName = dbgImgName.toLowerCase().replace(/[\s\(\)]+/g, '_').replace(/_+/g, '_').replace(/_\.png$/, '.png').replace(/_\.jpg$/, '.jpg');
      const filepath = path.join(imgDir, localName);
      
      if (fs.existsSync(filepath)) {
        console.log(`  SKIP ${localName} (exists)`);
        continue;
      }
      
      await downloadFile(url, filepath);
      const size = fs.statSync(filepath).size;
      console.log(`  DL ${localName} (${(size/1024).toFixed(0)}KB)`);
    } else {
      console.log(`  MISS ${img}`);
    }
  }

  // HTML Update
  const targetFile = 'f:\\Fallout\\birdwatchers-platform.html';
  if (!fs.existsSync(targetFile)) {
    console.error("File not found:", targetFile);
    return;
  }
  let content = fs.readFileSync(targetFile, 'utf8');

  let startIdx = content.indexOf('<!-- ===== 概要 ===== -->');
  if (startIdx === -1) {
      startIdx = content.indexOf('<h2>概要</h2>');
  }
  let endIdx = content.indexOf('<!-- ===== 感想 ===== -->');
  if (endIdx === -1) {
      endIdx = content.indexOf('<div class="quote-box">');
  }

  if (startIdx !== -1 && endIdx !== -1) {
      content = content.substring(0, startIdx) + htmlBody + '\n            ' + content.substring(endIdx);
      fs.writeFileSync(targetFile, content, 'utf8');
      console.log("Updated birdwatchers-platform.html successfully.");
  } else {
      console.error("Patterns not found in the HTML.");
  }
}

main().catch(console.error);
