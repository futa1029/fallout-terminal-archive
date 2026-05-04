const https = require('https');
const fs = require('fs');
const path = require('path');

const slug = 'beckley-mine-exhibit';
const dir = path.join('images', 'note_extracted', slug);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const images = [
  "FO76_Beckley_mine_exhibit.png",
  "Beckley_mine_exhibit_map.png",
  "FO76_Beckley_Coal_Mine_Exhibit_Main_Building.png",
  "F76_Beckley_Mine_Exhibit.png",
  "FO76_Misc_lox_6.png",
  "FO76_the_Dedication_to_Coal_Miners_in_Beckley.jpg",
  "FO76_Beckley_mine_exhibit_(Top_of_the_World_ad_packet).png",
  "FO76_WV_Coal_Miner_Monument.png"
];

async function downloadImage(filename, saveAs) {
  const apiUrl = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
  return new Promise((resolve, reject) => {
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === '-1' || !pages[pageId].imageinfo) return resolve(false);
          let url = pages[pageId].imageinfo[0].url;
          url = url.split('/revision/latest')[0];
          https.get(url, (imgRes) => {
            const dest = path.join(dir, saveAs || filename);
            const stream = fs.createWriteStream(dest);
            imgRes.pipe(stream);
            stream.on('finish', () => { stream.close(); resolve(true); });
          });
        } catch (e) { resolve(false); }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const img of images) {
    let saveAs = img;
    if (img === 'Beckley_mine_exhibit_map.png') saveAs = 'img_map_marker.png';
    console.log(`Downloading ${img} as ${saveAs}...`);
    await downloadImage(img, saveAs);
  }
  console.log('All images downloaded!');
}
run();
