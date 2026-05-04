const https = require('https');
const fs = require('fs');

async function getCategoryMembers(category) {
    let members = [];
    let cmcontinue = null;
    
    do {
        let url = `https://fallout.fandom.com/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(category)}&cmlimit=500&format=json`;
        if (cmcontinue) {
            url += `&cmcontinue=${encodeURIComponent(cmcontinue)}`;
        }
        
        const data = await new Promise((resolve, reject) => {
            https.get(url, { headers: { 'User-Agent': 'FalloutArchiver/1.0' } }, (res) => {
                let d = '';
                res.on('data', c => d += c);
                res.on('end', () => resolve(JSON.parse(d)));
            }).on('error', reject);
        });
        
        if (data && data.query && data.query.categorymembers) {
            for (let m of data.query.categorymembers) {
                if (m.ns === 0) { // Only main namespace
                    members.push(m.title);
                }
            }
        }
        
        cmcontinue = data.continue ? data.continue.cmcontinue : null;
    } while (cmcontinue);
    
    return members;
}

async function getWikitextLength(titles) {
    // We can fetch info for ~50 titles at once
    let results = [];
    for (let i = 0; i < titles.length; i += 50) {
        const chunk = titles.slice(i, i + 50);
        const url = `https://fallout.fandom.com/api.php?action=query&prop=info&titles=${encodeURIComponent(chunk.join('|'))}&format=json`;
        
        const data = await new Promise((resolve, reject) => {
            https.get(url, { headers: { 'User-Agent': 'FalloutArchiver/1.0' } }, (res) => {
                let d = '';
                res.on('data', c => d += c);
                res.on('end', () => resolve(JSON.parse(d)));
            }).on('error', reject);
        });
        
        if (data && data.query && data.query.pages) {
            for (let pageId in data.query.pages) {
                const page = data.query.pages[pageId];
                results.push({
                    title: page.title,
                    length: page.length || 0
                });
            }
        }
    }
    return results;
}

async function main() {
    console.log("Fetching category members...");
    const chars = await getCategoryMembers('Category:Fallout: New Vegas characters');
    console.log(`Found ${chars.length} characters.`);
    
    console.log("Fetching lengths...");
    const charLengths = await getWikitextLength(chars);
    
    charLengths.sort((a, b) => b.length - a.length);
    
    fs.writeFileSync('f:/Fallout/_nv_characters_ranked.json', JSON.stringify(charLengths, null, 2), 'utf8');
    
    console.log("Top 20 characters by length:");
    for (let i = 0; i < 20 && i < charLengths.length; i++) {
        console.log(`${i+1}. ${charLengths[i].title} - ${charLengths[i].length} bytes`);
    }
}

main().catch(console.error);
