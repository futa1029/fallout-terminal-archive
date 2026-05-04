const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "robotics-disposal-ground", title: "Robotics disposal ground", yomi: "ろぼっとはいきじょう"},
    {slug: "revere-satellite-array", title: "Revere satellite array", yomi: "りびあえいせいあれい"},
    {slug: "fens-street-sewer", title: "Fens Street sewer", yomi: "ふぇんずすとりーとげすいどう"},
    {slug: "weston-water-treatment-plant", title: "Weston water treatment plant", yomi: "うぇすとんみずしょりじょう"},
    {slug: "vault-tec-regional-hq", title: "Vault-Tec Regional HQ", yomi: "ぼるとてっくちくほんぶ"},
    {slug: "fiddlers-green-trailer-estates", title: "Fiddler's Green Trailer Estates", yomi: "ふぃどらーずぐりーんとれーらーえすてーと"},
    {slug: "medford-memorial-hospital", title: "Medford Memorial Hospital", yomi: "めどふぉーどきねんびょういん"},
    {slug: "coast-guard-pier", title: "Coast Guard pier", yomi: "えんがんけいびたいのぴあ"},
    {slug: "milton-general-hospital", title: "Milton General Hospital", yomi: "みるとんじぇねらるびょういん"},
    {slug: "hyde-park", title: "Hyde Park", yomi: "はいどぱーく"}
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
