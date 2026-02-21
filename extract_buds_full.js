const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('buds_full.html', 'utf8');
const $ = cheerio.load(html);

const content = $('.mw-parser-output');
let fullText = [];

content.children('p, h2').each((i, el) => {
    if ($(el).is('h2')) {
        const h2Text = $(el).find('.mw-headline').text().trim();
        if (h2Text && h2Text !== 'Gallery' && h2Text !== 'Behind the scenes' && h2Text !== 'Appearances') {
            fullText.push(`\n## ${h2Text}`);
        }
    } else if ($(el).is('p')) {
        const pText = $(el).text().trim().replace(/\[\d+\]/g, ''); // remove reference brackets
        if (pText.length > 10) {
            fullText.push(pText);
        }
    }
});

fs.writeFileSync('buds_extracted.txt', fullText.join('\n\n'), 'utf8');
console.log('Extraction complete.');
