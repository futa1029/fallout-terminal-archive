const fs = require('fs');
const content = fs.readFileSync('remove_duplicates.js', 'utf8');
const targets = [
    'brotherhood-of-steel.html',
    'cave_cricket.html',
    'commie-kazi.html'
];
targets.forEach(url => {
    const regex = new RegExp('url:\\s*"' + url + '",[\\s\\S]*?date:\\s*"(.*?)",[\\s\\S]*?status:\\s*"(.*?)"');
    const m = content.match(regex);
    if (m) console.log(url + ' -> date: ' + m[1] + ', status: ' + m[2]);
    else console.log(url + ' -> NOT FOUND');
});
