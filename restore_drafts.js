const fs = require('fs');

function getEntries(file) {
    const html = fs.readFileSync(file, 'utf8');
    const startIdx = html.indexOf('const loreEntries = [');
    const endIdx = html.indexOf('];', startIdx);
    const arrStr = html.substring(startIdx + 20, endIdx + 1);
    const fn = new Function('return ' + arrStr);
    const entries = fn();
    return { html, startIdx, endIdx, entries };
}

console.log('Reading old lore.html...');
const oldData = getEntries('f:/Fallout/lore_old.html');
const oldDrafts = new Set();
oldData.entries.forEach(e => {
    if (e.isDraft) {
        oldDrafts.add(e.url);
    }
});
console.log('Old drafts count:', oldDrafts.size);

console.log('Reading current lore.html...');
const currentData = getEntries('f:/Fallout/lore.html');
let restoredCount = 0;

currentData.entries.forEach(e => {
    // If it was a draft previously, and is not a draft now, restore it
    if (oldDrafts.has(e.url) && !e.isDraft) {
        e.isDraft = true;
        restoredCount++;
    }
    // Edge case: dave-fo3.html might not be in oldDrafts if it was ALWAYS missing isDraft
    // Let's hardcode some known missing ones just in case?
    // Wait, let's see how many get restored.
});

// Also any article that isn't in oldData at all (newly appended chunks) MUST be drafts unless specified
currentData.entries.forEach(e => {
    if (!oldData.entries.find(o => o.url === e.url)) {
        if (!e.isDraft) {
            e.isDraft = true;
            restoredCount++;
            console.log('Set new article to draft:', e.url);
        }
    }
});

// Specifically ensure dave-fo3.html is draft if not already
const dave = currentData.entries.find(e => e.url === 'dave-fo3.html');
if (dave && !dave.isDraft) {
    dave.isDraft = true;
    console.log('Set Dave to draft');
    restoredCount++;
}

console.log('Restored isDraft: true to', restoredCount, 'entries.');

const newArrStr = JSON.stringify(currentData.entries, null, 4)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/name: "ドクター・"ノーズ"・エドモンドソン"/, 'name: "ドクター・\\"ノーズ\\"・エドモンドソン"')
    .replace(/yomi: "どくたー・"のーず"・えどもんどそん"/, 'yomi: "どくたー・\\"のーず\\"・えどもんどそん"');

const newHtml = currentData.html.substring(0, currentData.startIdx + 20) + 
                newArrStr + 
                currentData.html.substring(currentData.endIdx + 1);

fs.writeFileSync('f:/Fallout/lore.html', newHtml, 'utf8');
console.log('lore.html updated successfully.');
