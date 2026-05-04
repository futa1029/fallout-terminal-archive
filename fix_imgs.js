const fs = require('fs');
const https = require('https');

async function downloadImage(url, fp) {
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                downloadImage(res.headers.location, fp).then(resolve);
                return;
            }
            if (res.statusCode !== 200) { resolve(false); return; }
            const ws = fs.createWriteStream(fp);
            res.pipe(ws);
            ws.on('finish', () => resolve(true));
        });
    });
}

function getImageUrl(fn) {
    return new Promise((resolve) => {
        const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(fn)}&prop=imageinfo&iiprop=url&format=json`;
        https.get(url, { headers: { 'User-Agent': 'FalloutLoreArchive/1.0' } }, (res) => {
            let d = ''; res.on('data', c => d += c);
            res.on('end', () => {
                let j = JSON.parse(d);
                let p = Object.values(j.query.pages)[0];
                resolve(p.imageinfo?.[0]?.url || null);
            });
        });
    });
}

async function fix(slug, fn) {
    let url = await getImageUrl(fn);
    if (!url) { console.log("Failed " + fn); return; }
    let ext = '.jpg';
    let extMatch = url.match(/\.([a-zA-Z0-9]+)(?:[\?\/]|$)/);
    if (extMatch) ext = '.' + extMatch[1];
    
    let localPath = `images/note_extracted/${slug}/img_main${ext}`;
    
    fs.mkdirSync(`F:/Fallout/images/note_extracted/${slug}`, {recursive: true});
    await downloadImage(url, 'F:/Fallout/' + localPath);
    console.log("Downloaded " + localPath);
}

fix('four-leaf-fishpacking-plant', 'Four_Leaf_Fishpacking_Plant.jpg');
fix('gwinnett-brewery', 'FO4_Gwinnett_brewery.jpg');
