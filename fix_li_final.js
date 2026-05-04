const fs = require('fs');
let content = fs.readFileSync('f:/Fallout/js/lore_index.js', 'utf8');

const t1 = `    {
        name: "Madison Li",
        yomi: "まるでぃそんりー",
        url: "madison-li.html",
        category: "人物",
        appearance: [
            "Fallout 3"
        ],
        date: "2026-04-05",
        isDraft: true
    },`.replace(/\n/g, '\r\n');

const r1 = `    {
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
    },`.replace(/\n/g, '\r\n');

const t2 = `    {
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
    },`.replace(/\n/g, '\r\n');

if (content.includes(t1)) {
    content = content.replace(t1, r1);
    console.log('t1 replaced');
}
if (content.includes(t2)) {
    content = content.replace(t2 + '\r\n', '');
    console.log('t2 replaced');
}

fs.writeFileSync('f:/Fallout/js/lore_index.js', content, 'utf8');
console.log('Done.');
