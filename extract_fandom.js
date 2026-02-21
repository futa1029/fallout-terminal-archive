const fs = require('fs');
const cheerio = require('cheerio');

const files = [
    { name: 'f76.html', key: 'fo76' },
    { name: 'nw.html', key: 'nw' }
];

let out = {};

files.forEach(f => {
    if (!fs.existsSync(f.name)) return;
    const html = fs.readFileSync(f.name, 'utf8');
    const $ = cheerio.load(html);

    // Target the main content area
    const content = $('.mw-parser-output');

    // Extract background / biology
    let text = [];
    content.children('p').each((i, el) => {
        text.push($(el).text().trim());
    });

    // Extract primary images (infobox or gallery)
    let images = [];
    $('.pi-image-thumbnail, .thumbimage').each((i, el) => {
        const src = $(el).attr('src') || $(el).attr('data-src');
        if (src) {
            // Fandom image URLs often have revision parameters, clean them up or keep as is
            images.push(src.split('/revision/')[0]);
        }
    });

    out[f.key] = {
        text: text.filter(t => t.length > 20).join('\n---\n'),
        images: [...new Set(images)].slice(0, 3)
    };
});

fs.writeFileSync('cricket_data.json', JSON.stringify(out, null, 2));
console.log('Extraction complete.');
