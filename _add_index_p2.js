// Phase2 114件のmanualEntries用エントリを生成し、remove_duplicates.jsに追加
const fs = require('fs');

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[()''""\.]/g, '').replace(/,/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

const allChars = [
  ...['Ae-Ri','Aldridge','Axel (Wastelanders)','Barb (Wastelanders)','Blackeye','Bruiser (Wastelanders)','Deathklaus','Fishbones','Caleb Fisher','Creed','Former raider','Gail','Glenn','Gnash','Hal Gleeson','Hijack','Johnny Weston','Kiyomi','Kogan','Lev','Lucky Lou','Maximum Maddie','Meg Groberg','Molly (Wastelanders)','Mortimer (Wastelanders)','Munch','Nuclear Don','Ra-Ra','Raf','Registration guard','Rocksy','Ronny (Wastelanders)','Sargento','Surge','Weasel','Wren (raider)'],
  ...['Aubrie Willem','Davie Taylor','Derrick Taylor','Elsie Taylor','Fred Radcliff','Gate guard','Jen','Mochou','Paige','Penelope Hornwright','Samuel (Wastelanders)','Sunny (Wastelanders)','Thompson (Wastelanders)','Ward (Wastelanders)'],
  ...['Derek Garrison','Chase Terrier','Mercedes Stern','Maggie Stern','Reginald Stone','Secret Service agent','Cole Carver'],
  ...['Bessie (Wastelanders)','Cherise','Crane (Wastelanders)','Jide','Mordecai McCoy','Patron (The Wayward)','Polly (Wastelanders)','Smiley (Wastelanders)'],
  ...['Aries','Carver Timmerman','Eugenie','Kieran Kennedy','Libby Wen','Rudy Fernandez','Vinny Costa'],
  ...['Batter','Davey (Wastelanders)','Jacky (Wastelanders)','Roper'],
  ...['Daniel (Wastelanders)','Hannah (Wastelanders)','Murray (Wastelanders)','Ursala','Xavier'],
  ...['The Blood','The Eye','Frank the Butcher','Jessi the Hook','Star'],
  ...['Alexis','Aloe','Antoine','Bubbles','Carolyn','Clarice','Cunningham (Fallout 76)','Cynthia','Doc Stanley','Flauresca','Flintlock','Friedrich','Helena (Fallout 76)','Lotus','Margaret (Fallout 76)','Marie (Fallout 76)','Pendleton','Robert (Whitespring)','Stratford','Tannin','Tweed','Vera (Fallout 76)','The Whitespring Station vendor','Brotherhood vendor','Free States vendor','Raiders vendor','Responders vendor','Shopping mall vendor'],
];

const entries = allChars.map(n => {
  const slug = slugify(n);
  const name = n.replace(/ \(.+\)/, '');
  return `    { name: "${name}", yomi: "${name.toLowerCase().replace(/[^a-z0-9]/g, '')}", url: "${slug}.html", category: "人物", appearance: ["Fallout 76"], date: "2026-03-27", status: "draft" },`;
});

// remove_duplicates.jsの]; の前に挿入
const rdPath = 'F:/Fallout/remove_duplicates.js';
let content = fs.readFileSync(rdPath, 'utf8');

const insertPoint = '    { name: "Worthy", yomi: "worthy", url: "worthy.html", category: "人物", appearance: ["Fallout 76"], date: "2026-03-27", status: "draft" },';
const newBlock = insertPoint + '\n    // === FO76 キャラクター Phase2 114件 (2026-03-27) ===\n' + entries.join('\n');

content = content.replace(insertPoint, newBlock);
fs.writeFileSync(rdPath, content, 'utf8');
console.log(`✅ ${entries.length}件のエントリを追加`);
