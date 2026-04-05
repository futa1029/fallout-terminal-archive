const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "borous", title: "Borous", yomi: "ぼろす", app: "Fallout: New Vegas (Old World Blues)"}, 
    {slug: "lily-bowen", title: "Lily Bowen", yomi: "りりぃぼうえん", app: "Fallout: New Vegas"},
    {slug: "chief-hanlon", title: "Chief Hanlon", yomi: "はんろん", app: "Fallout: New Vegas"},
    {slug: "swank", title: "Swank", yomi: "すわんく", app: "Fallout: New Vegas"},
    {slug: "muggy", title: "Muggy", yomi: "まぎー", app: "Fallout: New Vegas (Old World Blues)"},
    {slug: "sink-central-intelligence-unit", title: "Sink Central Intelligence Unit", yomi: "しんくちゅうおう", app: "Fallout: New Vegas (Old World Blues)"},
    {slug: "james-hsu", title: "James Hsu", yomi: "じぇーむずしゅー", app: "Fallout: New Vegas"},
    {slug: "silus", title: "Silus", yomi: "さいらす", app: "Fallout: New Vegas"},
    {slug: "manny-vargas", title: "Manny Vargas", yomi: "まにーばるがす", app: "Fallout: New Vegas"},
    {slug: "jason-bright", title: "Jason Bright", yomi: "じぇいそんぶらいと", app: "Fallout: New Vegas"}
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
        category: "人物",
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
    console.log("Updated remove_duplicates.js with 10 Fallout New Vegas Characters (Batch 4).");
} else {
    console.log("Characters already exist in remove_duplicates.js. Updating names if needed.");
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
