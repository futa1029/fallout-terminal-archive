const fs = require('fs');
const path = require('path');

const outFile = 'f:/Fallout/the-pitt.html';

const html1 = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Pitt - Fallout Lore Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
    <style>
        .lightbox-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        .lightbox-overlay.active { display: flex; }
        .lightbox-img {
            max-width: 90%; max-height: 90%;
            border: 2px solid var(--accent-color);
            box-shadow: 0 0 15px var(--accent-color);
        }
        .quote-box {
            border-left: 4px solid var(--accent-color);
            margin: 40px 0 20px 0;
            background: color-mix(in srgb, var(--accent-color) 10%, transparent);
            padding: 15px 15px 15px 20px;
            border-radius: 0 5px 5px 0;
            line-height: 1.6;
        }
        .quote-box b {
            color: var(--accent-color);
            font-size: 1.05em;
        }
        .comments-section { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(0, 255, 0, 0.3); }
        .comments-title { font-family: 'Share Tech Mono', monospace; font-size: 1.5em; color: var(--accent-color); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .comment-form { background: rgba(0, 20, 0, 0.4); border: 1px solid rgba(0, 255, 0, 0.3); padding: 15px; border-radius: 5px; margin-bottom: 30px; }
        .comment-textarea { width: 100%; box-sizing: border-box; background: rgba(0, 10, 0, 0.6); border: 1px solid rgba(0, 255, 0, 0.5); color: #e0e0e0; font-family: 'Noto Sans JP', sans-serif; padding: 10px; min-height: 80px; resize: vertical; border-radius: 3px; margin-bottom: 10px; }
        .comment-textarea:focus { outline: none; border-color: var(--accent-color); box-shadow: 0 0 5px rgba(0, 255, 0, 0.3); }
        .comment-form-footer { display: flex; justify-content: space-between; align-items: center; }
        .char-count { font-size: 0.85em; color: #888; }
        .comment-submit-btn { background: var(--accent-color); color: #000; border: none; padding: 8px 20px; font-family: 'Share Tech Mono', monospace; font-size: 1.1em; font-weight: bold; cursor: pointer; border-radius: 3px; transition: all 0.2s ease; }
        .comment-submit-btn:hover { background: #00cc00; box-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
        .comment-submit-btn:disabled { background: #444; color: #888; cursor: not-allowed; box-shadow: none; }
        .comment-msg { margin-top: 10px; font-size: 0.9em; display: none; }
        .comment-msg.success { color: var(--accent-color); display: block; }
        .comment-msg.error { color: #ff5555; display: block; }
        .comments-list { display: flex; flex-direction: column; gap: 15px; }
        .comment-item { background: rgba(0, 10, 0, 0.4); border-left: 3px solid rgba(0, 255, 0, 0.5); padding: 12px 15px; position: relative; }
        .comment-meta { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85em; color: #888; }
        .comment-time { font-family: 'Share Tech Mono', monospace; }
        .comment-body { color: #ddd; line-height: 1.5; font-size: 0.95em; white-space: pre-wrap; word-wrap: break-word; }
        .comment-delete-btn { background: none; border: none; color: #ff5555; cursor: pointer; font-size: 1.1em; padding: 0 5px; opacity: 0.5; transition: opacity 0.2s; }
        .comment-delete-btn:hover { opacity: 1; }
        .comment-empty { color: #888; font-style: italic; font-size: 0.95em; }
        .comment-loading { color: var(--accent-color); font-family: 'Share Tech Mono', monospace; }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body data-article-category="場所">
    <div class="scanlines"></div>
    <div class="vignette"></div>

    <div class="container">
        <aside class="sidebar">
            <h2 class="sidebar-title">DATABASE</h2>
            <ul>
                <li><a href="vault.html">[Vault]</a></li>
                <li><a href="appalachia.html">[Appalachia]</a></li>
                <li><a href="lore.html">[Terminal]</a></li>
                <li><a href="changelog.html">[Changelog]</a></li>
            </ul>
            <div class="sys-status">
                SYS_STATUS: <span style="color:var(--accent-color)">ONLINE</span><br>
                USER: OVERSEER MOHI<br>
                UPLINK: SECURE
            </div>
        </aside>

        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="the-pitt" onclick="toggleLike(this)">
                    <span class="like-icon">♡</span> LIKE <span class="like-count">0</span>
                </button>
            </div>

            <h1>The Pitt<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">ピット</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/the-pitt/FO76TP_Steam_page_bg_raw.jpg" alt="The Pitt" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;">
                <img src="images/note_extracted/the-pitt/The_Pitt_map.png" alt="マップ上の位置" style="width:100%; margin-top:5px;">
                <div style="text-align:center; font-style:italic; color:#888; font-size:0.8em; margin-bottom:10px;">マップ上の位置</div>
                <div class="info-grid">
                    <div class="info-label">正式名称:</div>
                    <div class="info-value">Pittsburgh（ピッツバーグ）</div>
                    
                    <div class="info-label">別名:</div>
                    <div class="info-value">シティ・オブ・スチール<br>Gateway to the West（西への玄関口）</div>
                    
                    <div class="info-label">州:</div>
                    <div class="info-value"><a href="pennsylvania.html" class="auto-link">ペンシルベニア州</a></div>

                    <div class="info-label">派閥 (FO76):</div>
                    <div class="info-value">ファナティック<br>ユニオン<br>ヘルキャット傭兵団</div>

                    <div class="info-label">派閥 (FO3):</div>
                    <div class="info-value">ピットレイダー<br>ピットの奴隷<br><a href="brotherhood-of-steel.html" class="auto-link">ブラザーフッド・オブ・スティール</a> (以前)</div>
                    
                    <div class="info-label">リーダー:</div>
                    <div class="info-value">ヘックス (2100年代)<br>イシュマエル・アッシャー卿 (2255年～)<br>ワーナー (2277年・ルート分岐)</div>

                    <div class="info-label">クリーチャー:</div>
                    <div class="info-value">トログ<br>フェラル・グール<br>モールラット<br>獰猛な犬</div>
                    
                    <div class="info-label">登場作品:</div>
                    <div class="info-value">Fallout 3<br>Fallout 76</div>
                </div>
            </div>

            <p><b>「ピット（The Pitt）」</b>は、戦前の<a href="pennsylvania.html" class="auto-link">ペンシルベニア州</a>ピッツバーグの廃墟の内部に、レイダーが支配する地域として設立された居住地です。大戦の直後に地元ギャングによって設立され、2103年までに彼らは支配権を確立していました。2255年頃、当時のブラザーフッド・オブ・スティール（B.O.S.）の遠征部隊による「大虐殺（The Scourge）」によって居住者の大半が一掃されましたが、元B.O.S.のイシュマエル・アッシャーによって再び再興されました。2277年までに、同市の奴隷取引と鉄鋼業は東海岸における一大勢力へと成長しました。</p>

            <p>戦前には「スティール・シティ（City of Steel）」や「西への玄関口（Gateway to the West）」と呼ばれていたこの町は、『Fallout 3』のアドオン「The Pitt」、及び『Fallout 76』の無料アップデート「Expeditions: The Pitt」の主要な舞台となっています。</p>

            <h2>歴史・背景</h2>

            <h3>大戦とその余波</h3>
            <p>ピットはかつてペンシルベニア州ピッツバーグの街でした。ここは鉄鋼生産だけでなく、武器、弾薬、ベルチバード、パワーアーマー、ロボットの製造など、対中戦争（米中戦争）の軍事努力を支える一大産業拠点でした。その軍事拠点としての性質から、ピッツバーグは中国軍の核ミサイルの最優先ターゲットとなりました。<br>
            この大都市の近くに落ちた弾頭は、都市周辺の環境を劇的に変化させました。放射性降下物と、製鉄所からの重い産業公害が混ざり合い、この地域特有の極めて危険な環境が作り出されました。核による破壊はまた、建築のための十分なスペースと原材料を提供し、川は一見役立ちそうな水源を与えました。しかし、当時の住人たちは知る由もありませんでしたが、その川は放射性物質、変異原性物質（発がん性物質）でひどく汚染されていました。</p>

            <p>大戦後、街は混沌に陥り、様々なレイダーギャングがそれぞれ独自の支配領域を確立し始めました。これらのギャングは、オハイオ川が分岐する地点に、徴用・奴隷化された労働者を使って「ピット」と呼ぶ居住地を建設し始めました。2103年までに、レイダーの「執行者」たちが拉致してきた市民の労働者を監視し、都市建設を強要するシステムが確立されました。</p>

            <p>暴行と抑圧から逃れたい人々、そしてモノンガヒラ川、アレゲニー川、オハイオ川の汚染が深刻化したために、ペイジを中心とする地元住民たちは結束して街から逃れました。</p>
            <p>このころ、アメリカ軍のオリバー・フィールズ大尉、フレッド・ラドクリフ軍曹、トンプソン軍曹からなる部隊が、街にいる市民の解放を試みましたが失敗し、重傷を負っています。ピッツバーグの廃墟からペイジと共に逃げ延びた地元住民たちは「入植者」となり、アパラチアの南に向かいながらより多くの生存者を集めていきました。彼らは後に2103年、荒れた境域（サベージ・ディバイド）に「ファウンデーション」という集落を形成することになります。</p>

            <div class="note-box">
                <b>ペイジの日誌 1ページ目</b><br><br>
                もうあそこには戻れない。<br>
                我々はピッツバーグの自宅から逃げ出さざるを得なかった。かつてピッツバーグと呼ばれていた場所から。放射能とあの狂人たちが、残されたものを地獄に変えてしまった。<br>
                我々は南へと向かい続ける。どこかで、腰を下ろしてやり直せる場所が見つかることを祈りながら。
            </div>

            <div class="note-box">
                <b>エルシーの話</b><br><br>
                ピットから逃げ出せて本当によかった。<br>
                ペイジが「ここを出るぞ」と言った時、狂ってると思った。外のほうが危険かもしれないのに、あんな壁（今はどうだか知らないけど、壁があったのよ）の外へ危険を冒して出ていくなんてと。<br>
                でもあの時、外には奴隷にされる以上のことが待ってるってペイジと一緒に信じてよかったわ。
            </div>

            <h3>ユニオンとファナティック</h3>
            <p>その後しばらくして、ピットは支配権をめぐって互いに争う二つの派閥の激しい紛争の舞台となりました。それは自らを「ユニオン」と組織した勤勉な生存者たちと、「ファナティック」として知られる狂暴なレイダーグループでした。ヘルキャット傭兵団もかつてファナティックと取引をしたことがありましたが、アパラチアから来た Vault 76 の居住者（Vault Dweller）が介入するためにやってきた際も、この紛争は猛烈に続いていました。</p>

            <h3>トログと汚染の影響</h3>
            <p>大戦から数十年が経過するにつれて、癌性の腫瘍や痕跡的な手足を持つ奇形の子供が生まれ始めました。そして年月が経つと、人口のほぼ全体が汚染された川の水によって引き起こされた遺伝的疾患や変異に苦しむようになりました。しかし、この変異は住民の懸念の最たるものではありませんでした。住民に広まった遺伝子疾患の中には、被害者を暴力的で原始的な状態に陥らせる神経学的状態があったのです。この状態に陥った人々は「ワイルドマン」と呼ばれるようになり、ピットの郊外で群れをなし、通りかかった者全員を獲物にするようになりました。</p>

            <p>さらに悲惨だったのは、「トロግሎダイト変性感染症（Troglodyte Degeneration Contagion）」、通称「TDC」と呼ばれる病に苦しむ人々でした。この病原体の被害者は急速に退化し、「トログ」として知られる猫背の動物のような生物になってしまいます。生まれたばかりの赤ん坊は特にこの病気に罹りやすいのです。</p>

            <p>人口が退化していくのと同様に、レイダーたちによって確立された秩序も退廃していきました。設立から50年以内に、人肉食者や強姦魔の戦争中の部族が街の支配的権力となり、存在したわずかな秩序は「強者が弱者を支配する」という形をとりました。これは結果的にピットを野蛮な自給自足の形へと落ち着かせたものの、街に恐ろしく悪名高い評判を残し、東海岸中からの旅人は常識としてこの場所を避けるようになりました。</p>
            
            <h3>大虐殺（The Scourge）</h3>
            <p>2255年頃、当時のパラディン、オウイン・リオンズが率いるブラザーフッド・オブ・スティールの遠征部隊が、キャピタル・ウェイストランドへの旅の途中でピットの郊外に到着しました。廃墟を偵察した後、リオンズは——彼の兵士たちには理由がわからないまま——都市への攻撃を命じます。<br>
            軍事行動というよりは虐殺に等しいこの作戦で、B.O.S.の兵士たちはマウント・ウォッシュから市内に侵入し、一夜にして市の人口の半分を虐殺しました。即座に降伏した者だけを容赦し、この作戦は「大虐殺（The Scourge / スカージ）」と呼ばれるようになりました。</p>

            <p>その直後、B.O.S.は都市を去り、グレッグ・ベア（後のコディアック）を含む21人の健康な子供たちを連れ去り、イニシエイトの訓練に置きました。噂によれば、B.O.S.の部隊は廃墟から何らかの重要な資産を回収したと主張されていますが、それが何であったかはほとんど（あるいは誰も）知りません。たった一人の死傷者（イニシエイトのイシュマエル・アッシャー）を出しただけで、B.O.S.はこの痛ましい作戦を成功と見なしました。<br>
            しかし、この大虐殺は都市を静め、最も暴力的な住民を一掃することに成功した一方で、後に意外な人物によって掌握されることとなる権力の空白を残しました。</p>

            <h3>アッシャー卿の統治</h3>
            <p>イニシエイト・アッシャーは、大虐殺の最中に倒壊した建物に巻き込まれ、部隊の仲間からは戦死したと報告されていましたが、実は生き延びていました。パワーアーマーによって事故死は免れましたが、重傷を負い数日間昏睡状態に陥っていました。彼がようやく目覚めたとき、そこには粛清を生き延びた一人の女性の姿がありました。彼女は彼を死体だと思い込み、アーマーを剥ぎ取ろうとしていたのです。<br>
            そのスカベンジャーから話を聞いたアッシャーは、自身が閉じ込められていた建物が稼働中の製鉄所（The Mill）であることを知りました。B.O.S.では今までに見たこともない施設でした。彼は地元住民が都市を再建するのを手伝うことを決意しました。この目的のため、彼の奇跡的な生還と威圧的なアーマーを「神」のように崇めるようになったスカベンジャーたちを味方につけました。</p>

            <div class="note-box">
                <b>アッシャーの日記：製鉄所</b><br><br>
                目が覚めた。死んだと思ったんだろうな。<br>
                女がアーマーをはぎ取ろうとしていた。<br>
                ここはピットの「イン」だ。こいつらは「アウト」の集落から食料を漁りに来ている。ここは安全なんだと。<br>
                バカな。ここが何か分かっていないのか？建物の構造、あの煙突。まさか。<br>
                ここは製鉄所だ。
            </div>

            <p>街はアッシャー卿のもとで急速に拡大しました。彼は鉄拳制裁で統治し、地元のギャングを自分の軍隊の指揮下に置き、弱者を奴隷として働かせて鉄鋼業を再建しました。その後の利益を使って外部の者を軍隊に採用し、外部の情報からより健康な奴隷を購入しました。<br>
            アッシャーは人口を維持するために新兵の採用と奴隷の輸入にほぼ完全に依存していましたが、このようなシステムの不安定さと危険性を認識していたため、プロパガンダを慎重に利用し、奴隷をおとなしくさせて反乱を避けました。彼は最終的な解放の約束を演説で定期的に行い、奴隷たちへの最も「進歩的」な政策として、ヘイブンの闘技場「ザ・ホール（The Hole）」で死闘を競い合い、自由を勝ち取って軍隊に入隊する機会を与えていました。</p>

            <p>アッシャーはこの残酷な統治アプローチを「必要悪」であり、街の蔓延る健康危機が解決されるまでの一時的な措置だと考えていました。<br>
            ブレイクスルーは予期せず訪れました。アッシャーの妻であり主任研究員であるサンドラ・クンダニカが、「マリー」と名付けた娘を出産したのです。この乳児はTDCの症状を示さないばかりか、病気に対して「能動的な免疫」を持っているようでした。娘をピットの未来の可能性、兆しとしての象徴と見たアッシャーは、サンドラに娘の免疫を慎重に研究するよう命じました。</p>

`;

fs.writeFileSync(outFile, html1, 'utf8');
console.log('Part 1 generated.');
