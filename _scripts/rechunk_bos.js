const fs = require('fs');
const path = require('path');

const SAVE_DIR = 'f:/Fallout/_drafts/bos';
const wikitext = fs.readFileSync(path.join(SAVE_DIR, 'raw_wikitext.txt'), 'utf8');

// Split strictly by H2, H3, H4
const sections = wikitext.split(/\n(={2,4}[^=]+={2,4})/);

let currentChunk = sections[0];
let chunkIndex = 1;

for (let i = 1; i < sections.length; i += 2) {
    const heading = sections[i];
    const content = sections[i+1] || '';
    const combined = '\n' + heading + content;
    
    // Max chunk size 15000 chars
    if (currentChunk.length + combined.length > 15000 && currentChunk.length > 0) {
        fs.writeFileSync(path.join(SAVE_DIR, `ref_chunk_${chunkIndex}.txt`), currentChunk, 'utf8');
        console.log(`Saved chunk ${chunkIndex}: ${currentChunk.length} chars`);
        chunkIndex++;
        currentChunk = combined;
    } else {
        currentChunk += combined;
    }
}

if (currentChunk.length > 0) {
    fs.writeFileSync(path.join(SAVE_DIR, `ref_chunk_${chunkIndex}.txt`), currentChunk, 'utf8');
    console.log(`Saved chunk ${chunkIndex}: ${currentChunk.length} chars`);
}
