const fs = require('fs');

const loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf-8');
const match = loreHtml.match(/const loreEntries = \[([\s\S]*?)\];/);

if (match) {
    const fn = new Function('return [' + match[1] + '];');
    const all = fn();

    // The user mentions "Just a moment..." (3 items), "SUPPORT THE ARCHIVES", and then "Vault Dweller"
    // Let's find exactly these entries.
    const justAMomentIndexes = [];
    const supportIndex = [];
    const vaultDwellerIndexes = [];
    
    // Check allEntries naturally
    all.reverse().forEach((e, i) => {
        if (!e.title) return;
        if (e.title.includes('Just a moment')) justAMomentIndexes.push(i);
        if (e.title.includes('SUPPORT THE ARCHIVES')) supportIndex.push(i);
        if (e.title.toLowerCase().includes('vault dweller')) vaultDwellerIndexes.push(i);
    });
    
    console.log("Just a moment occurrences (in reversed allEntries):", justAMomentIndexes.map(i => `${i} (${all[i].url})`));
    console.log("SUPPORT THE ARCHIVES occurrences:", supportIndex.map(i => `${i} (${all[i].url})`));
    console.log("Vault Dweller occurrences:", vaultDwellerIndexes.map(i => `${i} (${all[i].url})`));

    // If there is an obvious sequence, output the subsequent urls
    if (justAMomentIndexes.length > 0) {
        const start = justAMomentIndexes[0];
        console.log("\nSequence from", start, ":");
        for (let j = start; j < start + 20; j++) {
            if (all[j]) {
                console.log(`[${j}] ${all[j].title} (${all[j].url})`);
            }
        }
    }
}
