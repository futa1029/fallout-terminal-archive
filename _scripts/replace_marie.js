const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/marie-fallout-76.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>マリー（Marie）</b>は、大戦の少し前に人間のスタッフと代わって配置された、十数体ほどのロボットベンダーの1体です。</p>
<p>彼女は<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>のショッピングモールエリア内にある店舗「ル・グラン・グルメ（Le Grand Gourmet）」におり、フランス語訛りの<a href="miss-nanny.html" class="auto-link">ミス・ナニー</a>として活動しています。主に様々な食品やそれらに関連するアイテムをプレイヤーに販売してくれます。</p>
<p>マリーは、合成食品ばかり食べてきたVault居住者たちの料理の質が貧弱であることを見下しています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ル・グラン・グルメの店主を務めるフランス語訛りのミス・ナニーです。<br>Vaultの合成食品ばかり食べてきた居住者たちを「貧乏舌」だとバカにしてくるのがなんだか憎めなくて可愛いキャラクターですね。モール内にいる他のベンダーたちと同じく、ホワイトスプリングの改修後もずっとこの場所で働き続けています。レストラン経営のこだわりを感じるセリフがいちいち面白いです！
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Marie</h3><img src="images/note_extracted/marie-fallout-76/img_main.png" alt="Marie"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="miss-nanny.html" class="auto-link">ミス・ナニー</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>ベンダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Marie</h1>', '<h1>Marie<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">マリー</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/marie-fallout-76.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

マリー（Marie）
https://www.fallout-jp.com/marie-fallout-76.html

概要

ホワイトスプリング・リゾートのショッピングモール内の店舗「ル・グラン・グルメ」を担当しているフランス語訛りのミス・ナニーです。主人公たちVault居住者の料理の質が貧弱だと見下してくる、ある意味こだわりの強い料理人ベンダーです。

---

💭 感想

Vaultの合成食品ばかり食べてきた居住者たちを「貧乏舌」だとバカにしてくるのがなんだか憎めなくて可愛いキャラクターですね。モール内にいる他のベンダーたちと同じく、ホワイトスプリングの改修後もずっとこの場所で働き続けています。レストラン経営のこだわりを感じるセリフがいちいち面白いです！

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/marie-fallout-76', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/marie-fallout-76/post.md', postContent);

console.log('Done.');
