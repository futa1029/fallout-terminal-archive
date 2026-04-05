const https = require('https');
const fs = require('fs');

let chars = new Set();
let membersMap = new Set();
let results = [];

function fetchPage(title) {
    return new Promise((resolve) => {
        let url = `https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=size&titles=${encodeURIComponent(title)}&format=json`;
        https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, r => {
            let d = ''; r.on('data', c=>d+=c);
            r.on('end', () => {
                try {
                    let js = JSON.parse(d);
                    let pages = js.query.pages;
                    for (let p in pages) {
                        if (pages[p].revisions) {
                            results.push({
                                title: pages[p].title,
                                length: pages[p].revisions[0].size
                            });
                        }
                    }
                } catch(e) {}
                resolve();
            });
        }).on('error', () => resolve());
    });
}

function getCategoryMembers(catTitle, depth = 0) {
    return new Promise((resolve) => {
        if (depth > 3) { resolve(); return; } // prevent infinite recursion
        if (membersMap.has(catTitle)) { resolve(); return; }
        membersMap.add(catTitle);
        
        console.log("Fetching: " + catTitle);
        let members = [];
        
        function fetchCatPage(cmcontinue='') {
            let url = `https://fallout.fandom.com/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(catTitle)}&cmlimit=500&format=json`;
            if (cmcontinue) url += '&cmcontinue=' + encodeURIComponent(cmcontinue);
            
            https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, r => {
                let d = ''; r.on('data', c=>d+=c);
                r.on('end', async () => {
                    try {
                        let js = JSON.parse(d);
                        if (js.query && js.query.categorymembers) {
                            for (let m of js.query.categorymembers) {
                                if (m.ns === 0) { // Page
                                    chars.add(m.title);
                                } else if (m.ns === 14) { // Subcategory
                                    if (!m.title.toLowerCase().match(/images|mentioned-only|cut|test cell/)) {
                                        members.push(m.title);
                                    }
                                }
                            }
                        }
                        if (js.continue && js.continue.cmcontinue) {
                            fetchCatPage(js.continue.cmcontinue);
                        } else {
                            for (let sub of members) {
                                await getCategoryMembers(sub, depth + 1);
                            }
                            resolve();
                        }
                    } catch(e) { resolve(); }
                });
            }).on('error', () => resolve());
        }
        fetchCatPage();
    });
}

async function run() {
    await getCategoryMembers('Category:Fallout_4_locations');
    
    console.log(`Found ${chars.size} FO4 locations in total.`);
    let arr = Array.from(chars);
    
    // Batch fetch sizes 50 at a time
    for (let i = 0; i < arr.length; i += 50) {
        let chunk = arr.slice(i, i + 50);
        await Promise.all(chunk.map(c => fetchPage(c)));
        console.log(`Fetched sizes for ${Math.min(i + 50, arr.length)} locations...`);
        await new Promise(r => setTimeout(r, 100)); // anti rate-limit
    }
    
    results.sort((a, b) => b.length - a.length);
    fs.writeFileSync('F:/Fallout/_fo4_locations_ranked.json', JSON.stringify(results, null, 4), 'utf8');
    console.log('Done! Written to _fo4_locations_ranked.json');
}

run();
