const fs = require('fs');

const translations = {
  "house-resort": {
    "title": "ハウス・リゾート (House Resort)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>ハウス・リゾート<br><span style="font-size: 0.6em; color: #888;">House Resort</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/house-resort/FOTV_House_Resort.jpg" alt="House Resort" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">モハビ・ウェイストランド</div>
                    <div class="info-label">所属:</div><div class="info-value">キャンプ・ゴルフ</div>
                    <div class="info-label">元所有者:</div><div class="info-value">Mr.ハウス</div>
                    <div class="info-label">勢力(2281):</div><div class="info-value">新カリフォルニア共和国 (NCR)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout: New Vegas<br>Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>ハウス・リゾート (House Resort)</b> は、モハビ・ウェイストランドの「キャンプ・ゴルフ」の敷地内にある建物のロケーションです。TVドラマ版シーズン2にも登場します。</p>

            <h2>背景</h2>
            <p>戦前の時代、「ロバート・ハウス（Mr.ハウス）」が個人的に所有していた高級リゾート施設です。この建物は、レイク・ラスベガスの北西の湖畔に建てられており、ゴルフコース等を含む広大な保養施設の中心でした。</p>
            <p>「大戦」後、しばらく放棄されていましたが、2281年（New Vegas時代）にはモハビに進出した新カリフォルニア共和国（NCR）がこの施設を接収。彼らはこのリゾートを「キャンプ・ゴルフ（Camp Golf）」と名付け、特にエリート部隊である**NCRレンジャー**たち（とハロン総長）の居住・司令部として利用しています。<br>
            一般の歩兵（トルーパー）たちが外の「キャンプ・ゴルフのテント」で貧相な寝起きをしているのに対し、レンジャーたちはこの豪華な戦前のリゾートビルを満喫しており、NCR内部の階級格差を象徴する場所となっています。</p>

            <h2>TVシリーズでの登場 (シーズン2)</h2>
            <p>TVドラマ版のシーズン2において、モハビ地域を旅する登場人物たちがこのリゾート跡の近辺を通過・訪問します。（詳細な役割は劇中で描写されます）。巨大な塔を持つ美しいリゾート建築は、荒廃した砂漠の中で異彩を放っています。</p>

            <img src="images/note_extracted/house-resort/House_Resort.jpg" alt="Resort in FNV" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <div class="quote-box">
                <b>Impression</b><br><br>
                ゲーム内（NV）では、NCRレンジャーの最高峰である「NCRベテランレンジャー」たちがうろついている威圧感のある場所です。TVドラマ版でも特徴的な建物の外観が実写で再現されており、Mr.ハウスがかつてどれほどの資産と権力を持っていたかを視覚的に証明する素晴らしいランドマークです。
            </div>

            <p>Category:Fallout: New Vegas locations<br>Category:Camp Golf buildings<br>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "enclave-research-colony": {
    "title": "エンクレイヴの研究コロニー (Enclave research colony)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>エンクレイヴの研究コロニー<br><span style="font-size: 0.6em; color: #888;">Enclave research colony</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/enclave-research-colony/FOTV_Enclave_research_colony_3.png" alt="Enclave research colony" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">不明 (雪山に位置)</div>
                    <div class="info-label">勢力:</div><div class="info-value">エンクレイヴ</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>エンクレイヴの研究コロニー (Enclave research colony)</b> は、TVドラマ版に登場するエンクレイヴの隠された科学施設です。</p>

            <h2>背景</h2>
            <p>2296年現在において「エンクレイヴ」の科学者・職員たちが活動している巨大な軍事・研究複合施設です。<br>
            雪に覆われた山岳地帯に位置するこの拠点は、深い堀（溝）とタレット・マシンガンによる自動防衛網で守備されており、敷地内には複数のアンテナ、研究棟、および兵士の駐屯施設が存在します。エンクレイヴの科学者たちは、この施設内で「犬の育成プログラム」等の動物実験や、そして極秘裏に「コールドフュージョン（常温核融合）」の装置に関する分析と研究を行っていました。</p>

            <p>内部はエンクレイヴらしい無機質なコンクリートと冷たい照明で満たされており、武装した兵士やオフィサーたちが巡回しています。「シギ・ウィルジグ」はこの施設の主任研究員の一人でした。</p>

            <h2>TVシリーズでの登場 (第2話「ターゲット」)</h2>
            <p>ドラマの第2話の序盤（フラッシュバック）において、この施設の内部が詳細に描かれます。<br>
            シギ・ウィルジグは研究室の自分のデスクで「コールドフュージョン・アーティファクト（青く光るカプセル）」を観察中に、別の研究者にあわや見つかりそうになり、それを急いで自分の首（皮膚の下）に埋め込みました。<br>
            同時に、彼は秘密裏に育てていた犬「CX404」を焼却処分される運命から救い出し、共謀してこの施設からの脱走を決意します。<br>
            彼は夜間にCX404と共に廊下を移動しますが、警備員に見つかりそうになります。しかし、脱走に気づいていた同僚の科学者が自己犠牲的に彼を匿い、ウィルジグは施設を脱出。「荒野（The Wilds）」へと逃亡しました。<br>
            この「エンクレイヴからの脱走劇」が、のちにルーシー、マキシマス、グールの運命を交差させるすべての物語の発端となります。</p>

            <img src="images/note_extracted/enclave-research-colony/FOTV_Enclave_facility.jpg" alt="Enclave facility interior" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <div class="quote-box">
                <b>Impression</b><br><br>
                Fallout 2のオイルリグ、Fallout 3のレイヴン・ロックに連なる、エンクレイヴ特有の「陰鬱で権威的な極秘施設」の雰囲気が映像で完璧に表現されています。2296年時点でも彼らがまだこれほど大規模な施設を維持し、冷酷な人体・動物実験を行っているという事実は、エンクレイヴが完全に滅びたわけではないことを示しています。
            </div>

            <p>Category:Fallout TV series locations<br>Category:Enclave locations</p>
        </main>
    </div>`
  },
  "camp-golf": {
    "title": "キャンプ・ゴルフ (Camp Golf)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>キャンプ・ゴルフ<br><span style="font-size: 0.6em; color: #888;">Camp Golf</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/camp-golf/FNV_Camp_Golf.jpg" alt="Camp Golf" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">モハビ・ウェイストランド</div>
                    <div class="info-label">勢力(2281):</div><div class="info-value">新カリフォルニア共和国 (NCR)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout: New Vegas<br>Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>キャンプ・ゴルフ (Camp Golf)</b> は、モハビ・ウェイストランドにおける新カリフォルニア共和国 (NCR) の主要な軍事拠点の一つです。</p>

            <h2>背景</h2>
            <p>戦前の「ハウス・リゾート」とその周囲のゴルフコース跡地に構築されたNCR（新カリフォルニア共和国軍）の軍事キャンプです。レイク・ラスベガスの北西湖畔に位置します。<br>
            キャンプ・マッカラン（Camp McCarran）ほどの規模はありませんが、この場所は非常に重要な役割を担っており、特に「NCRレンジャー」たちの司令部として機能しています。<br>
            最高総責任者であるハロン総長（Chief Hanlon）が駐在し、NCRベテランレンジャーたちが多数配備されています。一方で、敷地内の外周部には普通の歩兵（トルーパー）たちがテント生活を強いられており、内部の待遇格差が激しい場所です。</p>

            <h2>TVシリーズでの登場 (シーズン2)</h2>
            <p>ドラマ版のシーズン2において、モハビ・ウェイストランドの風景の一部としてこのかつての「キャンプ・ゴルフ」の跡地（または現在の姿）が登場します。2296年時点でNCRがモハビから完全に撤退しているのか、あるいは何者かがこのリゾート跡を再占拠しているのかが描かれます。</p>

            <div class="quote-box">
                <b>Impression</b><br><br>
                ゲーム版プレイヤーにとっては「ハロン総長に会いにいく場所」であり、終盤の重要なクエストの分岐点となる場所です。また、強力な武器「レンジャー・セコイア」を持っているNCRベテランレンジャーがたくさんいるため、あの手この手で彼らの装備を拝借しようと試みたコンバインも多いはずです。ドラマ版でもその特徴的なリゾート建築が再現されています。
            </div>

            <p>Category:Fallout: New Vegas locations<br>Category:New California Republic locations<br>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "vault-tec-headquarters-tv-series": {
    "title": "Vault-Tec コーポレーション本部 (TVシリーズ) (Vault-Tec headquarters)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>Vault-Tec コーポレーション本部 (TVシリーズ)<br><span style="font-size: 0.6em; color: #888;">Vault-Tec headquarters</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/vault-tec-headquarters-tv-series/FOTV_Vault-Tec_HQ_1.png" alt="Vault-Tec headquarters" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">カリフォルニア</div>
                    <div class="info-label">所有者:</div><div class="info-value">Vault-Tec Corporation</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>

            <div class="note-box">
                ※Fallout 3等に登場した東海岸のVault-Tec本社（ワシントンD.C.のビル）とは異なる西海岸の重要拠点です。
            </div>
            
            <p><b>Vault-Tec コーポレーション本部 (Vault-Tec headquarters)</b> は、TVドラマ版に登場する戦前の大企業Vault-Tecの西海岸における主要な本社ビルです。</p>

            <h2>背景</h2>
            <p>カリフォルニアに位置する、巨大なVault-Tecコーポレーションの西海岸本部（あるいは重役用のメインビル）です。<br>
            巨大なピラミッド状（あるいはジッグラト状）の特徴的な建築デザインをしており、内部にはVault-Tecの高級幹部たち（バーヴなど）が使用する超豪華な会議室が存在します。</p>

            <h2>TVシリーズでの登場 (第8話「始まり」)</h2>
            <p>ドラマ版の最終話における戦前（2077年）のフラッシュバック・シーンの主要な舞台となります。<br>
            クーパー・ハワードは妻のバーヴを尾行し盗聴器を使って、この巨大な本社ビルの内部で行われている「極秘の会議」を盗み聞きします。<br>
            会議室には、バーヴの他に、ロブコ・インダストリーズの「ミスター・ハウス（ロバート・ハウス）」、REPCONNの「フリーダ・ストロング」、ビッグMTの「シンクレア」など、戦前アメリカを牛耳る超巨大企業のトップたちが集結していました。</p>
            <p>バーヴは彼らに対し「ピースオブマインド（心の平安）」を売るビジネスモデルとして、ライバル企業同士でそれぞれのVaultの内部で好きな「実験（マネジメント）」を行う権利を分配するという恐るべき提案をします。さらに、平和交渉が進み戦争の危機が去ろうとしていることを懸念する彼らに対し、バーヴはVault-Tec自らが「（利益回収のために）自分たちで爆弾を落とす」という究極の陰謀を提案し、クーパーはそれを聞いて愕然とします。</p>

            <img src="images/note_extracted/vault-tec-headquarters-tv-series/FoTV_Vault_Tec_HQ_Conference_room.jpg" alt="Meeting room" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <div class="quote-box">
                <b>Impression</b><br><br>
                Falloutの世界を決定づけた「大戦（核戦争）」の引き金を引いたのが誰なのかを探る上で、最も衝撃的な証言が飛び出した舞台です。「Mr.ハウス等、他企業のトップが勢揃いして自分たちのVaultの実験内容を決める」というクロスオーバー的な見せ場でもあり、Vault-Tecの救いようのない邪悪さが頂点に達したシーンとして、ファンの間で非常に大きな反響を呼びました。
            </div>

            <p>Category:Fallout TV series locations<br>Category:Pre-War companies<br>Category:Vault-Tec Corporation</p>
        </main>
    </div>`
  },
  "mick-ralph-s": {
    "title": "ミック＆ラルフ (Mick & Ralph's)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>ミック＆ラルフ<br><span style="font-size: 0.6em; color: #888;">Mick & Ralph's</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/mick-ralph-s/FOTV_Mick_&_Ralph's_2.png" alt="Mick & Ralph's" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">フリーサイド</div>
                    <div class="info-label">所有者:</div><div class="info-value">ミック / ラルフ</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout: New Vegas<br>Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>ミック＆ラルフ (Mick & Ralph's)</b> は、フリーサイド（NVおよびTVドラマ版）にある有名な商店です。</p>

            <h2>背景</h2>
            <p>フリーサイドの東門を入ってすぐの場所にある商店です。2281年の時点では、ミックが武器や弾薬を、ラルフが日用品・雑貨と「偽装パスポート（ストリップ地区に入るための偽造通行証）」を販売しています。<br>
            彼らはフリーサイドの中で最も良心価格で取引を行うことで知られており、「ミック・アンド・ラルフへようこそ！ここにはあなたが探し求めているものが（おそらく）何でも揃っています！」という呼び込みの少年を雇っていることでも有名です。</p>

            <h2>TVシリーズでの登場 (シーズン2)</h2>
            <p>ドラマ版のシーズン2において、フリーサイドに存在するこの「ミック＆ラルフ」の看板が登場します。ゲーム版と同じく、ジャンクで作られた特徴的な看板が掲げられています。<br>
            フリーサイドの街は、2296年時点でも相変わらず治安が悪く、ルーシーが関わった（別の店である）「ソニーズ・サンドリーズ」等と同様に、この商店も波乱に満ちたウェイストランドの経済基盤の一部として描写されます。</p>

            <img src="images/note_extracted/mick-ralph-s/Mick_&_Ralph's.jpg" alt="Mick & Ralph's in FNV" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <div class="quote-box">
                <b>Impression</b><br><br>
                「ストリップ地区へ入るための偽造パス（500キャップ）」を作ってもらったり、奥の隠し武器庫に案内してもらったりと、New Vegasのプレイヤーにとっては非常にお世話になる商店です。「客引きの少年」の声を思い出して懐かしくなる人も多いでしょう。ドラマ版でもフリーサイドの商店街の一つとして実写化されました。
            </div>

            <p>Category:Fallout: New Vegas locations<br>Category:Freeside buildings<br>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "king-s-school-of-impersonation": {
    "title": "キングス・インパーソネーション・スクール (King's School of Impersonation)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>キングス・インパーソネーション・スクール<br><span style="font-size: 0.6em; color: #888;">King's School of Impersonation</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/king-s-school-of-impersonation/FOTV_King's_School_of_Impersonation_2.png" alt="King's School of Impersonation" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">フリーサイド</div>
                    <div class="info-label">勢力(2281):</div><div class="info-value">キングス (The Kings)</div>
                    <div class="info-label">リーダー:</div><div class="info-value">キング (The King)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout: New Vegas<br>Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>キングス・インパーソネーション・スクール (King's School of Impersonation)</b> は、フリーサイド（NVおよびTVドラマ版）にあるギャング集団「キングス」の本部です。</p>

            <h2>背景</h2>
            <p>大戦前の時代、この建物は「ザ・キング（エルヴィス・プレスリーを露骨に模した人物）」の声や身振りを教えるモノマネ学校（Impersonation School）であり、大量のポマードやレザージャケット、歌の教本などが残されていました。</p>
            <p>大戦後、この建物を見つけたウェイストランダーの一団が、残されていたテープから流れる「ザ・キング」の歌声とスタイルに感銘を受け、彼を敬うための新興勢力ギャング「<b>キングス（The Kings）</b>」を結成しました。<br>
            彼らは髪をポマードで固め、レザージャケットを着て、独自の掟と美学（弱者を守るチンピラ）に従ってフリーサイドの治安維持と縄張りの管理を行っています。リーダーである「キング（The King）」は、サイバードッグのレックスを従え、このスクールの建物を彼らの「宮殿（本部）」としています。</p>

            <h2>TVシリーズでの登場 (シーズン2)</h2>
            <p>ドラマ版のシーズン2において、フリーサイドに残るこの象徴的なピンク色のネオン看板「King's School of Impersonation」の残骸が登場します。<br>
            2296年現在、壁の上部にあった特徴的なギターの巨大看板は失われ、建物はより荒廃しているように見えます。キングスという勢力がまだ存続しているのかどうかは、フリーサイドの風景を彩る一部として描かれます。</p>

            <img src="images/note_extracted/king-s-school-of-impersonation/FNV_King's_School_of_Impersonation_exterior.jpg" alt="Exterior in FNV" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <div class="quote-box">
                <b>Impression</b><br><br>
                エルヴィス・プレスリーをご先祖様か偉大な神のように崇拝するリーゼントのギャングたち、という「Falloutならではのおバカでクール」な組織が住んでいた本部です。フリーサイドにおける最も有力な自警団・ギャングでしたが、ドラマ内（2296年）で看板がボロボロになっているのを見ると、少し物悲しい気持ちにさせられます。
            </div>

            <p>Category:Fallout: New Vegas locations<br>Category:Freeside buildings<br>Category:Fallout TV series locations</p>
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
console.log("Updated " + updatedCount + " medium location files (Batch 3 - Final 6).");
