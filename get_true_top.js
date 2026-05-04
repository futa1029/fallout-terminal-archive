const fs = require('fs');

const loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf-8');
const match = loreHtml.match(/const loreEntries = \[([\s\S]*?)\];/);

if (match) {
    const fn = new Function('return [' + match[1] + '];');
    const all = fn();

    console.log("=== First 20 Entries in lore.html ===");
    all.slice(0, 20).forEach((e, i) => {
        console.log(`${i+1}: TITLE=${e.title || 'undefined'} -> URL=${e.url}`);
    });
}
