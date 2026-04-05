const fs = require('fs');
const files = [
  'chem-hoop-shack.html', 'janelles-camp.html', 'river-treehouse.html',
  'shenandoah-river.html', 'soggy-bottom.html', 'south-mountain-lookout.html',
  'south-mountain-nuke-crater.html', 'stuarts-department-store.html',
  'super-duper-mart-morgantown.html', 'surlys-shack.html', 'the-pigsty.html',
  'under-the-i-65-bridge.html', 'unfinished-mansion.html', 'watoga-real-estate.html'
];
const map = {};
for(const f of files) {
  const content = fs.readFileSync('f:/Fallout/'+f, 'utf8');
  let name = (content.match(/<h1>(.*?)<br>/) || [])[1] || f.replace('.html','');
  let engText = '';
  const pMatches = content.match(/<p>.*?<\/p>/gs) || [];
  engText = pMatches.filter(p => !p.includes('はアパラチア') && !p.includes('This article was created by') && p.length > 100).join('\n').replace(/<\/?[^>]+(>|$)/g, "");
  
  map[f] = { name: name.trim(), text: engText.trim() };
}
fs.writeFileSync('f:/Fallout/tmp_14_eng.json', JSON.stringify(map, null, 2));
console.log('Extraction complete');
