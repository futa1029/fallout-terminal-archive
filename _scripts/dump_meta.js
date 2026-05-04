const fs = require('fs');
const files = [
  'athena.html', 'autumn-acre-cabin.html', 'buds_full.html', 
  'commie-kazi.html', 'commissioner-chaos.html', 'cynnoc.html', 
  'dr-brainwash.html', 'joey-bello.html', 'manta-man.html', 
  'mechanist.html', 'moe-the-mole.html', 'poseidonet.html'
];
files.forEach(f => {
  const txt = fs.readFileSync('f:/Fallout/' + f, 'utf8');
  
  // Find href="https://fallout.fandom.com/wiki/XXXX" target="_blank"
  // Wait, if the link is broken like <a href=".../wiki/ケ">, maybe we just have to parse the Fandom JSON dump?
  // Let's print out the text where the link is
  const linkMatch = txt.match(/<a href="https:\/\/fallout\.fandom\.com\/wiki\/([^"]*)"/);
  
  const boldMatch = txt.match(/<p>[^<]*「?<b>(.*?)<\/b>.*?<\/p>/);
  
  // Try finding any large text block just to get a hint
  console.log(f, ':', linkMatch ? linkMatch[1] : 'NoLink', '| Bold:', boldMatch ? boldMatch[1] : 'NoBold');
});
