const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/wixon-homestead.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ウィクソン農場（Wixon homestead）</b>は、アパラチアの<a href="the-forest.html" class="auto-link">森林地帯</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>背景</h2>
<p><a href="vault-76.html" class="auto-link">Vault 76</a>の下の谷にあるかなり広大な農地で、食料品の配達に専用の平台トラックを使用するなど、ウィクソン一家はかなり裕福で繁栄していました。</p>

            <h2>レイアウト</h2>
<p>この農場には4つの主要な建物があり、南側には2階建ての家と納屋、西側の丘の上には小屋と丸みを帯びた倉庫があります。<br>侵略してきた<a href="scorched.html" class="auto-link">スコーチ</a>を除けば、この農家の唯一の住人は、家の2階にいる猫の<a href="cheswick-2.html" class="auto-link">チェズウィック2世（Cheswick II）</a>だけです。<br>小屋の中には細工師の作業台があり、倉庫の中には<a href="weapons-workbench.html" class="auto-link">武器作業台</a>があります。<a href="armor-workbench.html" class="auto-link">アーマー作業台</a>は、2つのサイロの近くの納屋にあります。<a href="water-pump.html" class="auto-link">ウォーターポンプ</a>もここにあります。家の北側の庭では、ニンジン（4か所）とメロン（2か所）を採取することができます。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b><a href="message-to-sammy.html" class="auto-link">サミーへのメッセージ（Message to Sammy）</a></b>：農家の2階にあるメモ。</li>
    <li><b><a href="vault-tec-bobblehead.html" class="auto-link">ボブルヘッド</a></b>（スポーン候補）：格納庫スペースの大型収納棚近く、樽の上に置かれることがあります。</li>
    <li><b><a href="magazines.html" class="auto-link">雑誌</a></b>（スポーン候補）：農家の2階の寝室東側の壁際、装飾された小さなテーブルの上に置かれることがあります。</li>
    <li><b><a href="plans.html" class="auto-link">アーマー設計図</a>とモジュール</b>（スポーン候補）：
        <ul>
            <li>格納庫内の武器作業台の横にある金属棚の上。</li>
            <li>納屋の北東の角にある金属棚の上（アーマー設計図）。</li>
            <li>納屋内のアーマー作業台の右にある金属製の樽の上（アーマーモジュール）。</li>
        </ul>
    </li>
    <li><b>武器モジュール</b>（スポーン候補）：格納庫内の武器作業台横にある金属棚の上。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                Vault 76から出てすぐ南に位置する農場で、序盤のプレイヤーにとって貴重な物資補給ポイントであり、スコーチとの最初の本格的な交戦場所にもなりやすいロケーションです。<br>家の2階には猫の「チェズウィック2世」がいますが、飼い主のウィクソン家の人々がスコーチ化してしまった後も、一匹で留守番をしているかと思うと少し切ないですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Wixon homestead</h3><img src="images/note_extracted/wixon-homestead/img_main.png" alt="Wixon homestead"><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="scorched.html" class="auto-link">スコーチ</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Wixon homestead<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウィクソン農場</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_wixon_homestead" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Wixon homestead<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ウィクソン農場</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Wixon_homestead" target="_blank" rel="noopener">Wixon homestead</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_wixon_homestead';const _n='Wixon homestead';const _u='wixon-homestead.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Wixon homestead</h3><img src="images/note_extracted/wixon-homestead/img_main.png" alt="Wixon homestead"><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="scorched.html" class="auto-link">スコーチ</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Wixon homestead<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウィクソン農場</span></h1>");

fs.writeFileSync('f:/Fallout/wixon-homestead.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ウィクソン農場（Wixon homestead）
https://www.fallout-jp.com/wixon-homestead.html

概要

Vault 76を出てすぐ南にある農場。かつては裕福な家族が住んでいましたが、現在はスコーチに占拠されています。

---

💭 感想

序盤のプレイヤーにとって貴重な物資補給ポイントであり、スコーチとの最初の本格的な交戦場所にもなりやすい場所ですね。家の2階には猫のチェズウィック2世がいますが、飼い主がスコーチ化した後も留守番をしているかと思うと少し切ないですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/wixon-homestead', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/wixon-homestead/post.md', postContent);

console.log('Done.');
