const fs = require('fs');
const path = require('path');

const srcDir = 'f:/Fallout/images/note_extracted/the-pitt';
const destDir = 'f:/Fallout/_X/the-pitt/images';

fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp'));
// Just picking 4 representative ones
let selected = [];
let candidates = [
    'FO76_The_Pitt_Keyart_HD.jpg',
    'Ashur_s_Palace.png',
    'FO76_The_Pitt_Sanctum_Vertibird_LZ.png',
    'FO76TP_Foundry_Room.jpg'
];
candidates.forEach(c => {
    if(files.includes(c)) selected.push(c);
});
// If we missed some, fill up to 4
for(let f of files) {
    if(selected.length < 4 && !selected.includes(f)) {
        selected.push(f);
    }
}
selected.forEach(img => fs.copyFileSync(path.join(srcDir, img), path.join(destDir, img)));

const postContent = `#Fallout3 #Fallout76

ピット (The Pitt)
https://www.fallout-jp.com/the-pitt.html

歴史・背景

ピットはかつてペンシルベニア州ピッツバーグの街でした。ここは鉄鋼生産だけでなく、武器、弾薬、ベルチバード、パワーアーマー、ロボットの製造など、対中戦争の軍事努力を支える一大産業拠点でした。大戦後、街は混沌に陥り、様々なレイダーギャングがそれぞれ独自の支配領域を確立し始めました。

---

ユニオンとファナティック

その後しばらくして、ピットは支配権をめぐって互いに争う二つの派閥の激しい紛争の舞台となりました。自らを「ユニオン」と組織した生存者たちと、「ファナティック」として知られるレイダーグループです。ヘルキャット傭兵団もファナティックと取引をしたことがありました。

---

💭 感想

Fallout 3でおそらく最も心に残る選択を迫られる場所であり、さらに76のExpeditions第一弾としていざなってくれた、シリーズでも屈指の存在感を放つロケーションですね！
「TDC（トログ病）」という呪いに見舞われ、徐々に人間性を失っていくというプロセスは、レイダーの暴力以上に恐ろしいピットの根幹的な恐怖です。
アッシャーという新たな地獄の王、彼が敷いた過酷な階級制度……それらは「娘の力で病を克服し全員を救うため」という強烈な善意の裏返しでもあり、あの倫理的なジレンマは最高のアドオン体験でした。「いつか免疫を持つ赤子の力で」と語るアッシャーの理想と現実は本当に重たいですよね。
時代を超えてFalloutの歴史の重さを感じさせてくれる、最高にスモッグが目に沁みる街です。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.writeFileSync('f:/Fallout/_X/the-pitt/post.md', postContent, 'utf8');
console.log('X post generated.');
