const fs = require('fs');
let content = fs.readFileSync('remove_duplicates.js', 'utf8');
const targets = [
    'brotherhood-of-steel.html',
    'cave_cricket.html',
    'stealth-boy.html',
    'commie-kazi.html'
];

targets.forEach(url => {
    // 非常に具体的なパターンで置換
    const regex = new RegExp('(url:\\s*"' + url + '",[\\s\\S]*?date:\\s*")[^"]*("[\\s\\S]*?status:\\s*")[^"]*(")', 'g');
    if (content.match(regex)) {
        content = content.replace(regex, '$12026-05-04$2published$3');
        console.log('Updated: ' + url);
    } else {
        console.log('Not found or pattern mismatch: ' + url);
    }
});

fs.writeFileSync('remove_duplicates.js', content, 'utf8');
