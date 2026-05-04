const https = require('https');
const fs = require('fs');

async function getWikitext(pageTitle) {
    const url = `https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&prop=wikitext&format=json`;
    const data = await new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'FalloutArchiver/1.0' } }, (res) => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => resolve(JSON.parse(d)));
        }).on('error', reject);
    });
    return data.parse.wikitext['*'];
}

function extractLinks(wikitext) {
    const matches = wikitext.matchAll(/\[\[(.*?)\]\]/g);
    let links = new Set();
    for (const m of matches) {
        let link = m[1].split('|')[0];
        // Ignore files, categories, templates
        if (!link.includes(':') && !link.includes('Category:') && !link.includes('File:')) {
            links.add(link);
        }
    }
    return Array.from(links);
}

async function getWikitextLength(titles) {
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
                if (page.length > 0) {
                    results.push({
                        title: page.title,
                        length: page.length || 0
                    });
                }
            }
        }
    }
    return results;
}

async function main() {
    console.log("Fetching main page wikitext...");
    const wikitext = await getWikitext('Fallout: New Vegas characters');
    
    // The page has huge tables. The character links are inside the tables.
    // We just extract all basic links since most of them are characters.
    let links = extractLinks(wikitext);
    console.log(`Extracted ${links.length} potential character links.`);
    
    // There are a lot of generic links, but we will rank them by length.
    // And exclude obvious non-characters if possible, but for now just fetching length.
    
    console.log("Fetching lengths in batches...");
    const charLengths = await getWikitextLength(links);
    
    charLengths.sort((a, b) => b.length - a.length);
    
    fs.writeFileSync('f:/Fallout/_nv_character_links_ranked.json', JSON.stringify(charLengths, null, 2), 'utf8');
    
    console.log("Top 50 links by page length:");
    for (let i = 0; i < 50 && i < charLengths.length; i++) {
        console.log(`${i+1}. ${charLengths[i].title} - ${charLengths[i].length} bytes`);
    }
}

main().catch(console.error);
