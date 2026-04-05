const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "acadia-location", title: "Acadia", yomi: "あかでぃあ", app: "Fallout 4 (Far Harbor)"}, 
    {slug: "the-island", title: "The Island", yomi: "しま", app: "Fallout 4 (Far Harbor)"},
    {slug: "echo-lake-lumber", title: "Echo Lake Lumber", yomi: "えこーれいくらんばーみる", app: "Fallout 4 (Far Harbor)"},
    {slug: "national-park-visitors-center", title: "National Park visitor's center", yomi: "こくりつこうえんあんないじょ", app: "Fallout 4 (Far Harbor)"},
    {slug: "dalton-farm", title: "Dalton farm", yomi: "だるとんふぁーむ", app: "Fallout 4 (Far Harbor)"},
    {slug: "red-death-island", title: "Red Death Island", yomi: "れっどですのしま", app: "Fallout 4 (Far Harbor)"},
    {slug: "cranberry-island-bog", title: "Cranberry Island Bog", yomi: "くらんべりーとうのぬまち", app: "Fallout 4 (Far Harbor)"},
    {slug: "vault-tec-among-the-stars", title: "Vault-Tec: Among the Stars", yomi: "ぼるとてっくあまんぐざすたー", app: "Fallout 4 (Nuka-World)"},
    {slug: "home-plate", title: "Home Plate", yomi: "ほーむぷれーと", app: "Fallout 4"},
    {slug: "sunshine-tidings-co-op", title: "Sunshine Tidings co-op", yomi: "さんしゃいんたいでぃんぐすこーぷ", app: "Fallout 4"}
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
        appearance: ["${c.app}"],
        date: "${new Date().toISOString().split('T')[0]}",
        status: "published"
    },\n`;
    }
}

if (injection !== '') {
    let targetStr = 'const manualEntries = [';
    rdContent = rdContent.replace(targetStr, targetStr + '\n' + injection);
    
    fs.writeFileSync(rdPath, rdContent, 'utf8');
    console.log("Updated remove_duplicates.js with 10 Fallout 4 Locations (Batch 20).");
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
