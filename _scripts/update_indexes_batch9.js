const fs = require('fs');

const dateStr = new Date().toISOString().split('T')[0];

const newEntries = [
    { slug: 'burly-raider', title: '大柄なレイダー', enTitle: 'Burly raider', category: '人物', appearance: 'Fallout TV' },
    { slug: 'cadillac-bob', title: 'キャデラック・ボブ', enTitle: 'Cadillac Bob', category: '人物', appearance: 'Fallout TV' },
    { slug: 'caesar-tv', title: 'シーザー（TVシリーズ）', enTitle: 'Caesar (TV series)', category: '人物', appearance: 'Fallout TV' },
    { slug: 'canadian-rebel', title: 'カナダの反乱者', enTitle: 'Canadian rebel', category: '人物', appearance: 'Fallout TV' },
    { slug: 'carl-tv-series', title: 'DJカール', enTitle: 'DJ Carl', category: '人物', appearance: 'Fallout TV' }
];

// 1. Update changelog-data.json
let changelog = JSON.parse(fs.readFileSync('f:/Fallout/changelog-data.json', 'utf8'));
for (const entry of newEntries) {
    changelog.unshift({
        date: dateStr,
        title: entry.title,
        url: entry.slug + '.html',
        type: 'new'
    });
}
fs.writeFileSync('f:/Fallout/changelog-data.json', JSON.stringify(changelog, null, 2));

// 2. Update title_to_slug.json
let titleToSlug = JSON.parse(fs.readFileSync('f:/Fallout/title_to_slug.json', 'utf8'));
for (const entry of newEntries) {
    titleToSlug[entry.title] = entry.slug + '.html';
    titleToSlug[entry.enTitle] = entry.slug + '.html';
    // Remove (TV series) variants for title matches
    if(entry.enTitle.includes('(TV series)')) {
        titleToSlug[entry.enTitle.replace(' (TV series)', '')] = entry.slug + '.html';
    }
}
fs.writeFileSync('f:/Fallout/title_to_slug.json', JSON.stringify(titleToSlug, null, 2));

// 3. Update lore.html (we will inject the raw li tags just before the first <li> in the character list or let remove_duplicates handle it? 
// No, lore.html is generated directly from somewhere or we just prepend to the list. )
let loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf8');

let inserts = newEntries.map(e => '                <li data-category="人物" data-appearance="Fallout TV"><a href="' + e.slug + '.html" class="terminal-link">' + e.title + '</a></li>').join('\\n');

// Find the <ul id="lore-list"> 
let ulMatch = loreHtml.match(/<ul id="lore-list"[^>]*>\\s*/);
if(ulMatch) {
    loreHtml = loreHtml.replace(ulMatch[0], ulMatch[0] + inserts + '\\n');
    fs.writeFileSync('f:/Fallout/lore.html', loreHtml);
} else {
    console.log("Could not find lore-list ul tag");
}

console.log("Index files updated successfully.");
