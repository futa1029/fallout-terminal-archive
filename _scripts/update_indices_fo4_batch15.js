const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "greater-mass-blood-clinic", title: "Greater Mass blood clinic", yomi: "まさちゅーせっつけつえきくりにっく"}, 
    {slug: "lake-quannapowitt", title: "Lake Quannapowitt", yomi: "くあなぽうぃっとこ"},
    {slug: "nordhagen-beach", title: "Nordhagen Beach", yomi: "のーどはーげんびーち"},
    {slug: "reeb-marina", title: "Reeb Marina", yomi: "りーぶまりーな"},
    {slug: "ticonderoga", title: "Ticonderoga", yomi: "たいこんでろが"},
    {slug: "bedford-station", title: "Bedford Station", yomi: "べっどふぉーどえき"},
    {slug: "crater-of-atom", title: "Crater of Atom", yomi: "くれーたーおぶあとむ"},
    {slug: "cutler-bend", title: "Cutler Bend", yomi: "かとらーべんど"},
    {slug: "drumlin-diner", title: "Drumlin Diner", yomi: "どらむりんだいなー"},
    {slug: "hangmans-alley", title: "Hangman's Alley", yomi: "はんぐまんずありー"}
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
