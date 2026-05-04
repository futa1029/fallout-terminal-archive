const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/petersen-steel-reign.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ピーターセン（Petersen）</b>は、アパラチアの<a href="vault-96.html" class="auto-link">Vault 96</a>に囚われている捕虜（<a href="human.html" class="auto-link">人間</a>）の一人です。</p>

            <h2>背景</h2>
<p>ピーターセンは、<a href="cassie-halloway.html" class="auto-link">キャシー・ハロウェイ</a>、ウィルキンス、そして<a href="ashmore.html" class="auto-link">アシュモア</a>と共に、エドガー・ブラックバーン博士と<a href="hellcat-company.html" class="auto-link">ヘルキャット傭兵団</a>によって捕らえられ、彼らの意志に反してFEV（強制進化ウイルス）の人体実験の被験者として使われようとしていました。彼らはVault 96の深部に投獄された状態で存在しています。</p>

            <h2>クエスト</h2>
<ul class="loot-list">
    <li><b><a href="a-satisfied-conscience.html" class="auto-link">A Satisfied Conscience</a></b>：ピーターセンはVault 96内で捕虜として囚われており、プレイヤーは彼らを解放するために施設を探索することになります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                「Steel Reign」アップデートで追加されたB.O.S.のメインクエスト「A Satisfied Conscience」で出会うNPCの一人です。<br>Vault 96内の捕虜収容エリアに閉じ込められており、彼らを助け出すことがクエストの目的の一部となります。実験の過酷な環境からか、「全部痛い…気持ち悪い（Everything hurts... I feel sick.）」と苦痛に呻いています。
            </div>
`;

// Replace infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Petersen</h3><img src="images/note_extracted/petersen-steel-reign/img_main.png" alt="Petersen"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span>捕虜（元ウェイストランダー）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="vault-96.html" class="auto-link">Vault 96</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="a-satisfied-conscience.html" class="auto-link">A Satisfied Conscience</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76 (Steel Reign)</span></div></aside>');

// Replace title
content = content.replace('<h1>Petersen</h1>', '<h1>Petersen<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ピーターセン</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/petersen-steel-reign.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ピーターセン（Petersen）
https://www.fallout-jp.com/petersen-steel-reign.html

概要

「Steel Reign」のB.O.S.クエストにて登場する人物。ブラックバーン博士とヘルキャット傭兵団によって捕らえられ、FEVの人体実験の被験者としてVault 96に投獄されています。

---

💭 感想

Vault 96内の捕虜収容エリアに閉じ込められており、彼を助け出すことがクエストの目的の一部となります。実験の過酷な劣悪環境からか、「全部痛い…気持ち悪い」と苦痛に呻いている可哀想なNPCです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/petersen-steel-reign', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/petersen-steel-reign/post.md', postContent);

console.log('Done.');
