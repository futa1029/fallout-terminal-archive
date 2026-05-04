const fs = require('fs');

let js = fs.readFileSync('remove_duplicates.js', 'utf8');
const match = js.match(/const manualEntries\s*=\s*(\[[\s\S]*?\]);/m);
let arr = eval('(' + match[1] + ')');
let item = arr.find(a => a.url === 'athena.html');

if (item) {
    item.name = 'A.T.H.E.N.A.';
    item.yomi = 'あてな';
    delete item.status;
    let newStr = JSON.stringify(arr, null, 4).replace(/"([^"]+)":/g, '$1:');
    js = js.replace(/const manualEntries\s*=\s*\[[\s\S]*?\];/m, 'const manualEntries = ' + newStr + ';');
    fs.writeFileSync('remove_duplicates.js', js, 'utf8');
    
    // Create _X directory if it doesn't exist
    if (!fs.existsSync('_X/athena')) fs.mkdirSync('_X/athena', { recursive: true });
    fs.writeFileSync('_X/athena/post.md', '#Fallout76\n\nA.T.H.E.N.A.\nhttps://www.fallout-jp.com/athena.html\n\n概要...');
    console.log('Done mapping A.T.H.E.N.A.');
}
