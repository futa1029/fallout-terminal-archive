const fs = require('fs');
const newEntries = [
    { slug: 'ncr-caravaner', title: 'NCRのキャラバン商人', enTitle: 'NCR caravaner', category: '人物', appearance: 'Fallout TV' },
    { slug: 'ncr-citizen-tv-series', title: 'NCRの市民', enTitle: 'NCR citizen (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'ncr-soldier-tv-series', title: 'NCR兵士', enTitle: 'NCR soldier (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'ncr-trooper-tv-series', title: 'NCRトルーパー', enTitle: 'NCR trooper (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'news-anchor', title: 'ニュースキャスター', enTitle: 'News anchor', category: '人物', appearance: 'Fallout TV' }
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
