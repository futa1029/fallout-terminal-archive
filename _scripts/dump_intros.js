const fs = require('fs');
const files = [
  'athena.html', 'autumn-acre-cabin.html', 'buds_full.html', 
  'commie-kazi.html', 'commissioner-chaos.html', 'cynnoc.html', 
  'dr-brainwash.html', 'joey-bello.html', 'manta-man.html', 
  'mechanist.html', 'moe-the-mole.html', 'poseidonet.html'
];
files.forEach(f => {
  const txt = fs.readFileSync('f:/Fallout/' + f, 'utf8');
  const match = txt.match(/<div class="(wiki-content|page-content|main-content|content)">([\s\S]*?)<\/p>/);
  console.log('File:', f, '\nIntro:', match ? match[2].trim() : 'NOT FOUND', '\n---');
});
