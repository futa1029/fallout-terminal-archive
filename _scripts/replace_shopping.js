const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/shopping-mall-vendor.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ショッピングモール・ベンダー（Shopping mall vendor）</b>は、アパラチアの<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>で稼働している<a href="protectron.html" class="auto-link">プロテクトロン</a>です。</p>
<p>このロボットは、最終戦争の直前、ホワイトスプリング・リゾートが人間のスタッフを解雇して置き換えた多数のロボットベンダーの1体です。リゾート地下のショッピングモール内の店舗「オーラム（Aurum）」で、同僚のアサルトロンである<a href="helena-fallout-76.html" class="auto-link">ヘレナ</a>と共に配置されています。他の派閥ベンダーと同様に、設計図やその他の様々なアイテムを販売しています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ホワイトスプリング・リゾートの地下ショッピングモールで稼働している、派閥に属さない中立のプロテクトロンベンダーです。<br>Wild Appalachiaアップデートでモール内に各派閥のベンダーが一斉に追加された際、空き店舗を埋めるように配置されました。プレイヤーのキャップ取引枠は他のベンダーと共通ですが、彼ら固有の特別な販売アイテムや個性的なダイアログがあるわけではなく、もっぱらショーケースの裏で店舗を維持しているだけの無個性な存在となっています。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Shopping mall vendor</h3><img src="images/note_extracted/shopping-mall-vendor/img_main.png" alt="Shopping mall vendor"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>ベンダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Shopping mall vendor</h1>', '<h1>Shopping mall vendor<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ショッピングモール・ベンダー</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/shopping-mall-vendor.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ショッピングモール・ベンダー（Shopping mall vendor）
https://www.fallout-jp.com/shopping-mall-vendor.html

概要

ホワイトスプリング・リゾート地下の店舗「オーラム」で稼働しているプロテクトロンです。他のロボットベンダーと同様、戦争の直前に解雇された人間スタッフの代わりとして配置されています。

---

💭 感想

Wild Appalachiaアップデートでモール内に各派閥のベンダーが一斉に追加された際、空き店舗を埋めるように配置された中立のプロテクトロンです。特別なアイテムや独自のダイアログがあるわけではなく、もっぱら無言でショーケースの裏に佇んでいるだけの無個性な存在となっています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/shopping-mall-vendor', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/shopping-mall-vendor/post.md', postContent);

console.log('Done.');
