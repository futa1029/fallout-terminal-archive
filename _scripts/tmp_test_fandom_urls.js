const https = require('https');

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

(async () => {
    let url1 = await getImageUrl('FO4_Madison_Li.png');
    console.log('FO4_Madison_Li.png:', url1);
    
    let url2 = await getImageUrl('Madison_Li.jpg');
    console.log('Madison_Li.jpg:', url2);
    
    let url3 = await getImageUrl('FO4_Madison_Li_concept_art.png');
    console.log('FO4_Madison_Li_concept_art.png:', url3);
})();
