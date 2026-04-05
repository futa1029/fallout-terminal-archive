const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/cunningham-fallout-76.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>カニンガム（Cunningham）</b>は、<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>のロボットベンダーの1体である<a href="mister-handy.html" class="auto-link">Mr.ハンディ</a>です。</p>
<p>カニンガムは、最終戦争の直前、ホワイトスプリング・リゾートが人間のスタッフを解雇して置き換えた十数体のロボットベンダーのうちの1体です。彼はホワイトスプリング・ショッピングモールエリアの店舗「クリークサイド・ロッジ（Creekside Lodge）」におり、主にアーマーや武器に関するアイテムをプレイヤーに販売しています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ホワイトスプリング・リゾートの地下ショッピングモール内の狩猟用品店「クリークサイド・ロッジ」を担当しているMr.ハンディのベンダーです。<br>狩猟用品やアーマー類を主に扱っており、「現代のコンバットアーマーはあまりスポーツらしくありませんね」などと、英国紳士風のMr.ハンディならではの視点で装備品について語るセリフが用意されています。ハンティングライフルやボウ、アーマー関連のアイテム設計図が必要な際によくお世話になるロボットですね。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Cunningham</h3><img src="images/note_extracted/cunningham-fallout-76/img_main.png" alt="Cunningham"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="mister-handy.html" class="auto-link">Mr.ハンディ</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>ベンダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Cunningham</h1>', '<h1>Cunningham<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">カニンガム</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/cunningham-fallout-76.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

カニンガム（Cunningham）
https://www.fallout-jp.com/cunningham-fallout-76.html

概要

ホワイトスプリング・リゾートのショッピングモール内の店舗「クリークサイド・ロッジ」を担当しているMr.ハンディです。主にアーマーや武器に関するアイテムを販売しています。

---

💭 感想

狩猟用品やアーマー類を扱っており、「現代のコンバットアーマーはあまりスポーツらしくありませんね」などと、英国紳士風の視点で装備品について語るのが面白いです。ハンティングライフルやボウ、アーマー関連の設計図が必要な際によくお世話になるロボットですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/cunningham-fallout-76', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/cunningham-fallout-76/post.md', postContent);

console.log('Done.');
