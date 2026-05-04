const fs = require('fs');
const wikitext = fs.readFileSync('f:/Fallout/_drafts/bos/raw_wikitext.txt', 'utf8');

const sections = wikitext.split(/\n(?===)/);
let currentChunk = '';
let chunkId = 1;

for (let i = 0; i < sections.length; i++) {
    if (sections[i].includes('==Gallery==')) continue;
    if (sections[i].includes('{{Transcript|text=')) continue;
    
    if (currentChunk.length + sections[i].length > 15000) {
        fs.writeFileSync(`f:/Fallout/_drafts/bos/trans_chunk_${chunkId}.txt`, currentChunk, 'utf8');
        chunkId++;
        currentChunk = sections[i];
    } else {
        currentChunk += (currentChunk ? '\n' : '') + sections[i];
    }
}
if (currentChunk) {
    fs.writeFileSync(`f:/Fallout/_drafts/bos/trans_chunk_${chunkId}.txt`, currentChunk, 'utf8');
}
console.log(`Created ${chunkId} translation chunks.`);
