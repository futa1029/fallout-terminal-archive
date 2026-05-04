const fs = require('fs');

const htmlContent = `
            <h4>復権派 (Restorers / Fallout 4)</h4>
            <p><i>（メイン記事：Brotherhood of Steel (Fallout 3)）</i></p>

            <div class="quote-box">
                「大戦争の前、科学やテクノロジーは恩恵というより『重荷』に成り下がっていた。原子爆弾、生物工学によって作られた疫病、そしてFEV（強制進化ウイルス）。これらはテクノロジーの進歩がもたらした『恐怖』の明白な例だ。<br>
                我々は、そんな悲劇が二度と起きないよう確実にするためにここにいる」<br>
                <span style="color:#aaa;">— パラディン・ダンス（2287年）</span>
            </div>

            <p>2280年代、エルダー・アーサー・マクソンの下で大きなイデオロギーの改革が導入されました。かつての22世紀の創生期のブラザーフッドと同様に、東海岸の（連邦）支部は自らを『人類の進歩』に再び捧げました。<br>
            ブラザーフッドは、ウェイストランドの政治において積極的（武力的）な役割を果たすだけでなく、かつての「伝統主義者」のルーツと、エルダー・リヨンズの「アボミネーション（忌まわしき存在）を根絶する」という方針の双方を融合させ、さらにテクノロジーを管理・統制するための新たなアプローチを組み込んだのです。<br>
            人間の科学的な干渉によってもたらされたアボミネーションは、人類が繁栄するために破壊・根絶されなければならない『災い（Scourge）』と見なされています。このリストには通常、スーパーミュータントやフェラル・グールが含まれますが、ブラザーフッドはもちろんレイダーなどの人類の脅威も「当然のこととして」排除します。</p>

            <p>さらに、彼らにとってテクノロジーの『管理』は「目的を達成するための手段」であると見なされています。<br>
            崩壊しつつあった西海岸のブラザーフッドは、自らの破滅と絶滅を避けるための手段としてテクノロジーを管理しようと隠匿・孤立化していましたが、マクソンのブラザーフッドは『封じ込め』という作設当初の「本来の使命（Original mission）」に立ち返りました。完全に制御することができず、その結果人々の長期的な福祉や生存さえも脅かすような危険な技術（兵器）から、純粋に人類を保護することです。</p>
            <p>その結果、ブラザーフッドはテクノロジーの「本質」とその力、人間にとっての意味を理解しようと努め、その力を自らの目的のために乱用し「その過程で人類を危険にさらす者たち（インスティチュートなど）」と全力で戦います。<br>
            このイデオロギーに基づき、ブラザーフッドは「テクノロジーのためのテクノロジーの発展」を強烈に拒絶し、大戦争の教訓から物事を導き出しています。テクノロジーの進歩が『人間の自制心』と『道徳的進歩』の限界をはるかに上回った結果として、核の炎が世界を焼き尽くしたと信じているからです。<br>
            戦前のメガコーポレーション（巨大企業）が自らの利益のために新技術を悪用し、社会や環境への巻き添え被害を無視して現金を懐に入れた「大量消費主義と貪欲さ」。これらは大戦争を招いた最大の原因です。</p>

            <img src="images/note_extracted/brotherhood-base/Fallout_4_Brotherhood_of_Steel_Knight.jpg" class="article-image left" alt="インスティチュートを敵対視するBOS" onerror="this.src='images/placeholder.jpg'">

            <p>これらの理想から、人間と区別がつかない極めて高度なロボット「第3世代（Gen 3）シンス」は、科学が暴走した完璧な例であり——人間によって完全に制御することができないため——非常に危険なテクノロジーであると見なされています。<br>
            彼らはシンスの「優れた身体能力」と「自律的に思考する能力の組み合わせ」を、人類への『実存的な脅威（Existential threat）』であると本能的に危険視しています。研究所で組み立てられ、ロボットのようにプログラムされるその造られ方・過程そのものが「人間の生命は神聖である」と考えるブラザーフッドにとって、絶対に相容れない極秘の領域だからです。</p>
            <p>このようにマクソンのイデオロギーの熱弁には深い「宗教的・思想的な響き」がありますが、エルダー・マクソン本人は、部下たちから「神」として崇拝されることを嫌悪・拒絶しています。<br>
            西海岸のブラザーフッドにはびこっていた「マクソン・カルト（マクソン一族を神格化する狂信者）」の根絶は、あくまで「テクノロジーによって補助・完成されながらも、テクノロジーそのものに支配されたり奴隷にされたりしない『ただの人間』でありたい」というマクソン本人の確固たる願望と一致しています。</p>

            <h4>国家建設者 (Nation builders / TVドラマ版)</h4>
            <div class="quote-box">
                「いつの日か、時が来れば、この種は必ず育つだろう。そして新しい文明が、かつての灰の中から生まれるのだ。これこそが……我々が生まれた理由ではないか、分かるだろう？ 同胞を助けることは良い目標であり、素晴らしい兵士の目標だ。だがこれは……我々こそが、より良い世界へと変える『触媒（Catalyst）』になるのだ」<br>
                <span style="color:#aaa;">— ハイ・エルダー・ロジャー・マクソン</span>
            </div>

            <img src="images/note_extracted/brotherhood-base/FOTV_Altar_Brotherhood_of_Steel.png" class="article-image right" alt="従者に焼印を押すための祭壇" onerror="this.src='images/placeholder.jpg'">

            <p>エルダー・マクソンの改革は、西海岸全体にも広範な影響を及ぼしました。ブラザーフッドはついに、東海岸ではすでに当たり前となっていた「国家（Country）」としての役割を受け入れ、イニシエイトたちは単なる騎士団のためではなく『国家（ブラザーフッド）』の名の下に戦い、命を捧げるようになりました。<br>
            また、西部では「クレリック（聖職者）」という新たな階級（カースト）が出現し、ブラザーフッドの使命に強固な「宗教的意味合い」を吹き込んだことも、ブラザーフッドの進化に大きく貢献しました。<br>
            パワーアーマーに身を包んだ少数のエリート的な『戦う修道士たち』から、少数のパワーアーマー兵と「それに随行する圧倒的な数の志願兵（アスピラント）や新兵（イニシエイト）」の物量に頼る『巨大な大衆運動（Mass movement）』へと姿を変え、彼らはどんなに巨大な敵（NCRなど）をも乗り越えられるようになりました。</p>

            <img src="images/note_extracted/brotherhood-base/FOTV_Branding_by_the_Brotherhood.png" class="article-image left" alt="ナイト・タイタスに従者として焼印を押されるマキシマス" onerror="this.src='images/placeholder.jpg'">

            <p>これは、「シェイディ・サンズの崩壊」の直後に見られた「新カリフォルニア共和国（NCR）」の軍国主義的な慣行を模倣したものであり、エルダー・オーウェン・リヨンズやアーサー・マクソンが以前に実践していた「大規模な外部部外者の採用（Mass outside recruitment）」の導入をもたらしました。<br>
            そして、この新しいイデオロギーの解釈と圧倒的な頭数の増加の「産物（代償）」として、アスピラント（志願兵）やスクワイア（従者）たちは、より「消耗品（Expendable）」としての扱いを受け前線での激戦に投入されるようになりました。教団のために「死ぬ」ことは教団員の基本的な義務でしたが、彼らが大量補充可能なコマへと使い捨てられていくこの変化は顕著です。<br>
            また、従者（TitusとMaximusなど）の肌に『焼印』を押すといった儀式なども生み出されました。従者たちは実際にこの儀式を楽しみにしており、自分の肉体に『騎士の刻印』が刻まれるまでは本当の従者になれないと思い込んでいます。</p>

            <h3>象徴と紋章 (Iconography)</h3>
            <p>ブラザーフッド・オブ・スティールのイコノグラフィー（象徴的表現）は、「歯車（Gears）」「剣（Sword）」、そして「翼（Wings）」のエンブレムを中心に構築されています。彼らはこの紋章を施設を飾るためや、アーマー・装備品の識別表示（タグ）、さらに自分たちの領土の境界を特定する旗やマーカーの一部として広く使用しています。<br>
            ブラザーフッドの記章は何年にもわたって進化および細かい派生を繰り返しており、基本的な配色はほぼ変わっていませんが、歯車の数や向きは支部によって様々です。</p>

            <img src="images/note_extracted/brotherhood-base/FO76_steelreign_chronicsonictonic_01.jpg" class="article-image right" alt="BOSのインシグニアが刻まれたナイト・シンのパワーアーマー" onerror="this.src='images/placeholder.jpg'">

            <p>この記章が、「戦前の軍服」と「ブラザーフッドの服」の「唯一の大きな違い」であることがよくあります。<br>
            西海岸のブラザーフッド（およびFOVのリヨンズ支部）の兵士たちは、戦闘のオンオフを問わず「リコンアーマー（Recon armor）」を日常着として愛用し、スクライブやエルダーは戦後に作られた伝統的な「ローブ」を身にまといます。一方、東海岸のスクライブ（およびフォールアウト76の初期アパラチア支部）は、多数のポーチが付いたレザーベストを重ね着した「エンジニア向きのコート（Engineer's uniform）」を着用し、さらに各自の目的に合った機能的な追加装備を用いることを好みます。<br>
            特定の支部は日常的にコンバットアーマーを使用することもありますが、やはりブラザーフッドと言えばその「強力なパワーアーマーの重使用」で最もよく知られています。</p>


            <h3>支部と拠点 (Divisions and locations)</h3>

            <div class="note-box">
                <b>主要ロケーションと支部一覧（Canon / 正史）</b>
            </div>

            <table class="va-table va-table-full" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                    <th style="border: 1px solid #00ff00; padding: 5px;">支部名 (Chapter)</th>
                    <th style="border: 1px solid #00ff00; padding: 5px;">構成・主要拠点 (Locations)</th>
                    <th style="border: 1px solid #00ff00; padding: 5px;">登場作品</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">ロスト・ヒルズ本部<br>(New California)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・ロスト・ヒルズ (Lost Hills)<br>・サンフランシスコBOS前哨基地<br>・デン空き家前哨基地<br>・NCR BOS前哨基地 (シェイディ・サンズ)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">Fallout 1<br>Fallout 2</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">キャピタル・ウェイストランド<br>(Lyons' / Outcasts)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・シタデル (The Citadel)<br>・アダムス空軍基地<br>・GNRプラザ<br>・ジェファーソン記念館<br>・インディペンデンス砦 (アウトキャスト)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">Fallout 3<br>Fallout 4 (言及)</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">モハビ支部<br>(Mojave / Circle of Steel)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・ヒドゥンバレー (Hidden Valley)<br>・B.o.s.隠れ家 (Safehouse)<br>・ヘリオス・ワン (元拠点)<br>・バンカー13 (元拠点)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">Fallout: New Vegas</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">連邦・コモンウェルス支部<br>(Commonwealth)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・プリドゥエン (The Prydwen)<br>・ボストン空港<br>・ケンブリッジ警察署<br>・センチネルサイト/フォートストロング等</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">Fallout 4<br>TVドラマ (言及)</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">アパラチア支部<br>(Appalachian)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・ディファイアンス砦 (Fort Defiance)<br>・キャンプ・ベンチャー<br>・ドロップサイトV9 / ワトガ等</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">Fallout 76</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">第一遠征軍<br>(First Expeditionary Force)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・アトラス砦 (Fort Atlas)<br>・ホワイトスプリング・リゾート<br>・メタルドーム / 前線基地タンゴ等</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">Fallout 76</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">サンフェルナンドの騎士団<br>(Knights of San Fernando)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・B.o.S.キャンプ基地<br>・フィリー (Filly)<br>・エリア51 (Area 51)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">TVドラマ</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">グランドキャニオン支部<br>(Grand Canyon chapter)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・グランドキャニオン (言及のみ)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">TVドラマ</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">コロナド支部<br>(Coronado chapter)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・ヨセミテ (言及のみ)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">TVドラマ</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">ヨセミテ支部<br>(Yosemite chapter)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・コロナド (言及のみ)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">TVドラマ</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">シカゴ支部<br>(Chicago chapter)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・シカゴ (言及のみ)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">Fallout 3 (言及), 4 (言及)</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">モンタナ支部<br>(Montana chapter)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・モンタナ・バンカー (言及/没)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">Fallout 3 (没コンテンツ)</td>
                </tr>
            </table>

            <div class="note-box" style="margin-top: 10px;">
                <b>主要ロケーションと支部一覧（Non-canonical / 非正史）</b>
            </div>
            <table class="va-table va-table-full" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                    <th style="border: 1px solid #00ff00; padding: 5px;">支部名 (Chapter)</th>
                    <th style="border: 1px solid #00ff00; padding: 5px;">構成・主要拠点 (Locations)</th>
                    <th style="border: 1px solid #00ff00; padding: 5px;">登場作品</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">中西部支部<br>(Midwest chapter)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・The Belt<br>・バンカー（Alpha～Epsilon）<br>・シカゴ<br>・Vault 0</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">Fallout Tactics</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #00ff00; padding: 5px;">テキサス遠征軍<br>(Texas Expedition)</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">・Vaultプロトタイプ<br>・カーボン (Carbon)<br>・アラモ砦</td>
                    <td style="border: 1px solid #00ff00; padding: 5px;">Brotherhood of Steel 1 & 2</td>
                </tr>
            </table>


            <h4>創設支部 (Founding chapter：ロスト・ヒルズ)</h4>

            <img src="images/note_extracted/brotherhood-base/FB3_Appendix.jpg" class="article-image left" alt="ロストヒルズ・バンカーの初期コンセプトアート" onerror="this.src='images/placeholder.jpg'">

            <p>すべてのブラザーフッドの「本部」にして最初の支部は、カリフォルニアにある「ロスト・ヒルズ（Lost Hills）」の巨大な地下バンカーです。<br>
            ここは組織が設立された最も神聖な場所であり、戦後の歴史の大部分においてブラザーフッドの『ハイ・エルダー』と『最高統治評議会』が集結する権力の座です。彼らの研究と軍事活動の絶対的な中枢としても機能しています。</p>

            <p>2240年代までに、ニューカリフォルニアに点在する複数の小規模な監視バンカー（デン、サンフランシスコ、シェイディ・サンズなど）を確立していましたが、カリフォルニアから遠く離れ、本部との連絡が絶たれて独立して行動する支部であっても、少なくとも公式には「すべてのブラザーフッドの前哨基地はロスト・ヒルズの統治評議会の権限に従属する」とされています。<br>
            ロスト・ヒルズ本部バンカー自体は、NCRの『マクソン州（マクソン将軍にちなんで名付けられたNCRの州）』に完全に囲まれており、ここは公式にはブラザーフッドの支配下ではなくNCRの領土（州内）に位置しています。この地理的要因による技術対立は免れず、NCR-ブラザーフッド戦争により、2281年までにニューカリフォルニア全域で少なくとも「6つ以上」のブラザーフッド拠点がNCR軍によって破壊または水没させられました。</p>

            <p>しかし、23世紀後半のロスト・ヒルズ本部の正確なステータス（生存状況）は不明のままです。<br>
            2296年までに、シェイディ・サンズの核崩壊とNCRの解体に続き、独自の長老（エルダー・クレリック・クイントス等）を持つ複数のブラザーフッド別支部が独自にニューカリフォルニア西海岸で活動しているのが目撃されています。<br>
            そして同時に、東海岸の「連邦（Commonwealth）支部」がブラザーフッド内における最も強大な力（The dominant power）へと成長し、実質的に西海岸の失脚したすべての既知の支部に対する「指揮権」を握るようになりました。</p>
`;

fs.appendFileSync('f:/Fallout/brotherhood-of-steel.html', htmlContent, 'utf8');
console.log('Appended chunks 14 and 15 (Restorers, Nation Builders, Iconography, Divisions)');
