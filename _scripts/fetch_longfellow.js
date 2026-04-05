const fs = require('fs');
const dir = 'f:/Fallout/_drafts/longfellow';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fetch('https://fallout.fandom.com/api.php?action=query&prop=revisions&titles=Old_Longfellow&rvslots=main&rvprop=content&format=json')
  .then(res => res.json())
  .then(data => {
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const content = pages[pageId].revisions[0].slots.main['*'];
      
      const chunkSize = 15000;
      for (let i = 0; i < content.length; i += chunkSize) {
          const chunk = content.substring(i, i + chunkSize);
          const idx = String(Math.floor(i / chunkSize)).padStart(2, '0');
          fs.writeFileSync(`${dir}/ref_chunk_${idx}.txt`, chunk);
      }
      console.log('Saved ' + Math.ceil(content.length / chunkSize) + ' chunks for Old Longfellow.');
  })
  .catch(err => console.error(err));
