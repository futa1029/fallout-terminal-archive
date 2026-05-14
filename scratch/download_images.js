
const https = require('https');
const fs = require('fs');
const path = require('path');

const imageUrls = JSON.parse(fs.readFileSync(path.join(__dirname, 'image_urls.json'), 'utf8'));
const targetDir = 'f:\\Fallout\\images\\atlas-observatory';

async function downloadImage(name, url) {
    const ext = path.extname(new URL(url).pathname);
    const filePath = path.join(targetDir, name);
    
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Failed to download ${name}: ${res.statusCode}`);
                resolve();
                return;
            }
            const fileStream = fs.createWriteStream(filePath);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded ${name}`);
                resolve();
            });
        }).on('error', (err) => {
            console.error(`Error downloading ${name}: ${err.message}`);
            resolve();
        });
    });
}

async function downloadAll() {
    for (const [name, url] of Object.entries(imageUrls)) {
        await downloadImage(name, url);
    }
    console.log('All downloads finished.');
}

downloadAll();
