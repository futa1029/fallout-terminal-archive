const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/sacramental-glade.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>聖別の空地（Sacramental Glade）</b>は、アパラチアの<a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a>地域にあるロケーションです。</p>
<p>以前は「クランベリーの空き地（Cranberry Glade）」と呼ばれていましたが、『Once in a Blue Moon』アップデート時に<a href="cult-of-the-mothman.html" class="auto-link">カルト・オブ・モスマン</a>によって占拠・改修され、現在の名称に変更されました。<br>パブリックイベント「Beasts of Burden」の舞台となります。</p>

            <h2>背景</h2>
<p>聖別の空地は、戦前には公園として機能していた天然のクランベリーが自生する林間地でした。沼地の茂みの中に張り巡らされた網目状の木製の歩道などで構成されていました。<br>この場所がカルト・オブ・モスマンによって定住されたのは2104年のことです。カルト信者たちはこの地域でUMAである<a href="ogua.html" class="auto-link">オグア</a>を追跡しており、狩りの準備をしながらこの空き地にシェルターを建てることを決めました。彼らはその巨大生物をモスマンへの生贄にしようと企てていたのです。また、カルトは彼らの神聖なモスマンの卵を安全に保管するため、密閉された高台の小屋の一つで孵化させ始めました。</p>
<p>この拠点構築の最中、カルトメンバーの一人である<b>エルダー・アデレード</b>は、ブルーリッジ・キャラバン・カンパニーの行商人ルカ・コスタがこの地を訪れるのを発見しました。エルダーは商人のふりをして彼を待ち伏せにおびき寄せ、襲撃しました。ルカはなんとか逃げ延びたものの、カルトは彼の荷物運び用のバラモン（ムーナ・リサ）、物資、そしていくつかの粗雑な爆発物を手に入れ、それらを空き地に保管しました。</p>

            <h2>レイアウト</h2>
<p>沼地の茂みの中に位置し、戦前の木製歩道のネットワークの上に建てられた聖別の空地は、いくつかの高床式の木造の小屋と、屋外の儀式スペースで構成されています。地上には小さな小屋が1つあり、納屋のような構造物もあります。</p>

            <h2>主なアイテム</h2>
<p>聖別の空地には、以下の関連するメモが配置されています。</p>

<div class="note-box">
    <h3>祝福の品（A blessed gift）</h3>
    <p>ロケーションの北端、ロープの橋の階層にある、いくつかの天蓋で覆われた円形のエリアの小さなベンチの上。</p>
    <div class="transcript">
神聖なるモスマンよ、あなたは再び私たちに良き機会を与えてくださいました。<br>
<a href="ogua.html" class="auto-link">獣</a>を追跡している最中、エルダー・アデレードは道を旅する愚かな商人に出くわし、賢く狡猾な計画を練りました。彼女は商人のふりをして、その週の後半に取引を行う手はずを整えたのです。<br>
私たちは何日もかけて待ち伏せを準備しました。<br>
時が来た際、私たちはその愚か者を圧倒し、物資、弾薬、そして荷物運びの動物を奪いました…臆病者である彼は反撃するよりも逃げる方が賢明だと知っていたようですが。<br><br>
略奪品の中には爆発物の装置もいくつかありました。粗雑なものに見えますが、効果は十分にあります。これは神聖なるあなたからのさらなる贈り物なのでしょうか？この轟く怒りは、私たちの敵に地獄の業火を降らせるべく大いに役立つはずです。<br>
我々はあなたの継続的なご指導を祈ります。間もなく、あなたはふさわしい供物を見届けられ、あなたの慈悲深い優しさは報われることでしょう。
    </div>
</div>

<div class="note-box">
    <h3>ふさわしき生贄（A worthy sacrifice）</h3>
    <p>ロケーションの西側、入り口近く。いくつかのキャンドルの祭壇や棺の近くにある高い場所の祭壇エリアの、小さなベンチの上。</p>
    <div class="transcript">
おお我が導き手よ。モスマンよ、あなたは私たちにこれほどの祝福を与えてくださいました。<br>
どうかもう一度我らに力を。というのも、あなたの神聖な名のもとに生贄に捧げるにふさわしい<a href="ogua.html" class="auto-link">獣</a>を見つけたからです。<br>
その血は古く、遠い昔の秘密を宿しています。<br>
その生物は南へと移動しており、私たちは狩りを遂行するために夜通し歩き回りましたが、これまでのところ私たちの努力は実を結んでいません。<br><br>
その怪物は力強く凶暴で、その凶悪な顎に近づこうとする者を真っ二つに引き裂きます。<br>
それは広大な沼の近くに居座っているようであり、私たちもそこに隠れ家を作り、奴を打ち負かすための防御と計画を整えているところです。<br>
時が来れば血が流れ、それは過去の時代の神聖な幻視をあなたにもたらすでしょう。
    </div>
</div>

            <h2>補足</h2>
