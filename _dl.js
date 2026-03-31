const https = require('https');
const fs = require('fs');
const path = require('path');

const titles = [
    "File:FO76ETP Hex.png",
    "File:FO76TP Hex The Penn.png",
    "File:FO76ETP Hex trailer.png",
    "File:The Pitt Union Dues.png",
    "File:FO76 Radio Hex.svg"
];

const outDir = 'f:\\Fallout\\images\\note_extracted\\hex-expeditions-the-pitt';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function getUrl(title) {
    return new Promise((resolve) => {
        const url = `https://fallout.fandom.com/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pageId != -1 && pages[pageId].imageinfo) {
                        resolve(pages[pageId].imageinfo[0].url);
                    } else {
                        resolve(null);
                    }
                } catch(e){ resolve(null); }
            });
        });
    });
}

async function download(url, dest) {
    return new Promise((resolve) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (res) => {
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        });
    });
}

(async () => {
    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const url = await getUrl(title);
        if (url) {
            let fileName = title.replace('File:', '');
            if (i === 0) fileName = 'img_main.png'; // ひとつめは img_main.png とする
            const dest = path.join(outDir, fileName);
            console.log(`Downloading ${url} to ${dest}`);
            await download(url, dest);
        } else {
            console.log(`Not found: ${title}`);
        }
    }
})();
