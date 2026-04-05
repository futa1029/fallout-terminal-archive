const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "james", title: "James (Fallout 3)", yomi: "じぇーむず", app: "Fallout 3"}, 
    {slug: "amata", title: "Amata Almodovar", yomi: "あまた", app: "Fallout 3"},
    {slug: "sarah-lyons", title: "Sarah Lyons", yomi: "さらりおんず", app: "Fallout 3"},
    {slug: "owyn-lyons", title: "Owyn Lyons", yomi: "おーうぇんりおんず", app: "Fallout 3"},
    {slug: "john-henry-eden", title: "John Henry Eden", yomi: "じょんへんりーえでん", app: "Fallout 3"},
    {slug: "augustus-autumn", title: "Augustus Autumn", yomi: "おーがすたすおーたむ", app: "Fallout 3"},
    {slug: "three-dog", title: "Three Dog", yomi: "すりーどっぐ", app: "Fallout 3"},
    {slug: "moira-brown", title: "Moira Brown", yomi: "もいらぶらうん", app: "Fallout 3"},
    {slug: "fawkes", title: "Fawkes", yomi: "ふぉーくす", app: "Fallout 3"},
    {slug: "charon", title: "Charon (Fallout 3)", yomi: "かろん", app: "Fallout 3"}
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
    console.log("Updated remove_duplicates.js with 10 Fallout 3 Characters (Batch 1).");
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
