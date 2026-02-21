const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';
const DATA_FILE = path.join(DIR, 'note_articles_data.json');
const slugPath = path.join(DIR, 'title_to_slug.json');

const articles = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const titleToSlug = fs.existsSync(slugPath) ? JSON.parse(fs.readFileSync(slugPath, 'utf8')) : {};

const manualFiles = [
    { name: "アーロン・キンボール", url: "kimball.html" },
    { name: "レイダー (Fallout 76)", url: "raiders_76.html" },
    { name: "リー・モルデイヴァー", url: "lee_moldaver.html" },
    { name: "Vaultの居住者", url: "vault_dweller_lore.html" },
    { name: "回収されたアサルトロン頭部", url: "assaultron_head.html" },
    { name: "ブライト", url: "blight.html" },
    { name: "タンディ", url: "tandi.html" },
    { name: "ミスター・プライズボット", url: "prize_bot.html" },
    { name: "新カリフォルニア共和国 (NCR)", url: "ncr.html" },
    { name: "バッファロー・ゴードの種", url: "buffalo-gourd-seed.html" }
];

const manualDict = manualFiles.map(m => ({ title: m.name, url: m.url }));
const manualTitles = manualDict.map(m => m.title);

const extractedLinkDict = articles
    .filter(a => !manualTitles.includes(a.title))
    .map(a => {
        let sanitized = titleToSlug[a.title] || a.title.replace(/[\\/:*?"<>|]/g, '_').trim();
        return { title: a.title, url: `${sanitized}.html` };
    });

// Combine and sort
const linkDict = [...manualDict, ...extractedLinkDict]
    .filter(a => a.title && a.title.length >= 2)
    .sort((a, b) => b.title.length - a.title.length);

const targetHtmlFiles = manualFiles.map(f => f.url);
const excludeFromLinking = ['Vaultの居住者'];

targetHtmlFiles.forEach(fileName => {
    const filePath = path.join(DIR, fileName);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Process within <main> ignoring <aside> infobox etc.
    const mainStart = content.indexOf('<main class="content">');
    const mainEnd = content.lastIndexOf('</main>');
    if (mainStart === -1 || mainEnd === -1) return;

    const preMain = content.slice(0, mainStart + '<main class="content">'.length);
    const mainContent = content.slice(mainStart + '<main class="content">'.length, mainEnd);
    const postMain = content.slice(mainEnd);

    // First remove any existing .auto-link tags to avoid nested links
    // <a href="..." class="auto-link">Text</a> -> Text
    let cleanMain = mainContent.replace(/<a href="[^"]+" class="auto-link">([^<]+)<\/a>/g, "$1");

    let finalBody = cleanMain;

    for (const linkObj of linkDict) {
        if (excludeFromLinking.includes(linkObj.title)) continue;
        if (linkObj.url === fileName) continue; // Dont link current page to itself

        const escapedTitle = linkObj.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        let beforeBlock = '[ァ-ヶー一-龠A-Za-z0-9]';
        let afterBlock = '[ァ-ヶー一-龠A-Za-z0-9]';
        if (linkObj.title.match(/^[ァ-ヶー]+$/)) {
            beforeBlock = '[ァ-ヶー]';
            afterBlock = '[ァ-ヶー]';
        } else if (linkObj.title.match(/^[A-Za-z0-9\\s-]+$/)) {
            beforeBlock = '[A-Za-z0-9]';
            afterBlock = '[A-Za-z0-9]';
        }

        const searchRegex = new RegExp(`(?<!${beforeBlock})(${escapedTitle})(?!${afterBlock})`, 'g');

        const parts = finalBody.split(/(<[^>]+>)/g);
        let inLink = false;

        for (let j = 0; j < parts.length; j++) {
            const part = parts[j];
            if (part.startsWith('<')) {
                if (part.toLowerCase().startsWith('<a')) inLink = true;
                else if (part.toLowerCase().startsWith('</a')) inLink = false;
            } else {
                if (!inLink && part.trim() !== '') {
                    parts[j] = part.replace(searchRegex, `<a href="${linkObj.url}" class="auto-link">$1</a>`);
                } // End if
            } // End if
        } // End nested loop
        finalBody = parts.join('');
    } // End main loop

    content = preMain + finalBody + postMain;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cross-links applied to: ${fileName}`);
});
