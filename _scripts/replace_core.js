const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/the-core.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ザ・コア（The Core）</b>は、クレーター・コアとも呼ばれる、アパラチアの<a href="toxic-valley.html" class="auto-link">毒の峡谷</a>地域にある<a href="the-crater.html" class="auto-link">クレーター</a>内部のインスタンスロケーションです。</p>

            <h2>レイアウト</h2>
<p>ザ・コアは、戦前に墜落した宇宙ステーション「Valiant-1」の中心部の残骸です。墜落前の宇宙ステーションは車輪のような形をしており、そのハブとスポークにあたる部分がコアの上層を形成しています。<br>リーダーである<a href="meg.html" class="auto-link">メグ・グローバーグ</a>は中央のハブにおり、ゲイルやラ・ラ、ケイレブ・フィッシャー、ジョニー・ウェストンは、コアのスポーク部分にある各個室に割り当てられています。中央のらせん階段を降りると、発掘された地下室に向かい、サージ、バーブ、レフ、そしてレイダー・パンクはこのエリアにいます。また、ルーも関連クエストを完了するとこの地下エリアに戻ってきます。</p>
<p>クエストの進行に伴い配置されるNPCが変化し、サージ、レフ、フィッシャーなどは去り、ウィーゼルやモーティマーなどが新たな住人として現れます。<br>さらに、レイダーたちは残骸から大型のプロジェクターか送信機のようなものをサルベージしており、ケイレブ・フィッシャーはこれを「スペース・ビーム」、マンチは「エンジェル・ピス計画」と呼んでいます。</p>

            <h2>ターミナルエントリ</h2>
<p>ザ・コア内には、各キャラクターの思惑や設定が記されたパーソナルターミナルが2箇所に設置されています。</p>

<h3>フィッシャーの技術端末</h3>
<p>コア西側の廊下にあるケイレブ・フィッシャーの部屋に置かれた端末（ハッキングLv3）。</p>
<div class="note-box">
<div class="note-icon"></div>
<div class="transcript">
<span class="date-entry">Voxカラー</span>
モーガンタウン全体を危うく完全に見限るところだったが、町の外れにあるある家が、古い技術を探す上で実り多いと分かった。<br>
ハリソン博士という科学者が、動物の鳴き声を解釈する機能する通訳機を作っていた。少しの工夫で、彼の研究を改良することができた。<br>
これを使えば、話す能力のない人間や動物でも、我々が理解できる言語を発することができるようになるはずだ。今のところ、ハリソン博士が提供した音声ライブラリに制限されているが、上手くいけば、いつでも声を追加できる。

<span class="date-entry">浄水器</span>
水問題の解決策を見つけた。有毒の水とは、地元民が「毒の峡谷」と呼ぶ場所に定住した結果だ。しかし、メグはどうしてもこの古い宇宙ステーションを拠点にすることにこだわった。<br>
幸いなことに、私はステーションの浄水システムのいくつかを解体し、我々の浄水器に取り付けて、ほぼすべてを飲める水にすることができた。それでもほぼ毎日、溜まった余分なスラッジを掃除しなければならないが、それをやりさえすれば、きれいな水が手に入る。

<span class="date-entry">追跡ビーコン</span>
ステーションからの最新のサルベージ品から、私が今まで見たこともないような高度な無線機が採取できた。それらの特徴は、どれも驚くほど小型化に成功していることだ。宇宙に機材を持ち込むとなれば、サイズの懸念は想定できる。<br>
私は基本的な追跡用装置を制作し、それを首輪に組み込んだ。どうやらウィーゼルがルーの足跡を追いかけられたのもそのためらしい。つまり、簡単な無線機を使えば、その追跡装置から発せられる音を辿ることでウィーゼルとルーの現在地を突き止めることができる。

<span class="date-entry">スペース・ビーム</span>
彼らが宇宙ステーションでどんな仕事をしていたかは定かではないが、生き残った資料のいくつかを調べた。<br>
彼らが組み立てていたこれ。今まで見たどんなものとも違う。通信設備か？武器か？分からない。欠落している情報が多すぎる。<br>
良い言葉が見つからなかったので、これを「スペース・ビーム」と呼ぶことにした。もちろんマンチは「エンジェル・ピス計画」と呼びたがったが、私はすぐにそれを却下した。<br>
これを稼働させるどころか、全貌を解明するまでに何年もかかるかもしれない。

