const fs = require('fs');
const files = fs.readdirSync('f:/Fallout/_drafts').filter(f => f.endsWith('_raw.json'));
let pending = [];
for (const rawFile of files) {
    const baseName = rawFile.replace('_raw.json', '').replace(/__/g, '-').replace(/_/g, '-');
    if (!fs.existsSync('f:/Fallout/' + baseName + '.html')) {
        pending.push(rawFile);
    }
}
for (const f of pending) {
   try {
       const j = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/' + f));
       const cats = j.categories || [];
       console.log(f.replace('_raw.json', '') + ' | ' + j.title + ' | ' + cats.slice(0,2).join(', '));
   } catch(e) {}
}
