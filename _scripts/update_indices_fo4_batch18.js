const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "county-crossing", title: "County crossing", yomi: "かうんてぃーくろっしんぐ"}, 
    {slug: "greentop-nursery", title: "Greentop Nursery", yomi: "ぐりーんとっぷさいえん"},
    {slug: "egret-tours-marina", title: "Egret Tours Marina", yomi: "いーぐれっとつあーまりーな"},
    {slug: "somerville-place", title: "Somerville Place", yomi: "さまーびるぷれいす"},
    {slug: "outpost-zimonja", title: "Outpost Zimonja", yomi: "じもんやぜんしょうきち"},
    {slug: "oberland-station", title: "Oberland station", yomi: "おばーらんどえき"},
    {slug: "taffington-boathouse", title: "Taffington boathouse", yomi: "たふぃんとんぼーとはうす"},
    {slug: "coastal-cottage", title: "Coastal cottage", yomi: "えんがんのこてーじ"},
    {slug: "power-noodles", title: "Power Noodles", yomi: "ぱわーぬーどる"},
    {slug: "mega-surgery-center", title: "Mega surgery center", yomi: "めがせいけいげかせんたー"}
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
