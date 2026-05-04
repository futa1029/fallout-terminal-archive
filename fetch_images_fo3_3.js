const https = require('https');
const fs = require('fs');

const chars = [
    'agatha', 
    'allistair-tenpenny', 
    'sierra-petrovita', 
    'zimmer', 
    'uncle-leo', 
    'desmond-lockheart', 
    'calvert', 
    'ishmael-ashur', 
    'wernher', 
    'jingwei'
];
const wikis = [
    'Agatha', 
    'Allistair_Tenpenny', 
    'Sierra_Petrovita', 
    'Zimmer', 
    'Uncle_Leo', 
    'Desmond_Lockheart', 
    'Calvert', 
    'Ishmael_Ashur', 
    'Wernher', 
    'Jingwei'
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
    fs.writeFileSync('f:/Fallout/temp_imgs_fo3_char3.json', JSON.stringify(out, null, 2), 'utf8');
}
run();
