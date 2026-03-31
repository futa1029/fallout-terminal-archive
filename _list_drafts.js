const fs = require('fs');
const https = require('https');

function fetchCategory(category) {
  return new Promise((resolve, reject) => {
    let allPages = [];
    function fetchPage(cmcontinue = '') {
      let url = `https://fallout.fandom.com/api.php?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(category)}&cmlimit=500&format=json`;
      if (cmcontinue) url += `&cmcontinue=${cmcontinue}`;
      https.get(url, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if(json.query && json.query.categorymembers) {
                allPages = allPages.concat(json.query.categorymembers);
            }
            if (json.continue && json.continue.cmcontinue) {
              fetchPage(json.continue.cmcontinue);
            } else {
              resolve(allPages);
            }
          } catch(e) { reject(e); }
        });
      }).on('error', reject);
    }
    fetchPage();
  });
}

function normalizeTitle(title) {
  return title.toLowerCase().replace(/[\s\(\)]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

async function main() {
    const h = fs.readFileSync('lore.html', 'utf8');
    const start = h.indexOf('const loreEntries = [');
    const end = h.indexOf('];', start);
    const entries = eval(h.substring(start + 'const loreEntries = '.length, end + 1));
    const draftEntries = entries.filter(e => e.isDraft);

    console.log(`Total Drafts in lore.html: ${draftEntries.length}`);

    // Get Forest Locations from Wiki
    let forestLocs = await fetchCategory('The_Forest_locations');
    let slugs = forestLocs.map(l => normalizeTitle(l.title));

    // Find intersect
    let locDrafts = draftEntries.filter(d => slugs.includes(d.url.replace('.html', '')));
    
    console.log(`Forest Location Drafts: ${locDrafts.length}`);
    if(locDrafts.length > 0) {
        locDrafts.slice(0, 10).forEach(d => console.log(`  - ${d.name} (${d.url})`));
    }

    // Characters in the Forest
    let charDrafts = draftEntries.filter(d => d.category === '人物');
    console.log(`Total Character Drafts: ${charDrafts.length}`);
    
    // Save state
    const forestDraftList = locDrafts.map(d => ({ title: d.name, slug: d.url.replace('.html', ''), isChar: false }));
    fs.writeFileSync('drafts_forest.json', JSON.stringify(forestDraftList, null, 2), 'utf8');
    
    // Character Drafts
    fs.writeFileSync('drafts_chars.json', JSON.stringify(charDrafts.map(d => ({ title: d.name, slug: d.url.replace('.html', ''), isChar: true })), null, 2), 'utf8');
}
main().catch(console.error);
