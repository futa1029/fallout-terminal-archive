const fs = require('fs');

const fetchWikitext = async (title) => {
    try {
        const url = `https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=${encodeURIComponent(title)}&format=json`;
        console.log(`Fetching: ${title}`);
        const response = await fetch(url);
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pageId === '-1') {
            console.log(`Page not found: ${title}`);
            return "";
        }
        
        return pages[pageId].revisions[0].slots.main['*'];
    } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        return "";
    }
};

const main = async () => {
    const titles = ["Welch Station"];
    const results = {};

    for (const title of titles) {
        const content = await fetchWikitext(title);
        results[title] = {
            content: content,
            images: []
        };
    }

    const filepath = 'f:/Fallout/_wikitext_batch15_welch.json';
    fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
    console.log(`Saved to ${filepath}`);
};

main();
