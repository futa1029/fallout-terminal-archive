const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "elijah", title: "Elijah", yomi: "えりや", app: "Fallout: New Vegas (Dead Money)"}, 
    {slug: "dean-domino", title: "Dean Domino", yomi: "でぃーんどみの", app: "Fallout: New Vegas (Dead Money)"},
    {slug: "christine-royce", title: "Christine Royce", yomi: "くりすてぃーんろいす", app: "Fallout: New Vegas (Dead Money)"},
    {slug: "mobius", title: "Mobius", yomi: "もびうす", app: "Fallout: New Vegas (Old World Blues)"},
    {slug: "klein", title: "Klein (Old World Blues)", yomi: "くらいん", app: "Fallout: New Vegas (Old World Blues)"},
    {slug: "marcus", title: "Marcus", yomi: "まーかす", app: "Fallout: New Vegas"},
    {slug: "raul-tejada", title: "Raul Tejada", yomi: "らうるてはだ", app: "Fallout: New Vegas"},
    {slug: "papa-khan", title: "Papa Khan", yomi: "ぱぱかーん", app: "Fallout: New Vegas"},
    {slug: "gloria-van-graff", title: "Gloria Van Graff", yomi: "ぐろりあばんぐらふ", app: "Fallout: New Vegas"},
    {slug: "fantastic", title: "Fantastic", yomi: "ふぁんたすてぃっく", app: "Fallout: New Vegas"}
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
    console.log("Updated remove_duplicates.js with 10 Fallout New Vegas Characters (Batch 2).");
} else {
    console.log("Characters already exist in remove_duplicates.js");
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
