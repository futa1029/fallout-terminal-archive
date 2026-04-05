const fs = require('fs');
const d = fs.readFileSync('F:/Fallout/remove_duplicates.js', 'utf8');
const lines = d.split('\n');
let currentName = '';
let currentCat = '';

const nvList = [];

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('name:')) {
        let m = lines[i].match(/name:\s*"(.*?)"/);
        if (m) currentName = m[1];
    }
    if (lines[i].includes('category:')) {
        let m = lines[i].match(/category:\s*"(.*?)"/);
        if (m) currentCat = m[1];
    }
    if (lines[i].includes('appearance:')) {
        let currentApps = lines[i];
        if (currentApps.includes('Fallout: New Vegas') && currentCat === '人物') {
            nvList.push(currentName);
        }
    }
}
console.log(nvList.join('\n'));
