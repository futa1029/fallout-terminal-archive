// 感想セクション確認スクリプト
const fs = require('fs');
const files = [
  '98-nar-regional','beckwith-farm','big-freds-bbq-shack','carhenge-fo76',
  'dent-and-sons-construction','foundation-supply-room','founders-hall',
  'the-freak-show','lake-eloise','metal-dome','middle-mountain-pitstop',
  'miners-monument','moonshiners-overlook','mysterious-guidestones',
  'north-mountain-lookout','point-repose','radiant-hills',
  'relay-tower-dp-b5-21','scenic-overlook','sylvie-and-sons-logging-camp',
  'the-bounty','the-bullengrube','thomas-farm','toxic-larrys-meat-n-go',
  'wild-wolf-homestead','allegheny-mountains','ammo-dump','barrel-burial',
  'clifftop-vista-cabin','crossroad','devils-alley',
  'dr-eddie-harrisons-house','emmett-mountain-side-tunnel',
  'end-of-the-road','explosives-shrine','gardeners-shack','glamping-site',
  'gnomes-allotment','halloween-fright-farm','halloween-horror-hamlet',
  'hillside-cavern','jaggys-crag','mountainside-cabin',
  'north-mountain-oratory-camp','old-danielson-cabin',
  'raider-outhouse-and-moat','secluded-cave','ski-lift',
  'ski-lift-base-camp','tightrope','walking-trail-picnic-area'
];
let missing = [];
let ok = 0;
files.forEach(f => {
  const p = 'F:/Fallout/' + f + '.html';
  if (!fs.existsSync(p)) { missing.push(f + ' (FILE NOT FOUND)'); return; }
  const c = fs.readFileSync(p, 'utf8');
  if (!c.includes('感想')) { missing.push(f); } else { ok++; }
});
console.log('✅ 感想あり: ' + ok + '件');
console.log('❌ 感想なし: ' + missing.length + '件');
if (missing.length > 0) { missing.forEach(m => console.log('  - ' + m)); }
