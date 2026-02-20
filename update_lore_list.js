const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';
const DATA_FILE = path.join(DIR, 'note_articles_data.json');
const LORE_HTML = path.join(DIR, 'lore.html');

async function updateLoreHtml() {
    if (!fs.existsSync(DATA_FILE)) {
        console.log('No data file found!');
        return;
    }

    const dataRaw = fs.readFileSync(DATA_FILE, 'utf8');
    const articles = JSON.parse(dataRaw);

    // loreEntries用のJavaScript配列オブジェクト文字列を生成
    // structure: { name: "", yomi: "", url: "", category: "note", appearance: ["note.com"], date: "" }
    let newEntriesObj = '';

    articles.forEach(article => {
        const safeTitle = article.title.replace(/"/g, '\\"');
        const dateStr = new Date(article.date).toISOString().split('T')[0]; // YYYY-MM-DD

        newEntriesObj += `            {
                name: "${safeTitle}",
                yomi: "${safeTitle}", // yomiタグがないので便宜上タイトルをそのまま
                url: "note_${article.key}.html",
                category: "note記事",
                appearance: ["note.com"],
                date: "${dateStr}"
            },\n`;
    });

    if (!fs.existsSync(LORE_HTML)) {
        console.log('lore.html not found!');
        return;
    }

    let loreContent = fs.readFileSync(LORE_HTML, 'utf8');

    const insertionPoint = `        const loreEntries = [`;
    const replaceString = `        const loreEntries = [\n${newEntriesObj}`;

    if (loreContent.includes(insertionPoint)) {
        if (loreContent.includes(`note_${articles[0].key}.html`)) {
            console.log('It seems note articles are already added to lore.html.');
            return;
        }

        loreContent = loreContent.replace(insertionPoint, replaceString);
        fs.writeFileSync(LORE_HTML, loreContent, 'utf8');
        console.log('Successfully added all 238 note articles to lore.html!');
    } else {
        console.log('Could not find pattern in lore.html');
    }
}

updateLoreHtml();
