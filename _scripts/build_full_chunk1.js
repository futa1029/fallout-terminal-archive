const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ブラザーフッド・オブ・スティール | Overseer Mohi's Terminal</title>
    <link rel="canonical" href="https://www.fallout-jp.com/brotherhood-of-steel.html">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Overseer Mohi's Terminal">
    <meta property="og:locale" content="ja_JP">
    <meta property="og:title" content="ブラザーフッド・オブ・スティール | Overseer Mohi's Terminal">
    <meta property="og:description" content="ウェイストランド最大のパラミリタリー教団「ブラザーフッド・オブ・スティール」の詳細なロア記事です。">
    <meta property="og:image" content="https://www.fallout-jp.com/images/note_extracted/brotherhood-base/Fo1_Brotherhood_Corridor.png">
    <meta property="og:url" content="https://www.fallout-jp.com/brotherhood-of-steel.html">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@IwamotoFuta">
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <style>
        :root { --bg-color: #0f0f0f; --text-color: #e0e0e0; --accent-color: #00ff00; --header-bg: #1a1a1a; --panel-bg: #222; }
        body { background-color: var(--bg-color); color: var(--text-color); font-family: 'Noto Sans JP', sans-serif; margin: 0; line-height: 1.8; }
        .container { max-width: 1000px; margin: 0 auto; padding: 20px; display: grid; grid-template-columns: 320px 1fr; gap: 30px; }
        h1, h2, h3, h4 { font-family: 'Share Tech Mono', 'Noto Sans JP', monospace; color: var(--accent-color); border-bottom: 1px solid var(--accent-color); padding-bottom: 5px; margin-top: 2em; }
        h1 { font-size: 2.2em; margin-top: 0; line-height: 1.4; border-bottom: 2px solid var(--accent-color); }
        .infobox { background: var(--panel-bg); border: 2px solid var(--accent-color); padding: 15px; height: fit-content; position: sticky; top: 20px; align-self: start; }
        .infobox img { width: 100%; border: 1px solid #555; margin-bottom: 15px; cursor: zoom-in; }
        .infobox-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9em; border-bottom: 1px dashed #444; padding-bottom: 3px; }
        .infobox-label { color: var(--accent-color); font-weight: bold; width: 40%; }
        .info-value { width: 60%; text-align: right; }
        .content { background: rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 5px; font-size: 1em; line-height: 1.9; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); }
        .article-image { max-width: 100%; height: auto; border: 1px solid #444; display: block; margin: 30px auto; cursor: zoom-in; }
        .article-image.right { float: right; width: 45%; margin: 10px 0 20px 25px; clear: right; }
        .article-image.left { float: left; width: 45%; margin: 10px 25px 20px 0; clear: left; }
        .image-caption { text-align: center; font-size: 0.9em; color: #888; margin-top: -20px; margin-bottom: 30px; font-style: italic; }
        .quote-box { border-left: 4px solid var(--accent-color); margin: 30px 0; background: color-mix(in srgb, var(--accent-color) 10%, transparent); padding: 15px 20px; border-radius: 0 5px 5px 0; }
        .holotape-box { border-left: 4px solid #E67E22; margin: 30px 0; background: rgba(230, 126, 34, 0.08); padding: 15px 20px; border-radius: 0 5px 5px 0; }
        .note-box { border-left: 4px solid #8b9dc3; margin: 30px 0; background: rgba(139, 157, 195, 0.08); padding: 15px 20px; border-radius: 0 5px 5px 0; }
        .content a { color: var(--accent-color); text-decoration: none; border-bottom: 1px dashed transparent; }
        .content a:hover { border-bottom: 1px dashed var(--accent-color); }
        .action-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .back-link { display: inline-block; color: var(--accent-color); text-decoration: none; border: 1px solid var(--accent-color); padding: 8px 15px; font-family: 'Share Tech Mono', monospace; transition: all 0.2s; }
        .back-link:hover { background: var(--accent-color); color: var(--bg-color); }
        ul { list-style-type: square; } li::marker { color: var(--accent-color); }
        @media (max-width: 768px) { .container { grid-template-columns: 1fr; padding: 10px; } .infobox { position: static; } .article-image.right, .article-image.left { float: none; width: 100%; margin: 10px 0; } }
    </style>
</head>
<body data-article-category="勢力" data-article-appearance="Fallout 全般">
    <div class="container">
        <aside class="infobox">
            <h3 style="margin-top:0; text-align:center;">Brotherhood of Steel</h3>
            <img src="images/note_extracted/brotherhood-base/Fo1_Brotherhood_Corridor.png" alt="Insignia of the founding chapter" onerror="this.src='images/placeholder.jpg'">
            <div style="text-align:center; font-size: 0.8em; margin-top:-10px; margin-bottom:15px; color:#aaa;">創設支部であるブラザーフッド・オブ・スティールの紋章</div>
            
            <div class="infobox-row"><span class="infobox-label">ゲーム登場</span><span class="info-value">FO1, FO2, FO3, FNV, FO4, FO76, FOTV, 他多数</span></div>
            <div class="infobox-row"><span class="infobox-label">創設者</span><span class="info-value">ロジャー・マクソン</span></div>
            <div class="infobox-row"><span class="infobox-label">創設年</span><span class="info-value">2077年10月20日 (事実上)<br>2082年頃 (公式)</span></div>
            <div class="infobox-row"><span class="infobox-label">組織種別</span><span class="info-value">技術至上主義、半宗教的軍事教団</span></div>
            <div class="infobox-row"><span class="infobox-label">政治形態</span><span class="info-value">ハイ・エルダー、エルダー評議会、および各支部のエルダーに委ねられた絶対権力</span></div>
            <div class="infobox-row"><span class="infobox-label">組織構造</span><span class="info-value">『コーデックス』に基づく厳格なヒエラルキーと階級区分。『束縛の鎖(Chain That Binds)』教義により服従と順応が義務付けられている</span></div>
            <div class="infobox-row"><span class="infobox-label">通貨</span><span class="info-value">ボトルキャップ (外部貿易用)<br>ブラザーフッド・スクリップ (内部利用)</span></div>
            <div class="infobox-row"><span class="infobox-label">イデオロギー</span><span class="info-value">支部によって異なる。伝統主義と改革派の対立軸</span></div>
            <div class="infobox-row"><span class="infobox-label">構成員呼称</span><span class="info-value">ブラザー・オブ・スティール<br>シスター・オブ・スティール</span></div>
            <div class="infobox-row"><span class="infobox-label">指導者<br>(西海岸)</span><span class="info-value">ロジャー・マクソン (2082–2135)<br>マクソン2世 (2135–2155)<br>ジョン・マクソン (2159–?)</span></div>
            <div class="infobox-row"><span class="infobox-label">指導者<br>(東海岸)</span><span class="info-value">オーウェン・リヨンズ (2255–2278)<br>サラ・リヨンズ (2278)<br>アーサー・マクソン (2283–)</span></div>
            <div class="infobox-row"><span class="infobox-label">本部</span><span class="info-value">ロスト・ヒルズ (西海岸)<br>要塞 (東海岸)<br>ボストン空港 (連邦)<br>ディファイアンス砦 (過去)<br>アトラス砦 (アパラチア)<br>ヒドゥンバレー (モハビ)<br>ブラザーフッド基地 (TV)</span></div>
        </aside>

        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>

            <h1>Brotherhood of Steel<br><span style="font-size: 0.5em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">ブラザーフッド・オブ・スティール</span></h1>

            <div class="quote-box">
                <p>「この苦しみに満ちた惑星とその人々が持つ、唯一の救済。私たちが存在しなければ、人類は確実に滅びるだろう」<br>
                <span style="color:#aaa;">— ヘッド・スクライブ・ブリー</span></p>
                
                <p>「Ad Victoriam（アド・ヴィクトリアム） は "勝利へ" を意味する。我々の目に敗北は許されない、なぜなら我々は人類の未来のために戦わなければならないからだ。我々の合言葉は、君が持つどの武器よりも強力だ。忘れないでくれ」<br>
                <span style="color:#aaa;">— パラディン・ダンス</span></p>

                <p>「ブラザーフッド・オブ・スティールは、永続する未来を築こうと模索している。我々は人類の強固な力とならなければならない。公の、あるいは潜在的な脅威を排除する力。危険なテクノロジーを安全に保ち続ける力。そして、他になりたがる者のない決断を下す力を。我々は人類の岩石であり、戦争、病、そして時の過酷な敵に対して立ち向かい続けるのだ。決して揺らいではならない。アド・ヴィクトリアム！」<br>
                <span style="color:#aaa;">— ナイト・ダニエル・シン</span></p>
            </div>

            <p><b>ブラザーフッド・オブ・スティール (Brotherhood of Steel / B.o.S. または BoS)</b> は、大戦（The Great War）の直後、アメリカ軍（United States Armed Forces）のメンバーおよび政府が資金提供していた科学コミュニティの生き残りによって創設された、大戦後の半宗教的でテクノクラート的なパラミリタリー・オーダー（準軍事教団）です。カリフォルニア州を起源とするこの組織は、かつての米国本土全体にわたり多数の支部（Chapter）を有しており、2290年代までには多くの地域において支配的な勢力となりました。</p>

            <p>ブラザーフッドの本来の目的は、先進的なテクノロジーを保存し、その使用を厳しく規制することでした。</p>

            <div class="note-box">
                <b>対話ログ：「選ばれし者」とマシュー（Fallout 2より）</b><br>
                選ばれし者：「あんたたちは誰だ？」<br>
                マシュー：「我々はブラザーフッド・オブ・スティールとして知られるパラミリタリー組織だ」<br><br>
                <b>ACE端末の記録より：</b><br>
                選ばれし者：「ブラザーフッドについて何を知っている？」<br>
                ACE：「ブラザーフッド・オブ・スティールは、テクノロジーの適切な運用を通じて人類の救済に身を捧げるパラミリタリー組織です。その他の情報はすべて機密扱いです」
            </div>

            <p>この目的の根底には、「自分たち自身を滅ぼすような力を持った人類を、そのまま信頼することはできない」という強い信念があります。そのため彼らは、再び起きる可能性のある終末（アポカリプス）を防ぐためにあらゆるテクノロジーを獲得・独占しようとしています。</p>

            <div class="note-box">
                <b>対話ログ：あるVault居住者とダニエル・シン</b><br>
                Vault居住者：「新しいイニシエイトを募集しているのか？」<br>
                ダニエル・シン：「我々が君をイニシエイトとして受け入れるとしたら——それは決して確実な話ではないが——君は我々の教団と大義に自身を捧げることになる。我々の教団は、危険なテクノロジーを特定し、確保し、保護するために存在している。人類には自らを滅ぼす手段を委ねられない。我々は二度目のアポカリプスを決して許しはしない」
            </div>

            <p>彼らは比較的孤立主義的な傾向を持つものの、支部ごとにその力、影響力、そして教義が大きく変動しつつも、ウェイストランドの歴史において最も重要な組織のひとつであることを証明し続けてきました。</p>
            <p>ブラザーフッドは『Fallout』シリーズのほぼすべてのゲームおよび派生作品に何らかの形で登場しています。</p>

            <h2>背景 (Background)</h2>

            <h3>マリポサの反乱 (The Mariposa Rebellion)</h3>

            <p>2076年、ウェストテック社（West Tek）のNBC部門は、パン・イミュニティ・ビリオン・プロジェクトにおいて画期的な成果を達成しました。アメリカ国防総省は国際的なスパイ活動を恐れ、<b>ロバート・スピンデル大佐 (Colonel Robert Spindel)</b> と <b>ロジャー・マクソン大尉 (Captain Roger Maxson)</b> の指揮下にある軍事チームを派遣し、このプロジェクト（現在は『FEV / Forced Evolutionary Virus：強制進化ウイルス』プロジェクトと改名）の安全確保と同地での監督を命じました。</p>

            <div class="note-box">
                <b>パワーマネージメント＆メインフレーム端末での記録</b><br><br>
                FEV (Force Evolutionary Virus) - ステータス：保留<br>
                FEV概要ダイジェスト：<br>
                2073年。中国が生物兵器の使用に関してますます攻撃的になるにつれ、米国政府は対抗策が必要であると痛感した。パン・イミュニティ・ビリオン・プロジェクト（PVP）は2073年9月15日に正式に設立された。<br>
                2075年。新しく作成された生物兵器に対抗する最善の方法は、未感染のDNAを改変し、標準的なウイルス感染に対して感受性を持たなくすることであることが明らかになった。<br>
                2076年。PVPによって、予見できなかった副作用が2076年初めに出現し始めた。動物の被験体は、脳活動の活発化を伴う異常な成長速度を示し始めた。<br>
                米国政府はこれらの発見に注目し、国家安全保障の観点から、プロジェクトを確保および監督するための部隊を現地へ移動させた。このプロジェクトは現在、FEV（Forced Evolutionary Virus）プロジェクトと呼ばれている。<br>
                2077年。FEVは完成に近づきつつある。実験動物でのテストは100％近い成功率を収めている。サイズと筋肉密度は約60％増加し、潜在的な知能は200％増加している。<br>
                人間に対する効果は依然として不明であるが……理論上は有望である。<br>
                軍部はさらなる実験の継続を希望し、カリフォルニア州中部にあるマリポサ軍事基地に大規模な施設を建設した。この新しい施設において、FEVウイルスの実験は軍からの「ボランティア」被験者を対象として続行される。（GPWRTERM.MSGより）
            </div>

            <p>2077年1月7日、すべてのFEV研究は新たに建設された「マリポサ軍事基地」へと移管され、人間の被験者に対するウイルスの実験が開始されることになりました。</p>

            <div class="holotape-box">
                <b>FEV実験ディスク</b><br>
                ログ日付：2077年1月7日<br>
                バーネット少佐は、すべてのFEV研究をマリポサ軍事基地へ移管するよう命じた。彼は「ボランティア」の被験者でのプロジェクト実験を続けるつもりらしい。私はこれに反対している。人体実験は私や私のスタッフからは推奨されないことを、ここに記録しておきたい。
            </div>

            <p>警備部隊も同じく新たに建設された基地へと移動し、施設内で行われる研究の保護を提供し続けました。しかし、軍の部隊は「研究の本当の性質」については知らされていませんでした。</p>

            <p>事態は2077年10月10日の直前に崩壊しました。マリポサに駐留していた兵士たちは、彼らが護衛していた科学者たちが、軍の捕虜の囚人たちを用いて強制進化ウイルスの人体実験を行っているという恐るべき事実に直面したのです。この凄惨な事実の発覚は、スピンデル大佐を極度の精神的衰弱へと追いやり、彼は自室のオフィスに閉じこもってしまいました。<br>
            その結果、崩壊していく状況に対処できる将校はロジャー・マクソン大尉ただ一人となりました。兵士たちは復讐の血を求めて叫び、状況全体が大虐殺の惨事へと発展しかねないほどの危険な状態でした。10月12日、部下の一人が科学チームのメンバーを虐殺しようとするのを防ぐため、マクソンは大尉としての権限を行使し、自ら科学チームの「尋問」を命じました。彼は部隊に対し、一種の「正義の手続き」を提供することで、全面的な軍での反逆（ムツニー）を防ぐことを望んだのです。</p>

            <p>最初に取り調べられた科学者は10月13日にマクソンの前に引き出されました。主任研究員の<b>ロバート・アンダーソン</b>は、この施設での人体実験は政府によって認可されたものだと説明しました。彼はキャプテンに対しプログラムの概要を説明し、それが政府の命令であることを強調しました。しかしマクソンが彼を信じることを拒否した時、この科学者は正気を失い、「自分は命令に従っていただけだ、お前たちと同じ軍人なのだ」と叫び始めました。<br>
            これに対し、マクソン大尉は彼をその場で射殺しました。彼はそれを「全面的な反逆を防ぐためだった」と理屈付けましたが、キャプテン本人の日記によると、自分自身でもその言い訳を信じてはいませんでした。</p>

            <div class="holotape-box">
                <b>キャプテン・マクソンの日記（Captain Maxson's diary）より</b><br><br>
                私、ロジャー・マクソン大尉は、この出来事が公式の軍の記録に残る見込みがないため、このログを開始する。彼らが「FEV」と呼ぶウイルスの実験を捕虜に行っていることが判明した。<br>
                （中略）<br>
                私は科学者の一人、アンダーソンを尋問した。彼らが無力な人々に何をしていたのか、自分の目で見るまで信じられなかった。彼が正当性をわめくのを聞いて、私は銃を抜き、彼を撃ち殺した。私は彼らに正義を見せ、反乱を収めるためにやったのだ……自分でも信じていない言い訳だが。しかし、我々は引き返せない。
            </div>

            <p>ロバート・アンダーソンの処刑は、事実上マクソンを反乱軍の確固たる指導兵として確立させました。マクソンの地位は、2日後の10月15日にさらに強化されました。スピンデル大佐が狂気に陥っていることが明らかとなり、マクソンと数人の部下がドアを破って突入したまさにその瞬間、大佐が謝罪の言葉を口にしながら自らの頭を撃ち抜いて自殺したのです。<br>
            その後続いた科学者たちの尋問は、例外なく死刑として終わりました。10月18日まで抵抗を続けていたエリン・シェルマン（Erin Shellman）が最後に詳細な報告を行い、ついにマクソンは「人体実験が本当に政府の公式な命令であった」という事実を確信させられました。</p>

            <p>2077年10月20日、ロジャー・マクソン大尉はラジオの軍用周波数を使い、アメリカ合衆国からの<b>「完全な分離独立（Secession）」</b>を宣言しました。これは政府に対し、マリポサで起きている反逆の事態へ応答するよう強要するためのものでした。しかし、一切の返答は来ませんでした。<br>
            その一日後、マクソンは部下の家族全員に対し、マリポサ施設内のシェルターへと退避・避難するよう命じました（これにより、彼らは後の大戦の直撃を免れることになります）。</p>


            <h3>エンクレイヴとの最も初期の紛争 (Earliest conflict with the Enclave)</h3>
            <p><i>（メイン記事：Brotherhood-Enclave War）</i></p>

            <p>ブラザーフッド・オブ・スティールが西海岸においてエンクレイヴ（The Enclave / 旧米国連邦政府の残党）と初めて武力衝突に入ったのは、2241年のことでした。<br>
            エンクレイヴがポストアポカリプスの世界においてその恐るべき姿を現し始めた際、ブラザーフッド・オブ・スティールは「ニュー・カリフォルニア（New California）」の各地にあるいくつかの監視拠点（Observation Outposts）を再稼働させました。これは彼らの活動を監視し、その真の動機を学習するためでした。</p>

            <div class="note-box">
                <b>対話ログ：「選ばれし者」とマシュー（Fallout 2より）</b><br><br>
                マシュー：「数ヶ月前、我々はエンクレイヴとして知られるグループに遭遇した。驚いたことに、彼らのテクノロジーのレベルは我々自身のものすら上回っていたのだ。我々はこれに非常に不安を感じ、彼らと接触することすら考慮した。しかし、我々はエンクレイヴが何者であり、彼らの組織の真の目的が何かを正確に判断できるようになるまで、より慎重な行動指針を取ることに決定した」<br>
                「この目的のために、我々はエンクレイヴの活動エリア近くに小さな拠点を再稼働させた。そこから彼らを安全に監視できるからだ。現在、デン、NCR、そしてここサンフランシスコでそうした監視ポイントが稼働している」<br>
                <br>選ばれし者：「興味深いな。彼らについて何を学んだ？」<br><br>
                マシュー：「エンクレイヴは薬物、武器、そして奴隷の取引に深く関わっていることが判明した。しかし、これらは我々がまだ解き明かせていない、ある『より上位の目的』に通じる些細な追求に過ぎないようだ。我々はまだ彼らを監視し続けている」
            </div>

            <p>この期間中、ブラザーフッド・オブ・スティールは「選ばれし者」に対し、ナヴァロ（Navarro）空軍基地へ潜入し、エンクレイヴの持つ改良型ベルチバードの設計図（Schematics for the modified vertibird's）を回収する任務を託します。<br>
            後年の「NCR-ブラザーフッド戦争」中に、両国間で大きな衝突が発生したことが示唆されています。2246年以降に行われたNCR軍の手によるナヴァロ基地の壊滅作戦以降、ブラザーフッド・オブ・スティールは公然と西海岸に残るエンクレイヴの残党を狩り立て、完全に殲滅するための行動を開始しました。</p>

            <div class="note-box">
                <b>対話ログ：ある運び屋（Courier）とアーケイド・ガノン</b><br><br>
                運び屋：「ナヴァロで何があったんだ？」<br><br>
                アーケイド・ガノン：「エンクレイヴの指揮系統が崩壊した後、ナヴァロがNCR軍に蹂躙されるのは時間の問題だった。私の母と私は、父の古い部隊のトルーパーたちと一緒にそこを離れた。何年にもわたって連絡を取り合ってきた同じ人たちだ。脱出できなかった者は、全員がNCRに殺された。脱出に成功した者の一部でさえも、やがてはブラザーフッド・オブ・スティールの冷酷な手によって追い詰められ、狩られたんだ」
            </div>

            <br><br>
        </main>
    </div>
</body>
</html>`;

fs.writeFileSync('f:/Fallout/brotherhood-of-steel.html', htmlContent, 'utf8');
console.log('Successfully completed unabridged translation of Part 1 (Background & Origins).');
