// _batch_gen_fo4_locs3.js
const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadImage(url, fp) {
    return new Promise((resolve, reject) => {
        fs.mkdirSync(path.dirname(fp), { recursive: true });
        const mod = url.startsWith('https') ? https : require('http');
        mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                downloadImage(res.headers.location, fp).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) { resolve(false); return; }
            const ws = fs.createWriteStream(fp);
            res.pipe(ws);
            ws.on('finish', () => { ws.close(); resolve(true); });
            ws.on('error', reject);
        }).on('error', reject);
    });
}

function getImageUrl(fn) {
    return new Promise((resolve) => {
        const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(fn)}&prop=imageinfo&iiprop=url&format=json`;
        https.get(url, { headers: { 'User-Agent': 'FalloutLoreArchive/1.0' } }, (res) => {
            let d = ''; res.on('data', c => d += c);
            res.on('end', () => {
                try {
                    const j = JSON.parse(d);
                    const p = Object.values(j.query.pages)[0];
                    resolve(p.imageinfo?.[0]?.url || null);
                } catch(e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const tmpl = fs.readFileSync('f:/Fallout/ulysses.html', 'utf8');

const articles = [
    {
        title: "Nuka-World",
        titleJa: "ヌカ・ワールド",
        slug: "nuka-world-loc",
        appearance: "Fallout 4 (Nuka-World DLC)",
        wikiSlug: "Nuka-World_(location)",
        mainImg: "NukaTown-NukaWorld.jpg",
        infoRows: [
            ["種族", "レイダー / トレーダー"],
            ["区分", "広域テーマパーク"],
            ["所在地", "マサチューセッツ州西部"],
            ["統治者", "オーバーボス（主人公）"],
        ],
        body: `
<h2>概要</h2>
<p>ヌカ・ワールド（Nuka-World）は、超大型DLC「Nuka-World」の舞台となる、戦前のアメリカで絶大な人気を誇った飲料「ヌカ・コーラ」社が設立した巨大なテーマパークの跡地です。</p>

<h2>詳細</h2>
<p>現在は「ディサイプルズ」「オペレーターズ」「パックス」という３つの凶悪なレイダー・ギャングの連合に完全に占拠され、レイダーたちの楽園にして捕らえられた商人たちを奴隷として働かせる地獄のような無法地帯となっています。<br>パーク内はいくつものエリアに分かれており、ディズニーランドのように「ギャラクティックゾーン」「サファリアドベンチャー」「キッディキングダム」「ドライロックガルチ」など、それぞれ独自のアトラクションと危険なクリーチャー（あるいはロボット）が待ち受けています。</p>
<p>主人公は罠だらけの「ガントレット」を生き残り、前任のボスを打ち倒すことで、このレイダーたちの新しい「総支配人（オーバーボス）」に就任します。連邦に平和を築き上げてきた主人公（将軍）が、今度はレイダーたちを率いて連邦を襲撃（侵略）するか、あるいはレイダーたちを全員殺戮して奴隷を解放するかという、極端な選択を迫られることになります。</p>
`,
        kanso: "「放射能まみれのディズニーランドを舞台に、最低のレイダーのボスになる」という、Falloutでしか味わえない最高に狂った非日常リゾート。パーク内のテーマソングやアトラクションの作り込みは異常なほど高く、戦前のダークすぎる企業体質（隠された地下のクローン施設など）をこれでもかと浴びることができます。"
    },
    {
        title: "Boston Airport",
        titleJa: "ボストン空港",
        slug: "boston-airport",
        appearance: "Fallout 4",
        wikiSlug: "Boston_Airport",
        mainImg: "BostonAirport-Fallout4.jpg",
        infoRows: [
            ["種族", "ブラザーフッド・オブ・スティール"],
            ["区分", "軍事基地 / 空港跡地"],
            ["所在地", "ボストン東部海岸沿い"],
            ["特記事項", "プリドゥエンの停泊地"],
        ],
        body: `
<h2>概要</h2>
<p>ボストン空港（Boston Airport）は、ボストンの東海岸に位置する大規模な国際空港の跡地。ゲーム中盤以降、ブラザーフッド・オブ・スティール（B.O.S.）の地上拠点として完全に要塞化されます。</p>

<h2>詳細</h2>
<p>B.O.S.の巨大飛行船「プリドゥエン」が到着する前はフェラル・グールの巣窟となっていましたが、彼らの大規模な掃討作戦によって一掃されました。現在は空港のターミナルビルや待合室、地下鉄の入り口に至るまで物資の集積所やベルチバードの離着陸施設として利用されています。<br>ここには広大な「ワークショップ」が存在し、インスティチュートへ侵入するための「シグナル・インターセプター」を建造するための最も適したロケーション（B.O.S.ルート）となります。</p>
<p>また、空港の地下には彼らの弾薬庫や補給保管庫が存在するほか、インスティチュート（あるいはレールロード）と敵対した場合は、最終決戦においてこの空港が凄まじい防衛戦（破壊工作）の舞台へと変貌します。</p>
`,
        kanso: "B.O.S.という組織の圧倒的な軍事力を実感できる場所。ただの廃墟だった空港が、パワーアーマーを着たナイトたちや整備中のベルチバードで溢れかえる様は前線基地のロマンたっぷりです。ここからベルチバードに乗って連邦中へ出撃できるのはFO4の大きな醍醐味の一つです。"
    },
    {
        title: "Fort Strong",
        titleJa: "ストロング砦",
        slug: "fort-strong",
        appearance: "Fallout 4",
        wikiSlug: "Fort_Strong",
        mainImg: "Fo4fortstrong.png",
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "戦前の軍事要塞"],
            ["所在地", "ボストン空港の南東端"],
            ["用途", "「ファットマン」の開発・保管庫"],
        ],
        body: `
<h2>概要</h2>
<p>ストロング砦（Fort Strong）は、ボストン空港から橋を渡った先の小島にある堅牢な軍事施設。戦前のアメリカ軍が小型核兵器「ファットマン」の研究開発と大量保管を行っていた極秘の兵器庫です。</p>

<h2>詳細</h2>
<p>ボストン空港を確保したB.O.S.にとって目障りな存在であり、現在は無数のスーパーミュータント（さらにその中でも巨大なミュータント・ベヒモスを含む）によってバリケードが組まれ、完全に占拠されています。<br>B.O.S.に加入した主人公（ナイト）は、パパラディン・ダンスと共にベルチバードに搭乗してストロング砦へ上空から強襲をかけ、搭載されているミニガンでベヒモスを粉砕して砦を奪還するクエスト「Show No Mercy」に挑みます。</p>
<p>内部へ潜入すると、戦前の軍人たちが残した「実用化されるファットマンの実験」に関する記録や、それに抗議した科学者のターミナルログなど、核武装国家の暗部を垣間見ることができます。最深部には文字通り核弾頭（ミニ・ニューク）が大量に鎮座しています。</p>
`,
        kanso: "「ベルチバードのドアガンで上空からミュータント・ベヒモスを蜂の巣にする」という、Fallout 4PVでも最高に盛り上がったシーケンスを体験できる熱いロケーション。ここの奪還に成功してB.O.S.の任務をこなすと、自由にベルチバードを呼んでファストトラベル（空中移動）できるようになるため、サバイバルモードでは必須の拠点となります。"
    },
    {
        title: "Vault 95",
        titleJa: "Vault 95",
        slug: "vault-95",
        appearance: "Fallout 4",
        wikiSlug: "Vault_95",
        mainImg: "Vault95-Fallout4.jpg",
        infoRows: [
            ["種族", "ガンナー"],
            ["区分", "地下核シェルター (Vault)"],
            ["所在地", "輝きの海の北東縁"],
            ["目的", "薬物依存症の「治療と再発」の実験"],
        ],
        body: `
<h2>概要</h2>
<p>Vault 95は、連邦南西部の端に位置する地下シェルター。現在は傭兵集団「ガンナー」の極めて強固な軍事拠点として要塞化されています。</p>

<h2>詳細</h2>
<p>このVaultの本来の実験目的は、入居者全員を「重度の薬物依存症患者」で統一し、最初は徹底した隔離と治療プログラムによって彼らを完全に更生させることでした。しかし、見事に全員がクリーンな体になって5年が経過した日、Vault-Tecの仕込んだ罠（隠し扉）が開き、内部に『数十年分もの大量の密輸麻薬の山』が投下されるという最悪の実験が行われました。結果として更生したはずの住民たちは狂乱し、殺し合いの末に全滅しました。</p>
<p>コンパニオンである「ケイト」も重度のサイコ依存症に苦しんでおり、主人公は彼女の体を治療するために、このVaultの最深部にある「薬物を取り除く特別なクリーンルーム」を目指して、無数のアサルトロンやガンナー・コマンダーたちとの激戦を繰り広げることになります。</p>
`,
        kanso: "「薬物依存を克服させた瞬間に大量の麻薬をバラ撒く」という、Vault-Tecの倫理観ブラックジョークの中でも特に悪辣で胸糞の悪い実験が行われた場所。しかし皮肉なことに、それが200年後にケイトという一人の少女の命と人生を救うための「唯一の治療装置」として機能するという、Falloutらしい因果応報のストーリーが体験できます。"
    },
    {
        title: "Jamaica Plain",
        titleJa: "ジャマイカ・プレイン",
        slug: "jamaica-plain",
        appearance: "Fallout 4",
        wikiSlug: "Jamaica_Plain",
        mainImg: "Jamaica_Plain_Settlement.jpg",
        infoRows: [
            ["種族", "フェラル・グール"],
            ["区分", "市街地廃墟"],
            ["所在地", "連邦南部"],
            ["用途", "戦前のタイムカプセル保管庫"],
        ],
        body: `
<h2>概要</h2>
<p>ジャマイカ・プレイン（Jamaica Plain）は、連邦の南部にある中規模の街の廃墟。かつて「ジャマイカ・プレインの財宝」という伝説的なお宝が眠っているという噂がウェイストランドに広まり、多くのスカベンジャーがこの街を目指しました。</p>

<h2>詳細</h2>
<p>現在は無数のフェラル・グールの巣窟となっており、街に足を踏み入れると死を覚悟することになります。多くのトレジャーハンターが財宝を求めてこの街の地下「市庁舎の地下室」を訪れましたが、そこにはレーザートリップワイヤーが網の目のように張り巡らされた、異常なほど厳重な防衛システムが存在していました。</p>
<p>命懸けでそのレーザートラップを突破（または解除）した先にある「財宝」の正体は、金銀財宝や強力な兵器などではなく、『戦前のアメリカの文化（野球のバット、フライヤー、ホロテープ等）を200年後に伝えるために当時の市長が残したタイムカプセル』でした。荒野の住人にとってはガラクタの山ですが、ユニーク近接武器「2076年ワールドシリーズ・バット」が手に入ります。</p>
`,
        kanso: "「死のレーザートラップを潜り抜けた先にあるのは、ただの平和な過去の思い出の品」という、戦前と戦後の価値観の落差を見事に描いた美しい皮肉のロケーション。ここで手に入るバットは、敵を殴ると「カキーン！」というホームラン音とともに敵が空高く吹っ飛ぶという面白すぎる特殊効果があり、これだけでも訪れる価値があります。"
    },
    {
        title: "University Point",
        titleJa: "ユニバーシティ・ポイント",
        slug: "university-point",
        appearance: "Fallout 4",
        wikiSlug: "University_Point",
        mainImg: "FO4_University_Point.jpg",
        infoRows: [
            ["種族", "人造人間（シンス）"],
            ["区分", "大学キャンパス跡地 / 廃墟"],
            ["所在地", "連邦南東部の海岸沿い"],
            ["特記事項", "インスティチュートによって滅ぼされた居住地"],
        ],
        body: `
<h2>概要</h2>
<p>ユニバーシティ・ポイント（University Point）は、かつて連邦でも非常に優秀な交易と農業で繁栄していた大学跡地の大きな居住地でしたが、現在は完全に無人と化し、人造人間（シンス）たちが徘徊するだけの廃墟となっています。</p>

<h2>詳細</h2>
<p>ダイアモンドシティに匹敵するほどの平和なコミュニティでしたが、ある日、住民の少女「ジャクリーン」が戦前のデータコア（極めて効率のよいリアクター技術の設計図が含まれていたとされる）を偶然見つけてしまいます。<br>その情報を聞きつけたインスティチュートからの死の使者「コーサー」が現れ、データの引き渡しを要求。街の代表は和解を試みましたが交渉は決裂し、大量のシンス部隊によって子供から老人まで一切の容赦なく『街ごと全滅させられる』という大虐殺が行われました。</p>
<p>主人公が訪れた時には既に手遅れであり、ターミナルやホロテープ、そして至る所に転がる白骨死体や血痕から、インスティチュートの冷酷さと住民たちの最期の悲痛な記録を読み解くことになります。</p>
`,
        kanso: "インスティチュートの「目的のためならいかなる犠牲（地上の人間）もいとわない」という恐ろしい非道っぷりを、実際の惨劇の跡地として嫌というほど見せつけられるロケーション。ユニークレーザーライフル「リミットレス・ポテンシャル」が金庫室の奥に入れっぱなしになっているのも、誰もそれを持ち出す余裕すらなかったという悲劇を物語っています。"
    },
    {
        title: "The Nucleus",
        titleJa: "ニュークリアス",
        slug: "the-nucleus",
        appearance: "Fallout 4 (Far Harbor DLC)",
        wikiSlug: "The_Nucleus",
        mainImg: "FO4-FarHarbor-Nucleus-GeneralView.jpeg",
        infoRows: [
            ["種族", "チャイルド・オブ・アトム"],
            ["区分", "原子力潜水艦基地跡 / 宗教拠点"],
            ["所在地", "ファー・ハーバー島の内陸部"],
            ["統治者", "上級聴罪司祭テクタス"],
        ],
        body: `
<h2>概要</h2>
<p>ニュークリアス（The Nucleus）は、ファー・ハーバーの島に存在する、放射線を崇拝する狂信的カルト「チャイルド・オブ・アトム」の最大の本拠地です。戦前の隠された原子力潜水艦のメンテナンスドックをそのまま巨大な聖堂として利用しています。</p>

<h2>詳細</h2>
<p>内部には巨大な廃潜水艦が存在し、その艦内には起動していない核ミサイルがそのまま鎮座しています。<br>信者たちはこの潜水艦を神の御神体として祭り上げ、常に高い放射線量で満たされた洞窟の中で生活しています。指導者であるテクタスは非常に攻撃的で狂信的であり、自分たちと異なる思想を持つ「ファー・ハーバーの住人」を異端として激しく憎悪し、殺戮を企てています。</p>
<p>また、この施設の最深部にある旧軍の司令室には、もう一つの派閥であるアカディアの後悔と秘密の記憶（ディマのメモリー）が厳重なセキュリティで封印されており、主人公はその仮想空間パズルを解き明かすために信者たちとの交渉（あるいは殲滅）を行うことになります。</p>
`,
        kanso: "キャピタル・ウェイストランドのメガトンにいた頃の「少し奇妙だけど無害な宗教」から一転して、「核ミサイルを実行しようとする最高に危険なカルトテロリスト集団」として変貌を遂げたアトム教団の聖地。彼らに加担して本土や島を放射能で浄化するもよし、彼ら自身の御神体（核弾頭）を起動させて彼らを「アトムの元へ（物理的に）」送ってあげるのも自由です。"
    },
    {
        title: "Parsons State Insane Asylum",
        titleJa: "パーソンズ州立精神病院",
        slug: "parsons-state-insane-asylum",
        appearance: "Fallout 4",
        wikiSlug: "Parsons_State_Insane_Asylum",
        mainImg: "Parsons_state_ext.png",
        infoRows: [
            ["種族", "人間（傭兵）"],
            ["区分", "精神病院跡地 / 秘密収容所"],
            ["所在地", "連邦北部"],
            ["特記事項", "ロレンゾ・キャボットの幽閉場所"],
        ],
        body: `
<h2>概要</h2>
<p>パーソンズ州立精神病院（Parsons State Insane Asylum）は、厳重な警備と高い壁に囲まれた戦前の精神病院。通常は完全にロックされて入ることができず、周囲には何故か「タロン・カンパニー」を彷彿とさせる完全武装の傭兵が多数配置されています。</p>

<h2>詳細</h2>
<p>この施設は、戦前から生き続けるボストンの名家「キャボット家」の長男であるジャック・キャボットからの依頼（クエスト「The Secret of Cabot House」）を進めることでのみ内部へ入ることができます。<br>病院の地下の特殊な独房には、ジャックの父親である「ロレンゾ・キャボット」が400年以上もの間、生きたまま幽閉されています。ロレンゾは中東で発掘した「古代のアニキの冠（宇宙人のアーティファクト）」を被ったことで超能力と不老不死を得たものの、完全に発狂していました。</p>
<p>レイダーたちがこの病院を襲撃し、ロレンゾを解放しようと暴れ回る中、主人公は「超能力で大暴れする父親を殺す」か、「父親を解放して息子たち（キャボット家）を皆殺しにさせる」かの究極の選択を迫られます。</p>
`,
        kanso: "「永遠の若さを保つ血清」と「テレキネシスを使う古代の冠」という、FalloutのSF設定の斜め上（オカルト全開）を行くキャボット家のクエストの最終到達点。ここで父親を解放した場合、彼は強力なアーティファクト武器「ロレンゾアーティファクト・ガン（念動力を放つ銃）」をくれますが、キャボット家の面々は無残な最期を遂げます。"
    },
    {
        title: "ArcJet Systems",
        titleJa: "アークジェット・システム",
        slug: "arcjet-systems",
        appearance: "Fallout 4",
        wikiSlug: "ArcJet_Systems",
        mainImg: "ArcJetSystems-Fallout4.jpg",
        infoRows: [
            ["種族", "人造人間（シンス）"],
            ["区分", "航空宇宙企業の研究施設"],
            ["所在地", "ケンブリッジ南西部"],
            ["関連", "パラディン・ダンスとの共闘"],
        ],
        body: `
<h2>概要</h2>
<p>アークジェット・システム（ArcJet Systems）は、戦前のアメリカにおいて火星有人探査計画などの宇宙開発プロジェクトを担っていたハイテク企業の研究所跡地です。</p>

<h2>詳細</h2>
<p>メインクエスト序盤において、ケンブリッジ警察署でB.O.S.の「パラディン・ダンス」に応援を要請された主人公が、初めて彼と共に本格的な共闘を行う（クエスト「Call to Arms」）ための舞台となります。<br>彼らはB.O.S.の遠距離通信アレイを修復・強化するための部品「ディープレンジ送信機」を探してこの施設へ向かいますが、施設内部は既に大量のインスティチュートの人造人間（シンス）たちによって占拠されていました。</p>
<p>最深部の巨大なロケットエンジンのテストチェンバーにおいて、制御室に取り残された主人公は「大量のシンスの群れと戦うダンスの頭上に、巨大なロケットエンジンの噴射（炎）を起動して敵ごと焼き尽くすか」という決断を迫られます。</p>
`,
        kanso: "「パワーアーマーを着た味方（ダンス）がいかに規格外の装甲とカッコよさを持っているか」をプレイヤーの脳裏に焼き付けるための神演出ロケーション。ロケットエンジンの灼熱の業火に包まれながらも、炎が収まったあとに「少し熱かったな」と平然と立ち上がってくるダンスを見た瞬間、全プレイヤーがB.O.S.への入隊を決意します。ここで拾えるジャンク銃「ジャンク・ジェット」も最高です。"
    },
    {
        title: "Yangtze",
        titleJa: "長江 (揚子江 / Yangtze)",
        slug: "yangtze",
        appearance: "Fallout 4",
        wikiSlug: "Yangtze",
        mainImg: "FO4_Yangtze-31_Exterior_01.png",
        infoRows: [
            ["種族", "グール"],
            ["区分", "中国海軍の戦略原子力潜水艦"],
            ["所在地", "ボストン港（シャムロック酒場沖）"],
            ["艦長", "ザオ艦長（グール）"],
        ],
        body: `
<h2>概要</h2>
<p>長江（揚子江 / Yangtze）は、ボストン湾の海上に海面から少しだけ艦橋（潜望鏡）を覗かせている、大戦争（2077年）当時の「中国軍の戦略原子力潜水艦（長江31号）」そのものです。</p>

<h2>詳細</h2>
<p>200年前あの運命の日、この艦のザオ艦長から発射された5発の核ミサイルのうちの1発が、オープニングで主人公が目撃することになる「ボストンへの核着弾」を引き起こしました。<br>その後、長江はボストン沖の機雷に接触して座礁。それから200年以上の間、動力を失った潜水艦の中で、艦長はグール化しながらも祖国への帰還を夢見て孤独に生き続け、他の乗組員（部下）たちはフェラル・グールと化して艦内を徘徊しています。</p>
<p>偶然この船を発見した主人公は、自分たちの世界（ボストン）を崩壊させた直接の張本人とも言えるザオ艦長と対面します。彼は自らの罪を深く後悔しており、彼を許して潜水艦の修理（ダンウィッチ等からの部品調達）を手伝うことで、最終的に彼から「戦術核ミサイル（誘導ビーコン）」の砲撃支援を受けることができるようになります。</p>
`,
        kanso: "アメリカを崩壊させた「見えない敵」の正体であり、主人公にとっては間接的な仇でもあるザオ艦長との静かな対話劇。怒りに任せて彼を射殺することもできますが、200年間孤独に耐えて狂わなかった彼の精神力と、彼を助けた際に見せる「また会おう、アメリカ人」という敬意に満ちた別れは、数あるクエストの中でも非常に深く、考えさせられる感動があります。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        let imgUrl = await getImageUrl(article.mainImg);
        
        // Dynamic extension
        let ext = '.jpg';
        if (imgUrl) {
            let extMatch = imgUrl.match(/\.([a-zA-Z0-9]+)(?:[\?\/]|$)/);
            if (extMatch) ext = '.' + extMatch[1];
        } else {
            console.log(`Warning: Failed to get URL for ${article.mainImg}`);
        }
        let localRelPath = `images/note_extracted/${article.slug}/img_main${ext}`;
        let localAbsPath = path.join('F:/Fallout', localRelPath);
        
        if (imgUrl && !fs.existsSync(localAbsPath)) {
            await downloadImage(imgUrl, localAbsPath);
            await sleep(500);
        }

        let htmlInfoRows = '';
        for (let row of article.infoRows) {
            htmlInfoRows += `<div class="infobox-row"><span class="infobox-label">${row[0]}</span><span>${row[1]}</span></div>\n`;
        }
        
        let html = tmpl
            // The template is from ulysses.html
            .replace(/<title>.*?<\/title>/, `<title>${article.title} | Overseer Mohi's Terminal</title>`)
            .replace(/<h3 style="margin-top:0;text-align:center;">.*?<\/h3>/, `<h3 style="margin-top:0;text-align:center;">${article.title}</h3>`)
            .replace(/<img src="images\/note_extracted\/.*?alt=".*?">/, `<img src="${localRelPath}" alt="${article.title}">`)
            .replace(/<div class="infobox-row">.*?<\/div>\s*(?=<\/aside>)/s, htmlInfoRows)
            .replace(/<h1>.*?(?=<div class="quote-box")/s, `<h1>${article.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${article.titleJa}</span></h1>\n${article.body}\n\n`)
            // Quotes replacing using regex:
            .replace(/<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var\(--accent-color\);">.*?<\/div>/s, `<h2>感想</h2>\n<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var(--accent-color);"><p class="quote-text">${article.kanso}</p></div>`)
            .replace(/data-article-id=".*?"/, `data-article-id="note_${article.slug.replace(/-/g, '_')}"`)
            .replace(/href="https:\/\/fallout.fandom.com\/wiki\/.*?"/, `href="https://fallout.fandom.com/wiki/${article.wikiSlug}"`)
            .replace(/rel="noopener">.*?<\/a> from/, `rel="noopener">${article.title}</a> from`)
            .replace(/const _commentArticleId='.*?';/, `const _commentArticleId='note_${article.slug.replace(/-/g, '_')}';`)
            .replace(/const _commentArticleName='.*?';/, `const _commentArticleName='${article.title}';`)
            .replace(/const _commentArticleUrl='.*?';/, `const _commentArticleUrl='${article.slug}.html';`)
            .replace(/<body data-article-category=".*?" data-article-appearance=".*?">/, `<body data-article-category="拠点/ダンジョン" data-article-appearance="Fallout 4">`);

        fs.writeFileSync(`f:/Fallout/${article.slug}.html`, html, 'utf8');

        // X post
        const xDir = path.join('F:/Fallout', '_X', article.slug);
        fs.mkdirSync(xDir, { recursive: true });
        
        let postStr = `【Fallout Terminal データベース更新】 📡
【LOCATION: ${article.titleJa}】
Fallout 4における重要拠点の情報をアーカイブしました。

アーカイブアクセス：
https://www.fallout-jp.com/${article.slug}.html

#Fallout #Fallout4 #フォールアウト #FalloutLore`;
        
        fs.writeFileSync(path.join(xDir, 'post.md'), postStr, 'utf8');

        console.log(`Finished ${article.title}`);
    });
});

tasks.then(() => console.log('All generations completed.'));
