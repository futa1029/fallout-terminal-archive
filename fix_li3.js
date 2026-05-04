const fs = require('fs');
let content = fs.readFileSync('f:/Fallout/js/lore_index.js', 'utf8');

// Fix the corrupted Madison Li entry (if any)
const corruptedRegex = /\{\s*name:\s*"\}W\\E\["[\s\S]*?url:\s*"madison-li\.html"[\s\S]*?isDraft:\s*true\s*\}/g;
// Actually, let's just find the entry by URL 'madison-li.html' and replace the whole block
const urlRegex = /\{\s*name:\s*"[^"]*",\s*yomi:\s*"[^"]*",\s*url:\s*"madison-li\.html",\s*category:\s*"[^"]*",\s*appearance:\s*\[[\s\S]*?\],\s*date:\s*"[^"]*",\s*isDraft:\s*true\s*\}/g;

content = content.replace(urlRegex, `{
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

// Also fix the other corrupted entry if it was corrupted but not removed
// Wait, the previous script removed the second entry if it matched the corrupted string!
// Let's just check if there's any remaining `madison-li_2.html`
const url2Regex = /\{\s*name:\s*"[^"]*",\s*yomi:\s*"[^"]*",\s*url:\s*"madison-li_2\.html"[\s\S]*?isDraft:\s*true\s*\},?\s*/g;
content = content.replace(url2Regex, '');

fs.writeFileSync('f:/Fallout/js/lore_index.js', content, 'utf8');
console.log('Done.');
