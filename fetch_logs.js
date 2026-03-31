const fs = require('fs');

async function fetchWikiWikitext(title) {
  try {
    const res = await fetch('https://fallout.fandom.com/api.php?action=parse&page=' + encodeURIComponent(title) + '&prop=wikitext&format=json');
    const d = await res.json();
    if(d.parse && d.parse.wikitext) {
       let t = d.parse.wikitext['*'];
       // match {{Transcript|text=...}} OR {{Transcript|...}}
       // We use a regex that matches starting from {{Transcript| up to the closing }} 
       // We need to handle nested braces or just do a simple search
       const startIdx = t.indexOf('{{Transcript|');
       if (startIdx !== -1) {
           let braceCount = 2; // we matched {{
           let endIdx = -1;
           for(let i = startIdx + 13; i < t.length; i++) {
               if(t[i] === '{' && t[i+1] === '{') {
                   braceCount += 2;
                   i++;
               } else if(t[i] === '}' && t[i+1] === '}') {
                   braceCount -= 2;
                   if (braceCount === 0) {
                       endIdx = i + 1;
                       break;
                   }
                   i++;
               }
           }
           if (endIdx !== -1) {
               let transcript = t.substring(startIdx + 13, endIdx - 1); // skip outer {{ }}
               // remove "text=" if starts with it
               if (transcript.startsWith('text=')) {
                   transcript = transcript.substring(5);
               }
               // remove wikitext link wrappers
               transcript = transcript.replace(/\[\[(?:[^\]|]+\|)?([^\]]+)\]\]/g, '$1');
               return transcript.trim();
           }
       }
       return 'Could not parse transcript.'
    }
  } catch (e) {
    console.error(e);
  }
  return '';
}

async function run() {
  const titles = [
    "Overseer's log - Vault 76", "Overseer's log - C.A.M.P.", "Overseer's log - Flatwoods",
    "Overseer's log - Morgantown", "Overseer's log - Firehouse", "Overseer's log - Top of the World",
    "Overseer's log - Free States", "Overseer's log - Camp Venture", "Overseer's log - Allegheny",
    "Overseer's log - McClintock", "Overseer's log - Charleston", "Overseer's log - Fort Defiance",
    "Overseer's log - Grafton", "Overseer's log - Site Alpha", "Overseer's log - Site Bravo",
    "Overseer's log - Site Charlie", "Overseer's log - Nuke launch", "Overseer's log - Mountainside",
    "Overseer's journal, entry 1", "Overseer's journal, entry 2", "Overseer's journal, entry 3",
    "Overseer's journal, entry 4", "Overseer's journal, entry 5", "Overseer's journal, entry 6",
    "Overseer's broadcast"
  ];
  const out = {};
  for (const title of titles) {
     out[title] = await fetchWikiWikitext(title);
  }
  fs.writeFileSync('f:/Fallout/tmp_overseer_logs.json', JSON.stringify(out, null, 2));
  console.log('Done mapping logs');
}
run();
