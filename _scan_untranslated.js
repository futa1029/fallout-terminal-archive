const fs = require('fs');
const files = fs.readdirSync('./').filter(f => f.endsWith('.html') && !f.startsWith('_'));
let untranslated = [];

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    // Extract everything inside <main class="content">...</main>
    const match = content.match(/<main class="content">([\s\S]*?)<\/main>/);
    if (!match) continue;
    
    const mainContent = match[1];
    
    // Check if there are english words left. Look for " the ", " is ", " an ", " of ".
    // Also, just counting the ratio of english alphabet letters to Japanese characters
    const englishChars = (mainContent.match(/[a-zA-Z]/g) || []).length;
    const japaneseChars = (mainContent.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) || []).length;
    
    // Some pages have english names like "Hornwright" but if the ratio is too high, it's untranslated
    if (englishChars > 150 && englishChars > japaneseChars * 0.7) {
        untranslated.push({ file, en: englishChars, ja: japaneseChars });
    }
}

console.log(`Found ${untranslated.length} files that might be untranslated.`);
untranslated.sort((a,b) => b.en - a.en);
untranslated.slice(0, 50).forEach(u => console.log(`${u.file} (EN: ${u.en}, JA: ${u.ja})`));

fs.writeFileSync('_untranslated_list.txt', untranslated.map(u => u.file).join('\n'));
