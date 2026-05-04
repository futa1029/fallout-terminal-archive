const fs = require('fs');
const https = require('https');

const tvSeriesLocations = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/tv_locations_list.json', 'utf8'));
const htmls = fs.readdirSync('f:/Fallout').filter(f => f.endsWith('.html'));

const nonExisting = [];
for(const loc of tvSeriesLocations) {
    const tempName = loc.toLowerCase().replace(/[^a-z0-g0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    let found = false;
    for(const html of htmls) {
        if(html.includes(tempName)) {
            found = true;
            break;
        }
    }
    if(!found) {
        nonExisting.push(loc);
    }
}

let results = {};
let count = 0;

console.log('Fetching ' + nonExisting.length + ' locations...');

nonExisting.forEach(page => {
    let safePage = page.replace(/'/g, "%27");
    const url = 'https://fallout.fandom.com/api.php?action=parse&page=' + encodeURIComponent(safePage) + '&prop=wikitext&format=json';
    https.get(url, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            try {
                const data = JSON.parse(body);
                if(data.parse && data.parse.wikitext) {
                    results[page] = data.parse.wikitext['*'];
                } else {
                    results[page] = 'Error or not found: ' + body;
                }
            } catch(e) {
                results[page] = 'Exception: ' + e.message;
            }
            count++;
            if(count === nonExisting.length) {
                fs.writeFileSync('f:/Fallout/_drafts/tv_locations_raw.json', JSON.stringify(results, null, 2));
                console.log('Done fetching ' + count + ' wikis.');
            }
        });
    }).on('error', (e) => console.log('Error fetching ' + page + ': ' + e.message));
});
