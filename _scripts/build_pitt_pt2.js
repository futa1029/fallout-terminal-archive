const fs = require('fs');
const path = require('path');

const outFile = 'f:/Fallout/the-pitt.html';

const html2 = `
            <h3>第二次蜂起（ワーナーの反乱）</h3>
            <p>ある時期、ワーナーという名の男がアッシャーの軍隊に加わり、ピットのレイダー階級の中でもより賢いメンバーの一人として評判を得ました。2277年のある時点より前に、ワーナーはクーデターを起こしてアッシャーを打倒しようと試みましたが、失敗に終わりました。<br>
            反逆罪への罰として、他の奴隷が誰も着けていなかった「奴隷の首輪」を彼に装着させ、ファウンドリーへと送りました。</p>

            <p>この挫折にもかかわらず、ワーナーはピットを乗っ取るという計画を決して諦めず、ミディアという名の別の奴隷とともに2度目の企てのための下準備を始めました。やがて彼は電子工学の知識を活かして首輪を無効化し、キャピタル・ウェイストランドへと逃亡します。彼は外部からの支援を求めて無線放送を設定し、その救難信号を傍受した「孤独な放浪者（Lone Wanderer）」によって救助され、共に街へと潜入することになります。</p>

            <p>放浪者はミディアと接触し、最も危険な任務である「スチールヤード」での回収作業からピットの階層構造の底辺をスタートしました。その実力を証明した後、彼らは闘技場（The Hole）での戦いに志願させられ、数度の戦いを経て無慈悲なレイダーたちを打ち負かし、ついに自由を勝ち取ります。<br>
            結果的にアッシャーに対し謁見する権利を得る形になりましたが、アッシャーは放浪者をワーナーの仲間だと正確に特定していました。放浪者はそこで「ヘイブン」に入ることを許され、アッシャーの娘を誘拐してワーナーに引き渡すか、あるいはアッシャーの計画に協力するかという選択を迫られました。その裏では、ワーナーが暴動を扇動し、ヘイブンのレイダー地区にトログをなだれ込ませるための地盤を整えようとしていたのです。</p>

            <hr>

            <h2>エリアとレイアウト構成</h2>
            <p>この場所は『Fallout 3』では2277年のアドオン舞台として登場し、『Fallout 76』の時点（2104年）ではまだ遠征先（Expedition）としての姿を見せています。時代とゲームによって行ける場所や状況が異なります。</p>
            
            <h3>Fallout 76 時代のエリア (2104年)</h3>
            <p>遠征（Expeditions）モード限定で利用可能であり、レスポンダーのベルチバードに乗って進入します。市内はファナティックとユニオンの間で絶え間なく戦闘が続いており、ファナティックがファウンドリーやサンクタムなど街の主要な場所を制圧し優位に立っている状況です。</p>

            <ul>
                <li><b>インダストリアル（Industrial）</b>
                    <ul>
                        <li><b>ザ・ペン（The Penn）</b>: ペンシルベニアの「Penn」。ファナティックの労働施設や鉄道車両の基地。</li>
                        <li><b>ザ・ファウンドリー（The Foundry）</b>: 巨大な製鉄所。ファナティックの防衛の要であり彼らの本拠地。</li>
                    </ul>
                </li>
                <li><b>トレンチ（The Trench）</b>
                    <ul>
                        <li><b>トレンチの街（The Trench）</b>: 工業用排水や毒によって変異したクリーチャーが徘徊する荒廃した市街地。トログの温床。</li>
                        <li><b>ザ・サンクタム（The Sanctum）</b>: 地面が崩落した大きな聖堂。ファナティックによって占拠されている。</li>
                    </ul>
                </li>
                <li><b>ザ・バスティオン（The Bastion）</b></li>
            </ul>

            <div class="note-box">
                <b>製品ID早見表（Product ID cheat sheet）</b><br><br>
                51-BX: アブラクシオクリーナー<br>
                53-CC: アブラクシオクリーナー（工業用）<br>
                12-XX: スリザースベイン ※使用する場合は保護手袋を着用すること<br>
                21-DX: 肥料<br>
                99-ZX: 有害な液体<br><br>
                21-DXに関する注意：この製品は食用ではありません！「たった1回だけ」食べようとしたせいで、1週間ずっとトイレを出たり入ったりするハメになった奴がいる！<br><br>
                99-ZXに関する注意：これは、絶対に、12-XXの近くに置くな。<br>
                先週、バレルが12-XXの容器の隣に置かれていた。何が起こったと思う？火災だ。クソ火災だよ。俺たちはお前らの母親じゃないんだ。こんなことまで注意させないでくれ。
            </div>

            <div class="note-box">
                <b>廃棄物保管メモ（Waste storage memo）</b><br><br>
                廃棄物の保管について<br><br>
                99-ZXと12-XXの近接配置に関する規則の違反が多すぎるため、99-ZXのバッチ処理は、今後トレンチの空の保管庫で行う。<br><br>
                これは決定事項だ。<br>
                君の不満は承知しているが、また火事を起こしてボスの怒りを買うのはゴメンだ。<br>
                大人しく規則に従ってくれ。頼む。
            </div>

            <div class="note-box">
                <b>懸念する従業員のメモ（Concerned employee）</b><br><br>
                99-ZXのことで俺たちをトレンチに追いやる件について<br>
                トレンチへ降りる扉に鍵をかけたほうがいいと思う。<br><br>
                あそこの連中はどんどんイカれてきている。数日前、バレルをいくつか下ろしている最中に、誰かに肩を掴まれた。<br><br>
                彼を見た。いや、アレを見た。アレは目を持っていなかった。<br><br>
                俺は持っていたバレルを投げつけて、一目散に駆け上がった。
            </div>

            <h3>Fallout 3 時代のエリア (2277年)</h3>
            <p>2277年の放浪者が訪れた時、ピットはかつての栄華を失い、製鉄所の煙が空気をむせ返らせ、街の通りは放置された車両と瓦礫で塞がれていました。占有地域は逃亡を防ぐために周囲の廃墟からフェンスで隔離されており、サーチライトの光が街に広がるトログを遠ざけています。</p>

            <ul>
                <li><b>列車操車場（Train yard）</b>: 主な鉄橋は崩落し、トンネルも崩れているため鉄道での移動は不可能。少数のレイダーが奴隷の逃亡や敵の侵入を見張っている。</li>
                <li><b>ピットの橋（Bridge）</b>: 「ワバッシュ橋」。アッシャーの支配にもかかわらず、ここにはワイルドマンが住み着いている。罠と地雷、獰猛な犬が配置されているが、下の致死的な放射能の川に飛び込むよりはマシである。</li>
                <li><b>ダウンタウン（Downtown）</b>: 奴隷たちの大半が住む、陰惨で汚れた絶望的な場所。レイダーたちが支配し、奴隷は犬以下の扱いを受けている。上空の足場はレイダーたちの領域。</li>
                <li><b>アップタウン（Uptown）</b>: 主にピットレイダーの楽園。トログの侵入を防ぐための照明と防衛設備が常にチェックされている。見捨てられた荒廃したアパート群が並ぶ。</li>
                <li><b>スチールヤード（Steelyard）</b>: かつて鉄鋼生産の中心だった場所。現在はトログとワイルドマンが徘徊しており、ここで働くよう命じられた奴隷は死ぬか、あるいは食い殺される運命にある。</li>
                <li><b>ヘイブン（Haven）</b>: アップタウンの中心の巨大な広場の奥にそびえ立つ高層ビル。アッシャーの本拠地であり、治療法の実験が行われている。入り口の前には巨大な彫像（炎）が配置されている。</li>
                <li><b>地下（Underground）</b>: スチールヤードとアップタウンをつなぐ忘れられた通路や下水道の数々。発電施設でもあり、現在は多数のトログが蔓延っている。</li>
            </ul>

            <hr>

            <h2>ターミナルエントリの記録</h2>
            <div class="note-box">
                <b>ブラックウォーター鉱山のターミナル - 報告：77年8月13日 (FO76)</b><br><br>
                ピッツバーグの連中から手紙が来た。<br>
                あいつら、うちの機材を借りたがってる。見返りに石炭の一部を渡すと言ってきた。バカバカしい。機材を貸す気はないし、石炭も要らない。どうせあんな連中、もう長くないだろう。<br>
            </div>

            <div class="note-box">
                <b>ザ・サンクタムのターミナル (FO76)</b><br><br>
                <b>[ ユニオンとの衝突 ]</b><br>
                ユニオンの連中がまた俺たちの領土に進入しやがった。前回の取引の後だから、少しは大人しくなるだろうと思っていたのに。甘かったか。<br>
                これ以上は容赦しねぇ。見つけ次第殺せ。あのバカどもに、誰がこの街を支配してるか思い知らせてやる。<br><br>
                <b>[ ガードの配置 ]</b><br>
                サンクタムの防衛を強化しろ。<br>
                ユニオンの連中がいつ襲ってくるかわからんし、トログどももウロチョロし始めている。<br>
                これ以上奴らに侵入を許すわけにはいかない。<br>
                見つけた動くものは、ユニオンだろうがトログだろうが、問答無用で撃ち殺せ。<br><br>
                <b>[ トンプソン軍曹への懸念 ]</b><br>
                あのトンプソンとかいう軍人が生きているという噂を聞いた。<br>
                彼がユニオンと手を結んだら厄介なことになるかもしれない。早めに見つけ出して始末しろ。<br>
                ファナティックの計画を邪魔する奴は誰も生かしちゃおけねぇ。
            </div>

            <div class="note-box">
                <b>ヘイブンのターミナル (FO3: リサーチ・ターミナル - トログの研究)</b><br><br>
                10年間の研究を経ても、彼らの病態について分かったことはわずかだ。TDC（Troglodyte Degeneration Contagion）の感染メカニズムは複雑で、環境中の変異原性物質と放射能の複合的な影響だと推測される。<br>
                大人たちは長期間かけて感染し、精神的な退行を示す。これが「ワイルドマン」と呼ばれる状態だ。最終的には四肢の形態が変化し、完全な「トログ」へと退行する。<br><br>
                赤ん坊の場合、事態はさらに深刻だ。免疫システムが未熟なため、環境に曝された新生児は数日から数ウイークでトログ化の兆候を示す。<br>
                現在、有望な抗体を持つ被験体（娘のマリー）から血清を開発しようと試みている。これがピットの未来を救う唯一の希望だ。
            </div>

            <hr>

            <h2>関係者・登場人物</h2>
            <p>※複数の時代と勢力にまたがるため、多くのキャラクターが存在します。</p>

            <h3>Fallout 76 (2104年時)</h3>
            <ul>
                <li><b>ヘックス (Hex)</b>: ユニオンの指導的立場にある人物の一人。</li>
                <li><b>ダニーロ (Danilo)</b>: ピットに入るための案内人。</li>
                <li><b>エヴァ・ローズ (Ava Rose)</b>: ユニオンのメンバーで回収担当。</li>
                <li><b>スキッピー・ローリッチ (Skippy Roerich)</b>: ユニオンのメンバーで、ファウンデーションのペイジとは顔見知り。</li>
                <li><b>ファナティックの指導層</b>: ワーナーなどの後のレイダーにつながる狂暴な一団。</li>
            </ul>

            <h3>Fallout 3 (2277年時)</h3>
            <ul>
                <li><b>アッシャー卿 (Lord Ashur)</b>: イシュマエル・アッシャー。元B.O.S.の兵士であり、現在のピットの独裁的な指導者。</li>
                <li><b>ワーナー (Wernher)</b>: ピットのレイダーだったが造反し奴隷に落とされた男。第二次蜂起の首謀者。</li>
                <li><b>ミディア (Midea)</b>: スレイブの女性。ワーナーと結託し、彼のためのスパイとして居住区で活動。</li>
                <li><b>サンドラ・クンダニカ (Sandra Kundanika)</b>: アッシャーの妻であり研究者。ヘイブンで治療法を研究。</li>
                <li><b>マリー (Marie)</b>: アッシャーとサンドラの赤ん坊。TDC対する完璧な免疫を持つ。</li>
                <li><b>エベレット (Everett)</b>: スチールヤードの監督をするレイダー。口は悪いが働きには報いる男。</li>
                <li><b>メックス (Mex)</b>: ダウンタウンへのゲートの警備主任。</li>
                <li><b>レッドアップ (Reddup)</b>: 新米奴隷から身ぐるみを剥ぐ悪党レイダー。</li>
                <li><b>フライデー (Friday)</b>, <b>ハリス (Harris)</b>: 武器や物資の交換商人（レイダー）。</li>
                <li><b>マリー (Marie)</b>: アッシャーとサンドラの子供。</li>
            </ul>

            <hr>

            <h2>ギャラリー</h2>
            <div class="gallery">
                <img src="images/note_extracted/the-pitt/Welcome_Pitt.png" alt="Fallout 3: ピットへの歓迎看板" class="gallery-img" onclick="openLightbox(this.src)">
                <div class="caption">Fallout 3での「Welcome to the Pitt」</div>
                
                <img src="images/note_extracted/the-pitt/Ashur's_Palace.png" alt="アッシャーの宮殿" class="gallery-img" onclick="openLightbox(this.src)">
                <div class="caption">アッシャーの宮殿（ヘイブン）</div>
                
                <img src="images/note_extracted/the-pitt/FO76_Exp_Pittsburgh.png" alt="Fallout 76: ピットへの歓迎看板" class="gallery-img" onclick="openLightbox(this.src)">
                <div class="caption">Fallout 76での「Welcome to the Pitt」</div>
                
                <img src="images/note_extracted/the-pitt/F76TP_Foundry_Room.jpg" alt="ファウンドリーの内部" class="gallery-img" onclick="openLightbox(this.src)">
                <div class="caption">ファウンドリー（製鉄所）の内部</div>

                <img src="images/note_extracted/the-pitt/FO76_The_Pitt_Sanctum_Vertibird_LZ.png" alt="サンクタムのベルチバード着陸地点" class="gallery-img" onclick="openLightbox(this.src)">
                <div class="caption">サンクタムのベルチバード着陸地点</div>

                <img src="images/note_extracted/the-pitt/FO76_The_Pitt_Fanatic_Labor_Yard.png" alt="ファナティックの労働ヤード" class="gallery-img" onclick="openLightbox(this.src)">
                <div class="caption">ファナティックの労働ヤード</div>

                <img src="images/note_extracted/the-pitt/FO76_The_Pitt_Trench_Upper_Street_Buildings.png" alt="トレンチの崩壊した建物" class="gallery-img" onclick="openLightbox(this.src)">
                <div class="caption">トレンチの崩壊した建物群</div>

                <img src="images/note_extracted/the-pitt/FO76_Pitt_Mission_Icon.svg" alt="Fallout 76: ピットのアイコン" class="gallery-img" onclick="openLightbox(this.src)">
                <div class="caption">Fallout 76: ピットのアイコン</div>
                
                <img src="images/note_extracted/the-pitt/FO76_The_Pitt_Keyart_HD.jpg" alt="シーズンキーアート" class="gallery-img" onclick="openLightbox(this.src)">
                <div class="caption">ピットのキーアート（ユニオンのパワーアーマー）</div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                Fallout 3でおそらく最も心に残る（そして胃が痛くなる）選択を迫られる場所であり、さらに76の「Expeditions」の第一弾として私たちプレイヤーを再び絶望の鉄鋼都市へといざなってくれた、シリーズでも屈指の存在感を放つロケーションです！<br>
                大戦前の栄華から一転、川の水質汚染と放射線による「TDC（トログ病）」という呪いに見舞われ、徐々に人間性を失っていくというプロセスは、レイダーの暴力以上に恐ろしいピットの根幹的な恐怖ですよね。<br>
                B.O.S.のオウイン・リオンズによる「スカージ（大虐殺）」が、結果的にアッシャーという新たな地獄の王を生み出してしまった皮肉もたまりません。<br>
                そして何より、3本編で見せつけられるアッシャーの理想と現実。彼は確かに奴隷とレイダーという残酷な階級制度を敷いていますが、それは「いつか免疫を持つ赤子（自分の娘）の力で病を克服し、全員を救うため」という強烈な善意の裏返しでもありました。対するワーナーの反乱に加担すれば、奴隷は解放されるかもしれませんが、赤ん坊の運命はどうなるのか……。あのジレンマは、プレイヤー自身の倫理観をえぐってくる最高のアドオン体験でした。<br>
                76ではまだアッシャーが台頭する前の、ファナティックとユニオンが泥沼の抗争を繰り広げている時期が描かれており、ペイジたちが入植者としてファウンデーションに逃れてきた背景も直接体感できます。時代を超えてFalloutの歴史の重さと、そこで生きる人々の業の深さを感じさせてくれる、最高にスモッグが目に沁みる街ですね！
            </div>

            <!-- コメントセクション -->
            <div class="comments-section" id="comments-section">
                <div class="comments-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    USER COMMENTS
                </div>
                
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" placeholder="[Type your comment here...]"></textarea>
                    <div class="comment-form-footer">
                        <span class="char-count" id="char-count">0/500</span>
                        <button id="submit-comment" class="comment-submit-btn" disabled>POST COMMENT</button>
                    </div>
                </div>

                <div id="comment-msg" class="comment-msg"></div>

                <div class="comments-list" id="comments-list">
                    <!-- コメントがここに挿入される -->
                    <div class="comment-loading">Loading database records...</div>
                </div>
            </div>

            <div class="copyright">
                <p>This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/The_Pitt" target="_blank" rel="noopener">The Pitt</a>, <a href="https://fallout.fandom.com/wiki/The_Pitt_(Fallout_3)" target="_blank" rel="noopener">The Pitt (Fallout 3)</a>, and <a href="https://fallout.fandom.com/wiki/The_Pitt_(Fallout_76)" target="_blank" rel="noopener">The Pitt (Fallout 76)</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p>&copy; Overseer Mohi's Terminal — Fallout Lore Archive</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>
        </main>
    </div>

    <!-- Lightbox -->
    <div class="lightbox-overlay" id="lightbox-overlay" onclick="closeLightbox()">
        <img class="lightbox-img" id="lightbox-img" src="" alt="Enlarged Image">
    </div>

    <script>
        const THE_PITT_ARTICLE_ID = 'the-pitt';
        
        let supabaseUrl = '';
        let supabaseKey = '';
        
        // 開発環境と本番環境でのキーの取得を試みる
        if (typeof window.process !== 'undefined' && window.process.env) {
            supabaseUrl = window.process.env.SUPABASE_URL || '';
            supabaseKey = window.process.env.SUPABASE_KEY || '';
        }

        // Like機能の初期化
        document.addEventListener('DOMContentLoaded', () => {
            if (supabaseUrl && supabaseKey && window.supabase) {
                 const client = window.supabase.createClient(supabaseUrl, supabaseKey);
                 // init
            }
        });
        
        function toggleLike(btn) {
           let countSpan = btn.querySelector('.like-count');
           let curr = parseInt(countSpan.textContent) || 0;
           if (!btn.classList.contains('liked')) {
              btn.classList.add('liked');
              btn.querySelector('.like-icon').textContent = '♥';
              countSpan.textContent = curr + 1;
           } else {
              btn.classList.remove('liked');
              btn.querySelector('.like-icon').textContent = '♡';
              countSpan.textContent = Math.max(0, curr - 1);
           }
        }
        function openLightbox(src) {
            document.getElementById('lightbox-img').src = src;
            document.getElementById('lightbox-overlay').classList.add('active');
        }
        function closeLightbox() {
            document.getElementById('lightbox-overlay').classList.remove('active');
        }
    </script>
</body>
</html>
`;

fs.appendFileSync(outFile, html2, 'utf8');
console.log('Part 2 appended.');
