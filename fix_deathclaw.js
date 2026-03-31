const fs = require('fs');
let html = fs.readFileSync('f:/Fallout/deathclaw.html', 'utf8');

// Replace meta tags
html = html.replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="デスクロー ── エンクレイヴが戦前に遺伝子工学で生み出した爬虫類型クリーチャー。ジャクソンカメレオンをベースに複数の動物種を混合し、人間兵士の代替として開発された。">');
html = html.replace(/<meta name="twitter:description" content="[^"]*">/, '<meta name="twitter:description" content="デスクロー ── エンクレイヴが戦前に遺伝子工学で生み出した爬虫類型クリーチャー。Falloutシリーズを代表する最強の敵。">');

// Replace Infobox garbled text
html = html.replace(/alt="チEクロー"/g, 'alt="デスクロー"');
html = html.replace(/<span class="infobox-label">タイチE<\/span>/, '<span class="infobox-label">タイプ</span>');
html = html.replace(/<span class="infobox-label">種旁E<\/span>/, '<span class="infobox-label">種族</span>');
html = html.replace(/<span>チEクロー<\/span>/, '<span>デスクロー</span>');
html = html.replace(/<span class="infobox-label">起溁E<\/span><span>エンクレイブE遺伝子実騁Ebr>EジャクソンカメレオンベEスEE<\/span>/, '<span class="infobox-label">起源</span><span>エンクレイヴの遺伝子実験<br>（ジャクソンカメレオンベース）</span>');
html = html.replace(/<span class="infobox-label">特徴<\/span><span>二足歩衁E巨大な爪<br>高い耐乁E・知性<\/span>/, '<span class="infobox-label">特徴</span><span>二足歩行、巨大な爪<br>高い耐久力・知性</span>');

// Replace H1 Title
html = html.replace(/チEクロー<\/span><\/h1>/, 'デスクロー</span></h1>');

