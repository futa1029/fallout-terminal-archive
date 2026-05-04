const fs = require('fs');

const file = 'f:/Fallout/_scripts/_batch_gen_fo3_chars2.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Inject gallery processing logic
const galleryProcessingLogic = `
        let htmlInfoRows = '';
        for (let row of article.infoRows) {
            htmlInfoRows += \`<div class="infobox-row"><span class="infobox-label">\${row[0]}</span><span>\${row[1]}</span></div>\\n\`;
        }

        let galleryHtml = '';
        if (article.gallery && article.gallery.length > 0) {
            galleryHtml += '<h2>ギャラリー</h2>\\n<div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 30px; justify-content: center;">\\n';
            for (let g of article.gallery) {
                // Try to get actual Fandom URL or use direct URL
                let gUrl = g.url.startsWith('http') ? g.url : await getImageUrl(g.url);
                if (!gUrl) continue;
                
                let gExt = '.jpg';
                let gExtMatch = gUrl.match(/\\.([a-zA-Z0-9]+)(?:[\\?\\/]|$)/);
                if (gExtMatch) gExt = '.' + gExtMatch[1];
                
                // Keep the filename clean for slug saving
                let cleanCaption = g.caption.replace(/[^a-zA-Z0-9]/g, '_');
                let localGPath = \`images/note_extracted/\${article.slug}/gallery_\${cleanCaption}\${gExt}\`;
                let localGAbsPath = \`F:/Fallout/\${localGPath}\`;
                
                if (!fs.existsSync(localGAbsPath)) {
                    await downloadImage(gUrl, localGAbsPath);
                    await sleep(500); // polite delay
                }
                
                galleryHtml += \`  <div class="gallery-item" style="flex: 1 1 200px; max-width: 300px; text-align: center;">\\n\`;
                galleryHtml += \`    <img src="\${localGPath}" alt="\${g.caption}" style="width:100%; border:1px solid #444; border-radius:3px;">\\n\`;
                galleryHtml += \`    <p class="note-figcaption" style="margin-top:5px; font-size:0.85em;">\${g.caption}</p>\\n\`;
                galleryHtml += \`  </div>\\n\`;
            }
            galleryHtml += '</div>\\n\\n';
        }
`;

// Replace the old infoRows processing with the new one+gallery
content = content.replace(
    /let htmlInfoRows = '';\s*for \(let row of article\.infoRows\) {\s*htmlInfoRows \+= `<div class="infobox-row"><span class="infobox-label">\$\{row\[0\]\}<\/span><span>\$\{row\[1\]\}<\/span><\/div>\\n`;\s*}/,
    galleryProcessingLogic
);

// Inject galleryHtml into the template replacement
// Just before <h2>感想</h2>
content = content.replace(
    /.replace\(\/<h2>感想<\/h2>\\n<div class="quote-box"/, // wait, our script currently uses `<h2>感想</h2>\n<div class="quote-box"`
    `.replace(/<h2>感想<\\/h2>\\n<div class="quote-box"/, galleryHtml + '<h2>感想</h2>\\n<div class="quote-box"'`
);

// 2. Rewrite Madison Li's object
const newMadisonObject = `    {
        title: "Madison Li",
        titleJa: "マジソン・リー",
        slug: "madison-li",
        appearance: "Fallout 3, Fallout 4",
        wikiSlug: "Madison_Li",
        mainImg: imgData["madison-li"][0],
        gallery: [
            { url: "DrLiFO4.jpg", caption: "FO4" },
            { url: "Madison_Li.jpg", caption: "FO3" },
            { url: "https://static.wikia.nocookie.net/fallout/images/4/41/FO4_Madison_Li_Concept_Art.png/revision/latest?cb=20231221081540", caption: "Art" }
        ],
        infoRows: [
            ["種族", "人間"],
            ["所属", "プロジェクト・ピュアリティ / リベット・シティ / インスティチュート"],
            ["役職", "主任研究員 / 高度システム部門長"],
            ["関連", "ジェームズ / ブライアン・ヴァージル"],
        ],
        body: \`
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
\`,
        kanso: "FO4のB.O.S.ルートにおける彼女の説得イベントは、彼女の『科学者としての倫理観』と『ファーザーへの決定的な不信感』が爆発する非常に劇的なシーンです。FO3の時代からずっと『愛する人に裏切られ続け、自分が居場所だと思った組織から逃げ出さざるを得ない』という数奇な人生を送っており、非常にリアルで人間臭い魅力に溢れた人物と言えます。"
    },`;

// Find the Madison Li object and replace it entirely
let startIndex = content.indexOf('    {\n        title: "Madison Li",');
if (startIndex === -1) {
    console.log("Could not find Madison Li object. Did the script change format?");
} else {
    // Find the end of the object
    let endIndex = content.indexOf('\n    },', startIndex);
    let afterMadison = content.substring(endIndex + 7);
    let beforeMadison = content.substring(0, startIndex);
    
    // Check if galleryHtml is already injected in replace block
    if (!content.includes("galleryHtml + '<h2>感想</h2>'")) {
        // Find `.replace(/<h2>感想<\/h2>\\n<div class="quote-box"/`
        let replaceIndex = beforeMadison.indexOf('.replace(/<h2>感想<\\/h2>\\n<div class="quote-box"');
        if (replaceIndex === -1) {
            // Need to fix the injection
            beforeMadison = beforeMadison.replace(
                /(\.replace\(\/<h2>感想<\/h2>\\n<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var\\(--accent-color\\);">.*?<\\/div>\/s, `)<h2>感想<\/h2>\\n<div class="quote-box"/,
                "$1${galleryHtml}<h2>感想</h2>\\n<div class=\"quote-box\""
            );
        }
    }
    
    fs.writeFileSync(file, beforeMadison + newMadisonObject + afterMadison, 'utf8');
}
