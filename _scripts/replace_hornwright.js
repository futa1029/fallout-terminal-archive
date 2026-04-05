const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/hornwright-estate.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ホーンライト邸（Hornwright Estate）</b>は、アパラチアの<a href="savage-divide.html" class="auto-link">荒れた境域</a>と<a href="ash-heap.html" class="auto-link">積灰の山</a>の境界にあるロケーションです。<br>
ここは<a href="hornwright-industrial-headquarters.html" class="auto-link">ホーンライト・インダストリアル</a>鉱業会社の所有者であるホーンライト一族の権力の座となる屋敷です。積灰の山の端に作られた高級住宅街ブラムウェルにおける富の象徴とも言える、巨大邸宅の典型例です。</p>

            <h2>レイアウト</h2>
<p>1階には、大戦の直前にアパラチア全域を席巻した鉱山労働者による暴動の痕跡が残っています。レンガ造りのホワイエには、略奪されたバーと、上層のメガ・マンション（メガ・マンションという邸宅の規格）や、地下にある屋敷のセーフルームに通じる安全なエレベーターがあります。<br>
ホーンライト邸のアクセスキーカードは、<a href="hornwright-industrial-headquarters.html" class="auto-link">ホーンライト・インダストリアル本社</a>の最上階のエグゼクティブ・レベルにあります。また、ホーンライトのサマーヴィラの地下室のカート上にもあります。</p>

<p>屋敷は全4階建てで、ホーンライト家に関する戦利品や情報で満たされています。</p>
<ul>
<li><b>最下層</b>：ヘリポートとトロフィールームがあり、エレベーターのすぐ向かいにキッチンがあります。西棟には2つの主寝室、大広間、会議室があり、フロアの反対側の端にはメインダイニングルームとラウンジがあります。</li>
<li><b>2階部分</b>：1階を見下ろす吹き抜け部分の西側と南側の大部分には、<a href="penelope-hornwright.html" class="auto-link">ペネロペ・ホーンライト</a>の寝室（ロックされた金庫付き）が北西にあり、その向かいの東側に彼女のオフィスがあります。客室はフロアの北側に並び、東側にはビリヤードルーム、ジム、ラウンジがあります。</li>
<li><b>上層</b>：ビリヤードルームの脇にある階段を上ると、ホーンライト家が使用していたワークショップがあります。西側の部屋には武器、防具、細工師の作業台があり、大量のロボット部品が置かれています。東側はメカニックの部屋です。</li>
<li><b>最上階デッキ</b>：この邸宅の最も象徴的な部分があります。装飾された天井から吊り下げられたスティングレイ・デラックスを備えた大広間があり、デッキの端には屋外プールとジャグジーバスがあります。ここには2体のホーンライト用執事ロボットと、ホーンライトのエリートセキュリティが配置されています。</li>
</ul>
<p>また、エレベーターからアクセスできる地下の<b>セーフルーム</b>は、もともとはダニエル・ホーンライトの私的研究室として機能していました。クエスト「Trade Secrets」を実行している間のみアクセス可能です。<br>セーフルームの中には、つい最近実家の屋敷に戻ってきたペネロペ・ホーンライト本人がいます。西側の壁沿いには武器作業台と細工師の作業台があります。</p>

            <h2>ターミナルエントリ</h2>
<p>ペネロペ・ホーンライトの部屋には、パーソナルターミナルが置かれています。</p>

<h3>ペネロペ・ホーンライトのターミナル</h3>
<p>（※要パスワード）</p>
<div class="note-box">
<div class="note-icon"></div>
<div class="transcript">
<span class="date-entry">受信メッセージシステム - エントリー01</span>
From: 自動メッセージシステム<br>
To: ペネロペ・ホーンライト<br>
ペニー、このメッセージを読んでいるなら、屋敷の地下にある私の個人用ラボに行って、中に鍵をかけてほしい。おそらく想像がついているだろうが、ここはセーフルームでもある。誰が来てもドアを開けてはならない。<br>
私はこの端末にアクセスキーカードプリンターを接続し、君だけが知っている第2パスコード入力サブルーチンを設定した...私の人生で最も重要な日の日付だ。<br>
君を愛している。いつもそれを示せなかったことを謝るよ。<br>
-父より

