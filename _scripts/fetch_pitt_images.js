const fs = require('fs');
const https = require('https');
const path = require('path');

const pages = ['The_Pitt', 'The_Pitt_(Fallout_3)', 'The_Pitt_(Fallout_76)'];
let allImages = new Set();
let pagesProcessed = 0;

function fetchImageInfo(imageName) {
    return new Promise((resolve) => {
        const url = 'https://fallout.fandom.com/api.php?action=query&titles=File:' + encodeURIComponent(imageName) + '&prop=imageinfo&iiprop=url&format=json';
        https.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    const pages = data.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pageId !== "-1" && pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
                        resolve(pages[pageId].imageinfo[0].url);
                    } else {
                        resolve(null);
                    }
                } catch(e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(true);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => resolve(false));
            resolve(false);
        });
    });
}

function processPages() {
    pages.forEach(page => {
        const url = 'https://fallout.fandom.com/api.php?action=parse&page=' + encodeURIComponent(page) + '&prop=images&format=json';
        https.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                const data = JSON.parse(body);
                if(data.parse && data.parse.images) {
                    data.parse.images.forEach(img => {
                        // Exclude icons
                        if(!img.includes('Icon') && !img.includes('Gametitle') && !img.includes('Bugintro') && !img.includes('Navbox')) {
                            allImages.add(img);
                        }
                    });
                }
                pagesProcessed++;
                if(pagesProcessed === pages.length) {
                    downloadAll();
                }
            });
        });
    });
}

async function downloadAll() {
    const list = Array.from(allImages);
    console.log('Found ' + list.length + ' images to download.');
    
    // Create folders
    const dir = path.join('f:/Fallout/images/note_extracted/the-pitt');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    
    let downloaded = 0;
    for(let img of list) {
        if(img.toLowerCase().endsWith('.gif') || img.toLowerCase() === 'favicon.ico') continue;
        
        let localPath = path.join(dir, img.replace(/[:\\/*?"<>|]/g, '_'));
        if(fs.existsSync(localPath)) {
            downloaded++;
            continue; // Already downloaded
        }
        
        const url = await fetchImageInfo(img);
        if(url) {
            await downloadImage(url, localPath);
            downloaded++;
            // sleep
            await new Promise(r => setTimeout(r, 100));
        }
    }
    console.log('Finished downloading ' + downloaded + ' images.');
}

processPages();
