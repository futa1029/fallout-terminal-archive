const fs = require('fs');
const path = require('path');

async function fetchWikiData(page) {
    const baseUrl = 'https://fallout.fandom.com/api.php';
    
    // Fetch Wikitext
    const wikitextUrl = `${baseUrl}?action=parse&page=${encodeURIComponent(page)}&prop=wikitext|images&format=json`;
    console.log(`Fetching: ${wikitextUrl}`);
    const response = await fetch(wikitextUrl);
    const data = await response.json();
    
    if (data.error) {
        console.error('Error fetching page:', data.error);
        return;
    }

    const wikitext = data.parse.wikitext['*'];
    const images = data.parse.images;

    const outputDir = path.join(__dirname, 'the_ghoul_data');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    fs.writeFileSync(path.join(outputDir, 'wikitext.txt'), wikitext);
    fs.writeFileSync(path.join(outputDir, 'images.json'), JSON.stringify(images, null, 2));

    console.log('Wikitext and image list saved.');

    // Fetch image URLs
    const imageInfo = [];
    for (const img of images) {
        const infoUrl = `${baseUrl}?action=query&titles=File:${encodeURIComponent(img)}&prop=imageinfo&iiprop=url&format=json`;
        console.log(`Fetching info for: ${img}`);
        const infoRes = await fetch(infoUrl);
        const infoData = await infoRes.json();
        const pages = infoData.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pages[pageId].imageinfo) {
            imageInfo.push({
                name: img,
                url: pages[pageId].imageinfo[0].url
            });
        }
    }

    fs.writeFileSync(path.join(outputDir, 'image_urls.json'), JSON.stringify(imageInfo, null, 2));
    console.log('Image URLs saved.');
}

fetchWikiData('The Ghoul');
