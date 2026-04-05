const fs = require('fs');
const newEntries = [
    { slug: 'ronda-spencer', title: 'ロンダ・スペンサー', enTitle: 'Ronda Spencer', category: '人物', appearance: 'Fallout TV' },
    { slug: 'ronnie-mccurtry', title: 'ロニー・マクカートリー', enTitle: 'Ronnie McCurtry', category: '人物', appearance: 'Fallout TV' },
    { slug: 'roofus', title: 'ルーファス', enTitle: 'Roofus', category: '人物', appearance: 'Fallout TV' },
    { slug: 'roy-spencer', title: 'ロイ・スペンサー', enTitle: 'Roy Spencer', category: '人物', appearance: 'Fallout TV' },
    { slug: 'sandra-tv-series', title: 'サンドラ', enTitle: 'Sandra (TV series)', category: '人物', appearance: 'Fallout TV' }
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
