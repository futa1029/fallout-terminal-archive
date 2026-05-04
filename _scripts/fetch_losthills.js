const fs = require('fs');
const https = require('https');
function fetch(url) {
    return new Promise((res, rej) => https.get(url, r => {
        let d='';
        r.on('data', c=>d+=c);
        r.on('end', ()=>res(JSON.parse(d)));
    }).on('error', rej));
}
async function run() {
    try {
        const t = encodeURIComponent("Brotherhood of Steel (Lost Hills)");
        const data = await fetch('https://fallout.fandom.com/api.php?action=parse&page='+t+'&prop=wikitext&format=json');
        fs.writeFileSync('f:/Fallout/_drafts/bos/losthills.txt', data.parse ? data.parse.wikitext['*'] : 'ERROR', 'utf8');
        console.log('Fetched Lost Hills');
    } catch(e) {
        console.error(e);
    }
}
run();
