const fs = require('fs');
const data = JSON.parse(fs.readFileSync('F:/Fallout/_fo4_locations_ranked.json', 'utf8'));

const fh_locs = data.filter(d => 
    !d.title.match(/characters|merchants|concept art|gameplay|test cell|images|songs/i) && 
    (
        d.title.includes('Acadia') || 
        d.title.includes('Island') ||
        d.title.includes('Dalton') ||
        d.title.includes('National Park') ||
        d.title.includes('Echo Lake') ||
        d.title.includes('Kiddie') ||
        d.title.includes('Drive-in') ||
        d.title.includes('Bowling')
    )
).map(d => d.title);

console.log(fh_locs.slice(0, 30));
