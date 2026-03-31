// 本当に壊れたファイルを特定するスクリプト
const fs = require('fs');
const files = fs.readdirSync('./').filter(f =>
    f.endsWith('.html') &&
    !f.startsWith('_') &&
    !['lore.html','index.html','about.html','donate.html','rules.html','admin.html','admin-drafts.html','f76.html','nw.html','fo76-guide.html','resources.html','season.html'].includes(f)
);

const fullEnglish = [];
const mostlyEnglish = [];

for (const file of files) {
    const c = fs.readFileSync(file, 'utf8');
    const m = c.match(/<main class="content">([\s\S]*?)<\/main>/);
    if (!m) continue;
    let body = m[1]
        .replace(/<div class="comments-section"[\s\S]*$/, '')
        .replace(/<p name="copyright-default">[\s\S]*?<\/p>/, '')
        .replace(/<div style="margin-top: 30px;[\s\S]*?<\/div>/, '');
    const plain = body.replace(/<[^>]+>/g, '');
    const en = (plain.match(/[A-Za-z]/g) || []).length;
    const ja = (plain.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) || []).length;
    
    if (ja < 30 && en > 200) {
        fullEnglish.push({ file, en, ja });
    } else if (ja > 0 && en / ja > 1.5 && en > 100) {
        mostlyEnglish.push({ file, en, ja, ratio: (en/ja).toFixed(1) });
    }
}

fullEnglish.sort((a, b) => b.en - a.en);
mostlyEnglish.sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));

console.log('=== カテゴリA: 完全英語スタブ (JA<30, EN>200) ===');
fullEnglish.forEach(r => console.log(`  ${r.file} (EN:${r.en} JA:${r.ja})`));
console.log(`合計: ${fullEnglish.length}件\n`);

console.log('=== カテゴリB: 英語比率極端に高い (EN/JA>1.5, EN>100) ===');
mostlyEnglish.slice(0, 30).forEach(r => console.log(`  ${r.file} (EN:${r.en} JA:${r.ja} ratio:${r.ratio})`));
if (mostlyEnglish.length > 30) console.log(`  ...他 ${mostlyEnglish.length - 30}件`);
console.log(`合計: ${mostlyEnglish.length}件`);

// JSONで保存
fs.writeFileSync('_truly_broken.json', JSON.stringify({ fullEnglish: fullEnglish.map(r=>r.file), mostlyEnglish: mostlyEnglish.map(r=>r.file) }, null, 2));
