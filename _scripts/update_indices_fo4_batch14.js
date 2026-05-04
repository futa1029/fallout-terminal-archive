const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "revere-beach-station", title: "Revere Beach station", yomi: "りびあびーちえき"}, 
    {slug: "breakheart-banks", title: "Breakheart Banks", yomi: "ぶれいくはーとばんくす"},
    {slug: "forest-grove-marsh", title: "Forest Grove marsh", yomi: "ふぉれすとぐるーぶまーしゅ"},
    {slug: "croup-manor", title: "Croup Manor", yomi: "くるーぷけのやかた"},
    {slug: "charles-view-amphitheater", title: "Charles View Amphitheater", yomi: "ちゃーるずびゅーえんけいげきじょう"},
    {slug: "wicked-shipping-fleet-lockup", title: "Wicked Shipping Fleet Lockup", yomi: "うぃけっどしっぴんぐふりーとろっくあっぷ"},
    {slug: "jalbert-brothers-disposal", title: "Jalbert Brothers Disposal", yomi: "じゃるばーとぶらざーずはいきじょう"},
    {slug: "listening-post-bravo", title: "Listening Post Bravo", yomi: "かんしきょうぶらぼー"},
    {slug: "fairline-hill-estates", title: "Fairline Hill Estates", yomi: "ふぇあらいんひるえすてーと"},
    {slug: "chestnut-hillock-reservoir", title: "Chestnut Hillock Reservoir", yomi: "ちぇすとなっとひろっくたんく"}
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
