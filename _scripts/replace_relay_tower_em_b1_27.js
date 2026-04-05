const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/relay-tower-em-b1-27.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>中継タワーEM-B1-27（Relay tower EM-B1-27）</b>は、アパラチアの<a href="the-forest.html" class="auto-link">森林地帯</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>レイアウト</h2>
<p>これはアパラチアの各地にある標準的な電波中継タワー（電波塔）などの複合施設であり、タワーの北側と西側にある2つのフェンスの入り口とその周囲を<a href="machinegun-turrets.html" class="auto-link">マシンガンタレット</a>が守っています。</p>
<p>施設の建物の内部には、青い「<a href="emergency-management-system-relay-terminal.html" class="auto-link">緊急管理システムの中継ターミナル</a>（システム・リレーターミナル）」があり、インベントリにある米国政府支給の<a href="us-government-supply-requisition.html" class="auto-link">支援物資の申請用ホロテープ</a>をロードして、救援物資を要請させる（投下させる）ことができます。</p>
<p>南東の隅にはロッカー一式があり、西側の入り口の真ん前にある棚には2つの<a href="first-aid-box.html" class="auto-link">救急箱</a>（そのうち1つは施錠：Picklock 0）があります。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="automated-record-0000002.html" class="auto-link">自動記録文 0000002</a></b>（ホロテープ）：中継タワーのフェンスから道沿いにすぐ西の地面にある、不自然に土が盛られた場所に半分埋まっている「Mysterious Box（謎の箱）」に指定された木枠の箱の中に置かれています。</li>
    <li><b><a href="volunteers-needed-note.html" class="auto-link">ボランティア募集中！</a></b>（メモ）：中継タワーの外側にある廃墟の家（キャンパーの小屋）の近くにある、「レスポンダーのボランティア」の死体のインベントリにあります。</li>
    <li><a href="fusion-core.html" class="auto-link">フュージョン・コア</a>：修理可能なターミナルに最も近い壁沿いにある、中央制御パネル（コンソール）の装置の上部に配置されています。</li>
</ul>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="request-government-air-drop.html" class="auto-link">Request Government Air Drop</a></b>：中継タワーの内部のターミナルで「US政府の支援物資の要請」ホロテープを使用することで発生・完了するクエストです。</li>
    <li><b><a href="always-vigilant.html" class="auto-link">Always Vigilant</a></b>：中継タワーのターミナルを修理しにやってくるプロテクトロンの「ローバー」を、修理完了まで敵から防衛するパブリックイベントです。</li>
    <li><b><a href="hunter-for-hire.html" class="auto-link">Hunter for Hire</a></b>：Wastelandersのメインクエストの一部。中継タワーのターミナルに「放送用テープ（broadcast tape）」をロードして電波をハッキングする目標として訪れます。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                森林地帯の中央エリアの山頂にある中継タワーです。監督官のキャンプなどからも比較的近いです。<br>政府の支援要請ホロテープが使えるほか、建物の西側の地面には何かが意図的に隠されて埋められている形跡のある「意味深な木箱」があり、「自動記録文 0000002」のホロテープが入っています。これは、タワーの西側からエイリアンなどの未確認の「何か」がタワーの電波の様子を伺いにやってきている証拠でありエイリアンの存在を仄めかしていますが、現在では定期イベント『Invaders from Beyond』の実装によってエイリアン自体が非常におなじみになってしまったため、少し過去の古き良きフレーバーとなっていますね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Relay Tower EM-B1-27</h3><img src="images/note_extracted/relay-tower-em-b1-27/img_main.png" alt="Relay Tower EM-B1-27"><div class="infobox-row"><span class="infobox-label">種類</span><span>中継塔（タワー）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="scorched.html" class="auto-link">スコーチ</a>等</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Relay Tower EM-B1-27<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">中継タワーEM-B1-27</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_relay_tower_em_b1_27" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Relay Tower EM-B1-27<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">中継タワーEM-B1-27</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Relay_tower_EM-B1-27" target="_blank" rel="noopener">Relay tower EM-B1-27</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_relay_tower_em_b1_27';const _n='Relay Tower EM-B1-27';const _u='relay-tower-em-b1-27.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Relay Tower EM-B1-27</h3><img src="images/note_extracted/relay-tower-em-b1-27/img_main.png" alt="Relay Tower EM-B1-27"><div class="infobox-row"><span class="infobox-label">種類</span><span>中継塔（タワー）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="scorched.html" class="auto-link">スコーチ</a>等</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Relay Tower EM-B1-27<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">中継タワーEM-B1-27</span></h1>");

fs.writeFileSync('f:/Fallout/relay-tower-em-b1-27.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

中継タワーEM-B1-27（Relay Tower EM-B1-27）
https://www.fallout-jp.com/relay-tower-em-b1-27.html

概要

森林地帯の中央エリアの山頂にある、各種中継ターミナルが備わったおなじみのタワー。

---

💭 感想

タワーの西側の地面には何かが意図的に隠されて埋められている形跡のある「意味深な木箱」があり、宇宙人到来を告げる「自動記録文 0000002」が入っています。現在ではイベント等でエイリアンが当たり前になってしまったため、ここは古き良きフレーバーとなっていますね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/relay-tower-em-b1-27', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/relay-tower-em-b1-27/post.md', postContent);

console.log('Done.');
