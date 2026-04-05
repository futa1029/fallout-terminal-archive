const https = require('https');
const fs = require('fs');

const fetchPage = (pageName) => new Promise((resolve, reject) => {
    https.get(`https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(pageName)}&prop=wikitext|images&format=json`, (res) => {
        let body = '';
        res.on('data', d => body += d);
        res.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e);
            }
        });
    }).on('error', reject);
});

async function run() {
    const pages = [
        'Field report: AVR Medical',
        'Stolen supplies (Fallout 76)',
        'AVR Medical Center terminal entries',
        'Charleston terminal entries',
        'Morgantown Airport terminal entries'
    ];

    const results = {};
    for (const page of pages) {
        console.log(`Fetching ${page}...`);
        try {
            const data = await fetchPage(page);
            results[page] = data.parse.wikitext['*'];
        } catch (e) {
            console.error(`Failed to fetch ${page}:`, e);
        }
    }

    fs.writeFileSync('temp_notes_avr.json', JSON.stringify(results, null, 2));
    console.log('Done.');
}
run();
