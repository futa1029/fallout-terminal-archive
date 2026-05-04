const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'f:\\Fallout\\images\\note_extracted\\ada';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const files = ['Fo4_Ada.png','Fallout_4_Automatron_pre-release_7.png','Ada_SGB.png'];

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
        
        // Remove /revision/latest* from Fandom urls if any just in case, but we are downloading the bits directly
        let outPath = path.join(dir, f);
        fs.writeFileSync(outPath, Buffer.from(buffer));
        console.log(`Saved to ${outPath}`);
    }
}
download();
