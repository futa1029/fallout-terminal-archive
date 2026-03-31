const fs = require('fs');
const files = fs.readdirSync('./').filter(f => f.endsWith('.html') && !f.startsWith('_'));
let untranslated = [];

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    // Extract everything inside <main class="content">...</main>
    const match = content.match(/<main class="content">([\s\S]*?)<\/main>/);
    if (!match) continue;
    
    let mainContent = match[1];
    
    // Remove the comments section which contains javascript and english HTML
    mainContent = mainContent.replace(/<div class="comments-section"[\s\S]*?<\/div>\s*$/, '');
    // Remove copyright block
    mainContent = mainContent.replace(/<div style="margin-top: 30px;[\s\S]*?<\/div>/, '');
    mainContent = mainContent.replace(/<p name="copyright-default">[\s\S]*?<\/p>/, '');

    // Remove all HTML tags
    mainContent = mainContent.replace(/<[^>]+>/g, '');
    
    // Count alphabet vs japanese
    const englishChars = (mainContent.match(/[A-Za-z]/g) || []).length;
    const japaneseChars = (mainContent.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) || []).length;
    
    // Condition: 1. It must have some decent amount of english words to be considered untranslated (like 50 chars)
    // 2. Ratio of English vs Japanese. If English is more than 30% of Japanese, it's highly suspect.
    if (englishChars > 50 && englishChars > japaneseChars * 0.3) {
        untranslated.push({ file, en: englishChars, ja: japaneseChars, content: mainContent.trim().substring(0, 50) });
    }
}

console.log(`Found ${untranslated.length} potentially untranslated files.`);
// Keep only the ones explicitly pointed out or similar
untranslated.sort((a,b) => b.en - a.en);

const important = ["j-schrams-house.html", "overseers-home.html", "cliffwalk-track.html", "mountainside-bed-and-breakfast.html", "hornwright-testing-4.html", "harpers-ferry-clinic.html", "harpers-ferry-armory.html", "hornwright-air-purifier-01.html", "hemlock-holes-maintenance.html", "hawkes-refuge.html", "creekside-sundew-grove.html"];

console.log("\n--- Target files status ---");
important.forEach(imp => {
    const found = untranslated.find(u => u.file === imp);
    if (found) {
        console.log(`${found.file} (EN: ${found.en}, JA: ${found.ja})`);
    } else {
        console.log(`${imp} -> NOT in list`);
    }
});

fs.writeFileSync('_untranslated_list.txt', untranslated.map(u => `${u.file}\t${u.en}\t${u.ja}`).join('\n'));
