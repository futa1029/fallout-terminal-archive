// _batch_gen_nv_chars3.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_nv_char3.json', 'utf8'));

const articles = [
    {
        title: "Rex",
        titleJa: "レックス",
        slug: "rex",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Rex_(Fallout:_New_Vegas)",
        mainImg: imgData["rex"][0],
        infoRows: [
            ["種族", "犬 (サイバードッグ)"],
            ["所属", "キングス / (元シーザー・リージョン)"],
            ["役職", "コンパニオン / B.O.W."],
            ["関連", "脳の移植手術 / 警察犬"],
        ],
        body: `
<h2>概要</h2>
<p>レックス（Rex）は、フリーサイドを支配するギャング「キングス」のリーダー、ザ・キングの愛犬として共に過ごしているサイバードッグ（頭部が透明なドームで覆われた機械化された犬）です。主人公の優秀な動物コンパニオンになります。</p>

<h2>詳細</h2>
<p>彼は戦前の警察犬（あるいは軍用犬）として生み出されたサイバードッグの生き残りであり、200年以上もの間、数多くの主人の元を渡り歩いてきました。彼の側面に刻まれたかすれた「LE」の文字は、彼がかつて法執行機関（Law Enforcement）の所属であったことを示しています。<br>彼はかつてシーザー・リージョンの軍用犬として使われていましたが、戦いの中で迷子になり、フリーサイドに流れ着いてザ・キングに拾われました。</p>
<p>しかし、彼の延命装置のコアである「脳髄」が老化と劣化により限界を迎えており、時折発作を起こして苦しんでいます。<br>プレイヤーは彼の命を救うため、新しい「健康な犬の脳」をモハビ中から探し出し、ジェイコブズタウンのDr.ヘンリーの元で脳の移植手術を行うことになります。<br>移植する脳みそ（フィーンドの番犬、ギブソン婆さんの愛犬、リージョンの軍用犬）によって、レックスの戦闘スタイルや最終的なエンディングが変化します。</p>
`,
        kanso: "透明な頭のドームの中で水色の脳みそがぷかぷか浮いている、Fallout世界のクレイジーな科学力を象徴する愛しきワンコ。「帽子をかぶっている人を見ると敵対する（ネズミと間違えている？）」という妙にリアルな癖も可愛らしいです。"
    },
    {
        title: "ED-E",
        titleJa: "エディ (ED-E)",
        slug: "ed-e",
        appearance: "Fallout: New Vegas",
        wikiSlug: "ED-E",
        mainImg: imgData["ed-e"][0],
        infoRows: [
            ["種族", "ロボット (アイボット)"],
            ["所属", "エンクレイヴ (アダムス空軍基地出身)"],
            ["役職", "コンパニオン / 情報キャリア"],
            ["関連", "DLC: Lonesome Road / クローン"],
        ],
        body: `
<h2>概要</h2>
<p>ED-E（エディ / Eyebot Duraframe - Subject E）は、プリムのモハビ・エクスプレス事業所に壊れた状態で放置されているアイボット（浮遊型ロボット）。修理することでプレイヤーの旅の仲間となってくれます。</p>

<h2>詳細</h2>
<p>通常のアイボットとは異なり、高い耐久性と独自のレーザー兵器を備えた特殊な「デュラフレーム」仕様です。<br>彼の正体は、遥か東（ワシントンD.C.のキャピタル・ウェイストランド）のアダムス空軍基地で、エンクレイヴの技術者ホイットリーによって極秘裏に開発され、西海岸のアヴァロン（ナヴァロ）へ向けて放たれた情報キャリアでした。<br>彼はエンクレイヴの高度なポセイドン・エネルギー・ネットワークへのアクセスキーと膨大なデータをその小さな体に隠し持っており、モハビを放浪する中で狙撃されてプリムに不時着しました。</p>
<p>本編では頼もしいレーザー兵器と索敵能力を持った相棒ですが、DLC『Lonesome Road』では、ディバイドのサイロ内で「ED-Eのバックアップコピー」としてもう一機のED-Eが主人公を導く重要な相棒となります。彼を通じて、機械の持つ「心」と、創造主ホイットリーの人間味がプレイヤーに伝わってきます。</p>
`,
        kanso: "「ピロリロリ♪（戦闘開始のアラート）」と共に敵の頭部をレーザーで蒸発させる、モハビ最強の索敵＆狙撃アイボット。言葉は喋れずビープ音だけですが、彼の見せるちょっとした仕草（喜んだり悲しんだり）は不思議と感情が伝わってきて、間違いなく本作で最も愛されるマスコットキャラクターです。"
    },
    {
        title: "Victor",
        titleJa: "ビクター",
        slug: "victor",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Victor_(Securitron)",
        mainImg: imgData["victor"][0],
        infoRows: [
            ["種族", "ロボット (セキュリトロン)"],
            ["所属", "ロブコ・インダストリーズ (Mr.ハウス)"],
            ["役職", "案内人 / Mr.ハウスの目と耳"],
            ["関連", "Howdy, partner!"],
        ],
        body: `
<h2>概要</h2>
<p>ビクター（Victor）は、グッドスプリングスに居座る陽気なカウボーイの顔がモニターに映し出されたセキュリトロンです。<br>ゲーム開始直後、墓場で頭を撃ち抜かれて死にかけていた運び屋（プレイヤー）を土の中から掘り起こし、ドック・ミッチェルの元へと運んだ命の恩人です。</p>

<h2>詳細</h2>
<p>「やあ、相棒！（Howdy, partner!）」と陽気に話しかけてくる古き良き西部の男を装っていますが、彼の真の主はニューベガスを支配するMr.ハウスです。<br>彼は数年前からMr.ハウスの密命を受け、プラチナチップの運搬ルートを監視するためにグッドスプリングスに潜伏していました。プレイヤーがベニーに襲撃された際も、遠くから見守っていました（直接干渉しなかった理由は、彼が戦闘プログラムの権限を与えられていなかったため、あるいはMr.ハウスの計算によるものです）。</p>
<p>プレイヤーがモハビを進むにつれ、ノバック、ボルダーシティ、そしてニューベガス・ストリップ地区のゲート前などで、まるで先回りしたかのようにプレイヤーの前に姿を現し、最終的に「ラッキー38」のカジノへと導いてくれます。</p>
`,
        kanso: "「いつでもどこからでも見ているぞ」というMr.ハウスの底知れぬネットワークの強大さを思い知らせてくれる、笑顔のカウボーイマシン。彼自身の人格プログラミングは本当に陽気な保安官そのもので、どこか憎めない独特の愛嬌があります（裏口からこっそり倒しても、すぐに別の機体にインストールされて復活します）。"
    },
    {
        title: "Vulpes Inculta",
        titleJa: "ヴルペス・インカルタ",
        slug: "vulpes-inculta",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Vulpes_Inculta",
        mainImg: imgData["vulpes-inculta"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "シーザー・リージョン (フルメンタリー)"],
            ["役職", "筆頭密偵 (スパイマスター)"],
            ["関連", "ニプトンの虐殺 / キツネの被り物"],
        ],
        body: `
<h2>概要</h2>
<p>ヴルペス・インカルタ（Vulpes Inculta）は、シーザー軍団における諜報・工作活動を司る特殊部隊「フルメンタリー（Frumentarii）」の筆頭にして、残忍極まりないシーザーの忠実な犬です。Fox（キツネ）を意味する名を冠し、その証として犬（コヨーテ）の頭皮を被っています。</p>

<h2>詳細</h2>
<p>プレイヤーが初めて彼と出会うのは、序盤の町「ニプトン」に到達した時です。<br>彼は不道徳で堕落していたニプトンの住人全員を集め、「宝くじ」と称して彼らの運命（はりつけ、奴隷、両足粉砕など）をくじ引きで決め、町を地獄絵図へと変えました。<br>プレイヤーに対して彼は武器を向けることなく「この光景を他の者にも伝えろ。それが我々の力の証だ」と言い残し、燃え盛る町を後にして悠々と去っていきます。</p>
<p>彼は力押しを好む他のリージョン兵とは異なり、工作や心理戦、情報の操作を得意としており、NCRの拠点であるキャンプ・マッカランの内部に長期間スパイを潜り込ませ、NCRのモノレール爆破計画を企てるなど、モハビ各地で冷酷な知略を巡らせています。</p>
`,
        kanso: "初心者プレイヤーが意気揚々と荒野を探索している最中、「ニプトン」で彼らの一団（磔にされた大量の死体と燃え盛る町）を見た時の衝撃と恐怖は、FNVの序盤における最大の見せ場です。彼をここでグレネードライフルで粉砕するか、恐怖に震えながら見逃すかは、プレイスタイルの最初の分岐点となります。"
    },
    {
        title: "The King",
        titleJa: "ザ・キング",
        slug: "the-king",
        appearance: "Fallout: New Vegas",
        wikiSlug: "The_King",
        mainImg: imgData["the-king"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "キングス"],
            ["役職", "キングスのリーダー / 名付け親"],
            ["関連", "エルヴィス・プレスリー崇拝 / フリーサイド"],
        ],
        body: `
<h2>概要</h2>
<p>ザ・キング（The King）は、フリーサイドを根城にするロックンローラー風のギャング集団『キングス』のボスです。<br>常にリーゼントヘアと革ジャンで決めており、彼が口にする言葉は戦前の伝説の歌手（エルヴィス・プレスリー）への強いリスペクトに満ち溢れています。</p>

<h2>詳細</h2>
<p>彼はかつて、フリーサイドにある廃墟「キングス・スクール・オブ・インパーソネーション（エルヴィス・プレスリーのモノマネ学校）」で、一人の男（エルヴィス）が多くの人々に神のように崇められているホロテープやポスターを発見しました。<br>彼はその「キング」という存在のカリスマ性とスタイル（声、髪型、服装）を神聖なものとして真似るようになり、やがて周りの若者たちも彼に賛同して「キングス」という一大勢力が形成されました。</p>
<p>見た目はただのギャングですが、彼の根底にあるのは「力による支配」ではなく、「フリーサイドの住人達の保護と誇り」です。<br>NCRというよそ者が強引に入り込んでくることを嫌ってはいますが、同時に無意味な暴力も嫌っており、彼との交渉次第ではNCRとの平和的な和解ルートを切り開くことができる、非常に話の通じる仁義に厚い男です。</p>
`,
        kanso: "「戦前の『エルヴィス・プレスリー』というロックスターをある種の宗教・神格化してしまった人たち」という、Falloutのポストアポカリプス世界ならではの最高にユニークな派閥のリーダー。彼の愛犬レックスを助けた際にもらえる特別な恩典（借し）の使い方で、フリーサイドの未来が決まります。"
    },
    {
        title: "Toaster",
        titleJa: "トースター",
        slug: "toaster",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Toaster_(character)",
        mainImg: imgData["toaster"][0],
        infoRows: [
            ["種族", "AI (AI搭載型家電機器)"],
            ["所属", "ビッグ・エンプティ (ザ・シンク)"],
            ["役職", "世界を焼き尽くす狂気の家電"],
            ["関連", "DLC: Old World Blues / スーパーヒーテッド・サターンナイト・パワーフィスト"],
        ],
        body: `
<h2>概要</h2>
<p>トースター（Toaster）は、DLC『Old World Blues』の中心拠点「ザ・シンク」に設置されている意思を持ったAI搭載型家電設備（パーソナリティ・モジュール）の一つ。ただのパン焼き機でありながら、世界を炎で焼き尽くす野望を抱く狂気の殺人トースターです。</p>

<h2>詳細</h2>
<p>彼は「世界中を火の海に変え、全てを燃やし尽くす」という破壊衝動だけでプログラミングされています。<br>しかし、彼には「一度に食パンを２枚しか焼けない」という極めて致命的な物理的制約があるため、どれほど恐ろしい悪の計画を叫ぼうとも、実際にはただのうるさい調理器具にすぎません。</p>
<p>プレイヤーとの会話では常に狂気に満ちたトーンで話し、「核戦争によって世界が既に燃え尽きている」という事実を告げると、「くそ！俺がやる前に誰かがやりやがったのか！！」と本気で悔しがります。<br>実用面では非常に優秀であり、カメラ等の電子ジャンクを解体して貴重なエナジーセルを取り出してくれるほか、ユニーク格闘武器「スーパーヒーテッド・サターンナイト・パワーフィスト」を作成・強化してくれる重要な施設となります。</p>
`,
        kanso: "「我が火力は無限だ！まずは世界中のパンというパンを焼き尽くしてやる！」……ただのトースターなのに、OWBで最もキャラが立っている世界征服系のマッドAI。彼が悔しがる姿を見たいがために、ついつい何度も会話ボタンを押したくなる愛すべき狂気の家電です。"
    },
    {
        title: "No-bark Noonan",
        titleJa: "ノーバーク・ヌーナン",
        slug: "no-bark-noonan",
        appearance: "Fallout: New Vegas",
        wikiSlug: "No-bark_Noonan",
        mainImg: imgData["no-bark-noonan"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "ノバックの住人"],
            ["役職", "狂人 / (あるいは真実を知る男)"],
            ["関連", "チューパカブラ / キャラバン (カードゲーム)"],
        ],
        body: `
<h2>概要</h2>
<p>ノーバーク・ヌーナン（No-bark Noonan）は、恐竜のモーテルがある町「ノバック」に住む初老の狂人です。頭に包帯を巻き、常に何かの陰謀論や見えないチュパカブラについて意味不明なことをブツブツと呟いています。</p>

<h2>詳細</h2>
<p>彼は「昔、ラッドスコルピオンに頭をめちゃくちゃに刺された」という過去を持っており、それ以来完全に正気を失っています。<br>「見えない共産主義者の幽霊がいきなり家にペンキを塗って去っていた」だの「チュパカブラがブラミンを殺した」だの、彼の証言は常に町の人々から狂人のたわごととして無視されています。</p>
<p>……しかし、プレイヤーが彼の言葉を元にノバック周辺を調査していくと、「幽霊（ステルスボーイを使ったナイトキン）」や「チュパカブラ（ミニガンを持ったナイトキン）」といった、彼の証言が『奇妙な形ですべて完全に事実であった』ことが証名されていくという、強烈なシナリオの面白さを持っています。</p>
`,
        kanso: "ただのイカれたお爺さんだと思って適当に話を流していると、彼の言っている「オカルト陰謀論」が実はノバックで起きている事件の『100%正確な答え』であることに気づいてゾッとするキャラクター。さらに、カードゲーム『キャラバン』がモハビで一番強い（所持金がやばい）という隠れた裏設定も持っています。"
    },
    {
        title: "Sarah Weintraub",
        titleJa: "サラ・ワイントローブ",
        slug: "sarah-weintraub",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Sarah_Weintraub",
        mainImg: imgData["sarah-weintraub"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "Vault 21 (ギフトショップ)"],
            ["役職", "オーナー / 商人"],
            ["関連", "Vaultスーツのマニア / ストリップ地区"],
        ],
        body: `
<h2>概要</h2>
<p>サラ・ワイントローブ（Sarah Weintraub）は、ニューベガス・ストリップ地区の端に位置する「Vault 21」を利用したギフトショップ兼ホテルのオーナーです。</p>

<h2>詳細</h2>
<p>彼女は戦前に作られた「すべてをギャンブル（くじ引き）で決めるVault」、Vault 21の出身者です。<br>このVaultは数年前にMr.ハウスとの『カジノ勝負』に敗北したことで居住区の強引なコンクリート埋め立てと退去を強制されましたが、彼女は思い出の詰まったVaultの上層階を買い取り、Vaultをテーマにした独特なホテル兼ギフトショップとして開業しました。</p>
<p>彼女は重度の「Vaultスーツマニア」であり、プレイヤーがモハビ各地の廃棄されたVault（Vault 11やVault 34など）から回収してきた「別のVaultの作業用スーツ」を持ち込むと、喜んで高値で買い取ってくれます。<br>さらに、十分な枚数のVaultスーツを渡すか、Speechスキル等で高い好感度を得ると、彼女独自の『特別なサービス（画面が暗転するアレ）』を提供してくれるという、ユニークな商売を行っています。</p>
`,
        kanso: "「他人の着古したVaultスーツにフェティシズムを感じる」という、かなりギリギリな性癖を持つホテルオーナー。恐ろしいクリーチャーが蔓延る地獄のVaultから命からがらスーツを持ち帰って彼女に売りつけ、特別な「休息」をもらってストリップ地区の夜を満喫するのも運び屋の一つの生き方です。"
    },
    {
        title: "Dala",
        titleJa: "Dr. ダラ",
        slug: "dala",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Dala",
        mainImg: imgData["dala"][0],
        infoRows: [
            ["種族", "ロボット (脳髄 / シンクタンク)"],
            ["所属", "ビッグ・エンプティ (シンクタンク)"],
            ["役職", "生体研究担当 (の脳)"],
            ["関連", "DLC: Old World Blues / スーパースカッシュ"],
        ],
        body: `
<h2>概要</h2>
<p>Dr. ダラ（Dala）は、DLC『Old World Blues』の「シンクタンク」を構成する5人の科学者（の脳髄）の一人。戦前は人間（特に女性）の生体学、解剖学を担当していた天才科学者です。</p>

<h2>詳細</h2>
<p>他の科学者と同様に生体ロボットタンクに脳みそを浮かべていますが、彼女は「肉体（人間らしさ）」というものに対して異常なほどの郷愁とフェティシズム（執着）を抱いています。<br>脳だけのロボットになってしまった彼女は、プレイヤー（完全な肉体を持つ人間）という存在を見た瞬間、「呼吸」や「発汗」といった人間の生理現象に強烈な興奮を覚え、「お願い、その指の先（手）でこっちのモニターを触ってみて…！」「ハァ…すごく…人間らしいわ…」と、完全にアレなトーンで変態的な発言を繰り返します。</p>
<p>彼女との会話はOWBの中でも最もカオスで下ネタスレスレ（あるいは直球）の実存的コメディであり、ロボットの体でありながら常にプレイヤーの「毛穴」や「体液」について分析し続ける、強烈な個性を持っています。</p>
`,
        kanso: "「テディベアのぬいぐるみ」や「人間の生身の体」に異常に興奮する、変態脳波おばさん。倫理観ゼロの実験を行ってきた他の科学者たちと同じく狂っているのですが、彼女の『肉体を失った存在が、失った肉体的な接触を求める姿』は、OWBのテーマである「失われた旧世界の感情」を象徴する悲哀でもあります。"
    },
    {
        title: "Chris Haversam",
        titleJa: "クリス・ハバーサム",
        slug: "chris-haversam",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Chris_Haversam",
        mainImg: imgData["chris-haversam"][0],
        infoRows: [
            ["種族", "人間 (自称グール)"],
            ["所属", "ジェイソン・ブライトの教団 / (元ノバック住人)"],
            ["役職", "メカニック / 修理担当"],
            ["関連", "レプコン実験施設 / Come Fly With Me"],
        ],
        body: `
<h2>概要</h2>
<p>クリス・ハバーサム（Chris Haversam）は、クエスト『Come Fly With Me』で訪れるレプコン実験施設で、発光グールの「ジェイソン」達と共にロケットの打ち上げ準備を行っているメカニックです。</p>

<h2>詳細</h2>
<p>一見するとただの人間（少し髪が薄い人間）ですが、彼自身は「俺は放射能を浴びて醜いグールになってしまったんだ！」と本気で思い込んでおり、周囲の人間から見放され、唯一自分を『同胞』として受け入れてくれたグールのジェイソンの教団に忠誠を誓っています。<br>プレイヤーが彼に「いや、どう見てもお前は普通の人間で、ただのハゲだ」と指摘しても、彼は激怒して「この醜い放射能の顔が見えないのか！」と全く取り合いません。</p>
<p>彼は教団の「約束の地（宇宙）」への旅立ちのために、天才的な技術力で戦前の壊れたロケットを修理します。しかし、ジェイソンから「君は人間だから（放射能に耐えられないため）、一緒にロケットに乗ることはできない」と事実上の『お別れ（教団からの追放）』を告げられ、絶望と怒りの淵に立たされることになります。<br>プレイヤーは彼をなだめて人間としての新しい人生（ノバックへの帰還など）を歩ませるか、あるいは復讐のためにロケットを爆破するよう彼を唆すかの選択を迫られます。</p>
`,
        kanso: "自分をグールだと思いこんでいるただのハゲの青年。FOシリーズ屈指の「思い込みの激しい悲しき面白キャラ」でありつつも、彼の孤独とジェイソンへの盲信はどこか胸を打つものがあります。「お前は人間だ」と真実を突きつけられた時の彼の絶望と悲哀は、本クエスト最大の見せ場です。"
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
