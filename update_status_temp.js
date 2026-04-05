const fs = require('fs');
let js = fs.readFileSync('remove_duplicates.js', 'utf8');
const updates = {
    'mechanist.html': { name: 'メカニスト', yomi: 'めかにすと' },
    'moe-the-mole.html': { name: 'モー・ザ・モール', yomi: 'もー・ざ・もーる' },
    'grandpa-mumbles.html': { name: 'グランパ・マンブルズ', yomi: 'ぐらんぱ・まんぶるず' },
    'joey-bello.html': { name: 'ジョーイ・ベロ', yomi: 'じょーい・べろ' },
    'mistress-of-mystery.html': { status: 'skipped' }
};

let m = js.match(/const manualEntries = (\[[\s\S]*?\]);/);
if (m) {
    let arr = eval('(' + m[1] + ')');
    arr.forEach(a => {
        if (updates[a.url]) {
            if (updates[a.url].status) {
                a.status = updates[a.url].status;
            } else {
                a.name = updates[a.url].name;
                a.yomi = updates[a.url].yomi;
                delete a.status;
                const today = new Date();
                // To JST
                today.setHours(today.getHours() + 9);
                a.date = today.toISOString().split('T')[0];
            }
        }
    });

    let newStr = JSON.stringify(arr, null, 4);
    newStr = newStr.replace(/\"([^\"]+)\":/g, '$1:');
    js = js.replace(m[1], newStr);
    fs.writeFileSync('remove_duplicates.js', js, 'utf8');
    console.log('Update successful');
} else {
    console.log('regex failed');
}
