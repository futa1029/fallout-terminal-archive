const fs = require('fs');
const newEntries = [
    { slug: 'partygoer-tv-series', title: 'パーティーの参加者（Lucky 38）', enTitle: 'Partygoer (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'patricia-peters', title: 'パトリシア・ピーターズ', enTitle: 'Patricia Peters', category: '人物', appearance: 'Fallout TV' },
    { slug: 'pete-tv-series', title: 'ピート', enTitle: 'Pete (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'petite-raider', title: '小柄なレイダー', enTitle: 'Petite raider', category: '人物', appearance: 'Fallout TV' },
    { slug: 'powell', title: 'ナース・パウエル', enTitle: 'Powell', category: '人物', appearance: 'Fallout TV' }
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
