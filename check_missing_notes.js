const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('lore.html', 'utf8');
const start = html.indexOf('const loreEntries = [');
const entries = eval(html.substring(start + 20, html.indexOf('];', start) + 1));

let forestDrafts = [];
for (let e of entries) {
    if (e.isDraft && e.category === '場所' && fs.existsSync(e.url)) {
        let content = fs.readFileSync(e.url, 'utf8');
        if (content.includes('森林地帯') || content.includes('The Forest')) {
            forestDrafts.push(e.url);
        }
    }
}

function fetchWikitext(title) {
    return new Promise(resolve => {
        let slug = encodeURIComponent(title.replace(/ /g, '_'));
        https.get('https://fallout.fandom.com/api.php?action=parse&page=' + slug + '&prop=wikitext&format=json', res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    let j = JSON.parse(data);
                    if (j.error) resolve('');
                    else resolve(j.parse.wikitext['*'] || '');
                } catch(e) { resolve(''); }
            });
        }).on('error', () => resolve(''));
    });
}

(async () => {
    let count = 0;
    for (let url of forestDrafts) {
        let content = fs.readFileSync(url, 'utf8');
        let titleMatch = content.match(/wiki\/([^\/\"\'\>\?]+)/);
        if (!titleMatch) continue;
        let title = decodeURIComponent(titleMatch[1]).replace(/_/g, ' ');

        let wt = await fetchWikitext(title);
        let hasNotesInWiki = wt.toLowerCase().includes('[[note') || wt.toLowerCase().includes('[[holotape') || wt.toLowerCase().includes(' terminal entries]]') || wt.toLowerCase().includes('[[message') || wt.toLowerCase().includes('[[letter');
        
        let hasNotesInHtml = content.includes('note-block') || content.includes('holotape-box') || content.includes('terminal-entry') || content.includes('note-box');

        if (hasNotesInWiki && !hasNotesInHtml) {
            console.log(url + ' => MISSING NOTES (' + title + ')');
            count++;
        }
    }
    console.log('Total files missing notes out of ' + forestDrafts.length + ':', count);
})();
