const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "hallucigen-inc", title: "HalluciGen, Inc.", yomi: "はるしじぇんしゃ"},
    {slug: "east-boston-preparatory-school", title: "East Boston Preparatory School", yomi: "いーすとぼーすとんぷれっぷすくーる"},
    {slug: "boston-police-rationing-site", title: "Boston Police rationing site", yomi: "ぼすとんけいさつはいきゅうじょ"},
    {slug: "mass-bay-medical-center", title: "Mass Bay Medical Center", yomi: "ますべいいりょうせんたー"},
    {slug: "federal-surveillance-center-k-21b", title: "Federal Surveillance Center K-21B", yomi: "れんぽうかんしせんたーk21b"},
    {slug: "south-boston-military-checkpoint", title: "South Boston military checkpoint", yomi: "みなみぼすとんぐんぼうえいせん"},
    {slug: "poseidon-energy-fo4", title: "Poseidon Energy", yomi: "ぽせいどんえねるぎー"},
    {slug: "hub-city-auto-wreckers", title: "Hub City Auto Wreckers", yomi: "はぶしてぃおーとうぉれっかーず"},
    {slug: "wattz-consumer-electronics", title: "Wattz Consumer Electronics", yomi: "わっつえれくとろにくす"},
    {slug: "wilson-atomatoys-factory", title: "Wilson Atomatoys factory", yomi: "うぃるそんあとまといずこうじょう"}
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