<span class="date-entry">パワーアーマー</span>
メグから聞いた話によると、彼女や他のギャングはかつて「ブラザーフッド・オブ・スティール」と呼ばれる連中と乱闘していたという。彼らはパワーアーマーを着て走り回り、秩序か何かを取り戻そうとしていたそうだ。<br>
いじれるスーツが欲しいと伝えると、彼女は承諾してくれて、彼らの古い基地の1つに連れて行ってくれた。そして、かろうじて機能する1着を見つけたのだ。<br>
あともう少しだ。ほんの少し微調整すれば、最初よりももっと良くなると思う。
</div>
</div>

<h3>ジョニー・ウェストンの端末</h3>
<p>ジョニーの部屋の壁に設置された端末（パスワードが必要）。</p>
<div class="note-box">
<div class="note-icon"></div>
<div class="transcript">
<span class="date-entry">Never forget your rules to live by:</span>
== 誰も信用するな。<br>
== 常に連中の動向をうかがい続けろ。

<span class="date-entry">潜在的な仕事：アリーナ</span>
場所：アリーナ<br>
位置：クランベリー湿原、ワトガ<br>
獲得物：キャップ、薬物、復讐<br>
メグはアリーナに興味を失ったかもしれないが、ハルがあそこにいることが分かった以上、放っておくわけにはいかない。中に入る計画はあるが、これは2人仕事だ。メグは「個人的な問題」と呼ぶだろう事態に、仲間を使わせてくれるとは思えない。<br><br>
【エントリー2】（※クエスト「Fun and Games」完了後）<br>
メグは地元のVault居住者を妙に気に入っている。驚いたことに、こいつには根性がある。本物の生存者だ。この居住者は、まさに俺がハルの元にたどり着くのに必要な人物かもしれない。メグはそれについて何も言わないだろうしな。<br><br>
【エントリー3】（※計画通りに遂行した場合）<br>
新しいVault居住者のおかげで、仕事は成功した。俺が見たところ、Vault 79なんて、大海の一滴に過ぎない。アリーナにはまだ可能性があるかもしれないから、このエントリーは開いたままにしておく。<br><br>
【エントリー3】（※撃ち合いに発展した場合）<br>
新しいVault居住者のおかげで、仕事はめちゃくちゃだった。あんなずさんな仕事は見たことがない。メグは俺たちが本当にこいつを必要としていると思っているのか？俺から伝えるつもりだが、現時点ではメグが居住者を切り捨てることはしない気がする。メグは自分にとって良すぎるほど義理堅い。今回も、誰か他人の後始末をするのは俺の役目になりそうだ。

<span class="date-entry">潜在的な仕事：ウェイワード</span>
場所：ウェイワード<br>
位置：森林地帯<br>
獲得物：キャップ、情報<br>
ウェイワードと呼ばれる最近開いたバーに立ち寄った。ここには多くの可能性が集まっている。あらゆる種類の旅行者。ひっきりなしに行き交う人々。ダッチェスに上手く取り入るためのペルソナさえ手に入れば、あとは俺の勝ちだ。

<span class="date-entry">潜在的な仕事：ファウンデーション</span>
場所：ファウンデーション<br>
位置：荒れた境域<br>
獲得物：キャップ、情報<br>
ファウンデーションは複数の意味で標的だ。メグはあの哀れなやつらに対する多くの襲撃を計画するだろう。俺が連中に上手く取り入ることができれば、情報の対価を請求できる。それだけではなく、連中が払う気になれば、俺自身のサービスの対価も請求できる。

<span class="date-entry">潜在的な仕事：Vault 79</span>
場所：Vault 79<br>
位置：荒れた境域<br>
獲得物：金塊<br>
メグがVault居住者と大きな強盗について話しているのを立ち聞きした。どうやら、古き良きアンクル・サムがすべての金塊をこのアパラチアにあるVault 79に隠したらしい。<br>
メグはチームをまとめるためにVault居住者の手助けを求めている。つまり、これは俺のアリーナの仕事をついにやり遂げる絶好の機会だ。

<span class="date-entry">個人的なメモ：ハル（故人）</span>
俺はしくじった。俺は利己的なクソ野郎で、ハルがその代償を払った。彼を行かせてやるべきだったし、はたまた説得して残らせるべきだった。<br>
あいつは俺の今までで最高の堅実な相棒だった。俺が持っていた唯一の本当の関係。いや、俺が持っていた唯一の本当の全てだったかもしれない。<br>
彼は死んだ。それは俺のせいだ。俺は自分を決して許さない。

