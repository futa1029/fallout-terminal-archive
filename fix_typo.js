const fs = require('fs');
const files = ['f:/Fallout/note_articles_data.json', 'f:/Fallout/lore.html'];
files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let txt = fs.readFileSync(f, 'utf8');

    // Fix over-replaced "ススローカム・ジョー" -> "スローカム・ジョー"
    txt = txt.replace(/ススローカム・ジョー/g, 'スローカム・ジョー');

    // Fix the replacement character version ( is \uFFFD)
    txt = txt.replace(/\uFFFD{1,5}スローカム・ジョー/g, 'スローカム・ジョー');
    txt = txt.replace(/\uFFFD{1,5}ローカム・ジョー/g, 'スローカム・ジョー');

    // Also just in case there are literal unknown characters
    txt = txt.replace(/スローカム・ジョー/g, 'スローカム・ジョー');
    txt = txt.replace(/ローカム・ジョー/g, 'スローカム・ジョー');

    fs.writeFileSync(f, txt, 'utf8');
});
