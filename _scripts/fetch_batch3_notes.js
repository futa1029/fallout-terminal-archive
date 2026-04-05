const fs = require('fs');
const https = require('https');

const titles = [
  "The Core terminal entries",
  "Lou's goodbye note",
  "A lead at last",
  "Hornwright Estate terminal entries",
  "Charleston Herald - Tragedy Hits Hornwright",
  "RSVP card",
  "Hornwright Industrial notice",
  "Safe room checklist",
  "Sacramental Glade",
  "A blessed gift",
  "A worthy sacrifice"
];

async function fetchFandomAPI(params) {
  const url = new URL('https://fallout.fandom.com/api.php');
  params.format = 'json';
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  const results = {};
  for (const title of titles) {
    console.log(`Fetching data for ${title}...`);
    try {
      // wikitext
      const contentRes = await fetchFandomAPI({
        action: 'query',
        prop: 'revisions',
        rvprop: 'content',
        rvslots: 'main',
        titles: title
      });
      
      const pages = contentRes.query.pages;
      const pageId = Object.keys(pages)[0];
      
      let wikitext = '';
      if (pageId !== '-1' && pages[pageId].revisions) {
         wikitext = pages[pageId].revisions[0].slots.main['*'];
      }
      
      // images
      let images = [];
      let imgRes = await fetchFandomAPI({
        action: 'query',
        prop: 'images',
        titles: title,
        imlimit: 50
      });
      
      if (imgRes.query && imgRes.query.pages) {
         const pid = Object.keys(imgRes.query.pages)[0];
         if (pid !== '-1' && imgRes.query.pages[pid].images) {
             images = imgRes.query.pages[pid].images.map(img => img.title.replace('File:', ''));
         }
      }
      
      results[title] = { wikitext, images };
    } catch (e) {
      console.error(`Error fetching ${title}:`, e);
    }
  }
  
  fs.writeFileSync('f:/Fallout/_wikitext_batch3_notes.json', JSON.stringify(results, null, 2));
  console.log("Done. Saved to _wikitext_batch3_notes.json");
}

main();
