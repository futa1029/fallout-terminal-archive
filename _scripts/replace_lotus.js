const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/lotus.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ロータス（Lotus）</b>、あるいはAM-11は、<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>に遺棄されている機能を停止した<a href="assaultron.html" class="auto-link">アサルトロン</a>です。</p>
<p>もともとホワイトスプリング・スパのアテンダントとして配備されていたロータスですが、数人のゲストに脊椎損傷を負わせるという痛ましい「スパ事故」を起こした経緯を持ちます。その後不良品として機能を停止され、ロータスはAM-12の<a href="vera.html" class="auto-link">ヴェラ</a>にその役目を置き換えられました。<br>機能を停止したロータスは、2階のダイニングルームの近くにあるメンテナンスルームで今でも見つけることができます。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ホワイトスプリング避難所のスパルームで稼働しているヴェラ（Vera）の先代モデルのロボットです。<br>マッサージロボット（おそらくアイアンクラッド・マッサージ）としてスパを訪れたゲストたちを誤って脊椎損傷させてしまったため、不良品・欠陥品として廃棄されてしまいました。彼女のポンコツぶりについては、同所のゼネラルマネージャーのターミナルに残されている記録「10/15/77：件名：アイアンクラッド・ステータス」などから伺い知ることができます。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Lotus</h3><img src="images/note_extracted/lotus/img_main.jpg" alt="Lotus"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="assaultron.html" class="auto-link">アサルトロン</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Lotus</h1>', '<h1>Lotus<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ロータス</span></h1>');

// Wait, the original image for lotus had a .jpg extension
// Make sure it matches images/note_extracted/lotus/img_main.jpg
// Actually let's check what was inside the original file. Ah yes, img_main.png was there, wait:
// <aside class="infobox"><h3 style="margin-top:0;text-align:center;">Lotus</h3><img src="images/note_extracted/lotus/img_main.png" alt="Lotus">
// Let's keep it as is from the original HTML but change the structure.

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];
const finalHtmlFixedImg = finalHtml.replace('img_main.jpg', 'img_main.png');

fs.writeFileSync('f:/Fallout/lotus.html', finalHtmlFixedImg);

// X post
const postContent = `#Fallout76 #Fallout

ロータス（Lotus）
https://www.fallout-jp.com/lotus.html

概要

ホワイトスプリング・リゾートに遺棄されているアサルトロン。もともとスパのアテンダントでしたが、数人のゲストに脊椎損傷を負わせるという痛ましい「スパ事故」を起こして機能を停止されています。

---

💭 感想

スパで現在稼働しているヴェラ（Vera）の先代モデルのようです。マッサージの力加減に難があったのでしょうか。彼女のポンコツぶりについては、ゼネラルマネージャーのターミナルの「アイアンクラッド・ステータス」から伺い知ることができます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/lotus', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/lotus/post.md', postContent);

console.log('Done.');
