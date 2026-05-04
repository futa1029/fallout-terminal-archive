const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "oliver-swanick", title: "Oliver Swanick", yomi: "おりばーすわにっく", app: "Fallout: New Vegas"}, 
    {slug: "motor-runner", title: "Motor-Runner", yomi: "もーたーらんなー", app: "Fallout: New Vegas"},
    {slug: "cook-cook", title: "Cook-Cook", yomi: "くっくくっく", app: "Fallout: New Vegas"},
    {slug: "driver-nephi", title: "Driver Nephi", yomi: "どらいばーねふぃ", app: "Fallout: New Vegas"},
    {slug: "follows-chalk", title: "Follows-Chalk", yomi: "ふぉろーずちょーく", app: "Fallout: New Vegas (Honest Hearts)"},
    {slug: "daniel-honest-hearts", title: "Daniel (Honest Hearts)", yomi: "だにえる", app: "Fallout: New Vegas (Honest Hearts)"},
    {slug: "red-lucy", title: "Red Lucy", yomi: "れっどるーしー", app: "Fallout: New Vegas"},
    {slug: "orion-moreno", title: "Orion Moreno", yomi: "おりおんもれの", app: "Fallout: New Vegas"},
    {slug: "dr-henry", title: "Dr. Henry", yomi: "へんりー", app: "Fallout: New Vegas"},
    {slug: "beagle", title: "Beagle", yomi: "びーぐる", app: "Fallout: New Vegas"}
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
    console.log("Updated remove_duplicates.js with 10 Fallout New Vegas Characters (Batch 5).");
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
