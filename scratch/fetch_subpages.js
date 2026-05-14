
const https = require('https');
const fs = require('fs');
const path = require('path');

const apiUrl = 'https://fallout.fandom.com/api.php';

const pagesToFetch = [
    'Dorsey\'s diary',
    'Note to self: Names',
    'Note to self: Parts',
    'Note to self: Railings',
    'To-do: Nailgun',
    'To-do: Power armor',
    'To-do: Symbol',
    'Last details',
    'ATLAS research log 104',
    'ATLAS research log 293',
    'ATLAS director\'s password',
    'Back in a bit',
    'ATLAS Observatory terminal entries'
];

function get(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
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

async function fetchSubPages() {
    const results = {};
    for (const pageName of pagesToFetch) {
        console.log(`Fetching wikitext for ${pageName}...`);
        try {
            const res = await get(`${apiUrl}?action=parse&page=${encodeURIComponent(pageName)}&prop=wikitext&format=json`);
            if (res.parse && res.parse.wikitext) {
                results[pageName] = res.parse.wikitext['*'];
            } else {
                results[pageName] = 'NOT FOUND';
            }
        } catch (error) {
            console.error(`Error fetching ${pageName}:`, error);
            results[pageName] = 'ERROR';
        }
    }
    fs.writeFileSync(path.join(__dirname, 'sub_pages.json'), JSON.stringify(results, null, 2));
    console.log('Sub-pages saved.');
}

fetchSubPages();
