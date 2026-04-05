const fs = require('fs');
const text = fs.readFileSync('f:/Fallout/_scripts/caesar_wiki.txt', 'utf8');
const lines = text.split('\n');
let cleanText = '';
let contentStarted = false;
for(let line of lines) {
    if (line.startsWith('\'\'\'Caesar\'\'\'')) contentStarted = true;
    if (contentStarted) {
        if (line.includes('==Appearances==')) break;
        if (!line.startsWith('{{') && !line.startsWith('}}')) {
            cleanText += line + '\n';
        }
    }
}
cleanText = cleanText.replace(/<ref[^>]*>.*?<\/ref>/g, '');
cleanText = cleanText.replace(/<ref[^>]*\/>/g, '');
fs.writeFileSync('f:/Fallout/_scripts/caesar_wiki_cleaned.txt', cleanText, 'utf8');
