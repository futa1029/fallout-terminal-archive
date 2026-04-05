const fs = require('fs');
const newEntries = [
    { slug: 'squire-tv-series', title: 'スクワイア（Fallout TV）', enTitle: 'Squire (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'squirrel-tv-series', title: 'スクワール', enTitle: 'Squirrel (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'stabbed-legionary', title: '刺されたリージョナリー', enTitle: 'Stabbed legionary', category: '人物', appearance: 'Fallout TV' },
    { slug: 'steph-harper', title: 'ステフ・ハーパー', enTitle: 'Steph Harper', category: '人物', appearance: 'Fallout TV' },
    { slug: 'stephen-winthrop', title: 'スティーブン・ウィンスロップ', enTitle: 'Stephen Winthrop', category: '人物', appearance: 'Fallout TV' }
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
