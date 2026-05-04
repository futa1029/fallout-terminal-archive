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
    let oldData = {};
    if (fs.existsSync('f:/Fallout/_wikitext_batch19.json')) {
        oldData = JSON.parse(fs.readFileSync('f:/Fallout/_wikitext_batch19.json', 'utf8'));
    }

    const articles = {
        "Relay Tower EL-B1-02": "Relay tower EL-B1-02"
    };

    const results = oldData;

    for (const [key, title] of Object.entries(articles)) {
        const content = await fetchWikitext(title);
        results[key] = {
            content: content,
            images: []
        };
    }

    fs.writeFileSync('f:/Fallout/_wikitext_batch19.json', JSON.stringify(results, null, 2));
    console.log('Batch 19 wikitext patched and saved.');
};

main();
