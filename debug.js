const fs = require('fs');
let content = fs.readFileSync('ncr.html', 'utf8');

const mainStart = content.indexOf('<main class="content">');
const mainEnd = content.indexOf('</main>'); // actually lastIndexOf gives the end
const finalBody = content.slice(mainStart, content.lastIndexOf('</main>'));

console.log('Includes アラデシュ: ', finalBody.includes('アラデシュ'));

const escapedTitle = 'アラデシュ';
const searchRegex = new RegExp('(?<![ァ-ヶー])(' + escapedTitle + ')(?![ァ-ヶー])', 'g');

let count = 0;
const parts = finalBody.split(/(<[^>]+>)/g);
for (let j = 0; j < parts.length; j++) {
    if (!parts[j].startsWith('<')) {
        let original = parts[j];
        parts[j] = parts[j].replace(searchRegex, '<a href="aradesh.html" class="auto-link">$1</a>');
        if (original !== parts[j]) {
            count++;
            console.log("Replaced in part: ", original.trim());
        }
    }
}
console.log('Matches replaced: ', count);
console.log('Final output contains link: ', parts.join('').includes('<a href="aradesh.html" class="auto-link">アラデシュ</a>'));