<span class="date-entry">個人的なメモ：Vault居住者</span>
あんなに長い間Vaultに住んでいた奴が、このような世界で通用するスキルを持っているとは誰も思わないだろう。だがこの居住者は注目に値する。それはメグも同意している。<br>
俺たち全員、メグが企てているVault 79の強盗に参加することになるだろう。それは関係者全員にとって面白い腕試しの場になるはずだ。この居住者が何でできているか見せてもらおう。交渉術を持っていることを願うよ。俺が確実に試してやるからな。

<span class="date-entry">個人的なメモ：ローズ（Mr.ナニー）</span>
ポットが割れたような変な声のMr.ナニーに出くわした。「ローズ」と名乗り、自分はレイダーであると主張している。彼女は「レイダーの流儀」について長々と話し、いくつかの古いやり方をテストしようとしている。俺にそんな時間があるはずもない。<br>
だが彼女はここで何が起きたのかの知識を持っているため、価値のある財産になるかもしれない。何にせよ、彼女は何か価値のあるものが隠された「隠し場所」を持っていると主張している。

<span class="date-entry">個人的なメモ：ダッチェス</span>
ダッチェスは、このアパラチアにおけるかなり新しい施設である「ウェイワード」を取り仕切っている。あの女は度胸があり、もし俺が何も事情を知らなければ、メグと良い勝負ができるほどの人物だと見積もっていただろう。<br>
彼女はキャップをもたらし、あらゆる場所から人を惹きつけるビジネスを見事に回している。それはつまり、俺が売るなり、使うなり、あるいは両方なりに活用できる情報が集まるってことだ。

<span class="date-entry">個人的なメモ：ペイジ</span>
俺が見たところ、ファウンデーションはペイジという男に仕切られているようだ。非常に現実的。ビジネスのタイプとしては俺の好みではないが、潜在的な機会としてファウンデーションをパスするわけにはいかない。だが彼は賢く、大半の奴等のようにキャップや薬物の誘惑に操られたりはしない。これを手中に収めるなら、カードは正しく切らなければならないな。
</div>
</div>

            <h2>主なアイテム</h2>
<p>ザ・コアに到着した時点で、以下の関連するメモやホロテープを発見できます。</p>

<div class="note-box">
    <h3>ルーの別れの手紙（Lou's goodbye note）</h3>
    <p>メモ。クエスト「Cheating Death」中にのみザ・コアのルーの部屋のテーブルの上に出現します。</p>
    <div class="transcript">
いなくなる。永遠に。おせっかいはやめて、探さないでくれ。<br>
俺はもうここでお荷物になるつもりはない。<br>
フィッシャーには俺のものを全部持っていく権利があると言ってある。<br>
残りのやつらはクズでも奪い合ってろ。
    </div>
</div>

<div class="holotape-box">
    <div class="holotape-icon"></div>
    <h3>ついに手がかりが（A lead at last）</h3>
    <p>クエスト「Hells Eagles」の開始時に<a href="oscar-gonzalez.html" class="auto-link">オスカー・ゴンザレス</a>から受け取るホロテープ。</p>
    <div class="transcript">
ジャック・ハンター：Dr.G（オスカー）…このメッセージが無事に届くことを祈る。標的のリトル・ロブに近づいている。彼らは山の中のどこかに住んでいると言っていた。ある種の隠れ家に。この「彼ら」が誰か疑問に思うだろう…私が話しているのは事情通の連中のことだ。不法居住者、探鉱者、金掘り。奴らは標的と出くわしたことがあると言っていた。<a href="hemlock-holes.html" class="auto-link">ヘムロック・ホールズ</a>近くの丘にある小屋で会ったんだ。だがゴルフのために行ったわけじゃない…私たちは会って楽しんだ。批判しないでくれ！君だって楽しいことが好きだろう。奴らはロブのところへ案内できると言った。私はついていくことに決めた。危険なのは分かっているが、大金を手に入れるにはリスクを負う必要がある。それがこの業界のお作法だ。向こうで会おう。ハンターより。
    </div>
</div>

<ul class="loot-list">
<li><b>火のついた葉巻</b> - 金塊プレスマシンの右側にあるチューブ内のデスクに置かれた灰皿の上。</li>
</ul>

            <h2>補足</h2>
