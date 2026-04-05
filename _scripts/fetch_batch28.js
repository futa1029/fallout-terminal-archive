const fs = require('fs');

const fetchWikitext = async (title) => {
    try {
        const url = `https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=${encodeURIComponent(title)}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pageId === '-1') {
            return "";
        }
        
        return pages[pageId].revisions[0].slots.main['*'];
    } catch (error) {
        return "";
    }
};

const main = async () => {
    const pagesToFetch = {
        "Davey (Wastelanders)": "Davey",
        "Gate guard": "Gate guard",
        "Hornwright air purifier site 04": "Hornwright air purifier site 04",
        "Marsh cottage": "Marsh cottage",
        "Overgrown sundew grove": "Overgrown sundew grove"
    };

    const results = {};

    for (const [title, key] of Object.entries(pagesToFetch)) {
        console.log(`Fetching: ${title}`);
        const content = await fetchWikitext(title);
        if (!content) {
            console.log(`Page not found: ${title}`);
        }
        results[key] = {
            content: content,
            images: []
        };
    }

    fs.writeFileSync('f:/Fallout/_wikitext_batch28.json', JSON.stringify(results, null, 2));
    console.log('Batch 28 wikitext fetched and saved.');
};

main();
