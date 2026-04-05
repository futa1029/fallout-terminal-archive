const fs = require('fs');

const loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf-8');
const match = loreHtml.match(/const loreEntries = \[([\s\S]*?)\];/);

if (match) {
    const fn = new Function('return [' + match[1] + '];');
    const all = fn();
    // admin.html shows draft entries reversed
    const drafts = all.filter(e => e.isDraft).reverse();

    console.log("=== First 40 Drafts (admin.html order) ===");
    for (let i = 0; i < 40; i++) {
        const e = drafts[i];
        if (!e) break;
        console.log(`${i+1}: URL=${e.url}, TITLE=${e.title}`);
    }
}
