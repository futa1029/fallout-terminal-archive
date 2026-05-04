const fs = require('fs');
let content = fs.readFileSync('remove_duplicates.js', 'utf8');

// Use regex to find AVR Medical Center
content = content.replace(/\{\s*name:\s*"AVR Medical Center",\s*yomi:\s*"avr medical center",\s*url:\s*"avr-medical-center\.html",\s*category:\s*"場所",\s*appearance:\s*\["Fallout 76"\],\s*date:\s*"2026-03-15",\s*status:\s*"draft"\s*\}/, 
'{ name: "AVRメディカルセンター", yomi: "えーぶいあーるめでぃかるせんたー", url: "avr-medical-center.html", category: "場所", appearance: ["Fallout 76"], date: "2026-03-31" }');

fs.writeFileSync('remove_duplicates.js', content);
console.log('remove_duplicates.js updated for AVR Medical Center.');
