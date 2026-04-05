const fs = require('fs');

async function main() {
    console.log("Fetching links from Fallout: New Vegas characters...");
    const res = await fetch('https://fallout.fandom.com/api.php?action=parse&page=Fallout:_New_Vegas_characters&prop=links&format=json');
    const data = await res.json();
    const allLinks = data.parse.links.filter(l => l.ns === 0).map(l => l['*']);
    
    // Filter out some obvious non-character links
    const filtered = allLinks.filter(l => !l.includes('Fallout') && !l.includes('Quest') && !l.includes('Vault'));
    
    let chars = [];
    const chunkSize = 50;
    
    for (let i = 0; i < filtered.length; i += chunkSize) {
        const chunk = filtered.slice(i, i + chunkSize);
        const url = `https://fallout.fandom.com/api.php?action=query&prop=info|categories&cllimit=50&titles=${encodeURIComponent(chunk.join('|'))}&format=json`;
        const r = await fetch(url);
        const d = await r.json();
        
        if (d.query && d.query.pages) {
            for (let pageId in d.query.pages) {
                const page = d.query.pages[pageId];
                if (page.pageid && page.length && page.categories) {
                    const isChar = page.categories.some(c => c.title.includes('character') || c.title.includes('people'));
                    if (isChar) {
                        chars.push({ title: page.title, length: page.length });
                    }
                }
            }
        }
    }
    
    chars.sort((a, b) => b.length - a.length);
    
    fs.writeFileSync('f:/Fallout/_scripts/nv_top_chars.json', JSON.stringify(chars, null, 2));
    
    console.log('Top 20 characters by wikitext length:');
    chars.slice(0, 20).forEach((c, idx) => {
        console.log(`${idx + 1}. ${c.title} (${c.length} bytes)`);
    });
}

main().catch(console.error);
