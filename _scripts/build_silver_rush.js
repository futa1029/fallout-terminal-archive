const fs = require('fs');

const slug = 'silver-rush';
const title = 'シルバーラッシュ (Silver Rush)';

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Fallout Lore Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
    <style>
        .warning-text { color: var(--term-red); font-weight: bold; }
    </style>
</head>
<body data-article-category="場所">
    <div class="scanlines"></div><div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>${title}<br><span style="font-size: 0.6em; color: #888;">Silver Rush Casino / Energy Weapons</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/silver-rush/Silver_Rush.jpg" alt="Silver Rush interior" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">フリーサイド</div>
                    <div class="info-label">所有者:</div><div class="info-value">グロリア・ヴァン・グラフ (2281年)<br>ジャン＝バティスト・カッティング</div>
                    <div class="info-label">所属勢力:</div><div class="info-value">ヴァン・グラフ家</div>
                    <div class="info-label">取り扱い:</div><div class="info-value">エネルギー兵器全般</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout: New Vegas<br>Fallout TVシリーズ (S2)</div>
                </div>
            </div>

            <div class="note-box" style="margin-top: 15px;">
                「シルバーラッシュ：手の中で熱くなるレーザーの『ラッシュ（興奮）』を感じてください。」<br>
                — Mr.ニューベガス (Radio New Vegas)
            </div>

            <p><b>シルバーラッシュ（Silver Rush）</b> は、モハビ・ウェイストランドのフリーサイドに位置する店舗（元カジノ）です。悪名高きヴァン・グラフ家によって運営される、高品質なエネルギー兵器（Energy Weapons）の専門店であり、TVドラマ版のシーズン2にも登場します。</p>

            <h2>背景</h2>
            
            <h3>大戦前の歴史</h3>
            <p>2071年に設立されたシルバーラッシュ・カジノは、ネバダ州ラスベガスの「フリーモント・ストリート」における共有スペースで、向かいにあるアトミック・ラングラー・カジノとしのぎを削るライバル関係にありました。</p>

            <h3>2281年 (Fallout: New Vegas)</h3>
            <p>大戦後、新しい所有者たちが再び古いカジノを再建し、アトミック・ラングラーとのライバル関係も再燃しました。しかし、それが続いたのはニューレノから武器取引ビジネスの拡大を目指して「ヴァン・グラフ家」がモハビに到着するまでのことでした。<br>
            シルバーラッシュに狙いを定めたヴァン・グラフ家は、以前の所有者たちを武力で「立ち退かせ」、カジノの設備をすべて外に投げ捨てて、独自のエネルギー兵器の備蓄を置くためのスペースを作りました。この突然の経営者（と用途）の変更に対し、フリーサイドを仕切る「キングス」のメンバーたちが抗議に訪れましたが、ヴァン・グラフ家は彼らにエネルギー兵器の威力を直接味わわせ、<b>何人かを光る粘液の塊（Goo）に変えてしまいます</b>。それ以来、両グループは互いに不可侵を貫いています。</p>

            <img src="images/note_extracted/silver-rush/FNV_Silver_Rush_thugs_6.jpg" alt="Van Graff Thug" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <p>当初、シルバーラッシュの武器庫はフリーダ・ヴァン・グラフによって率いられていましたが、彼女は「一生に一度のチャンス」を追求するために去っていきました。フリーダの出発後、妹の<b>グロリア・ヴァン・グラフ</b>と兄の<b>ジャン＝バティスト・カッティング</b>がシルバーラッシュの責任者に任命されました。<br>
            二人はすぐさま方針を転換し、アトミック・ラングラーとのライバル関係を放棄して、むしろ「カジノでギャンブルをしてキャップを大量に持っている客を惹きつける」ことに注力しました。</p>

            <p>裕福なヴァン・グラフ家の支配下にあるシルバーラッシュはセキュリティに事欠かず、いかなる窃盗も即座に実力行使で処罰されます。フリーサイドという貧困街と高価なエネルギー兵器という組み合わせは、一見すると失敗するように思われますが、グロリアは「ヴァン・グラフ家は決して安物を売らないため、本物を求める顧客は店がどこにあろうと買いに来る」と豪語しています。<br>
            彼女はまた、「時々は店に押し込もうとする強盗もいるが、ターゲットダミー（動く標的装置）がいくらするか知っているか？」と語り、強盗を試射の的にして楽しんでいることを示唆しています。</p>

            <h2>レイアウト</h2>
            <p>フリーサイド南部セクションの北西の角付近に位置しており、アトミック・ラングラーのネオン看板を通り過ぎた先、一部が崩落した屋根の上に斜めに掲げられた立派な看板が目印です。</p>

            <p>内部のメインルームにはカウンターが設置され、その上に無数のエネルギー兵器（レーザーライフル、プラズマ兵器など）と弾薬が無造作に陳列されています。ドア近くの棚には大量の弾薬、プラズマグネレード、地雷が置かれています。<br>
            アクセス可能な店舗部分の奥の短い廊下を入るとバスルームがあります。キャッシャー（レジ係）の部屋はバリケードで塞がれ施錠されています。その先の施錠されたドアを抜けると金庫、ロックされたターミナル、そして居住区への階段があります。<br>
            店内には5人のヴァン・グラフ家の凶漢（Thugs）が配置されており、正面ドアの両脇に2人、キャッシャーの部屋の周りに2人、そしてその間を行き来する1人が常に監視しています。</p>
            
            <p>入り口の外には門番の「サイモン（Simon）」が立っており、店内に入る顧客からすべての武器（隠し持てるHoldout武器すらも）を一時的に没収し、黒い金属製の箱に保管します。</p>

            <h2>特筆すべき出来事と戦利品</h2>
            
            <h3>最初の入店時のイベント</h3>
            <p>プレイヤーが初めてシルバーラッシュに入ると、グロリア・ヴァン・グラフと「彼らにお金を借りている顧客（ソレン）」との間のスクリプトイベントが発生します。4人のチンピラがフェンス越えの通路を塞いでおり、このイベントが完了する前に警備員を通り抜けて奥へ進もうとすると、店内の全員が敵対します。<br>
            イベントの最後、借金を返せなかった顧客をジャン＝バティストが容赦なくレーザーで灰にし、その後通常営業が始まります。</p>

            <h3>ユニーク（GRA）武器</h3>
            <p>DLC「Gun Runners' Arsenal (GRA)」を導入している場合、グロリアから以下の強力なユニーク武器を購入できます。</p>
            <ul>
                <li><b>Cleansing Flame (浄化の炎)</b> - ユニーク火炎放射器</li>
                <li><b>Sprtel-Wood 9700 (スプルーテル・ウッド)</b> - ユニークガトリングレーザー</li>
                <li><b>The Smitty Special (スミティ・スペシャル)</b> - ユニークプラズマキャスター</li>
            </ul>

            <img src="images/note_extracted/silver-rush/FTV_S2E8_Still_115.png" alt="Silver Rush in the TV Series" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">
            <p><i>（図：TVシリーズ S2最終話より、シルバーラッシュの看板の上からデスクローを狙撃するNCRベテランレンジャー）</i></p>

            <h2>開発秘話</h2>
            <div class="note-box">
                <b>モチーフとなった現実の場所:</b><br><br>
                ゲーム内のシルバーラッシュがある地理的な位置は、現実のネバダ州ラスベガスの「フリーモント・ストリート・エクスペリエンス」にある「Golden Nugget Hotel and Casino（ゴールデンナゲット）」と同じ場所にあります。<br>
                かつて実在したネオン看板は現在「ネオン博物館」に保管されており、ゲーム内の造形はそれに酷似しています。また、「シルバーラッシュ（銀ラッシュ）」という名前は、1858年にネバダ州バージニアシティ近くで「コムストック・ロード」が発見された後の、ネバダ州における現実の銀採掘の歴史にちなんでいます。
            </div>

            <div class="quote-box">
                <b>Impression</b><br><br>
                テーブルの上に無造作に置かれた無数の高価なエネルギー兵器（Zキーでドラッグしてトイレに持ち込んで隠れて盗むのがプレイヤーの伝統行事）。そして強欲で残忍なヴァン・グラフ家。フリーサイドの無法地帯ぶりを体現するもう一つの名物ロケーションでした。<br><br>
                TVドラマ版シーズン2での登場は衝撃的であり、店名通り「シルバー」に輝く看板の「Silver...」の文字の上から、NCRベテラン・レンジャーが対物ライフルを構えてストリップ地区にはびこる大量のデスクローを狙撃している様子が描かれています。<br>
                2296年現在、ヴァン・グラフ家がまだここを仕切っているのか、それとも別の誰かの手に渡ったのかは大きな謎ですが、かつてニューベガスをプレイした者にとって鳥肌が立つほど象徴的なアングルでした。
            </div>
            
            <p>Category:Fallout: New Vegas locations<br>Category:Fallout TV series locations<br>Category:Freeside buildings<br>Category:Fallout: New Vegas shops</p>
        </main>
    </div>
</body>
</html>`;

fs.writeFileSync('f:/Fallout/' + slug + '.html', html, 'utf8');
console.log('Successfully completed building Silver Rush article HTML.');
