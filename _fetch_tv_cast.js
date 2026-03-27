// Fallout TVシリーズ キャスト全キャラクターのWikiデータ取得
const fs = require('fs');
const https = require('https');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchWikitext(title) {
  return new Promise((resolve) => {
    const url = `https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext|images&format=json`;
    https.get(url, { headers: { 'User-Agent': 'FalloutLoreArchive/1.0' } }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          if (j.error) { resolve(null); return; }
          resolve({
            wikitext: j.parse.wikitext['*'],
            images: j.parse.images || []
          });
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

// 全キャラクターリスト（WikiのページタイトルとSlug）
const characters = [
  // メインキャラクター
  { wikiTitle: 'Maximus', slug: 'maximus-tv', isMain: true },
  { wikiTitle: 'Norm MacLean', slug: 'norm-maclean', isMain: true },
  { wikiTitle: 'The Ghoul', slug: 'the-ghoul', isMain: true },
  // サポートキャラクター
  { wikiTitle: 'Betty Pearson', slug: 'betty-pearson', isMain: false },
  { wikiTitle: 'Chet (TV series)', slug: 'chet-tv', isMain: false },
  { wikiTitle: 'Dane (TV series)', slug: 'dane-tv', isMain: false },
  { wikiTitle: 'Siggi Wilzig', slug: 'siggi-wilzig', isMain: false },
  { wikiTitle: 'Barb Howard', slug: 'barb-howard', isMain: false },
  { wikiTitle: 'Thaddeus', slug: 'thaddeus-tv', isMain: false },
  // Vault 33
  { wikiTitle: 'Reg McPhee', slug: 'reg-mcphee', isMain: false },
  { wikiTitle: 'Steph Harper', slug: 'steph-harper', isMain: false },
  { wikiTitle: 'Woody Thomas', slug: 'woody-thomas', isMain: false },
  { wikiTitle: 'Veronica (TV series)', slug: 'veronica-tv', isMain: false },
  { wikiTitle: 'Davey (TV series)', slug: 'davey-tv', isMain: false },
  { wikiTitle: 'Marianne (TV series)', slug: 'marianne-tv', isMain: false },
  // Vault 4
  { wikiTitle: 'Lloyd Hawthorne', slug: 'lloyd-hawthorne', isMain: false },
  { wikiTitle: 'Birdie', slug: 'birdie-tv', isMain: false },
  { wikiTitle: 'Cassandra Hawthorne', slug: 'cassandra-hawthorne', isMain: false },
  { wikiTitle: 'Benjamin (TV series)', slug: 'benjamin-tv', isMain: false },
  { wikiTitle: 'Nose Edmundson', slug: 'nose-edmundson', isMain: false },
  // Wastelanders
  { wikiTitle: 'Freed ghoul', slug: 'freed-ghoul-tv', isMain: false },
  { wikiTitle: 'Snake oil salesman', slug: 'snake-oil-salesman', isMain: false },
  { wikiTitle: 'Ma June', slug: 'ma-june', isMain: false },
  { wikiTitle: 'Sorrel Booker', slug: 'sorrel-booker', isMain: false },
  { wikiTitle: 'Monty (TV series)', slug: 'monty-tv', isMain: false },
  // Brotherhood of Steel
  { wikiTitle: 'Shortsight', slug: 'shortsight-tv', isMain: false },
  { wikiTitle: 'Quintus', slug: 'quintus-tv', isMain: false },
  { wikiTitle: 'Titus', slug: 'titus-tv', isMain: false },
  { wikiTitle: 'Felix (TV series)', slug: 'felix-tv', isMain: false },
  // Pre-War
  { wikiTitle: 'George Yaffe', slug: 'george-yaffe', isMain: false },
  { wikiTitle: 'Bud Askins', slug: 'bud-askins', isMain: false },
  { wikiTitle: 'Jorge', slug: 'jorge-tv', isMain: false },
  { wikiTitle: 'Charles Whiteknife', slug: 'charles-whiteknife', isMain: false },
  { wikiTitle: 'Frederick Sinclair', slug: 'frederick-sinclair-tv', isMain: false },
  { wikiTitle: 'Robert House', slug: 'robert-house-tv', isMain: false },
  { wikiTitle: 'Julia Masters', slug: 'julia-masters', isMain: false },
  { wikiTitle: 'Leon Von Felden', slug: 'leon-von-felden', isMain: false },
];

async function main() {
  const outputPath = 'F:/Fallout/_tv_cast_wiki_data.json';
  let data = {};
  if (fs.existsSync(outputPath)) {
    data = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  }

  const remaining = characters.filter(c => !data[c.wikiTitle]);
  console.log(`既存データ: ${Object.keys(data).length}件 → 残り${remaining.length}件を取得`);

  for (let i = 0; i < remaining.length; i++) {
    const c = remaining[i];
    await sleep(300);
    const result = await fetchWikitext(c.wikiTitle);
    if (result) {
      data[c.wikiTitle] = {
        slug: c.slug,
        isMain: c.isMain,
        wikitext: result.wikitext,
        images: result.images
      };
      console.log(`[${i+1}/${remaining.length}] ✅ ${c.wikiTitle} (${result.wikitext.length}c, ${result.images.length}img)`);
    } else {
      console.log(`[${i+1}/${remaining.length}] ❌ ${c.wikiTitle} (取得失敗)`);
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n✅ 全${Object.keys(data).length}/${characters.length}件のデータを保存しました`);
}

main().catch(e => console.error('エラー:', e));
