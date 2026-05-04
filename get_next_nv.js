const fs = require('fs');
const data = JSON.parse(fs.readFileSync('F:/Fallout/_nv_character_links_ranked.json', 'utf8'));
const d = fs.readFileSync('F:/Fallout/remove_duplicates.js', 'utf8');

const completedLines = d.split('\n');
let currentName = '';
let currentCat = '';
const completed = [];

for (let i = 0; i < completedLines.length; i++) {
    if (completedLines[i].includes('name:')) {
        let m = completedLines[i].match(/name:\s*"(.*?)"/);
        if (m) currentName = m[1];
    }
    if (completedLines[i].includes('category:')) {
        let m = completedLines[i].match(/category:\s*"(.*?)"/);
        if (m) currentCat = m[1];
    }
    if (completedLines[i].includes('appearance:')) {
        let currentApps = completedLines[i];
        if (currentApps.includes('Fallout: New Vegas') && currentCat === '人物') {
            completed.push(currentName.toLowerCase());
        }
    }
}

// Manually mapping variations
completed.push('robert house', 'ulysses', 'caesar', 'joshua graham', 'arcade gannon', 'veronica santangelo', 'craig boone', 'benny', 'lanius', 'rose of sharon cassidy');
completed.push('doc mitchell', 'michael angelo', 'captain curtis', 'julie farkas', 'general lee oliver', 'muggy', 'the king', 'lily bowen', 'thomas hildern', 'vulpes inculta', 'dog and god', 'chief hanlon', 'ed-e', 'victor', 'cassandra moore', 'carrie boyd', 'yes man', 'aaron kimball', 'dr. henry', 'randall clark', 'daniel', 'mr. house', 'lee oliver', 'hanlon', 'christine royce', 'elijah', 'dean domino'); // Will check exact names

const skipList = [...completed];

const filtered = data.filter(d => 
    !d.title.match(/\.txt$/i) && 
    !d.title.match(/Mojave Wasteland|Freeside|Big MT|Westside|Hoover Dam|The Tops|Ultra-Luxe|Gomorrah|Vault |Camp Forlorn Hope|Jacobstown|Goodsprings|Primm|HELIOS One|Hidden Valley|Nellis|Camp McCarran|Hidden Valley bunker|Lucky 38|New Vegas Strip|Nipton|Atomic Wrangler Casino|Mojave Outpost|NCR Correctional Facility|Black Mountain|Camp Searchlight|Higgs Village|The Fort|Bitter Springs/i) &&
    !skipList.some(s => d.title.toLowerCase() === s) &&
    !d.title.toLowerCase().includes('you\'ll know it when it happens') &&
    !d.title.toLowerCase().includes('ghost town gunfight') &&
    !d.title.toLowerCase().includes('ring-a-ding-ding!') &&
    !d.title.toLowerCase().includes('arizona killer') &&
    !d.title.toLowerCase().includes('my kind of town')
); 

console.log(filtered.slice(0, 30).map(d => d.title).join('\n'));
