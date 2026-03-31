const fs = require('fs');
let html = fs.readFileSync('lore.html', 'utf8');

const updatedSlugs = [
  'west-charleston-bridge.html', 'clancy-manor.html', 'cultist-totem.html',
  'cow-spots-creamery.html', 'deathclaw-island.html', 'east-kanawha-lookout.html',
  'vault-tec-agricultural-research-center.html', 'flatwoods-lookout.html',
  'flatwoods-river.html', 'fujiniya-intelligence-base.html'
];

// Remove the whole vault-tec-agricultural-research.html block
const regexDup = /[\\s]*\\{\\n\\s*'name':\\s*'Vault-Tec農業研究センター',\\n\\s*'yomi':\\s*'vault-tec農業研究センター',\\n\\s*'url':\\s*'vault-tec-agricultural-research\\.html',[\\s\\S]*?\\},?/gm;
html = html.replace(regexDup, '');

// Strip isDraft: true for the 10 updated slugs
for (const slug of updatedSlugs) {
    const slugRegexEscaped = slug.replace('.', '\\\\.');
    const regexDraft = new RegExp(\"('url':\\s*'\" + slugRegexEscaped + \"',[\\\\s\\\\S]*?)'isDraft':\\s*true,?(\\\\s*})\", 'g');
    html = html.replace(regexDraft, \"$1$2\");
    
    // Fallback if there's a trailing comma before the end
    const regexDraftCom = new RegExp(\"('url':\\s*'\" + slugRegexEscaped + \"',[\\\\s\\\\S]*?),\\\\s*'isDraft':\\s*true(\\\\s*})\", 'g');
    html = html.replace(regexDraftCom, \"$1$2\");
}

fs.writeFileSync('lore.html', html, 'utf8');
console.log('lore.html fixed.');
