const https = require('https');
const fs = require('fs');

const pages = [
  'Hannah (Wastelanders)',
  'Lotus',
  "Mire's Eye",
  'Penny (Wild Appalachia)'
];

const data = {};

async function fetchWiki(page) {
    return new Promise((resolve, reject) => {
        const url = `https://fallout.fandom.com/api.php?action=query&prop=revisions|images&rvprop=content&rvslots=main&titles=${encodeURIComponent(page)}&format=json`;
        https.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                const json = JSON.parse(body);
                const pages = json.query.pages;
                const pageId = Object.keys(pages)[0];
                const content = pages[pageId].revisions ? pages[pageId].revisions[0].slots.main['*'] : '';
                const images = pages[pageId].images ? pages[pageId].images.map(img => img.title) : [];
                resolve({ content, images });
            });
        }).on('error', reject);
    });
}

async function main() {
    for (const page of pages) {
        console.log(`Fetching ${page}...`);
        try {
            data[page] = await fetchWiki(page);
        } catch (e) {
            console.error(e);
        }
    }
    fs.writeFileSync('f:/Fallout/_wikitext_batch9.json', JSON.stringify(data, null, 2));
    console.log('Done.');
}

main();
