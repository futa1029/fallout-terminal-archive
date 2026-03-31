const fs = require('fs');
const html = fs.readFileSync('lore.html', 'utf8');
const start = html.indexOf('const loreEntries = [');
const entries = eval(html.substring(start + 20, html.indexOf('];', start) + 1));

let placeholders = [];
for (let e of entries) {
    if (e.category === '場所') {
        if (fs.existsSync(e.url)) {
            let content = fs.readFileSync(e.url, 'utf8');
            if (content.includes('このページは作成中のドラフト記事です')) {
                placeholders.push(e.url);
            }
        }
    }
}
console.log(`Found ${placeholders.length} placeholder places.`);
console.log(placeholders.slice(0, 10).join('\\n'));
