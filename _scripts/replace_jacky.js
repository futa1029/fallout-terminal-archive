const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/jacky-wastelanders.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ジャッキー（Jacky）</b>は、アパラチアにおけるレイダーギャング「<a href="free-radicals.html" class="auto-link">フリー・ラジカルズ</a>」のメンバーの一人です。<br>（※<a href="wastelanders.html" class="auto-link">Wastelanders</a>アップデートで追加）</p>

            <h2>背景</h2>
<p>ジャッキーはあまり会話を好まない性格で、プレイヤーの周りでも余計な邪魔をされたくないのか、よそよそしく無愛想に振る舞います。<br>彼は大半の時間を<a href="wv-lumber-co.html" class="auto-link">ウエストバージニア木材会社</a>の地下エリアで過ごしており、ギャングのリーダーである<a href="roper.html" class="auto-link">ローパー</a>の専属ボディーガードとして行動しています。<br>「ボスはローパーだ。俺はあんたみたいなのが妙なマネをしないか見張ってるだけだ」</p>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="hunter-for-hire.html" class="auto-link">Hunter for Hire</a></b>：ジャッキーはローパーを護衛するために隣に立って登場します。</li>
    <li><b><a href="the-elusive-crane.html" class="auto-link">The Elusive Crane</a></b>：もしプレイヤーが（ローパーとの交渉などを経て）フリー・ラジカルズに加わっていた場合、ジャッキーはギャングの他のメンバーと一緒に（<a href="the-wayward.html" class="auto-link">ザ・ウェイワード</a>の）ダッチェスに借金の取り立てを迫るために訪ねてきます。</li>
</ul>

            <h2>所持品</h2>
<ul class="loot-list">
    <li><b><a href="harness.html" class="auto-link">ハーネス</a></b></li>
    <li><b><a href="raider-armor.html" class="auto-link">レイダーアーマー</a></b>各種パーツ</li>
    <li>ランダム化された戦利品（死亡時）</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ウエストバージニア木材会社の地下エリアでリーダーのローパーを警護しているフリー・ラジカルズ系のメンバーです。<br>名前のある固有キャラクターではありますが、特に彼専用のイベントや深いバックストーリーが語られるわけでもなく、「ただ護衛としてそこに立って睨みをきかせているだけ」のモブに近い不遇なNPCです。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Jacky</h3><img src="images/note_extracted/jacky-wastelanders/img_main.png" alt="Jacky"><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="free-radicals.html" class="auto-link">フリー・ラジカルズ</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>ボディーガード</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="wv-lumber-co.html" class="auto-link">ウエストバージニア木材会社</a><br><a href="the-wayward.html" class="auto-link">ザ・ウェイワード</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Jacky<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ジャッキー</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_jacky_wastelanders" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Jacky<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ジャッキー</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Jacky_(Wastelanders)" target="_blank" rel="noopener">Jacky</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_jacky_wastelanders';const _n='Jacky';const _u='jacky-wastelanders.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Jacky</h3><img src="images/note_extracted/jacky-wastelanders/img_main.png" alt="Jacky"><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="free-radicals.html" class="auto-link">フリー・ラジカルズ</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>ボディーガード</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="wv-lumber-co.html" class="auto-link">ウエストバージニア木材会社</a><br><a href="the-wayward.html" class="auto-link">ザ・ウェイワード</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Jacky<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ジャッキー</span></h1>");

fs.writeFileSync('f:/Fallout/jacky-wastelanders.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ジャッキー（Jacky）
https://www.fallout-jp.com/jacky-wastelanders.html

概要

ウエストバージニア木材会社の地下エリアでリーダーのローパーを警護しているフリー・ラジカルズのメンバー。

---

💭 感想

名前のある固有キャラクターではありますが、特に彼専用の深いバックストーリーが語られるでもなく、「ただ護衛としてそこに立って睨みをきかせているだけ」のモブに近い不遇なNPCです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/jacky-wastelanders', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/jacky-wastelanders/post.md', postContent);

console.log('Done.');
