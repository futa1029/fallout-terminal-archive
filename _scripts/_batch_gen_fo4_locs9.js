// _batch_gen_fo4_locs9.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp9.json', 'utf8'));

const articles = [
    {
        title: "Fort Hagen",
        titleJa: "ヘーゲン砦",
        slug: "fort-hagen",
        appearance: "Fallout 4",
        wikiSlug: "Fort_Hagen",
        mainImg: imgData["fort-hagen"][0],
        infoRows: [
            ["種族", "シンス / 人間 (ケロッグ)"],
            ["区分", "戦前の軍事基地跡"],
            ["所在地", "連邦西部"],
            ["統治者", "コンラッド・ケロッグ"],
        ],
        body: `
<h2>概要</h2>
<p>ヘーゲン砦（Fort Hagen）は、戦前のアメリカ軍が使用していた軍事基地および病院施設の複合体です。現在はインスティチュートによって管理されており、主人公の息子ショーンを誘拐した張本人である冷酷な傭兵「ケロッグ」の潜伏先となっています。</p>

<h2>詳細</h2>
<p>Fallout 4のメインクエスト第1部における最大のヤマ場となるロケーションです。プレイヤーはドッグミートの嗅覚を頼りにケロッグの足跡を追い、この砦の入り口に辿り着きます。<br>砦の内部は第1層の病院エリアと、さらに地下深くに広がる無骨な軍事指令センター（ヘーゲン砦司令部）に分かれており、夥しい数の人造人間（シンス）とタレットがケロッグを守るために配置されています。指令センターの最深部では、インスティチュートの刺客として長年生きてきたケロッグと直接対峙し、彼から息子の行方を聞き出すための避けられない死闘が展開されます。</p>
<p>この砦での決着後、屋上から外に出た瞬間にB.O.S.の巨大飛行船『プリドゥエン』が圧倒的なアナウンスと共に連邦の空に飛来するイベントが発生し、物語は大きく動き出します。</p>
`,
        kanso: "「妻の仇であり息子を奪った男との決戦」という、プレイヤーの感情が最も高ぶる中盤の超重要ダンジョン。ケロッグとの戦闘後の静寂の中、屋上のドアを開けた瞬間に巨大な飛行船が太陽の光を遮って現れる演出は、FO4で最も鳥肌が立つ名シーンです。"
    },
    {
        title: "The Switchboard",
        titleJa: "スウィッチボード",
        slug: "the-switchboard",
        appearance: "Fallout 4",
        wikiSlug: "The_Switchboard",
        mainImg: imgData["the-switchboard"][0],
        infoRows: [
            ["種族", "シンス"],
            ["区分", "戦前の政府極秘バンカー"],
            ["所在地", "レキシントンの地下"],
            ["目的", "旧レールロード本部"],
        ],
        body: `
<h2>概要</h2>
<p>スウィッチボード（The Switchboard）は、戦前のアメリカ国防情報局（DIA）が使用していた地下の極秘指令バンカーです。かつて秘密組織「レールロード」が本部として利用していましたが、現在はインスティチュートの襲撃によって壊滅し、放棄されています。</p>

<h2>詳細</h2>
<p>レキシントンの廃墟ビル（スローカムズ・ジョーの地下）から秘密の土管を通って進入する広大な地下空間です。<br>レールロードのクエストライン「Tradecraft」にて、ディーコンと共に暗号通貨（試作型プロトタイプ設備）や「デリバラー（10mmピストル）」を回収するために訪れることになります。内部は当時のインスティチュートによる激しい奇襲（スイッチボード陥落）の爪痕が今も生々しく残されており、無造作に転がっているレールロード・エージェントの死体と、それを占拠している大量の人造人間（シンス）との交戦になります。</p>
<p>また、ここの最深部のターミナルには、PAM（予言AI）に関するDIAの戦前の極秘情報や、大戦争が勃発した当日の緊迫した通信記録「DEFCON 1への移行」などの非常に重要なロアテキストが残されています。</p>
`,
        kanso: "「地下深くに眠る本物のスパイ組織の旧本部」という最高にワクワクする設定のダンジョン。ここで手に入る（相棒の死体から受け継ぐ）サプレッサー付きピストル『デリバラー』は、V.A.T.S.特化の神アサシン武器として終盤まで大活躍するため、多くのプレイヤーがお世話になる思い出深い場所です。"
    },
    {
        title: "Vault 114",
        titleJa: "Vault 114",
        slug: "vault-114",
        appearance: "Fallout 4",
        wikiSlug: "Vault_114",
        mainImg: imgData["vault-114"][0],
        infoRows: [
            ["種族", "トリガーマン （マフィア）"],
            ["区分", "未完成のVault / マフィアのアジト"],
            ["所在地", "パークストリート駅の奥"],
            ["関連", "ニック・バレンタインの救出"],
        ],
        body: `
<h2>概要</h2>
<p>Vault 114は、ボストン地下のパーク・ストリート駅のさらに奥深くに建設されたVault-Tec社の核シェルター。現在はスキニー・マローン率いるギャング「トリガーマン」たちの本拠地として占拠されています。</p>

<h2>詳細</h2>
<p>このVaultに隠された恐ろしい社会実験の目的は「戦前の上流階級の特権層（政治家や富裕層）をわざと狭く粗末な部屋に押し込み、反知性主義の狂った男を監督官（オーバーシアー）に任命させて生活させることで、彼らがどのようなストレス反応を示すか観察する」というものでした。（しかし大戦争によって完成前に放置されました）</p>
<p>メインクエスト「Unlikely Valentine」において、トリガーマンに誘拐された探偵ニック・バレンタインを救出するためにこの地下要塞へ乗り込むことになります。<br>トミーガンを持ったクラシックスタイルのマフィアたちが警備するVault内部を突破し、最深部でニックを解放した後、彼と共にVaultの通路を逆走して脱出するという活劇が楽しめます。</p>
`,
        kanso: "「地下鉄の奥にある未完成の核シェルターを、マフィアがアジトにしている」という、あまりにもシビれるシチュエーション。ここで初めて出会うニック・バレンタインのハードボイルドな振る舞いや、彼と一緒にスキニー・マローンらを口八丁（あるいは暴力）で切り抜ける脱出劇は、FO4屈指の名シーンです。"
    },
    {
        title: "Atom Cats garage",
        titleJa: "アトムキャッツのガレージ",
        slug: "atom-cats-garage",
        appearance: "Fallout 4",
        wikiSlug: "Atom_Cats_garage",
        mainImg: imgData["atom-cats-garage"][0],
        infoRows: [
            ["種族", "人間 (アトムキャッツ)"],
            ["区分", "ガレージ / ワークショップ"],
            ["所在地", "連邦南東部の半島"],
            ["統治者", "ジーク"],
        ],
        body: `
<h2>概要</h2>
<p>アトムキャッツのガレージ（Atom Cats garage）は、連邦南東部の沿岸にある、戦前のレッドロケット・ステーションの跡地を利用した要塞化されたガレージです。<br>パワーアーマーをこよなく愛する不良（グリーサー）集団「アトムキャッツ」の本拠地です。</p>

<h2>詳細</h2>
<p>彼らはレイダーとは異なり、略奪を目的とはしていません。「パワーアーマーをいかにクール（Cool）で最高（Cat）に改造するか」という美学とカスタム文化に情熱を注ぐ、ウェイストランドでは珍しいほど陽気で善意ある若者たちです。彼らのリーダーであるジークは、T-60パワーアーマーを炎のカスタムペイントで飾り立て、連邦の退屈な生活を詩やカスタムパーツで彩っています。</p>
<p>このガレージでは、独自の「アトムキャッツ・カスタムペイント」が施されたT-60のパーツや、貴重なパワーアーマーのモジュールを購入することができます。彼らを手伝ってガンナーの襲撃を撃退すると、彼らのジャケットを貰い、晴れて「アトムキャッツ」の一員として認められます。</p>
`,
        kanso: "「世紀末の世界で、ポマードで髪を固め、革ジャンを着てパワーアーマーを改造して遊んでいる不良たち」。彼らの底抜けにポジティブな空気は、陰惨な連邦のオアシスのようです。彼らの専用ペイント「アトムキャッツ塗装」は性能も見た目も飛び抜けて素晴らしく、パワーアーマー乗りなら絶対に訪れるべき聖地です。"
    },
    {
        title: "Big John's Salvage",
        titleJa: "ビッグジョンのサルベージ場",
        slug: "big-johns-salvage",
        appearance: "Fallout 4",
        wikiSlug: "Big_John%27s_Salvage",
        mainImg: imgData["big-johns-salvage"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "ゴミ捨て場 / 車のスクラップ場"],
            ["所在地", "ボストン南部の沼地"],
            ["関連", "最強のユニーク武器「レールウェイライフル」"],
        ],
        body: `
<h2>概要</h2>
<p>ビッグジョンのサルベージ場（Big John's Salvage）は、戦前にスクラップや車の廃棄事業を行っていた巨大なジャンクヤードの跡地。現在は夥しい数のスーパーミュータントの拠点となっています。</p>

<h2>詳細</h2>
<p>このロケーションは、ラジオ塔の電波通信（ハムラジオ）で傍受できる「家族と一緒にシェルターに逃げ込んだが、発電機が止まって外に出られない」という悲痛なSOS信号の発信源です。<br>この手作りシェルターは、積み上げられた大量のスクラップと『列車の貨車』の真下に隠されており、プレイヤー周辺のブレーカー（配電盤）を探して電源を復旧させなければドアを開けることができません。</p>
<p>見事謎解きをして地下シェルターに入ると、そこにはSOSを発信していたジョンとその妻、そして二人の子供たちのお墓（白骨死体）が静かに眠っています。そしてその悲劇の空間には、FO4における最強クラスのユニーク武器「レールウェイライフル」が置かれています。</p>
`,
        kanso: "ラジオのSOSを頼りにやってきたら、既に何百年も前に全員が死に絶えていた…という、Fallout恒例の悲しすぎる『見つからなかった避難所』の一つ。しかしここで手に入るレールウェイライフルは「敵の頭をクギで壁に貼り付ける」という強烈なインパクトと凄まじい威力を誇るため、多くのプレイヤーがこの家族の墓を漁りにやってくることになります。"
    },
    {
        title: "Med-Tek Research",
        titleJa: "メッド・テック・リサーチ",
        slug: "med-tek-research",
        appearance: "Fallout 4",
        wikiSlug: "Med-Tek_Research",
        mainImg: imgData["med-tek-research"][0],
        infoRows: [
            ["種族", "フェラル・グール"],
            ["区分", "戦前の医療研究施設"],
            ["所在地", "モルデン南西部"],
            ["関連", "マクレディの特効薬（Prevent）"],
        ],
        body: `
<h2>概要</h2>
<p>メッド・テック・リサーチ（Med-Tek Research）は、戦前のアメリカで最先端の薬物研究やウィルス兵器の実験を行っていた製薬会社（メッド・テック社）の大規模な研究施設です。</p>

<h2>詳細</h2>
<p>この施設の地下深くの封鎖された区画には、「Prevent」と呼ばれる未承認の強力な万能薬（特効薬）が保存されています。コンパニオンである「マクレディ」の好感度が最高値に達した際の専用クエスト「Long Road Ahead」において、彼の故郷（キャピタル・ウェイストランド）で不治の病に苦しんでいる一人息子「ダンカン」を救うため、彼と共にこの危険な施設へ潜入することになります。</p>
<p>施設内には強力な光りし者や焦げたフェラル・グールが大量に隔離室に閉じ込められており、ロックを解除すると一斉に襲いかかってきます。最深部のクリーンルームにある特効薬を手に入れた時のマクレディの安堵と感謝の言葉は、プレイヤーの心に熱く響きます。</p>
`,
        kanso: "「不治の病に罹った息子を救うため、封印された戦前の製薬会社の奥底へ潜る」という、コンパニオンクエストの中でも屈指のシナリオ強度を誇る舞台。マクレディがどれだけ息子を愛しているかが伝わってくる胸熱のダンジョンであり、無事に特効薬である「Prevent（プリベント）」を手にした瞬間は本当にホッとします。"
    },
    {
        title: "General Atomics factory",
        titleJa: "ゼネラル・アトミックス工場",
        slug: "general-atomics-factory",
        appearance: "Fallout 4",
        wikiSlug: "General_Atomics_factory",
        mainImg: imgData["general-atomics-factory"][0],
        infoRows: [
            ["種族", "ロボット (Mr.ハンディほか)"],
            ["区分", "戦前のロボット製造工場"],
            ["所在地", "南ボストンの海岸沿い"],
            ["関連", "DLC: Automatron (エイダ)"],
        ],
        body: `
<h2>概要</h2>
<p>ゼネラル・アトミックス工場（General Atomics factory）は、戦前のアメリカにおいて「Mr.ハンディ」などの汎用家事ロボットを大量生産していた巨大な工場の廃墟です。</p>

<h2>詳細</h2>
<p>内部のフロアには部品の組み立てラインや品質管理（QA）のテスト設備が、数百年が経過した今も機能を保ったまま残されています。特にユニークなのは「Mr.ハンディの性能テスト用のアスレチック部屋」であり、プレイヤーが「赤ん坊の泣き声をあやす」「不審者を排除する」といった家事のシミュレーションテストに合格すると、金庫室のロックが解除されるちょっとしたパズル要素が存在します。</p>
<p>また、DLC「Automatron」においては、邪悪なメカニストのロボット軍団（ロボブレイン）がこの施設を最初の前線基地として利用しており、主人公とエイダが初めて本格的にメカニストの軍勢と激突する強襲任務の舞台となります。</p>
`,
        kanso: "「Mr.ハンディが主婦としてちゃんと家事をこなせるか」をテストするためのおままごと部屋が残っている、FO4らしいユーモアの効いた工場。DLC導入後は、メカニストの恐ろしいロボブレインたちが一斉に襲いかかってくる激しい戦場に様変わりし、二度美味しいロケーションです。"
    },
    {
        title: "Kendall Hospital",
        titleJa: "ケンダル病院",
        slug: "kendall-hospital",
        appearance: "Fallout 4",
        wikiSlug: "Kendall_Hospital",
        mainImg: imgData["kendall-hospital"][0],
        infoRows: [
            ["種族", "レイダー / デスクロー"],
            ["区分", "病院の廃墟"],
            ["所在地", "ケンブリッジ南東部"],
            ["関連", "地下の処刑場"],
        ],
        body: `
<h2>概要</h2>
<p>ケンダル病院（Kendall Hospital）は、ケンブリッジに位置する多層構造の巨大な総合病院の跡地です。非常に大規模なレイダーのアジトになっています。</p>

<h2>詳細</h2>
<p>病院というよりは立派な要塞のように機能しており、内部は吹き抜けのフロアを利用して、下階から上階を狙い撃ちにしてくるレイダーとの激しい銃撃戦が展開されます。地下には「デス爪（デスクロー）」の子供を捕獲し、闘技場やまじないのように利用している狂ったレイダーの死体が転がっています。</p>
<p>このロケーションの最大の恐怖は最下層（地下のゴミ処理場）にあります。上階から続く穴にうっかり落ちてしまう（あるいは探索のために飛び降りる）と、真っ暗なゴミ溜めの中で完全に飢え切った巨大な『デスクロー』が待ち構えており、逃げ場のない狭い空間での絶望的な死闘が確定するという、強烈な初見殺しトラップが用意されています。</p>
`,
        kanso: "「病院の探索が終わって地下室に飛び降りたら、暗闇から咆哮とともにデスクローが突っ込んできた」。多くのプレイヤーが恐怖のあまり悲鳴を上げた、FO4名物の心臓に悪いギミックダンジョン。上階のレイダーたちがコイツを飼い慣らそうとして失敗した形跡があるのもお約束です。"
    },
    {
        title: "C.I.T. ruins",
        titleJa: "C.I.T.廃墟",
        slug: "cit-ruins",
        appearance: "Fallout 4",
        wikiSlug: "C.I.T._ruins",
        mainImg: imgData["cit-ruins"][0],
        infoRows: [
            ["種族", "スーパーミュータント / シンス"],
            ["区分", "戦前の大学キャンパスの廃墟"],
            ["所在地", "ケンブリッジ中央（川沿い）"],
            ["関連", "インスティチュートへの入り口"],
        ],
        body: `
<h2>概要</h2>
<p>C.I.T.廃墟（Commonwealth Institute of Technology ruins）は、戦前のアメリカで最難関とされた世界的工科大学のキャンパス跡地。マサチューセッツ工科大学（MIT）をモデルとしています。</p>

<h2>詳細</h2>
<p>地表部分のキャンパスの建物は完全に崩落し、現在はスーパーミュータントたちがたむろするありふれた廃墟に見えます。しかし、驚くべきことにこの広大な瓦礫の「真下（地下深く）」にこそ、連邦の全ての元凶であり、人間と見分けのつかない人造人間を製造している謎のハイテク地下帝国『インスティチュート』の巨大な施設がそのままの形で現在も隠されています。</p>
<p>メインクエストの中盤において、プレイヤーが（コーサーのチップを解析して）テレポーターを自作し、初めてインスティチュートの内部へと転送される際の座標（アンテナを向ける先）がこの場所です。また、物語の特定のルートでは、主人公と息子ショーンがこのキャンパスの屋上で連邦の未来について語り合う、非常に重要なイベントシーンの舞台ともなります。</p>
`,
        kanso: "連邦の住民が「やつらはどこから来るんだ？」と怯えていたインスティチュートの本拠地が、実は一番有名な戦前の大学の真下にあったという秀逸な設定の場所。ヘーゲン砦の「プリドゥエン飛来」と双璧をなす、インスティチュートへの初潜入（テレポート）の舞台として、プレイヤーの記憶に強烈に刻まれます。"
    },
    {
        title: "BADTFL regional office",
        titleJa: "BADTFL地方局",
        slug: "badtfl-regional-office",
        appearance: "Fallout 4",
        wikiSlug: "BADTFL_regional_office",
        mainImg: imgData["badtfl-regional-office"][0],
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "戦前の連邦法執行機関（警察局）"],
            ["所在地", "ボストン北東部（チャールズタウン付近）"],
            ["関連", "エディー・ウィンター事件"],
        ],
        body: `
<h2>概要</h2>
<p>BADTFL（アルコール・麻薬・タバコ・銃器・レーザー取締局）地方局は、戦前のアメリカ警察・捜査機関の巨大なオフィスの廃墟です。現在はレイダー集団の拠点として利用されています。</p>

<h2>詳細</h2>
<p>このロケーションは、コンパニオンである探偵ニック・バレンタインの好感度クエスト「Long Time Coming」において極めて重要な意味を持ちます。戦前のボストン暗黒街を支配し、ニック（元になった警官の記憶）の妻を殺害した憎きマフィアのボス「エディー・ウィンター」が残した数々の犯罪の証拠ホロテープのうち、記念すべき「テープ1」がこのオフィスの証拠保管庫に安置されています。</p>
<p>内部は牢屋や尋問室、オフィスデスクが並んでおり、戦前の警察組織がいかにエディーの悪事に翻弄され、そして彼を取り逃がしてしまったかの苦悩がターミナルに綴られています。また、留置所のセルには貴重な「G&B（銃と弾丸）」の雑誌が落ちています。</p>
`,
        kanso: "「戦前のエリート警察組織が、一人のギャングのボスの前に屈した記録」が残る物悲しい警察署。ここから始まるニック・バレンタインとの「200年越しの復讐劇（エディー・ウィンターのテープ集め）」は、FO4のサブシナリオの中でも圧倒的な完成度を誇るため、非常に印象深いスタート地点となります。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        // Use pre-fetched image name from json
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
