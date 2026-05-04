const https = require('https');
const fs = require('fs');
const path = require('path');

const titles = ["Wilson_Brother's_Auto_Repair", "Doc_Stanley", "Max_Posey", "Mega_mansion", "Vendor_bot_Greg", "Artemis_(Wastelanders)", "Marie_(Fallout_76)"];

titles.forEach(title => {
    const url = "https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=" + encodeURIComponent(title) + "&format=json";
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const parsed = JSON.parse(data);
                const pages = parsed.query.pages;
                const pageId = Object.keys(pages)[0];
                if (pageId !== "-1") {
                    const content = pages[pageId].revisions[0].slots.main['*'];
                    const filename = title.replace(/_/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/'/g, '') + '.txt';
                    fs.writeFileSync(path.join('f:/Fallout/_drafts', filename), content);
                    console.log(`Saved ${title}`);
                } else {
                    console.log(`NOT FOUND: ${title}`);
                }
            } catch (e) {
                console.log(`Error ${title}:`, e.message);
            }
        });
    }).on('error', e => console.log(`Error ${title}:`, e.message));
});
