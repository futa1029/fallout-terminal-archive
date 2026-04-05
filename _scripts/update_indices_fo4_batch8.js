const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "gunners-plaza", title: "Gunners plaza", yomi: "がんなーぷらざ"},
    {slug: "super-duper-mart", title: "Super Duper Mart", yomi: "すーぱーうるとらまーけっと"}, // Note: JP name
    {slug: "boston-mayoral-shelter", title: "Boston mayoral shelter", yomi: "ぼすとんしちょうようしぇるたー"},
    {slug: "fallons-department-store", title: "Fallon's department store", yomi: "ふぁろんでぱーと"},
    {slug: "longneck-lukowskis-cannery", title: "Longneck Lukowski's Cannery", yomi: "ろんぐねっくるかうすきーのかんづめこうじょう"}, // or ちょうこう
    {slug: "greenetech-genetics", title: "Greenetech Genetics", yomi: "ぐりーんてっくじぇねてぃくす"},
    {slug: "massachusetts-state-house", title: "Massachusetts State House", yomi: "まさちゅーせっつしゅうぎじどう"},
    {slug: "libertalia", title: "Libertalia", yomi: "りべるたりあ"},
    {slug: "grandchester-mystery-mansion", title: "Grandchester Mystery Mansion", yomi: "ぐらんちぇすたーみすてりーまんしょん"},
    {slug: "hubris-comics", title: "Hubris Comics", yomi: "はぶりすこみっく"}
];

chars[4].yomi = "ちょうこうるかうすきーのかんづめこうじょう";

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
