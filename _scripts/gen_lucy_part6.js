// ルーシー・マクレーン記事 Part6: 性格、名言、ギャラリー、感想、フッター、JS
const fs = require('fs');
const path = 'f:/Fallout/lucy-maclean.html';
const IMG = 'images/note_extracted/lucy-maclean';

const html = `
            <h2>性格</h2>
            <img src="${IMG}/The_End_episode_banner.jpg" class="image-right" alt="未来を見つめるルーシー" onclick="openLightbox(this)">
            <p>
                ルーシーはコミュニティの幸福に積極的に貢献する人物で、修理スキルを使ったVaultのメンテナンスやガーデニングに勤しみます。<br>
                自分の射撃スキルを控えめに評価していますが、実際は的の中心に命中させています。<br>
                読書、映画鑑賞、歴史の学習を楽しみ、優しく、魅力的で、勇敢で強い人物として描かれています。<br>
                問題が発生すると、ルーシーは果敢に立ち向かいます――フィリーでグールを言葉で説得しようとしたり、ベンジャミン監督官の指示に反してVault 4の制限区域を調査したり。<br>
                ルーシーは「ゴールデン・ルール」――自分がされたいように他人を扱うこと――を強く信じています。
            </p>
            <div class="clearfix"></div>

            <img src="${IMG}/FOTV_Lucy_attacks_a_woman.gif" class="image-left" alt="Vault 4の住人を攻撃するルーシー" onclick="openLightbox(this)">
            <p>
                しかし、ルーシーにはVault-Tecによる洗脳の痕跡も見られます。<br>
                モンティに精子の数を直接聞いたり、マキシマスに突然性的関係を提案したりと、性に対してオープンなのか洗脳の結果なのか判然としない行動があります。<br>
                彼女の口癖「オーキードーキー」は楽観主義も表していますが、本当の感情を抑圧する対処法かもしれません。<br>
                最初の殺人までは下品な言葉を使うことも拒否していました。
            </p>
            <div class="clearfix"></div>

            <img src="${IMG}/FOTV_Lucy_weeps.png" class="image-right" alt="父を信じられなくなり涙するルーシー" onclick="openLightbox(this)">
            <p>
                ルーシーの転機は、モルデイヴァーから父の真実を知った時に訪れます。<br>
                Vault-Tecとの関わり、シェイディ・サンズの壊滅への関与、母がグールへと変貌した事実。<br>
                彼女の世界は粉々に崩れ、父を同じ人間として見ることができなくなります。
            </p>
            <p>
                それでもルーシーは優しさを失いません。<br>
                マキシマスがハンクに殴り倒された時、彼を心配してマキシマスの銃を拾い父に向けるほどです。<br>
                最終的にグールと共にハンクを追うことを選びますが、去る前に苦しむ母を慈悲から射殺します。
            </p>
            <div class="clearfix"></div>

            <p>
                最初は暴力を拒否していたルーシーですが、ウエイストランドでの経験を通じて、攻撃や傷害に対して徐々にオープンになっていきます。<br>
                しかし冷血な殺人は依然として拒み続けます。<br>
                グレートカーンとの戦闘でも致命傷を避けた射撃を行い、父を殺すのではなく正義の裁きにかけたいと考えます。<br>
                一方、バフアウト中毒後には手口が変わり、窃盗に手を出したり、敵を殺すことへの抵抗感が薄れたりします。<br>
                しかしアディクトールで回復し、グールの裏切りを経た後、元の思いやりのある自分に戻ります。<br>
                「墓場の平和」ではなく、人々の自由意志を尊重した形でウエイストランドをより良い場所にしたいと願い続けます。
            </p>

            <h2>名言</h2>
            <div class="dialogue-box">
                「私の名前はルーシー・マクレーン。コミュニティの幸福に積極的に貢献しています。<br>
                修理スキルは若手配管工協会の活動で磨いています。<br>
                科学スキルは明らかに父には及びませんが、チャレンジは大好きです！」<br><br>
                ―― ルーシー、結婚申請にて
            </div>
            <div class="dialogue-box">
                「オーキードーキー」<br><br>
                ―― ルーシーの口癖
            </div>
            <div class="dialogue-box">
                「あなたを置いていくわけにはいかない。お願い、中に誰かがいるのは分かっている。<br>
                話して。お願い！」<br><br>
                ―― ルーシー、フェラル化寸前のマーサに語りかけて
            </div>
            <div class="dialogue-box">
                「ここ200年間で何が起きたか教えてもらえますか？」<br><br>
                ―― ルーシー、マキシマスに
            </div>
            <div class="dialogue-box">
                「6歳まで、農場の大きなライトが太陽だって本気で思ってた」<br><br>
                ―― ルーシー、母との思い出について
            </div>
            <div class="dialogue-box">
                「一方は人殺しをして、奴隷にして、磔にしている。<br>
                もう一方は……まあ、せいぜい問題がある程度よ」<br><br>
                ―― ルーシー、レギオンとNCRの違いについて父に
            </div>

            <h2>ギャラリー</h2>
            <h3>シーズン1</h3>
            <div class="gallery">
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_Lucy_poster.jpg" alt="ルーシーのポスター">
                    <div class="caption">ルーシーのポスター</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_series_promo.png" alt="プロモーション画像">
                    <div class="caption">プロモーション画像</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/Fallout_Season_1_Amazon_Lucy.png" alt="Prime Videoキャラクター概要">
                    <div class="caption">Prime Videoキャラクター概要</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_S01E01.The.End._(8).jpg" alt="Vault 32のモンティと出会う">
                    <div class="caption">Vault 32のモンティと出会う</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_wedding.png" alt="結婚式のルーシー">
                    <div class="caption">結婚式のルーシー</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_Vault_33_attack.gif" alt="Vault 33の襲撃">
                    <div class="caption">Vault 33の襲撃</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_Trailer_1_05.png" alt="Vault 33を出発">
                    <div class="caption">Vault 33を出発</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/Lucy_watching_Filly.webp" alt="フィリーに入る">
                    <div class="caption">フィリーに入る</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/The_Target_Lucy_with_saw.png" alt="ウィルジグの首を切る準備">
                    <div class="caption">ウィルジグの首を切る準備</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/Lucy_deer.gif" alt="鹿を初めて見るルーシー">
                    <div class="caption">鹿を初めて見るルーシー</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/Lucy_finger_mouth.png" alt="グールの指を噛みちぎる">
                    <div class="caption">グールの指を噛みちぎる</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_Lucy_gets_her_hand_mutilated.gif" alt="指を切り落とされるルーシー">
                    <div class="caption">指を切り落とされるルーシー</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/The_Ghouls_episode_banner.jpg" alt="スーパー・ドゥーパー・マートにて">
                    <div class="caption">スーパー・ドゥーパー・マートにて</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/Lucy_MacLean_gun.png" alt="銃を構えるルーシー">
                    <div class="caption">銃を構えるルーシー</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_Lucy_ashes.png" alt="シェイディ・サンズの灰を浴びて">
                    <div class="caption">シェイディ・サンズの灰を浴びて</div>
                </div>
            </div>

            <h3>シーズン2</h3>
            <div class="gallery">
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/Fallout_Season_2_Amazon_Lucy.png" alt="シーズン2キャラクター概要">
                    <div class="caption">シーズン2キャラクター概要</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_S2_Lucy_character_poster.jpg" alt="シーズン2キャラクターポスター">
                    <div class="caption">シーズン2キャラクターポスター</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_Season_2_Lucy_Character_Poster_2.jpg" alt="別バージョンのキャラクターポスター">
                    <div class="caption">別バージョンのポスター</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/Lucy_MacLean_Mare's_Leg.jpg" alt="メアズレッグを射撃するルーシー">
                    <div class="caption">メアズレッグを射撃</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV_S2_Radium_Rifle.jpg" alt="ラジウムライフルを使うルーシー">
                    <div class="caption">ラジウムライフルを使用</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/Lucy_MacLean_New_Vegas_Sign.jpg" alt="ニューベガスのサインの前で">
                    <div class="caption">ニューベガスのサインの前で</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FOTV2_Lucy_Legion.png" alt="レギオンのキャンプへ">
                    <div class="caption">レギオンのキャンプへ</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FTV_S2E5_Still_024.png" alt="ニューベガスのルーシー">
                    <div class="caption">ニューベガスのルーシー</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FTV_S2E7_Still_133.png" alt="レギオンとNCRの違いを語る">
                    <div class="caption">NCRとレギオンの違いを語る</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FTV_S2E8_Still_073.png" alt="父との会話">
                    <div class="caption">父との会話</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FTV_S2E8_Still_138.png" alt="記憶消去中の父を抱きしめるルーシー">
                    <div class="caption">記憶消去中の父を抱きしめる</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FTV_S2E8_Still_195.png" alt="ラッキー38のルーシーとマキシマス">
                    <div class="caption">ラッキー38のルーシーとマキシマス</div>
                </div>
                <div class="gallery-item" onclick="openLightbox(this.querySelector('img'))">
                    <img src="${IMG}/FTV_S2E8_Still_198.png" alt="ルーシーとマキシマス、手をつないで">
                    <div class="caption">手をつないで未来を見つめる</div>
                </div>
            </div>

            <!-- 感想 -->
            <div class="quote-box">
                <b>感想</b><br><br>
                ルーシー・マクレーン。もうこの名前だけで胸がいっぱいになります。<br>
                Vault 33という温室の中で「善良であること」を教え込まれた少女が、世界の残酷な真実と向き合いながらも、自分の信念を手放さない――その姿にどれだけ勇気づけられたことか。<br><br>
                彼女の旅は「ゴールデン・ルール」を貫くことの難しさそのものです。<br>
                グールに指を切られても、スニップ・スニップに臓器を摘出されかけても、レギオンに磔にされても、ルーシーは「人間としてどうあるべきか」という問いから逃げません。<br>
                バフアウト中毒のエピソードでは、ルーシーの内面に潜む暴力性と、それを自覚した時の恐怖がリアルに描かれていて、単なるヒロインではなく一人の人間として描写されているのが素晴らしいです。<br><br>
                そしてシーズン2の最終盤。ハンクにマインドコントロールチップを埋め込むという選択。<br>
                父を殺さず、しかし許すこともできない。「正義」とは何かを追い求め続けたルーシーが辿り着いた答えは、ある意味で最も残酷で、最も人間的な選択でした。<br>
                涙を流しながら空っぽになった父を見つめるシーンは、シリーズ全体を通して最も心に刺さる場面の一つだと思います。<br><br>
                エラ・パーネルの演技も本当に素晴らしくて、あの大きな瞳で絶望と希望を同時に表現できる女優はそういません。<br>
                「ようこそウエイストランドへ」というマキシマスの言葉と共に、ルーシーの新たな章が始まることを期待せずにはいられません。<br>
                オーキードーキー。<br>
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#FalloutTV</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Person</span>
                </div>
<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Lucy_MacLean" target="_blank" rel="noopener">Lucy MacLean</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
<p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>

            <!-- Comments Section -->
            <div class="comments-section" id="comments-section">
                <h3 class="comments-title">&gt; COMMENTS</h3>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力 (最大100文字)..." oninput="updateCharCount()"></textarea>
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span> / 100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SEND &#9654;</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list" class="comments-list">
                    <div class="comment-loading">LOADING...</div>
                </div>
            </div>
        </main>
    </div>

    <!-- Lightbox -->
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')">
        <img id="lightbox-img" src="" alt="">
    </div>

    <!-- Supabase CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script>
        const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co';
        const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';
        const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

        function openLightbox(img) {
            const lb = document.getElementById('lightbox');
            const lbImg = document.getElementById('lightbox-img');
            lbImg.src = img.src; lbImg.alt = img.alt;
            lb.classList.add('active');
        }
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') document.getElementById('lightbox').classList.remove('active');
        });

        async function toggleLike(btn) {
            const articleId = btn.getAttribute('data-article-id');
            let isLiked = localStorage.getItem(articleId + '_liked') === 'true';
            btn.disabled = true;
            if (isLiked) {
                const { data, error } = await supabaseClient.rpc('decrement_like', { article_id_param: articleId });
                if (!error) { localStorage.setItem(articleId + '_liked', false); updateLikeButton(btn, false, data); }
            } else {
                const { data, error } = await supabaseClient.rpc('increment_like', { article_id_param: articleId });
                if (!error) { localStorage.setItem(articleId + '_liked', true); updateLikeButton(btn, true, data); }
            }
            btn.disabled = false;
        }
        function updateLikeButton(btn, isLiked, count) {
            const heart = btn.querySelector('.heart');
            const countSpan = btn.querySelector('.like-count');
            if (isLiked) { btn.classList.add('liked'); heart.textContent = '\\u2665'; }
            else { btn.classList.remove('liked'); heart.textContent = '\\u2661'; }
            countSpan.textContent = count;
        }
        document.addEventListener('DOMContentLoaded', async () => {
            const btn = document.querySelector('.like-button');
            if (btn) {
                const articleId = btn.getAttribute('data-article-id');
                const isLiked = localStorage.getItem(articleId + '_liked') === 'true';
                const { data, error } = await supabaseClient.from('likes').select('like_count').eq('article_id', articleId).single();
                let count = 0;
                if (!error && data) count = data.like_count;
                updateLikeButton(btn, isLiked, count);
            }
        });

        // コメント機能
        const _commentArticleId = 'lucy_maclean';
        const _commentArticleName = 'Lucy MacLean (ルーシー・マクレーン)';
        const _commentArticleUrl = 'lucy-maclean.html';
        const ADMIN_TOKEN_KEY = 'fallout_admin_token';
        const ADMIN_PASSWORD = 'tq7jtq7j';
        const RATE_LIMIT_KEY = 'comment_last_posted';
        const RATE_LIMIT_SEC = 60;
        let _isAdminMode = false;

        function updateCharCount() {
            const len = document.getElementById('comment-input').value.length;
            const el = document.getElementById('char-count');
            if (el) { el.textContent = len; el.style.color = len > 90 ? '#ff6b6b' : 'var(--accent-color)'; }
        }
        function relativeTime(s) {
            const d = (Date.now() - new Date(s).getTime()) / 1000;
            if (d < 60) return 'たった今';
            if (d < 3600) return Math.floor(d / 60) + '分前';
            if (d < 86400) return Math.floor(d / 3600) + '時間前';
            if (d < 86400 * 7) return Math.floor(d / 86400) + '日前';
            return new Date(s).toLocaleDateString('ja-JP');
        }
        function escapeHtml(str) {
            return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        }
        function renderComments(comments) {
            const list = document.getElementById('comments-list');
            if (!list) return;
            if (!comments || comments.length === 0) {
                list.innerHTML = '<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';
                return;
            }
            list.innerHTML = comments.map(c => \`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode ? \`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\` : ''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join('');
        }
        async function loadComments() {
            const list = document.getElementById('comments-list');
            if (!list) return;
            const { data, error } = await supabaseClient.from('comments').select('id,content,created_at').eq('article_id', _commentArticleId).order('created_at', { ascending: false }).limit(50);
            if (error) { list.innerHTML = '<div class="comment-empty">コメントを読み込めませんでした。</div>'; return; }
            renderComments(data || []);
        }
        async function submitComment() {
            const input = document.getElementById('comment-input');
            const content = input ? input.value.trim() : '';
            if (!content) { showCommentMsg('コメントを入力してください。', false); return; }
            if (content.length > 100) { showCommentMsg('100文字以内で入力してください。', false); return; }
            const lastPosted = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0');
            const now = Date.now();
            if (now - lastPosted < RATE_LIMIT_SEC * 1000) {
                showCommentMsg('あと' + Math.ceil((RATE_LIMIT_SEC * 1000 - (now - lastPosted)) / 1000) + '秒後に投稿できます。', false); return;
            }
            const btn = document.querySelector('.comment-submit-btn');
            if (btn) btn.disabled = true;
            const { error } = await supabaseClient.from('comments').insert({ article_id: _commentArticleId, article_name: _commentArticleName, article_url: _commentArticleUrl, content: content });
            if (btn) btn.disabled = false;
            if (error) { showCommentMsg('投稿に失敗しました。', false); return; }
            localStorage.setItem(RATE_LIMIT_KEY, now.toString());
            input.value = ''; updateCharCount();
            showCommentMsg('コメントを投稿しました！', true);
            await loadComments();
        }
        function showCommentMsg(text, ok) {
            const el = document.getElementById('comment-msg');
            if (!el) return;
            el.textContent = text; el.style.color = ok ? 'var(--accent-color)' : '#ff6b6b';
            setTimeout(() => { el.textContent = ''; }, 3000);
        }
        async function deleteComment(commentId) {
            if (!_isAdminMode) return;
            if (!confirm('このコメントを削除しますか？')) return;
            const { error } = await supabaseClient.rpc('delete_comment_admin', { comment_id: commentId, admin_token: localStorage.getItem(ADMIN_TOKEN_KEY) || '' });
            if (!error) await loadComments();
        }
        document.addEventListener('DOMContentLoaded', () => {
            const token = localStorage.getItem(ADMIN_TOKEN_KEY);
            if (token === ADMIN_PASSWORD) _isAdminMode = true;
            loadComments();
        });
    </script>
</body>
</html>`;

fs.appendFileSync(path, html, 'utf8');
console.log('Part6 appended. Article complete!');
