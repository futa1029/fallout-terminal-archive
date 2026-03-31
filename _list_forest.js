// 森林地帯（The Forest）のロケーションと関連人物を抽出するスクリプト
const fs = require('fs');
const h = fs.readFileSync('lore.html', 'utf8');
const arrStart = h.indexOf('const loreEntries = [');
const arrEnd = h.indexOf('];', arrStart);
const entries = eval(h.substring(arrStart + 'const loreEntries = '.length, arrEnd + 1));

const locs = [];
const chars = [];

entries.forEach(entry => {
  try {
    const c = fs.readFileSync(entry.url, 'utf8');
    
    // ロケーションの判定
    if (entry.category === '\u30ed\u30b1\u30fc\u30b7\u30e7\u30f3' || entry.category === '\u5834\u6240') {
      const regionMatch = c.match(/\u5730\u57df<\/span><span>([^<]+)/);
      const region = regionMatch ? regionMatch[1].trim() : '';
      if (region.includes('\u68ee\u6797\u5730\u5e2f') || region.includes('The Forest')) {
        locs.push({ name: entry.name, url: entry.url });
      } else if (!region) {
        // 地域が記載されていないが、WikiのWikitextを取得して判断すべき小さなロケーションもある
        // 今回のリストアップでは一旦スキップするか、手動で補完する
      }
    }
  } catch {}
});

console.log('--- Forest Locations ---');
console.log('Count:', locs.length);
locs.slice(0, 10).forEach(l => console.log(l.name, l.url));

// 関連人物の判定 (抽出されたロケーションに関連する人物)
const forestLocNames = locs.map(l => l.name);

entries.forEach(entry => {
  if (entry.category === '\u4eba\u7269') {
    try {
      const c = fs.readFileSync(entry.url, 'utf8');
      const locMatch = c.match(/\u5834\u6240<\/span><span>([^<]+)/);
      const locStr = locMatch ? locMatch[1].trim() : '';
      
      // 場所名が森林地帯のロケーションと一致・内包するかどうか
      let isForestChar = false;
      if (locStr) {
        for (const loc of forestLocNames) {
          if (locStr.includes(loc) || loc.includes(locStr)) {
            isForestChar = true;
            break;
          }
        }
        // 特殊な森林地帯の地名（手動追加）
        if (!isForestChar && (locStr.includes('\u30d5\u30e9\u30c3\u30c8\u30a6\u30c3\u30ba') || 
            locStr.includes('\u30dd\u30a4\u30f3\u30c8\u30fb\u30d7\u30ec\u30b6\u30f3\u30c8') ||
            locStr.includes('Vault 76') || locStr.includes('\u30e2\u30fc\u30ac\u30f3\u30bf\u30a6\u30f3') ||
            locStr.includes('\u30c1\u30e3\u30fc\u30eb\u30b9\u30c8\u30f3'))) {
           isForestChar = true;
        }
      }
      
      if (isForestChar) {
        chars.push({ name: entry.name, url: entry.url, loc: locStr });
      }
    } catch {}
  }
});

console.log('\n--- Forest Characters ---');
console.log('Count:', chars.length);
chars.slice(0, 10).forEach(c => console.log(c.name, c.url, '| Loc:', c.loc));
