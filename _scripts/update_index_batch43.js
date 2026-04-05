const fs = require('fs');
const newEntries = [
    { slug: 'street-hustler', title: 'ストリート・ハスラー', enTitle: 'Street hustler', category: '人物', appearance: 'Fallout TV' },
    { slug: 'subject-476', title: '被験体476', enTitle: 'Subject 476', category: '人物', appearance: 'Fallout TV' },
    { slug: 'sunburned-man', title: '日焼けした男', enTitle: 'Sunburned man', category: '人物', appearance: 'Fallout TV' },
    { slug: 'tatyana-lee', title: 'タチアナ・リー', enTitle: 'Tatyana Lee', category: '人物', appearance: 'Fallout TV' },
    { slug: 'television-host', title: 'テレビ司会者', enTitle: 'Television host', category: '人物', appearance: 'Fallout TV' }
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
