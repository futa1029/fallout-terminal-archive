const fs = require('fs');
const newEntries = [
    { slug: 'shady-sands-farmer', title: 'シェイディ・サンズの農民', enTitle: 'Shady Sands farmer', category: '人物', appearance: 'Fallout TV' },
    { slug: 'shelley-tv-series', title: 'シェリー', enTitle: 'Shelley (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'sheriff-tv-series', title: '保安官（ガバミント）', enTitle: 'Sheriff (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'sherman-tv-series', title: 'シャーマン', enTitle: 'Sherman (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'shirtless-raider', title: '上半身裸のレイダー', enTitle: 'Shirtless raider', category: '人物', appearance: 'Fallout TV' }
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
