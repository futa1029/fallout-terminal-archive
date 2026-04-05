const https = require('https');
const fs = require('fs');

const chars = [
    'dave-fo3', 
    'roy-phillips', 
    'sticky', 
    'gob', 
    'colin-moriarty', 
    'lucas-simms', 
    'sydney', 
    'herbert-dashwood', 
    'argyle', 
    'pinkerton'
];
const wikis = [
    'Dave_(Fallout_3)', 
    'Roy_Phillips', 
    'Sticky', 
    'Gob', 
    'Colin_Moriarty', 
    'Lucas_Simms', 
    'Sydney', 
    'Herbert_Dashwood', 
    'Argyle', 
    'Pinkerton'
];

async function run() {
    let out = {};
    for (let i=0; i<chars.length; i++) {
        await new Promise(res => {
            https.get('https://fallout.fandom.com/api.php?action=parse&page=' + encodeURIComponent(wikis[i]) + '&prop=images&format=json', {headers: {'User-Agent': 'Mozilla/5.0'}}, r => {
                let d = '';
                r.on('data', c => d+=c);
                r.on('end', () => {
                    try {
                        let js = JSON.parse(d);
                        let imgs = js.parse.images || [];
                        out[chars[i]] = imgs.filter(img => !img.toLowerCase().includes('icon') && !img.endsWith('.svg')).slice(0, 5);
                    } catch(e){}
                    res();
                });
            });
        });
    }
    fs.writeFileSync('f:/Fallout/temp_imgs_fo3_char4.json', JSON.stringify(out, null, 2), 'utf8');
}
run();