// Replace body garbled text
const newBody = `<blockquote style="border-left: 4px solid var(--accent-color); padding: 10px 15px; background: rgba(0,0,0,0.3); font-style: italic; margin: 20px 0;">
                「でかい……でかい……人間三人分の大きさだ……爪は俺の腕ほどもある！引き裂かれた……引き裂かれた……」<br>
                <span style="font-size: 0.85em; color: #888;">── トレント・バリスター、『Fallout』</span>
            </blockquote>

            <p>
                <strong>デスクロー</strong>は、その特徴的な巨大な爪から俗にそう名付けられた、遺伝子工学で生み出された爬虫類型クリーチャーです。<br>
                <strong>エンクレイヴ</strong>が合衆国政府の秘密プロジェクトとして、人間兵士に代わるスーパーソルジャー——高リスクの捜索殲滅任務を遂行できる安価で使い捨ての戦闘部隊——を開発するために作り出しました。<br>
                大戦後に野生に放たれたデスクローの個体群は爆発的に増加・進化し、北米のウェイストランドにおける頂点捕食者となりました。
            </p>

            <h2>背景</h2>

            <h3>起源</h3>
            <p>
                デスクローと呼ばれるようになるクリーチャーは、エンクレイヴが行った科学実験から生まれました。<br>
                危険な戦闘任務で使い捨てにできる、安価な人間兵士の代替として開発されたものです。<br>
                複数の動物種を遺伝子的に混合して生み出され、主なベースとなったのは<strong>ジャクソンカメレオン</strong>（角のある品種）でした。
            </p>
            <p>
                このプロジェクトは、ほぼあらゆる環境で自力で生存・繁殖できる獰猛な捕食者を生み出すことに成功しました。<br>
                少なくとも1体のデスクローが2077年以前に実戦テストされたことが知られており、<strong>日中戦争</strong>のさなかにアラスカの島で中国人民解放軍の部隊に対して投入されています。
            </p>
            <p>
                極秘プロジェクトであったため、このクリーチャーに関する知識はエンクレイヴ内部の他の部門ですら共有されていないほど限定的でした。<br>
                一般市民が知ることは当然想定されていませんでしたが、事故的な目撃事件は発生しています。<br>
                米国海兵隊員のクーパー・ハワード（後のグール）は、デスクローがテストされていたのと同じアラスカの島に配備されていた際にそれと遭遇しています。<br>
                デスクローは数名の中国兵を虐殺しましたが、クーパーと対面してもなぜか彼の命を奪いませんでした。
            </p>

            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_tv_s2e4.png" alt="TVシリーズ シーズン2のデスクロー">
            <div class="image-caption">Fallout TVシリーズ シーズン2に登場するデスクロー</div>

            <h3>戦後の拡大</h3>
            <p>
                大戦後、生き残った新種のデスクローは封じ込めから逃れ、ウェイストランドへと脱出しました。<br>
                その個体数は飛躍的に増加し、大陸全土に広がりました。<br>
                2102年の時点で、<a href="appalachia.html" class="auto-link">アパラチア</a>にもデスクローの存在が確認されており、既にその名で呼ばれていました。
            </p>
            <p>
                22世紀後半には、デスクローの生理機能は<strong>マスター</strong>による遺伝子操作でさらに洗練されました。<br>
                ニューカリフォルニアでの最初の目撃報告は孤立した巣に限られていたため、当初デスクローは伝説的な破壊の生き物として認識されていました。<br>
                しかし<strong>ボーンヤード</strong>の住民は他の地域よりも早くその存在を認識していました——2161年頃に1体のデスクロー・マザーとその子供たちがこの地域の一部を占拠し、ガン・ランナーズのような武装集団を膠着状態に追い込んでいたためです。
            </p>

            <h3>知性デスクロー</h3>
            <p>
                西海岸エンクレイヴは2235年頃からデスクローの研究を再開し、改良FEVを用いて知性を人為的に増強したデスクローの群れを作り出しました。<br>
                2242年5月17日、初の実戦投入が行われ、知性デスクロー部隊が<strong>Vault 13</strong>に送り込まれました。<br>
                エンクレイヴは住民の拉致を隠蔽するためにデスクローを配備しましたが、予想外の出来事が起きます。<br>
                戦闘テスト後、誰も予測しなかったほど知性を発達させたデスクローたちは、創造者との繋がりを断ち切り、Vaultで平和な暮らしを築こうとしたのです。
            </p>
            <p>
                <strong>グルーサー</strong>率いるこの群れは、歴史上初めての非人型知性生命体としてユニークな文化を発展させました。<br>
                しかし、この群れの存在とその高度な知性はやがてエンクレイヴに発覚します。<br>
                秘密情報部エージェント、<strong>フランク・ホリガン</strong>率いる殲滅部隊がVaultに派遣され、知性デスクローは壊滅しました。<br>
                ゴリスとザーンだけがVaultに不在だったため唯一の生存者となりました。
            </p>

            <h2>生物学</h2>

            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_skull.png" alt="デスクローの頭蓋骨">
            <div class="image-caption">デスクローの頭蓋骨</div>

            <p>
                デスクローは大型の肉食二足歩行爬虫類で、最大限の殺傷力を持つように設計されています。<br>
                二足歩行は頭部の位置を高くし、視野を広げてターゲットの探知能力を向上させます。<br>
                上肢は二足歩行により解放され、極めて危険な武器として特化されました。<br>
                四足動物ほどの走行速度はありませんが、獲物を追いかける際に四つ足で走ることも観察されています。
            </p>
            <p>
                ジャクソンカメレオンの系統から対向する親指を持ち、さらに2本の指がゲノムにコードされ、各手に合計4本の指があります。<br>
                爪は鋭い刃で終わり、一振りで<strong>非武装の人間を真っ二つに切り裂く</strong>できるほどの切れ味を誇ります。<br>
                デスクローの皮膚は極めて頑丈で、銃器や刃物に対する優れた防御を提供します。<br>
                角と背棘がこの防御をさらに強化し、近接戦闘は非常に危険です。
            </p>
            <p>
                ただし、その鋭敏な感覚を逆手に取ることも可能です。<br>
                大きな音と強い光（フレアなど）は、デスクローの前進を抑止したり、接近を防ぐために利用できます。
            </p>

            <h3>行動</h3>
            <p>
                デスクローは群れで行動し、リーダーシップは<strong>アルファペア</strong>——群の中で最も強い雄と雌——が握ります。<br>
                群の他のメンバーはリーダーに従い、共に移動します。
            </p>
            <p>
                群れ行動と結びついた激しい<strong>縄張り意識</strong>を持ちます。<br>
                通常は居住地域から離れた場所を選びますが（おそらく騒音を嫌うため）、一時的に放棄された人間の建物や地域に定着することもあります。<br>
                2161年のボーンヤードの倉庫や、2281年のクォーリー・ジャンクションがその例です。
            </p>
            <p>
                一度縄張りを主張した群れを追い出すのは極めて困難です。<br>
                アルファ雄やパックマザーが殺されても縄張りを放棄せず、アルファ雌も死んだ場合には別の雄を選んで繁殖を続けます。<br>
                縄張りの奪還には通常、<strong>両方のリーダーを殺す</strong>か、群れ全体を殲滅する必要があります。
            </p>

            <h3>繁殖</h3>
            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_eggs.png" alt="デスクローの卵" style="max-width: 200px; float: right; margin-left: 15px;">
            <p>
                ジャクソンカメレオンとは異なり、デスクローは卵生です。<br>
                雌のデスクローは群れの最も強い雄（通常はアルファ雄）によって受精した卵をまとめて産みます。<br>
                デスクローの卵は大きく、重さは最大約0.5kg（2ポンド）に達し、驚くほど長い保存期間を持ちます。
            </p>
            <p>
                幼体は目立つ角や背棘なしで生まれ、成長とともに発達します。<br>
                角は雄では前方に、雌では後方かつ上方に成長します。<br>
                ベビーデスクローは明るい黄色の肌で生まれ、成熟するにつれて暗くなります。<br>
                成体では深い茶色、さらに年老いた個体では黒、あるいは黒と青にまで変化します。
            </p>
            <div style="clear: both;"></div>

            <h3>人間との関係</h3>
            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_boneyard.png" alt="ボーンヤードのデスクロー倉庫">
            <div class="image-caption">ボーンヤードのデスクロー倉庫。レギュレーターズの拠点がデスクローに占拠された</div>

            <p>
                デスクローは積極的に人間の居住地を攻撃しませんが、人類の拡大は必然的に両種の接触をもたらします。<br>
                デスクローは人間にとって極めて危険であり、どれだけ準備を整えても安全とは言えません。<br>
                ブラザーフッド・オブ・スティールのパトロールでさえ、気づかずにデスクローの縄張りに入ると深刻な被害を受けることがあります。
            </p>
            <p>
                デスクローの卵は珍味としても知られ、非常に栄養価が高くおいしい<strong>ウェイストランドのオムレツ</strong>の材料になります。
            </p>

            <h2>バリアント</h2>

            <h3>ベビー・デスクロー</h3>
            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_baby.png" alt="ベビー・デスクロー" style="max-width: 120px; float: right; margin-left: 15px;">
            <p>
                最も小さく若いデスクローですが、決して無害ではありません。<br>
                群れと母親の保護下にありながら、恐るべき爪とそれに見合った機動力を持っています。<br>
                成体の約40%の大きさです。<br>
                母親が殺されると、子供たちはその死体のもとに戻ります。
            </p>
            <div style="clear: both;"></div>

            <h3>成体デスクロー</h3>
            <p>
                性的に成熟した雄のデスクローは、茶色の皮膚と完全に形成された角で容易に識別できます。<br>
                速く、致命的で、耐久力があり、ほとんどあらゆる脅威を容易に排除できます。<br>
                雄のデスクローは群れで行動し、単独の成体は例外的です。
            </p>

            <h3>アルファ雄のデスクロー</h3>
            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_alpha_fnv.png" alt="アルファ雄デスクロー" style="max-width: 150px; float: right; margin-left: 15px;">
            <p>
                ウェイストランドの様々な危険を生き延びた完全に成熟したデスクローは、アルファに成長します。<br>
                角はより長く曲がり厚く、皮膚は年齢とともに暗い茶色から黒に変化します。<br>
                交配優先権を持ち、群れ全体を率います。
            </p>
            <div style="clear: both;"></div>

            <h3>マザー・デスクロー（メイトリアーク）</h3>
            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_mother.png" alt="マザー・デスクロー" style="max-width: 150px; float: right; margin-left: 15px;">
            <p>
                成体の雌デスクローは、オリーブと青が混ざった体色、後方に曲がる角、棘のある尾、目立つ皮膚のひだで区別されます。<br>
                マザー・デスクロー（メイトリアーク）は、群れの最も強力な雄によって受精した卵のみを産みます。
            </p>
            <div style="clear: both;"></div>

            <h3>レジェンダリー・デスクロー</h3>
            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_legendary.png" alt="レジェンダリー・デスクロー" style="max-width: 200px; float: right; margin-left: 15px;">
            <p>
                モハビのデッドウィンド・キャバーンでのみ発見される、十分に長く生き延びたアルファ雄デスクローです。<br>
                通常の成体より25%も大きく、それに見合った強大な角と爪を持ちます。<br>
                この個体は洞窟を探索しようとしたブラザーフッド・オブ・スティールのパラディンを殺害した張本人です。
            </p>
            <div style="clear: both;"></div>

            <h3>エンクレイヴのデスクロー</h3>
            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_enclave.png" alt="エンクレイヴのデスクロー" style="max-width: 150px; float: right; margin-left: 15px;">
            <p>
                キャピタル・ウェイストランドでエンクレイヴに捕獲された成体デスクローには、<strong>家畜化ユニット</strong>が装着されることがあります。<br>
                頭蓋骨に取り付けられ脳に接続されるこの装置により、エンクレイヴの要員は番犬のようにデスクローを使役できます。<br>
                リオンズのB.O.S.はこの制御信号をスクランブルしてIFFを反転させるデバイスを開発しました。
            </p>
            <div style="clear: both;"></div>

            <h3>ヘアリー・デスクロー</h3>
            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_hairy.jpg" alt="ヘアリー・デスクロー" style="max-width: 150px; float: right; margin-left: 15px;">
            <p>
                イリノイ州、ミズーリ州、カンザス州の領域に出現した、通常のデスクローとは完全に別の種です。<br>
                哺乳類に近い特徴を持ち、体が厚い毛皮に覆われています。<br>
                5本の角で形成される冠と1本の鼻角が特徴です。<br>
                天然の知性と自意識を発達させ、人間の会話を模倣する能力も持っています。<br>
                <em>（Fallout Tacticsのみに登場）</em>
            </p>
            <div style="clear: both;"></div>

            <h2>開発裏話</h2>
            <p>
                デスクローの名前は、『Wasteland』に登場するシャドウクローから着想を得ています。<br>
                デザイナーのスコット・キャンベルによる初期コンセプトでは、デスクローは<strong>クズリとヒグマ</strong>を遺伝子的に混合し、FEVで強化された毛むくじゃらの哺乳類でした。<br>
                しかし、アーティストが「毛が多すぎる」と指摘。当時のレンダリングソフトが毛の動きを正しく処理できなかったためです。
            </p>
            <p>
                その後、新設のブラックアイルが『Planescape: Torment』の開発を開始。<br>
                最初のアート作品の一つとして「タラスク」という怪物が粘土で造形され、3Dモデル化されましたが、最終的にゲームには採用されませんでした。<br>
                こうして、毛むくじゃらのクズリ熊が<strong>毛のない爬虫類型の二足歩行生物</strong>に生まれ変わりました。<br>
                D&Dのモンスターマニュアルの339ページを見れば——まさにデスクローそのものです。
            </p>

            <img class="article-image" src="images/note_extracted/deathclaw-fallout76/img_concept.png" alt="初期コンセプトアート">
            <div class="image-caption">スコット・キャンベルによるデスクロー初期コンセプトアート</div>

            <h2>登場作品</h2>
            <p>
                デスクローはFallout、Fallout 2、Fallout 3、Fallout: New Vegas、Fallout 4、Fallout 76、Fallout Tactics、Fallout: Brotherhood of Steel、Fallout Shelter、Fallout TVシリーズに登場します。
            </p>

            <h2>ギャラリー</h2>
            <div class="gallery">
                <div class="gallery-item"><img src="images/note_extracted/deathclaw-fallout76/img_render.png" alt="Falloutのデスクローレンダリング"><div class="caption">Falloutのデスクローレンダリング</div></div>
                <div class="gallery-item"><img src="images/note_extracted/deathclaw-fallout76/img_standard.png" alt="Fallout 76のデスクロー"><div class="caption">Fallout 76のデスクロー</div></div>
                <div class="gallery-item"><img src="images/note_extracted/deathclaw-fallout76/img_fo4_glowing.jpg" alt="Fallout 4のグロウイング・デスクロー"><div class="caption">Fallout 4のグロウイング・デスクロー</div></div>
                <div class="gallery-item"><img src="images/note_extracted/deathclaw-fallout76/img_fo4_albino.jpg" alt="Fallout 4のアルビノ・デスクロー"><div class="caption">Fallout 4のアルビノ・デスクロー</div></div>
                <div class="gallery-item"><img src="images/note_extracted/deathclaw-fallout76/img_tv_s2e5.png" alt="TVシリーズのデスクロー"><div class="caption">Fallout TVシリーズ シーズン2</div></div>
                <div class="gallery-item"><img src="images/note_extracted/deathclaw-fallout76/img_emmett.png" alt="エメット・マウンテン処理場のデスクロー"><div class="caption">エメット・マウンテン処理場のデスクロー</div></div>
                <div class="gallery-item"><img src="images/note_extracted/deathclaw-fallout76/img_fasnacht_mask.png" alt="デスクローのファスナハトマスク"><div class="caption">デスクローのファスナハトマスク</div></div>
                <div class="gallery-item"><img src="images/note_extracted/deathclaw-fallout76/img_rusted.png" alt="ラステッド・デスクロー"><div class="caption">ラステッド・デスクロー (Fallout 76)</div></div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                Falloutシリーズを代表するクリーチャーといえばやっぱりデスクロー。<br>
                初代Falloutから最新のTVシリーズまで、すべての作品に登場し続けているのは伊達じゃありません。<br><br>
                この記事を訳して一番驚いたのは、デスクローが単なるミュータントではなく、<strong>エンクレイヴが戦前に遺伝子工学で意図的に作り出した生物兵器</strong>だったということ。<br>
                ジャクソンカメレオンをベースに複数の動物種を混合して——という設定は、TVシリーズ シーズン2で具体的に描かれました。<br>
                アラスカの戦場でクーパー・ハワード（グール）がデスクローと遭遇するシーンは本当に鳥肌ものです。<br><br>
                Fallout 2の知性デスクロー、グルーサーの群れのエピソードも胸が熱くなります。<br>
                FEVで知性を与えられた結果、自意識と良心を発達させ、平和的な共存を目指したのに、エンクレイヴのフランク・ホリガンに殲滅されてしまった。<br>
                ゴリスとザーンだけが生き残ったという結末は、Falloutらしい物悲しさ。<br><br>
                開発裏話も面白いですよね。<br>
                初期はクズリとヒグマの毛むくじゃらのデザインだったのに、「毛が多すぎ」で描画できず、たまたまD&Dのタラスクの粘土モデルがあったからそれがベースになったという。<br>
                偶然の産物が、ゲーム史に残るモンスターになったわけです。
            </div>`;

