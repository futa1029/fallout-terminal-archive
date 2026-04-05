const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/the-forest.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>森林地帯（The Forest）</b>は、アパラチアの8つの地域のうちの一つです。ここは、Vault 76の居住者が<a href="vault-76.html" class="auto-link">Vault 76</a>から外の世界へと足を踏み入れた際に、最初に探索を開始することになる地域です。</p>

            <h2>特徴</h2>
<p>アパラチアの森林地帯は、起伏に富んだ地形に育つ豊穣な森、曲がりくねった川、そして多様な動植物の生態系を特徴としており、食料や水を求めるスカベンジャーたちに豊富な資源を提供しています。<br>このエリアには、<a href="charleston.html" class="auto-link">チャールストン</a>、<a href="flatwoods.html" class="auto-link">フラットウッズ</a>、そして<a href="point-pleasant.html" class="auto-link">ポイント・プレザント</a>などの戦前の大きな居住地がいくつか含まれており、<a href="landview-lighthouse.html" class="auto-link">ランドビュー灯台</a>などの著名なランドマークも存在します。この地域を構成するエリアは主に、カナワ川にちなんで名付けられた実在の「カナワ郡」の周辺に相当します。</p>
<p>大戦の核の炎による被害がアパラチアの他の地域よりも比較的少なかったとはいえ、この森の地域でも依然として突然変異を起こした動植物が多数生息しています。Vault 76は、農地や伐採地を含む緑豊かな森の谷間の北側の斜面に位置しています。<br>ポイント・プレザントの街には<a href="mothman.html" class="auto-link">モスマン</a>を崇拝するカルト教団の拠点が形成されており、また地域の北部では<a href="toxic-valley.html" class="auto-link">毒の谷</a>と国境を接しています。</p>
<p>Vault 76の周辺地域を含む森林地帯の一部は、プレイヤーからの核攻撃（ICBM）のターゲットに指定できず、核ミサイルを落とすことができない「安全地帯設定（グリーンゾーン）」となっています。<br>また、2082年12月25日の「クリスマスの大洪水」を契機としてサマーズビル湖の水は干上がり、現在はほぼ完全に底が見える状態になっており、その中心にはスーパーミュータントの拠点である「<a href="new-gad.html" class="auto-link">ニューガド</a>」が存在しています。一方で、かつてのチャールストンの街はその洪水によって押し流されて壊滅し、現在は水浸しになった瓦礫の廃墟と化しています。</p>

            <h2>補足</h2>
<ul>
    <li>パッチ1.7.8.8より前は、森林地帯にレジェンダリーの敵が自然湧き（スポーン）することはありませんでした。初心者向けのエリアということもあり他の地域に比べて出現レベルの範囲設定が低くなっています。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                Fallout 76を開始して一番最初に訪れることになる、緑豊かなエリアです。<br>アパラチアマップの西側に位置しており、プレイヤーに序盤のチュートリアル的な要素を提供する優しい初心者向けのエリアでもあります。ここの「Vault 76周辺地域」はシステムによって保護されており、プレイヤーが核ミサイルを撃ち込もうとしてもターゲットの着弾地点に指定できない仕組みになっています（※他のエリアから引っ張ってきた核のブラストゾーンは適用されます）。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">The Forest</h3><img src="images/note_extracted/the-forest/img_main.jpg" alt="The Forest"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="locations.html" class="auto-link">地域</a>（領域）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>アパラチア全域</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div class="quote-box">';

const preamble = content.split(startMarker)[0];
const parts = content.split(endMarker);
const endSections = parts[1].split('<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">')[1];

const finalHtml = preamble + newContent + '\\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\\n' + endSections;

fs.writeFileSync('f:/Fallout/the-forest.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

森林地帯（The Forest）
https://www.fallout-jp.com/the-forest.html

概要

アパラチアの8つの地域のうちの一つ。Vault 76を出た居住者が最初に探索することになるエリアです。緑豊かで豊富な資源があり、核攻撃を直接撃ち込むことができない初心者向けの安全地帯として設定されています。

---

💭 感想

Fallout 76を開始して一番最初に訪れることになるエリアです。プレイヤーに序盤のチュートリアル的な要素を提供する優しい地域であり、Vault 76の付近はプレイヤーが核ミサイルを撃ち込もうとしてもターゲットに指定できない仕組みになっています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/the-forest', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/the-forest/post.md', postContent);

console.log('Done.');
