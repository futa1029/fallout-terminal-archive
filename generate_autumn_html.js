const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autumn Acre Cabin - Fallout Lore Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <style>
        :root {
            --bg-color: #0f0f0f;
            --text-color: #00ff00;
            --accent-color: #00ff00;
            --header-bg: rgba(0, 255, 0, 0.1);
            --panel-bg: rgba(0, 255, 0, 0.05);
        }
        /* コメント機能用のCSS */
        .comments-section { margin-top: 40px; padding-top: 20px; border-top: 1px dashed var(--accent-color); }
        .comments-title { font-family: 'Share Tech Mono', monospace; font-size: 1.2em; margin-bottom: 20px; color: var(--accent-color); text-transform: uppercase; letter-spacing: 1px; }
        .comment-form { display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; background: color-mix(in srgb, var(--accent-color) 5%, transparent); padding: 15px; border: 1px solid color-mix(in srgb, var(--accent-color) 20%, transparent); border-radius: 4px; }
        .comment-textarea { width: 100%; box-sizing: border-box; background: rgba(0, 0, 0, 0.3); border: 1px solid var(--accent-color); color: var(--text-color); padding: 10px; font-family: 'Noto Sans JP', sans-serif; min-height: 80px; resize: vertical; border-radius: 2px; }
        .comment-textarea:focus { outline: none; border-color: #fff; box-shadow: 0 0 5px color-mix(in srgb, var(--accent-color) 50%, transparent); }
        .comment-form-footer { display: flex; justify-content: space-between; align-items: center; }
        .char-count { font-size: 0.8em; color: color-mix(in srgb, var(--text-color) 70%, transparent); font-family: 'Share Tech Mono', monospace; }
        .comment-submit-btn { background: var(--header-bg); color: var(--accent-color); border: 1px solid var(--accent-color); padding: 8px 20px; cursor: pointer; font-family: 'Share Tech Mono', monospace; font-size: 0.9em; text-transform: uppercase; transition: all 0.2s; border-radius: 2px; }
        .comment-submit-btn:hover { background: var(--accent-color); color: #000; }
        .comment-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .comment-msg { font-size: 0.85em; margin-top: 5px; min-height: 1.2em; }
        .comment-msg.error { color: #ff5555; }
        .comment-msg.success { color: var(--accent-color); }
        .comments-list { display: flex; flex-direction: column; gap: 15px; }
        .comment-item { background: var(--panel-bg); border-left: 3px solid var(--accent-color); padding: 12px 15px; position: relative; }
        .comment-meta { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85em; color: color-mix(in srgb, var(--text-color) 70%, transparent); font-family: 'Share Tech Mono', monospace; border-bottom: 1px solid color-mix(in srgb, var(--accent-color) 20%, transparent); padding-bottom: 4px; }
        .comment-time { opacity: 0.8; }
        .comment-body { font-size: 0.95em; line-height: 1.5; white-space: pre-wrap; word-break: break-word; }
        .comment-delete-btn { background: none; border: none; color: #ff5555; cursor: pointer; font-size: 1.2em; padding: 0 5px; line-height: 1; opacity: 0.5; transition: opacity 0.2s; }
        .comment-delete-btn:hover { opacity: 1; }
        .comment-empty { text-align: center; font-style: italic; opacity: 0.6; padding: 20px; font-size: 0.9em; }
        .comment-loading { text-align: center; padding: 20px; font-family: 'Share Tech Mono', monospace; animation: pulse 1.5s infinite; }
    </style>
</head>
<body data-article-id="autumn-acre-cabin" data-article-category="場所">
    <div class="crt-overlay"></div>
    <div class="scanlines"></div>
    
    <div class="container">
        <aside class="sidebar">
            <div class="brand">
                <div class="logo">ROBCO INDUSTRIES</div>
                <div class="sys-info">UNIFIED OPERATING SYSTEM</div>
                <div class="sys-info">COPYRIGHT 2075-2077</div>
            </div>
            <nav class="nav-menu">
                <ul>
                    <li><a href="index.html">SYS_C:\\> HOME</a></li>
                    <li><a href="lore.html" class="active">SYS_C:\\> LORE_DATABASE</a></li>
                    <li><a href="perks.html">SYS_C:\\> PERKS</a></li>
                    <li><a href="gallery.html">SYS_C:\\> GALLERY</a></li>
                    <li><a href="changelog.html">SYS_C:\\> CHANGELOG</a></li>
                </ul>
            </nav>
            <div class="terminal-status">
                <p>STATUS: <span class="status-ok">ONLINE</span></p>
                <p>CONNECTION: SECURE</p>
                <p>USER: OVERSEER MOHI</p>
            </div>
        </aside>

        <main class="content">
            <header class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <div class="action-buttons">
                    <button class="like-button" data-article-id="autumn-acre-cabin" onclick="toggleLike(this)">
                        <span class="like-icon">♡</span> <span class="like-count">0</span>
                    </button>
                    <button class="menu-toggle" aria-label="メニューを開く">
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </header>

            <article class="lore-article">
                <h1>Autumn Acre Cabin<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">オータム・エーカー・キャビン</span></h1>
                
                <div class="infobox">
                    <img src="images/note_extracted/autumn-acre-cabin/FO76_Autumn_Acre_cabin_daytime.png" alt="オータム・エーカー・キャビン" style="width:100%; object-fit: cover; border-bottom: 2px solid var(--accent-color); margin-bottom: 10px;">
                    <img src="images/note_extracted/autumn-acre-cabin/img_map_marker.png" alt="マップ上の位置" style="width:100%; margin-top:5px;">
                    <div style="text-align:center; font-style:italic; color:#888; font-size:0.8em; margin-bottom:10px;">マップ上の位置</div>
                    <ul>
                        <li><span class="label">タイプ:</span> キャビン</li>
                        <li><span class="label">場所:</span> 荒れた境域、アパラチア</li>
                        <li><span class="label">クリーチャー:</span> ゴキブリ、フェラル・グール、ウェンディゴ、オオカミ</li>
                        <li><span class="label">登場作品:</span> Fallout 76</li>
                    </ul>
                </div>

                <div class="article-body">
                    <p><strong>オータム・エーカー・キャビン（Autumn Acre cabin）</strong>は、アパラチアの<strong>荒れた境域</strong>地域にあるロケーションです。</p>

                    <h2>概要</h2>
                    <p>オータム・エーカー・キャビンは、荒れた境域にある素晴らしい景観を見下ろす崖のへりに危なっかしく建っている小さな家です。ここはかつて、スランプに陥り、横柄な出版社を酷く憎んでいたロマンス小説家、<strong>G.D. ブローウッド</strong>の家でした。かつての住人によって多くの空のワインボトルが残されています。</p>

                    <h2>レイアウト</h2>
                    <p>この静かなキャビンは、荒れた境域から<strong>沼地地帯</strong>へ抜ける境界を見下ろす丘の上にあります。外は<strong>フェラル・グール</strong>の群れに占拠されており、それらは高レベルの光りし者や<strong>ウェンディゴ</strong>に率いられている場合があります。フェラル・グールがいない場合は、アルファが率いる<strong>オオカミ</strong>の群れが周辺をうろついているはずです。</p>
                    <p>内部の寝室には、回収可能なスチーマートランクとスーツケースが置かれています。また、ロケーション周辺のあちこちに薪が積み上げられています。</p>

                    <h2>主なアイテム（Notable loot）</h2>
                    <ul>
                        <li><strong>オータム・エーカーの霧</strong>（メモ） - デスクの上。</li>
                        <li>最大1個の<strong>Vault-Tec ボブルヘッド</strong> - 洗面所の出入り口のそばにある小さなテーブルの上、コーヒーカップの隣。</li>
                        <li>最大1冊の<strong>雑誌</strong> - 大きな石造りの暖炉の近くにあるサイドテーブルの上、アンティークの地球儀のそば。</li>
                        <li>最大1冊の<strong>レシピ</strong> - 入り口近くのドレッサーの上。</li>
                    </ul>

                    <h2>ホロテープとメモ</h2>
                    <div class="note-box">
                        <p><strong>オータム・エーカーの霧</strong>（Mists of Autumn Acres）</p>
                        <p>作：G.D. ブローウッド</p>
                        <br>
                        <p>秋の霧は、厚く渦巻く霧のように山々の上に渦巻いていた。フォン・ヘルプスト男爵は、他の誰よりも力を持った男としての、決して霧（迷い）のない落ち着いた態度で秋の土地を見渡した。知的で、強く、誰からも好かれる男爵は、謙虚であり続け、あるいはそれ以上に謙虚だった。</p>
                        <br>
                        <p>男爵の優れた能力を示す唯一の証は、霧に満ちた（曇った）頭を持つ怠惰で無能な管理者たちに向けた、機知に富み、辛辣な言葉で書かれた手紙の中に表れていた。やつらは、いわゆる「編集」という名目で、常に彼の偉大な作品を台無しにしようとしている。</p>
                        <br>
                        <p>フォン・ヘルプスト男爵が自分の領地を見渡すと、朝霧が低い土地へと沈み込み…</p>
                        <br>
                        <p>男爵</p>
                        <br>
                        <p>フォン・ヘルプスト男爵は馬鹿であり、彼の小説が出版されることは決してないだろう。</p>
                    </div>

                    <div class="quote-box">
                        <b>感想</b><br><br>
                        ここは荒れた境域から沼地地帯を遠くに見下ろせる絶景スポットでありながら、作家の悲哀と滑稽さが同居するロケーションです。<br>
                        G.D. ブローウッドの書きかけの原稿「オータム・エーカーの霧」を読んでみると、「厚く渦巻く霧のように渦巻いていた」という冗長な表現や、「あるいはそれ以上に謙虚だった」といった強引な自己投影（メアリー・スー）の匂いがプンプンしていて、売れない小説家であったことがよく分かりますね。<br>
                        そして極めつけは最後の1行。編集者による痛烈なダメ出し（あるいは自分自身での筆折り）が残されており、「彼の小説が出版されることは決してないだろう」とあっさり切り捨てられている結末には、思わずニヤリとしてしまいます。山積みのワインボトルが、彼の苦悩と自暴自棄を物語っていますね。
                    </div>

                    <div class="gallery">
                        <img src="images/note_extracted/autumn-acre-cabin/Autumn_Acre_Cabin.png" alt="キャビンの外観">
                        <img src="images/note_extracted/autumn-acre-cabin/F76_Autumn_Acre_Cabin.png" alt="斜めからの外観">
                        <img src="images/note_extracted/autumn-acre-cabin/FO76_Autumn_Acre_cabin_(Mists_of_Autumn_Acres).png" alt="オータム・エーカーの霧">
                        <img src="images/note_extracted/autumn-acre-cabin/FO76_Autumn_Acre_cabin_magazine_1.jpg" alt="雑誌のスポーン位置">
                    </div>
                </div>
            </article>

            <div class="comments-section" id="comments-section">
                <!-- コメント機能は省略せずに含める（上記CSSと共に動作） -->
                <h3 class="comments-title">ACCESSING USER COMMENTS_</h3>
                
                <div class="comment-form">
                    <textarea class="comment-textarea" id="comment-input" placeholder=">> ENTER YOUR COMMENT HERE..." maxlength="500"></textarea>
                    <div class="comment-form-footer">
                        <span class="char-count" id="char-count">0 / 500</span>
                        <button class="comment-submit-btn" id="comment-submit" disabled>SUBMIT_</button>
                    </div>
                    <div class="comment-msg" id="comment-msg"></div>
                </div>

                <div class="comments-list" id="comments-list">
                    <div class="comment-loading">CONNECTING TO DATABASE...</div>
                </div>
            </div>

            <footer class="site-footer">
                <div class="copyright">
                    <p>This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Autumn_Acre_cabin" target="_blank" rel="noopener">Autumn Acre cabin</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                    <p>&copy; Overseer Mohi's Terminal — Fallout Lore Archive</p>
                    <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
                </div>
            </footer>
        </main>
    </div>

    <div class="lightbox-overlay" id="lightbox-overlay" onclick="this.classList.remove('active')">
        <div class="lightbox-content">
            <img id="lightbox-img" src="" alt="Enlarged Image">
        </div>
    </div>

    <script>
        const SUPABASE_URL = "https://example.supabase.co"; // Dummy
        const SUPABASE_ANON_KEY = "dummy-key"; // Dummy
        
        window.supabase = {
            createClient: () => ({
                rpc: async (fn, params) => {
                    const id = params.p_article_id;
                    let count = parseInt(localStorage.getItem('like_count_' + id) || '0');
                    if(fn === 'increment_like') count++;
                    else if(fn === 'decrement_like') count = Math.max(0, count - 1);
                    localStorage.setItem('like_count_' + id, count);
                    return { data: count, error: null };
                },
                from: () => ({
                    select: () => ({
                        eq: () => ({
                            order: () => Promise.resolve({ data: [], error: null })
                        })
                    }),
                    insert: () => Promise.resolve({ data: [{ id: Date.now() }], error: null }),
                    delete: () => ({
                        eq: () => Promise.resolve({ error: null })
                    })
                })
            })
        };
    </script>
    <script src="js/scripts.js"></script>
</body>
</html>
`;

fs.writeFileSync('autumn-acre-cabin.html', html);
const taskData = fs.readFileSync('C:\\Users\\futa1\\.gemini\\antigravity\\brain\\771832e3-a845-45ba-88c6-a956fa0b0f82\\task.md', 'utf8');
fs.writeFileSync('C:\\Users\\futa1\\.gemini\\antigravity\\brain\\771832e3-a845-45ba-88c6-a956fa0b0f82\\task.md', taskData.replace('[ ] Autumn Acre Cabin (オータム・エーカー・キャビン) の記事作成\n  - [ ] Wikiからコンテンツ・画像・MAP情報の抽出\n  - [ ] APIでホロテープ/メモの全文内容の取得\n  - [ ] HTMLファイルの生成 (`autumn-acre-cabin.html`)', '[-] Autumn Acre Cabin (オータム・エーカー・キャビン) の記事作成\n  - [x] Wikiからコンテンツ・画像・MAP情報の抽出\n  - [x] APIでホロテープ/メモの全文内容の取得\n  - [x] HTMLファイルの生成 (`autumn-acre-cabin.html`)'));
console.log('Autumn Acre Cabin HTML generated successfully.');
