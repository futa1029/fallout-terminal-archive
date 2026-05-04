const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/toxic-valley.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>トキシックバレー（Toxic Valley）</b>は、アパラチアの8つの地域の一つです。</p>
<p>生存者たちからトキシックバレーとして知られるこの地域は、森林地帯の真北に位置しており、白く有毒な工業用粉末で覆われ、汚染された水源で満たされています。この荒涼とした風景の中心に位置する<a href="grafton-steel.html" class="auto-link">グラフトン鉄鋼</a>は、渓谷の中心都市であるグラフトンの経済発展を推進する原動力でした。</p>
<p>製鉄所からの長年の汚染が環境を破壊し、川を汚染したため、グラフトンは急激な衰退に直面しました。その一方で、労働者たちは自分たちの仕事を奪い、家族を無一文にする自動化の波（ロボットの導入）に反対して激しいストライキを起こしました。汚染は<a href="grafton-dam.html" class="auto-link">グラフトン・ダム</a>によって何とか食い止められています。これは本来製鉄所に電力を供給するために建設されたものですが、現在はトキシックバレーの汚染水で満たされています。</p>
<p>グラフトン湖やその他の死の危険がある水域には、おぞましい水生生物である<a href="mirelurk-fallout-76.html" class="auto-link">マイアラーク</a>や<a href="angler.html" class="auto-link">アングラー</a>などが生息しています。この地域にはグラフトン湖に続く大きな川もあります。トキシックバレーには他にも、<a href="clarksburg-shooting-club.html" class="auto-link">クラークスバーグ射撃クラブ</a>、<a href="hemlock-holes.html" class="auto-link">ヘムロック・ホールズ</a>、<a href="pioneer-scout-camp.html" class="auto-link">パイオニアスカウトのキャンプ</a>、<a href="wavy-willards-water-park.html" class="auto-link">ウェービー・ウィラーズ・ウォーターパーク</a>など、戦前の豊富な観光名所が廃墟として残されています。</p>

            <h2>特徴</h2>
<p>大戦後、戦前からの深刻な環境汚染と核兵器のフォールアウトが結合し、トキシックバレーの白い荒野はおぞましいビーストたちで溢れかえりました。彼らは荒廃した土地を徘徊し、大破壊を生き延びたわずかな植物や犠牲者を貪り食っています。</p>
<p>青白い灰に覆われた風景は乾燥し、起伏に富み、葉の枯れ落ちた木々が立ち並んでいます。夜になると、川沿いを中心に地面の放射能が不気味な光を放ちます。また、ここでは<a href="radstag.html" class="auto-link">ラッドスタッグ</a>の大きな群れに遭遇することがあります。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                アパラチアの北部一帯に広がる、白い有毒な粉末に汚染された地域です。<br>緑豊かな森林地帯からうってかわっての荒涼とした風景が特徴的で、スナリーギャスターやグラフトンモンスターなどの不気味なクリーチャーが跋扈しています。一帯にはグラフトン市長（人工知能）からの通信が響き渡っており、Wastelanders・アップデート以降はクレーターのレイダーたちも進出しています。「きれいな水」を採取できる水場がほとんど存在しないという、サバイバル上の厳しい特徴もあります。
            </div>
`;

// Extract proper HTML content structure without messing it up
const startMarker = '<h2>概要</h2>';
const endMarker = '<div class="quote-box">';

const preamble = content.split(startMarker)[0];
const endSections = content.split('</div>\\n\\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">')[1];

const finalHtml = preamble + newContent + '\\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\\n' + endSections;

fs.writeFileSync('f:/Fallout/toxic-valley.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

トキシックバレー（Toxic Valley）
https://www.fallout-jp.com/toxic-valley.html

概要

アパラチアの8つの地域の一つ。森林地帯の真北に位置しており、白く有毒な工業用粉末で覆われ、汚染された水源で満たされています。戦前からの深刻な環境汚染と大戦争時の放射能が結びついています。

---

💭 感想

緑豊かな森林地帯からうってかわって荒涼とした風景が特徴的で、スナリーギャスターなどの不気味なクリーチャーが跋扈しています。一帯にはグラフトン市長（AI）からの通信が響き渡っており、「きれいな水」を採取できる水場がほとんど存在しない厳しい環境サバイバルエリアでもあります。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/toxic-valley', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/toxic-valley/post.md', postContent);

console.log('Done.');
