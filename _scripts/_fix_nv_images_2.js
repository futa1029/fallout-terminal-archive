const fs = require('fs');
const path = require('path');

const dirs = [
  'rose-of-sharon-cassidy', 'elijah', 'craig-boone', 'lanius', 'mobius', 
  'aaron-kimball', 'christine-royce', 'sarah-weintraub', 'dean-domino', 'benny', 
  'ulysses', 'caesar', 'joshua-graham', 'arcade-gannon', 'veronica-santangelo', 
  'marcus', 'raul-tejada'
];

for (let d of dirs) {
    let badDir = path.join('f:/Fallout/images/note_extracted', d);
    if (!fs.existsSync(badDir)) continue;
    let ch = fs.readdirSync(badDir);
    for (let c of ch) {
        if (c.includes('.jpg') || c.includes('.png')) {
            let latest = path.join(badDir, c, 'revision', 'latest');
            if (fs.existsSync(latest)) {
                let rightFile = path.join(badDir, c.replace(/\/.*/,''));
                let tempFile = path.join(badDir, 'temp_' + c);
                
                // コピー先がディレクトリ名と被っているので、まずは最新ファイルをtempに退避
                fs.copyFileSync(latest, tempFile);
                
                // 元のディレクトリを削除
                fs.rmSync(path.join(badDir, c), {recursive: true});
                
                // tempファイルを本来の名前にリネーム
                fs.renameSync(tempFile, rightFile);
                
                console.log('Fixed: ' + rightFile);
                
                // Fix HTML
                let htmlPath = path.join('F:/Fallout', d + '.html');
                if (fs.existsSync(htmlPath)) {
                    let html = fs.readFileSync(htmlPath, 'utf8');
                    html = html.replace(new RegExp('/img_main\\\\.(jpg|png)\\\\/revision\\\\/latest', 'g'), '/img_main.$1');
                    fs.writeFileSync(htmlPath, html, 'utf8');
                }
            }
        }
    }
}
console.log("Image fix complete.");
