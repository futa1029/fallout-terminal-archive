const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/relay-tower-hn-b1-12.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>リレータワー HN-B1-12（Relay tower HN-B1-12）</b>は、アパラチア西部にあたる<a href="the-forest.html" class="auto-link">森林地帯</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>レイアウト</h2>
<p>このロケーションの施設は、戦前は<a href="united-states-armed-forces.html" class="auto-link">アメリカ軍</a>部隊によって管理されていた標準的な規格の無線中継塔（リレータワー）であり、建物の各入り口などの周囲を複数の<a href="machinegun-turret.html" class="auto-link">マシンガンタレット</a>が守っています。</p>

<p>施設の内部には青い<a href="system-relay-terminal.html" class="auto-link">システム中継タワーのターミナル</a>があり、ここに（各種コンテナから入手できるホロテープである）「US政府の支援物資要請」ホロテープをロードすることで、支援物資の投下を要請することができます。<br>また、南西の壁沿いにはミリタリーロッカーの列が並んでおり、部屋の隅には鍵のかかった<a href="footlocker.html" class="auto-link">フットロッカー（Footlocker）</a>（開錠にはPicklockスキルレベル0が必要）と<a href="ammo-box.html" class="auto-link">弾薬箱</a>が配置されています。<br>さらに、南東側の入り口の隣の壁には<a href="first-aid.html" class="auto-link">救急箱</a>も設置されています。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="letter-to-linda.html" class="auto-link">リンダへの手紙</a></b>（メモ）：道路を下った先にある、墜落・大破した軍用<a href="off-road-vehicle.html" class="auto-link">オフロード車</a>のそばで死亡しているガイコツ（兵士）の手に握られています。</li>
    <li><b><a href="us-government-supply-requisition.html" class="auto-link">US政府の支援物資要請</a></b>（ホロテープ）：無線機のある金属製の棚の後ろにある、青いコンソールの上に置かれています。</li>
    <li>ランダムな<a href="vault-tec-bobblehead.html" class="auto-link">ボブルヘッド</a>：建物の内部、小型メインフレームのコンピューターバンクの上に配置される可能性があります。</li>
    <li>ランダムな<a href="magazines.html" class="auto-link">雑誌（マガジン）</a>：建物の内部、中央の柱に接続されているメインフレーム・コンピューターのターミナルの上（中央の柱を見た状態で南西向き）に配置される可能性があります。</li>
</ul>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="request-government-air-drop.html" class="auto-link">Request Government Air Drop</a></b>：<a href="us-government-supply-requisition.html" class="auto-link">US政府の支援物資要請</a>ホロテープをリレータワーのターミナルで使用・ロードすることで発生する支援物資確保クエストです。</li>
    <li><b><a href="early-warnings.html" class="auto-link">Early Warnings</a></b>：フリーステイツのメインクエスト。アビゲイルの指示で各種のモーターを見つける過程で訪れることになります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                森林地帯から積灰の山の境界近くにある、かつてアメリカ軍が管理していた標準的な機能をもつ通信中継施設（リレータワー）です。<br>このロケーションを下った先の道路で死亡している軍人のガイコツからは、おそらく最終戦争によってここで息絶えてしまったのであろう、愛する人へ向けた悲痛な手紙「リンダへの手紙」を拾うことができます。<br>中継タワーとしては、近隣でのレベル上げや序盤でアメリカ政府の支援物資（補給物資投下）を要請するために訪れる定番のスポットですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Relay tower HN-B1-12</h3><img src="images/note_extracted/relay-tower-hn-b1-12/img_main.png" alt="Relay tower HN-B1-12"><div class="infobox-row"><span class="infobox-label">種類</span><span>中継タワー（通信施設）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">占拠派閥</span><span><a href="super-mutant.html" class="auto-link">スーパーミュータント</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="early-warnings.html" class="auto-link">Early Warnings</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Relay tower HN-B1-12<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">リレータワー HN-B1-12</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_relay_tower_hn_b1_12" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Relay tower HN-B1-12<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">リレータワー HN-B1-12</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Relay_tower_HN-B1-12" target="_blank" rel="noopener">Relay tower HN-B1-12</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_relay_tower_hn_b1_12';const _n='Relay tower HN-B1-12';const _u='relay-tower-hn-b1-12.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Relay tower HN-B1-12</h3><img src="images/note_extracted/relay-tower-hn-b1-12/img_main.png" alt="Relay tower HN-B1-12"><div class="infobox-row"><span class="infobox-label">種類</span><span>中継タワー（通信施設）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">占拠派閥</span><span><a href="super-mutant.html" class="auto-link">スーパーミュータント</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="early-warnings.html" class="auto-link">Early Warnings</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Relay tower HN-B1-12<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">リレータワー HN-B1-12</span></h1>");

fs.writeFileSync('f:/Fallout/relay-tower-hn-b1-12.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

リレータワー HN-B1-12（Relay tower HN-B1-12）
https://www.fallout-jp.com/relay-tower-hn-b1-12.html

概要

森林地帯から積灰の山の境界近くにある通信中継施設（リレータワー）。

---

💭 感想

序盤でアメリカ政府の支援物資を要請するために訪れる定番のスポットです。このタワーを下った先の道路で死亡している軍事車両のガイコツからは、おそらく最終戦争によってここで息絶えてしまったのであろう、愛する人へ向けた悲痛な手紙「リンダへの手紙」を拾い上げる事ができ、初期のFallout 76らしい悲しさを感じます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/relay-tower-hn-b1-12', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/relay-tower-hn-b1-12/post.md', postContent);

console.log('Done.');
