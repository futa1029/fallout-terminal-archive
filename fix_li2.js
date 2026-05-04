const fs = require('fs');
let content = fs.readFileSync('f:/Fallout/js/lore_index.js', 'utf8');

// Use regex to find Madison Li entry 1
const regex1 = /\{\s*name:\s*"Madison Li",[\s\S]*?url:\s*"madison-li\.html"[\s\S]*?isDraft:\s*true\s*\}/;
content = content.replace(regex1, `{
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
    }`);

// Use regex to find Madison Li entry 2 (with _2.html)
const regex2 = /\s*\{\s*name:\s*"マジソン・リー",[\s\S]*?url:\s*"madison-li_2\.html"[\s\S]*?isDraft:\s*true\s*\},?/;
content = content.replace(regex2, '');

fs.writeFileSync('f:/Fallout/js/lore_index.js', content);
console.log('Done.');
