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
    const content = await fetchWikitext("Willard Corporate Housing");
    const json = JSON.parse(fs.readFileSync('f:/Fallout/_wikitext_batch26.json', 'utf8'));
    json["Willard corporate housing"].content = content;
    fs.writeFileSync('f:/Fallout/_wikitext_batch26.json', JSON.stringify(json, null, 2));
    console.log('Done');
};

main();