html = html.slice(0, html.indexOf('<blockquote')) + newBody + html.slice(html.indexOf('<div style="margin-top: 30px'));

// Fix localized script garbled strings
html = html.replace(/たった仁E/g, 'たった今');
html = html.replace(/\+'刁E'/g, "+'分前'");
html = html.replace(/\+'時間剁E'/g, "+'時間前'");
html = html.replace(/\+'日剁E'/g, "+'日前'");
html = html.replace(/コメントを入劁E\(最大100斁EE\.\.\./g, 'コメントを入力 (最大100文字)...');
html = html.replace(/コメントを入力してください、E/g, 'コメントを入力してください。');
html = html.replace(/100斁E以冁E入力してください、E/g, '100文字以内で入力してください。');
html = html.replace(/不適刁E表現が含まれてぁEため投稿できません、E/g, '不適切な表現が含まれているため投稿できません。');
html = html.replace(/秒後に投稿できます、E/g, '秒後に投稿できます。');
html = html.replace(/投稿に失敗しました、E/g, '投稿に失敗しました。');
html = html.replace(/コメントを投稿しましたEE/g, 'コメントを投稿しました！');
html = html.replace(/コメントを読み込めませんでした、E/g, 'コメントを読み込めませんでした。');
html = html.replace(/まだコメントがありません。最初Eコメントを投稿してみましょぁEE/g, 'まだコメントがありません。最初のコメントを投稿してみましょう！');
html = html.replace(/こEコメントを削除しますかEE/g, 'このコメントを削除しますか？');
html = html.replace(/管琁EEードを終亁Eました、E/g, '管理者モードを終了しました。');
html = html.replace(/管琁EEスワードを入力してください:/g, '管理者パスワードを入力してください:');
html = html.replace(/管琁EEードに入りました、E/g, '管理者モードに入りました。');
html = html.replace(/パスワードが違います、E/g, 'パスワードが違います。');
html = html.replace(/削除失敁E /g, '削除失敗: ');
html = html.replace(/拡大画僁E/g, '拡大画像');

fs.writeFileSync('f:/Fallout/deathclaw.html', html, 'utf8');
