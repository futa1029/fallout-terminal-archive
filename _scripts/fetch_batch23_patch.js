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
    if (fs.existsSync('f:/Fallout/_wikitext_batch23.json')) {
        oldData = JSON.parse(fs.readFileSync('f:/Fallout/_wikitext_batch23.json', 'utf8'));
    }

    const content = await fetchWikitext("The Whitespring driving range");
    oldData["Whitespring driving range"] = {
        content: content,
        images: []
    };

    fs.writeFileSync('f:/Fallout/_wikitext_batch23.json', JSON.stringify(oldData, null, 2));
    console.log('Batch 23 patch saved.');
};

main();
