const fs = require('fs');

const f = 'f:/Fallout/note_articles_data.json';
let t = fs.readFileSync(f, 'utf8');
t = t.split('ススローカム・ジョー').join('スローカム・ジョー');
fs.writeFileSync(f, t, 'utf8');

const l = 'f:/Fallout/lore.html';
let lt = fs.readFileSync(l, 'utf8');
lt = lt.split('ススローカム・ジョー').join('スローカム・ジョー');
fs.writeFileSync(l, lt, 'utf8');

const dir = 'f:/Fallout';
fs.readdirSync(dir).forEach(file => {
    if (file.includes('ススローカム') || (file.includes('ローカム') && !file.includes('スローカム'))) {
        fs.unlinkSync(dir + '/' + file);
    }
});