<span class="date-entry">送信メッセージシステム - エントリー01</span>
From: ペネロペ・ホーンライト<br>
To: <b>ダニエル・ホーンライト</b><br>
お父さん。家に送ってくれた花を受け取ったわ。素敵なお花ね。私が母さんの死をどう思っているか心配しているのは分かるけど、そのことについてはもう整理がついていると約束するわ。母さんは苦しんでいたのよ。もし生きていたとしても、どんどん弱っていって、たくさんの機械に繋がれて病院で寝たきりになっていたはずよ。それがどんな人生なの？母さんは今、もっといい場所にいるし、私はそれで構わない。このことで仕事に影響が出ないことは約束する。あと1日か2日休んだら戻るから。愛しているわ、お父さん。

<span class="date-entry">送信メッセージシステム - エントリー02</span>
From: ペネロペ・ホーンライト<br>
To: ダニエル・ホーンライト<br>
この「マザーロード・プロジェクト」について、私は深刻な懸念を抱いているわ。お父さんはいくつか数字や理論的な公式を提示してくれたけど、紙の上ではすべてが完璧に見える。でも、もっと詳細を教えてくれないと本当には手伝えない。数字いじりをするだけの人間みたいに扱われるのは正直言って不愉快よ。このプロジェクトについてただ蚊帳の外に置かれるのはお断り。特にそれが私たちの資金を食いつぶしているのだから。これがあなたの肝煎りのプロジェクトだとは分かっているわ。でも今回は私を入れなきゃダメよ。

<span class="date-entry">送信メッセージシステム - エントリー03</span>
From: ペネロペ・ホーンライト<br>
To: ダニエル・ホーンライト<br>
お父さん、ビル・ブレイヤーっていう記者がうちの警備員に撃たれたっていう噂を聞いたんだけど？今一番避けたいのは、警察の捜査官が施設中をかぎ回ることよ。今のところ、このPR上の悪夢の火種が収まるまで操業を停止しなければならなくなっているの。もしマジックを見せるつもりなら、今がその時かもしれない。そうしないと、今四半期の財政的な損失を見込むことになるわ。警備の連中に、ここはクソみたいな開拓地（Wild West）じゃないって言ってやったほうがいいかもしれないわね。

<span class="date-entry">送信メッセージシステム - エントリー04</span>
From: ペネロペ・ホーンライト<br>
To: <b>ブライス・ガラハン</b><br>
メッセージを受け取ったけど、心配させてくれるわね、ブライス。私たちは子供の頃からお互いを知っているけど、あなたがこんなに取り乱しているのを見たのは初めてよ。周りで色んなことが起きているのは分かっているけど、この狂気を乗り切るためには協力しなくちゃいけない。<br>
私たちについて、父に話すべきだと思うの。結婚したいって伝えましょう。悪いことが起きる予感がするから、手遅れになる前にこれをしなければ。今夜ここを抜け出して、いつもの場所で会いましょう。愛しているわ、ブライス。永遠に。

<span class="date-entry">送信メッセージシステム - エントリー05</span>
From: ペネロペ・ホーンライト<br>
To: イヴェット・ワイズマン<br>
イヴェット、父さんを見つけ出してくれる？家の書斎にいたら、大きな爆発音が聞こえたの。近くから煙の柱が上がっているのまで見えた気がする。本社に電話をかけても出ない。父がこの騒ぎに巻き込まれていないか確かめたいの。もし連絡がついたら、すぐに私に連絡するように言って。それから気をつけてね、イヴェット。もしその爆発が私の考えているものだとしたら、ついに鉱山労働者たちが抗議行動を行き過ぎたところまでやったのかもしれないから。

<span class="date-entry">第2パスコードの入力</span>
（※アクセスキーカードの発行には正解のパスコードが必要。邸宅内で得られるメモに記されている各日付の数字がヒントとなっている。<br>
「82376」「50173」は不正解となりエラーを返す。正解は「30448」）

<span class="date-entry">[Luck 12+] パスコードを推測する</span>
ERROR INCORRECT CODE ENTERED ERROR<br>
（※実はLuck 12+あっても推測不可）
</div>
</div>

            <h2>主なアイテム</h2>
