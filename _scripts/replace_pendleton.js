const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/pendleton.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ペンドルトン（Pendleton）</b>は、大戦の少し前に人間のスタッフと代わって配置された、十数体ほどのロボットベンダーの1体です。</p>
<p>彼は<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>のショッピングモールエリア内にある店舗「スタジオ58（Studio 58）」におり、<a href="protectron.html" class="auto-link">プロテクトロン</a>として活動しています。主に彫像、ベンチ、その他さまざまな芸術作品など、ホワイトスプリング・リゾートに関連するC.A.M.P.アイテムの設計図をプレイヤーに販売してくれます。</p>

            <h2>販売アイテ厶</h2>
<p>彼は以下の設計図の唯一の供給源の1つです。</p>
<ul class="loot-list">
<li>設計図: リゾートのベンチ</li>
<li>設計図: リゾートの椅子</li>
<li>設計図: リゾートの布張りの椅子</li>
<li>設計図: リゾートのカウチ</li>
<li>設計図: リゾートのランプ</li>
<li>設計図: リゾートの鏡</li>
<li>設計図: リゾートの絵画</li>
<li>設計図: リゾートのプランター</li>
<li>設計図: リゾートの看板</li>
<li>設計図: リゾートのテーブル</li>
<li>設計図: リゾートのゴミ箱</li>
<li>設計図: リゾートの壺</li>
<li>設計図: ホワイトスプリングの胸像</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ショッピングモールエリア内の店舗「スタジオ58」を担当しているプロテクトロンのベンダーです。<br>彼からは「リゾート〜」と名のつくアンティーク家具類や、各種の像のC.A.M.P.設計図を購入することができます。ホワイトスプリングの専属アート・ギャラリーという位置づけのようで、気品と洗練を重んじるような特別なセリフが用意されているのが面白いキャラクターですね。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Pendleton</h3><img src="images/note_extracted/pendleton/img_main.png" alt="Pendleton"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>ベンダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Pendleton</h1>', '<h1>Pendleton<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ペンドルトン</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/pendleton.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ペンドルトン（Pendleton）
https://www.fallout-jp.com/pendleton.html

概要

ホワイトスプリング・リゾートのショッピングモール内の店舗「スタジオ58」を担当しているプロテクトロンのベンダーです。彫像、ベンチ、その他さまざまな芸術作品など、ホワイトスプリング・リゾートのアンティーク家具に関連するC.A.M.P.アイテムの設計図を販売しています。

---

💭 感想

彼からは「リゾート〜」と名のつくアンティーク家具類や、各種の胸像のC.A.M.P.設計図を購入することができます。ホワイトスプリングの専属アート・ギャラリーという位置づけのようで、気品と洗練を重んじるような特別なセリフが用意されているのが面白いキャラクターですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/pendleton', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/pendleton/post.md', postContent);

console.log('Done.');
