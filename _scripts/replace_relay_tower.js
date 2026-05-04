const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/relay-tower-el-b1-02.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>リレータワー EL-B1-02（Relay tower EL-B1-02）</b>は、アパラチアの<a href="savage-divide.html" class="auto-link">荒れた境域</a>にある<a href="locations.html" class="auto-link">通信中継塔（ロケーション）</a>です。</p>

            <h2>レイアウト</h2>
<p>未舗装の道路の突き当りにあるこの通信中継塔は、フェンスで囲まれ、倒木や<a href="firecracker-berry.html" class="auto-link">爆竹ベリー</a>などの自生植物に囲まれています。<br>建物の外にはオフロードカーが停まっています。<br>施設内部へ入るための仮置きスロープとして外れたドアが使われており、周囲の敷地内は<a href="automated-turret.html" class="auto-link">レーザータレット</a>と<a href="scorched.html" class="auto-link">スコーチ</a>によって守られています。</p>
<p>内部に入ると、大部分が廃墟と化した中でいくつか残存している棚や収納ボックスが並んでいます。<br>ここには <a href="relay-tower-el-b1-02-terminal-entries.html" class="auto-link">ターミナル</a>が2台あり、1台は「緊急管理システム」のリレー用、もう1台はその反対側にある「保守担当者用」のターミナルです。<br>北の壁沿いには5つの簡易ベッド（コット）が並んでおり、そのうちのいくつかには<a href="footlocker.html" class="auto-link">フットロッカー（トランク）</a>が備え付けられています。<br>外に戻ると建物の屋上に上がるための階段がありますが、上には特に特筆すべきものはありません（景観を楽しむことはできます）。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b><a href="vault-tec-bobblehead.html" class="auto-link">ボブルヘッド</a></b>（スポーン候補）：<br>中継塔内部、中央の柱の向かい側。保守担当者用ターミナルの横にある金属製デスクの上。</li>
    <li><b><a href="magazines.html" class="auto-link">雑誌</a></b>（スポーン候補）：<br>中継塔内部、西側の壁の向かい。青いコンソール群の真上。</li>
    <li><b><a href="stealth-boy.html" class="auto-link">ステルスボーイ</a></b>：<br>中継塔内部、鍵のかかったフットロッカーが置かれたコット（簡易ベッド）の上。</li>
</ul>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="request-government-air-drop.html" class="auto-link">Request Government Air Drop</a></b>：<br>このリレータワーのターミナル（緊急管理システム）に「<a href="us-government-supply-requisition.html" class="auto-link">米国政府の支援物資の要請（ホロテープ）</a>」をロードさせることで、ランダムな投下ポイントに物資を要請可能です。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                荒れた境域にある通信中継施設跡地（ファストトラベル地点）です。<br>他の多くの中継タワーと同じく、米軍政府の支援物資（投下物資）を要請するための機能や、周辺エリアの未発見ロケーションをマップに自動登録するためのスキャンコンソールが利用できます。<br>内部には戦前の職員たちが絶望的な状況下で泊まり込みで通信を維持しようとしていたであろう簡易ベッドの痕跡などが残されており、Falloutらしい物悲しい雰囲気が漂っていますね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Relay Tower EL-B1-02</h3><img src="images/note_extracted/relay-tower-el-b1-02/img_main.png" alt="Relay Tower EL-B1-02"><div class="infobox-row"><span class="infobox-label">種類</span><span>通信中継塔</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="savage-divide.html" class="auto-link">荒れた境域</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Relay Tower EL-B1-02<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">リレータワー EL-B1-02</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_relay_tower_el_b1_02" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Relay Tower EL-B1-02<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">リレータワー EL-B1-02</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Relay_tower_EL-B1-02" target="_blank" rel="noopener">Relay Tower EL-B1-02</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_relay_tower_el_b1_02';const _n='Relay Tower EL-B1-02';const _u='relay-tower-el-b1-02.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Relay Tower EL-B1-02</h3><img src="images/note_extracted/relay-tower-el-b1-02/img_main.png" alt="Relay Tower EL-B1-02"><div class="infobox-row"><span class="infobox-label">種類</span><span>通信中継塔</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="savage-divide.html" class="auto-link">荒れた境域</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Relay Tower EL-B1-02<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">リレータワー EL-B1-02</span></h1>");

fs.writeFileSync('f:/Fallout/relay-tower-el-b1-02.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

リレータワー EL-B1-02（Relay tower EL-B1-02）
https://www.fallout-jp.com/relay-tower-el-b1-02.html

概要

荒れた境域にある通信中継施設跡地（ファストトラベル地点）です。米軍政府の投下物資要請や機能スキャンが利用できます。

---

💭 感想

内部には戦前の職員たちが絶望的な状況下で泊まり込みで通信を維持しようとしていたであろう簡易ベッドの痕跡などが残されており、Falloutらしい物悲しい雰囲気が漂っていますね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/relay-tower-el-b1-02', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/relay-tower-el-b1-02/post.md', postContent);

console.log('Done.');
