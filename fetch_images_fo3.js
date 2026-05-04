const https = require('https');
const fs = require('fs');

const chars = [
    'james', 
    'amata', 
    'sarah-lyons', 
    'owyn-lyons', 
    'john-henry-eden', 
    'augustus-autumn', 
    'three-dog', 
    'moira-brown', 
    'fawkes', 
    'charon'
];
const wikis = [
    'James_(Fallout_3)', 
    'Amata_Almodovar', 
    'Sarah_Lyons', 
    'Owyn_Lyons', 
    'John_Henry_Eden', 
    'Augustus_Autumn', 
    'Three_Dog', 
    'Moira_Brown', 
    'Fawkes', 
    'Charon_(Fallout_3)'
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
                        let imgs = js.parse.images;
                        out[chars[i]] = imgs.filter(img => !img.toLowerCase().includes('icon') && !img.endsWith('.svg')).slice(0, 5);
                    } catch(e){}
                    res();
                });
            });
        });
    }
    fs.writeFileSync('f:/Fallout/temp_imgs_fo3_char1.json', JSON.stringify(out, null, 2), 'utf8');
}
run();
