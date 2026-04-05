const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/watoga-bandstand.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ワトガの野外ステージ（Watoga bandstand）</b>は、アパラチア南東部の都市<a href="watoga.html" class="auto-link">ワトガ</a>の街中にある<a href="locations.html" class="auto-link">マークされないロケーション</a>です。</p>

            <h2>背景</h2>
<p>この野外ステージ（バンドスタンド）は、音楽のパフォーマンス（地域のイベントライブなど）を観劇するために設計された、赤い屋根のある屋外パティオです。</p>

<p>ステージは都市の郊外である<a href="watoga-shopping-plaza.html" class="auto-link">ワトガ・ショッピングプラザ</a>の北東の境界沿いに位置しています。<br>幅の広い遊歩道が西の<a href="slocums-joe-watoga.html" class="auto-link">スローカムズ・ジョー</a>や南の<a href="drumlin-diner.html" class="auto-link">ドラムリン・ダイナー</a>といった店舗を囲むように続いており、段々になった芝生の観客席エリアがステージ自体を取り囲んでいます。</p>

<p>ステージの建つ赤い日よけ屋根（オーニング）の下にはゴミ箱があり、その後ろに<a href="enola-walkers-story.html" class="auto-link">エノラ・ウォーカーのホロテープ</a>と<a href="first-aid.html" class="auto-link">救急箱</a>が隠されています。<br>現在はステージの縁に沿って<a href="glowing-fungus.html" class="auto-link">発光キノコ</a>の茎が鬱蒼と生い茂っていますが、そのプラットフォームには4種類の<a href="musical-instrument.html" class="auto-link">楽器</a>が当時からそのまま配置されています。<br>これらの楽器（<a href="tuba.html" class="auto-link">チューバ</a>、<a href="acoustic-guitar.html" class="auto-link">アコースティックギター</a>、<a href="snare-drum.html" class="auto-link">スネアドラム</a>、<a href="steel-guitar.html" class="auto-link">スチールギター</a>）はプレイヤーが実際に演奏することができ、しばらく演奏しつづけると「<a href="well-tuned.html" class="auto-link">十分な休息（Well Tuned）</a>」のバフ効果（AP回復上昇）を得ることができます。<br>また、ステージの前方にはスタンドマイクが設置されています。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="enola-walkers-story.html" class="auto-link">エノラ・ウォーカーの物語、パート4</a></b>（ホロテープ）：スローカムズ・ジョーの東にある赤い野外ステージの下、ゴミ箱と救急箱の近くに落ちています。</li>
    <li><b><a href="key-to-claras-box.html" class="auto-link">クララの箱の鍵</a></b>：赤い野外ステージのすぐ南、小さな川の岸の岩場にもたれかかっているガイコツの近くの<a href="toolbox.html" class="auto-link">ツールボックス</a>（開けるには「ツールボックスの鍵」が必要）の中にあります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ワトガの街のショッピングエリアの隅に設置された、小規模な音楽用の野外ステージです。<br>赤い屋根の付いたステージにマイクや楽器などが置き去りにされており、（ワトガロボットが敵対していない前提なら）「十分な休息（Well Tuned）」のバフ効果を手軽に得ることもできる憩いの場です。<br>エノラ・ウォーカーの切ない悲劇的な物語のホロテープや、クララの箱の鍵を持つ死体など、戦後にワトガで発生した小さな悲劇の記録がいくつか隠されているのが特徴的なロケーションですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Watoga Bandstand</h3><img src="images/note_extracted/watoga-bandstand/img_main.png" alt="Watoga Bandstand"><div class="infobox-row"><span class="infobox-label">種類</span><span>野外ステージ（未マーク）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="watoga.html" class="auto-link">ワトガ</a>（ショッピングプラザ東）</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Watoga Bandstand<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ワトガの野外ステージ</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_watoga_bandstand" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Watoga Bandstand<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ワトガの野外ステージ</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Watoga_bandstand" target="_blank" rel="noopener">Watoga bandstand</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_watoga_bandstand';const _n='Watoga Bandstand';const _u='watoga-bandstand.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Watoga Bandstand</h3><img src="images/note_extracted/watoga-bandstand/img_main.png" alt="Watoga Bandstand"><div class="infobox-row"><span class="infobox-label">種類</span><span>野外ステージ（未マーク）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="watoga.html" class="auto-link">ワトガ</a>（ショッピングプラザ東）</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Watoga Bandstand<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ワトガの野外ステージ</span></h1>");

fs.writeFileSync('f:/Fallout/watoga-bandstand.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ワトガの野外ステージ（Watoga Bandstand）
https://www.fallout-jp.com/watoga-bandstand.html

概要

ワトガの街のショッピングエリアの隅に設置されている小規模な音楽用野外ステージ。赤い屋根と備え付けの楽器類が目印です。

---

💭 感想

備え付けの楽器は演奏可能になっており「十分な休息（Well Tuned）」のバフ効果を手軽に得ることもできる憩いの場です。物悲しいエノラ・ウォーカーのホロテープや、クララの箱の鍵を持つ死体が隠されているなど、戦後のワトガで発生した悲劇の記録が隠されているのが特徴ですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/watoga-bandstand', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/watoga-bandstand/post.md', postContent);

console.log('Done.');
