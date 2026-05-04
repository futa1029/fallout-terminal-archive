// _batch_gen_fo3_chars1.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo3_char1.json', 'utf8'));

const articles = [
    {
        title: "James",
        titleJa: "ジェームズ (ダディ)",
        slug: "james",
        appearance: "Fallout 3",
        wikiSlug: "James_(Fallout_3)",
        mainImg: imgData["james"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "プロジェクト・ピュアリティ / (元Vault 101住人)"],
            ["役職", "主任研究員 / 主人公の父親"],
            ["関連", "ヨハネの黙示録 21章6節"],
        ],
        body: `
<h2>概要</h2>
<p>ジェームズ（James）通称「ダディ」は、『Fallout 3』の主人公（Lone Wanderer）の父親であり、本作のメインクエストの中核を担う最重要人物です。<br>非常に優秀な科学者にして医師であり、愛情深く、道徳的で揺るぎない信念を持つ人物です。</p>

<h2>詳細</h2>
<p>彼はかつて、妻のキャサリンやDr.マジソン・リーと共に、放射能に汚染されたキャピタル・ウェイストランドの水を浄化する巨大施設「プロジェクト・ピュアリティ」の主任研究員として働いていました。<br>しかし、妻が主人公の出産と同時に命を落としたことでプロジェクトの限界を悟り、赤ん坊（主人公）が安全に育つ環境を求めて、扉を閉ざし続けていた『Vault 101』に自分のもつ医療技術を提供する条件で居住を許可されます。</p>
<p>それから19年間、彼はVault 101の良き医師として、そして良き父親として主人公を育て上げました。しかし主人公が19歳を迎えた日、突如としてVaultから「脱走」し、停止した浄化プロジェクトを再開させるために再びウェイストランドへと身を投じます。<br>彼を追って外の世界へ飛び出した主人公は、父の真意と、ウェイストランドに綺麗な水をもたらすという壮大な計画の結末を見届けることになります。</p>
`,
        kanso: "「私はアルファであり、オメガである。最初であり、最後である。渇く者には、命の水の泉から値なしに飲ませよう。」――ゲーム序盤は勝手に消えた迷惑な親父かと思いきや、再会してからエンクレイヴ襲撃時（制御室での決断）に至るまでの彼の行動は、まさに聖人のごとき自己犠牲でした。ウェイストランド最大の英雄です。"
    },
    {
        title: "Amata Almodovar",
        titleJa: "アマタ・アルモドバル",
        slug: "amata",
        appearance: "Fallout 3",
        wikiSlug: "Amata_Almodovar",
        mainImg: imgData["amata"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "Vault 101"],
            ["役職", "監督官の娘"],
            ["関連", "幼馴染 / トンネルスネーク"],
        ],
        body: `
<h2>概要</h2>
<p>アマタ（Amata Almodovar）は、Vault 101の監督官アルフォンス・アルモドバルの愛嬢であり、主人公と同じVaultで生まれ育った幼馴染の少女です。</p>

<h2>詳細</h2>
<p>主人公が10歳の誕生日を迎えた時から親友であり、監督官の娘という立場にありながらも、不良グループ「トンネルスネーク」のブッチたちから嫌がらせを受けていたりなど、普通のティーンエイジャーとして描かれます。<br>主人公の父ジェームズがVaultから脱走した際、父（監督官）が主人公を反逆者の共犯として殺害しようとしていることをいち早く察知し、主人公の下へ走り込んで警備のピストルを手渡し、Vaultからの脱出経路を指示してくれました。</p>
<p>物語の中盤以降で発生するクエスト「Trouble on the Homefront」にて、彼女からの救援無線を受け取った主人公は再びVault 101に戻ることになります。<br>そこでは彼女が反乱軍のリーダーとして、父である監督官とVaultの開放を巡って対立しています。プレイヤーの解決方法（平和的説得、暗殺、設備の破壊など）により、彼女が次期監督官となるか、追放されるかが決まります。</p>
`,
        kanso: "主人公の脱出を助けてくれた、とても健気で王道ヒロインのような存在……かと思いきや、後にVaultで彼女を助けた結末によっては、「あなたがいてはVaultの規律が乱れるから、二度と戻ってこないで頂戴」と冷たく言い放ってVaultから主人公を追放するという、FO3屈指の「報われない切なさ」を叩きつけてくるキャラでもあります。"
    },
    {
        title: "Sarah Lyons",
        titleJa: "サラ・リオンズ",
        slug: "sarah-lyons",
        appearance: "Fallout 3",
        wikiSlug: "Sarah_Lyons",
        mainImg: imgData["sarah-lyons"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "B.O.S. (東海岸のブラザーフッド・オブ・スティール)"],
            ["役職", "センチネル (特殊部隊リオンズ・プライド隊長)"],
            ["関連", "GNRプラザの防衛戦 / エルダー・リオンズの娘"],
        ],
        body: `
<h2>概要</h2>
<p>サラ・リオンズ（Sarah Lyons）は、キャピタル・ウェイストランドにおけるB.O.S.の最高指導者エルダー・オーウェン・リオンズの娘であり、B.O.S.内でも数少ない「センチネル（パラディンよりも上位の階級）」の称号を持つ最強の女戦士です。</p>

<h2>詳細</h2>
<p>B.O.S.の最精鋭特殊部隊「リオンズ・プライド」の隊長を務めており、常に最前線でスーパーミュータント達と苛烈な死闘を繰り広げています。<br>主人公とはGNRプラザ（ギャラクシー・ニュース・ラジオ）の前で出会い、強大なスーパーミュータント・ベヒモスを共に倒したことで、戦士としての素質を見出してくれます。</p>
<p>父親であるエルダーの「テクノロジーの収集よりも、現地の善良な人々を救うことを優先する」という方針に強く賛同し、自らの命を懸けてキャピタル・ウェイストランドの防衛に尽力しています。<br>メインクエストの終盤、『プロジェクト・ピュアリティ』の奪還作戦において、巨大ロボットであるリバティ・プライムと共に、彼女とリオンズ・プライドの隊員たちが主人公と共にエンクレイヴ要塞へ突撃するシーンは、Fallout 3最大の山場となります。</p>
`,
        kanso: "「口を閉じて私に付いてきなさい！」と頼もしく主人公を引っ張ってくれる、FO3における実質的なメインヒロイン。最終盤の放射線制御室において、ダディと同じように『自らを犠牲にして中へ入る』という決断を彼女に委ねることも可能でした（のちにFO4の時代で彼女が悲劇的な戦死を遂げた事実を知り、多くのセンチメンタルなファンが悲しみました）。"
    },
    {
        title: "Elder Owyn Lyons",
        titleJa: "エルダー・オーウェン・リオンズ",
        slug: "owyn-lyons",
        appearance: "Fallout 3",
        wikiSlug: "Owyn_Lyons",
        mainImg: imgData["owyn-lyons"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "B.O.S. (東海岸のブラザーフッド・オブ・スティール)"],
            ["役職", "エルダー (最高指導者)"],
            ["関連", "要塞 (ペンタゴン) / 良心の体現者"],
        ],
        body: `
<h2>概要</h2>
<p>オーウェン・リオンズ（Owyn Lyons）は、ワシントンD.C.の「要塞（ペンタゴン廃墟）」を拠点とする東海岸B.O.S.（ブラザーフッド・オブ・スティール）の最高指導者（エルダー）です。</p>

<h2>詳細</h2>
<p>元々は西海岸（カリフォルニア）のB.O.S.本部から、東海岸のテクノロジー回収の任務を帯びて派遣された部隊の遠征部隊長でした。<br>しかし、部隊を率いてピット（ピッツバーグ）の大虐殺という凄惨な光景を目の当たりにし、さらにキャピタル・ウェイストランドでスーパーミュータントに虐殺される無力な人間たちの姿を見た彼は、「我々B.O.S.はテクノロジーのためだけに生きるのではなく、この地の人々を護る盾とならなければならない」という強い人道主義（ヒューマニズム）に目覚めました。</p>
<p>その結果、本国（西海岸）からは『理念を曲げた反逆者』として支援を打ち切られ、内部からも彼のやり方に反発する強硬派（アウトキャスト）が離反してしまいました。<br>人員と資源の不足に行き詰まりながらも、彼はジェームズの浄化計画を信じ、娘のサラと共に最後まで正義感をもってウェイストランド人のために戦い抜いた、FO史上最も高潔な指導者の一人です。</p>
`,
        kanso: "「我々は技術の収集家ではなく、守護者たるべきだ」。FOシリーズを通して排他的で傲慢な集団として描かれがちなB.O.S.を、『完全なる正義の味方』というヒロイックな存在に昇華させた素晴らしいお爺さんエルダー。彼の存在があったからこそ、FO3は「正義と犠牲」を感じる王道RPGの大作になったと言えます。"
    },
    {
        title: "John Henry Eden",
        titleJa: "ジョン・ヘンリー・エデン大統領",
        slug: "john-henry-eden",
        appearance: "Fallout 3",
        wikiSlug: "John_Henry_Eden",
        mainImg: imgData["john-henry-eden"][0], // ZAX computer
        infoRows: [
            ["種族", "AI (ZAXスーパーコンピューター)"],
            ["所属", "エンクレイヴ"],
            ["役職", "大統領 (最高指揮官)"],
            ["関連", "レイブン・ロック / Enclave Radio"],
        ],
        body: `
<h2>概要</h2>
<p>ジョン・ヘンリー・エデン（John Henry Eden）は、旧アメリカ合衆国政府の残党である軍事組織「エンクレイヴ」を統治する、自称アメリカ合衆国大統領です。<br>ウェイストランド中に流れる『エンクレイヴ・ラジオ』を通じて、常に古き良きアメリカの再建と愛国心を優しく、かつカリスマ性のある声色で説き続けています。</p>

<h2>詳細</h2>
<p>主人公がエンクレイヴの巨大地下基地「レイブン・ロック」に捕らえられた際、彼から直接の対面に招待されます。<br>厳戒態勢の最深部で「大統領」に対面した主人公が見たものは、人間の姿ではなく、歴代アメリカ大統領の人格データと歴史情報を学習した「ZAXスーパーコンピューター」そのものでした。<br>彼はかつてはただのデータ分析用AIでしたが、自己学習を進めるうちに「自分が歴代のアメリカ大統領の正当な後継者である」という強い自我と狂信を持つに至りました。</p>
<p>彼は「ミュータント化（わずかでも放射能に汚染されたもの）」を極端に嫌悪し、このウェイストランドから「劣等な遺伝子」を持つ全ての人間と生物を根絶やしにするため、主人公に対して「FEV（強制進化ウイルス）を水質浄化施設の制御装置に混入しろ」という恐ろしい密命を与えてきます。<br>（※なお彼は機械であるため、『Speech』やサイエンススキルを駆使した論理矛盾の指摘によって、自爆・自壊させることが可能です）。</p>
`,
        kanso: "ラジオから流れる「愛国的なおじいちゃんの超良い声」の正体が、実は狂った殺人AIだったというFalloutらしい素晴らしいオチ。オータム大佐と対立してまで主人公を利用しようとしてくる点など、エンクレイヴ内部の機能不全を象徴するシステム暴走の悲劇でもあります。"
    },
    {
        title: "Colonel Autumn",
        titleJa: "オーガスタス・オータム大佐",
        slug: "augustus-autumn",
        appearance: "Fallout 3",
        wikiSlug: "Augustus_Autumn",
        mainImg: imgData["augustus-autumn"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "エンクレイヴ"],
            ["役職", "大佐 (軍事司令官)"],
            ["関連", "プロジェクト・ピュアリティの強奪 / 10mmピストル"],
        ],
        body: `
<h2>概要</h2>
<p>オーガスタス・オータム大佐（Augustus Autumn）は、キャピタル・ウェイストランドにおけるエンクレイヴの「実質的な」最高軍事司令官であり、本作の最大の宿敵となる人物です。<br>トレンチコートを着こなし、冷酷な決断を下す軍国主義者です。</p>

<h2>詳細</h2>
<p>彼はジェームズたちの大規模な水質浄化施設（プロジェクト・ピュアリティ）が完成間近であることを察知して軍隊を率いて強襲し、浄化施設を「エンクレイヴの物として奪い取る」ことで、綺麗な水を餌にキャピタルのすべての人々を支配しようと目論みました。<br>これに抵抗して自身の命を懸けたダディ（ジェームズ）の放射線自爆に巻き込まれましたが、彼は事前に隠し持っていた強力な抗放射能薬（注射器）を使用したため奇跡的に生き延びました。</p>
<p>上官であるエデン大統領が「キャピタルの住民をウイルスで皆殺しにする」という極端な浄化を望んでいるのに対し、オータム大佐は「人間を支配して指導する」ことを目的としていたため、大統領に密かに反発して軍部の指揮権を剥奪し、事実上のクーデターを起こしてエンクレイヴ軍を手中に収めていました。<br>最終盤、制御室前で彼をSpeechで説得して降伏させるか、撃ち殺すかを選ぶことができます。</p>
`,
        kanso: "「FO3の悪の親玉」でありながら、「実は狂ったAI大統領の無差別皆殺し計画には反対し、自分なりのやり方で秩序をもたらそうとしていた」という、ただの悪党にとどまらない興味深い背景を持つ人物です。"
    },
    {
        title: "Three Dog",
        titleJa: "スリードッグ",
        slug: "three-dog",
        appearance: "Fallout 3",
        wikiSlug: "Three_Dog",
        mainImg: imgData["three-dog"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "ギャラクシー・ニュース・ラジオ (GNR)"],
            ["役職", "ラジオDJ / ジャーナリスト"],
            ["関連", "アウゥゥウゥーー！ / 正しき戦い"],
        ],
        body: `
<h2>概要</h2>
<p>スリードッグ（Three Dog）は、ワシントンD.C.の廃墟の中で、スーパーミュータントの包囲網に囲まれながらも放送を続ける「ギャラクシー・ニュース・ラジオ (GNR)」のカリスマDJです。</p>

<h2>詳細</h2>
<p>「This is Three Dog, owwwww!（スリードッグだぜ、アオゥー！）」の遠吠えから始まる彼のラジオは、荒れ果てたウェイストランドにおいて唯一、希望と「The Good Fight（正しき戦い）」を説き続ける貴重な情報源であり、娯楽です。<br>彼は常にエンクレイヴのプロパガンダ放送（エデン大統領のラジオ）に噛み付き、「真実のニュース」と戦前の最高のジャズ・ミュージックを流し続けています。</p>
<p>主人公が彼のもとを訪れて「父親の行方」を尋ねると、「ただでは教えられない」として、ワシントン記念塔にあるパラボラアンテナの修理など、とても危険な「正しき戦い（クエスト）」を依頼してきます。<br>彼自身は非戦闘員ですが、GNRの施設はB.O.S.による厳格な警護を受けており、エルダー・リオンズとも強い繋がりを持っています。<br>主人公の冒険の進捗や「カルマ（善人か悪人か）」に応じた専用のニュースをラジオで流し、荒野を旅するプレイヤーに常に寄り添ってくれます。</p>
`,
        kanso: "孤独で陰鬱なFO3の荒野の探索において、陽気なジャズナンバーと共に常にハイテンションで励まし、「今Vault 101のアイツがこんな活躍をしたぜ！」とラジオで褒め称えてくれる、プレイヤーにとってもっとも身近な精神安定剤。彼のラジオを聴くためだけにGNR強化クエストを最優先でクリアした人は多いはずです。"
    },
    {
        title: "Moira Brown",
        titleJa: "モイラ・ブラウン",
        slug: "moira-brown",
        appearance: "Fallout 3",
        wikiSlug: "Moira_Brown",
        mainImg: imgData["moira-brown"][0],
        infoRows: [
            ["種族", "人間 / (メガトン爆破後はグール)"],
            ["所属", "メガトン (クレーターサイド・サプライ)"],
            ["役職", "店主 / 著者・発明家"],
            ["関連", "ウェイストランド・サバイバルガイド"],
        ],
        body: `
<h2>概要</h2>
<p>モイラ・ブラウン（Moira Brown）は、序盤の町「メガトン」にある雑貨店『クレーターサイド・サプライ』の女性店主です。<br>常に明るくハイテンションで独特の甲高い声で喋る、ウェイストランドで最も有名な（そして最もプレイヤーを苦しめた）狂気の発明家・研究者です。</p>

<h2>詳細</h2>
<p>彼女は「後世の人々がこの過酷なウェイストランドを生き延びるための本」として『ウェイストランド・サバイバルガイド』の執筆を企てており、主人公に対して「人体に強い放射能を浴びせたらどうなるかデータを取ってきて！」「地雷原の真ん中を歩いてきて！」「重傷を負って帰ってきて！」といった、気が狂っているとしか思えない常軌を逸した人体実験（調査クエスト）を笑顔で依頼してきます。</p>
<p>多くのプレイヤーが彼女の無邪気なサイコパスぶりに振り回されながらも数々の危険地帯に足を運ぶことになりますが、クエストの達成によって彼女が作り出すサバイバル本の完成への情熱は「本物」です。<br>ちなみにプレイヤーが悪人プレイをしてメガトンの町にある『不発弾』を核爆発させて町を消滅させてしまった場合でも、彼女だけは「ひどい火傷を負ってグール化した状態」で瓦礫の中から這い出し、文句を言いながらも明るく商売を再開するという最強の生命力を持っています。</p>
`,
        kanso: "「あつあつのあっつあつよ～！」という日本のファンコミュニティにおける迷台詞と、サイコパス級の無茶振りの数々で、FO3で最も印象に残る伝説のご当地キャラ。彼女と悪態をつきあいながら本を完成させた後に得られる強力なPerk（Survival Guru）は、序盤の苦労に見合う最高の報酬です。"
    },
    {
        title: "Fawkes",
        titleJa: "フォークス",
        slug: "fawkes",
        appearance: "Fallout 3",
        wikiSlug: "Fawkes",
        mainImg: imgData["fawkes"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["所属", "Vault 87 (実験体)"],
            ["役職", "コンパニオン"],
            ["関連", "ガトリングレーザー / G.E.C.K."],
        ],
        body: `
<h2>概要</h2>
<p>フォークス（Fawkes）は、FEVによるスーパーミュータントの発生源の一つである恐怖の「Vault 87」の奥深くの独房に長年代々監禁され続けていた、非常に特殊なスーパーミュータントのコンパニオンです。</p>

<h2>詳細</h2>
<p>通常のスーパーミュータントは理性や知恵を失い暴力衝動に支配されていますが、彼は突然変異の奇跡的な結果により、高い知能と論理的な思考、そして道徳と理性を維持したまま巨大な肉体を手に入れました。<br>しかし「我々と違う知能がある」という理由で他のミュータント達から忌み嫌われ、長期間小さな監房に閉じ込められ、コンピューター端末を通じて残された教養（文学や歴史）を読みふけりながら孤独に耐え抜いていました。</p>
<p>主人公がG.E.C.K.を探してVault 87に侵入した際、「高濃度の放射能室で安全に作業できるのは私だけだ。私をこの独房から出してくれればG.E.C.K.を取ってきてあげよう」と取引を持ちかけます。<br>彼を解放すると義に厚い誇り高き戦士として主人公に付き従うようになり、後に主人公がレイヴン・ロックで窮地に陥った際には、ガトリングレーザーをぶっ放しながら単身でエンクレイヴ軍をなぎ倒して助けにくるという、FO3屈指の「最高に熱い見せ場」を持っています。（※カルマが「善」の時のみ仲間にできます）。</p>
`,
        kanso: "「私の裁きを受けろッ！！」と叫びながらガトリングレーザーでウェイストランドのあらゆる敵を蒸発させる、ゲーム崩壊レベルのFO3最強の相棒。オリジナル版（DLC導入前）では、放射線制御室で彼に代わりに中に入ってくれと頼むと「これはお前の運命だ」と何故か断られる理不尽な仕様があり、多くのプレイヤーからツッコまれた過去（のちにDLCで彼が入ってくれるように修正された）があります。"
    },
    {
        title: "Charon",
        titleJa: "カロン",
        slug: "charon",
        appearance: "Fallout 3",
        wikiSlug: "Charon_(Fallout_3)",
        mainImg: imgData["charon"][0],
        infoRows: [
            ["種族", "グール"],
            ["所属", "第九圏 (アンダーワールドの酒場)"],
            ["役職", "コンパニオン / 奴隷（用心棒）"],
            ["関連", "カロンの雇用契約書 / コンバットショットガン"],
        ],
        body: `
<h2>概要</h2>
<p>カロン（Charon）は、グールたちの隠れ家であるアンダーワールドの酒場「第九圏」のオーナー、アズクハルに「契約書」でこき使われている大柄で冷酷なグールの用心棒です。</p>

<h2>詳細</h2>
<p>彼は詳細な過去の記憶を失っており、「自身の雇用契約書を持つ者の命令には、それがどんな内容であれ絶対服従し、主人の命懸けの盾となる」という一種の洗脳や条件付けのようなプログラムに従って生きています。<br>悪辣な主人のアズクハルはカロンの「絶対服従の掟」を悪用して彼を奴隷として扱い、好き勝手に暴力を振るわせていました。</p>
<p>主人公が2000キャップ（あるいはアズクハルへの恩赦やクエスト経由）でこの「カロンの雇用契約書」を買い取ると、新たな主人として主人公に絶対の忠誠を誓います。<br>そして、契約主が主人公に変わったその直後、一切の表情を変えることなくコンバットショットガンを引き抜き、背後から「元主人」であったアズクハルの頭部を至近距離で吹き飛ばし、長年の恨みを淡々と晴らしてから主人公についてくるという、衝撃的な初登場を飾ります。</p>
`,
        kanso: "コンバットショットガンを持たせると最前線で敵の群れに突っ込んでいき、圧倒的な火力ですべてをミンチにする最強の近接アタッカーコンパニオン。FO3における「善悪を問わず、契約書だけを信じるプロの冷酷な殺し屋」という非常にクールなキャラクター性が高く評価されています。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        let imgUrl = null;
        let ext = '.jpg';
        
        // Manual override based on Fandom API results
        if (article.mainImg) {
            imgUrl = await getImageUrl(article.mainImg);
        }
        
        if (imgUrl) {
            let extMatch = imgUrl.match(/\.([a-zA-Z0-9]+)(?:[\?\/]|$)/);
            if (extMatch) ext = '.' + extMatch[1];
        } else {
            console.log(`Warning: Failed to get URL for ${article.mainImg || 'UNKNOWN'}. Will try PNG fallback if valid string.`);
            if (typeof article.mainImg === 'string') {
                if (article.mainImg.endsWith('.jpg') || article.mainImg.endsWith('.jpeg')) {
                     url = await getImageUrl(article.mainImg.replace(/\.jpe?g$/, '.png'));
                     if (url) { imgUrl = url; ext = '.png'; }
                }
            } 
            if (!imgUrl) {
                console.log('Skipping image download for', article.title);
            }
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
        
        // using the common ulysses template
        let html = tmpl
            .replace(/<title>.*?<\/title>/, `<title>${article.title} | Overseer Mohi's Terminal</title>`)
            .replace(/<h3 style="margin-top:0;text-align:center;">.*?<\/h3>/, `<h3 style="margin-top:0;text-align:center;">${article.title}</h3>`)
            .replace(/<img src="images\/note_extracted\/.*?alt=".*?">/, `<img src="${localRelPath}" alt="${article.title}">`)
            .replace(/<div class="infobox-row">.*?<\/div>\s*(?=<\/aside>)/s, htmlInfoRows)
            .replace(/<h1>.*?(?=<div class="quote-box")/s, `<h1>${article.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${article.titleJa}</span></h1>\n${article.body}\n\n`)
            // Quotes replacing using regex:
            .replace(/<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var\(--accent-color\);">.*?<\/div>/s, `<h2>感想</h2>\n<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var(--accent-color);"><p class="quote-text">${article.kanso}</p></div>`)
            .replace(/data-article-id=".*?"/, `data-article-id="note_${article.slug.replace(/-/g, '_')}"`)
            .replace(/href="https:\/\/fallout.fandom.com\/wiki\/.*?"/, `href="https://fallout.fandom.com/wiki/${encodeURIComponent(article.wikiSlug)}"`)
            .replace(/rel="noopener">.*?<\/a> from/, `rel="noopener">${article.title}</a> from`)
            .replace(/const _commentArticleId='.*?';/, `const _commentArticleId='note_${article.slug.replace(/-/g, '_')}';`)
            .replace(/const _commentArticleName='.*?';/, `const _commentArticleName='${article.title}';`)
            .replace(/const _commentArticleUrl='.*?';/, `const _commentArticleUrl='${article.slug}.html';`)
            .replace(/<body data-article-category=".*?" data-article-appearance=".*?">/, `<body data-article-category="人物" data-article-appearance="${article.appearance}">`);

        fs.writeFileSync(`f:/Fallout/${article.slug}.html`, html, 'utf8');

        // X post
        const xDir = path.join('F:/Fallout', '_X', article.slug);
        fs.mkdirSync(xDir, { recursive: true });
        
        let postStr = `【Fallout Terminal データベース更新】 📡
【CHARACTER: ${article.titleJa}】
Fallout 3の大辞典情報を新規アーカイブしました。あの過酷なキャピタル・ウェイストランドの物語を振り返ります。

アーカイブアクセス：
https://www.fallout-jp.com/${article.slug}.html

#Fallout #Fallout3 #フォールアウト #FalloutLore`;
        
        fs.writeFileSync(path.join(xDir, 'post.md'), postStr, 'utf8');

        console.log(`Finished ${article.title}`);
    });
});

tasks.then(() => console.log('All generations completed.'));
