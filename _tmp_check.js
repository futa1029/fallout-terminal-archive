const fs = require('fs');
['ghoul.html','lee_moldaver.html'].forEach(f => {
  const c = fs.readFileSync('F:/Fallout/' + f, 'utf8');
  const title = c.match(/<title>(.*?)<\/title>/);
  const cat = c.match(/data-article-category="(.*?)"/);
  console.log(f + ': title=' + (title?.[1]||'N/A') + ' cat=' + (cat?.[1]||'N/A'));
});
