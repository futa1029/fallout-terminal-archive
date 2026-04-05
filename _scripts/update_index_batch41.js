const fs = require('fs');
const newEntries = [
    { slug: 'slit-throat-victim', title: '喉を掻き切られた犠牲者', enTitle: 'Slit throat victim', category: '人物', appearance: 'Fallout TV' },
    { slug: 'snake-oil-salesman', title: '胡散臭いセールスマン', enTitle: 'Snake oil salesman', category: '人物', appearance: 'Fallout TV' },
    { slug: 'sonny', title: 'ソニー', enTitle: 'Sonny', category: '人物', appearance: 'Fallout TV' },
    { slug: 'sorrel-booker', title: 'ソレル・ブッカー', enTitle: 'Sorrel Booker', category: '人物', appearance: 'Fallout TV' },
    { slug: 'spectator', title: '見物人（Vault-Tec）', enTitle: 'Spectator', category: '人物', appearance: 'Fallout TV' }
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
