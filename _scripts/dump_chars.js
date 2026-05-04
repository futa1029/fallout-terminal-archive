const fs = require('fs');
const chars = [
  'adam__tv_series', 'arnold__galaxy_news_network', 'aspirant__tv_series',
  'bartender__los_angeles', 'bartender__lucky_38', 'bar_patron__tv_series',
  'benjamin__tv_series', 'bert__tv_series', 'biff__tv_series',
  'bill__tv_series', 'brotherhood_soldier__tv_series',
  'tommy__tv_series', 'troy__tv_series', 'trudy__tv_series'
];
let out = '';
chars.forEach(c => {
    const p = 'f:/Fallout/_drafts/' + c + '__raw.json';
    if(fs.existsSync(p)) {
        let d = JSON.parse(fs.readFileSync(p,'utf8'));
        out += '================ ' + c + ' ================\n\n';
        if(d.wikitext) {
            let clean = d.wikitext.replace(/<ref[^>]*>.*?<\/ref>/g, '').replace(/<ref[^>]*\/>/g, '');
            out += clean + '\n\n';
        }
    }
});
fs.writeFileSync('f:/Fallout/_scripts/remaining_14_wiki.txt', out, 'utf8');
