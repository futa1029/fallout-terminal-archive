const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/slocums-joe-watoga.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>スローカムズ・ジョー（Watoga）（Slocum's Joe）</b>は、アパラチア南東部の<a href="watoga.html" class="auto-link">ワトガ</a>市にある<a href="locations.html" class="auto-link">マークされないロケーション</a>です。</p>

            <h2>背景</h2>
<p>ここは、<a href="watoga-shopping-plaza.html" class="auto-link">ワトガ・ショッピングプラザ</a>の内部にある小さなコーヒーショップであり、<a href="great-war.html" class="auto-link">最終戦争</a>の以前には町の裕福な市民やビジネスマンたちなどにサービスを提供していました。<br>このワトガの<a href="slocums-joe.html" class="auto-link">スローカムズ・ジョー</a>の店舗では、特有のクランベリー風味のラテなどのアイテムを提供していました。</p>

            <h2>レイアウト</h2>
<p>この店舗には、ワトガの町の北東部に入り口の階段があるワトガ・ショッピングプラザの建物の中からアクセスできます。</p>

<p>店舗の入り口は外周の歩道通路に面しており、「<a href="stuarts-department-store.html" class="auto-link">スチュアートのデパート</a>」と「<a href="millers-appliances.html" class="auto-link">ミラー電気</a>」の隣に位置し、テーブルと椅子が置かれたパティオのテラス席を共有しています。<br>店の内部構造は、フロント・カウンター（レジ）の後ろの壁沿いに多数のコーヒーメーカーが並んでおり、客が座るための一部のテーブルと椅子で構成された小さな座面エリアがあります。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="enola-walkers-story-part-4.html" class="auto-link">エノラ・ウォーカーのストーリーパート4</a></b>（ホロテープ）：スローカムズ・ジョーの店の外から少し東にある、赤い屋根の野外ステージの設備（<a href="watoga-bandstand.html" class="auto-link">ワトガの野外ステージ</a>）の内部、救急箱の隣に配置されています。</li>
    <li>ランダムな<a href="magazines.html" class="auto-link">雑誌（マガジン）</a>（2箇所）：黄色い皿が置かれたテーブルの上（たまにテーブルの下の床にバグで落ちて出現します）。もう1つはフロントカウンターの後ろにある黄色い雑誌棚の一番上の段の右側に配置される可能性があります。</li>
    <li>ランダムな<a href="recipes.html" class="auto-link">レシピ</a>：フロントカウンターの裏側にあるコーヒーメーカーの右側に配置される可能性があります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ワトガの地上歩道沿い（ワトガ・ショッピングプラザの複合施設の一部）にある、小さなコーヒーショップの1店舗の跡地です。<br>この場所の周辺にはかつての戦後の避難民達による野営の跡がありますが、現在（Vault 76の居住者が外に出た時間軸）では彼らは既に全滅しており、内部の至る所にシステム異常を起こしたプロテクトロンやアサルトロンが行き交っているため、探索する際にはそれらの排除（またはワトガ市長のクエスト完了による敵対状態の解除）が必要になります。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Slocum's Joe (Watoga)</h3><img src="images/note_extracted/slocums-joe-watoga/img_main.png" alt="Slocum's Joe (Watoga)"><div class="infobox-row"><span class="infobox-label">種類</span><span>飲食店（未マーク）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="watoga-shopping-plaza.html" class="auto-link">ﾜﾄｶﾞ・ｼｮｯﾋﾟﾝｸﾞﾌﾟﾗｻﾞ</a></span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Slocum's Joe (Watoga)<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">スローカムズ・ジョー（ワトガ店舗）</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_slocums_joe_watoga" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Slocum's Joe (Watoga)<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">スローカムズ・ジョー（ワトガ店舗）</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Slocum's_Joe_(Watoga)" target="_blank" rel="noopener">Slocum's Joe (Watoga)</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_slocums_joe_watoga';const _n='Slocum\\'s Joe (Watoga)';const _u='slocums-joe-watoga.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Slocum's Joe (Watoga)</h3><img src="images/note_extracted/slocums-joe-watoga/img_main.png" alt="Slocum's Joe (Watoga)"><div class="infobox-row"><span class="infobox-label">種類</span><span>飲食店（未マーク）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="watoga-shopping-plaza.html" class="auto-link">ﾜﾄｶﾞ・ｼｮｯﾋﾟﾝｸﾞﾌﾟﾗｻﾞ</a></span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Slocum's Joe (Watoga)<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">スローカムズ・ジョー（ワトガ店舗）</span></h1>");

fs.writeFileSync('f:/Fallout/slocums-joe-watoga.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

スローカムズ・ジョー（ワトガ）（Slocum's Joe (Watoga)）
https://www.fallout-jp.com/slocums-joe-watoga.html

概要

ワトガの地上歩道沿い（ワトガ・ショッピングプラザ内）にあるコーヒーショップ跡。

---

💭 感想

戦前は「クランベリー風味のラテ」などを提供していましたが、現在は避難民の野営キャンプの跡だけが残されており、非常に危険なロボット達が周辺を徘徊している危険地帯と化しています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/slocums-joe-watoga', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/slocums-joe-watoga/post.md', postContent);

console.log('Done.');
