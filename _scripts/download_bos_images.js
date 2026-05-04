const fs = require('fs');
const path = require('path');
const https = require('https');

const listPath = 'f:/Fallout/_drafts/bos/images_list.json';
const outDir = 'f:/Fallout/images/note_extracted/brotherhood-base/';
const baseApiUrl = 'https://fallout.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const images = JSON.parse(fs.readFileSync(listPath, 'utf8'));

// Also download a placeholder image just in case
const placeholderPath = 'f:/Fallout/images/placeholder.jpg';
if (!fs.existsSync(placeholderPath)) {
    // Generate a simple 1x1 black pixel or use one from fandom as fallback
    // Actually let's not bother with generating if we can just copy from an existing one
    // Fandom placeholder URL (a random small image)
    downloadFile('https://static.wikia.nocookie.net/fallout/images/7/70/Fallout_New_Vegas_T-51b.jpg/revision/latest?cb=20120109040854', placeholderPath);
}

let currentIndex = 0;

function downloadImageInfo() {
    if (currentIndex >= images.length) {
        console.log('All image info fetched and downloads initiated!');
        return;
    }

    const batch = images.slice(currentIndex, currentIndex + 5);
    const titles = batch.map(img => `File:${encodeURIComponent(img)}`).join('|');
    const apiUrl = baseApiUrl + titles;

    https.get(apiUrl, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
             try {
                 const json = JSON.parse(data);
                 const pages = json.query.pages;
                 for (const pageId in pages) {
                     const page = pages[pageId];
                     if (page.imageinfo && page.imageinfo.length > 0) {
                         const url = page.imageinfo[0].url;
                         const filename = page.title.replace(/^File:/, '');
                         const destPath = path.join(outDir, filename);

                         if (!fs.existsSync(destPath)) {
                             downloadFile(url, destPath);
                         } else {
                             console.log(`Already exists: ${filename}`);
                         }
                     }
                 }
             } catch (e) {
                 console.error('Error parsing JSON for batch:', e);
             }
             
             currentIndex += 5;
             setTimeout(downloadImageInfo, 500); // polite delay
        });
    }).on('error', err => {
        console.error('API Error:', err);
        currentIndex += 5;
        setTimeout(downloadImageInfo, 500);
    });
}

function downloadFile(url, dest) {
    console.log(`Downloading: ${url}`);
    
    const file = fs.createWriteStream(dest);
    
    const request = https.get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
            // handle redirect
            downloadFile(response.headers.location, dest);
            return;
        }
        
        response.pipe(file);
        
        file.on('finish', () => {
            file.close();
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => {});
        console.error(`Download Error for ${dest}:`, err);
    });
}

// Start download
downloadImageInfo();
