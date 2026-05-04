const fs = require('fs');
const content = fs.readFileSync('js/lore_index.js', 'utf8');
const targets = [
    'brotherhood-of-steel.html',
    'cave_cricket.html',
    'commie-kazi.html'
];
targets.forEach(url => {
    // isDraftをオプションで探す
    const regex = new RegExp('url:\\s*"' + url + '",[\\s\\S]*?date:\\s*"(.*?)"([\\s\\S]*?isDraft:\\s*(true|false))?');
    const m = content.match(regex);
    if (m) console.log(url + ' -> date: ' + m[1] + ', isDraft: ' + m[3]);
    else console.log(url + ' -> NOT FOUND');
});
