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
    const titles = [
        "Bruno the Strongbot",
        "Collector Murmrgh",
        "Collectron"
    ];

    const results = {};

    for (const title of titles) {
        console.log(`Fetching: ${title}`);
        const content = await fetchWikitext(title);
        results[title] = content;
    }

    fs.writeFileSync('f:/Fallout/_wikitext_batch32.json', JSON.stringify(results, null, 2));
    console.log('Batch 32 wikitext fetched.');
};

main();
