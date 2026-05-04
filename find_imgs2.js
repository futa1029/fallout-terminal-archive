const https = require('https');
https.get('https://fallout.fandom.com/api.php?action=query&list=search&srsearch=Ticonderoga&srnamespace=6&format=json', r => {
    let d = ''; r.on('data', c=>d+=c);
    r.on('end', () => console.log(JSON.parse(d).query.search.map(x=>x.title).join('\n')));
});
