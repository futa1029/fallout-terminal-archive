const fs = require('fs');
let content = fs.readFileSync('remove_duplicates.js', 'utf8');

content = content.replace(/\{\s*name:\s*"Autumn Acre Cabin",\s*yomi:\s*"autumn acre cabin",\s*url:\s*"autumn-acre-cabin\.html",\s*category:\s*"場所",\s*appearance:\s*\["Fallout 76"\],\s*date:\s*".+?",\s*status:\s*"draft"\s*\}/, 
'{ name: "オータム・エーカー・キャビン", yomi: "おーたむえーかーきゃびん", url: "autumn-acre-cabin.html", category: "場所", appearance: ["Fallout 76"], date: "2026-03-31" }');

fs.writeFileSync('remove_duplicates.js', content);
console.log('remove_duplicates.js updated for Autumn Acre Cabin.');
