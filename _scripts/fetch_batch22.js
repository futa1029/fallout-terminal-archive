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
    const articles = {
        "Red Rocket (Abandoned Bog Town)": "Red Rocket (Abandoned Bog Town)",
        "South Cutthroat camp": "South Cutthroat camp",
        "Woods Estate": "Woods Estate",
        "Relay tower HN-B1-12": "Relay tower HN-B1-12"
    };

    const results = {};

    for (const [key, title] of Object.entries(articles)) {
        const content = await fetchWikitext(title);
        results[key] = {
            content: content,
            images: []
        };
        // wait 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    fs.writeFileSync('f:/Fallout/_wikitext_batch22.json', JSON.stringify(results, null, 2));
    console.log('Batch 22 wikitext fetched and saved.');
};

main();
