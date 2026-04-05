const fs = require('fs');
const loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf-8');
const match = loreHtml.match(/const loreEntries = \[([\s\S]*?)\];/);

if (match) {
    const fn = new Function('return [' + match[1] + '];');
    const all = fn();
    const drafts = all.filter(e => e.isDraft).reverse();

    const idx = drafts.findIndex(e => e.title && (e.title.includes('Just a moment') || e.title.includes('SUPPORT THE')));
    if (idx !== -1) {
        console.log("Found in drafts around index:", idx);
        console.log(drafts.slice(Math.max(0, idx - 2), idx + 10).map(e => e.title + ' -> ' + e.url).join('\n'));
    } else {
        console.log("Not found in drafts. Checking allEntries...");
        const aIdx = all.findIndex(e => e.title && (e.title.includes('Just a moment') || e.title.includes('SUPPORT THE')));
        if (aIdx !== -1) {
             console.log("Found in all around index:", aIdx);
             console.log(all.slice(Math.max(0, aIdx - 2), aIdx + 10).map(e => e.title + ' -> ' + e.url).join('\n'));
        } else {
            // Also admin.html reverses all? Wait, admin.html reverses ONLY drafts.
            // Wait, maybe the entries array itself in admin.html has it?
            console.log("Not found anywhere in lore.html by 'Just a moment'");
            
            // Just search for "Vault Dweller"
            const vIdx = all.findIndex(e => e.title && e.title.includes('Vault Dweller'));
            if (vIdx !== -1) console.log("Vault Dweller in all at:", vIdx, all[vIdx].url);
        }
    }
}
