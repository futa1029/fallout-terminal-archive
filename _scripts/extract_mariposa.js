const fs = require('fs');
const txt = fs.readFileSync('f:/Fallout/_drafts/bos/losthills.txt', 'utf8');

const startTag = '<section begin="BosBegins" />';
const endTag = '<section end="BosBegins" />';
const start = txt.indexOf(startTag);
const end = txt.indexOf(endTag);

if(start !== -1 && end !== -1) {
    const content = txt.substring(start + startTag.length, end);
    fs.writeFileSync('f:/Fallout/_drafts/bos/mariposa_rebellion.txt', content.trim(), 'utf8');
    console.log('Saved mariposa rebellion text. Length:', content.length);
} else {
    console.log('Could not find section tags.');
}
