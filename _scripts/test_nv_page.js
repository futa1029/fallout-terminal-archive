const fs = require('fs');

fetch('https://fallout.fandom.com/api.php?action=parse&page=Fallout:_New_Vegas_characters&prop=links&format=json')
  .then(res => res.json())
  .then(data => {
      const links = data.parse.links.filter(l => l.ns === 0).map(l => l['*']);
      console.log(`Found ${links.length} links on the page.`);
      fs.writeFileSync('f:/Fallout/_scripts/nv_page_links.json', JSON.stringify(links, null, 2));
  })
  .catch(err => console.error(err));
