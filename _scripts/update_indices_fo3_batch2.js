const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "butch-deloria", title: "Butch DeLoria", yomi: "ぶっちでろりあ", app: "Fallout 3"}, 
    {slug: "jericho", title: "Jericho (Fallout 3)", yomi: "じぇりこ", app: "Fallout 3"},
    {slug: "clover", title: "Clover", yomi: "くろーばー", app: "Fallout 3"},
    {slug: "star-paladin-cross", title: "Star Paladin Cross", yomi: "くろす", app: "Fallout 3"},
    {slug: "dogmeat-fo3", title: "Dogmeat (Fallout 3)", yomi: "どっぐみーと", app: "Fallout 3"},
    {slug: "mayor-maccready", title: "Mayor MacCready", yomi: "まくれでぃしちょう", app: "Fallout 3"},
    {slug: "madison-li", title: "Madison Li", yomi: "までぃそんりー", app: "Fallout 3"},
    {slug: "arthur-maxson", title: "Arthur Maxson", yomi: "あーさーまくそん", app: "Fallout 3"},
    {slug: "flak", title: "Flak", yomi: "ふらっく", app: "Fallout 3"},
    {slug: "shrapnel", title: "Shrapnel", yomi: "しゅらぷねる", app: "Fallout 3"}
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
    console.log("Updated remove_duplicates.js with 10 Fallout 3 Characters (Batch 2).");
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
