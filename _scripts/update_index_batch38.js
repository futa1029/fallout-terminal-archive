const fs = require('fs');
const newEntries = [
    { slug: 'sarah-clements', title: 'サラ・クレメンツ', enTitle: 'Sarah Clements', category: '人物', appearance: 'Fallout TV' },
    { slug: 'scavenger-tv-series', title: 'スカベンジャー', enTitle: 'Scavenger (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'scribe-tv-series', title: 'スクライブ', enTitle: 'Scribe (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'sebastian-leslie', title: 'セバスチャン・レスリー', enTitle: 'Sebastian Leslie', category: '人物', appearance: 'Fallout TV' },
    { slug: 'shady-sands-citizen-tv-series', title: 'シェイディ・サンズの市民', enTitle: 'Shady Sands citizen (TV series)', category: '人物', appearance: 'Fallout TV' }
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
