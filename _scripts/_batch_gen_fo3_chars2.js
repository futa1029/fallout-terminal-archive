// _batch_gen_fo3_chars2.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo3_char2.json', 'utf8'));
// Manual overrides for difficult images
imgData["jericho"] = ["Jericho.jpg"];
imgData["mayor-maccready"] = ["MacCready_FO3.jpg", "Mayor_MacCready.jpg"];
imgData["madison-li"] = ["Madison_Li.jpg"]; // Force FO3 image
imgData["arthur-maxson"] = ["Arthur_Maxson.jpg"]; // Force FO3 image

const articles = [
    {
        title: "Butch DeLoria",
        titleJa: "ブッチ・デロリア",
        slug: "butch-deloria",
        appearance: "Fallout 3",
        wikiSlug: "Butch_DeLoria",
        mainImg: imgData["butch-deloria"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "トンネルスネーク / Vault 101"],
            ["役職", "ギャングのリーダー / 床屋"],
            ["関連", "幼馴染 / 飛び出しナイフ"],
        ],
        body: `\n
<h2>概要</h2>
<p>マジソン・リー博士 (Dr. Madison Li) は、キャピタル・ウェイストランドのリベット・シティ（Fallout 3）および連邦のインスティチュート（Fallout 4）におけるトップクラスの科学者であり、環境浄化プロジェクト（Project Purity）ならびに高度システム部門（Advanced Systems）の責任者を務めた傑出した人物です。彼女はシリーズを通して、キャピタルの水源浄化、リバティ・プライムの修復、そしてインスティチュートの命運を左右する核融合炉の開発など、アメリカ東海岸における歴史的な科学的ブレイクスルーに大きく関与しています。</p>

<h2>背景</h2>
<h3>若き日とプロジェクト・ピュアリティ (2250年代〜2258年)</h3>
<p>マジソン・リーは2229年に生まれました。若く優秀な科学者であった彼女は、キャピタル・ウェイストランドの放射能汚染された水を完全に浄化するという壮大な計画「プロジェクト・ピュアリティ」を主導するチームに入り、ジェームズとキャサリンの強力な協力者となりました。</p>
<p>計画がジェファーソン記念館で本格的に始動する中、リー博士はジェームズに対して同僚以上の強い尊敬と愛情を抱くようになりましたが、彼にはキャサリンという優れた妻がいたため、その想いは内に秘められていました。しかし2258年、キャサリンは主人公の出産中に合併症により命を落とします。愛する妻を失い、赤子の安全な環境を最優先に考えたジェームズは、完成間近であったプロジェクトを突如放棄し、Vault 101へと姿を消しました。長年の夢と努力が水泡に帰したと感じたリー博士は、彼に対して強い裏切りを覚え、怒りと絶望と共に初期メンバーのチームを去ることになります。</p>

<h3>リベット・シティにおける主任科学者 (2258年〜2277年)</h3>
<p>プロジェクト崩壊後、リー博士はキャピタル最大の人類居住区である座礁した空母「リベット・シティ（Rivet City）」の科学ラボに到着します。彼女はそこで自身の科学的知識を活用し、水耕栽培の運営や、船の電力を支える小型原子炉の保守などを行い、居住区の発展に直接的に貢献しました。</p>
<p>この過程で、リベット・シティの創設者の一人であり天才科学者であったピンカートンを政治的に追い出し、自身が科学部門のトップに立ちました。これ以降、彼女は「キャピタル全体を救う」という無謀な夢ではなく、「目の前の人々を現実に助ける」という堅実な科学に長年没頭していました。また、この時期にDr.ジマーによる脱走アンドロイド（A3-21）捜索などにも一部知識を提供するなど、連邦から来たインスティチュートの科学者とも接点がありました。</p>

<div class="note-figure"><img src="images/note_extracted/nb2ecec7eada6_img_2.png" alt="出産を手伝うマジソン" width="620"><div class="note-figcaption">主人公の出産を手伝うマジソン (FO3)</div></div>

<h3>ジェームズとの再会とエンクレイヴの強襲</h3>
<p>2277年、Vault 101から失踪したジェームズを探して、成長した主人公がリベット・シティの彼女のラボを訪れます。彼女は当初、ジェームズへの過去の怒りから主人公を冷たくあしらいますが、最終的には主人公に協力して手がかりを提供します。その後、ジェームズ本人がリベット・シティに到達し、彼女に対して再度プロジェクト・ピュアリティへの協力を懇願しました。</p>
<p>かつての怒りは完全に消えてはいなかったものの、リー博士は再びジェームズへの信頼を取り戻し、仲間と共にジェファーソン記念館へと戻ります。しかし、プロジェクトの再稼働直前、オータム大佐率いるエンクレイヴ軍が記念館を強襲。ジェームズはオータム大佐らから施設と主人公を守るため、自らの命を犠牲にしました。リー博士は絶望と悲しみのなか、主人公らと共に地下水路を通ってB.O.S.の防衛拠点である「要塞（Citadel）」へと決死の脱出を果たしました。</p>

<h3>リバティ・プライムとキャピタルからの決別</h3>
<p>要塞への到着後、彼女は恩讐を越えてエルダー・リオンズが率いるB.O.S.に協力し、長年動かせなかった巨大兵器「リバティ・プライム」の修復作業を主導します。彼女の天才的な頭脳により長年の動力供給システムの問題が解決され、結果としてエンクレイヴ撃破の決定的な切り札となりました。</p>
<p>エンクレイヴ撃破後、彼女は浄化プロジェクトの完成に取り組みますが、B.O.S.が大量の純水を「自分たちの戦力を高める配給と政治的ツール」として利用していく軍事的な姿勢に、彼女は強い不信感と嫌悪感を抱くようになります。軍国主義的な彼らの元では真の純粋な科学は成し得ないと悟った彼女は、キャピタル・ウェイストランドをひっそりと離れ、かつて接点を持った「高度な科学力を持つ組織」の情報を頼りに北の連邦（The Commonwealth）へと旅立ちました。</p>

<h3>インスティチュートと高度システム部門 (2287年)</h3>
<p>連邦に到達した彼女は、地下に存在する巨大研究施設「インスティチュート」に見出され、彼らの理念に共感して組織に加わりました。彼女の開発力は瞬く間に評価され、彼女は「高度システム部門（Advanced Systems）」の責任者という最高の地位にまで上り詰めました。</p>
<p>インスティチュートでは、彼女はテレポーテーション・ネットワークの維持や兵器の開発、そして組織の究極の目標である「フェーズ3」計画（新型ベリリウム撹拌機を用いた自立型核融合炉の起動）を主導していました。しかし指導者ファーザーによる秘密主義に対し次第に不満を募らせ、とりわけ同僚のブライアン・ヴァージル博士の謎の死（失踪）がファーザーの粛清ではないかと疑い、閉鎖区画の調査を行っていました。</p>

<h3>唯一の生存者との邂逅</h3>
<p>2287年、インスティチュート内部で主人公（唯一の生存者）と出会います。インスティチュートルートの場合、彼女は主人公の協力によってベリリウム撹拌機を回収し、巨大な核融合炉を起動させ、最後はB.O.S.東海岸支部の壊滅に科学的知見を提供します。</p>
<p>一方、B.O.S.ルートを進む場合、エルダー・マクソン（かつて彼女が要塞で会った従者の少年）の命令により、主人公はインスティチュートへ潜入し彼女を連れ戻す任務（Liberty Reprimed）を受けます。主人公が彼女を説得し、閉鎖されたFEVラボから「ヴァージルへの処刑宣告ホロテープ」を見つけ出してファーザーの非道を告発すると、彼女は悲しみと怒りとともにインスティチュートを裏切ることを決意します。</p>
<p>再びB.O.S.の保護下に戻った彼女は、より強烈な軍事組織へと変貌したB.O.S.の元で皮肉にも再び「リバティ・プライムを修復し、第二の故郷であるインスティチュートを焼き払う」ための最高技術責任者として働く運命となるのです。</p>
\n`,
        kanso: "「トンネルスネーク・ルールズ！（トンネルスネーク最強！）」というキャッチフレーズでおなじみ。彼を見捨てて母親を虫の餌食にすることもできますし、外の世界に引き連れて『本物のヤバい奴ら（レイダーたち）』を見せつけてやることもできる、FO3における愛憎入り混じる名キャラクターです。"
    },
    {
        title: "Jericho",
        titleJa: "ジェリコ",
        slug: "jericho",
        appearance: "Fallout 3",
        wikiSlug: "Jericho_(Fallout_3)",
        mainImg: imgData["jericho"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "メガトン"],
            ["役職", "元レイダーの用心棒"],
            ["関連", "悪人プレイの相棒 / アサルトライフル"],
        ],
        body: `
<h2>概要</h2>
<p>ジェリコ（Jericho）は、メガトンの町をうろついている老齢の元レイダー。彼に話しかけると常に文句を言い、皮肉を吐き捨てるガラの悪い男ですが、条件を満たせば非常に頼りになるコンパニオンとなります。</p>

<h2>詳細</h2>
<p>彼はかつてキャピタル・ウェイストランドを荒らしまわっていた極悪非道なレイダーの一員でしたが、年齢から来る体力の衰えにより引退し、メガトンに定住して（渋々ながら）町の用心棒的な役割を果たしています。<br>彼は今の平和で退屈な生活にウンザリしており、「外の世界でまた暴れまわりたい」という血生臭い衝動を燻らせています。</p>
<p>主人公の性格（カルマ）が「悪（Evil）」である場合に限り、1000キャップを支払うことで彼を雇うことができます。<br>戦闘では中国軍アサルトライフルを巧みに操り、善人や罪のないNPCを襲撃する際にも一切の躊躇なく弾丸を浴びせる、「悪人プレイ」においては最高の相棒となります。</p>
`,
        kanso: "FO3において「悪人」でプレイし始めたプレイヤーが最初にお世話になる頼もしいお爺ちゃん。善人だと絶対に仲間になってくれないため、彼を雇うためにわざと人の物を盗んだり、モイラに悪態をついたりして「カルマ調整」をした運び屋も多いことでしょう。"
    },
    {
        title: "Clover",
        titleJa: "クローバー",
        slug: "clover",
        appearance: "Fallout 3",
        wikiSlug: "Clover",
        mainImg: imgData["clover"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "パラダイス・フォールズ"],
            ["役職", "ユーロジー・ジョーンズの奴隷兼愛人"],
            ["関連", "首輪 / 悪人路線のコンパニオン"],
        ],
        body: `
<h2>概要</h2>
<p>クローバー（Clover）は、奴隷商人たちの拠点である「パラダイス・フォールズ」のボス、ユーロジー・ジョーンズの下で奴隷として飼われている女性です。コンパニオンとして同行させることができます。</p>

<h2>詳細</h2>
<p>彼女は元々は一般人でしたが、奴隷商人に捕らえられた後、過酷な洗脳とストックホルム症候群により、「自分はユーロジーの愛人であり、彼を愛している」と完全に盲信し、精神が崩壊している痛ましい状態にあります。<br>主人公のカルマが「悪（Evil）」である場合のみ、ユーロジーから1000キャップ（交渉で値引き可能）で彼女を「買い取る」ことができます。</p>
<p>所有者が主人公に移ると、今度は主人公に対して異常なほどの愛情と絶対的な忠誠を示すようになります。<br>戦闘では初期装備として中国軍将校の剣を振り回し、狂ったように敵に斬りかかっていく勇敢（あるいはクレイジー）な近接アタッカーとして活躍します。</p>
`,
        kanso: "奴隷商人から「人間を買う」という、Falloutの倫理観の底が抜けたシステムを象徴するコンパニオン。彼女の首の爆弾付きの首輪を外してあげることはシステム上不可能であり、パラダイス・フォールズの闇の深さを実感させられます。"
    },
    {
        title: "Star Paladin Cross",
        titleJa: "スターパラディン・クロス",
        slug: "star-paladin-cross",
        appearance: "Fallout 3",
        wikiSlug: "Cross", // Star Paladin Cross
        mainImg: imgData["star-paladin-cross"][0],
        infoRows: [
            ["種族", "人間 (サイボーグ)"],
            ["所属", "B.O.S."],
            ["役職", "スターパラディン / エルダーの護衛"],
            ["関連", "スーパーミュータント討伐 / サイボーグ技術"],
        ],
        body: `
<h2>概要</h2>
<p>スターパラディン・クロス（Star Paladin Cross）は、B.O.S.の最高指導部である「要塞」で、エルダー・リオンズの個人的な護衛を務めている最強クラスの女戦士（パラディン）です。</p>

<h2>詳細</h2>
<p>彼女は主人公の父、ジェームズとは古くからの知り合いであり、「ジェームズに命を救われた」という過去を持っています。また、彼女の肉体は過酷な戦闘での欠損を補うため、多数の高度なサイボーグ技術によって機械化（人工臓器など）されており、通常の人間を大きく超える戦闘能力を持っています。<br>主人公のカルマが「善（Good）」である場合、父親への恩返しとして、そして正義の旅路を支えるために自ら同行を申し出てくれます。</p>
<p>初期武器として高火力の「スーパースレッジ」やレーザーピストルを装備しており、その高い耐久力と相まって、生身のコンパニオンとしては全キャラの中でトップクラスの防御性能と継戦能力を誇ります。</p>
`,
        kanso: "主人公の父親ジェームズに対して深い恩義と尊敬の念を示してくれる、非常に頼もしいB.O.S.の重鎮。悪人プレイでのジェリコが序盤の壁とするなら、彼女は善人プレイの最高到達点の一人です。スーパースレッジで巨大な敵を次々と粉砕していく姿は圧巻の一言。"
    },
    {
        title: "Dogmeat",
        titleJa: "ドッグミート (FO3)",
        slug: "dogmeat-fo3",
        appearance: "Fallout 3",
        wikiSlug: "Dogmeat_(Fallout_3)",
        mainImg: imgData["dogmeat"][0],
        infoRows: [
            ["種族", "犬 (オーストラリアン・キャトル・ドッグ)"],
            ["所属", "ジャンクヤード (かつてはレイダーの飼い犬)"],
            ["役職", "アイドル / アイテム探し名人"],
            ["関連", "パピーズ！ (Puppies!) / 最高の相棒"],
        ],
        body: `
<h2>概要</h2>
<p>ドッグミート（Dogmeat）は、シリーズの伝統である「犬のコンパニオン」であり、廃墟のジャンクヤードで前の主人（レイダーに殺された男）の亡骸を護りながらレイダー達に立ち向かっていた勇敢な野犬です。</p>

<h2>詳細</h2>
<p>カルマに関係なく無条件で仲間にすることができ、戦闘時は勇敢に噛みついて敵の注意を引きつけ、非戦闘時には「弾薬、武器、薬品を探してきて」と命令すると、どこからともなく貴重なアイテムを探し当てて咥えてきてくれるという非常に便利な能力を持っています。</p>
<p>DLC「Broken Steel」を導入することで習得可能となる特殊なPerk『Puppies!（パピーズ！）』を取得していると、万が一ドッグミートが戦闘で命を落としても、「ドッグミートの子供（姿や能力は完全に同じ）」がVault 101の入口でプレイヤーを待っているようになり、実質的に無限に残機を持つ不滅の存在となります。<br>（※なお、DLC『Broken Steel』環境下では彼のレベル上限が撤廃され、プレイヤーのレベルに比例してHPが1万を超えるという、ベヒモスすらタイマンで噛み殺す『キャピタル最強の生物』へと変貌します）。</p>
`,
        kanso: "FO4のジャーマン・シェパードとは一味違う、ワイルドな雑種の魅力を持つ犬。Broken Steel導入後の彼のHPスケーリングは明らかにバグレベルの調整ミスなのですが、「絶対に死なない頼もしすぎる犬」として逆にユーザーから愛される結果となりました。"
    },
    {
        title: "Mayor MacCready",
        titleJa: "マクレディ市長 (幼少期)",
        slug: "mayor-maccready",
        appearance: "Fallout 3",
        wikiSlug: "Robert_Joseph_MacCready",
        mainImg: imgData["mayor-maccready"][0],
        infoRows: [
            ["種族", "人間 (子供)"],
            ["所属", "リトル・ランプライト"],
            ["役職", "市長"],
            ["関連", "マンゴ / (のちのFO4コンパニオン)"],
        ],
        body: `
<h2>概要</h2>
<p>マクレディ（Mayor MacCready / Robert Joseph MacCready）は、大人（マンゴ）が一切存在せず、「子供しかいない巨大な地下洞窟の町」である『リトル・ランプライト』を取り仕切る、生意気で口の悪い少年市長です。</p>

<h2>詳細</h2>
<p>リトル・ランプライトは、戦前に遠足で洞窟を訪れていた子供たちが、核戦争の業火から生き延びて築き上げた集落です。<br>「16歳になった者は『大人（マンゴ）』とみなされ、ビッグタウンという危険な別の集落へ追放される」という徹底した掟が存在し、彼はまだ10歳そこそこの子供でありながら、大人に対して強烈な嫌悪感と警戒心を抱いています。</p>
<p>主人公が、Vault 87の奥深くへ続く秘密の入り口を通るためにリトル・ランプライトを訪れると、マクレディはライフルの銃口を突きつけて厳しい入場審査を行います。<br>Speechのスキルの成否、あるいは「Child at Heart（子供の心）」のPerkを持っているかどうかで、彼との会話の面白さが劇的に変化します。</p>
`,
        kanso: "「口の減らないクソガキ」の代表格ですが、10歳にして市長を務め、武装してミュータントの脅威から子供たちを守り続けているという事実は驚異的です。……彼がのちに立派なスナイパーとして成長し、キャピタルを出て連邦（Fallout 4）で主人公の相棒になるという展開は、シリーズの深い歴史を感じさせます。"
    },
    {
        title: "Madison Li",
        titleJa: "マジソン・リー",
        slug: "madison-li",
        appearance: "Fallout 3, Fallout 4",
        wikiSlug: "Madison_Li",
        mainImg: imgData["madison-li"][0],
        gallery: [
            { url: "Madison_li_concourse.jpg", caption: "インスティチュート (FO4)" },
            { url: "FO3_Madison_Li_endslide.jpg", caption: "エンディングスライド (FO3)" },
            { url: "FoS_Madison_Li.png", caption: "Fallout Shelter" }
        ],
        infoRows: [
            ["種族", "人間"],
            ["所属", "プロジェクト・ピュアリティ / リベット・シティ / インスティチュート"],
            ["役職", "主任研究員 / 高度システム部門長"],
            ["関連", "ジェームズ / ブライアン・ヴァージル"],
        ],
        body: `
<h2>概要</h2>
<p>マジソン・リー博士 (Dr. Madison Li) は、キャピタル・ウェイストランドのリベット・シティ（Fallout 3）および連邦の最先端研究施設インスティチュート（Fallout 4）におけるトップクラスの天才科学者です。気難しく直情的な性格ですが、彼女のその比類なき科学的才能は、キャピタルの水源浄化、要塞のリバティ・プライム起動、インスティチュートのフェーズ3（核融合炉の稼働）など、シリーズの歴史的なターニングポイントで常に中核的な役割を果たしてきました。</p>

<h2>生い立ちと背景</h2>
<h3>若き日とプロジェクト・ピュアリティ (2250年代)</h3>
<p>2229年生まれの彼女は、若い頃から卓越した頭脳の持ち主でした。キャピタルの放射性物質で汚染された水を完全に浄化するというジェームズの壮大な夢に共感した彼女は「プロジェクト・ピュアリティ」の初期メンバーとなり、全霊を傾けてこれに貢献しました。</p>
<p>彼女は同僚であるジェームズに尊敬以上の強い愛情を抱いていましたが、彼には妻キャサリンがいたため決して表に出すことはありませんでした。しかし2258年、キャサリンが主人公の出産中に亡くなり、ジェームズが子育てを理由に全てを投げ出してVault 101へ逃亡したことで、完成間近のプロジェクトは頓挫。リー博士は自身の献身を裏切られたという強い怒りと絶望を抱えて彼と決別します。</p>

<h3>リベット・シティにおける主任科学者</h3>
<p>その後、彼女はキャピタル最大の人類居住区「リベット・シティ」に到着し、自身の実用的な科学知識で水耕栽培や小型原子炉の開発を支援し、居住区を大いに発展させました。この際、創立メンバーであった偏屈な天才科学者ピンカートンを政治的な手段で追い落とし、自身が科学ラボの実権を握りました。</p>
<p>主人公がリベット・シティを訪れた際、Dr.ジマーによる「脱走したアンドロイド（A3-21 / ハークネス）の捜索（The Replicated Man）」クエストにおいて、彼女は主人公に「部品の解析結果」や「ピンカートンなら顔や記憶をいじれる」という重要情報を提供してくれます。彼女は連邦のインスティチュートの高度な科学力について、この時からある程度の認識を持っていました。</p>

<div class="note-figure"><img src="images/note_extracted/nb2ecec7eada6_img_2.png" alt="出産を手伝うマジソン" width="620"><div class="note-figcaption">主人公の出産を手伝うマジソン (FO3)</div></div>

<h3>ジェームズとの再会とエンクレイヴの強襲</h3>
<p>2277年、Vaultから脱走したジェームズを追って成長した主人公が彼女の前に現れます。最初は過去の怒りから冷淡な態度をとりますが、最終的には彼に協力します。その後ジェームズ本人が現れ再稼働を懇願されたことで、彼女は再び信頼を取り戻しジェファーソン記念館へと戻ります。</p>
<p>しかし再稼働の直前、エンクレイヴのオータム大佐らが強襲。ジェームズは自らを犠牲にして施設を守り、リー博士は絶望のなか主人公たちと共にタフト・トンネルを決死の覚悟で脱出し、B.O.S.の「要塞」へと逃げ延びました。</p>

<h3>リバティ・プライムとキャピタルからの決別</h3>
<p>要塞において、彼女はB.O.S.が長年持て余していた戦前の巨大ロボット「リバティ・プライム」の電力供給機構の問題を天才的な発想で解決させ、エンクレイヴ撃破の立役者となります。</p>
<p>しかしエンクレイヴ掃討後、エルダー・リオンズらB.O.S.が浄化施設を軍事制圧し、純水を「自分たちの政治的・軍事的な配給ツール」として利用していく姿勢に彼女は強い嫌悪感を抱き、彼らの元を去りました。より高度で純粋な科学を求めて、彼女は単身で北の連邦を目指します。</p>

<h2>インスティチュートと高度システム部門 (Fallout 4)</h2>
<p>連邦へ辿り着いた彼女はインスティチュートに保護され、やがてその突出した才能で「高度システム部門（Advanced Systems）」の責任者（Director）へと昇進します。彼女はインスティチュートの命運を握る「フェーズ3（ベリリウム撹拌機を用いた自立型核融合炉の稼働）」の主任として極めて重要な役割を担っていました。</p>
<p>しかし、指導者ファーザーの強権的で秘密主義の体制、そして何よりも自身の最良の同僚であったブライアン・ヴァージル博士の「失踪と不自然な死亡アナウンス」に対し、彼女は強い不信感を募らせていました。</p>

<h3>主人公との邂逅と対立する運命</h3>
<p>2287年、インスティチュート内に潜入した主人公（唯一の生存者）とは様々な形で絡むことになります。</p>

<p><b>インスティチュートルートの場合：</b><br>
彼女は主人公と共に「マス・フュージョン・ビル」の計画を完遂し、自身の最高傑作とも言える新型核融合炉を起動させてインスティチュートをエネルギーの呪縛から解放させます。最終的に主人公へ「インスティチュートは連邦に希望を与える」と語り、組織の中核としてB.O.S.の壊滅に尽力します（皮肉なことに、自身がかつて手がけたリバティ・プライムを破壊するウイルスの開発にも関与します）。</p>

<p><b>B.O.S.ルート（Liberty Reprimed）の場合：</b><br>
エルダーとなったマクソンから「リバティ・プライム再起動には彼女の頭脳が不可欠だ」と厳命された主人公は、彼女を連れ戻すために説得を試みます。しかし彼女は「私はここで重要な研究をしており、B.O.S.のような軍事組織には二度と戻らない」と頑なに拒否します。<br>主人公が彼女の疑惑に付け込み、閉鎖されたFEV研究所（F.E.V.ラボ）に潜入して「ファーザーによるヴァージルへの処刑宣告（または非道な実験内容）のホロテープ」を入手して彼女に突きつけると、事実を知った彼女は絶望と怒りに震え、インスティチュートを裏切ることを決意します。<br>
B.O.S.のもとへ帰還した彼女は、皮肉にも「かつて自分が嫌悪して逃げ出したB.O.S.の軍事力のためにリバティ・プライムを再び修復し、第二の故郷であるインスティチュートを焼き払う」ための最高技術責任者として、軍の野望に手を血で染める過酷な運命を歩むことになります。</p>
`,
        kanso: "FO4のB.O.S.ルートにおける彼女の説得イベントは、彼女の『科学者としての倫理観』と『ファーザーへの決定的な不信感』が爆発する非常に劇的なシーンです。FO3の時代からずっと『愛する人に裏切られ続け、自分が居場所だと思った組織から逃げ出さざるを得ない』という数奇な人生を送っており、非常にリアルで人間臭い魅力に溢れた人物と言えます。"
    },
    {
        title: "Arthur Maxson",
        titleJa: "アーサー・マクソン (少年期)",
        slug: "arthur-maxson",
        appearance: "Fallout 3",
        wikiSlug: "Arthur_Maxson",
        mainImg: imgData["arthur-maxson"][0],
        infoRows: [
            ["種族", "人間 (子供)"],
            ["所属", "B.O.S. (東海岸)"],
            ["役職", "従者 (スクワイア)"],
            ["関連", "B.O.S.創設者の血統 / (のちのFO4エルダー)"],
        ],
        body: `
<h2>概要</h2>
<p>アーサー・マクソン（Arthur Maxson）は、B.O.S.の拠点「要塞」の中で、サラ・リオンズに従者（スクワイア）として仕えている10歳のあどけない金髪の少年です。</p>

<h2>詳細</h2>
<p>彼は実はただの子供ではなく、B.O.S.という組織を創設した伝説の軍人「ハイエルダー・ロジャー・マクソン」の直系の「最後の血族」という、非常に尊い血筋を持ったサラブレッドです。<br>西海岸の過酷な権力闘争から命を守るため、比較的安全で温厚なエルダー・リオンズの庇護下である東海岸の要塞へと保護のために預けられていました。</p>
<p>FO3の時点では、彼はサラ・リオンズのような立派な戦士になりたいと憧れを抱いており、主人公に対しても「すごい！ミュータントを倒したんだって！？」と無邪気に目を輝かせる気の良い男の子として描かれています。<br>主人公にお使い（酒やタバコなど）をねだったり、端末にポエムのようなものを残していたりと、可愛らしい一面が確認できます。</p>
`,
        kanso: "この無邪気で心優しい少年が、10年後（Fallout 4）にはエルダー・サラ・リオンズの謎の戦死と組織の崩壊という修羅場をくぐり抜け、キャピタル・ウェイストランドを武力で統一し、巨大な飛行船で連邦に降下してくる『冷酷なる狂信の覇王（エルダー・マクソン）』に豹変するとは、一体誰が予想できたでしょうか。"
    },
    {
        title: "Flak",
        titleJa: "フラック",
        slug: "flak",
        appearance: "Fallout 3",
        wikiSlug: "Flak",
        mainImg: imgData["flak"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "リベット・シティ (フラック＆シュラプネル)"],
            ["役職", "武器商人"],
            ["関連", "最強の武器屋 / 奴隷商人からの誘拐対象"],
        ],
        body: `
<h2>概要</h2>
<p>フラック（Flak）は、リベット・シティ市場にある武器屋『フラック＆シュラプネル』の共同経営者の一人。キャピタル・ウェイストランドにおいて最も品揃えが豊富で、大量の弾薬を取り扱っている有能な商人です。</p>

<h2>詳細</h2>
<p>相棒のシュラプネルと共に、常に強力な重火器を調達し、居住地を守るための武器を売りさばいています。<br>しかし彼自身については、奴隷商人の拠点パラダイス・フォールズからの「VIP要人の誘拐クエスト（Strictly Business）」のターゲットの一人として非常に有名です。<br>主人公が奴隷商人に与したルートでは、メスメトロン（洗脳兵器）を使って彼を白痴状態にし、爆弾付きの首輪をはめ込んで奴隷商人へ売り飛ばすという悪逆非道なクエストが存在します。</p>
`,
        kanso: "キャピタルで最もお世話になる最高の武器屋。彼を奴隷としてパラダイスフォールズへ売り飛ばしてしまうと、相棒のシュラプネルが時折「フラックを取り戻すため」に完全武装でメガトンや荒野を単身で放浪し始めるという奇妙な挙動を起こす現象が知られています。"
    },
    {
        title: "Shrapnel",
        titleJa: "シュラプネル",
        slug: "shrapnel",
        appearance: "Fallout 3",
        wikiSlug: "Shrapnel",
        mainImg: imgData["shrapnel"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "リベット・シティ (フラック＆シュラプネル)"],
            ["役職", "武器商人"],
            ["関連", "フラックの相棒 / バグ放浪"],
        ],
        body: `
<h2>概要</h2>
<p>シュラプネル（Shrapnel）は、リベット・シティの武器屋『フラック＆シュラプネル』のもう一人の経営者です。</p>

<h2>詳細</h2>
<p>相棒のフラックと交代制で店番をしており、彼もまた大量の火器やMini Nukeなどの希少な弾薬を豊富に取り揃えています。<br>彼はゲームシステムの『エッセンシャル（不死属性）』フラグが特殊な状態で設定されており、フラックがメガトンなどの別の場所に移動（または奴隷として誘拐）した場合、相棒を追ってなぜか一人で重装備のままウェイストランドを徒歩で横断し始めることがあります。</p>
<p>その際、不死属性である彼はデスクローやスーパーミュータント・ベヒモスといった最悪のバケモノ共に囲まれても、ロケットランチャーやアサルトライフルを乱射して全員を単身で皆殺しにしてしまうという、「キャピタル最強の荒野の放浪者」として恐れられています。</p>
`,
        kanso: "「気づいたらなぜかメガトンの前でデスクローを一掃しているリベット・シティの武器屋」という、FO3の愛すべきシステムバグの象徴的な被害者（加害者？）。彼の放浪中は彼からいつでも武器が買えるため、「移動要塞の生きた行商人」として非常に頼りになります。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        let imgUrl = null;
        let ext = '.jpg';
        
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
                     let url = await getImageUrl(article.mainImg.replace(/\.jpe?g$/, '.png'));
                     if (url) { imgUrl = url; ext = '.png'; }
                }
            } 
            if (!imgUrl) {
                // Secondary fallback attempt if array is empty or name is slightly off
                if(article.slug === 'mayor-maccready') {
                    imgUrl = await getImageUrl('Mayor_MacCready.jpg');
                }
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
        
        let galleryHtml = '';
        if (article.gallery && article.gallery.length > 0) {
            galleryHtml += '<h2>ギャラリー</h2>\n<div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 30px; justify-content: center;">\n';
            for (let g of article.gallery) {
                let gUrl = g.url.startsWith('http') ? g.url : await getImageUrl(g.url);
                if (!gUrl) {
                    console.log(`Warning: Failed to resolve gallery image: ${g.url}`);
                    continue;
                }
                
                let gExt = '.jpg';
                let gExtMatch = gUrl.match(/\.([a-zA-Z0-9]+)(?:[\?\/]|$)/);
                if (gExtMatch) gExt = '.' + gExtMatch[1];
                
                let cleanCaption = g.caption.replace(/[^a-zA-Z0-9]/g, '_');
                let fileIdx = g.url.substring(0, 10).replace(/[^a-zA-Z0-9]/g, '');
                let localGPath = `images/note_extracted/${article.slug}/gallery_${cleanCaption}_${fileIdx}${gExt}`;
                let localGAbsPath = path.join('F:/Fallout', localGPath);
                
                if (!fs.existsSync(localGAbsPath)) {
                    await downloadImage(gUrl, localGAbsPath);
                    await sleep(500);
                }
                
                galleryHtml += `  <div class="gallery-item" style="flex: 1 1 200px; max-width: 300px; text-align: center;">\n`;
                if(g.url.startsWith('http') && !fs.existsSync(localGAbsPath)) {
                   // Fallback to hotlinking if download failed
                   galleryHtml += `    <img src="${g.url}" alt="${g.caption}" style="width:100%; border:1px solid #444; border-radius:3px;">\n`;
                } else {
                   galleryHtml += `    <img src="${localGPath}" alt="${g.caption}" style="width:100%; border:1px solid #444; border-radius:3px;">\n`;
                }
                galleryHtml += `    <p class="note-figcaption" style="margin-top:5px; font-size:0.85em;">${g.caption}</p>\n`;
                galleryHtml += `  </div>\n`;
            }
            galleryHtml += '</div>\n\n';
        }
        
        let html = tmpl
            .replace(/<title>.*?<\/title>/, `<title>${article.title} | Overseer Mohi's Terminal</title>`)
            .replace(/<h3 style="margin-top:0;text-align:center;">.*?<\/h3>/, `<h3 style="margin-top:0;text-align:center;">${article.title}</h3>`)
            .replace(/<img src="images\/note_extracted\/.*?alt=".*?">/, `<img src="${localRelPath}" alt="${article.title}">`)
            .replace(/<div class="infobox-row">.*?<\/div>\s*(?=<\/aside>)/s, htmlInfoRows)
            .replace(/<h1>.*?(?=<div class="quote-box")/s, `<h1>${article.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${article.titleJa}</span></h1>\n${article.body}\n\n`)
            // Quotes replacing using regex:
            .replace(/<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var\(--accent-color\);">.*?<\/div>/s, `${galleryHtml}<h2>感想</h2>\n<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var(--accent-color);"><p class="quote-text">${article.kanso}</p></div>`)
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
