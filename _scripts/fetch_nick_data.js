const https = require('https');
const fs = require('fs');
const path = require('path');

const charName = 'Nick_Valentine';
const outDir = 'f:/Fallout/_drafts/' + charName.toLowerCase();

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const options = {
  hostname: 'fallout.fandom.com',
  path: `/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=${charName}&format=json`,
  method: 'GET',
  headers: { 'User-Agent': 'Mozilla/5.0' }
};

console.log(`Fetching ${charName}...`);

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
        const json = JSON.parse(data);
        const pages = json.query.pages;
        let wikitext = '';
        for (let id in pages) {
            if (pages[id].revisions) {
                wikitext = pages[id].revisions[0].slots.main['*'];
            }
        }
        
        if (!wikitext) {
            console.log('Failed to extract wikitext.');
            return;
        }

        console.log(`Total characters: ${wikitext.length}`);
        
        // Save the raw text
        fs.writeFileSync(path.join(outDir, 'raw_wikitext.txt'), wikitext, 'utf8');

        // Split into chunks of ~15,000 characters to be safe with translation context
        // Splitting by '==' to keep sections intact
        const sections = wikitext.split(/(?===[^=])/g); // split by header
        
        let currentChunk = '';
        let chunkIndex = 1;
        
        for (let i = 0; i < sections.length; i++) {
            currentChunk += sections[i];
            
            // If chunk gets big enough, or if it's the last section
            if (currentChunk.length > 20000 || i === sections.length - 1) {
                const chunkName = `ref_chunk_${String(chunkIndex).padStart(2, '0')}.txt`;
                fs.writeFileSync(path.join(outDir, chunkName), currentChunk, 'utf8');
                console.log(`Saved ${chunkName} (length: ${currentChunk.length})`);
                currentChunk = '';
                chunkIndex++;
            }
        }
        
        console.log('Finished chunking process.');
        
    } catch(e) {
        console.error('Error parsing JSON or writing files:', e);
    }
  });
}).on('error', console.error);
