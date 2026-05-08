const fs = require('fs');
let content = fs.readFileSync('F:\\Fallout\\aric-4.html', 'utf8');
content = content.replace("<h1>ARIC-4<br><span style=\"font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;\">自律型研究知能コンピューター</span></h1>", "<h1>ARIC-4</h1>");
fs.writeFileSync('F:\\Fallout\\aric-4.html', content, 'utf8');
console.log("Done");
