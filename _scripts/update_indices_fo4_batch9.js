const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "fort-hagen", title: "Fort Hagen", yomi: "へーげんとりで"},
    {slug: "the-switchboard", title: "The Switchboard", yomi: "すうぃっちぼーど"},
    {slug: "vault-114", title: "Vault 114", yomi: "ゔぉると114"},
    {slug: "atom-cats-garage", title: "Atom Cats garage", yomi: "あとむきゃっつのがれーじ"},
    {slug: "big-johns-salvage", title: "Big John's Salvage", yomi: "びっぐじょんのさるべーじじょう"},
    {slug: "med-tek-research", title: "Med-Tek Research", yomi: "めっどてっくりさーち"},
    {slug: "general-atomics-factory", title: "General Atomics factory", yomi: "ぜねらるあとみっくすこうじょう"},
    {slug: "kendall-hospital", title: "Kendall Hospital", yomi: "けんだるびょういん"},
    {slug: "cit-ruins", title: "C.I.T. ruins", yomi: "しーあいてぃーはいきょ"},
    {slug: "badtfl-regional-office", title: "BADTFL regional office", yomi: "ばっどてふるちほうきょく"}
];

// Update remove_duplicates.js
let rdPath = path.join('F:/Fallout', 'remove_duplicates.js');
let rdContent = fs.readFileSync(rdPath, 'utf8');

let injection = '';
for (let c of chars) {
    if (!rdContent.includes(`url: "${c.slug}.html"`)) {
        injection += `    {
        name: "${c.title}",
        yomi: "${c.yomi}",
        url: "${c.slug}.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "${new Date().toISOString().split('T')[0]}",
        status: "published"
    },\n`;
    }
}

if (injection !== '') {
    let targetStr = 'const manualEntries = [';
    rdContent = rdContent.replace(targetStr, targetStr + '\n' + injection);
    
    fs.writeFileSync(rdPath, rdContent, 'utf8');
    console.log("Updated remove_duplicates.js with 10 Fallout 4 Locations.");
} else {
    console.log("Locations already exist in remove_duplicates.js");
}

// Update title_to_slug.json
let tsPath = path.join('F:/Fallout', 'title_to_slug.json');
let tsData = JSON.parse(fs.readFileSync(tsPath, 'utf8'));

let tsUpdated = false;
for (let c of chars) {
    let tLower = c.title.toLowerCase();
    if (!tsData[tLower]) {
        tsData[tLower] = c.slug;
        tsUpdated = true;
    }
}

if (tsUpdated) {
    fs.writeFileSync(tsPath, JSON.stringify(tsData, null, 4), 'utf8');
    console.log("Updated title_to_slug.json.");
} else {
    console.log("No updates needed for title_to_slug.json.");
}
