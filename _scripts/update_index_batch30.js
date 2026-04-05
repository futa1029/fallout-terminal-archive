const fs = require('fs');
const newEntries = [
    { slug: 'mcrae', title: 'マクレー', enTitle: 'McRae', category: '人物', appearance: 'Fallout TV' },
    { slug: 'military-police-officer', title: '憲兵', enTitle: 'Military Police officer', category: '人物', appearance: 'Fallout TV' },
    { slug: 'mohawk-legionary', title: 'モヒカンのリージョナリー', enTitle: 'Mohawk legionary', category: '人物', appearance: 'Fallout TV' },
    { slug: 'moldavers-elite-guard', title: 'モルデイヴァーのエリート護衛', enTitle: "Moldaver's elite guard", category: '人物', appearance: 'Fallout TV' },
    { slug: 'monty-tv-series', title: 'モンティ', enTitle: 'Monty (TV series)', category: '人物', appearance: 'Fallout TV' }
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
    if(entry.title.includes('憲兵')) {
        titleToSlug['ミリタリーポリス'] = entry.slug + '.html';
    }
}
fs.writeFileSync('f:/Fallout/title_to_slug.json', JSON.stringify(titleToSlug, null, 2));
