const fs = require('fs');
const https = require('https');
const path = require('path');

const slug = 'shadowbreeze-apartments';
const outDir = path.join('f:/Fallout/images/note_extracted', slug);
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const images = [
    "FO76_Shadowbreeze_Apartments.png",
    "Morgantown_map.png",
    "FO76_Grocery_list.jpg",
    "Fo76_Not_my_Morgantown.jpg",
    "FO76_Shadowbreeze_Apartments_(Postcard_from_Adrian).png",
    "F76_Shadowbreeze_Apartments.png",
    "Shadowbreeze_Apartments.jpg",
    "FO76_Shadowbreeze_Apartments_(Reception_terminal).jpg",
    "FO76_Shadowbreeze_Apartments_(Trevor_Moorman's_Personal_Terminal).jpg"
];

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', err => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function fetchImages() {
    for (const img of images) {
        const apiUrl = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(img)}&prop=imageinfo&iiprop=url&format=json`;
        try {
            const res = await new Promise((resolve, reject) => {
                let data = '';
                https.get(apiUrl, r => {
                    r.on('data', chunk => data += chunk);
                    r.on('end', () => resolve(JSON.parse(data)));
                }).on('error', reject);
            });
            const pages = res.query.pages;
            const page = pages[Object.keys(pages)[0]];
            if (page.imageinfo && page.imageinfo[0].url) {
                const url = page.imageinfo[0].url;
                let destName = img;
                if(img === "FO76_Shadowbreeze_Apartments.png") destName = "img_main.png";
                if(img === "Morgantown_map.png") destName = "img_map_marker.png";
                
                await download(url, path.join(outDir, destName.replace(/ /g, '_')));
                console.log(`Downloaded ${img} -> ${destName}`);
            }
        } catch (e) {
            console.error(`Failed ${img}: ${e.message}`);
        }
    }
}

fetchImages();
