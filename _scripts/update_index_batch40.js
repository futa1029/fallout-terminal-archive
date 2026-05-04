const fs = require('fs');
const newEntries = [
    { slug: 'shopkeep-simon', title: '店主サイモン', enTitle: 'Shopkeep Simon', category: '人物', appearance: 'Fallout TV' },
    { slug: 'shortsight', title: 'ショートサイト', enTitle: 'Shortsight', category: '人物', appearance: 'Fallout TV' },
    { slug: 'shotgun-jeff', title: 'ショットガン・ジェフ', enTitle: 'Shotgun Jeff', category: '人物', appearance: 'Fallout TV' },
    { slug: 'siggi-wilzig', title: 'シギ・ウィルギグ博士', enTitle: 'Siggi Wilzig', category: '人物', appearance: 'Fallout TV' },
    { slug: 'slim-tv-series', title: 'スリム', enTitle: 'Slim (TV series)', category: '人物', appearance: 'Fallout TV' }
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
