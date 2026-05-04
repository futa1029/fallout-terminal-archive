const https = require('https');
const fs = require('fs');

function fetchWiki(page) {
  return new Promise((resolve, reject) => {
    const url = `https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(page)}&prop=wikitext&format=json`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.parse ? json.parse.wikitext['*'] : 'ERROR: NOT FOUND');
        } catch (e) {
          resolve('ERROR: PARSE FAILED');
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const pages = ["Courtney's note", "Things to remember", "Morris's end"];
  for (const page of pages) {
    const text = await fetchWiki(page);
    fs.writeFileSync(`_src_${page.replace(/[\/\s']/g, '')}.txt`, text, 'utf8');
  }

  const allNotes = ["Gourmandsnote", "Ediesnote", "BoltonGreensterminalentries", "Courtneysnote", "Thingstoremember", "Morrissend"];
  for (const note of allNotes) {
    if(fs.existsSync('_src_' + note + '.txt')) {
      console.log('\n--- ' + note + ' ---');
      console.log(fs.readFileSync('_src_' + note + '.txt', 'utf8').substring(0, 1000));
    }
  }
}
run();
