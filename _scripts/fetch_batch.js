const fs = require('fs');

async function main() {
    const args = process.argv.slice(2);
    const numToProcess = parseInt(args[0]) || 3;
    
    const queueFile = 'f:/Fallout/_tv_characters_queue.json';
    const queue = JSON.parse(fs.readFileSync(queueFile, 'utf8'));
    
    if (queue.length === 0) {
        console.log("Queue is empty!");
        return;
    }
    
    const batch = queue.slice(0, numToProcess);
    console.log("Processing batch:", batch);
    
    for (const title of batch) {
        console.log(`\nFetching: ${title}`);
        const apiBase = "https://fallout.fandom.com/api.php";
        
        // Fetch Wikitext
        const wtUrl = `${apiBase}?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json`;
        const wtRes = await fetch(wtUrl);
        const wtData = await wtRes.json();
        const wikitext = wtData.parse ? wtData.parse.wikitext['*'] : '';
        
        // Fetch Image info
        const imgUrl = `${apiBase}?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json`;
        const imgRes = await fetch(imgUrl);
        const imgData = await imgRes.json();
        
        const pages = imgData.query.pages;
        let images = [];
        for (let p in pages) {
            if (pages[p].images) {
                images = pages[p].images.map(img => img.title);
            }
        }
        
        let imageUrls = [];
        for (const img of images) {
            if (img.toLowerCase().includes('icon')) continue;
            const iUrl = `${apiBase}?action=query&titles=${encodeURIComponent(img)}&prop=imageinfo&iiprop=url&format=json`;
            const iRes = await fetch(iUrl);
            const iData = await iRes.json();
            const ipg = iData.query.pages;
            for (let id in ipg) {
                if (ipg[id].imageinfo && ipg[id].imageinfo.length > 0) {
                    imageUrls.push(ipg[id].imageinfo[0].url);
                }
            }
        }
        
        const safeTitle = title.replace(/[^a-zA-Z0-9-]/g, '_').toLowerCase();
        
        const output = {
            title: title,
            images: imageUrls,
            wikitext: wikitext
        };
        
        fs.writeFileSync(`f:/Fallout/_drafts/${safeTitle}_raw.json`, JSON.stringify(output, null, 2));
        console.log(`Saved ${safeTitle}_raw.json`);
    }
    
    // Update queue
    fs.writeFileSync(queueFile, JSON.stringify(queue.slice(numToProcess), null, 2));
    console.log(`\nRemaining in queue: ${queue.length - numToProcess}`);
}

main().catch(console.error);
