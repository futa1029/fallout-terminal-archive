const fs = require('fs');
const https = require('https');

function fetch(url) {
    return new Promise((res, rej) => {
        https.get(url, r => {
            let d = '';
            r.on('data', c => d += c);
            r.on('end', () => {
                try {
                    res(JSON.parse(d));
                } catch(e) {
                    rej(e);
                }
            });
        }).on('error', rej);
    });
}

async function run() {
    const terms = [
        "Captain Maxson's diary",
        'The nuclear option (holotape)',
        'Patient log: Y-17',
        'Patient log: Y-17.5',
        'Patient log: Y-17.0',
        'Radio log: Aug 29 2077',
        "Taggerdy's Journal: NOV 04 2077",
        "Shelley's letter",
        "Henry's letter",
        'Brotherhood of Steel mission holotape'
    ];
    for (const t of terms) {
        try {
            const data = await fetch('https://fallout.fandom.com/api.php?action=parse&page=' + encodeURIComponent(t) + '&prop=wikitext&format=json');
            const fname = 'f:/Fallout/_drafts/bos/holo_' + t.replace(/[^a-zA-Z0-9]/g,'') + '.txt';
            fs.writeFileSync(fname, data.parse ? data.parse.wikitext['*'] : 'ERROR', 'utf8');
            console.log('Fetched ' + t);
        } catch(e) {
            console.error('Failed ' + t, e.message);
        }
    }
}
run();
