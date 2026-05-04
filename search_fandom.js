const https = require('https');
const fs = require('fs');

const titles = ["Magnus Westbrook", "Gourmand"];
titles.forEach(t => {
    https.get('https://fallout.fandom.com/api.php?action=query&list=search&srsearch=' + encodeURIComponent(t) + '&format=json', {headers:{'User-Agent':'Mozilla/5.0'}}, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
            const p = JSON.parse(d).query.search;
            console.log("--- " + t + " ---");
            p.forEach(s => console.log(s.title));
        });
    });
});
