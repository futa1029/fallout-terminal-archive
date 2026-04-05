const https = require('https');
const fs = require('fs');

const titles = ["Magnus Westbrooke's holotape", "Gourmands note"];

titles.forEach(t => {
    https.get('https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=' + encodeURIComponent(t) + '&format=json', {headers:{'User-Agent':'Mozilla/5.0'}}, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
            const p = JSON.parse(d).query.pages;
            const key = Object.keys(p)[0];
            if (key !== '-1') {
                const content = p[key].revisions[0].slots.main['*'];
                console.log(`[${t}] FOUND`);
                fs.writeFileSync('f:/Fallout/_drafts/' + t.replace(/[^a-zA-Z]/g, '') + '.txt', content);
            } else {
                console.log(`[${t}] NOT FOUND`);
            }
        })
    });
});
