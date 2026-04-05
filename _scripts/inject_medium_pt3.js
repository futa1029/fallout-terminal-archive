const fs = require('fs');

const translations = {
  "the-ghoul-s-grave": {
    "title": "グールの墓 (The Ghoul's grave)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>グールの墓<br><span style="font-size: 0.6em; color: #888;">The Ghoul's grave</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/placeholder.jpg" alt="The Ghoul's grave" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">不明 (カリフォルニア/ネバダ周辺)</div>
                    <div class="info-label">勢力:</div><div class="info-value">ドン・ペドロのギャング</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>グールの墓 (The Ghoul's grave)</b> は、TVドラマ版に登場するロケーションです。</p>

            <h2>背景</h2>
            <p>過去のある時点で、グール（クーパー・ハワード）は「ドン・ペドロ」として知られる権力者に捕らえられ、彼の拠点に連れてこられました。グールを個人的な仇敵と見なしたドン・ペドロは、このガンスリンガーを点滴だけで生き延びさせたまま、墓室に「生き埋め」にしました。<br>
            そしてドン・ペドロは、年に一度だけグールを掘り起こし、彼の体の一部を切り取ってからまた土に埋め戻したと言われています。</p>

            <h2>TVシリーズでの登場 (第1話「ジ・エンド」)</h2>
            <p>2296年のある時期、ホンチョ、ビギー、スリムからなるバウンティハンター（賞金稼ぎ）のグループが夜間にドン・ペドロの要塞に潜入し、ビギーが「ジャンク・ジェット」を使って見張りの一人を倒しました。その後ホンチョは、ドン・ペドロが数年間捕らえている「悪名高いバウンティハンター」を捜しているのだと説明します。</p>

            <p>彼らはやがて小さな墓地にたどり着き、土から点滴（IV）バッグとチューブが突き出ている奇妙な墓を発見します。ビギーとスリムは、自分たちが探している人物が「グール」であることに気づいて衝撃を受けますが、ホンチョは自分の父親がかつて彼と一緒に働いていたのだと言います。<br>
            ビギーは彼がすでに「フェラル（野生化）」しているのではないかと懸念を表します。するとホンチョは一羽の「ニワトリ」を取り出し、フェラル・グールはニワトリを許容できないのだと説明しました。</p>

            <p>ハンターたちは墓に含まれていた棺を掘り起こし、その前にニワトリを置いてから蓋を開けました。中からは、老いさらばえて突然変異したクーパー・ハワード（グール）が現れました。<br>
            彼は遊び心でニワトリを抱き上げ、それがフェラル化していない証拠となってビギーとスリムを恐怖させます。</p>
            <p>ホンチョは恩着せがましく「多額の賞金を確保するために協力しよう」と提案します。彼はターゲット（シギ・ウィルジグ）がカリフォルニアにいるモルデイヴァーを探しに行ったと説明し、グールがもともとカリフォルニア出身であることを知っていると指定しました。<br>
            自分の過去に触れられたことに腹を立てたグールは、お前たちとは違って俺は「ゲームへの愛（プロ意識）」のために賞金を追っているのだと主張し、スリムとビギーを無慈悲に殺害しました。<br>
            その後、ホンチョを負傷させたまま引きずっていき、彼を棺の中に放り込み、開いた墓穴の中へと落としました。グールはニワトリだけは見逃し、一人で賞金首を追うために立ち去ります。</p>

            <h2>開発秘話</h2>
            <div class="note-box">
                「生きたまま墓に埋められる」というグールの導入は、Fallout 2に登場した「コフィン・ウィリー」と似ています。彼もまた、ニューレノ近郊の「ゴルゴタ」の墓に何年もの間生き埋めにされていましたが、「選ばれし者（Chosen One）」によって掘り起こされました。
            </div>

            <div class="quote-box">
                <b>Impression</b><br><br>
                主人公の一人である「グール」の初登場シーンとなった象徴的な場所です。「点滴で生かされたまま長年無期懲役として墓に生き埋めにされ、年に一回肉を削がれる」というえげつない刑罰を受けており、ウェイストランドの無法ぶりを凝縮したような設定です。（余談ですが、このグールを圧倒して生き埋めにした「ドン・ペドロ」という人物がどれだけ強いのかも少し気になるところです）
            </div>

            <p>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "bbq-shack-tv-series": {
    "title": "BBQシャック (TVシリーズ) (BBQ Shack)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>BBQシャック (TVシリーズ)<br><span style="font-size: 0.6em; color: #888;">BBQ Shack</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/bbq-shack-tv-series/Govermint's_BBQ_Shack.png" alt="BBQ Shack" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード (サンタモニカ近辺)</div>
                    <div class="info-label">勢力:</div><div class="info-value">ガバミント (The Govermint)</div>
                    <div class="info-label">リーダー:</div><div class="info-value">ソレル・ブッカー</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>

            <div class="note-box">
                ※Fallout 76に登場する「Big Fred's BBQ Shack（ビッグ・フレッドのBBQ小屋）」とは別のロケーションです。
            </div>
            
            <p><b>BBQシャック (BBQ Shack)</b> は、TVドラマ版に登場するガバミントの本部ロケーションです。</p>

            <h2>背景</h2>
            <p>かつてはカリフォルニア州サンタモニカの戦前のビジネス施設でしたが、2283年に新カリフォルニア共和国（NCR）の首都シェイディ・サンズが破壊された後のある時期に、「ソレル・ブッカー」がロサンゼルスの秩序を回復させるという独善的な使命のもとに自らの組織を結成し、それを「ガバミント（The Govermint = 政府もどき）」と名付け、自らを大統領としてこの古いレストランを彼らの本部として権利を主張しました。</p>
            <p>ここから彼らは、近くの「スーパーウルトラ・マーケット」を拠点とする臓器密売業者のヒューイとスクイレルなど、彼らが「保護ビジネス（みかじめ料）」のもとで確保している人々から貢物を集めるために、彼らの「保安官（Sheriffs）」を派遣するなどの作戦を行っています。<br>
            ブッカーの乗組員たちは、建物の近くで小さな農場も維持しているようで、自分たちの食料として肉を屠殺するための「豚（Hog）」を飼育しており、必要が生じた場合にはその豚を「ローテクな死体処理手段」としても利用しています。</p>

            <h3>指名手配書の壁</h3>
            <p>ガバミントの賞金の正当性は疑わしいものの、BBQ シャックの壁には価値のある対象の様々な賞金首ポスターが貼られています。<br>
            2296年時点で注目すべきものとしては、「リー・モルデイヴァー」や、少なくとも一人の「スーパーミュータント」、そして数人の「グール」などが含まれています。</p>

            <h2>TVシリーズでの登場 (第6話「罠」)</h2>
            <p>スーパーウルトラ・マーケットで発生したクライアント（ヒューイとスクイレル）の死の後、ガバミントの保安官によって連行されたグールは、このBBQシャックにあるガバミント本部に連れてこられ、大統領のソレル・ブッカーと再会します。<br>
            ブッカーは過去の遭遇からこのミュータントの賞金稼ぎを認識しており、長年にわたる「彼女（ジェイニー・ハワード）」への探求に言及しますが、グールにはそれを無視され、彼は代わりに針と糸を使って、ルーシーに噛みちぎられた自分の指を再接着することに 집중（しゅうちゅう） しました。</p>

            <p>ブッカーが、臓器密売ビジネスを破壊してガバミントのビジネスを混乱させたことでかつての同僚を非難し始めると、グールは彼と法執行官（保安官トロイ）を挑発し、フィリーでの銃撃戦の最中にトロイの父親を殺したのは自分だと主張してさらに火に油を注ぎます。<br>
            結局ブッカーが激怒して部下に「この客を外に連れ出して豚の餌にしろ」と命じますが、トロイがグールを捕まえようとした瞬間、グールは電光石火の早業でトロイとレックスを武装解除し、素早く二人を撃ち殺しました。<br>
            ブッカーにも対処しようとしたグールですが、ふと小屋の指名手配書の壁に目をやり一瞬気が散ります。特に、何世紀も前の大戦前に出会った「ミス・ウィリアムズ」こと現在のリー・モルデイヴァーのポスターに目を奪われたため、結果的にブッカーは殺されずに済みました。</p>

            <div class="quote-box">
                <b>Impression</b><br><br>
                崩壊した秩序の中で、ならず者たちが集まって勝手に「政府（The Govermint / 綴りが間違っている）」を名乗って保安官のバッジを付けているという、Falloutにおいてはよくあるチンピラ自警団の本部です。しかし、ここの壁に名指しで「スーパーミュータント（Super mutant）」の手配書が貼られていたことで、西海岸のTVドラマ版の舞台にもスーパーミュータントがしっかりと存在していることが判明した重要なシーンでもあります。
            </div>

            <p>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "soviet-satellite": {
    "title": "ソビエトの人工衛星 (Soviet satellite)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>ソビエトの人工衛星<br><span style="font-size: 0.6em; color: #888;">Soviet satellite</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/soviet-satellite/USSR_Satellite_TV.png" alt="Soviet satellite" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード (ロサンゼルス)</div>
                    <div class="info-label">所属:</div><div class="info-value">ソビエト連邦 (戦前)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>ソビエトの人工衛星 (Soviet satellite)</b> は、TVドラマ版に登場する落下した人工衛星のロケーションです。</p>

            <h2>背景</h2>
            <p>元々は「大戦」の前にソビエト連邦によって建設されたもので、地球周回軌道に打ち上げられていました。この間にどのような機能を果たしていたのかは不明です。<br>
            衛星は赤く塗装されており、2つのソーラーパネルを動力源としていました。衛星の底部には高度なカメラと通信システムと思われるものが格納されており、これが主に偵察・監視目的で構築されたことを示しています。カメラは大きな赤い球状の構造物で、ロシア語の「СССР（ソビエト社会主義共和国連邦）」の略称がはっきりと刻まれていました。</p>
            <p>2077年に爆弾が投下された後のある時点で、この衛星は軌道から大気圏に再突入し、ニューカリフォルニアの「ロサンゼルス国際空港（LAX）」の遺跡に近い平原に墜落した際に大きな損傷を受けました。<br>
            しかし完全に破壊されたわけではなく、機械の一部がはっきりと視認できるほど無傷な状態で残存しています。</p>

            <h2>TVシリーズでの登場</h2>
            <h3>第2話「ターゲット」</h3>
            <p>フィリーの街でグールから逃れた後、ルーシーはシギ・ウィルジグを護衛して古い空港近くの平原を横断しようとします。しかし、ウィルジグは出血による衰弱で歩武が遅れていました。<br>
            墜落した衛星の場所に到着する前のどこかの時点で、ウィルジグは自身の死を早めるために「プランD」のシアン化物（青酸カリ）カプセルを摂取していました。この事実を告げた上で、彼はルーシーに「外科用リッパー（Surgical Ripper）」を持たせ、中に「コールドフュージョン・アーティファクト」が入っている自分の首を切断し、残りの道のりをモルデイヴァーの元まで運んでほしいと懇願しました。<br>
            最初は抵抗したルーシーですが、最終的に外科的切断を実行し、首なしの死体を古い人工衛星にもたれかけさせたまま放置してその場を去りました。<br>
            その後、ウィルジグの匂いを嗅ぎ分ける犬のCX404（ドッグミート）を追いかけてきたグールによって、首のない死体とこの人工衛星が発見されます。</p>

            <h3>第3話「頭部」</h3>
            <p>ウィルジグの死体と人工衛星の元に、サディアスとマキシマス（タイタス・ナイトに変装した姿）が3番目の訪問者としてやってきます。彼らはブラザーフッド・オブ・スティールから見つけるように命じられたアーティファクトが死者の「頭」に埋め込まれていることに気づき、ルーシーとグールを追跡することになります。</p>

            <img src="images/note_extracted/soviet-satellite/FOTV_s1_ep2_LAX.png" alt="Lucy and Wilzig near satellite" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <h2>開発秘話</h2>
            <div class="note-box">
                FalloutのTVシリーズにおけるソビエトの人工衛星の登場は、初代『Fallout』ビデオゲームにおけるAK-112アサルトライフルに次いで、Falloutシリーズの正史（Canon）において戦後（分岐点後）のソビエトのテクノロジーが登場した2回目の事例となります。<br>
                ※『Fallout Tactics』の特別なエンカウントには宇宙ステーション「ミール（Mir）」を発見するものがありましたが、名前以外に所有権を示すゲーム内の証拠はなく、Tactics全体の設定が非正史（non-canon）を経てのちにあやふやな正史（dubious canon）として扱われるようになったため、それは該当しません。
            </div>

            <div class="quote-box">
                <b>Impression</b><br><br>
                Fallout世界において「ソビエト連邦」の戦前テクノロジーが映像作品として明確に登場したのはこれが初めてであり、ロア的に非常に貴重なランドマークです（中国軍アサルトライフルやステルスアーマーはよく出ますが、ソビエトの直接的な兵器や機材はほぼありません）。ロサンゼルス国際空港跡地の砂漠のど真ん中に、巨大な「СССР」の文字が刻まれた人工衛星が突き刺さっているビジュアルは、Falloutの異様なSF感を際立たせていました。
            </div>

            <p>Category:Fallout TV series locations<br>Category:Satellites<br>Category:Soviet Union</p>
        </main>
    </div>`
  },
  "red-rocket-tv-series": {
    "title": "レッドロケット (TVシリーズ) (Red Rocket)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>レッドロケット (TVシリーズ)<br><span style="font-size: 0.6em; color: #888;">Red Rocket - TV Series</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/red-rocket-tv-series/FOTV_Red_Rocket_2.png" alt="Red Rocket" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード周辺</div>
                    <div class="info-label">所有者:</div><div class="info-value">Red Rocket (戦前)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>レッドロケット・ガス・ステーション (Red Rocket gas station)</b> は、TVドラマ版に登場するガソリンスタンドのロケーションです。</p>

            <h2>背景</h2>
            <p>戦前のレッドロケット・カンパニーが所有していた全米の数多くのフランチャイズ店舗の一つであり、この特定のガソリンスタンドは広域ロサンゼルスエリアのどこかに位置しています。小さなヌカ・コーラのクーラー（保冷庫）とヌカ・コーラ自販機、そしてミルクの自販機が設置されています。</p>
            <p>23世紀後半の時点では、部分的に草木が生い茂っていますが、構造自体はほぼ無傷で残っています。</p>

            <h2>TVシリーズでの登場 (第7話「ラジオ」)</h2>
            <p>サディアス（従士）は、「コールドフュージョン・アーティファクト」が含まれたシギ・ウィルジグの死体の頭部を運びながらウェイストランドを横断しようと試みていました。しかし、彼は二つの要因で苦労していました。<br>
            一つは、マキシマスと揉み合った際にT-60パワーアーマーの足で誤って潰されてしまった自分の足の怪我。もう一つは、彼から主人の頭部を取り返そうと執拗に追いかけてくる犬の「CX404（ドッグミート）」の存在でした。</p>
            
            <p>サディアスがこの放棄されたレッドロケットのガソリンスタンドに到着した時、彼は短時間自分の負傷した足を診察し、古いヌカ・コーラのクーラーボックスに気づきます。彼は犬が自分をこれ以上妨害するのを防ぐため、あとで戻ってくるという空手形を切って、犬をそのクーラーボックスの中に閉じ込めることを選択し、足を引きずりながら立ち去りました。</p>
            <p>しばらくして、頭部の痕跡を追っていたグールがこのレッドロケットにやってきて、クーラーボックスから漏れるCX404の鳴き声を聞きつけます。彼はクーラーから彼女を出してやった後、渋々ながらも彼女を自分の仲間として迎え入れ、「ドッグミート（Dogmeat）」と呼び始めます。</p>

            <img src="images/note_extracted/red-rocket-tv-series/FOTV_Red_Rocket_set.png" alt="Set image" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <h2>開発秘話</h2>
            <ul>
                <li>レッドロケット・ガソリンスタンドを舞台にしたシーンは、ニューヨーク州ナイアックにある「本物のガソリンスタンド（Gulf Gas Station）」で撮影されました。このガソリンスタンドは、キアヌ・リーブス主演の映画『ジョン・ウィック』の撮影セットとしても使用されたことで有名です。</li>
                <li>プロダクション・デザイナーのハワード・カミングスによると、番組制作者たちは当初、彼が制作を要請するまでTVシリーズにレッドロケットのステーションを登場させるつもりはなかったそうです。ナイアックのガソリンスタンドの所有者は、映画スタッフが5日間それを使用することを許可しました。セットは3日間で建設され、1日で撮影が行われ、最後の日でセットが解体されました。</li>
                <li>グールがレッドロケット・ガソリンスタンドでCX404（後に「ドッグミート」と名付ける）と出会うという展開は、ゲーム『Fallout 4』において「唯一の生存者（Sole Survivor）」が同作のドッグミートとレッドロケット・トラックストップで出会うというお約束のオマージュです。</li>
            </ul>

            <div class="quote-box">
                <b>Impression</b><br><br>
                Fallout4以降のシリーズにおける象徴であり「相棒（犬）と出会う場所」の代名詞とも言えるレッドロケットです。ドラマ版でもしっかり踏襲され、ここからクーパーとドッグミート（CX404）のコンビが始動することになります。たった1日の撮影のためにジョン・ウィックで使われた本物のガソリンスタンドを改装してしまった情熱に感服です。
            </div>

            <p>Category:Fallout TV series locations<br>Category:Red Rocket locations</p>
        </main>
    </div>`
  },
  "hawthorne-medical-laboratories": {
    "title": "ホーソーン・メディカル・ラボラトリーズ (Hawthorne Medical Laboratories)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>ホーソーン・メディカル・ラボラトリーズ<br><span style="font-size: 0.6em; color: #888;">Hawthorne Medical Laboratories</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/hawthorne-medical-laboratories/FOTV_Hawthorne_Medical_Laboratories_2.png" alt="Hawthorne Medical Laboratories" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード (ロサンゼルス)</div>
                    <div class="info-label">親組織:</div><div class="info-value">Vault-Tec Corporation</div>
                    <div class="info-label">リーダー:</div><div class="info-value">ロイド・ホーソーン<br>カサンドラ・ホーソーン</div>
                    <div class="info-label">関連施設:</div><div class="info-value">Vault 4</div>
                </div>
            </div>
            
            <p><b>ホーソーン・メディカル・ラボラトリーズ (Hawthorne Medical Laboratories / HML)</b> は、TVドラマ版に登場する医療研究所であり、Vault 4の地上建造物です。</p>

            <h2>背景</h2>
            <p>大戦前の時代に設立されたホーソーン・メディカル・ラボラトリーズは、Vault-Tecコーポレーションの「子会社」でした。<br>
            カリフォルニア州ロサンゼルスにあるそのメインキャンパスは「<b>Vault 4</b>」の構造と直結していました。Vault 4は、HMLのリーダーであるロイド・ホーソーンとカサンドラ・ホーソーンが監督する「研究施設」として設計されたものであり、Vault 4の外部入り口はHMLキャンパスから目視できるすぐ近くの場所に作られています。</p>

            <h3>恐るべきブービートラップ</h3>
            <p>Vaultの主任研究員たちの「放射線と遺伝子学の実験」を支援するため、地上の建物（HML）は特殊な改造が施されていました。<br>
            正面玄関を入ってすぐの廊下はブービートラップ付きの部屋になっており、「医療保管病棟への入り口」という偽のドアのラベルを使って人々を誘き寄せ、その後、隠しシューター（落とし穴）を作動させて彼らを地底のVault 4内の除染室へと突き落とします。そこで彼らは「新しい実験対象（被験者）」として処理・管理されるという恐ろしい仕組みでした。</p>

            <h2>TVシリーズでの登場</h2>
            <h3>第6話「罠」</h3>
            <p>フィーンド（レイダー）のジャヴィンやリンクからの待ち伏せ攻撃を受けた際に負ったマキシマスの傷が悪化したため、ルーシーは彼のために医療品、特に抗生物質を探す道のりを手助けします。彼らは最終的にホーソーン・メディカル・ラボラトリーズの敷地跡に到達しますが、それがVault-Tecの資産であることを示す看板には気づきませんでした。<br>
            先行して偵察に行ったルーシーが戻ってこないため、マキシマス自身が中に入ると、彼もブービートラップに引っ掛かり、ルーシーと共にVault 4内に落とされて拉致されてしまいます。</p>

            <h3>第7話「ラジオ」</h3>
            <p>ルーシーが無許可でレベル12（かつての実験体や凄惨な研究記録が残されている区画）に侵入したことと、彼女を救出しようとしたマキシマスが平和なVault 4の居住者たちを無自覚に攻撃してしまったことが原因で、二人はVault 4から「追放」されることになりました。<br>
            出立する際、ルーシーはマキシマスを説得して、T-60パワーアーマーを動かすために彼がVaultのメインリアクターから盗んだ「フュージョン・コア」を彼らに返すように促します。二人は医療キャンパスのロビーに一時的に戻り、落とし穴（トラップドア）を通してコアを下に落とし、それを拾って間接的に感謝したVaultの清掃員に返却しました。</p>

            <img src="images/note_extracted/hawthorne-medical-laboratories/FOTV_Hawthorne_Medical_Labs_Vault_4.png" alt="Campus and Vault 4 entrance" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <h2>開発秘話</h2>
            <ul>
                <li>ホーソーン・メディカル・ラボラトリーズの名前を示すリリース前の画像が、Redditorの「u/PrinceDaCat」によって一般にリークされていました。</li>
                <li>ホーソーン・メディカル・ラボラトリーズのキャンパスのシーンは、ニューヨーク州スタテンアイランドにある「ベイリー・シートン病院（Bayley Seton Hospital）」で撮影されました。</li>
            </ul>

            <div class="quote-box">
                <b>Impression</b><br><br>
                一見すると大規模な医療研究所のキャンパス跡地のように見えますが、その実体は地下にある「Vault 4」の被験者（モルモット）をトラップドアで生け捕りにするための、超巨大な蜘蛛の巣のような詐欺施設でした。子会社を丸ごと使って生け贄を収集するという、Vault-Tecの底知れない邪悪さを象徴する拠点です。
            </div>

            <p>Category:Fallout TV series mentioned-only organizations<br>Category:Vault-Tec Corporation<br>Category:Pre-War companies<br>Category:Fallout TV series locations</p>
        </main>
    </div>`
  }
};

let updatedCount = 0;
for (const [slug, data] of Object.entries(translations)) {
    const filename = "f:/Fallout/" + slug + ".html";
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, "utf8");
        if (content.includes("<!-- RAW_WIKITEXT_START -->") && content.includes("<!-- RAW_WIKITEXT_END -->")) {
             const replaced = content.replace(/<main class="content">[\s\S]*?<\/main>/, data.text.match(/<main class="content">([\s\S]*?)<\/main>/)[0]);
             fs.writeFileSync(filename, replaced, "utf8");
             updatedCount++;
        } else { 
             const newContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - Fallout Lore Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body data-article-category="場所">
${data.text}
</body>
</html>`;
             fs.writeFileSync(filename, newContent, "utf8");
             updatedCount++;
        }
    } else {
        console.log("File not found: " + filename);
        const newContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - Fallout Lore Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body data-article-category="場所">
${data.text}
</body>
</html>`;
        fs.writeFileSync(filename, newContent, "utf8");
        updatedCount++;
    }
}
console.log("Updated " + updatedCount + " medium location files (Batch 1 - Pt 3).");
