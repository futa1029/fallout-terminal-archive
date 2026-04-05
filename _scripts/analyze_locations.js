const fs = require('fs');

const data = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/tv_locations_raw.json', 'utf8'));

let sizes = [];

for(const [key, val] of Object.entries(data)) {
    if(val.startsWith('Error') || val.startsWith('Exception')) {
        sizes.push({ title: key, len: 0, status: 'error' });
    } else {
        sizes.push({ title: key, len: val.length, status: 'ok' });
    }
}

sizes.sort((a,b) => b.len - a.length);

console.log('--- Top 20 largest articles ---');
sizes.slice(0, 20).forEach(s => console.log(s.title + ': ' + s.len + ' chars'));

console.log('--- Bottom 20 smallest articles ---');
sizes.slice(-20).forEach(s => console.log(s.title + ': ' + s.len + ' chars'));
