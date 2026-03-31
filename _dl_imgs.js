// Halloween horror hamlet - 全画像ダウンロード
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imgDir = 'images/note_extracted/halloween-horror-hamlet';
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const images = [
  'FO76_Halloween_horror_hamlet_01.png',
  'FO76_Halloween_horror_hamlet_02.png',
  'FO76_Halloween_horror_hamlet_03.png',
  'FO76_Halloween_horror_hamlet_04.png',
  'FO76_Halloween_loc_16.png',
  'FO76_Halloween_loc_15.png',
  'FO76_Halloween_loc_14.png',
  'FO76_Halloween_locs_11.png',
  'Halloween_horror_hamlet_map.png'
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
      const ext = path.extname(img) || '.png';
      const localName = img.toLowerCase().replace(/\s+/g, '_');
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
  console.log('Done!');
}

main().catch(console.error);
