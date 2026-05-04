const fs = require('fs');
const path = require('path');
const https = require('https');

const API_BASE = 'https://fallout.fandom.com/api.php?action=query&titles=Amata_Almodovar&prop=imageinfo&iiprop=url&format=json&generator=images&gimlimit=500';

async function fetchImages() {
    return new Promise((resolve, reject) => {
        https.get(API_BASE, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const result = JSON.parse(data);
                const urls = [];
                for (let k in result.query.pages) {
                    const pages = result.query.pages[k];
                    if (pages.imageinfo && pages.imageinfo.length > 0) {
                        urls.push(pages.imageinfo[0].url);
                    }
                }
                resolve(urls);
            });
        }).on('error', reject);
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', err => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function main() {
    const slug = 'amata';
    const targetDir = path.join('f:/Fallout/images/note_extracted', slug);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Amata Almodovar | Overseer Mohi's Terminal</title>
    <!-- Open Graph / Discord Embed -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Overseer Mohi's Terminal">
    <meta property="og:title" content="Amata Almodovar">
    <meta property="og:description" content="アマタ・アルモドバルのFalloutロア記事。Overseer Mohi's Terminalで読む。">
    <meta property="og:image" content="https://www.fallout-jp.com/images/note_extracted/amata/Amata_Esc.jpg">
    <meta property="og:url" content="https://www.fallout-jp.com/amata.html">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Amata Almodovar | Overseer Mohi's Terminal">
    <meta name="twitter:description" content="アマタ・アルモドバルのFalloutロア記事。Overseer Mohi's Terminalで読む。">
    <meta name="twitter:image" content="https://www.fallout-jp.com/images/note_extracted/amata/Amata_Esc.jpg">
    <!-- Supabase CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #0f0f0f;
            --text-color: #e0e0e0;
            --accent-color: #00ff00;
            --header-bg: #1a1a1a;
            --panel-bg: #222;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Noto Sans JP', sans-serif;
            margin: 0;
            line-height: 1.8;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 30px;
        }

        h1, h2, h3 {
            font-family: 'Share Tech Mono', 'Noto Sans JP', monospace;
            color: var(--accent-color);
            border-bottom: 1px solid var(--accent-color);
            padding-bottom: 5px;
        }

        h1 {
            font-size: 2.2em;
            margin-top: 0;
            line-height: 1.4;
        }

        .infobox {
            background: var(--panel-bg);
            border: 2px solid var(--accent-color);
            padding: 15px;
            height: fit-content;
            position: sticky;
            top: 20px;
            align-self: start;
        }

        .infobox img {
            width: 100%;
            border: 1px solid #555;
            margin-bottom: 15px;
        }

        .infobox-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 0.9em;
            border-bottom: 1px dashed #444;
        }

        .infobox-label {
            color: var(--accent-color);
            font-weight: bold;
        }

        .content {
            background: rgba(255, 255, 255, 0.05);
            padding: 30px;
            border-radius: 5px;
            font-size: 1em;
            line-height: 1.9;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        .quote-box {
            border-left: 4px solid var(--accent-color);
            padding-left: 20px;
            margin: 40px 0 20px 0;
            background: color-mix(in srgb, var(--accent-color) 10%, transparent);
            padding: 15px;
            border-radius: 0 5px 5px 0;
            line-height: 1.6;
        }

        .quote-box b {
            color: var(--accent-color);
            font-size: 1.05em;
        }

        .content a {
            color: var(--accent-color);
            text-decoration: none;
            border-bottom: 1px solid transparent;
        }

        .content a:hover {
            border-bottom: 1px solid var(--accent-color);
        }
        
        .auto-link {
            color: var(--accent-color) !important;
            font-weight: bold;
            text-decoration: none;
            border-bottom: 1px dashed var(--accent-color) !important;
            transition: all 0.2s;
            padding: 0 2px;
        }

        .auto-link:hover {
            background-color: color-mix(in srgb, var(--accent-color) 20%, transparent);
            border-bottom: 1px solid var(--accent-color) !important;
        }

        .note-figure {
            margin: 30px 0;
            text-align: center;
        }
        
        .note-figure blockquote {
            background-color: rgba(0, 0, 0, 0.4);
            border: 1px solid #4a90e2;
            border-left: 5px solid #4a90e2;
            padding: 20px;
            margin: 0;
            border-radius: 4px;
            color: #dcdcdc;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
            font-family: 'Share Tech Mono', 'Noto Sans JP', monospace;
            text-align: left;
        }

        .note-box {
            background-color: rgba(0, 0, 0, 0.4);
            border: 1px solid #4a90e2;
            border-left: 5px solid #4a90e2;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
            color: #dcdcdc;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
            font-family: 'Share Tech Mono', 'Noto Sans JP', monospace;
            text-align: left;
        }

        .holotape-box {
            background-color: rgba(0, 0, 0, 0.4);
            border: 1px solid #e67e22;
            border-left: 5px solid #e67e22;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
            color: #dcdcdc;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
            font-family: 'Share Tech Mono', 'Noto Sans JP', monospace;
            text-align: left;
        }

        .content img {
            max-width: 100%;
            height: auto;
            border: 1px solid #444;
            display: block;
            margin: 0 auto 10px auto;
        }

        .image-caption {
            text-align: center;
            font-size: 0.9em;
            color: #888;
            margin-bottom: 20px;
            font-style: italic;
        }

        .action-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .back-link {
            display: inline-block;
            color: var(--accent-color);
            text-decoration: none;
            border: 1px solid var(--accent-color);
            padding: 8px 15px;
            font-family: 'Share Tech Mono', monospace;
            transition: all 0.2s;
        }

        .back-link:hover {
            background: var(--accent-color);
            color: var(--bg-color);
        }

        .like-button {
            background: transparent;
            border: 1px solid var(--accent-color);
            color: var(--accent-color);
            padding: 8px 15px;
            font-size: 1.1em;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: 'Share Tech Mono', monospace;
            border-radius: 4px;
            transition: all 0.2s;
        }

        .like-button:hover {
            box-shadow: 0 0 10px var(--accent-color);
        }

        .like-button.liked {
            background: var(--accent-color);
            color: var(--bg-color);
        }

        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 30px;
        }

        .gallery img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border: 1px solid #444;
            cursor: zoom-in;
        }

        @media (max-width: 768px) {
            .container {
                grid-template-columns: 1fr;
                padding: 10px;
                gap: 20px;
            }
            .infobox {
                grid-row: 1;
                width: 100%;
                box-sizing: border-box;
            }
            .content {
                padding: 15px;
            }
            h1 {
                font-size: 1.6em;
            }
            .action-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }
        }

        .lightbox-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.92);
            z-index: 9999;
            cursor: zoom-out;
            justify-content: center;
            align-items: center;
        }
        .lightbox-overlay.active {
            display: flex;
        }
        .lightbox-overlay img {
            max-width: 95vw;
            max-height: 95vh;
            object-fit: contain;
            border: 2px solid var(--accent-color);
            box-shadow: 0 0 40px rgba(0, 255, 0, 0.3);
            border-radius: 4px;
        }
        .content img, .infobox img, .gallery-item img {
            cursor: zoom-in;
        }

        /* コメントセクション */
        .comments-section {
            margin-top: 40px;
            border-top: 2px solid var(--accent-color);
            padding-top: 20px;
        }
        .comments-title {
            font-family: 'Share Tech Mono', monospace;
            color: var(--accent-color);
            margin-bottom: 15px;
            font-size: 1em;
            border: none;
            padding: 0;
        }
        .comment-form {
            margin-bottom: 20px;
        }
        .comment-textarea {
            width: 100%;
            box-sizing: border-box;
            background: rgba(0,0,0,0.4);
            border: 1px solid var(--accent-color);
            color: var(--text-color);
            font-family: 'Noto Sans JP', sans-serif;
            font-size: 0.95em;
            padding: 10px;
            border-radius: 4px;
            resize: vertical;
            min-height: 70px;
            outline: none;
            transition: box-shadow 0.2s;
        }
        .comment-textarea:focus {
            box-shadow: 0 0 8px var(--accent-color);
        }
        .comment-form-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 6px;
        }
        .char-count {
            font-size: 0.8em;
            color: #888;
            font-family: 'Share Tech Mono', monospace;
        }
        .comment-submit-btn {
            background: transparent;
            border: 1px solid var(--accent-color);
            color: var(--accent-color);
            padding: 6px 16px;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.9em;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s;
        }
        .comment-submit-btn:hover, .comment-submit-btn:not(:disabled):hover {
            background: var(--accent-color);
            color: var(--bg-color);
        }
        .comment-submit-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .comment-msg {
            font-size: 0.85em;
            min-height: 1.2em;
            margin-top: 4px;
            font-family: 'Share Tech Mono', monospace;
        }
        .comments-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .comment-item {
            background: rgba(255,255,255,0.04);
            border-left: 3px solid var(--accent-color);
            padding: 10px 14px;
            border-radius: 0 4px 4px 0;
        }
        .comment-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }
        .comment-time {
            font-size: 0.78em;
            color: #666;
            font-family: 'Share Tech Mono', monospace;
        }
        .comment-body {
            font-size: 0.92em;
            line-height: 1.6;
            word-break: break-all;
        }
        .comment-delete-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1em;
            padding: 2px 6px;
            border-radius: 3px;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .comment-delete-btn:hover { opacity: 1; }
        .comment-empty, .comment-loading {
            color: #666;
            font-size: 0.85em;
            font-family: 'Share Tech Mono', monospace;
            padding: 10px 0;
        }
    </style>
