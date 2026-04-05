const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/overgrown-sundew-grove.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>繁茂したサンデュー叢（Overgrown sundew grove）</b>は、アパラチアの<a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a>地域にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>背景</h2>
<p>通常の昆虫を食べることから始まり、長年の変異の末についに人間のサイズの脊椎動物（人間）をも捕食して栄養を補給するようになるまで巨大に成長（変異）した食虫植物<a href="sundew.html" class="auto-link">サンデュー</a>（モウセンゴケ）の群生地の1つです。<br>この群生地の場所では、美しい環境の中に建てられた2つの家を巨大な食虫植物が飲み込み、貫通して成長しているのが見られます。</p>

            <h2>レイアウト</h2>
<p>クランベリー湿原地域にある他のサンデュー叢と同様に、繁茂したサンデュー叢の中には近付くと有毒な化学物質（酸）を散布してくる木のように巨大化したモウセンゴケの群生があります。</p>
<p>さらにこの場所はスコーチビースト・クイーンの棲み処である<a href="fissure-site-prime.html" class="auto-link">地割れ地点・プライム</a>のすぐ近くに該当することから、そこから出現する<a href="scorched.html" class="auto-link">スコーチ</a>が、林の中に生息している野生のクリーチャー（<a href="gulper.html" class="auto-link">ガルパー</a>など）をたびたび攻撃している場合があります。<br>この特定の群生地にはより多くのサンデュー（モウセンゴケ）の植物があり、それらが2つの建物を貫き通るように成長しています。</p>
<p>建物の一方は東側にある小さな家で、内部には<a href="safe.html" class="auto-link">金庫</a>と<a href="refrigerator.html" class="auto-link">冷蔵庫</a>があります。<br>もう一方は西側にある物置き小屋で、<a href="duffle-bag.html" class="auto-link">ダッフルバッグ</a>と<a href="wooden-crate.html" class="auto-link">木枠の箱</a>があります。<br>また、叢（林）の至るところで、新鮮な<a href="cranberries.html" class="auto-link">クランベリー</a>を収穫することができます。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="recipes.html" class="auto-link">レシピ（設計図）</a></b>のポップ候補：西側の物置小屋の内部。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                クランベリー湿原の南側、地割れ地点・プライムの真横にある有名な「赤い極彩色の森」の1つです。<br>巨大な食虫植物が廃屋を飲み込むように貫通して成長しているというSFやホラー的なロケーションであり、クイーン戦（Scorched Earth）の際にスポーンする強敵から身を隠すため、あるいはブラストゾーン内の溶剤の素材（発光塊や色付きの溶剤）を集めるためなどに、この極彩色の不気味な森の中に駆け込んたことのあるプレイヤーも多いのではないでしょうか。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Overgrown Sundew Grove</h3><img src="images/note_extracted/overgrown-sundew-grove/img_main.png" alt="Overgrown Sundew Grove"><div class="infobox-row"><span class="infobox-label">種類</span><span>サンデュー叢（森）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Overgrown Sundew Grove<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">繁茂したサンデュー叢</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_overgrown_sundew" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Overgrown Sundew Grove<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">繁茂したサンデュー叢</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Overgrown_sundew_grove" target="_blank" rel="noopener">Overgrown sundew grove</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_overgrown_sundew';const _n='Overgrown Sundew Grove';const _u='overgrown-sundew-grove.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Overgrown Sundew Grove</h3><img src="images/note_extracted/overgrown-sundew-grove/img_main.png" alt="Overgrown Sundew Grove"><div class="infobox-row"><span class="infobox-label">種類</span><span>サンデュー叢（森）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Overgrown Sundew Grove<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">繁茂したサンデュー叢</span></h1>");

fs.writeFileSync('f:/Fallout/overgrown-sundew-grove.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

繁茂したサンデュー叢（Overgrown Sundew Grove）
https://www.fallout-jp.com/overgrown-sundew-grove.html

概要

クランベリー湿原にある、変異した巨大な食虫植物の群生ポイントの1つ。

---

💭 感想

巨大な食虫植物が廃屋を伸び飲み込むように貫通して成長しているというSFホラー的なロケーションであり、地割れ地点プライムの真横にあるため、クイーン戦の際に敵から身を隠すためなどでこの極彩色の不気味な森の中に駆け込んたことのあるプレイヤーも多いのではないでしょうか。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/overgrown-sundew-grove', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/overgrown-sundew-grove/post.md', postContent);

console.log('Done.');
