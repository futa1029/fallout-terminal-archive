const fs = require('fs');

let html = fs.readFileSync('lore.html', 'utf8');
const start = html.indexOf('const loreEntries = [');
const end = html.indexOf('];', start) + 1;
const entriesStr = html.substring(start + 20, end);
let entries = eval(entriesStr);

const updatedSlugs = [
  'west-charleston-bridge.html', 'clancy-manor.html', 'cultist-totem.html',
  'cow-spots-creamery.html', 'deathclaw-island.html', 'east-kanawha-lookout.html',
  'vault-tec-agricultural-research-center.html', 'flatwoods-lookout.html',
  'flatwoods-river.html', 'fujiniya-intelligence-base.html'
];

let newEntries = [];
for (let e of entries) {
    if (e.url === 'vault-tec-agricultural-research.html') continue;
    if (updatedSlugs.includes(e.url)) {
        delete e.isDraft;
    }
    newEntries.push(e);
}

let newEntriesStr = '[\\n';
for (let i = 0; i < newEntries.length; i++) {
    const e = newEntries[i];
    let attrs = Object.keys(e).map(k => {
        if (k === 'appearance') {
            return \"    '\" + k + \"': \" + JSON.stringify(e[k]).replace(/\"/g, \"'\");
        } else if (k === 'isDraft') {
            return \"    '\" + k + \"': \" + e[k];
        } else {
            return \"    '\" + k + \"': '\" + e[k].replace(/'/g, \"\\\\'\") + \"'\";
        }
    });
    newEntriesStr += '  {\\n' + attrs.join(',\\n') + '\\n  }' + (i<newEntries.length-1 ? ',' : '') + '\\n';
}
newEntriesStr += ']';

html = html.substring(0, start + 20) + newEntriesStr + html.substring(end);
fs.writeFileSync('lore.html', html, 'utf8');
console.log('Fixed lore.html accurately');
