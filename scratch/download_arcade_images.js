const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES = [
    'Gannon family Tesla armor icon.png',
    'RemnantsTeslaArmor.png',
    'Arcade Gannon Front.png',
    'FOWW,ArcadeUnitCard.jpg',
    'Fallout wasteland warfare mojave companions Boone, Arcade & Cass.png',
    'Fallout NPC Pack 2 - Enclave Remnants Arcade Gannon.png',
    'SIMPLE Arcade binder.jpg',
    'Zachary Levi booth.png'
];

const TARGET_DIR = path.join(__dirname, '..', 'images', 'arcade-gannon');

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: { 'User-Agent': 'FalloutTerminalArchive/1.0 (Contact: futa1029@gmail.com)' }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (res) => {
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function main() {
    for (const imageName of IMAGES) {
        try {
            console.log(`Fetching URL for ${imageName}...`);
            const apiUrl = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(imageName)}&prop=imageinfo&iiprop=url&format=json`;
            const data = await fetchJson(apiUrl);
            
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            if (pageId === '-1') {
                console.warn(`File ${imageName} not found.`);
                continue;
            }
            
            const imageUrl = pages[pageId].imageinfo[0].url;
            const safeName = imageName.replace(/,/g, '').replace(/ /g, '_');
            const dest = path.join(TARGET_DIR, safeName);
            
            if (fs.existsSync(dest)) {
                console.log(`Skipping ${safeName}, already exists.`);
                continue;
            }
            
            console.log(`Downloading ${imageUrl} to ${dest}...`);
            await downloadFile(imageUrl, dest);
        } catch (e) {
            console.error(`Error with ${imageName}:`, e);
        }
    }
    console.log('Done.');
}

main();
