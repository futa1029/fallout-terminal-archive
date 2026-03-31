const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imgDir = 'images/note_extracted/charleston-station';
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const images = [
  'FO76_Charleston_Station.png',
  'Charles_Station_map.png',
  'FO76_Charleston_Topdown_Charleston_Station.png',
  'FO76_Charleston_Station_11.png',
  'FO76_Charleston_Station_9.png',
  'FO76_Charleston_station_new.png',
  'FO76_Charleston_Station_exter_1.png',
  'FO76_Charleston_Station_exter_2.png',
  'FO76_Charleston_Station_8.png',
  'FO76_Charleston_Station_7.png',
  'FO76_Charleston_Station_6.png',
  'FO76_Charleston_Station_5.png',
  'FO76_Charleston_Station_4.png',
  'FO76_Charleston_Station_3.png',
  'FO76_Charleston_Station_2.png',
  'FO76_Charleston_Station_12.png',
  'FO76_Charleston_Station_interior_2.png',
  'FO76_Charleston_Station_interior_1.png',
  'FO76_Train_station_int_11.png',
  'FO76_Train_station_int_10.png',
  'FO76_Train_station_int_9.png',
  'CharlestonStationTT.png'
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
                <b>チャールストン駅</b>（Charleston Station）は、アパラチアの森林地帯、チャールストンにある鉄道駅のロケーションである。
            </p>

            <h2>背景</h2>
            <p>
                レッドライン沿いにあった長い間使用されていない鉄道駅のネットワークの一部であり、施設は線路沿いのプラットフォームと駅舎で構成されている。州間高速道路59号線の幹線沿いに位置し、大戦前には自動券売機だけでなく、従業員が常駐するチケット販売カウンターなどの付属サービスが提供されていた。
            </p>

            <h2>レイアウト</h2>
            <p>
                「チャールストン駅」という名称は、州間高速道路沿いにあるボットストップの建物との間の擁壁にも書かれている。外には、荷台に抗議のサインボードを載せたピックアップトラックが駅の前に停まっている。製氷機の前にある椅子の上にはバンジョーが置かれている。
            </p>
            <p>
                その後、この駅はレスポンダーによって接収され、交易所として機能するようになった。現在でも彼らのベンダーボット（ベンダーボット・レスポンダー）の一体が稼働している。ベンダーボットの向かいの隅には武器作業台があり、これを経由してプレイヤーの収納箱（スタッシュ）にアクセスできる。さらに、外のプラットフォームには弾薬自動販売機、レジェンダリー交換機、パンチカードマシン、そして医療品自動販売機が設置されている。
            </p>

            <h2>備考</h2>
            <ul>
                <li>『Locked & Loaded』アップデート以降、すべての鉄道駅にパンチカードマシンが追加された。</li>
            </ul>

            <h2>登場作品</h2>
            <p>
                チャールストン駅は<a href="fallout76.html" class="auto-link">Fallout 76</a>にのみ登場する。
            </p>

            <!-- ===== ギャラリー ===== -->
            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_11.png" alt="ギャラリー画像"><div class="caption">外観1</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_9.png" alt="ギャラリー画像"><div class="caption">外観2</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_new.png" alt="ギャラリー画像"><div class="caption">外観3</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_exter_1.png" alt="ギャラリー画像"><div class="caption">外観4</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_exter_2.png" alt="ギャラリー画像"><div class="caption">外観5</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_8.png" alt="ギャラリー画像"><div class="caption">風景1</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_7.png" alt="ギャラリー画像"><div class="caption">風景2</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_6.png" alt="ギャラリー画像"><div class="caption">風景3</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_5.png" alt="ギャラリー画像"><div class="caption">風景4</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_4.png" alt="ギャラリー画像"><div class="caption">風景5</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_3.png" alt="ギャラリー画像"><div class="caption">風景6</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_2.png" alt="ギャラリー画像"><div class="caption">風景7</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_12.png" alt="ギャラリー画像"><div class="caption">風景8</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_interior_2.png" alt="ギャラリー画像"><div class="caption">内部1</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_charleston_station_interior_1.png" alt="ギャラリー画像"><div class="caption">内部2</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_train_station_int_11.png" alt="ギャラリー画像"><div class="caption">内部3 (L&L後)</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_train_station_int_10.png" alt="ギャラリー画像"><div class="caption">内部4 (L&L後)</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/fo76_train_station_int_9.png" alt="ギャラリー画像"><div class="caption">内部5 (L&L後)</div></div>
                    <div class="gallery-item"><img src="images/note_extracted/charleston-station/charlestonstationtt.png" alt="ギャラリー画像"><div class="caption">時刻表</div></div>
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
  const targetFile = 'f:\\Fallout\\charleston-station.html';
  if (!fs.existsSync(targetFile)) {
    console.error("File not found:", targetFile);
    return;
  }
  let content = fs.readFileSync(targetFile, 'utf8');

  let startIdx = content.indexOf('<!-- ===== 概要 ===== -->');
  if (startIdx === -1) {
      startIdx = content.indexOf('<h2>概要</h2>');
  }
  
  // Try to find the start of the quote box to avoid replacing the quote
  let endIdx = content.indexOf('<!-- ===== 感想 ===== -->');
  if (endIdx === -1) {
      endIdx = content.indexOf('<div class="quote-box">');
  }
  
  // If still not finding endIdx, find standard footer
  if (endIdx === -1) {
      endIdx = content.indexOf('<div style="margin-top: 30px; border-top: 1px dashed');
  }

  if (startIdx !== -1 && endIdx !== -1) {
      content = content.substring(0, startIdx) + htmlBody + '\n            ' + content.substring(endIdx);
      fs.writeFileSync(targetFile, content, 'utf8');
      console.log("Updated charleston-station.html successfully.");
  } else {
      console.error("Patterns not found in the HTML.");
  }
}

main().catch(console.error);
