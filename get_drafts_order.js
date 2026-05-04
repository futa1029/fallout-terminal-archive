const fs = require('fs');
const loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf-8');
const match = loreHtml.match(/const loreEntries = \[([\s\S]*?)\];/);

if (match) {
    const fn = new Function('return [' + match[1] + '];');
    const entries = fn();
    // admin.html shows draft entries reversed
    const drafts = entries.filter(e => e.isDraft).reverse();
    
    console.log("=== First 20 Draft Entries (as seen in admin.html) ===");
    drafts.slice(0, 20).forEach((e, idx) => console.log(`${idx+1}: ${e.title} -> ${e.url}`));
}
