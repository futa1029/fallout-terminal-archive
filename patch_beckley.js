const fs = require('fs');
let content = fs.readFileSync('remove_duplicates.js', 'utf8');

content = content.replace(/\{\s*name:\s*"Beckley Mine Exhibit",\s*yomi:\s*"beckley mine exhibit",\s*url:\s*"beckley-mine-exhibit\.html",\s*category:\s*"場所",\s*appearance:\s*\["Fallout 76"\],\s*date:\s*".+?",\s*status:\s*"draft"\s*\}/, 
'{ name: "ベックリー鉱山展示場", yomi: "べっくりーこうざんてんじじょう", url: "beckley-mine-exhibit.html", category: "場所", appearance: ["Fallout 76"], date: "2026-03-31" }');

fs.writeFileSync('remove_duplicates.js', content);
console.log('remove_duplicates.js updated for Beckley Mine Exhibit.');
