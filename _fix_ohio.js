const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let c = 0;

files.forEach(f => {
    let s = fs.readFileSync(f, 'utf8');
    let changed = false;

    // We replace common incorrect translations
    const patterns = [
        /オハイオ川の冒険/g,
        /オハイオ川のアドベンチャー/g,
        /オハイオ・リバー・アドベンチャー/g,
        /オハイオ川アドベンチャー/g
    ];

    patterns.forEach(p => {
        if (p.test(s)) {
            s = s.replace(p, 'オハイオの川下りアドベンチャー');
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(f, s, 'utf8');
        console.log('Replaced in:', f);
        c++;
    }
});

// Also check JS files like _p3b7.js if relevant
const jsFiles = ['remove_duplicates.js', 'lore.html', 'changelog-data.json', '_p3b7.js'];
jsFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let s = fs.readFileSync(f, 'utf8');
    let changed = false;
    const patterns = [
        /オハイオ川の冒険/g,
        /オハイオ川のアドベンチャー/g,
        /オハイオ・リバー・アドベンチャー/g,
        /オハイオ川アドベンチャー/g
    ];
    patterns.forEach(p => {
        if (p.test(s)) {
            s = s.replace(p, 'オハイオの川下りアドベンチャー');
            changed = true;
        }
    });
    if (changed) {
        fs.writeFileSync(f, s, 'utf8');
        console.log('Replaced in:', f);
    }
});

console.log('Replaced in', c, 'HTML files');
