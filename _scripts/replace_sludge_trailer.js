const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/sludge-trailer.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>スラッジ・トレーラー（Sludge trailer）</b>は、アパラチアの<a href="ash-heap.html" class="auto-link">積灰の山（アッシュヒープ）</a>地域にあるマップにマークされていない<a href="locations.html" class="auto-link">ロケーション</a>（POI）です。<br><a href="red-rocket-filling-station.html" class="auto-link">レッドロケット・給油所</a>のすぐ北側、建物の真裏の高台の上に位置しています。</p>

            <h2>レイアウト</h2>
<p>このロケーションの周辺には、小さな金属製の密閉型トレーラーと、その近くにヘドロ（スラッジ）の山があり、廃棄されたタイヤやオフロードカー（ボンネットの上にコーヒー関連の<a href="junk.html" class="auto-link">ジャンク品</a>がいくつか置かれています）などの残骸があります。トレーラーの周囲には<a href="opossum.html" class="auto-link">オポッサム</a>が生息しており徘徊しています。</p>
<p>トレーラーの外側には2つの<a href="toolbox.html" class="auto-link">ツールボックス（工具箱）</a>があり、1つはピック・R・アップ（トラック）の近くに、もう1つは地面にあるダートバイクの近くにあります。<br>トレーラーの内部には、睡眠可能な<a href="bed.html" class="auto-link">ベッド</a>と探索可能な<a href="explosives-crate.html" class="auto-link">爆発物の木枠の箱</a>があります。</p>
<p>トレーラーの右側（外側）のスペースにはテレビと芝生用の折りたたみ椅子が置かれており、椅子には<a href="teddy-bear.html" class="auto-link">テディベア</a>がちょこんと座っています。</p>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="event-fly-swatter.html" class="auto-link">Event: Fly Swatter</a></b>：上空を飛んでいるベルチボットを撃墜するパブリックイベントです。このイベントはスラッジトレーラーのすぐ近くの空域で発生する可能性があります。</li>
</ul>

            <h2>補足</h2>
<ul class="loot-list">
    <li>スラッジ・トレーラーは、<a href="nukashine.html" class="auto-link">ヌカシャイン</a>（Vintage Nukashine）を飲んでブラックアウト（暗転）した後に目を覚ます可能性のあるワープ地点（ランダムエンカウント・ポイント）のひとつです。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                アッシュヒープのレッドロケット給油所のすぐ裏手（北側の高台）にある、名もなきトレーラーの生活拠点跡（POI）です。<br>ヌカシャインのワープポイントの1つとして設定されているため、ブラックアウト後にここのベッドで寝かされている状態で目が覚め、「ここはどこだ！？」と周辺を探索したプレイヤーもいるかもしれませんね。<br>汚染された屋外のテレビの前の椅子に置かれているテディベアが、絶妙な哀愁を漂わせています。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Sludge Trailer</h3><img src="images/note_extracted/sludge-trailer/img_main.png" alt="Sludge Trailer"><div class="infobox-row"><span class="infobox-label">種類</span><span>未登録ロケーション（POI）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山（アッシュヒープ）</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="opossum.html" class="auto-link">オポッサム</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Sludge Trailer<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">スラッジ・トレーラー</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_sludge_trailer" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Sludge Trailer<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">スラッジ・トレーラー</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Sludge_trailer" target="_blank" rel="noopener">Sludge trailer</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
                <p style="margin-top:15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color:var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>
            
            <div class="comments-section">
                <h2 class="comments-title">&gt; COMMENTS_</h2>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea>
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span>/100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list"></div>
            </div>
        </main>
    </div>
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_sludge_trailer';const _n='Sludge Trailer';const _u='sludge-trailer.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Sludge Trailer</h3><img src="images/note_extracted/sludge-trailer/img_main.png" alt="Sludge Trailer"><div class="infobox-row"><span class="infobox-label">種類</span><span>未登録ロケーション（POI）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山（アッシュヒープ）</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="opossum.html" class="auto-link">オポッサム</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Sludge Trailer<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">スラッジ・トレーラー</span></h1>");

fs.writeFileSync('f:/Fallout/sludge-trailer.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

スラッジ・トレーラー（Sludge Trailer）
https://www.fallout-jp.com/sludge-trailer.html

概要

アッシュヒープのレッドロケット給油所のすぐ裏手（北側の高台）にある、名もなきトレーラーの生活拠点跡（未登録POI）。

---

💭 感想

ヌカシャインのワープポイントの1つとして設定されているため、ブラックアウト後にここのベッドで寝かされている状態で目が覚めて驚いたプレイヤーもいるかもしれませんね。野外のテレビの前の椅子に置かれているテディベアが哀愁を漂わせています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/sludge-trailer', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/sludge-trailer/post.md', postContent);

console.log('Done.');
