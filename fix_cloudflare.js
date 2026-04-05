const fs = require('fs');
let js = fs.readFileSync('remove_duplicates.js', 'utf8');

const updates = {
    'f76.html': { name: 'Fallout 76', yomi: 'ふぉーるあうと76', status: 'draft' },
    'nw.html': { name: 'Nuclear Winter', yomi: 'にゅーくりあ・うぃんたー', status: 'draft' },
    'buds_full.html': { name: 'Buds Buds', yomi: 'ばず・ばず', status: 'draft' }
};

let m = js.match(/const manualEntries = (\[[\s\S]*?\]);/);
if (m) {
    let arr = eval('(' + m[1] + ')');
    arr.forEach(a => {
        if (updates[a.url]) {
            a.name = updates[a.url].name;
            a.yomi = updates[a.url].yomi;
            a.status = updates[a.url].status;
        }
        // Restore correct date on buds_full
        if (a.url === 'buds_full.html') {
             a.date = '2026-03-08';
        }
    });

    let newStr = JSON.stringify(arr, null, 4);
    newStr = newStr.replace(/\"([^\"]+)\":/g, '$1:');
    js = js.replace(m[1], newStr);
    fs.writeFileSync('remove_duplicates.js', js, 'utf8');
    console.log('Update successful');
} else {
    console.log('Regex failed');
}
