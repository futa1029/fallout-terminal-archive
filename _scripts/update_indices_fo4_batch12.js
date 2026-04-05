const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "usaf-satellite-station-olivia", title: "USAF Satellite Station Olivia", yomi: "ゅーえすえーえふえいせいかしかんちじょおりびあ"}, // Using hiragana for youmi
    {slug: "andrew-station", title: "Andrew station", yomi: "あんどりゅーえき"},
    {slug: "park-street-station", title: "Park Street station", yomi: "ぱーくすとりーとえき"},
    {slug: "fraternal-post-115", title: "Fraternal Post 115", yomi: "ふらたーなるぽすと115"},
    {slug: "monsignor-plaza", title: "Monsignor Plaza", yomi: "もんしにょーるぷらざ"},
    {slug: "west-roxbury-station", title: "West Roxbury station", yomi: "うぇすとろっくすばりーえき"},
    {slug: "four-leaf-fishpacking-plant", title: "Four Leaf fishpacking plant", yomi: "ふぉーりーふすいさんかこうしょ"},
    {slug: "gwinnett-brewery", title: "Gwinnett brewery", yomi: "ぐうぃねっとじょうぞうじょ"},
    {slug: "irish-pride-industries-shipyard", title: "Irish Pride Industries shipyard", yomi: "あいりっしゅぷらいどこうぎょうぞうせんじょ"},
    {slug: "hesters-consumer-robotics", title: "Hester's Consumer Robotics", yomi: "へすたーろぼてぃくす"}
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
