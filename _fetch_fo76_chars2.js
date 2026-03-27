// Phase 2: Wastelanders Raider + Settler + Wayward + Blue Ridge + Misc 等のデータ取得
const fs = require('fs');
const https = require('https');
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function fetchWikitext(title){return new Promise((resolve)=>{const url=`https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext|images&format=json`;https.get(url,{headers:{'User-Agent':'FalloutLoreArchive/1.0'}},(res)=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);if(j.error){resolve(null);return;}resolve({wikitext:j.parse.wikitext['*'],images:j.parse.images||[]});}catch(e){resolve(null);}});}).on('error',()=>resolve(null));});}

const characters = [
  // Wastelanders Raider (36)
  'Ae-Ri','Aldridge','Axel (Wastelanders)','Barb (Wastelanders)','Blackeye',
  'Bruiser (Wastelanders)','Deathklaus','Fishbones','Caleb Fisher','Creed',
  'Former raider','Gail','Glenn','Gnash','Hal Gleeson','Hijack','Johnny Weston',
  'Kiyomi','Kogan','Lev','Lucky Lou','Maximum Maddie','Meg Groberg',
  'Molly (Wastelanders)','Mortimer (Wastelanders)','Munch','Nuclear Don','Ra-Ra',
  'Raf','Registration guard','Rocksy','Ronny (Wastelanders)','Sargento','Surge',
  'Weasel','Wren (raider)',
  // Settler (15)
  'Aubrie Willem','Davie Taylor','Derrick Taylor','Elsie Taylor',
  'Fred Radcliff','Gate guard','Jen','Mochou','Paige','Penelope Hornwright',
  'Samuel (Wastelanders)','Sunny (Wastelanders)','Thompson (Wastelanders)','Ward (Wastelanders)',
  // Secret Service (7)
  'Derek Garrison','Chase Terrier','Mercedes Stern','Maggie Stern',
  'Reginald Stone','Secret Service agent','Cole Carver',
  // Wayward (8)
  'Bessie (Wastelanders)','Cherise','Crane (Wastelanders)','Jide',
  'Mordecai McCoy','Patron (The Wayward)','Polly (Wastelanders)','Smiley (Wastelanders)',
  // Blue Ridge (7)
  'Aries','Carver Timmerman','Eugenie','Kieran Kennedy','Libby Wen','Rudy Fernandez','Vinny Costa',
  // Free Radicals (5)
  'Batter','Davey (Wastelanders)','Jacky (Wastelanders)','Roper',
  // Anchor Farm (5)
  'Daniel (Wastelanders)','Hannah (Wastelanders)','Murray (Wastelanders)','Ursala','Xavier',
  // Blood Eagles (6)
  'The Blood','The Eye','Frank the Butcher','Jessi the Hook','Star',
  // Whitespring Resort (30)
  'Alexis','Aloe','Antoine','Bubbles','Carolyn','Clarice',
  'Cunningham (Fallout 76)','Cynthia','Doc Stanley','Flauresca','Flintlock','Friedrich',
  'Helena (Fallout 76)','Lotus','Margaret (Fallout 76)','Marie (Fallout 76)','Pendleton',
  'Robert (Whitespring)','Stratford','Tannin','Tweed','Vera (Fallout 76)',
  'The Whitespring Station vendor','Brotherhood vendor','Free States vendor',
  'Raiders vendor','Responders vendor','Shopping mall vendor',
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
