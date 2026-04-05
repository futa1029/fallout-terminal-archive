const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/flintlock.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>フリントロック（Flintlock）</b>は、<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>のロボットベンダーの1体である<a href="mister-gutsy.html" class="auto-link">Mr.ガッツィー</a>です。型番はGM-04。</p>
<p>彼はホワイトスプリング・リゾートのショッピングモールエリアにある店舗「ブラックパウダー（Black Powder）」の店番をしており、軍の基地ではないにもかかわらず、訓練教官のような厳格な態度を維持しています。彼は様々な種類の弾薬や、遠距離・近接武器を販売しています。</p>

            <h2>販売アイテム</h2>
<p>彼は以下の設計図の唯一の供給源の1つです。</p>
<ul class="loot-list">
<li>設計図: 黒色火薬ライフル</li>
<li>設計図: 黒色火薬ピストル</li>
<li>設計図: レボリューショナリーソード</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ショッピングモールエリア内の武器屋「ブラックパウダー」を担当しているMr.ガッツィーのベンダーです。<br>リゾートホテル内という平和な場所であるにも関わらず、プレイヤーに「注目！」「点検待ちの武器と武装であります！」などと歴戦の訓練教官のような熱血な態度で接客してくるギャップが面白いロボットですね。黒色火薬系の武器設計図や弾薬を探している時によくお世話になります。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Flintlock</h3><img src="images/note_extracted/flintlock/img_main.png" alt="Flintlock"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="mister-gutsy.html" class="auto-link">Mr.ガッツィー</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>ベンダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Flintlock</h1>', '<h1>Flintlock<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">フリントロック</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/flintlock.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

フリントロック（Flintlock）
https://www.fallout-jp.com/flintlock.html

概要

ホワイトスプリング・リゾートのショッピングモール内の店舗「ブラックパウダー」を担当しているMr.ガッツィーです。軍の基地ではないにもかかわらず、訓練教官のような厳格な態度を維持しており、弾薬や無骨な武器類を販売しています。

---

💭 感想

リゾートホテル内という平和な場所であるにも関わらず、プレイヤーに「注目！」「点検待ちの武器と武装であります！」などと歴戦の訓練教官のような熱血な態度で接客してくるギャップが面白いロボットですね。黒色火薬系の武器設計図や弾薬を探している時によくお世話になります。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/flintlock', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/flintlock/post.md', postContent);

console.log('Done.');
