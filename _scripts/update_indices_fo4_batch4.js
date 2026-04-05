const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "museum-of-freedom", title: "Museum of Freedom", yomi: "じゆうはくぶつかん"},
    {slug: "cambridge-police-station", title: "Cambridge Police Station", yomi: "けんぶりっじけいさつしょ"},
    {slug: "national-guard-training-yard", title: "National Guard training yard", yomi: "しゅうへいくんれんじょ"},
    {slug: "spectacle-island", title: "Spectacle Island", yomi: "すぺくたくるあいらんど"},
    {slug: "hallucigen-inc", title: "HalluciGen, Inc.", yomi: "はるしじぇんしゃ"},
    {slug: "vault-118", title: "Vault 118", yomi: "ぼると118"},
    {slug: "boston-public-library", title: "Boston Public Library", yomi: "ぼすとんこうきょうとしょかん"},
    {slug: "sentinel-site", title: "Sentinel site", yomi: "せんちねるさいと"},
    {slug: "vim-pop-factory", title: "Vim! Pop factory", yomi: "ゔぃむぽっぷこうじょう"},
    {slug: "kiddie-kingdom", title: "Kiddie Kingdom", yomi: "きっでぃきんぐだむ"}
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
