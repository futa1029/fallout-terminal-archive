const fs = require('fs');

const data = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/tv_locations_raw.json', 'utf8'));

let sizes = [];

for(const [key, val] of Object.entries(data)) {
    if(val.startsWith('Error') || val.startsWith('Exception')) {
        sizes.push({ title: key, len: 0, status: 'error', errorMsg: val });
    } else {
        sizes.push({ title: key, len: val.length, status: 'ok' });
    }
}

sizes.sort((a,b) => b.len - a.len);

console.log('--- Errors ---');
sizes.filter(s => s.status === 'error').forEach(s => console.log(s.title + ': ' + s.errorMsg));

console.log('--- Top 10 largest articles ---');
sizes.slice(0, 10).forEach(s => console.log(s.title + ': ' + s.len + ' chars'));

console.log('--- Bottom 10 smallest articles ---');
let oks = sizes.filter(s=>s.status === 'ok');
oks.slice(-10).forEach(s => console.log(s.title + ': ' + s.len + ' chars'));
