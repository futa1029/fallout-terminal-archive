const fs = require('fs');
const newEntries = [
    { slug: 'reg-mcphee', title: 'レグ・マクフィー', enTitle: 'Reg McPhee', category: '人物', appearance: 'Fallout TV' },
    { slug: 'reporter-tv-series', title: 'リポーター', enTitle: 'Reporter (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'rex-tv-series', title: '保安官レックス', enTitle: 'Rex (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'riley-tv-series', title: 'ナイト・ライリー', enTitle: 'Riley (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'rink', title: 'リンク', enTitle: 'Rink', category: '人物', appearance: 'Fallout TV' }
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
