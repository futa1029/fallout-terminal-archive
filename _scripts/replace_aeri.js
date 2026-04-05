const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/ae-ri.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>エイ・リ（Ae-Ri）</b>は、<a href="the-crater.html" class="auto-link">クレーター</a>における武器商店「Guns, Guns, Guns」のベンダーを務める人間の女性です。</p>
<p>彼女はレイダーたちがアパラチアに帰還する前のどこかの時点で<a href="crater.html" class="auto-link">クレーター（レイダー）</a>の組織に参加しました。現在では中枢で兵器の管理と流通を任されています。</p>
<p>エイ・リは基本的に仲間が現地調達した"盗品"を取引しており、特にパイプピストルやコンバットナイフといった安物の武装ばかりを頻繁に持ち込まれることに心底うんざりしています。ただの商人ではなく、スコープの再調整を行えるなど実用的な銃器メンテナンスのスキルも持っています。</p>

            <h2>プレイヤーの行動による変化</h2>
<ul>
    <li>プレイスルーの進行に応じて、エイ・リの会話内容が変化します。例えば、クエスト「Cheating Death」を完了すると、彼女はラッキー・ルーを救い出したことについて<a href="vault-dweller-fallout-76.html" class="auto-link">Vault 76の居住者</a>に感謝の言葉を述べます。</li>
    <li>レイダー側についてVault 79を襲撃した場合、<a href="ra-ra.html" class="auto-link">ラーラ</a>が「エイ・リが私のウサギの人形（バンプス）にクールなトゲトゲの首輪を作ってくれるって言ってた」と嬉しそうに言及することがあります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                クレーターの中心部を歩き回っている武器担当のベンダーです。<br>「さあ、76。私に売りたくてたまらないクレイジーなブツを持ってきたんだろ？」というレイダーらしい掛け声で取引に応じてくれる気の良い女性です。盗品を主に扱っているという設定ですが、低レベルのガラクタ武器ばかり持ち込むレイダーたちの働きぶりに呆れており、定期的にクレイジーな重武装をさばきに来るプレイヤーキャラクターに対してはかなり好意的に接してくれます。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Ae-Ri</h3><img src="images/note_extracted/ae-ri/img_main.png" alt="Ae-Ri"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="crater.html" class="auto-link">クレーター（レイダー）</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>ベンダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Ae-Ri</h1>', '<h1>Ae-Ri<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">エイ・リ</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/ae-ri.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

エイ・リ（Ae-Ri）
https://www.fallout-jp.com/ae-ri.html

概要

クレーターにおける武器商店「Guns, Guns, Guns」のベンダーを務める人間の女性です。仲間が現地調達した"盗品"を中心に取引していますが、パイプピストルやコンバットナイフばかり持ち込まれることにうんざりしています。

---

💭 感想

「さあ、76。私に売りたくてたまらないクレイジーなブツを持ってきたんだろ？」というレイダーらしい掛け声で取引に応じてくれる気の良い女性です。定期的にクレイジーな重武装の不要品をさばきに来るプレイヤーに対してはかなり好意的に接してくれます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/ae-ri', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/ae-ri/post.md', postContent);

console.log('Done.');
