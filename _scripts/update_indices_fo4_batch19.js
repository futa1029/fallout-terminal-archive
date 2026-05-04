const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "nuka-town-usa", title: "Nuka-Town USA", yomi: "ぬかたうんUSA"}, 
    {slug: "fizztop-mountain", title: "Fizztop Mountain", yomi: "ふぃずとっぷまうんてん"},
    {slug: "the-gauntlet-nuka-world", title: "The Gauntlet", yomi: "がんとれっと"},
    {slug: "galactic-zone", title: "Galactic Zone", yomi: "ぎゃらくてぃっくぞーん"},
    {slug: "safari-adventure", title: "Safari Adventure", yomi: "さふぁりあどべんちゃー"},
    {slug: "dry-rock-gulch", title: "Dry Rock Gulch", yomi: "どらいろっくがるち"},
    {slug: "world-of-refreshment", title: "World of Refreshment", yomi: "わーるどおぶりふれっしゅめんと"},
    {slug: "nuka-galaxy", title: "Nuka-Galaxy", yomi: "ぬかぎゃらくしー"},
    {slug: "nuka-cade-nuka-world", title: "Nuka-Cade", yomi: "ぬかけーど"},
    {slug: "nuka-world-power-plant", title: "Nuka-World power plant", yomi: "ぬかわーるどはつでんしょ"}
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
        appearance: ["Fallout 4 (Nuka-World)"],
        date: "${new Date().toISOString().split('T')[0]}",
        status: "published"
    },\n`;
    }
}

if (injection !== '') {
    let targetStr = 'const manualEntries = [';
    rdContent = rdContent.replace(targetStr, targetStr + '\n' + injection);
    
    fs.writeFileSync(rdPath, rdContent, 'utf8');
    console.log("Updated remove_duplicates.js with 10 Fallout 4 (Nuka-World) Locations.");
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
