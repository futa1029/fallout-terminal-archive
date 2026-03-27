// Phase 1: 全クリーチャーのWikiデータ一括取得（レート制限対応版）
const fs = require('fs');
const https = require('https');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'FalloutLoreArchive/1.0' } }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve(null); } });
    }).on('error', () => resolve(null));
  });
}

async function fetchWikitext(title) {
  const url = `https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext|images&format=json`;
  const r = await fetchJson(url);
  if (!r || !r.parse) return null;
  return { wikitext: r.parse.wikitext?.['*'] || '', images: r.parse.images || [] };
}

const creatures = [
  'Aliens', 'Dolphish (Fallout 76)', 'Feral ghoul (Fallout 76)', 'Firefly',
  'Floater (Fallout 76)', 'Fly', 'Fog crawler (Fallout 76)', 'Fox', 'Frog',
  'Grafton Monster', 'Gulper (Fallout 76)', 'Hermit crab (Fallout 76)', 'Honey beast',
  'Iguana', 'Leech', 'Mega sloth', 'Mirelurk (Fallout 76)', 'Mirelurk hunter (Fallout 76)',
  'Mirelurk king (Fallout 76)', 'Mirelurk queen (Fallout 76)', 'Mirelurk spawn (Fallout 76)',
  'Mole rat (Fallout 76)', 'Mongrel (Fallout 76)', 'Mutant hound (Fallout 76)',
  'Opossum', 'Owl', 'Owlet', 'Rabbit', 'Radhog (Fallout 76)', 'Radrat (Fallout 76)',
  'Radroach (Fallout 76)', 'Radscorpion (Fallout 76)', 'Radstag (Fallout 76)',
  'Radtoad (Fallout 76)', 'Scorchbeast', 'Scorchbeast queen', 'Snallygaster',
  'Squirrel (Fallout 76)', 'Stingwing (Fallout 76)', 'Strangler heart',
  'Super mutant behemoth (Fallout 76)', 'The Interloper', 'Tick',
  'Ultracite Terror', 'Ultracite Titan', 'Visitor',
  'Vulture (Fallout 76)', 'Wendigo colossus', 'Wise Mothman',
  'Wolf (Fallout 76)', 'Yao guai (Fallout 76)', 'Fish (Fallout 76)',
];

async function main() {
  // 既存データがあればロード（レジューム用）
  let results = {};
  const outPath = 'F:/Fallout/_creatures_wiki_data.json';
  if (fs.existsSync(outPath)) {
    try { results = JSON.parse(fs.readFileSync(outPath, 'utf8')); } catch(e) {}
  }

  let done = Object.keys(results).length;
  console.log(`既存データ: ${done}件 → 残り${creatures.length - done}件を取得`);

  for (const title of creatures) {
    if (results[title]) { continue; } // 既に取得済み
    await sleep(300); // レート制限回避
    const data = await fetchWikitext(title);
    if (data) {
      results[title] = data;
      done++;
      console.log(`[${done}/${creatures.length}] ✅ ${title} (${data.wikitext.length}c, ${data.images.length}img)`);
      // 10件ごとに中間保存
      if (done % 10 === 0) {
        fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
      }
    } else {
      console.log(`[${done}/${creatures.length}] ❌ ${title}`);
    }
  }
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n✅ 全${done}/${creatures.length}件のデータを保存しました`);
}

main().catch(e => console.error('エラー:', e));
