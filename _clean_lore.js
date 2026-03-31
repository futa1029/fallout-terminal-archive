const fs = require('fs');
let html = fs.readFileSync('lore.html', 'utf8');

const updatedSlugs = [
  'west-charleston-bridge.html', 'clancy-manor.html', 'cultist-totem.html',
  'cow-spots-creamery.html', 'deathclaw-island.html', 'east-kanawha-lookout.html',
  'vault-tec-agricultural-research-center.html', 'flatwoods-lookout.html',
  'flatwoods-river.html', 'fujiniya-intelligence-base.html'
];

html = html.replace(/[\\s]*\\{\\s*'name':\\s*'Vault-Tec農業研究センター',\\s*'yomi':\\s*'vault-tec農業研究センター',\\s*'url':\\s*'vault-tec-agricultural-research\\.html',[\\s\\S]*?\\},/g, '');

for (const slug of updatedSlugs) {
    const sr = slug.replace('.', '\\\\.');
    const r1 = new RegExp("('url':\\s*'" + sr + "',[\\\\s\\\\S]*?)'isDraft':\\s*true,?(\\\\s*})", 'g');
    html = html.replace(r1, "$1$2");
    
    // remove trailing comma left over
    const r2 = new RegExp("('url':\\s*'" + sr + "',[\\\\s\\\\S]*?),(\\\\s*})", 'g');
    html = html.replace(r2, "$1$2");
}

fs.writeFileSync('lore.html', html, 'utf8');
console.log('Fixed.');
