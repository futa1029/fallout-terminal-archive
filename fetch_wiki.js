const https = require('https');
const fs = require('fs');

const options = {
    hostname: 'fallout.fandom.com',
    path: '/api.php?action=parse&page=Catarax&format=json',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
};

https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.parse && json.parse.text) {
                fs.writeFileSync('f:/Fallout/_catarax_fandom.html', json.parse.text['*']);
                console.log('Saved to _catarax_fandom.html');
            } else {
                console.log('No text found');
            }
        } catch (e) {
            console.error(e);
        }
    });
}).on('error', (e) => {
    console.error(e);
});
