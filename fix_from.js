const fs = require('fs');
const path = require('path');
const dir = 'f:\\Fallout';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
for (const file of files) {
    const fp = path.join(dir, file);
    const html = fs.readFileSync(fp, 'utf8');
    if (!html.includes('supabase.from(')) { continue; }
    const fixed = html.replace(/\bsupabase\.from\b/g, 'supabaseClient.from');
    fs.writeFileSync(fp, fixed, 'utf8');
    count++;
    console.log('[修正] ' + file);
}
console.log('完了: ' + count + '件');
