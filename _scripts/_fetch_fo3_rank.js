const https = require('https');
const fs = require('fs');

async function getCategoryMembers(category, membersMap = {}, depth = 0) {
    if (depth > 2) return; // Prevent infinite loops
    console.log("Fetching: " + category);
    
    return new Promise((resolve) => {
        const fetchPage = async (cmcontinue) => {
            const queryStr = cmcontinue ? '&cmcontinue=' + cmcontinue : '';
            const url = 'https://fallout.fandom.com/api.php?action=query&list=categorymembers&cmtitle=' + encodeURIComponent(category) + '&cmlimit=500' + queryStr + '&format=json';
            https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
                let d = ''; res.on('data', c => d+=c);
                res.on('end', async () => {
                    try {
                        let j = JSON.parse(d);
                        let members = j.query?.categorymembers || [];
                        
                        for (let m of members) {
                            if (m.ns === 14) { // Subcategory
                                await getCategoryMembers(m.title, membersMap, depth + 1);
                            } else if (m.ns === 0) { // Page
                                membersMap[m.title] = m;
                            }
                        }
                        
                        if (j.continue && j.continue.cmcontinue) {
                            await fetchPage(j.continue.cmcontinue);
                        } else {
                            resolve();
                        }
                    } catch(e) { resolve(); }
                });
            });
        };
        fetchPage('');
    });
}

function getLength(title) {
    return new Promise((resolve) => {
        const url = 'https://fallout.fandom.com/api.php?action=query&prop=revisions&titles=' + encodeURIComponent(title) + '&rvprop=size&format=json';
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let d = ''; res.on('data', c => d+=c);
            res.on('end', () => {
                try {
                    let j = JSON.parse(d);
                    let p = Object.values(j.query.pages)[0];
                    if (p && p.revisions && p.revisions[0]) {
                        resolve(p.revisions[0].size);
                    } else resolve(0);
                } catch(e) { resolve(0); }
            });
        });
    });
}

async function run() {
    let membersMap = {};
    await getCategoryMembers('Category:Fallout_3_characters', membersMap);
    
    let chars = Object.values(membersMap);
    console.log("Found " + chars.length + " FO3 characters in total.");
    
    let ranked = [];
    let count = 0;
    for (let c of chars) {
        let size = await getLength(c.title);
        ranked.push({ title: c.title, length: size });
        count++;
        if (count % 50 === 0) console.log("Fetched sizes for " + count + " characters...");
    }
    
    ranked.sort((a,b) => b.length - a.length);
    fs.writeFileSync('F:/Fallout/_fo3_character_links_ranked.json', JSON.stringify(ranked, null, 2), 'utf8');
    console.log("Done! Written to _fo3_character_links_ranked.json");
    console.log(ranked.slice(0, 15));
}

run();
