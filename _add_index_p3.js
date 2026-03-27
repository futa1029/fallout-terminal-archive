// Phase3 103件のインデックス追加
const fs = require('fs');
function slugify(n){return n.toLowerCase().replace(/:/g,'').replace(/\s+/g,'-').replace(/[()''""\.]/g,'').replace(/,/g,'').replace(/-+/g,'-').replace(/^-|-$/g,'');}

const allChars = [
  'Maggie Williams','Earle Williams','Russell Dorsey','Villager','Vernon Dodge',
  'Art Knapp','Daniel Shin','Edgar Blackburn','Leila Rahmani','Marcia Leone','Maximo Leone',
  'Odessa Valdez','Shawn Hockman','Tally Lang','Erika Hewsen','Luis Ramirez','Norland',
  'Brotherhood Barry','Brotherhood Barnaby','Brotherhood Buck','Carol Putnam','Colin Putnam','Dagger',
  'Felton Reed','Gloria Chance','Ian Orwell','Jennie Brown','Marty Putnam','Mike Tiller',
  'Sheena','Sunny (Steel Dawn)','Tad Chance','Farha','Herschel Klein',
  'Jain (Steel Reign)','Joanna Mayfield','Kit','Minerva','Nellie Wright','Tommy Ten-Toes','George Putnam',
  'Ashmore','Cassie Halloway','Dillo','Eightball','Needles',
  'Petersen (Steel Reign)','Wilkins (Steel Reign)','Woods',
  'Clarence (Fallout 76)','Errol','Johanna','Marlon','Charles (Cult of the Mothman)',
  'Amp','Beatrice the Wrench','The Emissary',
  'Buzzsaw','Kenneth Dean','Moonshiner Ned','Pappas (Fallout 76)','Ruggy','Samuel Hackerman','Marilyn (Fallout 76)',
  'Cheerful Beekeeper','Convivial Historian','Gleeful Butcher','Happy Candlemaker',
  'Jolly Baker','Joyous Musician','Jubilant Decorator','Master of Ceremonies','Merry Woodsman',
  'Esme Rousseau','Lennox','Orlando','Roy Lopez','Rucker','Skippy Roerich','Sophie Wagoner',
  'Billy (Harpers Ferry)','Cole (Fallout 76)','ZAX 1.3c',
  'Ava Rose','Danilo','Hex (Expeditions: The Pitt)','Morley','Ning','Wicker',
  'Betty Hill','Bruno the Strongbot','Chloe the Clown','Del Walsh','Gunther Jenkins',
  'Jack Woodhouse','Lady G the Fortune Teller','Patricia Myers','Pete Myers',
  'Clyde','Grandma Junko','Gregory Timmerman','Luca Costa','Vera Thornberg',
];

const entries = allChars.map(n => {
  const slug = slugify(n);
  const name = n.replace(/ \(.+\)/, '');
  return `    { name: "${name}", yomi: "${name.toLowerCase().replace(/[^a-z0-9]/g,'')}", url: "${slug}.html", category: "人物", appearance: ["Fallout 76"], date: "2026-03-27", status: "draft" },`;
});

const rdPath = 'F:/Fallout/remove_duplicates.js';
let content = fs.readFileSync(rdPath, 'utf8');
const marker = '    { name: "Shopping mall vendor", yomi: "shoppingmallvendor", url: "shopping-mall-vendor.html", category: "人物", appearance: ["Fallout 76"], date: "2026-03-27", status: "draft" },';
const newBlock = marker + '\n    // === FO76 キャラクター Phase3 103件 (2026-03-27) ===\n' + entries.join('\n');
content = content.replace(marker, newBlock);
fs.writeFileSync(rdPath, content, 'utf8');
console.log(`✅ ${entries.length}件追加`);
