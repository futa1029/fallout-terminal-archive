const fs = require('fs');
let content = fs.readFileSync('f:/Fallout/js/lore_index.js', 'utf8');

const target1 = `    {
        name: "Madison Li",
        yomi: "まるでぃそんりー",
        url: "madison-li.html",
        category: "人物",
        appearance: [
            "Fallout 3"
        ],
        date: "2026-04-05",
        isDraft: true
    },`;

const repl1 = `    {
        name: "マジソン・リー",
        yomi: "まじそん・りー",
        url: "madison-li.html",
        category: "人物",
        appearance: [
            "Fallout 3",
            "Fallout 4"
        ],
        date: "2026-04-05",
        isDraft: true
    },`;

const target2 = `    {
        name: "マジソン・リー",
        yomi: "マジソン・リー",
        url: "madison-li_2.html",
        category: "",
        appearance: [
            "Fallout 76",
            "Fallout: New Vegas",
            "Fallout 4",
            "Fallout 3"
        ],
        date: "2025-10-18",
        isDraft: true
    },`;

if(content.includes(target1) && content.includes(target2)) {
    content = content.replace(target1, repl1);
    content = content.replace(target2 + '\n', '');
    fs.writeFileSync('f:/Fallout/js/lore_index.js', content);
    console.log('Successfully updated lore_index.js');
} else {
    console.log('Could not find targets');
    if(!content.includes(target1)) console.log('target1 missing');
    if(!content.includes(target2)) console.log('target2 missing');
}
