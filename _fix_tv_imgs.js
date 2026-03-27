// 画像取得失敗分の修正 + インデックス登録
const fs = require('fs');
const path = require('path');
const https = require('https');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getImageUrl(fn) { return new Promise((resolve) => { const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(fn)}&prop=imageinfo&iiprop=url&format=json`; https.get(url, { headers: { 'User-Agent': 'FalloutLoreArchive/1.0' } }, (res) => { let d = ''; res.on('data', c => d += c); res.on('end', () => { try { const j = JSON.parse(d); const p = Object.values(j.query.pages)[0]; resolve(p.imageinfo?.[0]?.url || null); } catch(e) { resolve(null); } }); }).on('error', () => resolve(null)); }); }
function downloadImage(url, fp) { return new Promise((resolve, reject) => { fs.mkdirSync(path.dirname(fp), { recursive: true }); const mod = url.startsWith('https') ? https : require('http'); mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => { if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) { downloadImage(res.headers.location, fp).then(resolve).catch(reject); return; } if (res.statusCode !== 200) { resolve(false); return; } const ws = fs.createWriteStream(fp); res.pipe(ws); ws.on('finish', () => { ws.close(); resolve(true); }); ws.on('error', reject); }).on('error', reject); }); }

const fixes = [
  { slug: 'snake-oil-salesman', wikiFile: 'FOTV_Snake_Oil_Salesman.png', fallback: 'FOTV_S2E3_Thaddeus_infobox.png' },
  { slug: 'frederick-sinclair-tv', wikiFile: 'FOTV_S1E8_Frederick_Sinclair.png', fallback: 'Sierra_Madre.jpg' },
];

async function main() {
  const wikiData = JSON.parse(fs.readFileSync('F:/Fallout/_tv_cast_wiki_data.json', 'utf8'));

  for (const fix of fixes) {
    const imgDir = `F:/Fallout/images/note_extracted/${fix.slug}`;
    fs.mkdirSync(imgDir, { recursive: true });
    const dest = path.join(imgDir, 'img_main.png');

    // Wikiデータから画像候補を探す
    const data = wikiData[fix.slug === 'snake-oil-salesman' ? 'Snake oil salesman' : 'Frederick Sinclair'];
    let candidates = [];
    if (data) {
      candidates = data.images.filter(img =>
        !img.includes('Icon_') && !img.includes('Gametitle') &&
        !img.includes('Bugintro') && !img.includes('Mbox_') &&
        !img.includes('icon')
      );
    }
    console.log(`${fix.slug}: 候補画像 = ${candidates.slice(0, 5).join(', ')}`);

    let downloaded = false;
    // まず候補画像を試す
    for (const candidate of candidates.slice(0, 3)) {
      await sleep(300);
      const url = await getImageUrl(candidate);
      if (url) {
        const ok = await downloadImage(url, dest);
        if (ok && fs.statSync(dest).size > 1000) {
          console.log(`  ✅ DL成功: ${candidate}`);
          downloaded = true;
          break;
        }
      }
    }

    if (!downloaded) {
      // フォールバック画像を試す
      await sleep(300);
      const url = await getImageUrl(fix.wikiFile);
      if (url) {
        const ok = await downloadImage(url, dest);
        if (ok) { console.log(`  ✅ フォールバックDL: ${fix.wikiFile}`); downloaded = true; }
      }
    }

    if (!downloaded) {
      await sleep(300);
      const url = await getImageUrl(fix.fallback);
      if (url) {
        const ok = await downloadImage(url, dest);
        if (ok) { console.log(`  ✅ 最終フォールバックDL: ${fix.fallback}`); downloaded = true; }
      }
    }

    if (downloaded) {
      // X素材にもコピー
      const xImgDir = `F:/Fallout/_X/${fix.slug}/images`;
      if (fs.existsSync(xImgDir)) {
        fs.copyFileSync(dest, path.join(xImgDir, '1.png'));
      }
    } else {
      console.log(`  ❌ 全て失敗`);
    }
  }
}
main().catch(e => console.error('エラー:', e));
