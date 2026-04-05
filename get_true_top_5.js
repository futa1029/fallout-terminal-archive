const fs = require('fs');

const loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf-8');
const match = loreHtml.match(/const loreEntries = \[([\s\S]*?)\];/);

if (match) {
    const fn = new Function('return [' + match[1] + '];');
    const entries = fn();
    
    // admin.html shows allEntries in order, or reverse draft?
    // "Just a moment" usually gets added to the very end of the array (new drafts)
    const drafts = entries.filter(e => e.isDraft).reverse();
    
    // Find index of Vault Dweller in the draft sequence
    let idx = drafts.findIndex(e => e.title && e.title.includes('Vault Dweller'));
    if (idx !== -1) {
        console.log("Found in drafts at:", idx);
        console.log("--- Next 10 candidates from Vault Dweller ---");
        const list = drafts.slice(idx, idx + 20).map(e => e.url);
        
        // Filter by the candidates that actually need lore integration?
        // Wait, the user just said "処理順ですが、どこまで手をつけているのかを私が分かりやすいように、admin.htmlで並んでいる順番で"
        // Then we should probably process the Vault Dweller and the ones following it.
        const candidates = JSON.parse(fs.readFileSync('f:/Fallout/lore_integration_candidates.json', 'utf-8'));
        
        const validTargets = list.filter(u => candidates.includes(u));
        console.log("These need integration:");
        console.log(validTargets.slice(0, 5));
        
        // Also just print the raw next few to see if Vault Dweller is among them
        console.log("Raw next 5:");
        console.log(list.slice(0, 5));
    } else {
        console.log('Not in drafts, checking allEntries in reverse (just in case) or normal');
        let allIdx = entries.findIndex(e => e.title && e.title.includes('Vault Dweller'));
        console.log("Found in allEntries at:", allIdx, "Total:", entries.length);
        
        // Normally newest are at the bottom of lore.html, so if reversed, they are at the top.
        const reversedAll = [...entries].reverse();
        let revIdx = reversedAll.findIndex(e => e.title && e.title.includes('Vault Dweller'));
        console.log("Next 10 in reverse order:");
        console.log(reversedAll.slice(revIdx, revIdx + 10).map(e => e.title + " -> " + e.url).join('\n'));
    }
}
