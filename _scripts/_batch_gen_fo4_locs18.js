// _batch_gen_fo4_locs18.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp18.json', 'utf8'));

const articles = [
    {
        title: "County crossing",
        titleJa: "カウンティー・クロッシング",
        slug: "county-crossing",
        appearance: "Fallout 4",
        wikiSlug: "County_crossing",
        mainImg: imgData["county-crossing"][0],
        infoRows: [
            ["種族", "入植者"],
            ["区分", "居住地 / 交差点の農場"],
            ["所在地", "連邦東部（ナショナルガード訓練場の南）"],
            ["特記事項", "B.O.S.クエスト等で重要"],
        ],
        body: `
<h2>概要</h2>
<p>カウンティー・クロッシングは、戦前の道路が交差するポイント（十字路）に作られた小規模な居住地です。最初は数人の入植者が細々とミュータントハウンドの肉を干したりテイトなどを栽培しています。</p>

<h2>詳細</h2>
<p>この場所自体に派手な建築物はありませんが、ボストン空港（B.O.S.の拠点）やノードハーゲン・ビーチといった東側の主要拠点へ向かう際の「交通の要所」にあたり、プレイヤーは何度もこの十字路を通り過ぎることになります。<br>また、B.O.S.のプロクター・ティーガンに「食料の調達」を命じられた際、この農場から力ずくで（あるいは金で）作物を巻き上げるクエストの対象になりやすい不憫な場所でもあります。</p>
<p>敷地の中心には破壊されたトラックや瓦礫がありますが、周辺の平坦な土地が広いため、防衛網を敷いた巨大な前哨基地や交易所を作り上げるのに適した優秀な居住地候補です。</p>
`,
        kanso: "「あ、ここ通るの何回目だろう」と誰もが思うだろう、連邦東部の超重要ご近所ポイント。B.O.S.の食料調達クエストでここの農民を脅迫した時の罪悪感は異常。将軍としての矜持を保つか、B.O.S.の尖兵として農民から搾取するか、己のRPが問われる拠点です。"
    },
    {
        title: "Greentop Nursery",
        titleJa: "グリーントップ菜園",
        slug: "greentop-nursery",
        appearance: "Fallout 4",
        wikiSlug: "Greentop_Nursery",
        mainImg: imgData["greentop-nursery"][0],
        infoRows: [
            ["種族", "入植者 / (周辺にスーパーミュータント等)"],
            ["区分", "居住地 / 温室のある農場"],
            ["所在地", "連邦北東部（マルデンの東）"],
            ["特記事項", "貴重なマットフルーツの栽培地"],
        ],
        body: `
<h2>概要</h2>
<p>グリーントップ菜園は、連邦北東部に位置する居住地。その名の通り、戦前の立派な「ガラス張りの温室（グリーンハウス）」がほぼ完全な状態で残されており、中で大量の作物が栽培されています。</p>

<h2>詳細</h2>
<p>この居住地の最大の価値は、最初から大量の「マットフルーツ」が栽培されている点です。<br>マットフルーツは、工業用・建築用接着剤の代わりになる『植物でんぷん』をクッキングステーションで作成するための必須素材であり、拠点開発を急ぐ将軍（プレイヤー）にとって喉から手が出るほど欲しい重要資源です。この菜園を同盟に加えることで、序盤から接着剤素材の安定供給ルートを確立することが可能になります。</p>
<p>ただし、周辺には巨大な陥没穴（オールド・ガレット・シンクホール）やスーパーミュータントの拠点などが存在しており、住人たちは常に怪物たちの脅威に怯えながら作物を育てています。</p>
`,
        kanso: "連邦における「接着剤（植物でんぷん）生産基地」の要。ガラス張りの美しい温室は、荒れ果てたウェイストランドの中でもホッと一息つけるオアシスのような存在感があります。彼らをスーパーミュータントから守り抜き、連邦一のマットフルーツ農園へと発展させましょう。"
    },
    {
        title: "Egret Tours Marina",
        titleJa: "イーグレット・ツアー・マリーナ",
        slug: "egret-tours-marina",
        appearance: "Fallout 4",
        wikiSlug: "Egret_Tours_Marina",
        mainImg: imgData["egret-tours-marina"][0],
        infoRows: [
            ["種族", "人間（フィリス・デイリー）"],
            ["区分", "居住地 / マリーナ跡地"],
            ["所在地", "連邦南西部（輝きの海の北東）"],
            ["関連", "シンスのパラノイア"],
        ],
        body: `
<h2>概要</h2>
<p>イーグレット・ツアー・マリーナは、チャールズ川が南へ下っていく川沿いにある戦前のボートツアー会社のマリーナ跡地。現在は「フィリス・デイリー」という老女がたった一人で占拠し、武装して近づく者を拒絶しています。</p>

<h2>詳細</h2>
<p>フィリスに話しかける（または彼女のターミナルをハッキングする）と、彼女がなぜここに一人で引きこもっているのか悲痛な理由が判明します。<br>彼女は「自分がインスティチュートによって入れ替えられたシンスである」という強迫観念（パラノイア）に取り憑かれていました。過去に誤って自分の孫を撃ち殺してしまったというトラウマから、「こんな恐ろしいことをするのは自分が人間ではなくシンスだからに違いない」と思い込み、誰も傷つけないように一人でここに隔離生活を送っていたのです。</p>
<p>プレイヤーは高いカリスマによる説得で「あなたは人間だ」と彼女の妄想を解きほぐすか、あるいはミニッツメンへの参加を促すことで、このマリーナを平和裏に居住地として解放することができます。</p>
`,
        kanso: "『自分がシンスだと思い込んでいる人間』という、インスティチュートの恐怖支配がもたらした最悪の精神的被害者。悲痛なトラウマを抱えたおばあちゃんを説得して仲間に引き入れるのも良し、ボートハウスを活かした水上拠点として水商売を始めるのも良しの名拠点です。"
    },
    {
        title: "Somerville Place",
        titleJa: "サマービル・プレイス",
        slug: "somerville-place",
        appearance: "Fallout 4",
        wikiSlug: "Somerville_Place",
        mainImg: imgData["somerville-place"][0],
        infoRows: [
            ["種族", "人間（父親と二人の子供）"],
            ["区分", "居住地 / 農場"],
            ["所在地", "連邦の最南部（輝きの海の境界付近）"],
            ["特記事項", "極端に南にある孤立した農場"],
        ],
        body: `
<h2>概要</h2>
<p>サマービル・プレイスは、連邦のマップのほぼ最南端、最も危険な「輝きの海（Glowing Sea）」の境界線のすぐ手前という絶望的な立地に存在する居住地。一人の父親と二人の小さな幼い子供がトウモロコシを育てて暮らしています。</p>

<h2>詳細</h2>
<p>この居住地の周りは、スーパーミュータントの野営地やガンナーの拠点などに囲まれており、さらに南風が吹けば輝きの海から致死量の放射能の嵐（ラッドストーム）やデスクロー、ブラッドバグなどが容赦なく飛んでくるという「なぜこんな場所に住んでいるんだ」と突っ込みたくなるような地獄の環境です。<br>この父親から受けるクエスト（討伐場所）も最南部の超危険地帯が指定されることが多く、プレイヤーの腕前が試されます。</p>
<p>この過酷な最前線を要塞化し、健気に生きる二人の子供のために安全な土地を作り上げることが将軍の腕の見せ所となります。</p>
`,
        kanso: "輝きの海の入口という最悪の立地で、子供二人を抱えて震えながらトウモロコシを育てているシングルファザー。この場所を見つけると「絶対に大要塞を作ってミサイルタレットでこの家族を守ってやらねば」という強い使命感に駆られます。"
    },
    {
        title: "Outpost Zimonja",
        titleJa: "ジモンヤ前哨基地",
        slug: "outpost-zimonja",
        appearance: "Fallout 4",
        wikiSlug: "Outpost_Zimonja",
        mainImg: imgData["outpost-zimonja"][0],
        infoRows: [
            ["種族", "レイダー（ブーマー）"],
            ["区分", "居住地 / レイダーの前哨基地"],
            ["所在地", "連邦の最北端"],
            ["特記事項", "ヌカランチャー持ちのボス"],
        ],
        body: `
<h2>概要</h2>
<p>ジモンヤ前哨基地は、連邦マップのほぼ最北端中央に位置する小さな拠点。最初は「ブーマー」という名のネームド・レイダーと数人の部下によって占拠されています。</p>

<h2>詳細</h2>
<p>この居住地を解放するためにはレイダーたちを殲滅する必要がありますが、ボスの「ブーマー」はパワーアーマー（または強固なアーマー）に身を包み、最強の小型核兵器『ヌカランチャー』を装備している非常に危険な存在です。レベルが低い状態で不用意に近づくと、空からミニ・ヌーク（小型核爆弾）が降ってきて一瞬で木端微塵に吹き飛ばされます。</p>
<p>決死の覚悟でブーマーを倒して拠点を取り返すと、そこには戦前の通信設備と思われる巨大な鉄塔がそびえ立っています。敷地自体は狭いですが、この鉄塔の高さまで建築高度が許されているため、「縦に長い高層タワー建築」を楽しむことができる特徴的な居住地となります。</p>
`,
        kanso: "「序盤の北部の探索中、突如として鳴り響く『ヒューッ』という爆弾の落下音と共に画面が真っ白になって死亡する」という、FO4あるあるの初見殺しスポット。解放後は、そのシンボルである巨大なアンテナ塔を利用した縦長基地を作るのが定番の楽しみ方です。"
    },
    {
        title: "Oberland station",
        titleJa: "オバーランド駅",
        slug: "oberland-station",
        appearance: "Fallout 4",
        wikiSlug: "Oberland_station",
        mainImg: imgData["oberland-station"][0],
        infoRows: [
            ["種族", "入植者"],
            ["区分", "居住地 / 駅跡地の農場"],
            ["所在地", "連邦西部（Vault 81の北）"],
            ["特記事項", "線路沿いの中継地点"],
        ],
        body: `
<h2>概要</h2>
<p>オバーランド駅は、戦前の鉄道路線の途中にある小さな無人駅の跡地を利用した居住地。現在は二人の女性（姉妹と思われる入植者）が、古い駅の管制塔の横で細々と作物を育てています。</p>

<h2>詳細</h2>
<p>テンパインズの断崖と並んで、プレストン・ガービーからの「最初の居住地防衛・討伐クエスト」の対象になりやすい場所の一つです。<br>この居住地はマップの西側を南北に走る線路沿いに位置しており、ダイアモンドシティ方面へと南下していくための非常に重要な中継地点となります。</p>
<p>線路の上に直接建築を行うことも可能であり、古い列車の車両を利用したり、線路を跨ぐような形で拠点を作るなど、荒野を旅するキャラバンたちの宿場町のようなイメージで建築を行うと非常に見栄えが良くなります。</p>
`,
        kanso: "連邦の南北を繋ぐ「線路沿い」という絶好のロケーション。夕暮れ時にこの寂れた駅舎と線路を見ていると、ポストアポカリプス世界の哀愁を強く感じます。交易路のハブとして発展させるのがとても楽しい居住地ですね。"
    },
    {
        title: "Taffington boathouse",
        titleJa: "タフィントン・ボートハウス",
        slug: "taffington-boathouse",
        appearance: "Fallout 4",
        wikiSlug: "Taffington_boathouse",
        mainImg: imgData["taffington-boathouse"][0],
        infoRows: [
            ["種族", "ブラッドバグ"],
            ["区分", "居住地 / 川沿いのボート小屋"],
            ["所在地", "連邦中北部（コベナントのすぐ西）"],
            ["関連", "メアリーの巡礼の旅"],
        ],
        body: `
<h2>概要</h2>
<p>タフィントン・ボートハウスは、湖畔に面した戦前の立派な二階建ての家と、水上ボートハウスが備わった居住地候補。最初は巨大な吸血蚊「ブラッドバグ」の大群に占拠されており、家の中には元住人と思われる白骨死体が転がっています。</p>

<h2>詳細</h2>
<p>家の中にあるターミナルとホロテープを調べると、この家の住人だった一家の悲劇的な結末を知ることができます。<br>娘のメアリーを助けるという名目で、騙されて胡散臭いカルト団体（ピラー・オブ・コミュニティ）へ巡礼に向かった兄弟や、それを追いかけた家族の記録が残されていますが、結局この家は無人となり、ブラッドバグの巣となってしまいました。</p>
<p>ブラッドバグを殲滅してワークショップを解放すると、豊富な水資源と立派な二階建ての家屋をそのまま利用できる非常に実用的な居住地となります。水上に浄水器を大量に並べて水商売（きれいな水の大量生産と売却）の拠点にする将軍が多い場所です。</p>
`,
        kanso: "FO4における「きれいな水」生産工場の筆頭候補。湖畔の美しい景色とは裏腹に、家の中には血を吸い尽くされた死体と巨大な蚊が飛び回っているという強烈な落差。ブラッドバグの死骸と血痕を掃除できないのが玉に瑕ですが、最高の水上拠点候補です。"
    },
    {
        title: "Coastal cottage",
        titleJa: "沿岸のコテージ",
        slug: "coastal-cottage",
        appearance: "Fallout 4",
        wikiSlug: "Coastal_cottage",
        mainImg: imgData["coastal-cottage"][0],
        infoRows: [
            ["種族", "レイダー / マイレルアーク"],
            ["区分", "居住地 / 大破した海沿いの家"],
            ["所在地", "連邦の北東端付近（パーソンズ精神病院の北東）"],
            ["特記事項", "極端に狭く建築難易度が最高クラス"],
        ],
        body: `
<h2>概要</h2>
<p>沿岸のコテージは、文字通り連邦の北東の海岸沿いにあるコテージの跡地ですが、「FO4で最も建築が難しい（イライラする）居住地」としてプレイヤーの間で悪名高い場所です。</p>

<h2>詳細</h2>
<p>この居住地の最大の問題点は、敷地の中央に存在する「撤去不可能な巨大な瓦礫と大穴」です。コテージの建物自体も屋根が大きく崩落しており、完全に修復することができないだけでなく、地面も激しく凹凸しており、通常の床板や壁を綺麗に配置することが非常に困難です。</p>
<p>レイダーや怪物を排除して拠点化しても、「どこにベッドを置けばいいんだ」「どうやって壁を張るんだ」と建築勢の頭を抱えさせることになります。<br>しかし、その「究極の不便さ」を逆手にとり、大穴を利用した隠し地下室風の建築を行ったり、段差を利用したアスレチックのような立体スラムを作ったりと、達人級のクラフターが己の腕を試す「最高難易度のキャンバス」としても愛されています。</p>
`,
        kanso: "全連邦の将軍が「なんでここを居住地に指定したんだ」とキレそうになる最悪の地形。ど真ん中に鎮座する絶対に消せないキャンピングカーの残骸と大穴をどうやって建築に『ごまかして』組み込むか。建築のクリエイティビティの限界が試される悪魔の土地です。"
    },
    {
        title: "Power Noodles",
        titleJa: "パワーヌードル",
        slug: "power-noodles",
        appearance: "Fallout 4",
        wikiSlug: "Power_Noodles",
        mainImg: imgData["power-noodles"][0],
        infoRows: [
            ["種族", "ロボット (タカハシ)"],
            ["区分", "ラーメン屋台 / ダイアモンドシティのシンボル"],
            ["所在地", "ダイアモンドシティ・マーケットの中央"],
            ["特記事項", "「ナニニシマスカ？」"],
        ],
        body: `
<h2>概要</h2>
<p>パワーヌードルは、ダイアモンドシティの中心、全てのプレイヤーが必ず訪れるマーケットのど真ん中に鎮座する大人気の屋台。店主は戦前の日本のプロテクトロンである「タカハシ」です。</p>

<h2>詳細</h2>
<p>店主のタカハシは音声言語モジュールが壊れており、客に対して「ナニニシマスカ？（Nan-ni shimasho-ka?）」という日本語のフレーズしか発音することができません。しかし彼が作る熱々の「ヌードルカップ」は、荒廃してまともな食事がないウェイストランドにおいて奇跡のような美味さを誇り、ダイアモンドシティの住人たちの胃袋と心を完全に掴んでいます。</p>
<p>プレイヤーはこの屋台で体力を回復させる「ヌードルカップ」を購入できるほか、ダイアモンドシティに訪れるたびに中央から聞こえてくるタカハシの「ナニニシマスカ？」という声は、FO4をプレイした全ての者の脳裏に焼き付く真のソウル・フード・スタンドです。</p>
`,
        kanso: "Fallout 4の全プレイヤーの心の故郷。過酷な旅からダイアモンドシティに帰還して、タカハシの「ナニニシマスカ？」を聞いた瞬間に『ああ、家に帰ってきたんだな』という圧倒的な安心感に包まれます。ブレードランナーのパロディとしても最高の演出です。"
    },
    {
        title: "Mega surgery center",
        titleJa: "メガ整形外科センター",
        slug: "mega-surgery-center",
        appearance: "Fallout 4",
        wikiSlug: "Mega_surgery_center",
        mainImg: imgData["mega-surgery-center"][0],
        infoRows: [
            ["種族", "人間 (Dr.クロッカー / Dr.スーン)"],
            ["区分", "医療施設 / 整形外科"],
            ["所在地", "ダイアモンドシティ・マーケットの地下室"],
            ["特記事項", "キャラメイクのやり直しが可能"],
        ],
        body: `
<h2>概要</h2>
<p>メガ整形外科センターは、ダイアモンドシティのさらに一段下がった地下室で営業している医療施設。顔のフェイシャル整形や放射能の治療、さらには薬品の販売などを行っています。</p>

<h2>詳細</h2>
<p>この施設はゲーム的なシステムとして「プレイヤーの顔のパーツや髪型を自由に変更（キャラメイクの再設定）できる」という非常に重要な役割を持っています。<br>経営者である「Dr.クロッカー」は口が軽く少しマッドな気質のある医者で、地下の不潔な診療台でノコギリや注射器を使って顔を『彫刻』してくれます。彼と助手（兼まともな医者）である「Dr.スーン」のやり取りも独特の魅力があります。</p>
<p>また、ゲームを進めるとここで「ある殺人事件」が発生し、Dr.クロッカーの隠された素顔と罪が暴かれるという、ダイアモンドシティの闇を描いたサイドクエストの舞台にもなります。</p>
`,
        kanso: "「放射能まみれのウェイストランドで、ノコギリとメスで顔の形を変えてもらう」という恐怖の整形外科。地下の薄暗く血生臭い部屋で、あの不気味に笑うDr.クロッカーにお金を払って顔をいじってもらう時のサイバーパンクな没入感は堪りません。"
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
