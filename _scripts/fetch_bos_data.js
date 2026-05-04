const fs = require('fs');
const https = require('https');
const path = require('path');

const SAVE_DIR = 'f:/Fallout/_drafts/bos';
if (!fs.existsSync(SAVE_DIR)) {
    fs.mkdirSync(SAVE_DIR, { recursive: true });
}

function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function run() {
    console.log("Fetching Brotherhood of Steel wikitext...");
    const url = 'https://fallout.fandom.com/api.php?action=parse&page=Brotherhood_of_Steel&prop=wikitext|images&format=json';
    try {
        const jsonStr = await fetch(url);
        const json = JSON.parse(jsonStr);
        if (!json.parse) throw new Error("Invalid response");
        
        const wikitext = json.parse.wikitext['*'];
        const images = json.parse.images;
        
        fs.writeFileSync(path.join(SAVE_DIR, 'raw_wikitext.txt'), wikitext, 'utf8');
        fs.writeFileSync(path.join(SAVE_DIR, 'images_list.json'), JSON.stringify(images, null, 2), 'utf8');
        
        console.log(`Saved raw wikitext (${wikitext.length} chars) and images list (${images.length} images)`);
        
        // Split wikitext by H2 tags to analyze sections
        const sections = wikitext.split(/\n(==[^=]+==)/);
        let currentChunk = sections[0];
        let chunkIndex = 1;
        let chunks = [];
        
        for (let i = 1; i < sections.length; i += 2) {
            const heading = sections[i];
            const content = sections[i+1] || '';
            const combined = '\n' + heading + content;
            
            if (currentChunk.length + combined.length > 30000) {
                chunks.push(currentChunk);
                currentChunk = combined;
            } else {
                currentChunk += combined;
            }
        }
        chunks.push(currentChunk);
        
        for (let i = 0; i < chunks.length; i++) {
            fs.writeFileSync(path.join(SAVE_DIR, `chunk_${i+1}.txt`), chunks[i], 'utf8');
            console.log(`Saved chunk ${i+1}: ${chunks[i].length} chars`);
        }
        
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
