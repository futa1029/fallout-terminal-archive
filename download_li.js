const fs = require('fs');
const path = require('path');

const dir = 'f:\\Fallout\\images\\note_extracted\\madison-li';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const files = [
  'Madison_Li_Fallout4.png',
  'Madison_Li.jpg',
  'DoctorLiCA1.jpg',
  'Young_Madison_Li_.jpg',
  'Fallout_Magic_Dr._Madison_Li.png'
];

async function download() {
    for (const f of files) {
        let apiUrl = 'https://fallout.fandom.com/api.php?action=query&titles=File:'+f+'&prop=imageinfo&iiprop=url&format=json';
        let res = await fetch(apiUrl);
        let data = await res.json();
        let pages = Object.values(data.query.pages);
        if (!pages[0] || !pages[0].imageinfo) continue;
        let url = pages[0].imageinfo[0].url;
        
        console.log(`Downloading ${f} from ${url}`);
        
        let fileRes = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
        let buffer = await fileRes.arrayBuffer();
        
        let outPath = path.join(dir, f);
        fs.writeFileSync(outPath, Buffer.from(buffer));
        console.log(`Saved to ${outPath}`);
    }
}
download();
