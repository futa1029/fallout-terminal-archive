const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "old-north-church", title: "Old North Church", yomi: "おーるどのーすちゃーち"},
    {slug: "trinity-tower", title: "Trinity Tower", yomi: "とりにてぃたわー"},
    {slug: "general-atomics-galleria", title: "General Atomics Galleria", yomi: "ぜねらるあとみっくすがれりあ"},
    {slug: "cambridge-polymer-labs", title: "Cambridge Polymer Labs", yomi: "けんぶりっじぽりまーけんきゅうじょ"},
    {slug: "hardware-town", title: "Hardware Town", yomi: "はーどうぇあたうん"},
    {slug: "easy-city-downs", title: "Easy City Downs", yomi: "いーじーしてぃだうんず"},
    {slug: "pickman-gallery", title: "Pickman Gallery", yomi: "ぴっくまんぎゃらりー"},
    {slug: "museum-of-witchcraft", title: "Museum of Witchcraft", yomi: "されむまじょはくぶつかん"},
    {slug: "cabot-house", title: "Cabot House", yomi: "かぼっとてい"},
    {slug: "salem", title: "Salem", yomi: "されむ"}
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
