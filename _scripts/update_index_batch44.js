const fs = require('fs');
const newEntries = [
    { slug: 'thaddeus', title: 'サデウス', enTitle: 'Thaddeus', category: '人物', appearance: 'Fallout TV' },
    { slug: 'thaddeus-minion', title: 'サデウスの子分', enTitle: 'Thaddeus\' minion', category: '人物', appearance: 'Fallout TV' },
    { slug: 'thomas-hamilton', title: 'トーマス・ハミルトン', enTitle: 'Thomas Hamilton', category: '人物', appearance: 'Fallout TV' },
    { slug: 'titus', title: 'タイタス', enTitle: 'Titus', category: '人物', appearance: 'Fallout TV' },
    { slug: 'tom-tv-series', title: 'トム', enTitle: 'Tom (TV series)', category: '人物', appearance: 'Fallout TV' }
];
let titleToSlug = JSON.parse(fs.readFileSync('f:/Fallout/title_to_slug.json', 'utf8'));
for (const entry of newEntries) {
    titleToSlug[entry.title] = entry.slug + '.html';
    titleToSlug[entry.enTitle] = entry.slug + '.html';
    if(entry.enTitle.includes('(TV series)')) {
        titleToSlug[entry.enTitle.replace(' (TV series)', '')] = entry.slug + '.html';
    }
    if(entry.enTitle.includes('(mentioned)')) {
        titleToSlug[entry.enTitle.replace(' (mentioned)', '')] = entry.slug + '.html';
    }
}
fs.writeFileSync('f:/Fallout/title_to_slug.json', JSON.stringify(titleToSlug, null, 2));
