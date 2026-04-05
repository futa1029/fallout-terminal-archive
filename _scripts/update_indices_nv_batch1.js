const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "robert-house", title: "Robert House", yomi: "ろばーとはうす", app: "Fallout: New Vegas"}, 
    {slug: "ulysses", title: "Ulysses", yomi: "ゆりしーず", app: "Fallout: New Vegas"},
    {slug: "caesar", title: "Caesar", yomi: "しーざー", app: "Fallout: New Vegas"},
    {slug: "joshua-graham", title: "Joshua Graham", yomi: "じょしゅあぐらはむ", app: "Fallout: New Vegas"},
    {slug: "arcade-gannon", title: "Arcade Gannon", yomi: "あーけいどぎゃのん", app: "Fallout: New Vegas"},
    {slug: "veronica-santangelo", title: "Veronica Santangelo", yomi: "べろにかさんたんじぇろ", app: "Fallout: New Vegas"},
    {slug: "craig-boone", title: "Craig Boone", yomi: "くれいぐぶーん", app: "Fallout: New Vegas"},
    {slug: "benny", title: "Benny", yomi: "べにー", app: "Fallout: New Vegas"},
    {slug: "lanius", title: "Lanius", yomi: "らにうす", app: "Fallout: New Vegas"},
    {slug: "rose-of-sharon-cassidy", title: "Rose of Sharon Cassidy", yomi: "ろーずおぶしゃろんきゃしでぃ", app: "Fallout: New Vegas"}
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
    console.log("Updated remove_duplicates.js with 10 Fallout New Vegas Characters (Batch 1).");
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
