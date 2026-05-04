const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/xavier.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ザビエル（Xavier）</b>は、ゲーム内では単に「入植者」とも呼ばれる、<a href="anchor-farm.html" class="auto-link">アンカー農場</a>に住む農場労働者です。</p>
<p>ザビエルは2103年にダニエルのグループと共にアパラチアへ旅してきました。彼は農家の裏手で日中は小さな農地の区画で働き、夜は近くの給水塔の上に建てられた小屋で眠っています。<br>
彼はよそ者を信用しておらず、話しかけようとするプレイヤーのあらゆる試みに対して無礼な態度で返してきます。</p>

            <h2>補足</h2>
<ul>
    <li>ザビエルには様々な衣服のバリエーションが用意されており、訪問するたびに異なる服装をしていることがあります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                アンカー農場に入植したダニエル一行の一人ですね。<br>日中はせっせと畑を耕しており、話しかけても「自分たちのことに専念している。お前もそうしたらどうだ」などと冷たくあしらなわれます。彼が夜寝ている給水塔の上の小屋は、限られた物資で上手く作られたレイダー対策のような拠点感があって面白いです。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Xavier</h3><img src="images/note_extracted/xavier/img_main.png" alt="Xavier"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="anchor-farm.html" class="auto-link">アンカー農場</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>農地労働者</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Xavier</h1>', '<h1>Xavier<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ザビエル</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/xavier.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ザビエル（Xavier）
https://www.fallout-jp.com/xavier.html

概要

アンカー農場に入植した人間NPCです。ゲーム内では単に「入植者」とも表記されています。日中は小さな農地の区画で働き、夜は近くの給水塔の上に建てられた小屋で眠っています。よそ者を信用しておらず、話しかけても無愛想です。

---

💭 感想

日中はせっせと畑を耕しており、話しかけても「自分たちのことに専念している。お前もそうしたらどうだ」などと冷たくあしらなわれます。彼が夜寝ている給水塔の上の小屋は、限られた物資で上手く作られたレイダー対策のような拠点感があって面白いです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/xavier', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/xavier/post.md', postContent);

console.log('Done.');
