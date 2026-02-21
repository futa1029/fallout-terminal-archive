const fs = require('fs');
let content = fs.readFileSync('buffalo-gourd-seed.html', 'utf8');

const targetStr = '<h2>舞台裏</h2>\r\n            <p>バッファロー・ゴード';
const targetStrFallback = '<h2>舞台裏</h2>\n            <p>バッファロー・ゴード';

const newStr = `<h2>舞台裏</h2>
            <div class="note-figure">
                <img src="images/note_extracted/buffalo_gourd_3.jpg" alt="舞台裏">
            </div>
            <p>バッファロー・ゴード`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, newStr);
    console.log("Replaced using CRLF");
} else if (content.includes(targetStrFallback)) {
    content = content.replace(targetStrFallback, newStr);
    console.log("Replaced using LF");
} else {
    console.log("Could not find the target string!");
}


fs.writeFileSync('buffalo-gourd-seed.html', content, 'utf8');
