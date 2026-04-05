const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "memory-den", title: "Memory Den", yomi: "めもりーでん"}, 
    {slug: "the-third-rail", title: "The Third Rail", yomi: "さーどれーる"},
    {slug: "tenpines-bluff", title: "Tenpines Bluff", yomi: "てんぱいんずのだんがい"},
    {slug: "finch-farm", title: "Finch farm", yomi: "ふぃんちふぁーむ"},
    {slug: "murkwater-construction-site", title: "Murkwater construction site", yomi: "まーくうぉーたーけんせつげんば"},
    {slug: "concord-civic-access", title: "Concord civic access", yomi: "こんこーどしがいちへのあくせす"},
    {slug: "old-gullet-sinkhole", title: "Old Gullet sinkhole", yomi: "おーるどがれっとしんくほーる"},
    {slug: "mass-pike-interchange", title: "Mass Pike Interchange", yomi: "ますぱいくいんたーちぇんじ"},
    {slug: "quincy-quarries", title: "Quincy quarries", yomi: "くいんしーさいせきじょう"},
    {slug: "slocums-joe-corporate-hq", title: "Slocum's Joe Corporate HQ", yomi: "すろーかむずじょーほんしゃ"}
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
