const fs = require('fs');
const newEntries = [
    { slug: 'rita-tv-series', title: 'リタ', enTitle: 'Rita (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'robert-house', title: 'ロバート・ハウス（Mr.ハウス）', enTitle: 'Robert House', category: '人物', appearance: 'Fallout TV' },
    { slug: 'robert-houses-double', title: 'Mr.ハウスの影武者', enTitle: "Robert House's double", category: '人物', appearance: 'Fallout TV' },
    { slug: 'robert-olsen', title: 'ロバート・オルセン', enTitle: 'Robert Olsen', category: '人物', appearance: 'Fallout TV' },
    { slug: 'rodriguez', title: 'キャプテン・ロドリゲス', enTitle: 'Rodriguez', category: '人物', appearance: 'Fallout TV' }
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
