const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/robinson.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>警備主任ロビンソン（Security Chief Robinson）</b>は、アパラチアの<a href="vault-tec-university.html" class="auto-link">Vault-Tec大学</a>で稼働している<a href="mister-handy.html" class="auto-link">Mr.ハンディ</a>です。</p>
<p>ロビンソンは、大学の地下にあるシミュレーションVault内で「警備主任」としての役割を演じているMr.ハンディです。<a href="professor-bot.html" class="auto-link">プロフェッサー・ボット</a>によって課された試験を通過しようとするプレイヤーに対して、現在の状況の一般的な概要を提供してくれます。</p>

            <h2>関連クエスト</h2>
<ul>
    <li><a href="overseer-overseen.html" class="auto-link">Overseer, Overseen</a>: ロビンソンはクエストの説明を行い、完了に不可欠な存在です。プレイヤーは原子炉で実際に何が起こったのかの証拠を見つけ、ブラスやロリスを逮捕するか、彼らに気づきを与えるといった結末を迎えることになります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                Vault-Tec大学の地下に作られたシミュレーションVault内で稼働しているMr.ハンディです。<br>シミュレーション内の登場人物である「警備主任」としての役柄（配役）を与えられて立ち回っており、メインクエストにおける試験での状況概要を説明してくれます。アパラチアは本当に塗装の違うMr.ハンディ系列ロボットたちが様々な役回りで登場するので、各ロケーションを巡るのが楽しいですね。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Security Chief Robinson</h3><img src="images/note_extracted/robinson/img_main.png" alt="Security Chief Robinson"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="mister-handy.html" class="auto-link">Mr.ハンディ</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="vault-tec-university.html" class="auto-link">Vault-Tec大学</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>警備主任（役員）</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Security Chief Robinson</h1>', '<h1>Security Chief Robinson<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">警備主任ロビンソン</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/robinson.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

警備主任ロビンソン（Security Chief Robinson）
https://www.fallout-jp.com/robinson.html

概要

Vault-Tec大学の地下にあるシミュレーションVaultで「警備主任」の役割を演じているMr.ハンディです。プロフェッサー・ボットによって課された試験を通過しようとするプレイヤーに対して、状況の概要を提供してくれます。

---

💭 感想

シミュレーション内の登場人物である「警備主任」という劇の役回りを与えられて稼働しており、メインクエストにおける試験の状況を説明してくれます。アパラチアは本当に色々なMr.ハンディ系列ロボットたちが専用の役柄で登場するので、各地を巡るのが楽しいですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/robinson', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/robinson/post.md', postContent);

console.log('Done.');
