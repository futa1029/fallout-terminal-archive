// _batch_gen_nv_chars1.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_nv_char1.json', 'utf8'));

const articles = [
    {
        title: "Robert House",
        titleJa: "ロバート・ハウス (Mr.ハウス)",
        slug: "robert-house",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Robert_House",
        mainImg: imgData["robert-house"][0],
        infoRows: [
            ["種族", "人間 (生命維持装置による延命)"],
            ["所属", "ニューベガス支配者 / ロブコ・インダストリーズ"],
            ["役職", "CEO / 総支配人"],
            ["関連", "プラチナチップ / セキュリトロン"],
        ],
        body: `
<h2>概要</h2>
<p>ロバート・エドウィン・ハウス（通称CEO、またはMr.ハウス）は、戦前の天才的な実業家であり、モハビ・ウェイストランドにおける「ニューベガス」の実質的な支配者です。Fallout: New Vegasにおける最も重要な超大物キャラクターの一人です。</p>

<h2>詳細</h2>
<p>彼は戦前、ロボット工学の巨人「ロブコ・インダストリーズ」の創設者として巨万の富を築き、コンピューターネットワークやAI軍団（セキュリトロン）を駆使してアメリカ政府にも匹敵する力を誇っていました。<br>2077年の最終戦争を数学的な予測で予見した彼は、ラスベガスの街を守るために私財を投じてミサイル防衛網を構築。その結果、ニューベガスは核の直撃を免れました。<br>しかし、彼自身は「ラッキー38」カジノの最上階に設置した完全な生命維持カプセルの中で、ミイラのような痩せ細った肉体を機械に接続し、200年以上もの間、脳の意識だけで街を統治し続けていました。</p>
<p>彼の究極の目的は、運び屋（プレイヤー）を使って特殊なデータストレージ「プラチナチップ」を回収し、地下に眠るセキュリトロン軍団をアップグレードしてNCRとシーザー・リージョンの両方を牽制し、独立した真の「ニューベガス帝国」を築き上げ、最終的には人類を宇宙へ進出させるという壮大な野望です。</p>
`,
        kanso: "「人類の復興どころか、宇宙進出まで計算し尽くしている狂気の天才」。本作で最もカリスマ性があり、常に冷静に盤面をコントロールしてくる不気味さと威厳は圧倒的です。彼を裏切って隠し部屋の扉を開け、ミイラのような哀れな『本体』を見たときの衝撃と罪悪感はFNVのハイライトの一つです。"
    },
    {
        title: "Ulysses",
        titleJa: "ユリシーズ",
        slug: "ulysses",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Ulysses",
        mainImg: imgData["ulysses"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "元ツイステッド・ヘアーズ / 元リージョンのフルメンタリー / 運び屋"],
            ["役職", "運び屋 (第6の男)"],
            ["関連", "DLC: Lonesome Road"],
        ],
        body: `
<h2>概要</h2>
<p>ユリシーズ（Ulysses）は、モハビの裏でプレイヤー（運び屋）と同じ足跡を辿ってきた謎の人物であり、DLC第4弾『Lonesome Road』のキーパーソンにして最後の対抗者です。</p>

<h2>詳細</h2>
<p>元々は、シーザー・リージョンに吸収された部族「ツイステッド・ヘアーズ（編み髪部族）」の出身であり、リージョンの優れた密偵（フルメンタリー）としてモハビ各地を偵察していました。フーバーダムの存在をシーザーに報告したのも彼です。<br>彼はかつて、運び屋コミュニティの中で「プラチナチップ」の運搬役に選ばれていましたが、リストの次の名前（プレイヤー）を見た瞬間に依頼を辞退し、プレイヤーがベニーに撃たれる原因（あるいは結果）を作りました。</p>
<p>彼がプレイヤーをディバイド（The Divide）という崩壊した大地の最奥へ呼び出した理由は、「過去にプレイヤーが（無自覚に）運んできた起爆装置付きの荷物によって、ユリシーズが愛したディバイドの街が核の炎で焼き尽くされた」という強烈な個人的な復讐と、モハビの未来を巡る思想闘争のためでした。</p>
`,
        kanso: "「オマエノセイダ」と重低音ボイスのホロテープでどこまでも付きまとってくる、執念深いストーカーおじさん（褒め言葉）。旧世界の遺恨と理念を背負い、星条旗のダスターコートを着た彼とのディバイド最奥での決戦は、間違いなくシリーズ最高のエモい一騎打ち（あるいは共闘）です。"
    },
    {
        title: "Caesar",
        titleJa: "シーザー (エドワード・サロウ)",
        slug: "caesar",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Caesar",
        mainImg: imgData["caesar"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "シーザー・リージョン / (元アポカリプスの使徒)"],
            ["役職", "最高指導者 / 独裁者"],
            ["関連", "コロラド川以東の支配者"],
        ],
        body: `
<h2>概要</h2>
<p>シーザー（Caesar / 本名：エドワード・サロウ）は、NCRと対をなす巨大な軍事独裁国家「シーザー・リージョン」の創設者にして絶対的な君主です。古代ローマ帝国を模倣した残虐な帝国を一代で築き上げました。</p>

<h2>詳細</h2>
<p>彼は元々、NCR内にある平和主義的な知識層の組織「アポカリプスの使徒」のメンバーでした。しかし、派遣された未開の部族で捕虜になった際、彼らに自分の持つ「古代ローマ」の歴史的知識や軍事戦術を教え込んだ結果、部族を軍事的に統一してしまい、最強の軍団「リージョン」を誕生させました。</p>
<p>徹底した同化政策と奴隷制、恐怖統治によって東部の86もの部族を平らげ、ついにはコロラド川を挟んでフーバーダムの対岸に本拠地（ザ・フォート）を構え、NCRをモハビから駆逐しようとしています。<br>しかし、彼自身は重度の「脳腫瘍」を患っており、自身の築いた近代医療を否定する教義と、自身の命の狭間で密かに苦しんでいます。</p>
`,
        kanso: "古代ローマの仮装をした野蛮人たちの親玉かと思いきや、実はヘーゲルの弁証法（テーゼとアンチテーゼ）を用いて極めて論理的に国家論を語り出すインテリおじさん。「ただの狂った悪党」ではない、強烈なカリスマと説得力を持つ名ヴィランです。オートドックでの手術イベントは緊張感抜群。"
    },
    {
        title: "Joshua Graham",
        titleJa: "ジョシュア・グラハム",
        slug: "joshua-graham",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Joshua_Graham",
        mainImg: imgData["joshua-graham"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "デッドホース / (元シーザー・リージョン)"],
            ["役職", "元「初代」軍団長 / 宣教師"],
            ["関連", "DLC: Honest Hearts / 火を纏いし男（バーンドマン）"],
        ],
        body: `
<h2>概要</h2>
<p>ジョシュア・グラハム（Joshua Graham）、別名『火を纏いし男（The Burned Man）』は、DLC第2弾『Honest Hearts』の最重要キャラクター。かつてシーザー軍団の初代リゲート（軍団長）として恐れられた無慈悲な怪物であり、現在は全身に包帯を巻いた敬虔な神の使徒です。</p>

<h2>詳細</h2>
<p>シーザーの右腕として、第一次フーバーダム攻防戦でNCRに敗北するまで、残虐非道な軍団の象徴として采配を振るっていました。<br>敗戦の責任を問われた彼は、シーザーの命令により「全身にピッチ（タール）を塗られ、火を点けられた状態でグランドキャニオンに落とされる」という凄惨な処刑を受けました。しかし彼は生還し、ニューカナーン（モルモン教の故郷）へと帰還しました。<br>現在はザイオン国立公園にて、原住民「デッドホース」の戦術指導者として彼らを率いり、かつての仲間であるリージョンの刺客（ホワイトレッグス）に対する聖戦を繰り広げています。</p>
<p>「神の仕事のすべてを我々が代行できるわけではない。しかし、全てを神に甘えることもできない」という名言と共に大量のマシンガンで敵を粉砕し続ける、信仰と暴力が同居した強烈なキャラクターです。</p>
`,
        kanso: "Falloutシリーズにおいて最も熱狂的なファンを持つキャラクターの一人。ボロボロの包帯姿に防弾ベスト、手にはM1911（光に闇を）を持ち、美しい声で聖書の一説を朗読しながら容赦なくレイダーを処刑していく姿は、ひたすらに最高にカッコいいです。"
    },
    {
        title: "Arcade Gannon",
        titleJa: "アーケイド・ギャノン",
        slug: "arcade-gannon",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Arcade_Gannon",
        mainImg: imgData["arcade-gannon"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "アポカリプスの使徒 / (エンクレイヴ・レムナント)"],
            ["役職", "コンパニオン / 研究者"],
            ["関連", "フォー・プレイス / プラズマ・ディフェンダー"],
        ],
        body: `
<h2>概要</h2>
<p>アーケイド・イスラエル・ギャノン（Arcade Gannon）は、フリーサイドのオールド・モルモン・フォートで医療活動を行っている「アポカリプスの使徒」のメンバーであり、プレイヤーのコンパニオン（同行者）候補となる人物です。</p>

<h2>詳細</h2>
<p>彼は高い知能を持つ研究者で、モハビの平和と弱者の保護を心から願っている理想主義者です。しかしその一方で、彼の出生には大きな秘密がありました。<br>彼の父親と育ての親たちは、かつてアメリカ東部でブロードキャストを流し、世界を支配しようとした旧アメリカ政府直属の悪の組織『エンクレイヴ』の残党（レムナント）だったのです。<br>彼はその黒い歴史をコンプレックスとして隠しつつも、優れたラテン語の知識やプラズマ兵器の技術を身に着けています。</p>
<p>彼の専用クエスト「For Auld Lang Syne」では、モハビに隠れ住む高齢のエンクレイヴ残党集団（レムナント）を再び招集し、かつてのパワーアーマーとベルチバードを引っ張り出して、フーバーダムの最終決戦でどちらの陣営に加勢させるかを決定することになります。</p>
`,
        kanso: "皮肉屋でインテリ、常にツンケンしているけれど根はめちゃくちゃ良い医者という、乙女ゲームにでも出てきそうなパーフェクトな設定の仲間。彼の専用クエストでヨボヨボのおじいちゃん達がエンクレイヴ・パワーアーマーを着て空から加勢してくる激熱展開は必見です。"
    },
    {
        title: "Veronica Santangelo",
        titleJa: "ベロニカ・サンタンジェロ",
        slug: "veronica-santangelo",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Veronica_Santangelo",
        mainImg: imgData["veronica-santangelo"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "B.O.S. (ブラザーフッド・オブ・スティール)"],
            ["役職", "コンパニオン / スライブ（書記官）"],
            ["関連", "188交易所 / エリヤとの過去"],
        ],
        body: `
<h2>概要</h2>
<p>ベロニカ・サンタンジェロ（Veronica Santangelo）は、188交易所で出会うことができるコンパニオンの一人。ボロボロの茶色いフード付きローブに身を包んだ、明るくおしゃべりな女性です。</p>

<h2>詳細</h2>
<p>彼女の正体は、隠れ谷（ヒドゥンバレー）の地下バンカーに引きこもり中の武装集団『B.O.S. モハビ・チャプター』に所属するスライブ（書記官）。<br>彼女は古き良きテクノロジーの保護に固執し、外部との交流を断って孤立・衰退していくB.O.S.の現状を憂い、組織に変化をもたらすための新しい希望（テクノロジー）を求めて外の世界を放浪しています。</p>
<p>格闘戦（Unarmed）のエキスパートであり、パワーフィストを持たせると猛烈な勢いで敵を殴り殺す暴力的な一面を持ちながら、可愛い「ドレス」をもらうとはしゃぐ乙女な一面も持ち合わせています。<br>また、彼女はかつてB.O.S.の長老だったエリヤ（DLC『Dead Money』の黒幕）に師事しており、クリスティーンというB.O.S.ナイトの女性と深い恋愛関係にあったという重い過去を背負っています。</p>
`,
        kanso: "「ねぇ、新しいドレス買ってくれない？」と可愛くねだってきた直後に、デスクローの顔面をパワーフィストで粉砕する頼れるヒロイン。B.O.S.という組織の限界と矛盾を見事に体現しているキャラクターで、彼女がバンカーで絶望する結末には胸が痛みます。"
    },
    {
        title: "Craig Boone",
        titleJa: "クレイグ・ブーン",
        slug: "craig-boone",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Craig_Boone",
        mainImg: imgData["craig-boone"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "元NCR 第1狙撃大隊"],
            ["役職", "コンパニオン / 狙撃手"],
            ["関連", "ノバック / ビター・スプリングス事件"],
        ],
        body: `
<h2>概要</h2>
<p>クレイグ・ブーン（Craig Boone）は、ノバックの恐竜型のモーテル『ディノバイト』の口の中から夜な夜な町を狙撃銃で警備している元NCR軍のスナイパー。プレイヤーの最も強力なコンパニオンの一人です。</p>

<h2>詳細</h2>
<p>愛する妻（カーラ）を謎の人物に奴隷としてシーザー・リージョンへ売り飛ばされたという凄絶な過去を持ち、復讐の鬼と化しています。<br>プレイヤーはノバックで「誰が妻を売ったのか（赤いベレー帽の合図で誰を殺すべきか）」を推理・告発するクエスト（One for My Baby）に協力することで、彼を仲間に引き入れることができます。</p>
<p>彼は「リージョンの人間を見たら例外なく殺す」という強いルールを持っており、彼を連れてリージョンの拠点に近づくと問答無用で戦闘が始まります。<br>また、過去にNCR内で起きた、女性や子供を含む大勢の民間人を誤って虐殺してしまった『ビター・スプリングスの大虐殺』の引き金を引いてしまった張本人であり、その深いトラウマ（PTSD）と罪悪感が彼の心を暗く蝕んでいます。</p>
`,
        kanso: "FNVの全プレイヤーがお世話になったであろう、最強のスナイパーおじさん。モハビを歩いていると急にキルカメラが発動し、「何が起きた！？」と思ったら遥か彼方の敵の頭をブーンが吹き飛ばしていた、というのは誰もが通る道です。彼の重い過去（私が死なせた）を知ると見方が変わります。"
    },
    {
        title: "Benny",
        titleJa: "ベニー",
        slug: "benny",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Benny",
        mainImg: imgData["benny"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "チェアメン"],
            ["役職", "ギャングのボス / ザ・トップスの支配人"],
            ["関連", "チェッカーのスーツ / 発端の男"],
        ],
        body: `
<h2>概要</h2>
<p>ベニー（Benny）は、ニューベガスのカジノ「ザ・トップス」を経営する三大ファミリーのひとつ『チェアメン』のボス。そして何より、「オープニングで運び屋（プレイヤー）の頭を撃ち抜き、プラチナチップを奪って埋めた男」として、ゲーム前半最大の仇敵となる人物です。</p>

<h2>詳細</h2>
<p>彼は元々、ニューベガスが現在の形になる前に荒野を荒らしまわっていた部族のリーダーでしたが、Mr.ハウスに引き抜かれ、カジノを経営するためのスタイリッシュなスーツと粋な言葉遣いを叩き込まれました。<br>しかし、彼はMr.ハウスに忠誠を誓うふりをしながら裏切りを計画。<br>イエスマンというプロテクトロンをハッキングして独自の手駒とし、プラチナチップを使ってMr.ハウスを暗殺し、自分がニューベガスの支配者におもむこうとしていました。</p>
<p>非常に狡猾で野心家ですが、プレイヤーにストリップ地区まで追い詰められたり、逃亡先のシーザーのテントで捕まって磔にされたりと、どこか詰めが甘い（あるいはプレイヤーの執念が凄すぎるため）間抜けな末路をたどりやすい愛すべき悪党です。</p>
`,
        kanso: "「ゲームは最初から…（ドシュ）」という名シーンを生み出した、白黒チェックのスーツを着たおしゃれな小悪党。彼を許してセフレになることも出来るし、彼から奪った銃で頭を撃ち抜いて復讐することも出来るし、シーザーと一緒に闘技場で戦うことも出来る、プレイヤーの自由度を試される最高の踏み台キャラクター。"
    },
    {
        title: "Lanius",
        titleJa: "リゲート・ラニウス (軍団長・怪物)",
        slug: "lanius",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Lanius",
        mainImg: imgData["lanius"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "シーザー・リージョン"],
            ["役職", "リゲート（軍団長） / ボス"],
            ["関連", "東の怪物 / ブレイド・オブ・ザ・イースト"],
        ],
        body: `
<h2>概要</h2>
<p>リゲート・ラニウス（Legate Lanius）は、シーザー軍団における最強の軍事司令官であり、「東の怪物」と恐れられる男。第二次フーバーダム攻防戦（ゲームのラストバトル）における最終ボスの一角であり、武力においてモハビ最強の存在です。</p>

<h2>詳細</h2>
<p>ラニウスは巨大な体躯に、素顔を隠すイノシシのような恐ろしい金属のマスク（恐怖の仮面）を被り、巨大な剣『ブレイド・オブ・ザ・イースト』を振るいます。<br>彼はかつてアリゾナ最大の部族の最強の戦士でしたが、部族がシーザーに降伏した際、仲間を弱虫と罵り、一人で彼らを皆殺しにしようと大暴れしたという過去を持ちます。その圧倒的な殺意と戦闘力を買われ、ジョシュア・グラハムの後任として軍団長に就任しました。</p>
<p>彼の強さは尋常ではなく、まともに接近戦を挑めば数発でプレイヤーをミンチにしてしまいます。<br>しかし、ただの狂った殺戮マシーンではなく、彼の知能（戦術眼）は非常に高く、弁舌（Speech 100）を用いた対話によって彼の軍事戦術におけるパラドックス（補給線を伸ばしすぎることの危険性）を突けば、剣を交えることなく東へ撤退させる（事実上の論破）ことも可能です。</p>
`,
        kanso: "「暴力の権化に見えて、実はSpeechでお話（論破）ができる」という、Falloutにおける『対話による解決』の美学を具現化した素晴らしいラスボス。もちろん対話しないで純粋な殴り合いをしてもメチャクチャに強い（シリーズ屈指のステータス）ため、倒し甲斐のある大ボスです。"
    },
    {
        title: "Rose of Sharon Cassidy",
        titleJa: "ローズ・オブ・シャロン・キャシディ",
        slug: "rose-of-sharon-cassidy",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Rose_of_Sharon_Cassidy",
        mainImg: imgData["rose-of-sharon-cassidy"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "キャシディ・キャラバン"],
            ["役職", "コンパニオン / 商人"],
            ["関連", "Fallout 2のキャシディの娘 / ウィスキー狂い"],
        ],
        body: `
<h2>概要</h2>
<p>ローズ・オブ・シャロン・キャシディ（Rose of Sharon Cassidy、通称キャス / Cass）は、モハビのバー（モハビ・アウトポストなど）で出会うことができる大酒飲みのカウガール。プレイヤーの有能なコンパニオンの一人です。</p>

<h2>詳細</h2>
<p>彼女は元々自分の名前を冠した「キャシディ・キャラバン」を経営する商大尽でしたが、何者か（実はクリムゾン・キャラバンとヴァン・グラフという大企業の結託）によってキャラバンを襲撃され、従業員も荷物もすべて失い、酒に溺れながら自暴自棄になっていました。<br>彼女の父親は、過去のシリーズ作品『Fallout 2』に登場したジョン・マクナイト・キャシディであり、強気で口が悪いが仲間思いという性格や、ウィスキーを手放さない気質をしっかり受け継いでいます。</p>
<p>彼女の専用クエスト「Heartache by the Number」では、彼女のキャラバンが誰に襲われたのかを調査し、証拠を見つけてNCRの法で裁きを下すか、あるいは武力で襲撃者たちの会社（ヴァン・グラフ一味など）に『鉛弾の雨』を降らせるかをプレイヤーが選択することになります。</p>
`,
        kanso: "常にウィスキーをがぶ飲みし、ピー音連発のスラングで悪態を突きながらショットガンをぶっ放す、最高に荒野が似合う姉御コンパニオン。彼女の「キャラバンの仇討ち」に巻き込まれてシルバーラッシュのヴァン・グラフ一家を皆殺しにする展開は、多くのアウトロー系運び屋の定番ルートです。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        let imgUrl = await getImageUrl(article.mainImg);
        let ext = '.jpg';
        if (imgUrl) {
            let extMatch = imgUrl.match(/\.([a-zA-Z0-9]+)(?:[\?\/]|$)/);
            if (extMatch) ext = '.' + extMatch[1];
        } else {
            console.log(`Warning: Failed to get URL for ${article.mainImg}`);
            url = await getImageUrl(article.mainImg.replace('.jpg', '.png'));
            if (url) {
                imgUrl = url;
                ext = '.png';
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
Fallout: New Vegasの主要キャラクター情報のアーカイブを追加完了しました。

アーカイブアクセス：
https://www.fallout-jp.com/${article.slug}.html

#Fallout #FalloutNewVegas #フォールアウト #FalloutLore`;
        
        fs.writeFileSync(path.join(xDir, 'post.md'), postStr, 'utf8');

        console.log(`Finished ${article.title}`);
    });
});

tasks.then(() => console.log('All generations completed.'));
