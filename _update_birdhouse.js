const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imgDir = 'images/note_extracted/birdhouse-ridge';
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const images = [
  'FO76_Birdhouse_ridge.png',
  'Hornwright_Summer_Villa_map.png',
  'FO76_Birdhouse_rdg_1.png',
  'FO76_Birdhouse_rdg_2.png',
  'FO76_Birdhouse_rdg_3.png'
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

async function main() {
  for (const img of images) {
    const url = await getImageUrl(img);
    if (url) {
      const localName = img.toLowerCase().replace(/[\s\(\)]+/g, '_').replace(/_+/g, '_').replace(/_\.png$/, '.png');
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
  const targetFile = 'f:\\Fallout\\birdhouse-ridge.html';
  if (!fs.existsSync(targetFile)) {
    console.error("File not found:", targetFile);
    return;
  }
  let content = fs.readFileSync(targetFile, 'utf8');

  // Replace body
  const startIdx = content.indexOf('<!-- ===== 概要 ===== -->');
  const endIdx = content.indexOf('<!-- ===== 感想 ===== -->');

  const replacement = `<!-- ===== 概要 ===== -->
            <h2>概要</h2>
            <p>
                <b>バードハウス・リッジ</b>（Birdhouse ridge）は、アパラチアの森林地帯にある未マークのロケーションである。
            </p>

            <!-- ===== 背景 ===== -->
            <h2>背景</h2>
            <p>
                ホーンライト夏の別荘の近くの尾根に作られたキャンプ。
            </p>

            <!-- ===== レイアウト ===== -->
            <h2>レイアウト</h2>
            <p>
                バードハウス・リッジは、別荘の東南東、ホワイトスプリングの監視塔へ向かう丘を登った途中にあり、地割れ地点ラムダの北に位置している。このエリアは、鳥かごや赤い巣箱が並んだ木の梁が設置された尾根で構成されている。<br>
                雨風をしのぐために屋外トイレのドアが立てかけられた寝袋がある。金属製のテーブルの近くにはファーストエイドキットと薪の山が置かれている。また、周囲には複数の袋が散乱しており、それぞれからランダムなジャンクアイテムを入手できる。
            </p>

            <!-- ===== 登場作品 ===== -->
            <h2>登場作品</h2>
            <p>
                バードハウス・リッジは<a href="fallout76.html" class="auto-link">Fallout 76</a>にのみ登場する。
            </p>

            <!-- ===== ギャラリー ===== -->
            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item">
                        <img src="images/note_extracted/birdhouse-ridge/fo76_birdhouse_rdg_1.png" alt="風景1">
                        <div class="caption">風景1</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/note_extracted/birdhouse-ridge/fo76_birdhouse_rdg_2.png" alt="風景2">
                        <div class="caption">風景2</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/note_extracted/birdhouse-ridge/fo76_birdhouse_rdg_3.png" alt="風景3">
                        <div class="caption">風景3</div>
                    </div>
                </div>
            </div>

            `;

  if (startIdx !== -1 && endIdx !== -1) {
      content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
      fs.writeFileSync(targetFile, content, 'utf8');
      console.log("Updated birdhouse-ridge.html successfully.");
  } else {
      console.error("Patterns not found in the HTML.");
  }
}

main().catch(console.error);
