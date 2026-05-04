const fs = require('fs');
const content = fs.readFileSync('f:/Fallout/js/lore_index.js', 'utf8');

const regex = /\{\s*name:\s*"([^"]*)"[^}]*\}/g;
let match;
while ((match = regex.exec(content)) !== null) {
    if (match[1].includes('ゲイリー') || match[1].toLowerCase().includes('gary')) {
        console.log(match[0]);
    }
}
