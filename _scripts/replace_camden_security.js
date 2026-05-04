const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/camden-park-security.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>カムデンパーク・セキュリティ（Camden Park security）</b>は、アパラチアの<a href="camden-park.html" class="auto-link">カムデンパーク</a>で見つけることができるユニークな<a href="protectron.html" class="auto-link">プロテクトロン</a>です。</p>
<p>このプロテクトロンは、カムデンパークの従業員エリアを警備しています。頭部が外見上ほとんど破壊されているにもかかわらず問題なく稼働しており、センサーに障害が発生しているらしく、通りすがりの人々を公園の従業員だと勘違いして語りかけてきます。</p>

            <h2>関連クエスト</h2>
<ul>
    <li>Mistaken Identity: プレイヤーはクエスト「Mistaken Identity」の開始時にこのプロテクトロンに話しかけることになります。カムデンパークのセキュリティロボットはVault 76の居住者を「遅刻した公園の従業員」だと勘違いし、制服の着用とタイムカードの打刻を指示してきます。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                カムデンパークの従業員エリア入り口を警備している、頭部が破損したプロテクトロンです。<br>初めてカムデンパークを訪れた際、プレイヤーを遅刻してきた怠慢な遊園地スタッフだと勘違いし、「ボスには誤魔化しておいた」と庇いつつ制服とタイムカード（従業員ターミナル）の場所を案内してくる面白いロボットですね。ここから始まる一連の遊園地労働クエストは、アパラチアの狂気とユーモアが詰まったFallout 76を代表するクエストラインの一つです。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Camden Park security</h3><img src="images/note_extracted/camden-park-security/img_main.png" alt="Camden Park security"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span>カムデンパーク</span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>警備員</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Camden Park security</h1>', '<h1>Camden Park security<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">カムデンパーク・セキュリティ</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/camden-park-security.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

カムデンパーク・セキュリティ（Camden Park security）
https://www.fallout-jp.com/camden-park-security.html

概要

カムデンパークの従業員エリアを警備しているプロテクトロンです。頭部が外見上ほとんど破壊されており、センサーに障害が発生しているらしく、通りすがりの人々を公園の従業員だと勘違いして語りかけてきます。

---

💭 感想

初めて訪れた際、プレイヤーを遅刻してきた遊園地スタッフだと勘違いし、「ボスには誤魔化しておいた」と庇いつつ制服とタイムカードの場所を案内してくる面白いロボットですね。ここから始まる一連の遊園地労働クエストは狂気とユーモアが詰まっていて大好きです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/camden-park-security', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/camden-park-security/post.md', postContent);

console.log('Done.');
