const fs = require('fs');
const path = require('path');

const scriptsDir = 'f:/Fallout/_scripts';
const files = fs.readdirSync(scriptsDir).filter(f => f.startsWith('_batch_gen_') && f.endsWith('.js'));

let totalFixed = 0;

for (const file of files) {
    const filePath = path.join(scriptsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Find `/<div class=".*?box" ` and replace with `/<div class="quote-box"`
    // Need to avoid matching other things, so let's match exact pattern
    const bugRegexPattern = /<div class=".*?\?box"/g;
    if (bugRegexPattern.test(content)) {
        content = content.replace(bugRegexPattern, `<div class="quote-box"`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[FIXED] ${file}`);
        totalFixed++;
    } else {
        // Also try to check the escaped one or literal
        const literalBug = `<div class=".*?box"`;
        if (content.includes(literalBug)) {
            content = content.replace(new RegExp(literalBug.replace(/\?/g, '\\?').replace(/\./g, '\\.'), 'g'), `<div class="quote-box"`);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`[FIXED] ${file}`);
            totalFixed++;
        }
    }
}

console.log(`Fixed regex in ${totalFixed} files.`);
