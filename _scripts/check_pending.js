const fs = require('fs');
const files = fs.readdirSync('f:/Fallout/_drafts').filter(f => f.endsWith('_raw.json'));
let pending = [];
for (const rawFile of files) {
    // try different replacements
    let baseName = rawFile.replace('_raw.json', '').replace(/__/g, '-').replace(/_/g, '-');
    if (!fs.existsSync('f:/Fallout/' + baseName + '.html')) {
        // test alternative base names? like some have "tv-series" but the actual html doesn't?
        pending.push(rawFile);
    }
}
fs.writeFileSync('f:/Fallout/_scripts/remaining_15.txt', pending.join('\n'), 'utf8');
