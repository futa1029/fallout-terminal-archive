const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "vault-88", title: "Vault 88", yomi: "ぼると88"},
    {slug: "vault-75", title: "Vault 75", yomi: "ぼると75"},
    {slug: "the-mechanists-lair", title: "The Mechanist's lair", yomi: "めかにすとのかくれが"},
    {slug: "saugus-ironworks", title: "Saugus Ironworks", yomi: "そうがすせいてつじょ"},
    {slug: "combat-zone", title: "Combat Zone", yomi: "こんばっとぞーん"},
    {slug: "thicket-excavations", title: "Thicket Excavations", yomi: "しけっとえくすかーべーしょんず"},
    {slug: "faneuil-hall", title: "Faneuil Hall", yomi: "ふぁにゅえるほーる"},
    {slug: "shaw-high-school", title: "Shaw High School", yomi: "しょうはいすくーる"},
    {slug: "west-everett-estates", title: "West Everett Estates", yomi: "うえすとえばれっとしゆうち"},
    {slug: "suffolk-county-charter-school", title: "Suffolk County charter school", yomi: "さふぉーくぐんちゃーたーすくーる"}
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
