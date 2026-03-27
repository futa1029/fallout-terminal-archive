// Phase 3: 残りのDLCキャラクター データ取得
// Steel Dawn/Reign, Pitt, Nuka-World, Skyline Valley 等
const fs = require('fs');
const https = require('https');
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function fetchWikitext(title){return new Promise((resolve)=>{const url=`https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext|images&format=json`;https.get(url,{headers:{'User-Agent':'FalloutLoreArchive/1.0'}},(res)=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);if(j.error){resolve(null);return;}resolve({wikitext:j.parse.wikitext['*'],images:j.parse.images||[]});}catch(e){resolve(null);}});}).on('error',()=>resolve(null));});}

const characters = [
  // Legendary Run + One Wasteland (6)  
  'Maggie Williams','Earle Williams','Russell Dorsey','Villager','Vernon Dodge',
  // Fort Atlas / Steel Dawn (18)
  'Art Knapp','Daniel Shin','Edgar Blackburn','Leila Rahmani','Marcia Leone','Maximo Leone',
  'Odessa Valdez','Shawn Hockman','Tally Lang','Erika Hewsen','Luis Ramirez','Norland',
  'Brotherhood Barry','Brotherhood Barnaby','Brotherhood Buck','Carol Putnam','Colin Putnam','Dagger',
  // Steel Dawn/Reign continued (18)
  'Felton Reed','Gloria Chance','Ian Orwell','Jennie Brown','Marty Putnam','Mike Tiller',
  'Sheena','Sunny (Steel Dawn)','Tad Chance','Farha','Herschel Klein',
  'Jain (Steel Reign)','Joanna Mayfield','Kit','Minerva','Nellie Wright','Tommy Ten-Toes',
  'George Putnam',
  // Vault 96 (8)
  'Ashmore','Cassie Halloway','Dillo','Eightball','Needles',
  'Petersen (Steel Reign)','Wilkins (Steel Reign)','Woods',
  // Point Pleasant / Mothman (5)
  'Clarence (Fallout 76)','Errol','Johanna','Marlon','Charles (Cult of the Mothman)',
  // Invaders (3)
  'Amp','Beatrice the Wrench','The Emissary',
  // Test Your Metal (10)
  'Buzzsaw','Kenneth Dean','Moonshiner Ned','Pappas (Fallout 76)','Ruggy',
  'Samuel Hackerman','Marilyn (Fallout 76)',
  // Fasnacht (9)
  'Cheerful Beekeeper','Convivial Historian','Gleeful Butcher','Happy Candlemaker',
  'Jolly Baker','Joyous Musician','Jubilant Decorator','Master of Ceremonies','Merry Woodsman',
  // Whitespring Refuge (15 selected)
  'Esme Rousseau','Giuseppe Della Ripa','Lennox','Orlando','Roy Lopez','Rucker',
  'Skippy Roerich','Sophie Wagoner',
  // Nuclear Winter (5)
  'Billy (Harpers Ferry)','Cole (Fallout 76)','Lucas (Nuclear Winter)','Red (Nuclear Winter)','ZAX 1.3c',
  // Pitt (10)
  'Ava Rose','Danilo','Hex (Expeditions: The Pitt)','Morley','Ning','Wicker',
  // Nuka-World on Tour (10)
  'Betty Hill','Bruno the Strongbot','Chloe the Clown','Del Walsh','Gunther Jenkins',
  'Jack Woodhouse','Lady G the Fortune Teller','Patricia Myers','Pete Myers',
  // Once in a Blue Moon (5)
  'Clyde','Grandma Junko','Gregory Timmerman','Luca Costa','Vera Thornberg',
];

async function main(){
  const outputPath='F:/Fallout/_fo76_chars_wiki_data.json';
  let data={};
  if(fs.existsSync(outputPath))data=JSON.parse(fs.readFileSync(outputPath,'utf8'));
  const remaining=characters.filter(c=>!data[c]);
  console.log(`既存: ${Object.keys(data).length}件, 残り: ${remaining.length}件`);
  for(let i=0;i<remaining.length;i++){
    const name=remaining[i];
    await sleep(250);
    const result=await fetchWikitext(name);
    if(result){data[name]={wikitext:result.wikitext,images:result.images};console.log(`[${i+1}/${remaining.length}] ✅ ${name} (${result.wikitext.length}c)`);}
    else console.log(`[${i+1}/${remaining.length}] ❌ ${name}`);
    if((i+1)%30===0)fs.writeFileSync(outputPath,JSON.stringify(data,null,2),'utf8');
  }
  fs.writeFileSync(outputPath,JSON.stringify(data,null,2),'utf8');
  console.log(`\n✅ 全${Object.keys(data).length}件保存`);
}
main().catch(e=>console.error(e));
