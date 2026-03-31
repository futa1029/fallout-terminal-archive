// クリーチャー記事バッチダウンロード＆HTML生成スクリプト
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function dl(url, dest) {
  return new Promise((ok, ng) => {
    if (fs.existsSync(dest)) { console.log('SKIP:', path.basename(dest)); ok(); return; }
    const mod = url.startsWith('https') ? https : http;
    const f = fs.createWriteStream(dest);
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      if (r.statusCode === 301 || r.statusCode === 302) { f.close(); try{fs.unlinkSync(dest);}catch(e){} dl(r.headers.location, dest).then(ok).catch(ng); return; }
      r.pipe(f); f.on('finish', () => { f.close(); console.log('OK:', path.basename(dest)); ok(); });
    }).on('error', (e) => { try{fs.unlinkSync(dest);}catch(e2){} ng(e); });
  });
}

async function downloadAll(slug, images) {
  const dir = `images/note_extracted/${slug}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  for (const img of images) {
    try { await dl(img.url, path.join(dir, img.name)); }
    catch (e) { console.error('FAIL:', img.name, e.message); }
  }
  console.log(`[${slug}] Downloaded: ${images.length} images`);
}

(async () => {
  // 1. Snallygaster
  await downloadAll('snallygaster-fo76', [
    {url:'https://static.wikia.nocookie.net/fallout/images/f/ff/Fallout76_Tales_Snallygaster.png/revision/latest?cb=20181002170449', name:'img_main.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/1/1a/Fetid_Snallygaster.png/revision/latest?cb=20210813204437', name:'img_fetid.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/c/c9/Bloodysnallygaster.png/revision/latest?cb=20201206172416', name:'img_bloody.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/c/ca/FO76_Glowing_Snallygaster.jpg/revision/latest?cb=20200729204548', name:'img_glowing.jpg'},
    {url:'https://static.wikia.nocookie.net/fallout/images/c/c3/Scorched_Snallygaster.png/revision/latest?cb=20210812133103', name:'img_scorched.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/e/ef/FO76-snallygaster-spawn-locations.jpeg/revision/latest?cb=20190623102506', name:'img_map.jpg'},
    {url:'https://static.wikia.nocookie.net/fallout/images/e/e0/FO76_Ben_Carnow_snallygaster_concept_art.jpg/revision/latest?cb=20200615212612', name:'img_concept.jpg'},
    {url:'https://static.wikia.nocookie.net/fallout/images/c/c3/Mounted_snallygaster.png/revision/latest?cb=20200209231134', name:'img_mounted.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/5/57/Tales_from_the_West_Virginia_Snallygaster.png/revision/latest?cb=20181012054753', name:'img_tales.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/6/6c/WV_State_Capitol.png/revision/latest?cb=20180615134636', name:'img_capitol.png'},
  ]);

  // 2. Wendigo Colossus
  await downloadAll('wendigo-colossus', [
    {url:'https://static.wikia.nocookie.net/fallout/images/e/e2/FO76WL_Wendigo_Colossus_2.png/revision/latest?cb=20200414035741', name:'img_main.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/1/11/Colossus_attacks.png/revision/latest?cb=20200624141457', name:'img_attack.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/7/7d/Colossus_brawl.png/revision/latest?cb=20200624141509', name:'img_brawl.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/0/09/Colossus_staredown.png/revision/latest?cb=20200624141520', name:'img_staredown.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/6/60/FO76WL_Wendigo_Colossus.png/revision/latest?cb=20200414035739', name:'img_variant2.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/8/8f/FO76_WL_Colossus.png/revision/latest?cb=20200414035741', name:'img_nuke.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/2/2c/FO76WL_wendigo_colossus_concept_art.jpg/revision/latest?cb=20200517144613', name:'img_concept.jpg'},
    {url:'https://static.wikia.nocookie.net/fallout/images/c/c7/FO76LR_Earle_Williams.png/revision/latest?cb=20200830090850', name:'img_earle.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/0/07/A_colossal_problem.jpg/revision/latest?cb=20200812131120', name:'img_colossal_problem.jpg'},
  ]);

  // 3. Grafton Monster
  await downloadAll('grafton-monster-fo76', [
    {url:'https://static.wikia.nocookie.net/fallout/images/7/77/Grafton_monster.jpg/revision/latest?cb=20181002162437', name:'img_main.jpg'},
    {url:'https://static.wikia.nocookie.net/fallout/images/4/47/Ruins-E3-Fallout76.png/revision/latest?cb=20180827195802', name:'img_e3.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/c/cc/76_white_Grafton_monster.png/revision/latest?cb=20220126120459', name:'img_white.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/c/c9/FO76_enraged_Grafton_monster.png/revision/latest?cb=20201102071534', name:'img_enraged.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/f/f6/FO76_Parasitic_Grafton_monster.png/revision/latest?cb=20201102071544', name:'img_parasitic.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/9/92/FO76_Strangler_Grafton_monster.png/revision/latest?cb=20201102071507', name:'img_strangler.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/2/2c/Tales_From_the_West_Virginia_Hills_Grafton.png/revision/latest?cb=20181012052823', name:'img_tales.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/b/b8/Grafton_monster_NIF_render.png/revision/latest?cb=20201004155506', name:'img_render.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/e/e5/FO76_Grafton_Monster_Charleston.jpg/revision/latest?cb=20190131050809', name:'img_charleston.jpg'},
  ]);

  // 4. Mirelurk
  await downloadAll('mirelurk-fo76', [
    {url:'https://static.wikia.nocookie.net/fallout/images/e/e1/FO76_Mirelurk.png/revision/latest?cb=20181012004840', name:'img_main.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/0/0e/FO4_Mirelurk_Razorclaw.png/revision/latest?cb=20160205135839', name:'img_razorclaw.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/c/c5/ML_Cranberry.png/revision/latest?cb=20201206183440', name:'img_cranberry.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/e/e3/Bloodrage_mirelurk.png/revision/latest?cb=20201206183100', name:'img_bloodrage.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/6/68/FO76_Scorched_Mirelurk_Crab.png/revision/latest?cb=20201206183350', name:'img_scorched.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/1/17/FO76_Strangler_mirelurk.png/revision/latest?cb=20201206183404', name:'img_strangler.png'},
    {url:'https://static.wikia.nocookie.net/fallout/images/7/71/76_BP_Mirelurks_under_daylight.png/revision/latest?cb=20220613003636', name:'img_daylight.png'},
  ]);

  console.log('\n=== ALL DOWNLOADS COMPLETE ===');
})();
