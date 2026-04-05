const fs = require('fs');
const slugs = [
  'maximus-tv', 'norm-maclean', 'the-ghoul', 'betty-pearson', 'chet-tv', 'dane-tv', 'siggi-wilzig', 'barb-howard', 'thaddeus-tv', 'bud-askins', // batch 1
  'reg-mcphee', 'steph-harper', 'woody-thomas', 'veronica-tv', 'davey-tv', 'marianne-tv', 'lloyd-hawthorne', 'birdie-tv', 'cassandra-hawthorne', 'benjamin-tv', 'nose-edmundson', 'freed-ghoul-tv', 'snake-oil-salesman', 'ma-june', 'sorrel-booker', 'monty-tv', 'shortsight-tv', 'quintus-tv', 'titus-tv', 'felix-tv', 'george-yaffe', 'jorge-tv', 'charles-whiteknife', 'frederick-sinclair-tv', 'robert-house-tv', 'julia-masters', 'leon-von-felden' // batch 2
];

for (const slug of slugs) {
  try {
    const html = fs.readFileSync('f:/Fallout/' + slug + '.html', 'utf8');
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g,'') : 'NO TITLE';
    
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const body = bodyMatch ? bodyMatch[1] : '';
    const cleaned = body.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'');
    const text = cleaned.replace(/<[^>]+>/g,'').replace(/&[a-z]+;/g,' ');
    const jpn = (text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g) || []).length;
    
    // Check if main image exists
    const imgPath = 'f:/Fallout/images/note_extracted/' + slug + '/img_main.png';
    const imgExists = fs.existsSync(imgPath) ? 'YES' : 'NO ';
    
    console.log(`${slug.padEnd(25)} | img: ${imgExists} | jpn text len: ${jpn} | title: ${title}`);
  } catch(e) {
    console.log(`${slug.padEnd(25)} | ERROR: ${e.message}`);
  }
}