<ul>
    <li>イベント「Beasts of Burden」の進行中のみ入ることができる、空の高床式のカルトの小さな小屋があります。</li>
    <li>また、かつてカルト信者たちは「Beasts of Burden」イベント中のみ出現していましたが、「Expeditions: Atlantic City」アップデート以降は、イベントが最近起動されたかどうかに関わらず、カルト信者は通常時にもこの場所に生息するようになりました。彼らにはこのエリアでのアニメーションマーカーが設定されていないため、非アクティブ時は周囲をうろうろと動き回り、溜まった霧の中に歩き出していくこともあります。</li>
    <li>ここから最も近い「カルトの拠点」は、オールド・モールド採石場（Old Mold Quarry）の儀式キャンプと、ワトガの真南にある焚き火サイトです。</li>
    <li>高床式の歩道の特定のセクションに立つと、木々の開けた場所からパイロンV-13の姿を見ることができます。</li>
</ul>

            <h2>舞台裏</h2>
<p>聖別の空地の作成に携わった開発者には、「Nuka-World on Tour」にも携わったDouble ElevenのレベルデザイナーであるCourtney Raine氏も含まれています。</p>


<div class="gallery-section">
    <h2>ギャラリー</h2>
    <div class="gallery-grid">
        <div class="gallery-item"><img src="images/note_extracted/sacramental-glade/FO76OB Sacramental Glade 02.png" alt="入り口の標識"><div class="caption">入り口の標識</div></div>
        <div class="gallery-item"><img src="images/note_extracted/sacramental-glade/FO76OB Sacramental Glade 03.png" alt="外側の小屋"><div class="caption">外側の小屋</div></div>
        <div class="gallery-item"><img src="images/note_extracted/sacramental-glade/FO76OB Sacramental Glade 04.png" alt="上層の通路"><div class="caption">上層の通路</div></div>
        <div class="gallery-item"><img src="images/note_extracted/sacramental-glade/FO76OB Sacramental Glade 05.png" alt="中央の複合施設の眺め"><div class="caption">中央の複合施設の眺め</div></div>
        <div class="gallery-item"><img src="images/note_extracted/sacramental-glade/FO76OB Sacramental Glade 06.png" alt="ベンチに置かれた白骨死体"><div class="caption">ベンチに置かれた白骨死体</div></div>
        <div class="gallery-item"><img src="images/note_extracted/sacramental-glade/FO76OB Sacramental Glade 07.png" alt="小屋への通路として転用された飛行機の翼"><div class="caption">小屋への通路として転用された飛行機の翼</div></div>
        <div class="gallery-item"><img src="images/note_extracted/sacramental-glade/76 OIABM Sacramental mists.png" alt="霧が立ち込める様子"><div class="caption">霧が立ち込める様子</div></div>
        <div class="gallery-item"><img src="images/note_extracted/sacramental-glade/76 OIABM Sacramental Glade pews.png" alt="不気味な儀式場"><div class="caption">不気味な儀式場</div></div>
        <div class="gallery-item"><img src="images/note_extracted/sacramental-glade/76 OIABM Sacramental Glade overview.png" alt="全体像"><div class="caption">全体像</div></div>
        <div class="gallery-item"><img src="images/note_extracted/sacramental-glade/FO76 Cranberry Glade cultists chapel.png" alt="チャペル"><div class="caption">チャペル</div></div>
    </div>
</div>

            <div class="quote-box">
                <b>感想</b><br><br>
                かつては「クランベリーの空き地」という戦前の自然公園跡地だった場所をベースに、モスマン・カルトが占拠・要塞化を行って誕生したロケーションです。アップデートで既存のロケーションがガラリと雰囲気を変えるのは大きな魅力ですね！<br><br>彼らが伝説のUMA「オグア」を捕獲・生贄に捧げるためにここに陣を敷いたという背景があり、不気味に飾られた祈りの祭壇や剥製、木製の足場が複雑に絡み合う立体的な構造が探索欲を大いに刺激します。現地で見つかるメモからは、ルカ・コスタがカルトに襲われて荷物を奪われたという顛末が記されており、イベント「Beasts of Burden」のストーリーを色濃く反映しているのが特徴ですね。
            </div>
`;


const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/sacramental-glade.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

聖別の空地（Sacramental Glade）
https://www.fallout-jp.com/sacramental-glade.html

概要

アパラチアのクランベリー湿原にあるロケーション。旧名は「クランベリーの空き地」でしたが、カルト・オブ・モスマンによって占拠・改修されました。
戦前の自然公園跡地をベースに、彼らがUMA「オグア」を捕獲し、生贄に捧げるために陣を敷いた拠点です。現地で見つかるメモからは、ブルーリッジの行商人ルカ・コスタがカルトに襲われて荷物を奪われたという顛末が記されています。

---

💭 感想

彼らが伝説のUMA「オグア」を捕獲・生贄に捧げるためにここに陣を敷いたという背景があり、不気味に飾られた祈りの祭壇や剥製、木製の足場が複雑に絡み合う立体的な構造が探索欲を大いに刺激します。現地で見つかるメモからは、イベント「Beasts of Burden」のストーリーを色濃く反映しているのが特徴ですね。既存ロケーションがガラリと変わるアップデートは最高です！

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/sacramental-glade', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/sacramental-glade/post.md', postContent);

console.log('Done.');
