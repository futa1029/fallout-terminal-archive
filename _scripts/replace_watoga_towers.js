const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/watoga-towers.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ワトガ・タワー（Watoga Towers）</b>は、アパラチアの<a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a>にある<a href="watoga.html" class="auto-link">ワトガ</a>の街の中に存在する<a href="locations.html" class="auto-link">マークされないロケーション</a>です。</p>

            <h2>背景</h2>
<p>ワトガ・タワーは、「未来の街・ワトガ（Watoga's Home of Tomorrow）」と宣伝され、ワトガの富裕層・エリート向けの多数の未来的・高級住居の一つとして機能していました。</p>
<p><a href="great-war.html" class="auto-link">最終戦争</a>の直後、<a href="brotherhood-of-steel.html" class="auto-link">B.O.S.</a>の<a href="vernon-dodge.html" class="auto-link">ヴァーノン・ドッジ</a>がこのタワーのエレベーターの制御にアクセスすることに成功し、約3週間にわたって3階の部屋を彼自身の家（隠れ家）として使用していました。<br>最終的にドッジはここを去り、放棄されることになりました。</p>

            <h2>レイアウト</h2>
<p>ワトガ・タワーは、<a href="watoga-civic-center.html" class="auto-link">ワトガ・シビックセンター</a>のすぐ東に位置しています。<br>建物の外にはいくつかの投票端末（ステーション）が置かれています。内部には、近くの小川に面した階段を上ることで入ることができます。<br>内部にはエレベーターがあり、これを起動することでプレイヤーを3階のインスタンスエリアへと運びます。<br>エレベーターから出ると、緑色の壁をした小さなロビーエリアに出ます。エレベーターの正面には、イニシエイト・ドッジが籠もっていた部屋（3B号室）に通じるドアがあります。</p>
<p>ドッジが住んでいた部屋には、数多くの<a href="junk.html" class="auto-link">ジャンクアイテム</a>や自由に漁れるコンテナがあります。<br>入って右側には<a href="tinkers-workbench.html" class="auto-link">細工師の作業台</a>があり、散らかって荒廃したバスルーム（目立ったものは無い）に通じるドアがあります。その奥の部屋の隅にはターミナルと通信コンソールのセットがあり、その左側には寝室へ通じるドアがあります。<br>寝室には<a href="sleeping-bag.html" class="auto-link">寝袋</a>がありますが、資材や集めた機械類を置く保管庫としても改造されています。<br>また別の隅には小さなキッチンエリアがあり、中央のダイニングテーブルの上には、イニシエイト・ドッジが通信のために使っていたと思われる小型のパラボラアンテナがあります。この建物の屋上には<a href="scorchbeast-nest.html" class="auto-link">スコーチビーストの巣</a>が作られています。</p>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="breaking-radio-silence.html" class="auto-link">Breaking Radio Silence</a></b></li>
</ul>

            <h2>メモ</h2>
<ul class="loot-list">
    <li>ワトガ・タワーの外観や建物自体はゲームのリリース当初から存在していましたが、3階の内部（ドッジの隠れ家としてのインスタンスエリア）は後から追加されました。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ワトガの街中にあるインスタンス化されたロケーションで、B.O.S.の「ヴァーノン・ドッジ」の古い隠れ家として利用されていた部屋です。<br>現在彼は（デイリーオプスの案内役として活動し）B.O.S.本隊に復帰しているため不在ですが、当時の彼が苦労して生き延びていた痕跡や、一人でなんとか通信を試みていた機器が見られます。彼の日誌も残されており、アパラチアB.O.S.の歴史を感じさせるロケーションです。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Watoga Towers</h3><img src="images/note_extracted/watoga-towers/img_main.png" alt="Watoga Towers"><div class="infobox-row"><span class="infobox-label">種類</span><span>マークされないロケーション<br>（インスタンスエリア）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="watoga.html" class="auto-link">ワトガ</a> (<a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a>)</span></div><div class="infobox-row"><span class="infobox-label">居住者</span><span><a href="vernon-dodge.html" class="auto-link">ヴァーノン・ドッジ</a>（過去）</span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="breaking-radio-silence.html" class="auto-link">Breaking Radio Silence</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Watoga Towers<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ワトガ・タワー</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_watoga_towers" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Watoga Towers<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ワトガ・タワー</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Watoga_Towers" target="_blank" rel="noopener">Watoga Towers</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_watoga_towers';const _n='Watoga Towers';const _u='watoga-towers.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Watoga Towers</h3><img src="images/note_extracted/watoga-towers/img_main.png" alt="Watoga Towers"><div class="infobox-row"><span class="infobox-label">種類</span><span>マークされないロケーション<br>（インスタンスエリア）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="watoga.html" class="auto-link">ワトガ</a> (<a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a>)</span></div><div class="infobox-row"><span class="infobox-label">居住者</span><span><a href="vernon-dodge.html" class="auto-link">ヴァーノン・ドッジ</a>（過去）</span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="breaking-radio-silence.html" class="auto-link">Breaking Radio Silence</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Watoga Towers<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ワトガ・タワー</span></h1>");

fs.writeFileSync('f:/Fallout/watoga-towers.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ワトガ・タワー（Watoga Towers）
https://www.fallout-jp.com/watoga-towers.html

概要

マークされないロケーション（インスタンスエリア）。「未来の街・ワトガ」として宣伝されたワトガの高級住居の一つであり、最終戦争の直後にB.O.S.のヴァーノン・ドッジが隠れ家として使っていました。

---

💭 感想

内部には当時の彼が苦労して生き延びていた痕跡や、一人きりでなんとか通信を維持しようと試みていた機器が見られます。彼の日誌も残されており、アパラチアB.O.S.の歴史を感じさせるロケーションです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/watoga-towers', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/watoga-towers/post.md', postContent);

console.log('Done.');
