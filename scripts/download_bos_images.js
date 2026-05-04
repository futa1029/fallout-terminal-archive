/**
 * Brotherhood of Steel 記事用の全画像をダウンロードするスクリプト
 * Fandom Wiki API からファイル情報を取得し、ローカルに保存する
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'images', 'note_extracted', 'brotherhood-of-steel');

// 不足している画像一覧
const MISSING_IMAGES = [
  "Paladin.jpg","Fo1_Losthills_Entrance.png","Fallout_Lost_Hills_Level_1.png",
  "Fo1_Brotherhood_Interior.jpg","Fo1_Lost_Hills_Townmap.png","BOS.gif",
  "FO2_Den_BoS.png","Fo2_BOS_Outpost_NCR.png","Brotherhood_OutpostFrancisco.png",
  "Fo2_Matthew_v_Horrigan.png","Fallout_3_power_armor_concept_art.jpg","BOSvertibird.jpg",
  "CBailey7.jpg","Fallout_New_Vegas_T-51b.jpg","Hidden_Valley_bunker.jpg",
  "FNV_brotherhoodlogo_nif.png","Bosdecal.png","Bosdecal_n.png","Dlc03watercrate.png",
  "Graffitifo35.png","Bosbanner.png","Fo4-drop-concept.jpg",
  "BostonAirport-FiringRange-Fallout4.jpg","The_Prydwen.png",
  "Prydwen-CommandDeck-Fallout4.jpg","Fo4-Bos-flag.png","DecalSheet_d.png",
  "Steam_reward_Taggerdy's_Thunder_group_photo.jpg","FO76_Twitter_Brotherhood_of_Steel.jpg",
  "FO76_Forward_Station_Alpha.png","FO76LR_Fortifying_ATLAS_Dorsey.jpg",
  "FO76SR_The_Catalyst_Shin_victory.png","BOS_weapons_cache.png",
  "FO76LL_BoS_medallion.png","FO76_steelreign_chronicsonictonic_02.jpg",
  "FOTV_Amazon_Profile_Picture_Power_Armor.png","FOTV_S1_Amazon_promo_14.jpg",
  "FOTV_S1_Amazon_promo_15.jpg","FOTV_S1_Amazon_promo_18.jpg",
  "FoTV_Brotherhood_group.jpg","FOTV_Brotherhood_Stole_and_Censer.png",
  "FOTV_Season_2_Maximus_Character_Poster_2.jpg","The_Target_credits_Brotherhood_poster.png",
  "FO76_Makeshift_Vault_Interior_Atrium.png","FO01_NPC_Maxson_G.png",
  "FOTV_Altar_Brotherhood_of_Steel.png","FOTV_Branding_by_the_Brotherhood.png",
  "FO76_steelreign_chronicsonictonic_01.jpg","FB3_Appendix.jpg",
  "Mojave_BOS_banner.png","Citadel.jpg","FOT_Intro_War_10.jpg",
  "Shady_Sands_Knight_and_Maximus.png","BoS_Recruitment_Poster_from_FOTV_Merch.jpg",
  "FO76_Brotherhood_Recruiter.webp","Outcast_patrol_fighting_raiders.png",
  "Ft_Bannister_BOS_aqua_pura_security_after_Broken_Steel.jpg",
  "FO_Vertibird_on_ground_vs_Gunners.jpg","FO76_BoS_GY_1.png",
  "Fallout_76_super_mutants_are_attacking_fort_atlas_by_spartan22294.jpg",
  "Following_In_His_Footsteps.jpg","FO4-Liberty-prime-kills-behemoth.png",
  "Two_knights_with_assault_rifles.png","FI_research_room.jpg",
  "FO76_BoS_TIE_fighter_1.png","Outcast_Patrol_2.jpg","Rockland_CT_exterior.jpg",
  "Fallout_Lost_Hills_Level_3.png","HVB_workshop.jpg","FO76_Ultracite_power_armor.png",
  "Prime.jpg","Adams_Air_Force_Base_map.jpg","FO4_Pryd_TV_14.png",
  "FO76SD_supplyingdemands_chronicsonictonic_01.jpg","Fo2_Jimmy.png",
  "Activated_Purifier02.jpg","BOS_Rhombus.png",
  "BoS_FO4_CC_Minigun_Decal_recreation.png","BoS_CC_Wingspan_Decal-3.png",
  "BoS_CC_Wings_and_Chevrons_Decal.png","BoS_CC_Combat_Wing_Decal.png",
  "Fo1_Military_Base_Destroyed.png","FOTV_Prydwen_Landing.png"
];

// Fandom APIからファイルURLを取得
async function getImageUrl(filename) {
  const apiUrl = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
  return new Promise((resolve, reject) => {
    https.get(apiUrl, { headers: { 'User-Agent': 'FalloutArchiveBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === '-1' || !pages[pageId].imageinfo) {
            resolve(null);
          } else {
            resolve(pages[pageId].imageinfo[0].url);
          }
        } catch (e) {
          resolve(null);
        }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

// ファイルをダウンロード (リダイレクト対応)
function downloadFile(url, outputPath, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'FalloutArchiveBot/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, outputPath, maxRedirects - 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => { fileStream.close(); resolve(); });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

// 遅延関数
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  // ディレクトリ作成
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let success = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < MISSING_IMAGES.length; i++) {
    const filename = MISSING_IMAGES[i];
    const outputPath = path.join(OUTPUT_DIR, filename);
    
    // 既にあればスキップ
    if (fs.existsSync(outputPath)) {
      console.log(`[${i+1}/${MISSING_IMAGES.length}] SKIP (exists): ${filename}`);
      success++;
      continue;
    }

    try {
      console.log(`[${i+1}/${MISSING_IMAGES.length}] Fetching URL: ${filename}`);
      const url = await getImageUrl(filename);
      if (!url) {
        console.log(`  WARN: No URL found for ${filename}`);
        failures.push(filename);
        failed++;
        continue;
      }
      
      // Fandom CDNのサムネではなくオリジナルを取得
      const cleanUrl = url.replace(/\/revision\/latest\/scale-to-width-down\/\d+/, '/revision/latest');
      
      await downloadFile(cleanUrl, outputPath);
      const stats = fs.statSync(outputPath);
      console.log(`  OK: ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);
      success++;
    } catch (err) {
      console.log(`  FAIL: ${filename} - ${err.message}`);
      failures.push(filename);
      failed++;
    }
    
    // レート制限: 200msの間隔
    await sleep(200);
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
  if (failures.length > 0) {
    console.log(`Failed files:`);
    failures.forEach(f => console.log(`  - ${f}`));
  }
}

main().catch(console.error);
