const fs = require('fs');
const path = require('path');
const https = require('https');

const chars = [
    {slug: 'liberty-prime', file: 'Fo3_Liberty_Prime.png', fallback: 'Fo4_Liberty_Prime.jpg'},
    {slug: 'augustus-autumn', file: 'Colonel_Autumn.jpg'},
    {slug: 'antagonizer', file: 'Tanya_Christoff.jpg'},
    {slug: 'owyn-lyons', file: 'Elder_Lyons.jpg'},
    {slug: 'james-fallout-3', file: 'Fo3_James.jpeg', fallback: 'Fo3_James.jpg'}
];

function downloadImage(url, fp) {
    return new Promise((resolve, reject) => {
        fs.mkdirSync(path.dirname(fp), { recursive: true });
        const mod = url.startsWith('https') ? https : require('http');
        mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                downloadImage(res.headers.location, fp).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) { resolve(false); return; }
            const ws = fs.createWriteStream(fp);
            res.pipe(ws);
            ws.on('finish', () => { ws.close(); resolve(true); });
            ws.on('error', reject);
        }).on('error', reject);
    });
}

function getImageUrl(fn) {
    return new Promise((resolve) => {
        const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(fn)}&prop=imageinfo&iiprop=url&format=json`;
        https.get(url, { headers: { 'User-Agent': 'FalloutLoreArchive/1.0' } }, (res) => {
            let d = ''; res.on('data', c => d += c);
            res.on('end', () => {
                try {
                    const j = JSON.parse(d);
                    const p = Object.values(j.query.pages)[0];
                    resolve(p.imageinfo?.[0]?.url || null);
                } catch(e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

async function fixImages() {
    for (let c of chars) {
        console.log("Fixing image for: " + c.slug);
        let url = await getImageUrl(c.file);
        if (!url && c.fallback) {
            url = await getImageUrl(c.fallback);
        }

        if (!url) {
            console.log("  Could not get URL for " + c.slug);
            continue;
        }
        
        // Ensure accurate extension parsing
        let extMatch = url.match(/\.([a-zA-Z0-9]+)(?:[\?\/]|$)/);
        let ext = extMatch ? '.' + extMatch[1] : '.jpg';
        
        let localRelPath = `images/note_extracted/${c.slug}/img_main${ext}`;
        let localAbsPath = path.join('F:/Fallout', localRelPath);
        
        await downloadImage(url, localAbsPath);
        console.log("  Downloaded: " + localRelPath);
        
        let htmlPath = path.join('F:/Fallout', c.slug + '.html');
        if (fs.existsSync(htmlPath)) {
            let html = fs.readFileSync(htmlPath, 'utf8');
            html = html.replace(/<img src="images\/note_extracted\/.*?\/img_main\..*?"/, `<img src="${localRelPath}"`);
            fs.writeFileSync(htmlPath, html, 'utf8');
        }
    }
}

fixImages().then(() => console.log("Done fixing images for FO3 batch 1 pt 2."));
