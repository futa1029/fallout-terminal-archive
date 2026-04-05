const fs = require('fs');
const path = require('path');
const https = require('https');

const chars = [
    {slug: 'rose-of-sharon-cassidy', file: 'Rose_of_Sharon_Cassidy.jpg'},
    {slug: 'elijah', file: 'Father_Elijah.jpg'},
    {slug: 'craig-boone', file: 'Craig_Boone.jpg'},
    {slug: 'lanius', file: 'FNV_Lanius.jpg'},
    {slug: 'mobius', file: 'Doctor_Mobius.jpg'},
    {slug: 'aaron-kimball', file: 'Aaron_Kimball.jpg'},
    {slug: 'christine-royce', file: 'Christine_DM.jpg'},
    {slug: 'sarah-weintraub', file: 'Sarah_Weintraub.jpg'},
    {slug: 'dean-domino', file: 'DeanDomino.png'},
    {slug: 'benny', file: 'Benny_FNV.jpg'},
    {slug: 'ulysses', file: 'Ulysses_profile.jpg'},
    {slug: 'caesar', file: 'Caesar2.png'},
    {slug: 'joshua-graham', file: 'HH_Joshua_Graham.jpg'},
    {slug: 'arcade-gannon', file: 'Arcade_Gannon.jpg'},
    {slug: 'veronica-santangelo', file: 'Veronica_Santangelo.jpg'},
    {slug: 'marcus', file: 'Marcus.jpg'},
    {slug: 'raul-tejada', file: 'Raul_Tejada.jpg'}
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
        if (!url && c.slug === 'elijah') {
            url = await getImageUrl('ElijahHolographicScreen.png'); // fallback
        }
        if (!url) {
            console.log("  Could not get URL for " + c.file);
            continue;
        }
        
        let ext = url.substring(url.lastIndexOf('.'));
        if (ext.indexOf('?') > -1) ext = ext.substring(0, ext.indexOf('?'));
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

fixImages().then(() => console.log("Done fixing images."));
