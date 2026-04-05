const fs = require('fs');
const path = require('path');

let today = new Date().toISOString().split('T')[0];

function parseBatchFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.matchAll(/slug:\s*['"]([^'"]+)['"]\s*,\s*title:\s*['"]([^'"]+)['"]\s*,\s*titleJa:\s*['"]([^'"]+)['"]/g);
    const results = [];
    for (const m of matches) {
        results.push({
            slug: m[1],
            en: m[2],
            ja: m[3]
        });
    }
    return results;
}

const batch1 = parseBatchFile('f:/Fallout/_batch_gen_tv_cast1.js');
const batch2 = parseBatchFile('f:/Fallout/_batch_gen_tv_cast2.js');

const allChars = [...batch1, ...batch2];
console.log(`Found ${allChars.length} characters.`);

// 1. Update title_to_slug.json
let tsPath = 'f:/Fallout/title_to_slug.json';
let titleToSlug = JSON.parse(fs.readFileSync(tsPath, 'utf8'));

for (let e of allChars) {
    titleToSlug[e.en] = e.slug + '.html';
    titleToSlug[e.ja] = e.slug + '.html';
}
fs.writeFileSync(tsPath, JSON.stringify(titleToSlug, null, 2));
console.log('Updated title_to_slug.json');

// 2. Update remove_duplicates.js manualEntries
let remDupPath = 'f:/Fallout/remove_duplicates.js';
let remDup = fs.readFileSync(remDupPath, 'utf8');

let inserts = "";
// We will put them at the top of the manualEntries list
for (let e of [...allChars].reverse()) {
    if (!remDup.includes(e.slug + ".html")) {
        inserts += `    {
        name: "${e.ja}",
        yomi: "${e.ja}",
        url: "${e.slug}.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "${today}",
        status: "published"
    },\n`;
    }
}

if (inserts !== "") {
    remDup = remDup.replace('const manualEntries = [', 'const manualEntries = [\n' + inserts);
    fs.writeFileSync(remDupPath, remDup);
    console.log("Added entries to remove_duplicates.js");
} else {
    console.log("Entries already exist in remove_duplicates.js");
}

console.log('Done.');
