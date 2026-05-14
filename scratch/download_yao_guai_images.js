const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { name: 'Yao_guai.png', title: 'Yao guai' },
    { name: 'FO4_Yao_guai.png', title: 'Yao guai (Fallout 4)' },
    { name: 'Fo76_Glowing_yao_guai.png', title: 'Yao guai (Fallout 76)' },
    { name: 'GhostOfShe.png', title: 'Ghost of She' },
    { name: 'Raven_Rock_-_Yao_Guai_research.jpg', title: 'Raven Rock' },
    { name: 'FoTV_yao_guai.png', title: 'Yao guai (TV series)' },
    { name: 'Fo76wa_bear_arm.png', title: 'Bear arm' }
];

const targetDir = 'f:/Fallout/images/note_extracted/yao-guai';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function getImageUrl(name) {
    const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${name}&prop=imageinfo&iiprop=url&format=json`;
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pageId === '-1') return resolve(null);
                    resolve(pages[pageId].imageinfo[0].url);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function main() {
    for (const img of images) {
        try {
            console.log(`Fetching URL for ${img.name}...`);
            const url = await getImageUrl(img.name);
            if (url) {
                const dest = path.join(targetDir, img.name);
                await downloadImage(url, dest);
                console.log(`Downloaded ${img.name} to ${dest}`);
            } else {
                console.warn(`Could not find URL for ${img.name}`);
            }
        } catch (e) {
            console.error(`Error downloading ${img.name}: ${e.message}`);
        }
    }
}

main();
