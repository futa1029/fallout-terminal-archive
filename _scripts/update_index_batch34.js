const fs = require('fs');
const newEntries = [
    { slug: 'protest-foreperson', title: '抗議活動のまとめ役', enTitle: 'Protest foreperson', category: '人物', appearance: 'Fallout TV' },
    { slug: 'quintus', title: 'エルダー・クレリック・クインタス', enTitle: 'Quintus', category: '人物', appearance: 'Fallout TV' },
    { slug: 'raider-3', title: 'レイダー3', enTitle: 'Raider 3', category: '人物', appearance: 'Fallout TV' },
    { slug: 'red-haired-man', title: '赤毛の男', enTitle: 'Red-haired man', category: '人物', appearance: 'Fallout TV' },
    { slug: 'red-haired-woman', title: '赤毛の女', enTitle: 'Red-haired woman', category: '人物', appearance: 'Fallout TV' }
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
