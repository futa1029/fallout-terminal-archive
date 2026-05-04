const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/cherise.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>シェリーズ（Cherise）</b>は、アパラチアの<a href="the-wayward.html" class="auto-link">ウェイワード</a>の店内に滞在している影響力のある女性NPCです。彼女はWastelandersのメインクエストラインの最終完了クエスト「<a href="secrets-revealed.html" class="auto-link">Secrets Revealed</a>」をクリアするとウェイワードの店内に現れるようになります。</p>
<p>2103年のある時点でウェイワードへやって来たシェリーズは、アパラチア中に多様なコネクションを持っていると主張しています。彼女はプレイヤーに対して、<a href="the-crater.html" class="auto-link">クレーター</a>（レイダーたち）または<a href="foundation.html" class="auto-link">ファウンデーション</a>（入植者たち）と敵対してしまった場合に、代行して対象組織との評判を「修復」するビジネス・サービスを提供しています。</p>

            <h2>プレイヤーとの関わり</h2>
<p>プレイヤーのキャラクターがクレーターのレイダー、またはファウンデーションの入植者との評判（Reputation）を悪化させ、派閥から「敵対的（Hostile）」とみなされる状態まで関係を低下させてしまった場合、ウェイワードにいるシェリーズに多額のキャップを支払うことで、プレイヤーの評判を即座に「敵対的」から「警戒（Cautious）」レベルへと引き上げ（＝リセットさせ）ることができます。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                メインクエスト「Wastelanders」を完了すると、初期の街にある酒場「ウェイワード」の店内に現れるNPCです。<br>派閥の好感度を最低値まで下げてしまった時の救済措置を提供するシステム的な役割を持ったキャラクターです。各派閥の評判が最低値まで低下すると、その派閥の暗殺部隊（敵対NPC）がパトロール代わりにプレイヤーを襲撃してくるようになります。この状態になった際、彼女に500キャップを支払うことで手配を即座に取りやめさせ、派閥との関係を「警戒」の中立ラインにまで戻してくれます。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Cherise</h3><img src="images/note_extracted/cherise/img_main.png" alt="Cherise"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-wayward.html" class="auto-link">ウェイワード</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>「インフルエンサー」</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Cherise</h1>', '<h1>Cherise<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">シェリーズ</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/cherise.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

シェリーズ（Cherise）
https://www.fallout-jp.com/cherise.html

概要

メインクエスト「Secrets Revealed」完了後、ウェイワードに現れる女性です。レイダーや入植者との関係が「敵対的」になってしまった場合、彼女にキャップを支払うことで評判を修復するサービスを提供しています。

---

💭 感想

派閥の好感度を最低値まで下げてしまった場合の救済措置として存在するNPCです。派閥との評判が「敵対」になると暗殺部隊がプレイヤーを襲うようになりますが、彼女に500キャップ支払うことで即座に関係を中立まで戻してくれます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/cherise', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/cherise/post.md', postContent);

console.log('Done.');
