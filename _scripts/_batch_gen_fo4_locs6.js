// _batch_gen_fo4_locs6.js
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
        title: "Old North Church",
        titleJa: "オールド・ノース・チャーチ",
        slug: "old-north-church",
        appearance: "Fallout 4",
        wikiSlug: "Old_North_Church",
        mainImg: "Old_North_Church.jpg",
        infoRows: [
            ["種族", "レールロード / フェラル・グール"],
            ["区分", "歴史的教会 / 地下本部"],
            ["所在地", "ボストン北東部（ノースエンド）"],
            ["統治者", "デズデモーナ"],
        ],
        body: `
<h2>概要</h2>
<p>オールド・ノース・チャーチ（Old North Church）は、実在するボストン最古の教会建築の廃墟です。現在はレイダーすら立ち入らないグールの巣窟として知られていますが、その地下のカタコンベのさらに奥深くには、人造人間の解放を掲げる秘密組織「レールロード」の本部（本部名：The Switchboard の代わりの隠れ家）が存在しています。</p>

<h2>詳細</h2>
<p>主人公が彼らと接触するためには、ボストン・コモンから始まる赤いレンガの道「フリーダム・トレイル」を辿って暗号のキーワードを収集し、この教会の暗がりにあるランタンの仕掛けを正しいパスワードで解錠するという、スパイ映画のような潜入プロセスを経る必要があります。</p>
<p>内部の彼らの本部は非常に貧相で物資も少なく、B.O.S.やインスティチュートのような強大な軍事力・技術力は持っていません。しかし、デズデモーナやドラムボーイ、ティンカー・トムといった個性的で優秀なエージェントたちが、ゲリラ的な工作活動によって文字通り命懸けの戦いを続けており、Fallout 4における第3の勢力として極めて重要な役割を果たします。</p>
`,
        kanso: "「フリーダム・トレイル（自由への道）を辿った先にある、地下の秘密結社のアジト」という、これ以上ないほどアメリカ独立戦争とスパイ要素を美しく絡み合わせた素晴らしい設計の本部。初めて暗号（R-A-I-L-R-O-A-D）を回して隠し扉が開いた瞬間のワクワク感は、FO4をプレイした全員の記憶に残っているはずです。"
    },
    {
        title: "Trinity Tower",
        titleJa: "トリニティ・タワー",
        slug: "trinity-tower",
        appearance: "Fallout 4",
        wikiSlug: "Trinity_Tower",
        mainImg: "TrinityTower-Fallout4.jpg",
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "超高層ビル"],
            ["所在地", "バックベイ地域（ボストン中心部）"],
            ["統治者", "フィスト"],
        ],
        body: `
<h2>概要</h2>
<p>トリニティ・タワー（Trinity Tower）は、ボストンの中心にそびえ立つ、連邦でも屈指の高さを誇る巨大な高層ビル。現在は無数のスーパーミュータントたちによって各フロアが完全に制圧・要塞化されています。</p>

<h2>詳細</h2>
<p>このタワーの最上階には、指導者である知的なスーパーミュータント「フィスト（Fist）」が陣取っており、彼は「人間の捕虜を殺して食うのではなく、シェイクスピアのような文学を教えることで自分に知恵を授けさせる」という歪んだ理由のために、ラジオ俳優のレックス・グッドマンを拉致して檻に監禁していました。<br>それに同情してレックスを助けようとした（人間の文化に興味を持った）ミュータントの「ストロング（Strong）」もまた、裏切り者として同じ檻に「ミルク（人間の強さの源と勘違いしている）」を探す夢を抱いたまま投獄されています。</p>
<p>主人公は彼らの救難ラジオを聴いてタワーを延々と上り詰め、数百人のミュータントを皆殺しにして二人を檻から解放した後、備え付けの「窓拭き用ゴンドラ」に乗って、足元の大群から降り注ぐ銃弾を浴びながら地上へと脱出（降下）するド派手なアクションミッションを体験します。</p>
`,
        kanso: "「ミュータントだらけの超高層ビルを頂上まで制圧し、ゴンドラで銃撃戦をしながら脱出する」という、どこのダイ・ハードかと突っ込みたくなるような最高にアクション映画しているクエスト「Curtain Call」の舞台。ここで助け出したストロングは非常に人気の高い武闘派コンパニオンとなり、「ストロング、ミルク見つける」という名言を残します。"
    },
    {
        title: "General Atomics Galleria",
        titleJa: "ゼネラル・アトミックス・ガレリア",
        slug: "general-atomics-galleria",
        appearance: "Fallout 4",
        wikiSlug: "General_Atomics_Galleria",
        mainImg: "General_Atomics_Galleria.jpg",
        infoRows: [
            ["種族", "ロボット (Mr.ハンディ / ガッツィー等)"],
            ["区分", "戦前の商業モール"],
            ["所在地", "連邦北部"],
            ["統治者", "総支配人（Director）"],
        ],
        body: `
<h2>概要</h2>
<p>ゼネラル・アトミックス・ガレリア（General Atomics Galleria）は、ロボット製造企業であるゼネラル・アトミックス・インターナショナル社が大戦の直前にオープンさせる予定だった、「全ての店員がロボット」という夢のショッピングモールの跡地です。</p>

<h2>詳細</h2>
<p>モールにはボウリング場、カフェ、服屋、ボクシングジムなど様々な施設が存在していますが、大戦から200年が経過した現在、ロボットたちのプログラムは完全に狂い切っています。<br>例えば、カフェの店員ロボットはコーヒーを注文した客を「不審者」として焼き殺そうとし、ボクシングジムのロボットは「スポーツ」の定義が狂って客に真剣勝負（殺し合い）を挑んでくるという、まさにFalloutらしい「ポンコツAIの恐怖と笑い」が詰め込まれた施設となっています。</p>
<p>主人公はモールの中心にある展望台へ向かい、メインフレームを管理している「総支配人（The Director）」のシステムにアクセスして、彼らに「グランドオープン（大戦争直前のまま止まっていた正式開店）」を命じることで、彼らを正常（あるいはある程度安全）な商人に戻すというクエストに挑めます。</p>
`,
        kanso: "狂ったロボットたちが接客と称して全力で殺しにくる、最高にブラックな遊園地。ボウリング場のロボットは「利用規約」を盾に襲ってきたりと、戦前の企業のいい加減なプログラム仕様を全身で堪能できる素晴らしいロケーションです。モール全体のシステムを再起動できたときの何とも言えない達成感がたまりません。"
    },
    {
        title: "Cambridge Polymer Labs",
        titleJa: "ケンブリッジポリマー研究所",
        slug: "cambridge-polymer-labs",
        appearance: "Fallout 4",
        wikiSlug: "Cambridge_Polymer_Labs",
        mainImg: "Cambridge_Polymer_Factory.png",
        infoRows: [
            ["種族", "フェラル・グール（元研究員）"],
            ["区分", "戦前の兵器研究施設"],
            ["所在地", "ケンブリッジ南西部"],
            ["特記事項", "パワーアーマーの装甲開発実験室"],
        ],
        body: `
<h2>概要</h2>
<p>ケンブリッジポリマー研究所（Cambridge Polymer Labs）は、戦前にアメリカ軍と契約して「パワーアーマーの超耐久性ポリマー装甲（圧電核皮膜）」の開発を行っていた企業の研究施設です。</p>

<h2>詳細</h2>
<p>主人公がここに入ると、出迎えのロボット「モリー」から「新入りの研究員」として扱われ、クリーンルームの中に閉じ込められてしまいます。<br>大戦争が勃発した2077年当時、この施設の所長は「実験を完了させて軍への納品実績を作らなければ、我々は助からない（軍に見捨てられる）」と狂信的なまでに思い込み、研究員たちを意図的に施設内に閉じ込めて「実験を完成させるまでここから出さない」という凶行に走りました。</p>
<p>閉じ込められた研究員たちは脱出と反乱を試みましたが、施設の放射能漏れ（あるいは兵器実験の失敗）によって全滅し、現在は全員がフェラル・グール化してクリーンルームを徘徊しています。主人公は彼らが成し遂げられなかった実験を素材を使って完了させる（＝ユニークなパワーアーマーの胴体パーツを作成する）か、あるいはセキュリティをハッキングして脱出するかを選択することになります。</p>
`,
        kanso: "「世界が核開発で滅んでいるのに、ドアをロックして会社の納品作業（実験）を部下に強要する上司」という、戦前アメリカの資本主義の病理を凝縮したようなホラー＆パズルダンジョン。研究員たちの絶望の脱出計画が記されたターミナルを読みながら、自分自身がその実験を完成させて（皮肉にも彼らの数百年越しのノルマを達成して）脱出する構成が見事です。"
    },
    {
        title: "Hardware Town",
        titleJa: "ハードウェア・タウン",
        slug: "hardware-town",
        appearance: "Fallout 4",
        wikiSlug: "Hardware_Town",
        mainImg: "Hardwaretown.png",
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "巨大な資材販売店"],
            ["所在地", "ダイアモンドシティの南"],
            ["関連", "アボットへのペンキ納品"],
        ],
        body: `
<h2>概要</h2>
<p>ハードウェア・タウン（Hardware Town）は、戦前はペンキや工具、DIY用品を売っていた巨大なホームセンターの廃墟です。現在はレイダー集団の巧妙な罠の拠点として利用されています。</p>

<h2>詳細</h2>
<p>プレイヤーがダイアモンドシティで「アボット」という老人から「『緑色』のペンキを取ってきてくれ」と依頼されることで向かうことになる主要な目的地です。<br>この建物の入り口付近では、一人の入植者の女性がレイダーに襲われているような激しい銃撃音と「助けて！」という声が聞こえます。正義感に駆られて中に飛び込むと、それは完全にレイダーたちの「お芝居（罠）」であり、店内に身を隠した大量のレイダーたちから一斉に十字砲火を浴びるという、非常に巧妙な待ち伏せに遭います。</p>
<p>罠を破って店内を制圧すると、彼らが罠の演技プランを話し合っていた音声記録や、「今回はカモがよく釣れるな」と笑い合っている様子を知ることができます。奥へ進むと、アボットの望んでいた「黄色」と「青色」のペンキを混ぜ合わせて自作するためのミキサー設備が置かれています。</p>
`,
        kanso: "レイダーたちが「助けてー！あっ（迫真）」というあまりにも下手くそな猿芝居をしてプレイヤーを誘い込むという、Falloutらしい笑いと戦闘の緊張感が入り混じった名物ロケーション。ペンキの色を自分で混ぜて作らなければならないという、ちょっとしたDIYパズル要素も印象に強く残ります。"
    },
    {
        title: "Easy City Downs",
        titleJa: "イージーシティ・ダウンズ",
        slug: "easy-city-downs",
        appearance: "Fallout 4",
        wikiSlug: "Easy_City_Downs",
        mainImg: "EasyCityDowns-Fallout4.jpg",
        infoRows: [
            ["種族", "トリガーマン / レイダー"],
            ["区分", "競馬場（ドッグレース場）跡地"],
            ["所在地", "連邦東部沿岸"],
            ["特記事項", "ロボットの違法レース場"],
        ],
        body: `
<h2>概要</h2>
<p>イージーシティ・ダウンズ（Easy City Downs）は、戦前は馬や犬のレースが行われていたと思われるトラック競技場の廃墟。現在はギャング（トリガーマン）とレイダーが大勢集まり、「改造したロボットたちのレース」でギャンブルを行っている一種の興行場です。</p>

<h2>詳細</h2>
<p>コース上には、プロテクトロンやアイボット、果ては巨大なセントリーボットに至るまで、様々な改造ロボットがギャングたちの賭けの対象として延々と周回レースを繰り広げています。<br>実況席には「アーニー」と呼ばれる男が陣取り、「さぁ第３コーナーを回った！」などとマイクで熱のこもった実況放送をスタジアムに響かせています。</p>
<p>プレイヤーが近づくと、興行の邪魔をされたギャングたちが一斉に襲いかかってきます。面白いことに、プレイヤーが実況席にあるターミナルをハッキングしてロボットたちのプログラムを書き換えると、レースをしていたロボットたちが突如として客（ギャング）のレイダーたちへ無差別にミサイルやビームを放って大暴走を始めるという、最高にカオティックな光景を演出することができます。</p>
`,
        kanso: "「廃墟になったスタジアムで、マフィアたちがロボットを走らせて賭けをしている」という狂った退廃美が最高のロケーション。真面目にレイダーたちと銃撃戦をするのも良いですが、こっそり端末をいじってロボットたちを大暴れさせて、悲鳴と爆発の中でアーニーが発狂するのを眺めるのがFO4の醍醐味の一つです。"
    },
    {
        title: "Pickman Gallery",
        titleJa: "ピックマン・ギャラリー",
        slug: "pickman-gallery",
        appearance: "Fallout 4",
        wikiSlug: "Pickman_Gallery",
        mainImg: "Pickman_Gallery.jpg",
        infoRows: [
            ["種族", "人間 (ピックマン) / レイダー"],
            ["区分", "不気味な美術館 / 地下トンネル"],
            ["所在地", "ノースエンド（オールド・ノース・チャーチ付近）"],
            ["関連", "ピックマンのブレード"],
        ],
        body: `
<h2>概要</h2>
<p>ピックマン・ギャラリー（Pickman Gallery）は、ボストン市街地にある、狂気のシリアルキラー「ピックマン」の私邸兼、彼のおぞましい「芸術作品」が展示されたギャラリーです。</p>

<h2>詳細</h2>
<p>一見するときれいな歴史的家屋ですが、中に入ると、切り刻まれた大量のレイダーの死体と、それらの『血』を使って描かれた、悪夢のように真っ赤でグロテスクな絵画が壁一面に飾られています。ピックマンは「レイダー（悪党）を虐殺し、彼らの血で芸術を作ること」に生きがいを感じているサイコパスでした。</p>
<p>この館の地下には広大な下水道トンネルが広がっており、逆襲にやってきた血に飢えたレイダーの大群に占拠されています。<br>最深部では、ついにレイダーたちに追い詰められて殺されそうになっているピックマン本人が登場します。主人公は彼を「狂人としてレイダーごと始末する」か、「レイダーの血肉を肥料にする芸術家として助ける」かを選択でき、彼を助けた場合は協力の証として、異常な切れ味と出血効果を誇るユニーク近接武器「ピックマンのブレード」をプレゼントされます。</p>
`,
        kanso: "「レイダーよりも残虐にレイダーを殺す、紳士的なシリアルキラー」というピックマンの特異なキャラクター性が光る大人気ロケーション。彼のアトリエの凄惨なグラフィック表現はFallout 4の中でもトップクラスの恐怖ですが、彼がくれる「ピックマンのブレード」がステルス近接ビルドにおいて最強クラスの武器であるため、絶対に一度は訪れることになります。"
    },
    {
        title: "Museum of Witchcraft",
        titleJa: "サレム魔女博物館",
        slug: "museum-of-witchcraft",
        appearance: "Fallout 4",
        wikiSlug: "Museum_of_Witchcraft",
        mainImg: "MuseumofWitchcraft-Fallout4.jpg",
        infoRows: [
            ["種族", "サベージ・デスクロー"],
            ["区分", "博物館 / ホラーダンジョン"],
            ["所在地", "サレムの街の中心部"],
            ["関連", "無傷のデスクローの卵"],
        ],
        body: `
<h2>概要</h2>
<p>サレム魔女博物館（Museum of Witchcraft）は、歴史的な「サレム魔女裁判」の史実を基にした戦前の非常に不気味な展示博物館。連邦北東部の端に位置します。</p>

<h2>詳細</h2>
<p>ダイアモンドシティの衛兵たちが「絶対に近づくな」「中から恐ろしい音が聞こえる」と噂している危険地帯です。<br>主人公が建物の外に転がっている惨殺されたガンナーの死体からホロテープを拾うと、クエスト「The Devil's Due」が開始されます。<br>建物の正門は強固にロックされており、地下の搬入口からしか入れません。内部は真っ暗で、一階を探索している間ずっと、2階の床（プレイヤーの頭上）をギシギシと歩き回る『何か巨大な生き物』の重低音と、床板の隙間からこちらを覗き込むような土煙がパラパラと落ちてくるという、極めて純度の高いホラーゲームのような演出が連続します。</p>
<p>勇気を振り絞って2階へ上がると、そこにはガンナーたちを皆殺しにした巨大な「サベージ・デスクロー」が待ち構えており、主人公は薄暗い展示室の中でこの最強の捕食者とのデスマッチを強いられます。彼女が怒っていた理由は「ガンナーに奪われた自分の卵」を取り返すためであり、討伐後（あるいはステルスでやり過ごした後）、プレイヤーはその「デスクローの卵」を巣に返しに行くか、料理人に売り飛ばすかを決めることになります。</p>
`,
        kanso: "Fallout 4において最も「本格的なホラー演出」に特化した伝説のロケーション。頭上から聞こえる重い足音と、床の穴から突然引きずり込まれるガンナーの死体など、エイリアンのようなパニックホラーの文脈をデスクローで完全に再現した見事なダンジョン設計は、全てのプレイヤーに強烈なトラウマを与えました。"
    },
    {
        title: "Cabot House",
        titleJa: "カボット邸（キャボット邸）",
        slug: "cabot-house",
        appearance: "Fallout 4",
        wikiSlug: "Cabot_House",
        mainImg: "Cabot_House.jpg",
        infoRows: [
            ["種族", "人間 (カボット家・セントリーボット)"],
            ["区分", "戦前の豪邸"],
            ["所在地", "ビーコン・ヒルの中心部"],
            ["関連", "謎の血清 (不老不死)"],
        ],
        body: `
<h2>概要</h2>
<p>カボット邸（Cabot House）は、ボストン市街地にある、周囲の崩壊した風景とは完全に異質なほど「戦前の美しい姿を保ったまま」の豪華な邸宅です。厳重なロックとセントリーボットによって守られています。</p>

<h2>詳細</h2>
<p>傭兵のエドワードを通してのみ内部へ招待されるこの屋敷には、ジャック・カボットとその母、そして妹の3人の家族が暮らしています。彼らの驚くべき秘密は、彼らが「2077年の大戦争よりずっと前、1800年代からずっと生きてその姿を保ち続けている」という不老不死の一家であるという事実です。<br>その秘密は、ジャックの父親であるロレンゾが古代の遺跡から持ち帰った「エイリアンのアーティファクト（王冠）」が生成する特殊な力（血清）によるものであり、ジャックは狂ってしまった父親を精神病院（パーソンズ州立精神病院）の地下に幽閉し、父親の身体から定期的に「血清」を抽出し続けることで家族の若さを保っていました。</p>
<p>主人公はこの「永遠の命」にまつわる歪んだ家族関係に介入し、彼らをレイダーから守るか、あるいは狂った父親を解放して彼らを罰するかの決断をオカルトチックなクエストラインの中で下すことになります。</p>
`,
        kanso: "Falloutの世界に突然クトゥルフ神話やインディ・ジョーンズのような「狂気と古代のオカルト兵器」の概念を持ち込んだ、シリーズでも群を抜いて特異で魅力的な設定を持つクエストの要所。屋敷の中に無造作に置かれている戦前の綺麗な家具や「ゼータガン」など、カボット家の異常性がひしひしと伝わってくるミステリアスな豪邸です。"
    },
    {
        title: "Salem",
        titleJa: "サレム",
        slug: "salem",
        appearance: "Fallout 4",
        wikiSlug: "Salem",
        mainImg: "Salem-Fallout4.jpg",
        infoRows: [
            ["種族", "マイアルーク / ルーク (バーニー・ルーク)"],
            ["区分", "沿岸部の街の廃墟"],
            ["所在地", "連邦北東部（サンクチュアリから最も遠いエリアの一つ）"],
            ["特記事項", "ルーク・ファミリー・ハウス"],
        ],
        body: `
<h2>概要</h2>
<p>サレム（Salem）は、現実世界では「魔女狩り」の歴史で有名な実在の村であり、Fallout 4においては連邦の北東の端に位置する海沿いの集落跡地です。</p>

<h2>詳細</h2>
<p>かつてはそれなりの住人がいた形跡がありますが、現在は海から押し寄せる夥しい数のマイアルークの巣窟と化しており、人間はほぼ全滅しています。<br>唯一の例外が、街の中心の屋敷（ルーク・ファミリー・ハウス）の屋上に防衛陣地を築き、たった一人で狂ったようにマイアルークの大群に向かってライフルを撃ち続けている老人「バーニー・ルーク」です。<br>主人公が彼に協力し、街の周囲に点在する複数のタレットを修理してマイアルークを撃退すると、バーニーは安堵し、彼が地下に隠し持っているユニークなスナイパーライフル「レバ2（Reba II）」の保管庫の鍵を譲ってくれます（あるいは殺して奪うこともできます）。</p>
<p>街全体がひっそりとした海霧に包まれ、魔女博物館の存在も相まって非常に不気味な雰囲気を醸し出している、本作の端境のロケーションです。</p>
`,
        kanso: "「たった一人で街中を占拠する怪物たちと戦い続けるマッドでタフな老人」という、世紀末のロマンを体現したバーニー爺さんに出会える場所。ここで手に入る彼の手入れされた愛銃「レバ2」はマイアルークを倒すための特効効果がついており、それを彼と一緒にぶっ放す共闘体験は非常に印象深いです。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        // Dynamic extension based on mainImg definition
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
