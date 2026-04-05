const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "diamond-city", title: "Diamond City", yomi: "だいあもんどしてぃ"},
    {slug: "the-prydwen", title: "The Prydwen", yomi: "ぷりどぅえん"},
    {slug: "the-castle", title: "The Castle", yomi: "きゃっする"},
    {slug: "vault-81", title: "Vault 81", yomi: "ぼると81"},
    {slug: "quincy-ruins", title: "Quincy ruins", yomi: "くいんしーあとち"},
    {slug: "mass-fusion-building", title: "Mass Fusion building", yomi: "ますふゅーじょんびる"},
    {slug: "covenant", title: "Covenant", yomi: "こべなんと"},
    {slug: "dunwich-borers", title: "Dunwich Borers", yomi: "だんうぃっちぼーらー"},
    {slug: "sanctuary-hills", title: "Sanctuary Hills", yomi: "さんくちゅありひるず"},
    {slug: "bunker-hill", title: "Bunker Hill", yomi: "ばんかーひる"}
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
