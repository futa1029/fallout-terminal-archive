const fs = require('fs');
const path = require('path');
const dir = 'f:\\Fallout';

const filesWithContent = [
  'abandoned-taco-stand.html',
  'caesar-s-legion-camp.html',
  'golden-globes-porn.html',
  'hollywood-hills.html',
  'hollywood-sign.html',
  'hollywood-walk-of-fame.html',
  'howard-residence.html',
  'los-angeles-city-hall.html',
  'mirage-pictures.html',
  'ncr-outpost.html',
  'shadowy-facility.html',
  'shady-sands-civic-center.html',
  'shady-sands-courthouse.html',
  'shady-sands-elementary-school.html',
  'shady-sands-public-library.html',
  'spencer-residence.html',
  'uranium-city-internment-camp.html'
];

for (let file of filesWithContent) {
    let p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/（準備中）<br>\s*/, '');
    fs.writeFileSync(p, content, 'utf8');
}

const customImpressions = {
    'adobe-church.html': 'シーズン2におけるグールとスーパーミュータントの意外な絡みが描かれる教会跡地。ドラマならではの荒野の質感がよく出ているロケーションです。',
    'mojave-mission-school.html': 'グールとドッグミート（CX404）の交流など、ドラマ版のキャラクターの深みを知る上で重要なイベントが起こる廃校跡です。',
    'run-down-town.html': 'グール、マキシマス、サディアスがニューベガスへ向かう途中で通りがかる寂れた町です。NCRの武器庫が残されており、過去の勢力の痕跡を感じさせるロケーションとなっています。'
};

for (let file in customImpressions) {
    let p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/（準備中）/, customImpressions[file]);
    fs.writeFileSync(p, content, 'utf8');
}

console.log('Fixed impressions for 20 files.');
