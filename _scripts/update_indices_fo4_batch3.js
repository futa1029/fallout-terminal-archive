const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "nuka-world-loc", title: "Nuka-World", yomi: "ぬかわーるど"},
    {slug: "boston-airport", title: "Boston Airport", yomi: "ぼすとんくうこう"},
    {slug: "fort-strong", title: "Fort Strong", yomi: "すとろんぐとりで"},
    {slug: "vault-95", title: "Vault 95", yomi: "ぼると95"},
    {slug: "jamaica-plain", title: "Jamaica Plain", yomi: "じゃまいかぷれいん"},
    {slug: "university-point", title: "University Point", yomi: "ゆにばーしてぃぽいんと"},
    {slug: "the-nucleus", title: "The Nucleus", yomi: "にゅーくりあす"},
    {slug: "parsons-state-insane-asylum", title: "Parsons State Insane Asylum", yomi: "ぱーそんずしゅうりつせいしんびょういん"},
    {slug: "arcjet-systems", title: "ArcJet Systems", yomi: "あーくじぇっとしすてむ"},
    {slug: "yangtze", title: "Yangtze", yomi: "やんつー（ちゃんじゃん）"}
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
