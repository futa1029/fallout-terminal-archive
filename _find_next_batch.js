const fs = require('fs');
const broken = JSON.parse(fs.readFileSync('_truly_broken.json', 'utf8'));

let needed = [];
for (const e of broken.mostlyEnglish) {
    const f = e; // it's already "erika-hewsen.html" format
    if (!fs.existsSync(f)) continue;
    
    // Check if it was processed already in p3b scripts
    // or just check the english ratio of the content
    const html = fs.readFileSync(f, 'utf8');
    const m = html.match(/<main class="content">([\s\S]*?)<div style="margin-top:/);
    if (!m) continue;
    
    const text = m[1].replace(/<[^>]+>/g, '');
    const en = (text.match(/[a-zA-Z]/g)||[]).length;
    const ja = (text.match(/[\u3040-\u30ff\u4e00-\u9fff]/g)||[]).length;
    
    // if English characters > Japanese characters, it's NOT translated
    if (en > 50 && en > ja * 0.5) {
        needed.push(e);
    }
}

console.log('Untranslated count:', needed.length);
console.log(needed.slice(0, 10));
