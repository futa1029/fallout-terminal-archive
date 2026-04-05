const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/supervisor-danforth.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>監督官ダンフォース（Supervisor Danforth）</b>は、<a href="vault-tec-agricultural-research-center.html" class="auto-link">Vault-Tec農業研究センター</a>で見つけることができる<a href="protectron.html" class="auto-link">プロテクトロン</a>です。</p>
<p>彼は研究センターにいる「Mr.ファームハンド」ロボットたちの部隊を統括する役割を担うプロテクトロンです。施設のメインビルの裏にある小屋で見つけることができ、プレイヤーを視認するとすぐに攻撃してきます。</p>

            <h2>関連クエスト</h2>
<ul>
    <li><a href="fertile-soil.html" class="auto-link">Fertile Soil</a>: 彼を含む監督官プロテクトロンを破壊することがクエストの目標となります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                Vault-Tec農業研究センターの裏手にある物置小屋に配置されている、暴走したプロテクトロンです。<br>このエリアはゲーム最序盤のパブリックイベント「Fertile Soil」の舞台となりますが、ダンフォースはその討伐目標となるユニークエネミーとして登場します。「監督官チャッティンガム」「監督官ウェリントン」などのいずれか1体がランダムでスポーンする仕組みになっています。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Supervisor Danforth</h3><img src="images/note_extracted/supervisor-danforth/img_main.png" alt="Supervisor Danforth"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="vault-tec-corporation.html" class="auto-link">Vault-Tec</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>監督官</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Supervisor Danforth</h1>', '<h1>Supervisor Danforth<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">監督官ダンフォース</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/supervisor-danforth.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

監督官ダンフォース（Supervisor Danforth）
https://www.fallout-jp.com/supervisor-danforth.html

概要

Vault-Tec農業研究センターで見つけることができるプロテクトロンです。「Mr.ファームハンド」たちを統括する役割を担っており、施設の裏にある小屋で見つけることができます。

---

💭 感想

パブリックイベント「Fertile Soil」の討伐目標となるユニークエネミーです。「監督官チャッティンガム」など複数いる監督官のいずれか1体がランダムでスポーンする仕組みになっています。初心者が最初に戦うことになる名有りのボスエネミーかもしれません。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/supervisor-danforth', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/supervisor-danforth/post.md', postContent);

console.log('Done.');
