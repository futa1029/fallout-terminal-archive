const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "dave-fo3", title: "Dave", yomi: "でいぶだいとうりょう", app: "Fallout 3"}, 
    {slug: "roy-phillips", title: "Roy Phillips", yomi: "ろいふぃりっぷす", app: "Fallout 3"},
    {slug: "sticky", title: "Sticky", yomi: "すてぃっきー", app: "Fallout 3"},
    {slug: "gob", title: "Gob", yomi: "ごぶ", app: "Fallout 3"},
    {slug: "colin-moriarty", title: "Colin Moriarty", yomi: "こりんもりあてぃ", app: "Fallout 3"},
    {slug: "lucas-simms", title: "Lucas Simms", yomi: "るーかすしむず", app: "Fallout 3"},
    {slug: "sydney", title: "Sydney", yomi: "しどにー", app: "Fallout 3"},
    {slug: "herbert-dashwood", title: "Herbert Dashwood", yomi: "はーばーとだっしゅうっど", app: "Fallout 3"},
    {slug: "argyle", title: "Argyle", yomi: "あーがいる", app: "Fallout 3"},
    {slug: "pinkerton", title: "Pinkerton", yomi: "ぴんかとん", app: "Fallout 3"}
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
    console.log("Updated remove_duplicates.js with 10 Fallout 3 Characters (Batch 4).");
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
