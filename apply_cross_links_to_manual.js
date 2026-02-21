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

    // Helper to process a specific block
    const processBlock = (content, startTag, endTag) => {
        const startIdx = content.indexOf(startTag);
        const endIdx = content.indexOf(endTag, startIdx);
        if (startIdx === -1 || endIdx === -1) return content;

        const pre = content.slice(0, startIdx + startTag.length);
        const blockContent = content.slice(startIdx + startTag.length, endIdx);
        const post = content.slice(endIdx);

        let cleanBlock = blockContent.replace(/<a href="[^"]+" class="auto-link">([^<]+)<\/a>/g, "$1");
        let finalBody = cleanBlock;

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
        return pre + finalBody + post;
    };

    content = processBlock(content, '<main class="content">', '</main>');
    content = processBlock(content, '<aside class="infobox">', '</aside>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cross-links applied to: ${fileName}`);
});