</head>
<body data-article-category="人物" data-article-appearance="Fallout 3">
    <div class="container">
        <!-- Sidebar -->
        <aside class="infobox">
            <h3 style="margin-top:0; text-align:center;">Amata Almodovar</h3>
            <img src="images/note_extracted/amata/Amata_Esc.jpg" alt="Amata Almodovar">
            <div class="infobox-row"><span class="infobox-label">種族</span><span>人間</span></div>
            <div class="infobox-row"><span class="infobox-label">性別</span><span>女性</span></div>
            <div class="infobox-row"><span class="infobox-label">所属</span><span>Vault 101</span></div>
            <div class="infobox-row"><span class="infobox-label">役職</span><span>Vault居住者 / 監督官（選択による） / 主人公の親友</span></div>
            <div class="infobox-row"><span class="infobox-label">場所</span><span>Vault 101 / キャピタル・ウェイストランド</span></div>
            <div class="infobox-row"><span class="infobox-label">家族</span><span>アルフォンス・アルモドバル（父）</span></div>
        </aside>

        <!-- Main Content -->
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="amata" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Amata Almodovar<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">アマタ・アルモドバル</span></h1>

            <h2>概要</h2>
            <p>アマタ・アルモドバル（Amata Almodovar）は、Vault 101の居住者であり、監督官アルフォンス・アルモドバルの一人娘です。<br>Fallout 3における主要なキャラクターの一人であり、オーウェン・ライオンズ、エルダー・リオンズ、サラ・ライオンズと並び、作中で「とても良い」カルマを持つ数少ない人物です。</p>

            <h3>背景</h3>
            <p>主人公とおよそ同い年であり、主人公の父ジェームズが子連れでVaultに到着して以来、二人は共に育ちました。<br>『グログナック・ザ・バーバリアン』の話題から、幼くして母親を亡くし片親に育てられたという共通の境遇まで、様々なことを通じて二人は親交を深めました。<br>アマタは2歳の時に母親を亡くし、監督官である父親が男手一つで彼女を育ててきました。Vaultを導き孤立主義を維持するという重責は、彼女の父親への深い愛情にもかかわらず、徐々に二人の間に溝を作っていきました。</p>
            <img src="images/note_extracted/amata/Fo3_LQ_Diner.png" alt="主人公の誕生日パーティーでのアマタ">
            <div class="image-caption">主人公の誕生日パーティーでのアマタ</div>

            <p>何年もの時を経て、二人の絆は深い友情へと発展し、決して切っても切れない親友同士となりました。<br>アマタは主人公がVault 101の正式な市民となり、Pip-Boy 3000を受け取る10歳の誕生日（クエスト「Growing Up Fast」）を企画しました。父親である監督官は「適切な親としての支援」と日常業務の短い休憩許可を与えただけで、彼女は一人で装飾などの準備に奔走しました。<br>その背景には、アルフォンスが監督官としての立場を損なったり、自身の娘だけに特別な便宜を図っていると思われたくないという思惑がありました。また、主人公の父親の頑固で反抗的な性格も相まって、単に主人公のことを気に入っていなかったことも理由の一つでした。</p>
            <p>アマタは「監督官の娘」という立場を楽しんではおらず、他の居住者たちからより自立した存在に見られるために、自分で問題に対処することを好んでいました。<br>これにはブッチ・デロリア率いるトンネルスネークのような不良グループへの対処も含まれており、彼女は幼い頃から、父親の立場を利用しても村八分やそれ以上の悪影響を招くだけだと理解していました。</p>
            <p>この自立心は、アルフォンスの過干渉的な振る舞いによってさらに強まりました。<br>アルフォンスは成長するにつれ自分を遠ざけようとする娘に戸惑い、苛立っていました。彼女は父から教えられた美徳（忠実さ、誠実さ、献身、勤勉）を受け入れて監督官の目には立派な若い女性へと成長したものの、アマタは父親よりも「よそよそしく距離の遠い監督官」として彼を見るようになっていました。<br>そこには信頼の欠如が影を落としており、監督官は立場を悪用して彼女を有利にすることはなかったものの、10代になってもアマタの定期健診に同席するなど、彼女を監視するために自分の立場を利用していました。医師であるジェームズは、アマタが責任感のある立派な女性に成長しており、梅毒や妊娠のリスクなど微塵もないことを知っていたため、この状況を「悲しいことだ」と見なしていました。</p>

            <div class="note-box">
                <p><b>[Vault 101 医療データシステム] 患者ファイル: アマタ</b></p>
                <p>またしても、監督官はアマタの診察に立ち会うことを強要し、医師と患者の守秘義務を完全に無視している。彼が私を信用していないことは分かっている、ずっとそうだからだ。<br>しかし、彼が娘の診察に立ち会う本当の理由は、娘を信用していないからだと思う。それは馬鹿げていると同時に悲しいことだ。アマタは素晴らしい少女であり、彼女が妊娠や梅毒などの愚かな過ちを犯す可能性など、言及する価値もないほど低いのに。</p>
            </div>

            <img src="images/note_extracted/amata/Tunnel_Snakes.jpg" alt="手が付けられないトンネルスネークに絡まれるアマタ">
            <div class="image-caption">手が付けられないトンネルスネークに絡まれるアマタ</div>

            <p>アマタは、ブッチ・デロリア率いる、父親の暗黙の了解のもと結成された不良グループ「トンネルスネーク」のいじめの標的となりました。彼らは家族の繋がりを侮辱するだけでなく、彼女の体型をからかったり太っていると嘲笑するなど、陰湿な嫌がらせを行いました。<br>彼女の父親は彼女の置かれた状況やトンネルスネークとのいざこざをよく把握しており、トンネルスネークの存続を容認するかどうかの判断材料として、アマタへの嫌がらせを考慮していました。</p>
            
            <div class="note-box">
                <p><b>[Vault 101 監督官のターミナル] セキュリティ情報: アマタ</b></p>
                <p>もしブッチとあの革ジャンを着た不良どもがこれ以上アマタに付き纏うようなら、口うるさい教師に対処する以上の問題を突きつけてやる。<br>奴らの「おふざけ」がたまに役に立つことは認めざるを得ないが、徐々に手が付けられなくなってきている。犬が野生化したら処分しなければならない。次の話し合いでブッチにそのことを思い出させてやる必要があるな。</p>
                <br>
                <p><b>アマタについて</b></p>
                <p>私がアマタに心を開かせようとするたび、彼女は私をどんどん遠ざけようとする。私は彼女が幼い頃から、このVaultを今日ある姿にした美徳――忠実さ、誠実さ、献身、勤勉――を植え付けようとしてきた。<br>彼女は努力し、指導のもとに立派な女性へと成長した。それだけに彼女が私を遠ざけ続けるのは悲しいことだ。彼女は私を見るとき、文字通り孤独に――一人で！――赤ん坊の頃から育ててきた父親ではなく、監督官を見ているのだ。</p>
            </div>

            <p>アマタは父親の立場を利用することを拒んだため、主人公だけが彼女の唯一の心の支えでした。<br>G.O.A.T.（職業適性テスト）の結果、彼女は監視ルートに配属され、父親の後を継いで監督官になる道を歩むことになります。</p>

            <h3>ジェームズとその子供のVault脱出後</h3>
            <img src="images/note_extracted/amata/Amata_Esc.jpg" alt="Escape!でのアマタ">
            <div class="image-caption">クエスト「Escape!」でのアマタ</div>

            <p>彼女に機会は予想よりも早く訪れました。ジェームズが「プロジェクト・ピュリティ」を再始動させるためにVault 101を去った時、監督官は正気を失いVaultのセキュリティ部隊を解き放ちました。<br>すべてを懸けて、アマタは父親の10mmピストルを盗み出し、封鎖されたVaultの中を進んで主人公を起こし、Vaultからの脱出を手助けしました。<br>しかし、彼女はセキュリティに捕まり、父親の尋問を受けることになります。アルフォンスはオフィサー・マック（マック巡査）に彼女への暴行を指示しました。<br>※主人公がアマタからピストルを受け取ったかどうかによって、オフィサー・マックが死亡するかどうかの結末が変わります。</p>

            <img src="images/note_extracted/amata/Interrogation_of_Amata.jpg" alt="父親とマック巡査に尋問されるアマタ">
            <div class="image-caption">父親とマック巡査に尋問されるアマタ</div>

            <p>彼女は主人公によって解放され、彼らがVault 101からキャピタル・ウェイストランドの荒野へと脱出するのを見届けました。<br>アマタは自分が事態を収拾できるという自信を持っており、かつて父親の命令でジョナス・パーマーが殺害された時と同様に、「微笑んで、すべてが順調であるかのように装う」という古くからの対処法に頼るつもりでした。<br>しかし、彼女はそれが実現しないであろうことも理解していました。彼らの世代が教えられてきたことはすべて嘘であり、外の世界は人が住める環境だったからです。</p>

            <p>Vaultという小さく死にゆく世界から飛び出したいという彼女の以前からの願望と相まって、反乱の火種がくすぶり始めていました。<br>また、彼女の父親に対する感情によって事態は複雑になっていきました。アルフォンスは権力に狂った狂人かもしれませんが、それでも彼は彼女の父親であり、彼女に残された唯一の家族だったからです。</p>

            <h3>新たなる反乱</h3>
            <p>扉が再び封鎖された後、彼女は孤立主義がVaultの死を意味し、いずれ人口が先細り僅かな近親交配の生き残りだけになってしまうことに気づきました。<br>彼女のリーダーシップとカリスマ性、そして孤立主義への不満の高まりは、ジェームズと主人公の脱出事件の直後から「第2の危機」を引き起こしました。<br>アマタはVaultを開き外の世界での生活を築き始めることを最初に口にし、それがきっかけとなり、監督官はすべての反体制派を弾圧するようになりました。<br>予想通り、反乱を鎮圧しようとする試みはそれを激化させただけでした。</p>

            <p>アマタとエドウィン・ブロッチは反乱のリーダーとなり、Vaultを再び開くというアイデアのもとに若者や理想主義者たちを結集させました。かつてアマタの悩みの種だったトンネルスネークは運動の用心棒となり、Vaultの診療所と学校の教室を占拠しました。しかし彼らは決定的なミスとして物資保管室は制圧しておらず、そのため監督官は彼らを兵糧攻めにしようと目論みました。<br>エドウィン・ブロッチがVaultの扉を独断で開けようとして逮捕された後、アマタが単独で反乱軍のリーダーになりました。</p>

            <p>運動は強力なままで、以前はアマタに反発していた多くの人々も彼女の側につきました。そこにはスージー・マックも含まれており、彼女は脱出事件の後、人生に対する新たな見方を養いました。</p>

            <div class="note-box">
                <p><b>[Vault 101 監督官のターミナル] セキュリティ情報: 反乱軍 / アマタ</b></p>
                <p><b>反乱軍</b><br>我々のVaultに反乱軍の同盟が結成された。連中は、Vaultを外部の世界に再び開放するという、全くもって破滅的な目標に専心している。<br>アマタとエドウィン・ブロッチがこの集団のリーダーであり、あのバカげたトンネルスネークがその手先となり、他にも少数の若者や世間知らずの理想主義者が集まっている。<br>集団を孤立させ士気を封じ込める取り組みは順調に進んでいる。エドウィン・ブロッチは自らVaultのドアを開けようとした罪で投獄され、残るメンバーは古い診療所や学校の教室に閉じこもっている。<br>食料が減り続け、あの危険な「Mr.アンディー」が近くにいることで、彼らの士気は徐々に削がれていくだろう。そして最後には諦めて、再び我々の幸せな家族の中に迎え入れられるはずだ。</p>
                <br>
                <p><b>アマタ</b><br>アマタがVault内の反乱分子の黒幕だと知って、断腸の思いだ。<br>もし彼女がリーダーでなければ、連中の精神を叩き潰し、Vaultの歴史と実績ある孤立計画へと引き戻すのは簡単なことなのだから。<br>しかし、彼女が反乱の中心人物である以上、セキュリティ権限に任せて手荒な説得手段をとることは控えるべきだろう。私はあの夜の過ちを二度と繰り返すつもりはない。<br>Vaultにそんな余裕はないし、何より、娘をこれ以上私から遠ざけることなど耐えられない。</p>
                <p>様々なことがあったにも関わらず、私は彼女の生まれ持ったリーダーの素質をとても誇りに思っている。<br>彼女が間違いなく立ち直った時、監督官の後継者にふさわしい人物になると信じている。</p>
            </div>

            <p>アルフォンスはVaultを開放するというアイデアには恐れおののいていましたが、アマタの生まれ持ったリーダーシップの才能を誇りに思い、彼女を価値ある後継者と見ていました。<br>実際、彼女の存在によって暴力的な弾圧が防がれていました。彼はセキュリティ部隊にもう自分を完全にコントロールできていないことに気づかないまま、秩序回復のためのフリーハンドを与えてしまう過ちを犯すことを拒否したのです。<br>監督官へ対処するためには外部の助けが必要だと悟ったアマタは、主人公をVaultに呼び戻すために救援信号を設定しました。</p>

            <div class="holotape-box">
                <p><b>Vault 101 緊急周波数</b></p>
                <p>こちらVault-Tecによる自動緊急メッセージです。Vault 101より送信。メッセージ開始：<br>あなたが家を出てから随分経ったような気がするけど、あなたがまだ外のどこかにいることは分かっているわ。ただ、あなたがこのメッセージを聞けるくらい生き延びていることを祈るばかりよ。<br>あなたが出て行ってから、事態はさらに悪化した。私の父は権力に狂ってしまった。もしこれが聞こえているなら、父親探しを中断して、私の父を止める手助けをしてお願い。<br>ドアのパスワードを私の名前に変更したわ。もしこのメッセージを聞いていて、私を助ける気があるなら、覚えておいて。メッセージを繰り返します。</p>
            </div>

            <h3>プレイヤーキャラクターとの関わり</h3>
            <ul>
                <li><b>Growing Up Fast</b><br>2268年7月13日の主人公の10歳の誕生日パーティーを取り仕切り、無傷の『グログナック・ザ・バーバリアン』14巻をプレゼントします。</li>
                <li><b>Future Imperfect</b><br>2274年8月3日、主人公と一緒にG.O.A.T.を受けます。教室に入る前、彼女はトンネルスネークに絡まれます。ここでプレイヤーはクエスト解決の様々なアプローチを実験でき、カルマのシステムが紹介されます。</li>
                <li><b>Escape!</b><br>ジェームズがVaultから逃亡したというニュースと共に主人公を起こします。彼女は10mmピストルを提供し、主人公自身が逃げるための計画を概要として伝えます。<br>クエストの終盤、彼女は捕えられ父親たちから尋問を受けます。ここで銃彼女に預けていた場合、彼女はオフィサー・マックを殺害して別の部屋に逃げ込みます。</li>
                <li><b>Trouble on the Homefront</b><br>「The Waters of Life」以降にキャピタル・ウェイストランド内でVault 101の緊急救援無線が受信できるようになります。クエストの解決方法は多岐にわたり、アマタを新しい監督官にすることも可能です。Vaultをサボタージュする形でクエストを終了させアマタに伝えると、彼女は敵対します。また、ランダムエンカウント「アマタの運命（Amata's Fate）」が解放され、ウェイストランドでエンクレイヴ・ソルジャーに射殺されそうになっている彼女に遭遇する場合があります。</li>
            </ul>

            <img src="images/note_extracted/amata/FO3REAmatasFate.jpg" alt="エンクレイヴに助けを求めるアマタ">
            <div class="image-caption">外へ逃げ出し、エンクレイヴの兵士に助けを求めるアマタ（ランダムエンカウント）</div>

            <h2>名言</h2>
            <div class="quote-box">
                <p><b>「何事なの？私が監督官の娘だから何よ？だからって、ええ、もちろん特別な待遇なんて受けてないわよ！」</b></p>
                <p>-- <i style="color: #888;">Growing Up Fast</i></p>
            </div>

            <h2>舞台裏・メモ</h2>
            <ul>
                <li>『Fallout 2』と『Fallout: New Vegas』の開発者であるクリス・アヴェロンは、自身が「アマタもアンディーも大嫌いだから、最初から彼らを殺せないという事がFallout 3の不満点だ」と語っています。</li>
                <li>クエスト「Trouble on the Homefront」で監督官を殺害して、アマタにそれしか選択肢がなかったと納得させてクリアすると、彼女は「ごめんなさい。あなたはヒーローよ... だからここを去らなきゃいけないの。」という台詞を発します。これは『Fallout 1』のエンディングでVault 13の監督官がVaultの住人に言い放った言葉と全く同じです。</li>
            </ul>

            <h2>ギャラリー</h2>
            <div class="gallery">
                <div class="gallery-item"><img src="images/note_extracted/amata/Oversepic101.png" alt="幼少期のアマタと父親"><div class="image-caption">幼少期のアマタと父親</div></div>
                <div class="gallery-item"><img src="images/note_extracted/amata/Amata_GUF.jpg" alt="10歳の誕生日"><div class="image-caption">物語序盤、主人公の誕生日にて</div></div>
                <div class="gallery-item"><img src="images/note_extracted/amata/Amata_FI.jpg" alt="成長したアマタ"><div class="image-caption">成長したアマタ（G.O.A.T.の日にて）</div></div>
                <div class="gallery-item"><img src="images/note_extracted/amata/Amata2.jpg" alt="別れの挨拶"><div class="image-caption">Vaultの扉の前で別れを告げるアマタ</div></div>
                <div class="gallery-item"><img src="images/note_extracted/amata/FO3Vault106Amata.jpg" alt="Vault 106の幻覚"><div class="image-caption">Vault 106に現れるアマタの幻覚</div></div>
                <div class="gallery-item"><img src="images/note_extracted/amata/Vault_106_hallucination_Amata_running.jpg" alt="走り去る幻覚"><div class="image-caption">Vault 106の幻覚</div></div>
                <div class="gallery-item"><img src="images/note_extracted/amata/FO3PL_Amata_pond.png" alt="ポイントルックアウトでの幻覚"><div class="image-caption">DLC「Point Lookout」で現れる水死体</div></div>
                <div class="gallery-item"><img src="images/note_extracted/amata/FSO_UI_C_ShopIcon_Amata.jpg" alt="Fallout Shelter Online"><div class="image-caption">Fallout Shelter Onlineのアマタのカード</div></div>
            </div>

            <!-- 感想セクション -->
            <div class="quote-box">
                <b>感想</b><br><br>
                10歳の誕生日から物語の始まりまでずっと行動を共にしてきた、まさにFallout 3におけるヒロイン的な存在の一人ですよね。<br>
                父親に反発しつつも家族への愛を捨てきれなかった結果、Vaultの安定を何よりも優先しなければならない立場に立たされた彼女の苦悩は、ゲーム序盤から中盤にかけて深くプレイヤーの心に刺さります。<br>
                主人公の脱出を助けてくれたとても健気な存在……かと思いきや、後にVaultで彼女を助けた結末によっては、「あなたがいてはVaultの規律が乱れるから、二度と戻ってこないで頂戴」と冷たく言い放って主人公を追放するという、シリーズ屈指の「報われない切なさ」を叩きつけてくるキャラでもあります。<br>
                Vault 101の平穏を守るためには彼女自身が監督官になる必要があり、そのためには「平穏を乱す危険因子」である主人公を切り離さなければならなかったという、大人の階段を登ってしまった彼女の決断に、ウェイストランドの厳しさを教わったプレイヤーも多いのではないでしょうか。
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Fallout3</span>
                </div>
                
                <p>This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Amata_Almodovar" target="_blank" rel="noopener">Amata Almodovar</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p>&copy; Overseer Mohi's Terminal — Fallout Lore Archive</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>
            <div class="comments-section" id="comments-section">
                <!-- コメントセクションのHTMLは省略せずに以前のamata.htmlのものを復元 -->
                <h3 class="comments-title">&gt; COMMENTS</h3>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力 (最大100文字)..." oninput="updateCharCount()"></textarea>
                    <input type="text" id="hp_field" name="website" style="display:none;position:absolute;left:-9999px" tabindex="-1" autocomplete="off" aria-hidden="true">
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span> / 100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SEND ▶</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list" class="comments-list">
                    <div class="comment-loading">LOADING...</div>
                </div>
            </div>
        </main>
    </div>

    <!-- Lightbox Overlay -->
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')">
        <img id="lightbox-img" src="" alt="拡大画像">
    </div>

    <!-- Supabase Scripts -->
    <script>
        const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co';
        const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';
        const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

        async function toggleLike(btn) {
            const articleId = btn.getAttribute('data-article-id');
            let isLiked = localStorage.getItem(articleId + '_liked') === 'true';
            btn.disabled = true;

            if (isLiked) {
                isLiked = false;
                const { data, error } = await supabaseClient.rpc('decrement_like', { article_id_param: articleId });
                if (!error) {
                    localStorage.setItem(articleId + '_liked', isLiked);
                    updateLikeButton(btn, isLiked, data);
                }
            } else {
                isLiked = true;
                const { data, error } = await supabaseClient.rpc('increment_like', { article_id_param: articleId });
                if (!error) {
                    localStorage.setItem(articleId + '_liked', isLiked);
                    updateLikeButton(btn, isLiked, data);
                }
            }
            btn.disabled = false;
        }

        function updateLikeButton(btn, isLiked, count) {
            const heart = btn.querySelector('.heart');
            const countSpan = btn.querySelector('.like-count');
            if (isLiked) {
                btn.classList.add('liked');
                heart.textContent = '♥';
            } else {
                btn.classList.remove('liked');
                heart.textContent = '♡';
            }
            countSpan.textContent = count;
        }

        document.addEventListener('DOMContentLoaded', async () => {
            const btn = document.querySelector('.like-button');
            if (btn) {
                const articleId = btn.getAttribute('data-article-id');
                const isLiked = localStorage.getItem(articleId + '_liked') === 'true';
                const { data, error } = await supabaseClient
                    .from('likes')
                    .select('like_count')
                    .eq('article_id', articleId)
                    .single();

                let count = 0;
                if (!error && data) count = data.like_count;
                updateLikeButton(btn, isLiked, count);
            }
            await loadComments();
        });

        document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                const overlay = document.getElementById('lightbox');
                document.getElementById('lightbox-img').src = img.src;
                overlay.classList.add('active');
            });
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') document.getElementById('lightbox').classList.remove('active');
        });

        const _commentArticleId = (document.querySelector('[data-article-id]') || {}).getAttribute?.('data-article-id') || location.pathname.split('/').pop().replace('.html', '');
        const _commentArticleName = document.title.split('|')[0].trim();
        const _commentArticleUrl = location.pathname.split('/').pop();
        const ADMIN_TOKEN_KEY = 'fallout_admin_token';
        const ADMIN_PASSWORD = 'tq7jtq7j';
        const RATE_LIMIT_KEY = 'comment_last_posted';
        const RATE_LIMIT_SEC = 60;
        let _isAdminMode = false;

        function updateCharCount() {
            const len = document.getElementById('comment-input').value.length;
            const el = document.getElementById('char-count');
            if (el) {
                el.textContent = len;
                el.style.color = len > 90 ? '#ff6b6b' : 'var(--accent-color)';
            }
        }

        function relativeTime(isoStr) {
            const diff = (Date.now() - new Date(isoStr).getTime()) / 1000;
            if (diff < 60) return 'たった今';
            if (diff < 3600) return Math.floor(diff / 60) + '分前';
            if (diff < 86400) return Math.floor(diff / 3600) + '時間前';
            if (diff < 86400 * 7) return Math.floor(diff / 86400) + '日前';
            return new Date(isoStr).toLocaleDateString('ja-JP');
        }

        function renderComments(comments) {
            const list = document.getElementById('comments-list');
            if (!list) return;
            if (!comments || comments.length === 0) {
                list.innerHTML = '<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';
                return;
            }
            list.innerHTML = comments.map(c => \`
                <div class="comment-item" data-id="\${c.id}">
                    <div class="comment-meta">
                        <span class="comment-time">\${relativeTime(c.created_at)}</span>
                        \${_isAdminMode ? \`<button class="comment-delete-btn" title="完全削除" onclick="deleteComment('\${c.id}')">&#128465;</button><button class="comment-delete-btn" title="非表示(サイレント)" onclick="hideComment('\${c.id}')">&#128064;</button>\` : ''}
                    </div>
                    <div class="comment-body">\${escapeHtml(c.content)}</div>
                </div>
            \`).join('');
        }

        function escapeHtml(str) {
            return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        }

        async function loadComments() {
            const list = document.getElementById('comments-list');
            if (!list) return;
            const { data, error } = await supabaseClient
                .from('comments')
                .select('id, content, created_at')
                .eq('article_id', _commentArticleId)
                .order('created_at', { ascending: false })
                .limit(50);
            if (error) {
                list.innerHTML = '<div class="comment-empty">コメントを読み込めませんでした。</div>';
                return;
            }
            renderComments(data || []);
        }

        async function submitComment() {
            const input = document.getElementById('comment-input');
            const msg = document.getElementById('comment-msg');
            if (!input || !msg) return;

            const hp = document.getElementById('hp_field');
            if (hp && hp.value !== '') return;

            const content = input.value.trim();
            if (!content) { showCommentMsg('コメントを入力してください。', false); return; }
            if (content.length > 100) { showCommentMsg('100文字以内で入力してください。', false); return; }

            const NG_WORDS = [
                '広啄', 'http://', 'https://', 'LINE', 'DMして', '難民', 'ビッチ', '死ね',
                'クソ', 'アホ', 'ウザイ', 'メルマガ', 'discord.gg', 't.me', 'clickして'
            ];
            const lc = content.toLowerCase();
            if (NG_WORDS.some(w => lc.includes(w.toLowerCase()))) {
                showCommentMsg('不適切な表現が含まれているため投稿できません。', false);
                return;
            }

            const lastPosted = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0');
            const now = Date.now();
            if (now - lastPosted < RATE_LIMIT_SEC * 1000) {
                const remain = Math.ceil((RATE_LIMIT_SEC * 1000 - (now - lastPosted)) / 1000);
                showCommentMsg(\`あと\${remain}秒後に投稿できます。\`, false);
                return;
            }

            const btn = document.querySelector('.comment-submit-btn');
            if (btn) btn.disabled = true;
            const { error } = await supabaseClient.from('comments').insert({
                article_id: _commentArticleId,
                article_name: _commentArticleName,
                article_url: _commentArticleUrl,
                content: content
            });
            if (btn) btn.disabled = false;

            if (error) {
                showCommentMsg('投稿に失敗しました。', false);
                return;
            }
            localStorage.setItem(RATE_LIMIT_KEY, now.toString());
            input.value = '';
            updateCharCount();
            showCommentMsg('コメントを投稿しました！', true);
            await loadComments();
        }

        function showCommentMsg(text, ok) {
            const el = document.getElementById('comment-msg');
            if (!el) return;
            el.textContent = text;
            el.style.color = ok ? 'var(--accent-color)' : '#ff6b6b';
            setTimeout(() => { el.textContent = ''; }, 3000);
        }

        async function deleteComment(commentId) {
            if (!_isAdminMode) return;
            if (!confirm('このコメントを完全に削除しますか？(非表示にするならビルボードボタンを使ってください)')) return;
            const { error } = await supabaseClient.rpc('delete_comment_admin', {
                comment_id: commentId,
                admin_token: localStorage.getItem(ADMIN_TOKEN_KEY) || ''
            });
            if (error) { alert('削除失敗: ' + error.message); return; }
            await loadComments();
        }

        async function hideComment(commentId) {
            if (!_isAdminMode) return;
            if (!confirm('このコメントを非表示(サイレント)にしますか？投稿者には通知されません。')) return;
            const { error } = await supabaseClient.rpc('hide_comment_admin', {
                comment_id: commentId,
                admin_token: localStorage.getItem(ADMIN_TOKEN_KEY) || ''
            });
            if (error) { alert('非表示失敗: ' + error.message); return; }
            await loadComments();
        }

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                if (_isAdminMode) {
                    _isAdminMode = false;
                    localStorage.removeItem(ADMIN_TOKEN_KEY);
                    renderComments([]);
                    loadComments();
                    alert('管理者モードを終了しました。');
                    return;
                }
                const pw = prompt('管理者パスワードを入力してください:');
                if (!pw) return;
                if (pw === ADMIN_PASSWORD) {
                    _isAdminMode = true;
                    localStorage.setItem(ADMIN_TOKEN_KEY, pw);
                    loadComments();
                    alert('管理者モードに入りました。\\n🗑 = 完全削除 / 👁 = サイレント非表示');
                } else {
                    alert('パスワードが違います。');
                }
            }
        });
    </script>
    <script src="article-common.js" defer></script>
</body>
</html>`;

    console.log("Fetching images...");
    const urls = await fetchImages();
    // Exclude icons
    const filteredUrls = urls.filter(u => {
        const uLower = u.toLowerCase();
        if (uLower.includes('icon_') || uLower.includes('fo76_') || uLower.includes('gametitle-') || uLower.includes('perk_')) return false;
        if (uLower.endsWith('.ogg')) return false;
        return true;
    });

    console.log(`Downloading ${filteredUrls.length} images...`);
    for (const url of filteredUrls) {
        const filename = url.split('/').pop().split('?')[0];
        const dest = path.join(targetDir, filename);
        if (!fs.existsSync(dest)) {
            await downloadImage(url, dest);
        }
    }

    fs.writeFileSync('f:/Fallout/amata.html', htmlContent, 'utf8');
    console.log("Written amata.html");
}

main().catch(console.error);
