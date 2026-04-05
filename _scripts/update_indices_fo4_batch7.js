const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "db-technical-high-school", title: "D.B. Technical High School", yomi: "でぃーびーてくにかるはいすくーる"},
    {slug: "walden-pond", title: "Walden Pond", yomi: "うぉーるでんぽんど"},
    {slug: "college-square", title: "College Square", yomi: "かれっじすくえあ"},
    {slug: "beantown-brewery", title: "Beantown Brewery", yomi: "びーんたうんじょうぞうじょ"},
    {slug: "sandy-coves-convalescent-home", title: "Sandy Coves Convalescent Home", yomi: "さんでぃこーゔすこんばれっせんとほーむ"},
    {slug: "mahkra-fishpacking", title: "Mahkra Fishpacking", yomi: "まくらふぃっしゅぱっきんぐ"},
    {slug: "federal-ration-stockpile", title: "Federal ration stockpile", yomi: "れんぽうしょくりょうびちくこ"},
    {slug: "the-shamrock-taphouse", title: "The Shamrock Taphouse", yomi: "しゃむろっくさかば"},
    {slug: "wilson-atomatoys-corporate-hq", title: "Wilson Atomatoys corporate HQ", yomi: "うぃるそんあとまといずほんしゃ"},
    {slug: "nahant-oceanological-society", title: "Nahant Oceanological Society", yomi: "なはんと海洋学協会"} // Reading fix
];

chars[9].yomi = "なはんとかいようがくきょうかい";

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
