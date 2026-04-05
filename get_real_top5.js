const fs = require('fs');

const loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf-8');
const match = loreHtml.match(/const loreEntries = \[([\s\S]*?)\];/);

if (match) {
    const fn = new Function('return [' + match[1] + '];');
    const all = fn();
    
    const idx = all.findIndex(e => e.url === 'vault_dweller_lore.html' || (e.title && e.title.includes('Vault Dweller')));
    
    if (idx !== -1) {
        console.log("Vault Dweller found at index:", idx);
        console.log(all.slice(idx, idx + 5).map(e => e.url));
    }
}
