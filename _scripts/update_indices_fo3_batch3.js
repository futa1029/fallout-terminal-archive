const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "agatha", title: "Agatha", yomi: "あがさ", app: "Fallout 3"}, 
    {slug: "allistair-tenpenny", title: "Allistair Tenpenny", yomi: "ありすてあてんぺにー", app: "Fallout 3"},
    {slug: "sierra-petrovita", title: "Sierra Petrovita", yomi: "しえらぺとろびた", app: "Fallout 3"},
    {slug: "zimmer", title: "Dr. Zimmer", yomi: "じまー", app: "Fallout 3"},
    {slug: "uncle-leo", title: "Uncle Leo", yomi: "あんくるれお", app: "Fallout 3"},
    {slug: "desmond-lockheart", title: "Desmond Lockheart", yomi: "でずもんどろっくはーと", app: "Fallout 3 (Point Lookout)"},
    {slug: "calvert", title: "Calvert", yomi: "かるばーと", app: "Fallout 3 (Point Lookout)"},
    {slug: "ishmael-ashur", title: "Ishmael Ashur", yomi: "あっしゃー", app: "Fallout 3 (The Pitt)"},
    {slug: "wernher", title: "Wernher", yomi: "わーなー", app: "Fallout 3 (The Pitt)"},
    {slug: "jingwei", title: "General Jingwei", yomi: "じんうぇいしょうぐん", app: "Fallout 3 (Operation Anchorage)"}
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
    console.log("Updated remove_duplicates.js with 10 Fallout 3 Characters (Batch 3).");
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
