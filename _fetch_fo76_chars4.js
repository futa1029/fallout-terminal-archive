// Phase 4: 残りの大量キャラクター(Misc, Skyline, Atlantic, Burning, etc)データ取得
const fs = require('fs');
const https = require('https');
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function fetchWikitext(title){return new Promise((resolve)=>{const url=`https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext|images&format=json`;https.get(url,{headers:{'User-Agent':'FalloutLoreArchive/1.0'}},(res)=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);if(j.error){resolve(null);return;}resolve({wikitext:j.parse.wikitext['*'],images:j.parse.images||[]});}catch(e){resolve(null);}});}).on('error',()=>resolve(null));});}

// Misc Base game (selected important ones ~80)
const characters = [
  // Base game Misc (selecting notable characters)  
  'Auto-Miner DU-K3','Barbara Elizabeth','Bellhop','Blake Saunders','Boomer (Fallout 76)',
  'The Boss','Camden Park security','Census taker','Chally the moo-moo','Collectron',
  'Cryptos','Escaped inmate','Ford','Giles Sweetwater','Grafton mayor','Grahm',
  'Huntmaster','Isaac Hammond','Jack O\' Lantern','John Aaronholt','Kassie',
  'Lowell Aaronholt','MAIA','Master Sergeant Gutsy','Miss Annie','Moncrief',
  'The Motherlode (robot)','Natasha Hunt','Old Nate','Otis Pike',
  'Prickett\'s Fort curator','Rich Taylor','Scott Turner','Shawn Aaronholt',
  'Supervisor Chattingham','Supervisor Danforth','Supervisor Wellington','Vincent May-Lilly',
  'Tumblin\' Joe','Willie Mae','Zeke (Fallout 76)',
  // Wild Appalachia Misc
  'Anne Litzinger','Ansel Abrahms','ARIC-4','Biv','Nia','Cavit Klein',
  'Cindy Holloway','Clara Song','Harvey Tinley','Insult Bot','Janelle Priblo',
  'Max Posey','Michael Turner','Quercus','Ray Gary','Raymond Priblo',
  'Reuben Gill','Scott Conroy','Sidney','Jaggy','Pompy','Treadly',
  'Penny (Wild Appalachia)','The Beast of Beckley',
  // Wastelanders Misc (selected)
  'ARTEMIS (Wastelanders)','Beckett (Wastelanders)','Bethy Mangano','Brass',
  'Davenport','Dorothea Dias','Dylan Rhodes','Frida Madani','Fritz',
  'Gina Bailey','Gilbert Hopson','Greg Goldstein','Heather Ellis','Isela Mejia',
  'James Addison','Jonah Ito','Juliette','Kelemen','Kensington',
  'Lacey Drummond','Loris','Maram Ayari','Marion Copeland','PANDORA',
  'Professor-bot','Robinson','Rocco','Sage','Scott Malish','Tiffany Brantley',
  // Steel Dawn/Reign Misc
  'Dagger\'s lieutenant','G. Walton','Sara Matthews','Pierce (Steel Dawn)',
  // Gleaming Depths (10)
  'Bloodhound (Gleaming Depths)','EN06 Guardian','Esther Wright','John Holloway',
  'Lynx','Helena Blum','Robert Gaines','Vulture (Gleaming Depths)','Elliot Tisdale',
  // Ghoul Within (13)
  'Dave (Ghoul Within)','Ernie Navarro','Guy (Ghoul Within)','Jaye Vo',
  'Jess (Ghoul Within)','Kevan Asherton','Leamon Price','Maddox Mullen',
  'Madeline Keene','Magellan','Parthenia Blankenship','Regular Debbie',
  // Gone Fission (3)
  'Dottie (Gone Fission)','Raymond Clark','The Fisherman',
  // Milepost Zero (10)
  'Axel (Milepost Zero)','Collector Murmrgh','Gyro','Ineke de Haan',
  'Josie (Milepost Zero)','Luke (Milepost Zero)','Marley','Theodore (Milepost Zero)',
  // Burning Springs (selected 20)
  'Archie the Kid','Beastmaster Lina','Bodhi','Darwin the Devil',
  'Gregory Dixon','Magpie','Millstone','Pop','Rattler','Robyn the Brute',
  'Runt','The Exec','The Rust King','Windy Park','Xander Brown',
  'Splint','Cobby',
  // Smiling Man
  'Smiling Man',
];

async function main(){
  const outputPath='F:/Fallout/_fo76_chars_wiki_data.json';
  let data={};
  if(fs.existsSync(outputPath))data=JSON.parse(fs.readFileSync(outputPath,'utf8'));
  const remaining=characters.filter(c=>!data[c]);
  console.log(`既存: ${Object.keys(data).length}件, 残り: ${remaining.length}件`);
  for(let i=0;i<remaining.length;i++){
    const name=remaining[i];
    await sleep(200);
    const result=await fetchWikitext(name);
    if(result){data[name]={wikitext:result.wikitext,images:result.images};console.log(`[${i+1}/${remaining.length}] ✅ ${name} (${result.wikitext.length}c)`);}
    else console.log(`[${i+1}/${remaining.length}] ❌ ${name}`);
    if((i+1)%40===0)fs.writeFileSync(outputPath,JSON.stringify(data,null,2),'utf8');
  }
  fs.writeFileSync(outputPath,JSON.stringify(data,null,2),'utf8');
  console.log(`\n✅ 全${Object.keys(data).length}件保存`);
}
main().catch(e=>console.error(e));
