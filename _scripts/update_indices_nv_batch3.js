const fs = require('fs');
const path = require('path');

const chars = [
    {slug: "rex", title: "Rex (Fallout: New Vegas)", yomi: "れっくす", app: "Fallout: New Vegas"}, 
    {slug: "ed-e", title: "ED-E", yomi: "えでぃ", app: "Fallout: New Vegas"},
    {slug: "victor", title: "Victor (Securitron)", yomi: "びくたー", app: "Fallout: New Vegas"},
    {slug: "vulpes-inculta", title: "Vulpes Inculta", yomi: "ぶるぺすいんかるた", app: "Fallout: New Vegas"},
    {slug: "the-king", title: "The King", yomi: "ざきんぐ", app: "Fallout: New Vegas"},
    {slug: "toaster", title: "Toaster (character)", yomi: "とーすたー", app: "Fallout: New Vegas (Old World Blues)"},
    {slug: "no-bark-noonan", title: "No-bark Noonan", yomi: "のーばーくぬーなん", app: "Fallout: New Vegas"},
    {slug: "sarah-weintraub", title: "Sarah Weintraub", yomi: "さらわいんとろーぶ", app: "Fallout: New Vegas"},
    {slug: "dala", title: "Dala", yomi: "だら", app: "Fallout: New Vegas (Old World Blues)"},
    {slug: "chris-haversam", title: "Chris Haversam", yomi: "くりすはばーさむ", app: "Fallout: New Vegas"}
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
    console.log("Updated remove_duplicates.js with 10 Fallout New Vegas Characters (Batch 3).");
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
