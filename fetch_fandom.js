const https = require('https');
const fs = require('fs');

const urls = [
    { url: 'https://fallout.fandom.com/wiki/Cave_cricket_(Fallout_76)', name: 'f76.html' },
    { url: 'https://fallout.fandom.com/wiki/Cave_cricket_(Nuka-World)', name: 'nw.html' }
];

urls.forEach(u => {
    https.get(u.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            fs.writeFileSync(u.name, data);
            console.log(`Saved ${u.name}`);
        });
    });
});