<p>ホーンライト邸の各所には、クエスト「Trade Secrets」で必要となる手がかりのメモ（日付のヒント）が残されています。</p>

<div class="note-box">
    <h3>チャールストン・ヘラルド - ホーンライト家を襲った悲劇</h3>
    <p>エヴリン・ホーンライトの寝室に置かれています。<br>※「82376」（2076年8月25日）のヒント</p>
    <div class="transcript">
<center><b>ホーンライト家を襲った悲劇</b></center><br>
2076年8月25日 月曜日。<a href="charleston.html" class="auto-link">チャールストン</a>。<br>
先見の明のある起業家ダニエル・ホーンライトは、故妻エヴリン・ホーンライトを本日埋葬した。彼女の癌との長い闘いは、月曜日の早朝、彼らの静かな夏の別荘でついに終わりを迎えた。彼女は社内で公式な役職に就いていなかったものの、彼女の訃報を知らされた従業員たちは涙ながらの静寂で応じた。<br>
ホーンライト氏は葬儀後コメントを控えたが、娘のペネロペは集まった参列者たちにエヴリンの慈善活動への貢献を忘れないよう促した。「私たちはコミュニティに輝く光を失ってしまいました。ですが、彼女がいなくても私たちは闇に取り残されるわけではありません。残された私たちがよりいっそう輝かなければならないのです」
    </div>
</div>

<div class="note-box">
    <h3>RSVPカード</h3>
    <p>2階の東側ペントハウス内のバーに置かれています。RSVP（出欠返事）。<br>※「30448」（2048年3月4日）のヒント。正解はコレ。</p>
    <div class="transcript">
<center><b>RSVP</b><br>
2077年3月4日、ペネロペ・ホーンライト博士の<br>
29歳の誕生日へのご出席をお願いいたします。<br>
ダニエル・ホーンライト</center><br>
___出 席   <u>_X_</u>欠 席
    </div>
</div>

<div class="note-box">
    <h3>ホーンライト・インダストリアルの告知</h3>
    <p>ヘリポートの小さなテーブルの上に置かれています。<br>※「50173」（2073年5月1日）のヒント</p>
    <div class="transcript">
娘のペネロペ・ホーンライト博士がシニアエグゼクティブとして入社することを発表できるのは、私の少なからぬ誇りです。彼女の初出勤日は今週の月曜日、2073年5月1日となります。<br>
ペニーは新鮮な新しい視点をもたらし、私たちは皆、彼女の会社での新たな役割に興奮しています。この記念すべき日に、彼女を歓迎し祝福するようご協力ください。<br><br>
ダニエル・ホーンライト<br>
最高経営責任者<br>
ホーンライト・インダストリアル
    </div>
</div>

<div class="note-box">
    <h3>セーフルームチェックリスト</h3>
    <p>地下のセーフルーム内、階段の下のコンソールの上に置かれています。</p>
    <div class="transcript">
<center>セーフルームチェックリスト</center><br>
このバンカーを使用する前に、システムを初期化する必要があります。付属のマニュアルを使用して手順を完了し、追跡目的のためにこのリストを保管してください。<br><br>
占有の準備<br>
 [X] 水と空気フィルターの設定<br>
 [ ] Mr.ハンディの設定<br>
 [ ] パントリーの家電の設定<br>
 [ ] 家族に伝える！<br>
<i>私の死の場合にペニーにこの場所について伝える自動化プロセスを設定している...さもなければ、私が自ら彼女を連れてくる。彼女は皆を置き去りにするという考えを嫌悪するだろう。</i><br><br>
セキュリティヘルパーコンピュータの初期化<br>
 [X] 初回ログイン<br>
 [X] セキュリティカードを作成する<br>
 [X] 自動ロックダウンの日付を更新する<br>
 [ ] 家族をヘルパーに紹介する！<br><br>
<div style="text-align: right;">1/12ページ</div>
    </div>
</div>

