// _batch_gen_fo4_locs4.js
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
        title: "Museum of Freedom",
        titleJa: "自由博物館",
        slug: "museum-of-freedom",
        appearance: "Fallout 4",
        wikiSlug: "Museum_of_Freedom",
        mainImg: "Fo4_Museum_of_Freedom.png",
        infoRows: [
            ["種族", "人間 (ミニッツメン) / レイダー"],
            ["区分", "歴史博物館"],
            ["所在地", "コンコードの中心部"],
            ["関連", "T-45パワーアーマー"],
        ],
        body: `
<h2>概要</h2>
<p>自由博物館（Museum of Freedom）は、コンコードの街の中心にある戦前の歴史博物館です。アメリカ独立戦争から第二次世界大戦、そして2077年の大戦争直前までのアメリカ軍の歩みを展示するマサチューセッツ州の歴史的な名所でした。</p>

<h2>詳細</h2>
<p>ゲーム序盤において、主人公がプレストン・ガービーら「コンコードの生存者（ミニッツメンの最後の生き残り）」と初めて出会う極めて重要なロケーションです。<br>彼らはこの博物館に数百人規模のレイダー・ギャングから追いつめられ、1階から屋上にかけての展示室や吹き抜けで激しい籠城戦を繰り広げていました。</p>
<p>主人公は彼らを救うために単身でレイダーの包囲網を突破し、博物館の屋上に残されていた年代物の「T-45 パワーアーマー」と「ベルチバードのミニガン」を起動。そのまま眼下の道路へと飛び降り、増援のレイダーと突如現れたデスクローを大火力の銃撃戦で粉砕するという、Fallout 4における最高に派手なチュートリアル任務の舞台となります。</p>
`,
        kanso: "「アメリカの歴史を展示する博物館」を舞台に、ミニッツメン（民兵）の最後の生き残りを助けるという、アメリカ独立戦争のメタ設定を見事に落とし込んだ完璧なレベルデザイン。展示されているマネキンや歴史の壁画の横で銃撃戦を行うというシチュエーションは、ポストアポカリプスの導入としてこれ以上ないほど素晴らしい体験です。"
    },
    {
        title: "Cambridge Police Station",
        titleJa: "ケンブリッジ警察署",
        slug: "cambridge-police-station",
        appearance: "Fallout 4",
        wikiSlug: "Cambridge_Police_Station",
        mainImg: "Cambridge_Police_Station.png",
        infoRows: [
            ["種族", "ブラザーフッド・オブ・スティール"],
            ["区分", "警察署 / 軍事拠点"],
            ["所在地", "ケンブリッジ南東部"],
            ["指揮官", "パラディン・ダンス"],
        ],
        body: `
<h2>概要</h2>
<p>ケンブリッジ警察署（Cambridge Police Station）は、戦前のボストンにおける警察の管轄基地跡であり、現在はブラザーフッド・オブ・スティール（B.O.S.）の「グラディウス偵察隊」の最前線基地として機能しています。</p>

<h2>詳細</h2>
<p>主人公はダイアモンドシティへ向かう道中、この警察署の近くから発信されるAF95軍事周波数（救難信号）を受信します。現場に到着すると、パラディン・ダンス率いる少人数のB.O.S.部隊が、押し寄せるフェラル・グールの群れに警察署の大門前で完全包囲され、絶望的な防衛戦を行っている光景に遭遇します。</p>
<p>主人公が加勢してグールを掃討すると、ダンスからその実力を認められ、アークジェット・システムへの同行を依頼されます。その後、この警察署を拠点としてB.O.S.の各クエストが開始されることになります。<br>なお、B.O.S.と敵対した場合は、この警察署の防衛網を突破して逆に彼らを殲滅するミッションも存在します。</p>
`,
        kanso: "パワーアーマーを着た屈強な兵士が、夥しい数のグールの群れに追い詰められてレーザーライフルを連射しているという、映画の一場面にそのまま飛び込めるような熱い拠点。屋上やガレージなど至る所が要塞化されており、ここを訪れることでB.O.S.の「規律高くも余裕のない前線の悲壮感」を肌で感じることができます。"
    },
    {
        title: "National Guard training yard",
        titleJa: "州兵訓練所",
        slug: "national-guard-training-yard",
        appearance: "Fallout 4",
        wikiSlug: "National_Guard_training_yard",
        mainImg: "FO4_National_Guard_Training_Grounds.png",
        infoRows: [
            ["種族", "フェラル・グール / ロボット"],
            ["区分", "軍事訓練施設跡地"],
            ["所在地", "連邦北東部"],
            ["特記事項", "B.O.S.の遭難現場"],
        ],
        body: `
<h2>概要</h2>
<p>州兵訓練所（National Guard training yard）は、戦前のマサチューセッツ州兵たちの軍事訓練および兵器用の保管庫として使われていた広大な施設群の廃墟です。</p>

<h2>詳細</h2>
<p>一帯に複数の兵舎や訓練棟が立ち並んでいますが、現在は完全に無数のフェラル・グールの巣窟と化しており、建物の中だけでなく外縁部でも常にアンデッドの群れが徘徊しています。<br>さらに、敷地内には戦前のセキュリティシステムが未だに生きており、アサルトロンやタレット、そして極めつけに、武器庫の扉のロックを解除して外に出た瞬間、大型のセントリーボットが物陰から突如起動して襲いかかってくるという有名な初見殺しトラップが仕掛けられています。</p>
<p>また、この場所はB.O.S.の「アストロディウス偵察隊（ダンス達の３年前に先遣隊として派遣され音信不通になった過去の部隊）」がフェラル・グールの大群に襲われて全滅した悲劇の場所でもあり、彼らの残した遭難信号やホロテープを回収するクエストの舞台にもなります。</p>
`,
        kanso: "大量に湧いてくるグール地獄を潜り抜けたプレイヤーに対し、ご褒美のような兵器庫（パワーアーマーが入っている）をあさらせた後、外に出た瞬間に地響きと共にセントリーボットが特攻してくるという「これぞFallout」という悪意に満ちた素晴らしいロケーション。幾つものミニッツメンクエストの討伐対象地としても選ばれるため、何度もここを訪れることになります。"
    },
    {
        title: "Spectacle Island",
        titleJa: "スペクタクル・アイランド",
        slug: "spectacle-island",
        appearance: "Fallout 4",
        wikiSlug: "Spectacle_Island",
        mainImg: "Spectacle_Island_From_Above.jpg",
        infoRows: [
            ["種族", "マイアルーク"],
            ["区分", "巨大な島 / 居住区"],
            ["所在地", "ボストン湾の南東の沖合"],
            ["特記事項", "本作最大の建築可能エリア"],
        ],
        body: `
<h2>概要</h2>
<p>スペクタクル・アイランド（Spectacle Island）は、ボストン湾の沖合にぽつんと浮かぶ巨大な無人島。Fallout 4における「居住地（ワークショップ）」として設定されている拠点の中で、圧倒的に最大の面積を持っています。</p>

<h2>詳細</h2>
<p>島全体が緑と起伏に富んだ地形で作られており、戦前の豪華な邸宅の廃墟が残されていますが、海からは常に「マイアルーク・クイーン」をはじめとする無数のマイアルークたちが上陸してくる極めて危険な島でした。<br>かつての住人（レールロードの協力者たち）は、ボートを改造した特殊な音響放射装置を使ってマイアルークを島から追い払っていましたが、装置の故障によって彼らは全滅してしまいました。</p>
<p>主人公がこの島を訪れ、ブレーカーを操作して再びこの音響装置を起動させると、襲い来るマイアルーク・クイーンの脳を揺らして島から逃走（あるいは討伐）させることができ、これ以降この巨大な島全体が主人公の私有地として自由に開拓できるようになります。</p>
`,
        kanso: "連邦最大の建築面積と水辺を持つ、拠点ビルダー達の「最終目標」とも言える絶海の孤島。本土から遠く離れているため、コンクリートの巨大要塞を作ったり、ネオンサインまみれの歓楽街を丸ごと建設したりと、プレイヤーの想像力（とゲーム機の処理能力）が許す限りの建築を楽しむことができる最高のキャンバスです。"
    },
    {
        title: "HalluciGen, Inc.",
        titleJa: "ハルシジェン社",
        slug: "hallucigen-inc",
        appearance: "Fallout 4",
        wikiSlug: "HalluciGen,_Inc.",
        mainImg: "HalluciGen,_Inc..jpg",
        infoRows: [
            ["種族", "ガンナー"],
            ["区分", "戦前の化学企業"],
            ["所在地", "ボストン・コモンの北西"],
            ["用途", "幻覚ガスの研究・兵器化"],
        ],
        body: `
<h2>概要</h2>
<p>ハルシジェン社（HalluciGen, Inc.）は、戦前のアメリカにおいて「非致死性の暴動鎮圧用ガス」の開発を名目として活動していた化学兵器企業の巨大な研究施設です。</p>

<h2>詳細</h2>
<p>現在の施設内は完全に狂気に満ちた空間となっています。ここへ極秘の化学技術を回収しに投入されたガンナーの小隊が、内部に充満していた「失敗作の暴動鎮圧ガス」を吸い込んでしまい、全員が完全に発狂（同士討ち状態の狂暴化）している凄惨なパニック状態に陥っています。<br>施設を探索すると、ガンナーたちがお互いを幻覚だと叫びながら惨殺し合っている光景や、狂い笑いしながら壁に頭を打ち付けている狂気的な姿を至る所で目撃することになります。</p>
<p>さらに地下の極秘実験室にあるターミナルでは、この企業が「非致死性」の建前とは裏腹に、暴動を鎮圧するどころか人間を発狂させて殺し合わせる最悪の化学兵器を、意図的に軍に売り込もうとしていた恐ろしい事実が発覚します。</p>
`,
        kanso: "「吸い込んだ人間を敵味方関係なくバーサーカーにする精神汚染ガス」という、フィクションの兵器としてあまりにも魅力的な設定が見事にホラー空間として表現された最高のロケーション。ゲームシステム上でも、ここで手に入るガスを使って実際に敵を発狂させる「ハルシジェン・ガスグレネード」を作成できるというクラフト要素の遊び心も素晴らしいです。"
    },
    {
        title: "Vault 118",
        titleJa: "Vault 118",
        slug: "vault-118",
        appearance: "Fallout 4 (Far Harbor DLC)",
        wikiSlug: "Vault_118",
        mainImg: "FO4-FarHarbor-Vault118-Entrance.jpeg",
        infoRows: [
            ["種族", "ロボブレイン (戦前の富裕層)"],
            ["区分", "地下核シェルター (Vault)"],
            ["所在地", "ファー・ハーバー島 (クリフエッジ・ホテル地下)"],
            ["特記事項", "孤島のホテル殺人事件の舞台"],
        ],
        body: `
<h2>概要</h2>
<p>Vault 118は、大型DLC「Far Harbor」における目玉クエストの舞台となる、戦前のリゾートホテル「クリフエッジ・ホテル」の地下に隠された極秘のVaultです。</p>

<h2>詳細</h2>
<p>このVaultの本来の実験目的は、「極端なエリート層（富裕層）」と「極端な労働者階級」を一つの施設に居住させ、その階級闘争を監視するというものでした。しかし、建設が完了する前に大戦争が起きてしまい、Vaultに逃げ込んだ戦前の金持ち十数名と数人の科学者だけが取り残されました。<br>その後彼らは科学技術を駆使し、自らの脳を機械の身体である「ロボブレイン」に移植することで不老不死を得て、200年間このVaultの中で優雅な社交界を気取った生活を続けていました。</p>
<p>主人公がこのVaultを訪れると、「そのロボブレインの一人（実業家）が何者かに鈍器で脳の容器を叩き割られて殺害される」という密室殺人事件が発生しており、プレイヤーは探偵となって、残されたロボットの富裕層たちの中から「真犯人」を推理するという、ゲーム中でも異色のミステリー劇を繰り広げることになります。</p>
`,
        kanso: "「ロボブレインだらけの孤島のホテルで起きる密室殺人事件」を、トレンチコートを着てボイスチェンジャーで探偵の真似事をしながら解決に挑むという、Falloutでしか絶対に成立しない超絶名作サブクエスト「Brain Dead」の舞台。設定のユーモアもさることながら、ミステリーとしての証拠集めの構成やオチも非常に高いクオリティを誇ります。"
    },
    {
        title: "Boston Public Library",
        titleJa: "ボストン公共図書館",
        slug: "boston-public-library",
        appearance: "Fallout 4",
        wikiSlug: "Boston_Public_Library",
        mainImg: "Boston_Public_Library.jpg",
        infoRows: [
            ["種族", "スーパーミュータント / ロボット"],
            ["区分", "歴史的建造物 / 図書館跡地"],
            ["所在地", "ボストン中心部 (コプリー駅付近)"],
            ["用途", "知識のアーカイブス"],
        ],
        body: `
<h2>概要</h2>
<p>ボストン公共図書館（Boston Public Library）は、アメリカで最も古い公共図書館の一つであり、戦前のボストンの芸術と知識の集積地であった巨大な歴史的建築物です。</p>

<h2>詳細</h2>
<p>200年後の現在、この図書館は無数のプロテクトロンやタレット等で構成された「自動防衛システム」によって未だに厳重に守られています。<br>しかし、図書館の膨大な蔵書（彼らにとってはただの紙切れ）や知識を疎んじるスーパーミュータントの巨大な群れが、知識を物理的に破壊するために図書館へと攻め込んでおり、館内は「無数のスーパーミュータント vs 大量の防衛ロボット」という激しい大規模戦闘が行われている最前線となっています。</p>
<p>グッドネイバーの「デイジー」から図書館にある延滞図書の返却と知識のバックアップを依頼されるクエストの舞台でもあり、地下鉄経由で隠し通路から潜入するか、正面突破で三つ巴の戦いに参戦するかを選択することになります。また、知力を上げるための「Intelligenceのボブルヘッド」が手に入ります。</p>
`,
        kanso: "巨大で重厚な図書館の静粛な内装の中で、ミュータントの叫び声とレーザー光線が飛び交うという大乱闘状態が楽しいロケーション。地下鉄のトークンを使って貸出システムを動かしたり、集めてきた本を返却してアイテムと交換できたりと、「人類の失われた知識を守る」というポストアポカリプスらしいテーマが丁寧に描かれている名所です。"
    },
    {
        title: "Sentinel site",
        titleJa: "センチネルサイト",
        slug: "sentinel-site",
        appearance: "Fallout 4",
        wikiSlug: "Sentinel_site",
        mainImg: "Fo4sentintelsite.png",
        infoRows: [
            ["種族", "チャイルド・オブ・アトム / グール"],
            ["区分", "戦前の核サイロ / 軍事基地"],
            ["所在地", "輝きの海（最深部）"],
            ["用途", "弾道ミサイルの防衛および巨大核兵器保管庫"],
        ],
        body: `
<h2>概要</h2>
<p>センチネルサイト（Sentinel site / Sentinel site Prescott）は、連邦南西部の死の地帯「輝きの海」の最深部に建つ、巨大なピラミッド状の建造物。戦前のアメリカ軍の核ミサイル防衛網の要となる重要防衛施設でした。</p>

<h2>詳細</h2>
<p>地表に出ているピラミッド部分は氷山の一角に過ぎず、その地下には広大かつ極めて緻密に作られた複数の弾道ミサイル発射サイロと、大量の「Mark 28 高出力核爆弾（リバティ・プライムの主兵装となる兵器）」が保管されています。<br>これほどの重要施設でありながら爆心地の中で原型を留めていたのは、施設自体がEMPや核の爆風を完全に逸らす特異な設計（ピラミッド構造）を採用していたためです。</p>
<p>現在、内部はフェラル・グールの巣窟となっている上、最深部のミサイル庫には「ブラザー・ヘンリ」というチャイルド・オブ・アトムの狂信的な信者が防護スーツを着込まずに住み着き、兵器である大型核爆弾をご神体として崇拝し守り続けています。</p>
`,
        kanso: "輝きの海の放射能嵐を彷徨い歩いた果てに、突如として暗闇に浮かび上がる「禍々しい黒いピラミッド」の絶望感と美しさ。B.O.S.の巨大ロボットに「本物の核爆弾」を背負わせるためにこの地獄へと赴き、狂信的な教団の預言者と対峙するという、メインクエストの山場を飾るにふさわしい荘厳なロケーションです。"
    },
    {
        title: "Vim! Pop factory",
        titleJa: "ヴィム・ポップ工場",
        slug: "vim-pop-factory",
        appearance: "Fallout 4 (Far Harbor DLC)",
        wikiSlug: "Vim!_Pop_factory",
        mainImg: "VimFactory-FarHarbor.jpg",
        infoRows: [
            ["種族", "スーパーミュータント (ファー・ハーバー)"],
            ["区分", "飲料工場跡地"],
            ["所在地", "ファー・ハーバー島の南部"],
            ["特記事項", "ディマの秘密が隠された場所"],
        ],
        body: `
<h2>概要</h2>
<p>ヴィム・ポップ工場（Vim! Pop factory）は、DLC「Far Harbor」の舞台となる島において、戦前に作られていたご当地の大人気清涼飲料水「Vim!（ヴィム）」の製造企業の本社および巨大工場跡地です。</p>

<h2>詳細</h2>
<p>当時、世界的なシェアを誇る「ヌカ・コーラ」社の強引な買収攻勢や妨害工作（従業員を拉致して秘密を暴こうとする等）に対し、地元企業としての誇りを持って徹底抗戦していた企業の歴史が、社内のターミナル等に数多く残されています。<br>現在はその面影はなく、島で最も巨大なスーパーミュータントの群れとミュータント・ハウンドの本拠地となっており、非常に攻略難易度の高い要塞と化しています。</p>
<p>この施設の製造ラインの地下からは、ファー・ハーバーの因縁に関わるシンス組織「アカディア」のリーダーであるディマ（DiMA）が、かつて自らの手で葬った忌まわしい過去の秘密基地（未完成の医療病棟と、ある重要な人物の遺体）が隠された状態で発見されることになります。</p>
`,
        kanso: "本土の「ヌカ・コーラ」への対抗意識がバッチリ描かれており、実際にフィールドにヌカ・コーラよりも大量に落ちている「Vim!」のルーツを知ることができる楽しいロケーション。ここで手に入る真っ赤な「Vim!塗装のT-51パワーアーマー」は、島の象徴として絶対に自拠点に持ち帰って飾りたくなる素晴らしいユニークアイテムです。"
    },
    {
        title: "Kiddie Kingdom",
        titleJa: "キッディキングダム",
        slug: "kiddie-kingdom",
        appearance: "Fallout 4 (Nuka-World DLC)",
        wikiSlug: "Kiddie_Kingdom",
        mainImg: "KiddieKingdom-Overview-NukaWorld.jpg",
        infoRows: [
            ["種族", "フェラル・グール（光りし者）"],
            ["区分", "テーマパーク施設"],
            ["所在地", "ヌカ・ワールド内部"],
            ["統治者", "オズワルド・ザ・オウトレイジャス"],
        ],
        body: `
<h2>概要</h2>
<p>キッディキングダム（Kiddie Kingdom）は、テーマパーク「ヌカ・ワールド」内に存在する、子供向けの可愛らしいアトラクション（観覧車やお化け屋敷、キングコラ城など）が密集したファンタジーエリアです。</p>

<h2>詳細</h2>
<p>レイダーたちがこのエリアだけを制圧できていない理由は、このエリア全体を覆い尽くしている「極めて高い致死性の放射能の嵐」と、そこから無限に沸き上がってくるフェラル・グールの存在があるためです。<br>このエリアを支配しているのは、戦前にこのパークでマジシャンとして働いていた光りし者のグール「オズワルド」です。彼は放射線の影響を受けながらも奇跡的に正気を保っており、「放射能を癒やす魔法（治療法）」を求めに出た恋人の帰りを、他の同僚（フェラル化したグールたち）を守りながら200年間このおもちゃの城で待ち続けていました。</p>
<p>主人公はレイダーの拠点としてこのエリアを確保するため、放射能とトラップの雨霰を潜り抜け、お化け屋敷や城の中でオズワルドとの手品のようなテレポートを交えた奇妙な戦いを強いられることになります。</p>
`,
        kanso: "「放射能まみれのファンタジー空間を守り続ける、シルクハットの狂気のマジシャン」という、アメコミのヴィランのように悲哀と狂気に満ちたオズワルドのキャラクターが最大の魅力。彼の恋人の顛末のホロテープを再生して説得し、戦わずに彼自身に悲しい現実を受け入れさせる結末は、Falloutのストーリーテリングの真骨頂です。"
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
            // Fallback try
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
