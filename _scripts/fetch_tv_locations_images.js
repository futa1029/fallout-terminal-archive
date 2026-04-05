const fs = require('fs');
const https = require('https');
const path = require('path');

const tvSeriesLocations = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/tv_locations_list.json', 'utf8'));
const htmls = fs.readdirSync('f:/Fallout').filter(f => f.endsWith('.html'));
const nonExisting = [];
for(const loc of tvSeriesLocations) {
    const tempName = loc.toLowerCase().replace(/[^a-z0-g0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    let found = false;
    for(const html of htmls) {
        if(html.includes(tempName)) { found = true; break; }
    }
    if(!found) nonExisting.push(loc);
}

let allImagesList = [];
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
                } catch(e) { resolve(null); }
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

const LIMIT = 10;
let queue = [...nonExisting];

function processNextBatch() {
    if(queue.length === 0) {
        return downloadAll();
    }
    let batch = queue.splice(0, LIMIT);
    let batchProcessed = 0;
    batch.forEach(page => {
        let safePage = page.replace(/'/g, "%27");
        const url = 'https://fallout.fandom.com/api.php?action=parse&page=' + encodeURIComponent(safePage) + '&prop=images&format=json';
        https.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    if(data.parse && data.parse.images) {
                        data.parse.images.forEach(img => {
                            if(!img.includes('Icon') && !img.includes('Gametitle') && !img.includes('Bugintro') && !img.includes('Navbox')) {
                                // Add association: { image: img, page: page }
                                allImagesList.push({ image: img, page: page });
                            }
                        });
                    }
                } catch(e){}
                batchProcessed++;
                if(batchProcessed === batch.length) {
                    processNextBatch();
                }
            });
        });
    });
}

async function downloadAll() {
    console.log('Found ' + allImagesList.length + ' image bindings across ' + nonExisting.length + ' pages.');
    
    // Group images by page slug
    let downloadedCount = 0;
    
    fs.writeFileSync('f:/Fallout/_drafts/tv_locations_images_map.json', JSON.stringify(allImagesList, null, 2));

    for(let item of allImagesList) {
        const { image, page } = item;
        if(image.toLowerCase().endsWith('.gif') || image.toLowerCase() === 'favicon.ico') continue;

        const slug = page.toLowerCase().replace(/[^a-z0-g0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        const dir = path.join('f:/Fallout/images/note_extracted', slug);
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        
        let localPath = path.join(dir, image.replace(/[:\\/*?"<>|]/g, '_'));
        if(fs.existsSync(localPath)) {
            downloadedCount++;
            continue; 
        }
        
        const url = await fetchImageInfo(image);
        if(url) {
            await downloadImage(url, localPath);
            downloadedCount++;
            process.stdout.write('.');
            await new Promise(r => setTimeout(r, 100));
        }
    }
    console.log('\\nFinished downloading ' + downloadedCount + ' images.');
}

processNextBatch();
