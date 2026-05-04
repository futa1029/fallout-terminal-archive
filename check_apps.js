const fs = require('fs');
const d = fs.readFileSync('F:/Fallout/remove_duplicates.js', 'utf8');
const matches = d.match(/appearance:\s*\["(.*?)"\]/g);
if (matches) {
    const apps = [...new Set(matches.map(m => m.match(/"(.*?)"/)[1]))];
    console.log(apps.join('\n'));
}
