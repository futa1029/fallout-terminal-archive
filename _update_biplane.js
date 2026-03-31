const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imgDir = 'images/note_extracted/biplane-crash-anchor-farm';
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const images = [
  'Biplane_crash.png',
  'Biplane_crash_(Anchor_farm)_map.png'
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

const htmlBody = `<h2>概要</h2>
<p><b>複葉機の墜落現場</b>（Biplane crash）は、アパラチアの森林地帯にある未マークのロケーションである。アンカー農場の近隣に位置している。</p>

<h2>レイアウト</h2>
<p>アンカー農場の北東にある背の高い草むらの空き地に、墜落して真っ二つに折れたPT-00D複葉機が横たわっている。かつてこの機体を操縦していたパイロットは、墜落の衝撃で投げ出されたのか、飛行機の少し手前に倒れている。</p>

<h2>備考</h2>
<ul>
    <li>『Fallout 76 Vault Dweller's Survival Guide』では、この墜落した小型機の周囲の焼け焦げた地面から薬物（ケム）を回収できると言及されている。</li>
</ul>

<div class="quote-box"><b>感想</b><br><br>アパラチアの広大な自然の中にひっそりと存在する墜落現場です。こうした名もなき場所には、かつての住人（あるいは不運なパイロット）の最期の痕跡が残されており、終末世界の過酷さを静かに物語っています。</div>`;

async function main() {
  for (const img of images) {
    const url = await getImageUrl(img);
    if (url) {
      const ext = path.extname(img) || '.png';
      // keep it simple for local filename
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
  const targetFile = 'f:\\Fallout\\biplane-crash-anchor-farm.html';
  if (!fs.existsSync(targetFile)) {
    console.error("File not found:", targetFile);
    return;
  }
  let content = fs.readFileSync(targetFile, 'utf8');

  const startPattern = '<h2>概要</h2>';
  const endPattern = '<div style="margin-top: 30px; border-top: 1px dashed';

  const startIndex = content.indexOf(startPattern);
  const endIndex = content.indexOf(endPattern);

  if (startIndex !== -1 && endIndex !== -1) {
      let newContent = content.substring(0, startIndex) + htmlBody + '\n\n            ' + content.substring(endIndex);
      
      const infoboxEndIndex = newContent.indexOf('</aside>');
      if (infoboxEndIndex !== -1) {
          const creaturesHtml = '<div class="infobox-row"><span class="infobox-label">敵対生物</span><span>ニワトリ</span></div>';
          newContent = newContent.replace(/<div class="infobox-row"><span class="infobox-label">敵対生物<\/span><span>[^<]*<\/span><\/div>/g, '');
          const appearancePattern = '<div class="infobox-row"><span class="infobox-label">登場作品';
          const appearanceIndex = newContent.indexOf(appearancePattern);
          if (appearanceIndex !== -1) {
               newContent = newContent.substring(0, appearanceIndex) + creaturesHtml + newContent.substring(appearanceIndex);
          }
      }
      fs.writeFileSync(targetFile, newContent, 'utf8');
      console.log("Updated biplane-crash-anchor-farm.html successfully.");
  } else {
      console.error("Patterns not found in the HTML.");
  }
}

main().catch(console.error);
