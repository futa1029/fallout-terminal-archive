// クリーチャー記事の画像一括再取得スクリプト
const fs = require('fs');
const path = require('path');
const https = require('https');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function getImageUrl(filename) {
  return new Promise((resolve) => {
    const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'FalloutLoreArchive/1.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          const page = Object.values(j.query.pages)[0];
          resolve(page.imageinfo?.[0]?.url || null);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    const mod = url.startsWith('https') ? https : require('http');
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) { resolve(false); return; }
      const ws = fs.createWriteStream(filepath);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(true); });
      ws.on('error', reject);
    }).on('error', reject);
  });
}

// Wikiのinfobox画像ファイル名（スペース→アンダースコア変換済み）
const imagesToFetch = [
  { slug: 'feral-ghoul-fo76', wikiFile: 'FO76_Feral_ghoul.png' },
  { slug: 'grafton-monster', wikiFile: 'Grafton_monster.jpg' },
  { slug: 'radscorpion-fo76', wikiFile: 'Radscorpion01.png' },
  { slug: 'snallygaster-fo76', wikiFile: 'Fallout76_Tales_Snallygaster.png' },
  { slug: 'yao-guai-fo76', wikiFile: 'FO4_Yao_guai.png' },
  { slug: 'the-interloper', wikiFile: 'The_Interloper.png' },
  { slug: 'ultracite-titan', wikiFile: 'Ultracite_Titan_Clear.png' },
  { slug: 'honey-beast-fo76', wikiFile: 'FO76_Honey_beast.png' },
  { slug: 'mega-sloth-fo76', wikiFile: 'Fallout76_E3_Megasloth.jpg' },
  { slug: 'fog-crawler-fo76', wikiFile: 'Fo4-FH-FogCrawler.png' },
  { slug: 'floater-fo76', wikiFile: 'FO76WL_Floater_gnasher_transparent.png' },
  { slug: 'gulper-fo76', wikiFile: 'FO76_creature_gulper01.webp' },
  { slug: 'hermit-crab-fo76', wikiFile: 'Hermit_crab.webp' },
  { slug: 'mirelurk-hunter-fo76', wikiFile: 'FO76_creature_mirelurkhunter.png' },
  { slug: 'mirelurk-king-fo76', wikiFile: 'FO4_Mirelurk_king_transparent.png' },
  { slug: 'mirelurk-queen-fo76', wikiFile: 'FO76_creature_mirelurk_queen.webp' },
  { slug: 'mole-rat-fo76', wikiFile: 'FO76_creature_molerat_01.webp' },
  { slug: 'mongrel-fo76', wikiFile: 'FO4_Mongrel_dog.png' },
  { slug: 'mutant-hound-fo76', wikiFile: 'FO4_Mutant_hound.png' },
  { slug: 'radroach-fo76', wikiFile: 'FO76_Radroach.png' },
  { slug: 'radstag-fo76', wikiFile: 'Fo4-radstag.png' },
  { slug: 'stingwing-fo76', wikiFile: 'Fo4_stingwing_transparent.png' },
  { slug: 'radhog-fo76', wikiFile: 'FO76BS_Burning_Springs_promo-15.jpg' },
  { slug: 'radrat-fo76', wikiFile: 'FO4NW_Rad-rat.png' },
  { slug: 'strangler-heart-fo76', wikiFile: 'Fo76_strangler_heart.png' },
  { slug: 'super-mutant-behemoth-fo76', wikiFile: 'FO76_Behemoth.png' },
  { slug: 'ultracite-terror-fo76', wikiFile: 'FO76GD_Gleaming_Depths_cobra_boss_preview_01.png' },
  { slug: 'visitor-fo76', wikiFile: 'Fo76WL_The_Visitor.png' },
  { slug: 'mirelurk-spawn-fo76', wikiFile: 'FO4_Mirelurk_Hatchling.png' },
  { slug: 'fish-fo76', wikiFile: 'FO76_Fish_racks_2.png' },
  { slug: 'dolphish-fo76', wikiFile: 'FO76AC_Whale_aquarium_render.png' },
  { slug: 'fly-fo76', wikiFile: 'Fly.png' },
  { slug: 'fox-fo76', wikiFile: 'FO76_fox.png' },
  { slug: 'frog-fo76', wikiFile: 'Fallout_76_Frog.png' },
  { slug: 'iguana-fo76', wikiFile: 'Iguana_on_a_stick_fo4.png' },
  { slug: 'leech-fo76', wikiFile: 'Leech.jpg' },
  { slug: 'opossum-fo76', wikiFile: 'Opossum76.png' },
  { slug: 'owlet-fo76', wikiFile: 'FO76_Owl.png' },
  { slug: 'wolf-fo76', wikiFile: 'Fo76_Wolf.png' },
];

async function main() {
  let success = 0, fail = 0;
  for (const item of imagesToFetch) {
    const imgDir = `F:/Fallout/images/note_extracted/${item.slug}`;
    const destPath = path.join(imgDir, 'img_main.png');

    // 既に有効な画像がある場合はスキップ
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      console.log(`⏭️ ${item.slug}: 既に存在`);
      success++;
      continue;
    }

    await sleep(300);
    console.log(`📥 ${item.slug}: ${item.wikiFile}`);
    const url = await getImageUrl(item.wikiFile);
    if (url) {
      const ok = await downloadImage(url, destPath);
      if (ok) {
        const size = fs.statSync(destPath).size;
        console.log(`  ✅ DL完了 (${(size/1024).toFixed(1)}KB)`);
        // X投稿用画像もコピー
        const xImgDir = `F:/Fallout/_X/${item.slug}/images`;
        if (fs.existsSync(xImgDir)) {
          fs.copyFileSync(destPath, path.join(xImgDir, '1.png'));
        }
        success++;
      } else {
        console.log(`  ❌ DL失敗 (HTTPエラー)`);
        fail++;
      }
    } else {
      console.log(`  ❌ URL取得失敗`);
      fail++;
    }
  }
  console.log(`\n✅ 成功: ${success}件, ❌ 失敗: ${fail}件`);
}

main().catch(e => console.error('エラー:', e));
