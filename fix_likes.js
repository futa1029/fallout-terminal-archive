const fs = require('fs');
const path = require('path');

const dir = 'f:\\Fallout';
const files = [
    'kimball.html',
    'tandi.html',
    'raiders_76.html',
    'blight.html',
    'ncr.html',
    'prize_bot.html',
    'assaultron_head.html',
    'lee_moldaver.html',
    'vault_dweller_lore.html',
    'vault_dweller_jp.html',
    'wayward_jp.html'
];

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
        console.log('Skipping ' + file + ' (not found)');
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');

    // 古いランダム設定のスクリプトを新しいものに置換
    const oldScriptPattern = /let initialLikes = Math\.floor\(Math\.random\(\) \* 80\) \+ 12;/g;
    const newScriptPattern = `let initialLikes = 1;`;

    // まだ修正されていない場合のみ置換
    if (content.includes('let initialLikes = Math.floor(Math.random() * 80) + 12;')) {
        content = content.replace(oldScriptPattern, newScriptPattern);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed initialLikes in ' + file);
    } else {
        console.log('Already fixed or not found in ' + file);
    }
});