<ul class="loot-list">
<li><b>フュージョン・コア</b> - パワーアーマーのある部屋に直接隣接するジェネレーターに刺さっています。</li>
<li><b>パワーアーマーシャーシ</b> - パワーアーマーステーションと細工師の作業台がある施錠された部屋（Picklock 2）内。</li>
<li><b>楽器</b> - 館内にはフルート、スネアドラム、バンジョー、アコースティックギター、バイオリンなどがディスプレイされています。（※これらは壁などのディスプレイケース内に配置されています）</li>
<li><b>資源</b> - このロケーションは、鉄、鉛、プラスチック、ねじ、ギアなどの基本素材の優れた供給源です。</li>
</ul>

<div class="gallery-section">
    <h2>ギャラリー</h2>
    <div class="gallery-grid">
        <div class="gallery-item"><img src="images/note_extracted/hornwright-estate/FO76Hornwright_Estate_Helipad.png" alt="ヘリポート"><div class="caption">ヘリポート</div></div>
        <div class="gallery-item"><img src="images/note_extracted/hornwright-estate/FO76 Hornwright Estate pool.png" alt="屋上のプール"><div class="caption">屋上のプール</div></div>
        <div class="gallery-item"><img src="images/note_extracted/hornwright-estate/FO76 Hornwright Estate dining.png" alt="豪華なダイニング"><div class="caption">豪華なダイニング</div></div>
        <div class="gallery-item"><img src="images/note_extracted/hornwright-estate/FO76 Hornwright Estate.png" alt="エグゼクティブレベルの内装"><div class="caption">エグゼクティブレベルの内装</div></div>
        <div class="gallery-item"><img src="images/note_extracted/hornwright-estate/FO76 Hornwright Estate bedroom.png" alt="寝室"><div class="caption">寝室</div></div>
        <div class="gallery-item"><img src="images/note_extracted/hornwright-estate/FO76 Hornwright Estate 9.png" alt="ペネロペのターミナル"><div class="caption">ペネロペのターミナル</div></div>
    </div>
</div>

            <div class="quote-box">
                <b>感想</b><br><br>
                アパラチアの富と権力を象徴するホーンライト一族の豪華な邸宅です。<br>巨大なメガ・マンションの中に広がる空間は、屋上プールからビリヤードルーム、広大なダイニングまで、戦前の彼らがいかに贅沢な暮らしをしていたかを如実に物語っていますね。一方で、外の中層階には暴動を起こした鉱山労働者たちの痕跡も残されており、光と影のコントラストがアパラチアの重苦しい歴史を感じさせます。<br><br>
ペネロペ・ホーンライトのターミナルからは、ダニエル（父）との複雑な親子関係、そしてガラハン鉱業のブライス・ガラハンとのロミオとジュリエットのような密かな恋愛関係という人間ドラマが読み取れます。ガラハン邸とともに、この周辺の探索はストーリーの肉付けとして非常に楽しめます！
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Hornwright Estate</h3><img src="images/note_extracted/hornwright-estate/img_main.png" alt="hornwright-estate"><img src="images/note_extracted/hornwright-estate/img_map_marker.png" alt="マップ" style="width:100%;margin-top:5px;"><div style="text-align:center;font-style:italic;color:#888;font-size:0.8em;margin-bottom:10px;">マップ上の位置</div><div class="infobox-row"><span class="infobox-label">種類</span><span>邸宅</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/hornwright-estate.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ホーンライト邸（Hornwright Estate）
https://www.fallout-jp.com/hornwright-estate.html

概要

アパラチアの積灰の山の境界にある、ホーンライト・インダストリアルの所有者・ホーンライト一族の権力の座となるメガ・マンションです。
戦前の彼らがいかに贅沢な暮らしをしていたかを如実に物語る豪華な内装がある一方で、地下には厳重なセーフルームが隠されています。ターミナルの記録からは、ダニエル（父）との複雑な親子関係、そしてライバル企業であるガラハン家のブライスとの密かな恋愛関係など、人間ドラマが読み取れます。

---

💭 感想

巨大なメガ・マンションの中に広がる空間は、屋上プールからビリヤードルーム、広大なダイニングまで、戦前の彼らがいかに贅沢な暮らしをしていたかを如実に物語っていますね。一方で、中層階には抗議の暴動を起こした鉱山労働者たちの痕跡も残されており、光と影のコントラストがアパラチアの重苦しい歴史を感じさせます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.writeFileSync('f:/Fallout/_X/hornwright-estate/post.md', postContent);

console.log('Done.');
