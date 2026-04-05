const https = require('https');
const fs = require('fs');
const path = require('path');

const slug = 'avr-medical-center';
const dir = path.join('images', 'note_extracted', slug);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const images = [
  "FO76_AVR_medical_center.png",
  "AVR_Medical_Center_map.png",
  "F76_AVR_1.png",
  "FO76_AVR_Medical_Center_facehugger.png",
  "FO76_AVR_Medical_Center_(Field_report_AVR_medical).png",
  "FO76_AVR_Medical_Center_(Stolen_supplies).png"
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
          // Clean the Fandom cb string
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
    // Map marker image must be named img_map_marker.png
    if (img === 'AVR_Medical_Center_map.png') saveAs = 'img_map_marker.png';
    console.log(`Downloading ${img} as ${saveAs}...`);
    await downloadImage(img, saveAs);
  }
  console.log('All images downloaded!');
}
run();
