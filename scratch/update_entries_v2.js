const fs = require('fs');
let content = fs.readFileSync('remove_duplicates.js', 'utf8');
const updates = [
    { url: 'brotherhood-of-steel.html', date: '2026-05-03', status: 'published' },
    { url: 'cave_cricket.html', date: '2026-05-02', status: 'published' },
    { url: 'commie-kazi.html', date: '2026-05-01', status: 'published' },
    { url: 'stealth-boy.html', date: '2026-05-04', status: 'published' }
];

updates.forEach(u => {
    const regex = new RegExp('(url:\\s*"' + u.url + '",[\\s\\S]*?date:\\s*")[^"]*("[\\s\\S]*?status:\\s*")[^"]*(")', 'g');
    if (content.match(regex)) {
        content = content.replace(regex, '$1' + u.date + '$2' + u.status + '$3');
        console.log('Updated: ' + u.url + ' to ' + u.date);
    } else {
        console.log('Not found or pattern mismatch: ' + u.url);
    }
});

fs.writeFileSync('remove_duplicates.js', content, 'utf8');
