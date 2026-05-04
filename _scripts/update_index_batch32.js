const fs = require('fs');
const newEntries = [
    { slug: 'nick-the-prick', title: 'ニック・ザ・プリック', enTitle: 'Nick the Prick', category: '人物', appearance: 'Fallout TV' },
    { slug: 'norm-maclean', title: 'ノーム・マクレーン', enTitle: 'Norm MacLean', category: '人物', appearance: 'Fallout TV' },
    { slug: 'nose-edmundson', title: 'ドクター・"ノーズ"・エドモンドソン', enTitle: 'Nose Edmundson', category: '人物', appearance: 'Fallout TV' },
    { slug: 'old-woman-gretch', title: '老婆のグレッチ', enTitle: 'Old Woman Gretch', category: '人物', appearance: 'Fallout TV' },
    { slug: 'party-guest', title: 'パーティー客', enTitle: 'Party guest', category: '人物', appearance: 'Fallout TV' }
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
