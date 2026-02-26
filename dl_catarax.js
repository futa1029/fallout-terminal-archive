const https = require('https');
const fs = require('fs');
const path = require('path');

const outDir = 'f:/Fallout/images/note_extracted/catarax/';
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const images = [
    { url: 'https://static.wikia.nocookie.net/fallout/images/8/88/FO76_season06_toon03.png', name: 'FO76_season06_toon03.png' },
    { url: 'https://static.wikia.nocookie.net/fallout/images/1/18/FO76_season06_logo03.png', name: 'FO76_season06_logo03.png' }
];

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) return resolve(); // Skip if exists
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                downloadImage(res.headers.location, dest).then(resolve).catch(reject);
            } else {
                reject(`Failed to download ${url}: ${res.statusCode}`);
            }
        }).on('error', reject);
    });
}

async function main() {
    for (const img of images) {
        console.log(`Downloading ${img.name}...`);
        await downloadImage(img.url, path.join(outDir, img.name));
    }
    console.log('Done downloading images.');
}
main();
