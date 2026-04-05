const fs = require('fs');

const fetchWikitext = async (title) => {
    try {
        const url = `https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=${encodeURIComponent(title)}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pageId === '-1') return "";
        
        return pages[pageId].revisions[0].slots.main['*'];
    } catch (error) {
        return "";
    }
};

const main = async () => {
    const title = "Bodhi";
    console.log(`Fetching: ${title}`);
    const content = await fetchWikitext(title);
    
    fs.writeFileSync('f:/Fallout/_wikitext_batch31.json', JSON.stringify({ bodhi: content }, null, 2));
    console.log('Batch 31 wikitext fetched.');
};

main();
