const fs = require('fs');
['lore.html', 'admin-drafts.html'].forEach(file => {
    let content = fs.readFileSync('f:/Fallout/' + file, 'utf8');
    const startIdx = content.indexOf('url: "black-mountain-ordnance-works.html"');
    if (startIdx === -1) {
        console.log('Not found in ' + file);
        return;
    }

    let entryStart = content.lastIndexOf('{', startIdx);
    let afterContent = content.substring(entryStart);
    let beforeContent = content.substring(0, entryStart);

    // Replace date string and add isDraft if missing
    afterContent = afterContent.replace(/date:\s*"([0-9-]{10})"(\s*)\}/g, (match, date, space) => {
        return 'date: "' + date + '",\n                isDraft: true' + space + '}';
    });
    // Replace if it exists but is undefined/false/true already to avoid duplicates from previous replacement
    // Wait, the regex above matches ANY entry ending with `date: "..." }`. It won't match ones that already have `isDraft` after date!
    // But what if `isDraft` is BEFORE date? 
    // It's much safer to replace ALL isDraft declarations with true!
    afterContent = afterContent.replace(/isDraft:\s*(true|false|undefined)/g, 'isDraft: true');

    fs.writeFileSync('f:/Fallout/' + file, beforeContent + afterContent);
    console.log('Done ' + file);
});
