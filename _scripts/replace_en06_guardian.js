const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/en06-guardian.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>EN06 Guardian（EN-06 ガーディアン）</b>は、アパラチアの<a href="gleaming-depths.html" class="auto-link">Gleaming Depths（輝く深淵）</a>に登場する巨大なボスクリーチャーです。</p>
<p>有望な「プロジェクト: ヴァルカン（Project Vulcan）」を極秘に収容する地下施設を守るため、<a href="enclave.html" class="auto-link">エンクレイヴ</a>の技術者たちは、施設の最も脆弱な入り口を警備させる巨大な防衛機構として、基本となる<a href="sentry-bot.html" class="auto-link">セントリーボット</a>に対して大規模な改造とスケールアップを施しました。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                パブリックイベント（レイド）である「Gleaming Depths（輝く深淵）」に登場する巨大なセントリーボット型のボス敵です。<br>エンクレイヴの技術によって施設の入り口の防衛用に異常なまでに魔改造された機体であり、通常のセントリーボットよりも遥かに巨大な体躯と強力な武装を備えています。プロジェクト: ヴァルカンを調査しようと足を踏み入れる者たちに対して、容赦のない広範囲の弾幕攻撃を展開します。
            </div>
`;

// Fix the infobox and its weird formatting
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">EN06 Guardian</h3><img src="images/note_extracted/en06-guardian/img_main.png" alt="EN06 Guardian"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="sentry-bot.html" class="auto-link">セントリーボット</a>（ボス）</span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="enclave.html" class="auto-link">エンクレイヴ</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>施設防衛機構</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="gleaming-depths.html" class="auto-link">Gleaming Depths</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>EN06 Guardian</h1>', '<h1>EN06 Guardian<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">EN-06 ガーディアン</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/en06-guardian.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

EN06 Guardian（EN-06 ガーディアン）
https://www.fallout-jp.com/en06-guardian.html

概要

「輝く深淵（Gleaming Depths）」の巨大なボス・セントリーボット。エンクレイヴの極秘施設を守るため、技術者たちによって大規模な改造と巨大化が施された防衛機構です。

---

💭 感想

パブリックイベントのレイドボスとして立ち塞がる超巨大なセントリーボットです。プロジェクト: ヴァルカンに関わる地下施設を守るため、通常の個体とは比較にならない強力な武装でプレイヤーを迎え撃つレイドの目玉の一つです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/en06-guardian', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/en06-guardian/post.md', postContent);

console.log('Done.');
