// _batch_gen_fo4_locs13.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp13.json', 'utf8'));

const articles = [
    {
        title: "Railroad HQ",
        titleJa: "レールロード本部",
        slug: "railroad-hq",
        appearance: "Fallout 4",
        wikiSlug: "Railroad_HQ",
        mainImg: imgData["railroad-hq"][0],
        infoRows: [
            ["種族", "人間 (レールロード構成員) / シンス"],
            ["区分", "極秘の地下カタコンベ"],
            ["所在地", "オールド・ノース・チャーチの地下"],
            ["リーダー", "デズデモーナ"],
        ],
        body: `
<h2>概要</h2>
<p>レールロード本部（Railroad HQ）は、人造人間（シンス）の解放を目的とする秘密結社「レールロード」の主要拠点です。ボストンの歴史的建造物であるオールド・ノース・チャーチの地下、暗いカタコンベ（地下墓地）のさらに奥に隠されています。</p>

<h2>詳細</h2>
<p>この拠点を見つけるためには、ボストン市街地に点在する「フリーダム・トレイル（赤いレンガの道）」を辿り、暗号「RAILROAD」を教会の地下のフリーダム・トレイル・リングで入力する必要があります。このギミックはFO4の謎解き要素として非常に有名です。</p>
<p>本部の内部は、インスティチュートからの追撃を逃れるために常に薄暗く、緊急脱出用のトンネルや仮眠室、作戦会議室などがひしめき合っています。リーダーのデズデモーナをはじめ、ドラムボーイ、なんでも屋のトム、Dr.アマリの助手のなどの主要メンバーがここでシンス救出の作戦を練っています。<br>また、組織に貢献することで、強力な防御力を持つ「バリスティック・ウィーブ（防弾繊維）」の改造技術をここで習得することが可能になります。</p>
`,
        kanso: "「レンガの道を辿って歴史的教会の地下の合言葉で秘密の扉を開ける」という、スパイ映画や冒険活劇のような最高のワクワク感に満ちたロケーション。インスティチュートの影に怯えながら、地下墓地の奥底でシンスの命を救うために活動する彼らのアングラ感が完璧に表現されています。"
    },
    {
        title: "Starlight Drive-In",
        titleJa: "スターライト・ドライブイン",
        slug: "starlight-drive-in",
        appearance: "Fallout 4",
        wikiSlug: "Starlight_Drive_In_(Fallout_4)",
        mainImg: imgData["starlight-drive-in"][0],
        infoRows: [
            ["種族", "モールラット"],
            ["区分", "戦前の屋外映画館 / 巨大な居住地候補"],
            ["所在地", "レキシントンの北東"],
            ["特記事項", "中央の水たまりの放射能汚染"],
        ],
        body: `
<h2>概要</h2>
<p>スターライト・ドライブイン（Starlight Drive In）は、戦前のアメリカで流行していた車に乗ったまま映画を鑑賞できる広大な屋外シアターの跡地です。FO4における「居住地（クラフト可能な拠点）」の中で最も人気のある場所の一つです。</p>

<h2>詳細</h2>
<p>数匹のモールラットを掃討するだけで、序盤から非常に広大で平坦な土地を居住地として確保することができます。<br>建設エリアには巨大な映画のスクリーンと、カフェテリアの建物が丸ごと含まれており、プレイヤーが街づくり（クラフト）を楽しむ際に、自由度が極めて高いのが特徴です。</p>
<p>敷地の中央には放射能汚染された水たまりがあり、そこに沈んでいる無数の「放射能バレル（ドラム缶）」を手動で解体（スクラップ）することで、安全な水資源（大型浄水器の設置場所）へと変貌させることができます。劇中のプレストン・ガービーからのクエストで早い段階で訪れるため、多くのプレイヤーがここを「第2のサンクチュアリ」として大規模な要塞都市に発展させています。</p>
`,
        kanso: "「広くて平坦で映画のスクリーンがある」。FO4のクラフト・建築ガチ勢にとっての最高のキャンバスとして名高いロケーション。巨大スクリーンを四角い要塞の壁の一部として利用したり、スクリーンを照らす照明を組んだり、プレイヤーの創造力を限界まで引き出してくれる名所です。"
    },
    {
        title: "The Slog",
        titleJa: "スロッグ",
        slug: "the-slog",
        appearance: "Fallout 4",
        wikiSlug: "The_Slog",
        mainImg: imgData["the-slog"][0],
        infoRows: [
            ["種族", "グール (非敵対の入植者)"],
            ["区分", "グール専用の農園 / 元市民プール"],
            ["所在地", "連邦北東部（サウガス鉄工所のすぐ北）"],
            ["リーダー", "ワイズマン"],
            ["特産品", "ターベリー"],
        ],
        body: `
<h2>概要</h2>
<p>スロッグ（The Slog）は、ダイアモンドシティから「外見が恐ろしい」という理由だけで追放されたグールたちが集まって独自に築き上げた、戦前のプール施設跡地のユニークな居住地です。</p>

<h2>詳細</h2>
<p>リーダーのワイズマンを中心に、彼らはかつての市民プールの水を利用して、水耕栽培の果実である「ターベリー」を育てることに成功しました。ターベリーは連邦では非常に珍しく、彼らはこれをキャラバンと取引することで自立した生活を送っています。<br>周囲にはサウガス鉄工所（レイダー「フォージ」の拠点）やハブシティ（ガンナー要塞）といった極めて危険な敵対勢力がひしめき合っており、追放されたグールたちが生き抜く過酷さが強調されています。</p>
<p>また、ここにはミュータントの巣窟になってしまったおもちゃ工場に思いを馳せる哀しき修理工「アーレン・グラス」や、ダイアモンドシティの元労働者である「ディアドレ」など、温かくも切ない過去を持つグールたちが生活しています。</p>
`,
        kanso: "「迫害された者たちが、プールの跡地で希少なベリーを育てながら懸命に生きている」という、Falloutの荒廃した世界における一筋の希望のような集落。周囲が超激戦区なので、プレイヤーがタレットや防壁でこのグールたちを保護してあげたくなること必至の居住地です。"
    },
    {
        title: "Abernathy farm",
        titleJa: "アバナシー・ファーム",
        slug: "abernathy-farm",
        appearance: "Fallout 4",
        wikiSlug: "Abernathy_farm",
        mainImg: imgData["abernathy-farm"][0],
        infoRows: [
            ["種族", "人間 (アバナシー一家)"],
            ["区分", "農場 / 大規模居住地"],
            ["所在地", "サンクチュアリの南"],
            ["特記事項", "極めて高い建築の高さ制限"],
        ],
        body: `
<h2>概要</h2>
<p>アバナシー・ファームは、巨大な戦前の高圧鉄塔の根元を利用して作られた、ブレイク・アバナシー一家が経営する農場です。序盤に訪れる居住地の一つです。</p>

<h2>詳細</h2>
<p>アバナシー一家は、一人娘のメアリーをレイダーの集団（アックアックの一味）に殺害され、形見のロケットを奪われるという悲劇に見舞われています。プレイヤーがUSAF衛星通信基地オリビアからそのロケットを取り戻してあげることで、彼らは同盟を誓い、この広大な農場がプレイヤーの居住地（ワークショップ）として解放されます。</p>
<p>このロケーションの最大の特徴は「建築できる高さの限界値が異常に高い」ことです。巨大な鉄塔を利用しているという設定を反映して、なんと通常の居住地の数倍の高さとなる「超高層の塔や空中要塞」をクラフト（建築）することが可能になっており、多くのクラフターがここで奇抜な高層要塞を建設しています。</p>
`,
        kanso: "娘を殺された農夫の悲痛な依頼から始まり、ミニガン持ちのレイダー討伐へと誘われる序盤の王道クエストの起点。広大なテイト畑と、FO4界隈で有名な「どこまで高く積めるか限界に挑む高層建築の聖地」としての顔を持つ、愛着の湧きやすい農場です。"
    },
    {
        title: "Kingsport Lighthouse",
        titleJa: "キングスポート灯台",
        slug: "kingsport-lighthouse",
        appearance: "Fallout 4",
        wikiSlug: "Kingsport_Lighthouse",
        mainImg: imgData["kingsport-lighthouse"][0],
        infoRows: [
            ["種族", "チルドレン・オブ・アトム / 発光グール"],
            ["区分", "灯台 / 海沿いの居住地候補"],
            ["所在地", "連邦北東の海岸沿い（魔術博物館の南）"],
            ["関連", "アトムの頂点"],
        ],
        body: `
<h2>概要</h2>
<p>キングスポート灯台（Kingsport Lighthouse）は、急峻な崖の上にそびえ立つ戦前の古い灯台。現在は放射能を神と崇めるカルト教団「チルドレン・オブ・アトム（CoA）」の熱狂的な信者たちに乗っ取られています。</p>

<h2>詳細</h2>
<p>この灯台がCoAに占拠されている理由は、灯台の頂上部分（かつて光を放っていた場所）に「発光するフェラル・グール（光りし者）」が閉じ込められているためです。<br>狂気の信者たちは、この光りし者が放つ強烈な放射能の輝きを「アトム神の導きの光」として崇めており、灯台の周囲には放射能兵器（ガンマ線銃）を持った信者たちが厳重な防衛線を敷いています。灯台に近づくだけで大量の放射能ダメージとガンマ線の爆撃を浴びる過酷な戦闘となります。</p>
<p>信者たちと光りし者を掃討した後は、ボストンの海を一望できる非常に景観の良い「居住地」として利用可能になります。</p>
`,
        kanso: "「灯台の光の代わりに、発光グールを閉じ込めて放射能の光を崇拝している」。チルドレン・オブ・アトムの狂気に満ちた設定が最も見事に表現されている名ロケーションです。夜間に遠くから見ると、灯台の頂上がグールの不気味な緑色の光で点滅しているのが最高に不気味です。"
    },
    {
        title: "Graygarden",
        titleJa: "グレイガーデン",
        slug: "graygarden",
        appearance: "Fallout 4",
        wikiSlug: "Graygarden",
        mainImg: imgData["graygarden"][0],
        infoRows: [
            ["種族", "ロボット (Mr.ハンディほか)"],
            ["区分", "全自動の温室農場 / 居住地"],
            ["所在地", "ケンブリッジの西 / コベナントの南"],
            ["リーダー", "管理者ホワイト"],
        ],
        body: `
<h2>概要</h2>
<p>グレイガーデン（Graygarden）は、戦前にテレビ番組の実験プロジェクトとして作られた全自動の温室農場。大戦争から200年経った現在でも、人間の姿は一人もなく「ロボット（Mr.ハンディ等）」たちだけで完全に管理・運営されている奇跡の農園です。</p>

<h2>詳細</h2>
<p>この農園の管理者である3機のMr.ハンディ（ホワイト、ブラウン、グリーン）は、それぞれが戦前の有名なテレビ番組の司会者などの「人格」をプログラムされており、気取った話し方や丁寧な口調でプレイヤーに接してきます。<br>彼らは農作物を育てることしか脳にありませんが、最近、農具の洗浄に使う水の水質が悪化したことに悩まされており、プレイヤーに「ウェストン水処理場」のスーパーミュータントを退治して浄水システムを直してくるよう依頼（Troubled Waters）をしてきます。</p>
<p>クエストを解決すると、この場所もプレイヤーの居住地となりますが、頭上の「崩落した高速道路」のかなり高い部分まで建築エリアに認定されているため、高速道路の上に空中都市を作ることも可能なロケーションです。</p>
`,
        kanso: "「人間が滅んだ後も、ロボットたちだけで真面目に野菜を育て続けている」という、ポストアポカリプスにおける自律ロボットの哀愁とユーモアを感じる場所。管理者たちの気取ったプログラム人格の会話は微笑ましく、何より崩落した高速道路の上一帯をまるごと建築で利用できるのが嬉しい拠点です。"
    },
    {
        title: "Warwick homestead",
        titleJa: "ワーウィック農園",
        slug: "warwick-homestead",
        appearance: "Fallout 4",
        wikiSlug: "Warwick_homestead",
        mainImg: imgData["warwick-homestead"][0],
        infoRows: [
            ["種族", "人間（シンス）"],
            ["区分", "戦前の下水処理場 / 農園 / 居住地"],
            ["所在地", "連邦の南東の端（ポセイドン工場のすぐ北）"],
            ["リーダー", "ロジャー・ワーウィック (シンス)"],
        ],
        body: `
<h2>概要</h2>
<p>ワーウィック農園は、戦前の巨大な下水処理場の巨大な水槽（沈殿池）を利用して、ロジャー・ワーウィックとその家族が運営している居住地。下水の肥沃な汚泥を利用して、巨大なマットフルーツなどの作物を大量に育てています。</p>

<h2>詳細</h2>
<p>一見するとただの臭い下水農園ですが、この農園の家長である「ロジャー・ワーウィック」は、実はインスティチュートによって本物のロジャーを殺害され、極秘に入れ替えられた『シンス（入れ替わり人造人間）』です。<br>元々の本物のロジャーは酒浸りで家族に暴力を振るう最低の父親でしたが、入れ替わった後のシンスのロジャーは（潜入任務のために）家族に優しく働き者になったため、皮肉なことに妻や子供たちは「人が変わったように良い父親になってくれた」と喜んでいます。</p>
<p>インスティチュートのクエストラインを進めると、この農園が彼らの極秘の「遺伝子組み換え作物（スーパームタフルーツ）の実験場」として利用されていることや、実験の証拠隠滅のために最終的に家族ごと始末する計画があるという、身の毛のよだつ裏設定が明かされます。</p>
`,
        kanso: "「シンスと入れ替わったことで、家庭環境が良くなってしまった」という、インスティチュートの非人道的な入れ替わり実験がもたらした最大の皮肉と哲学的な問いを突きつける農園。ロジャーの正体と家族の笑顔を知った後、インスティチュートをどう裁くかはプレイヤー次第です。"
    },
    {
        title: "WRVR broadcast station",
        titleJa: "WRVR放送局",
        slug: "wrvr-broadcast-station",
        appearance: "Fallout 4",
        wikiSlug: "WRVR_broadcast_station",
        mainImg: imgData["wrvr-broadcast-station"][0],
        infoRows: [
            ["種族", "人間 (俳優たち)"],
            ["区分", "戦前のラジオ放送局の廃墟"],
            ["所在地", "連邦南西部（トリニティ・タワーの南東方面）"],
            ["関連", "レックス・グッドマン / ラジオ劇"],
        ],
        body: `
<h2>概要</h2>
<p>WRVR放送局は、戦前のアメリカでラジオの電波を流していた小さな放送局です。現在は、シェイクスピアの劇などの戦前の文化を愛する俳優の卵たちが住み着き、この荒廃した連邦に向けて細々とラジオ劇を放送し続けています。</p>

<h2>詳細</h2>
<p>ここに住む中心人物「レックス・グッドマン」は、「スーパーミュータントにもシェイクスピアなどの高度な文化劇を教えれば、人間と分かり合えるはずだ」というとんでもない勘違いを抱き、単身でミュータントの巣窟であるトリニティ・タワーに乗り込んでしまい、当然のようにミュータントに捕まって拉致されてしまいます。</p>
<p>プレイヤーは、彼の相棒であるラジオパーソナリティ「ジョージ・クーパー」達から頼まれるか、あるいはダイアモンドシティのラジオで助けを求めるWRVRの放送を偶然聞いて、彼を救出するためにトリニティ・タワーへと向かうことになります。</p>
`,
        kanso: "「ミュータントにシェイクスピアを朗読して聞かせる」という、Fallout 4における最もマヌケで愛すべきキャラクターであるレックスの本拠地。戦後の荒廃した世界でもラジオ劇の火を絶やさない彼らの活動は、ウェイストランドにおける文化の尊さを教えてくれます。"
    },
    {
        title: "Boston Common",
        titleJa: "ボストン・コモン（スワンの池）",
        slug: "boston-common",
        appearance: "Fallout 4",
        wikiSlug: "Boston_Common",
        mainImg: imgData["boston-common"][0],
        infoRows: [
            ["種族", "スーパーミュータント・ベヒモス (スワン)"],
            ["区分", "戦前の公共公園 / 危険な池"],
            ["所在地", "ボストン中心部"],
            ["関連", "フリーダム・トレイルの起点"],
        ],
        body: `
<h2>概要</h2>
<p>ボストン・コモン（Boston Common）は、現実のボストンにも存在する有名な中心部の巨大な公共公園の跡地。レールロードを探すための「フリーダム・トレイル」のスタート地点として全プレイヤーが訪れる場所です。</p>

<h2>詳細</h2>
<p>公園の中央には白鳥のボートが浮かぶ放射能汚染された大きな池がありますが、ここには連邦で最も恐ろしいネームドモンスターである超巨大ミュータント「スワン（Swan）」が水の中で眠っています。<br>不用意に池の放射能水に足を踏み入れたり、浮かんでいる白鳥のボートの残骸を調べようとすると、突然、水面が爆発するように盛り上がり、巨大なイカリを武器として振り回すスワンが雄叫びを上げて襲い掛かってきます。</p>
<p>スワンはかつてインスティチュートによって強制的にFEV（強制進化ウイルス）の実験体にされ、徐々に知能を失いながら巨大な化物に変異していった元人間の犠牲者であり、周辺に落ちている彼のメモからは、知性を失っていく過程の悲惨な記録が読めます。</p>
`,
        kanso: "フリーダム・トレイルの起点という「絶対にプレイヤーが来る場所」のど真ん中に、最凶の巨大ボスを配置するベセスダの極悪トラップ。静かな池からスワンが立ち上がった時のあの映画のような絶望感は、FO4をプレイした世界中のプレイヤーの共通のトラウマ的名シーンです。"
    },
    {
        title: "Wreck of the FMS Northern Star",
        titleJa: "FMSノーザンスターの残骸",
        slug: "wreck-of-the-fms-northern-star",
        appearance: "Fallout 4",
        wikiSlug: "Wreck_of_the_FMS_Northern_Star",
        mainImg: imgData["wreck-of-the-fms-northern-star"][0],
        infoRows: [
            ["種族", "グール (ノルウェー語を話すレイダー)"],
            ["区分", "座礁した巨大な貨物船"],
            ["所在地", "連邦南東部の海岸（ワーウィック農園の東）"],
            ["特記事項", "アジリティのボブルヘッド"],
        ],
        body: `
<h2>概要</h2>
<p>FMSノーザンスターの残骸は、連邦南東部の沿岸に見事に座礁した巨大な戦前の貨物船（タンカー）。船内や甲板にはコンテナを利用した巨大なレイダーの基地が築かれています。</p>

<h2>詳細</h2>
<p>このロケーションの最大の特徴は、この船を占拠しているレイダー（全員がグール）が発する言葉が「英語ではない」ことです。彼らはノルウェーの船乗りであり、200年前の大戦争時の混乱でこのボストンの海に座礁して以来、母国に帰ることもできず、永遠のように長い時間をグールとして生き延びてきました。<br>そのため、彼らはプレイヤーを見つけると「Dra til helvete!（地獄へ落ちろ）」「Hvorfor vil du oss vondt?（なぜ我々を傷つけるんだ？）」とノルウェー語で叫びながら襲いかかってきます。</p>
<p>船の最奧の高台には彼らのリーダーがおり、倒すことでユニーク武器やボブルヘッド（Agility）を手に入れることができますが、彼らの言葉の意味を知ると非常に後味の悪い気持ちになるロケーションです。</p>
`,
        kanso: "「言葉の通じない外国人のグール船員たちが、200年間ずっと故郷に帰る日を夢見て船を守り続けていた」という、哀しすぎる背景設定を持つ名ロケーション。彼らが撃ち合いの中でノルウェー語で「頼む、放っておいてくれ！」と叫んでいると知った時の虚無感こそ、Falloutです。"
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
