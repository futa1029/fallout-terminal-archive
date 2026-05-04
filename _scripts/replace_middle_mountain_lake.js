const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/middle-mountain-lake.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ミドルマウンテン湖（Middle Mountain Lake）</b>は、アパラチアの<a href="savage-divide.html" class="auto-link">荒れた境域</a>（<a href="the-mire.html" class="auto-link">沼地地帯</a>の境界との間）の山中にある<a href="locations.html" class="auto-link">マークされないロケーション</a>です。</p>

            <h2>レイアウト</h2>
<p>ここは<a href="middle-mountain-cabins.html" class="auto-link">ミドルマウンテン・キャビン</a>（現ミドルマウンテン・ピットストップ）の北にある高原に位置しており、<a href="nukashine.html" class="auto-link">ヌカシャイン</a>を飲んだことによる「記憶喪失（ブラックアウト効果）」によってプレイヤーが転送（ワープ）する可能性のある36箇所の地点の1つでもあります。</p>

<p>山の台地にある、この絵画のように美しい浅い湖畔は、戦前は2人の親しい人々にとっての憩いの場でした。<br>岩場に残された衣服（釣り人の服、レンジャーの服）等から判断すると、少なくとも1人は釣り人で、もう1人はレンジャーだったようです。<br>まったく魚が釣れないことと、大量のビールに酔っ払ったことにより、彼らは服を脱いで新たな冒険・遊び（スキューバなど）を求めたようですが、それは彼らにとって悲劇的な結末を迎えることになりました。これらの釣り人と思われる頭角から岩に突き刺さっている2体のガイコツたちは「アルコールと水（水泳）が相容れない関係であるという戒め」の警告として、今も岩場にひっかかって残されています。</p>

<p>人々がアパラチアに戻ってきて以降（Wastelanders以降）は、湖の対岸にあるテントはスカベンジャーなどのNPCのランダムエンカウント地點として利用されるようになっています。<br>このテントの近くのデッキチェアの間では、空になった（ラベルのない）ヌカシャインの小瓶を常に見つけることができます。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ミドルマウンテン・ピットストップから北側の山をひたすら登っていくと到達するきれいな湖畔です。<br>戦前にお酒に酔っ払った挙句、服を脱いでそのまま湖に飛び込んで（スキューバのヘルメットだけ被って）頭から岩に突っ込んで死んだと思われる、2人の変な岩に突き刺さった死体があります。ヌカシャインで飛んでくるポイントの1つであるため、過去にここへやってきた生存者か誰かが、彼らと一緒にここでヌカシャインを飲んで（自分たちは気絶して）テントに置いていった名残なのかもしれませんね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Middle Mountain Lake</h3><img src="images/note_extracted/middle-mountain-lake/img_main.png" alt="Middle Mountain Lake"><div class="infobox-row"><span class="infobox-label">種類</span><span>湖畔（未マーク）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="savage-divide.html" class="auto-link">荒れた境域</a></span></div><div class="infobox-row"><span class="infobox-label">近隣の起点</span><span><a href="middle-mountain-cabins.html" class="auto-link">ミドルマウンテン・キャビン</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Middle Mountain Lake<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ミドルマウンテン湖</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_middle_mountain_lake" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Middle Mountain Lake<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">ミドルマウンテン湖</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Middle_Mountain_Lake" target="_blank" rel="noopener">Middle Mountain Lake</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_middle_mountain_lake';const _n='Middle Mountain Lake';const _u='middle-mountain-lake.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Middle Mountain Lake</h3><img src="images/note_extracted/middle-mountain-lake/img_main.png" alt="Middle Mountain Lake"><div class="infobox-row"><span class="infobox-label">種類</span><span>湖畔（未マーク）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="savage-divide.html" class="auto-link">荒れた境域</a></span></div><div class="infobox-row"><span class="infobox-label">近隣の起点</span><span><a href="middle-mountain-cabins.html" class="auto-link">ミドルマウンテン・キャビン</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Middle Mountain Lake<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ミドルマウンテン湖</span></h1>");

fs.writeFileSync('f:/Fallout/middle-mountain-lake.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ミドルマウンテン湖（Middle Mountain Lake）
https://www.fallout-jp.com/middle-mountain-lake.html

概要

ミドルマウンテン・ピットストップのさらに北側の山上にある、絵に描いたような美しい浅い湖。

---

💭 感想

戦前にお酒に酔っ払った挙句、服を脱いでそのまま湖に飛び込み、頭から岩に突っ込んで死んだと思われる2人の変な死体があります。ヌカシャインのワープポイントの1つなので、過去にここへやってきた誰かが彼らと一緒に飲んで残していった名残なのかもしれません。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/middle-mountain-lake', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/middle-mountain-lake/post.md', postContent);

console.log('Done.');
