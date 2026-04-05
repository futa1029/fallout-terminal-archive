const fs = require('fs');

// wilson-brothers-auto.html
let wFile = 'f:/Fallout/wilson-brothers-auto.html';
let wHtml = fs.readFileSync(wFile, 'utf8');
wHtml = wHtml.replace(
    /<h1>Wilson Brother's Auto Repair<br><span style="font-size:0.6em;co<h2>概要<\/h2>/,
    "<h1>Wilson Brother's Auto Repair<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウィルソン兄弟のオート修理工場</span></h1>\n<h2>概要</h2>"
);
fs.writeFileSync(wFile, wHtml, 'utf8');
console.log('Fixed wilson-brothers-auto.html');

// poseidon-substation-px-01.html
let pFile = 'f:/Fallout/poseidon-substation-px-01.html';
let pHtml = fs.readFileSync(pFile, 'utf8');
pHtml = pHtml.replace(/<h2>See also<\/h2>/g, "<h2>関連項目</h2>");
pHtml = pHtml.replace(/<p>This fenced-off power station has one shack containing some junk items. It is populated with several スコーチ. Two copper veins 入手できます next to the station. また、power box here that requires activating the ポセイドン・エネルギー Plant WV-06.<\/p>/, 
    "<p>フェンスで囲まれたこの変電所には、ジャンク品が置かれた小さな小屋があり、複数のスコーチが徘徊しています。変電所の隣には銅の鉱脈が2つあります。また、ポセイドン・エネルギープラントWV-06の復旧を必要とする電源ボックス（管轄ワークショップ等へ電力を供給する配電盤）が存在します。</p>");
pHtml = pHtml.replace(/<p><b>Poseidon power substation PX-01<\/b> は森林地帯 of アパラチア. にあるロケーションです<\/p>/,
    "<p><b>ポセイドン変電所 PX-01（Poseidon power substation PX-01）</b> はアパラチアの森林地帯に位置するロケーションです。</p>");
pHtml = pHtml.replace(/<p>Potential ワークショップ plan - On a cabinet in the substation shack.<\/p>/,
    "<p>ワークショップの設計図（ランダム出現） - 変電所の小屋にあるキャビネットの上。</p>");
pHtml = pHtml.replace(/Category:Fallout 76 ロケーションs<br>Category:森林地帯 ロケーションs<br>Category:ポセイドン・エネルギー ロケーションs<br>fr:Centrale secondaire de Poseidon Power PX-01<br>ru:Электроподстанция «Посейдон» PX-01<br>zh:海神變電站PX-01/, "");

fs.writeFileSync(pFile, pHtml, 'utf8');
console.log('Fixed poseidon-substation-px-01.html');
