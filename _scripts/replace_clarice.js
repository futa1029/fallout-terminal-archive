const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/clarice.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>クラリス（Clarice）</b>は、アパラチアの<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>で理容師（Barber）として働いている<a href="miss-nanny.html" class="auto-link">ミス・ナニー</a>です。</p>

            <h2>背景</h2>
<p>クラリスは、ホワイトスプリング・リゾート内のサロン「エレガンス（Elegance）」に配置されている4人の自動化されたロボット理容師のうちの一人です。このサロンは予約なしでの飛び込み客を受け付けていないため、<a href="vault-dweller.html" class="auto-link">Vault 76の居住者</a>（プレイヤー）は彼女たちから直接理美容のサービスを受けることはできません。</p>
<p>ただし、プレイヤーはメインメニューからいつでも自由に自身の外見を変更できるため、ゲームプレイ上は特に問題になりません。彼女に話しかけると「予約はされていますか？ 申し訳ありませんが、本日は予約でいっぱいです（Did you have an appointment? I'm afraid I'm all booked up for the day.）」と丁重に断られてしまいます。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ホワイトスプリング・モールの理容室で働いているロボット店員の一人です。<br>直接髪を切ってもらうことはできませんが、モール内を賑やかに彩るフレーバーNPCとして存在しています。戦前の高級リゾートならではの、ロボットによる手厚く行き届いたサービスを想起させる面白いキャラクターです。
            </div>
`;

// Replace infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Clarice</h3><img src="images/note_extracted/clarice/img_main.png" alt="Clarice"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="miss-nanny.html" class="auto-link">ミス・ナニー</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>理容師（Barber）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span>The Whitespring Resort</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Clarice</h1>', '<h1>Clarice<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">クラリス</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/clarice.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

クラリス（Clarice）
https://www.fallout-jp.com/clarice.html

概要

ホワイトスプリング・リゾートのモール内にあるサロン「エレガンス」で働く、ミス・ナニー型のロボット理容師。飛び込み客はお断りされています。

---

💭 感想

ホワイトスプリング・モールの理容室で働いているロボット店員です。直接プレイヤーの髪を切ってもらう機能はありませんが、モール内を彩るフレーバーNPCとして、戦前の高級リゾートならではの雰囲気を演出してくれます。話しかけると丁重に予約がいっぱいだと断られます（笑）

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/clarice', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/clarice/post.md', postContent);

console.log('Done.');
