const fs = require('fs');
const path = require('path');
const https = require('https');

const ARTICLE_NAME = 'Arcade_Gannon';
const SCRATCH_DIR = path.join(__dirname, '..', 'scratch');

if (!fs.existsSync(SCRATCH_DIR)) {
    fs.mkdirSync(SCRATCH_DIR);
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

async function main() {
    try {
        console.log(`Fetching wikitext for ${ARTICLE_NAME}...`);
        const wikitextData = await fetchJson(`https://fallout.fandom.com/api.php?action=parse&page=${ARTICLE_NAME}&prop=wikitext&format=json`);
        fs.writeFileSync(path.join(SCRATCH_DIR, `${ARTICLE_NAME}_wikitext.json`), JSON.stringify(wikitextData, null, 2));

        console.log(`Fetching gallery images for ${ARTICLE_NAME}/Gallery...`);
        const galleryData = await fetchJson(`https://fallout.fandom.com/api.php?action=parse&page=${ARTICLE_NAME}/Gallery&prop=images&format=json`);
        fs.writeFileSync(path.join(SCRATCH_DIR, `${ARTICLE_NAME}_gallery.json`), JSON.stringify(galleryData, null, 2));

        console.log('Done.');
    } catch (e) {
        console.error('Error:', e);
    }
}

main();
