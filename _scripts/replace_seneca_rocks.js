const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/seneca-rocks.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>セネカ・ロックス（Seneca Rocks）</b>は、アパラチアの<a href="savage-divide.html" class="auto-link">荒れた境域</a>にあるロケーションです。</p>
<p>大戦前のウエストバージニアにおいて最も絵になるロケーションの一つであったセネカ・ロックスは、リバーノブスの北端にある険しい尾根のおかげで、象徴的で際立った外観を持つ珪岩の巨大な岩山です。この岩山は、1943年から1944年にかけて陸軍第10山岳師団がイタリアのアペニン山脈での過酷な戦闘に備えるための訓練場として使用されていました。</p>

            <h2>レイアウト</h2>
<p>セネカ・ロックスは、切り立った岩肌、険しい崖、ギザギザとした地形で構成される大きな岩山です。この目立つ地質学的構造物は周囲の風景よりもはるかに高くそびえ立っており、北の峰と南の峰、そして68号線を見下ろす中央のくぼみで構成されています。2103年の時点（Wastelanders以降）では、東側の崖面に串刺しにされた謎の巨大なハゲワシ（Vulture）の死骸が存在しています。</p>
<p><a href="seneca-rocks-visitor-center.html" class="auto-link">セネカ・ロックス・ビジターセンター</a>から始まるハイキングコースは、ロケーション西側の様々な台地に沿って分岐しており、そのうちの一つの小道は<a href="fort-atlas.html" class="auto-link">ATLAS観測所</a>へと続いています。同様に、細長い未舗装の小道が<a href="pleasant-valley-cabins.html" class="auto-link">プレザントバレー・キャビン</a>から北に向かってセネカ・ロックスの南西部の崖に入り、岩山の東側に回り込むように分岐しています。また、血まみれの岩でマークされた隠しルートにも分岐しており、そこはミステリー・オブ・オーダーの<a href="shannon-rivers.html" class="auto-link">シャノン・リバーズ</a>とオリビアの遺体へと続いています。</p>
<p>峰には基本的にアクセスできませんが、ジェットパックや変異（有袋類）を駆使すれば、ギザギザで険しい地形のため困難ではあるものの岩山の北側から北の峰に登ることができます。南の峰には、中央のくぼみを越えて北の峰からジャンプすることでのみアクセスできます。南の峰の頂上では、岩の上にチョークで「astropanda rowan seneca」という文字が書かれており、茂みの中に中国製パンダのぬいぐるみとジャンブル・ザ・ムーンモンキーを見つけることができます。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b>校長シャノン・リバーズのログインID</b>：<a href="shannon-rivers.html" class="auto-link">シャノン・リバーズ</a>の死体から回収可能。<a href="riverside-manor.html" class="auto-link">リバーサイド邸</a>のクリプトス端末にアクセスする権限を得る。</li>
    <li><b>ラーの目</b>：<a href="eye-of-ra.html" class="auto-link">オーダー・オブ・ミステリー</a>に関連するブローチ型アクセサリー。シャノン・リバーズの死体から回収可能。</li>
    <li><b>シャノン・リバーズの記録</b>：ホロテープ。シャノン・リバーズの死体から回収可能。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                アパラチアの中央にそびえ立つ雄大な岩山であり、象徴的なランドマークでもあります。<br>ミステリー・オブ・オーダーのクエストラインで訪れることになる悲劇的な結末の地ですが、それ以外にもお楽しみ要素があります。有袋類やジェットパックを駆使して登山家気分で岩山を登りきると、頂上で謎のパンダとJanglesが仲良く座っているイースターエッグを発見することができます。また、Wastelanders以降は山の側面に謎の巨大なハゲワシ（ゲーム内には生きた個体としては未実装）が串刺しになって死没しており、こちらも考察がはかどる謎の一つです。
            </div>
`;

// Extract proper HTML content structure without messing it up
const startMarker = '<h2>概要</h2>';
const endMarker = '<div class="quote-box">';

const preamble = content.split(startMarker)[0];
const endSections = content.split('</div>\\n\\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">')[1];

const finalHtml = preamble + newContent + '\\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\\n' + endSections;

fs.writeFileSync('f:/Fallout/seneca-rocks.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

セネカ・ロックス（Seneca Rocks）
https://www.fallout-jp.com/seneca-rocks.html

概要

アパラチアの荒れた境域にある、象徴的で際立った外観を持つ珪岩の巨大な岩山です。大戦前のウエストバージニアにおいて最も絵になるロケーションの一つであり、1943年頃には部隊の訓練場として使用されていました。

---

💭 感想

アパラチアの中央にそびえ立つ雄大なランドマークです。ミステリー・オブ・オーダーの悲劇的な結末の地でもあります。有袋類やジェットパックを駆使して岩山を登りきると、頂上でパンダとJanglesが仲良く並んでいるイースターエッグを発見することができます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/seneca-rocks', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/seneca-rocks/post.md', postContent);

console.log('Done.');
