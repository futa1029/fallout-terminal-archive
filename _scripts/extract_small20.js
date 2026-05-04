const fs = require('fs');

const data = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/tv_locations_raw.json', 'utf8'));
let sizes = [];

for(const [key, val] of Object.entries(data)) {
    if(!val.startsWith('Error') && !val.startsWith('Exception')) {
        sizes.push({ title: key, len: val.length });
    }
}
sizes.sort((a,b) => a.len - b.len);

const smallest20 = sizes.slice(0, 20);
let extraction = {};

for(let s of smallest20) {
    const slug = s.title.toLowerCase().replace(/[^a-z0-g0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const htmlPath = 'f:/Fallout/' + slug + '.html';
    if(fs.existsSync(htmlPath)) {
        let html = fs.readFileSync(htmlPath, 'utf8');
        let contentMatch = html.match(/<\/div>\s*([\s\S]*?)\s*<div class="quote-box">/);
        if(contentMatch) {
            let extracted = contentMatch[1].trim();
            extraction[slug] = {
                title: s.title,
                text: extracted
            };
        }
    }
}
fs.writeFileSync('f:/Fallout/_drafts/small20_eng.json', JSON.stringify(extraction, null, 2));
console.log('Extracted 20 files.');