<p>この場所にはカルト教団（<a href="cult-of-the-mothman.html" class="auto-link">カルト・オブ・モスマン</a>）に関連すると思われる細かなディテールがいくつかあります。</p>
<ul>
    <li>半分埋もれたアールデコ調の彫刻が植物の根に絡まれて置かれています。</li>
    <li>メグの部屋にはゲーム内で唯一となる「モスマンの剥製」があります（メグにはオカルトとの明確な繋がりはなく、コア全体には動物の残骸が散乱していますが）。</li>
    <li>クジラの骨飾りが金塊プレスマシンの上に飾られています。これはモスマンの祭壇で典型的に見られる様式です（マンチはこれをクジラのものだと確認しています）。また建物の外には<a href="ae-ri.html" class="auto-link">エ・リ</a>の作業スペースの上にもクジラの骨が並べられています。</li>
    <li>ここで見られる左右対称の人間のシャンデリアはカルトの建築様式（クランシー・マナーなどで見られるもの）に典型的です。</li>
    <li>地下ではフクロウの射撃ターゲットが見つかります。これは<a href="point-pleasant.html" class="auto-link">ポイント・プレザント</a>のものと同じです。</li>
    <li>NPCの<a href="creed.html" class="auto-link">クリード</a>は、モスマン教信者がレイダーの縄張りを自分たちの聖地と見なしていると言及しています。</li>
    <li>Wastelandersパッチが適用される以前の、オリジナル版の墜落した宇宙ステーションには明らかなカルトの兆候はありませんでした。小さな植物に覆われた放棄された祠が少し南にありましたが、その場所は消滅しています。</li>
</ul>

            <h2>舞台裏</h2>
<p>墜落した宇宙ステーションのデザインは、キャンセルされたプロジェクト『Van Buren』に登場する予定だった「B.O.M.B.-001」のデザインや「B.O.M.B.-002」の設定を直接ベースにしています。</p>

<div class="gallery-section">
    <h2>ギャラリー</h2>
    <div class="gallery-grid">
        <div class="gallery-item"><img src="images/note_extracted/the-core/Crater precursor.png" alt="半分埋もれたカルトの彫刻"><div class="caption">半分埋もれたカルトの彫刻</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76CoreRaRa.png" alt="ラ・ラとゲイルの部屋"><div class="caption">ラ・ラとゲイルの部屋</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76WL Core1.png" alt="メグの玉座"><div class="caption">メグの玉座</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76WL Core2.png" alt="地下階への手すり階段"><div class="caption">地下階への手すり階段</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76WL Core3.png" alt="地下階"><div class="caption">地下階</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76WL CoreJohnny.png" alt="ジョニーの個室"><div class="caption">ジョニーの個室</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76WL CoreLou.png" alt="ルーの個室"><div class="caption">ルーの個室</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76WL CoreSurge.png" alt="サージの個室"><div class="caption">サージの個室</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76WL Vault 79 schematics at Crater.png" alt="Vault 79の設計図"><div class="caption">Vault 79の設計図</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76 Chalkboard Crater.png" alt="クレーター内の黒板"><div class="caption">クレーター内の黒板</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76 CoreJev.png" alt="レフの個室"><div class="caption">レフの個室</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76 Crater Core shrooms.png" alt="栽培されている発光キノコ"><div class="caption">栽培されている発光キノコ</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76 Elegantly appointed.png" alt="デコレーション"><div class="caption">デコレーション</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76 Manneq Crater.png" alt="人間を利用したカルトの装飾"><div class="caption">人間を利用したカルトの装飾</div></div>
        <div class="gallery-item"><img src="images/note_extracted/the-core/FO76 Ominous statue.png" alt="不気味な彫像"><div class="caption">不気味な彫像</div></div>
    </div>
</div>

            <div class="quote-box">
                <b>感想</b><br><br>
                『Wastelanders』アップデートで追加されたクレーターの心臓部となる、インスタンス化されたロケーションですね。元々は「墜落した宇宙ステーション」というただのランドマークでしたが、レイダー達の手によって各モジュールが居住空間に生まれ変わっているのが非常にエモーショナルです。宇宙ステーションのリング状の通路をそのまま各個人の部屋として活用しており、フィッシャーの技術オタクな端末記録や、ジョニーの野心を秘めた日記など、レイダー主要メンバーたちの人間臭い一面を垣間見ることができます。<br>特に「モスマン教団」やカルトの手がかりが至る所に散りばめられているあたりは、今後のアパラチアの勢力図の伏線を感じさせてたまりません。かつて何もなかった場所がこれほど作り込まれた本拠地になったのはFallout 76の進化の象徴ですね！
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">The Core</h3><img src="images/note_extracted/the-core/FO76WL_TheCore.png" alt="the-core"><div class="infobox-row"><span class="infobox-label">種類</span><span>内部施設</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>毒の峡谷</span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span>レイダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');


const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/the-core.html', finalHtml);
console.log('Done.');
