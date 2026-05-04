const fs = require('fs');
let content = fs.readFileSync('remove_duplicates.js', 'utf8');
const m = content.match(/const manualEntries = (\[[\s\S]*?\]);/);
if (m) {
    let arr = eval(m[1]);
    const keepList = [
        'stealth-boy.html',
        'brotherhood-of-steel.html',
        'cave_cricket.html',
        'commie-kazi.html'
    ];
    let updateCount = 0;
    arr.forEach(e => {
        if (!keepList.includes(e.url)) {
            if (e.date && e.date >= '2026-04-25') {
                e.date = '2026-04-20';
                updateCount++;
            }
        }
    });
    console.log('Updated ' + updateCount + ' entries to 2026-04-20');
    
    // オブジェクトを文字列に戻す
    let newStr = JSON.stringify(arr, null, 4);
    // キーのクォートを外す（JSのオブジェクトリテラル形式に合わせる）
    newStr = newStr.replace(/\"([a-zA-Z_][a-zA-Z0-9_]*)\":/g, '$1:');
    
    content = content.replace(m[1], newStr);
    fs.writeFileSync('remove_duplicates.js', content, 'utf8');
    console.log('remove_duplicates.js updated');
} else {
    console.log('regex failed');
}
