const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/flauresca.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>フローレスカ（Flauresca）</b>は、アパラチアの<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>にある衣料品店「ライブ・シック（Live Chic）」で衣料品<a href="vendor.html" class="auto-link">ベンダー</a>として働いている<a href="assaultron.html" class="auto-link">アサルトロン</a>です。</p>

            <h2>背景</h2>
<p>フローレスカは、<a href="the-great-war.html" class="auto-link">大戦</a>の直前にホワイトスプリング・リゾートが人間のスタッフを解雇し、その配置を置き換えるために導入したロボット・ベンダー・スタッフの一人です。彼女はホワイトスプリング・モールの店舗「ライブ・シック」に常駐しており、主にプレイヤーキャラクターに向けて日常的に着られる非公式な（カジュアルな）服を販売しています。</p>

            <h2>取り扱い商品</h2>
<ul class="loot-list">
    <li><a href="apparel.html" class="auto-link">アパレル類</a>（カジュアルな服や帽子など）</li>
</ul>
<p>※所持キャップは他のホワイトスプリング内ベンダーなどの各派閥ベンダーと共有（最大1400キャップ）されています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ホワイトスプリング・モール内で服屋を営んでいるアサルトロンの店員です。<br>女性的で上品な口調で接客をしてくれます。「Live Chic」という洒落たブティックを任されており、カジュアルな洋服や各種帽子などを取り扱っています。イベントに着ていく衣装を調達する際に覗いてみると、掘り出し物が見つかるかもしれません。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Flauresca</h3><img src="images/note_extracted/flauresca/img_main.png" alt="Flauresca"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="assaultron.html" class="auto-link">アサルトロン</a>（ベンダー）</span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">担当</span><span>衣料品店「ライブ・シック」</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Flauresca</h1>', '<h1>Flauresca<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">フローレスカ</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/flauresca.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

フローレスカ（Flauresca）
https://www.fallout-jp.com/flauresca.html

概要

ホワイトスプリング・リゾートのモール内にある衣料品店「ライブ・シック（Live Chic）」でベンダーとして働いているアサルトロンです。大戦の直前に人間のスタッフの代わりに導入されました。

---

💭 感想

ホワイトスプリング・モール内で小洒落た服屋を営んでいるアサルトロンの店員です。カジュアルな洋服のパターンなどが欲しい時や、イベントに着ていく衣装を調達する際に覗いてみると、掘り出し物が見つかるかもしれません。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/flauresca', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/flauresca/post.md', postContent);

console.log('Done.');
