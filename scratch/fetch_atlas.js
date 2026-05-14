
const https = require('https');
const fs = require('fs');
const path = require('path');

const pageName = 'ATLAS Observatory';
const apiUrl = 'https://fallout.fandom.com/api.php';

function get(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

async function fetchData() {
    try {
        console.log(`Fetching wikitext for ${pageName}...`);
        const wikitextRes = await get(`${apiUrl}?action=parse&page=${encodeURIComponent(pageName)}&prop=wikitext&format=json`);
        const wikitext = wikitextRes.parse.wikitext['*'];
        fs.writeFileSync(path.join(__dirname, 'wikitext.txt'), wikitext);
        console.log('Wikitext saved.');

        console.log(`Fetching images for ${pageName}...`);
        const imagesRes = await get(`${apiUrl}?action=parse&page=${encodeURIComponent(pageName)}&prop=images&format=json`);
        const images = imagesRes.parse.images;
        fs.writeFileSync(path.join(__dirname, 'images.json'), JSON.stringify(images, null, 2));
        console.log('Image list saved.');

        // Fetch image URLs
        const imageUrls = {};
        for (const imageName of images) {
            console.log(`Fetching URL for File:${imageName}...`);
            const urlRes = await get(`${apiUrl}?action=query&titles=File:${encodeURIComponent(imageName)}&prop=imageinfo&iiprop=url&format=json`);
            const pages = urlRes.query.pages;
            const pageId = Object.keys(pages)[0];
            if (pages[pageId].imageinfo) {
                imageUrls[imageName] = pages[pageId].imageinfo[0].url;
            }
        }
        fs.writeFileSync(path.join(__dirname, 'image_urls.json'), JSON.stringify(imageUrls, null, 2));
        console.log('Image URLs saved.');

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
