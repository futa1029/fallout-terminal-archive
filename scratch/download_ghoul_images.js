const fs = require('fs');
const path = require('path');
const https = require('https');

const imageUrls = JSON.parse(fs.readFileSync(path.join(__dirname, 'the_ghoul_data', 'image_urls.json'), 'utf8'));
const outputDir = path.join(__dirname, '..', 'images', 'note_extracted', 'the-ghoul');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
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

async function run() {
    for (const img of imageUrls) {
        if (img.name.endsWith('.ogg')) continue;
        
        // Clean filename (replace spaces with underscores, etc.)
        const safeName = img.name.replace(/ /g, '_').toLowerCase();
        const dest = path.join(outputDir, safeName);
        
        if (fs.existsSync(dest)) {
            console.log(`Skipping: ${safeName} (already exists)`);
            continue;
        }

        console.log(`Downloading: ${img.name} -> ${safeName}`);
        try {
            await downloadImage(img.url, dest);
        } catch (err) {
            console.error(`Failed to download ${img.name}: ${err.message}`);
        }
    }
    console.log('All images downloaded.');
}

run();
