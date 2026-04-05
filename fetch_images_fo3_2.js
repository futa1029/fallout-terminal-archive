const https = require('https');
const fs = require('fs');

const chars = [
    'butch-deloria', 
    'jericho', 
    'clover', 
    'star-paladin-cross', 
    'dogmeat', 
    'mayor-maccready', 
    'madison-li', 
    'arthur-maxson', 
    'flak', 
    'shrapnel'
];
const wikis = [
    'Butch_DeLoria', 
    'Jericho', 
    'Clover', 
    'Cross', 
    'Dogmeat_(Fallout_3)', 
    'Robert_Joseph_MacCready', 
    'Madison_Li', 
    'Arthur_Maxson', 
    'Flak', 
    'Shrapnel'
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
                        out[chars[i]] = imgs.filter(img => !img.toLowerCase().includes('icon') && !img.endsWith('.svg')).slice(0, 10);
                    } catch(e){}
                    res();
                });
            });
        });
    }
    fs.writeFileSync('f:/Fallout/temp_imgs_fo3_char2.json', JSON.stringify(out, null, 2), 'utf8');
}
run();
