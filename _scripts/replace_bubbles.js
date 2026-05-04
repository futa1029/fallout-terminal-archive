const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/bubbles.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>バブルス（Bubbles）</b>は、アパラチアの<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>（<a href="the-whitespring-refuge.html" class="auto-link">ホワイトスプリング避難所</a>）の内部にある「<a href="giuseppes-curios.html" class="auto-link">ジュゼッペのコレクション</a>」で、<a href="vendors.html" class="auto-link">ベンダー</a>として機能・稼働している<a href="miss-nanny.html" class="auto-link">ミス・ナニー</a>型のロボットです。</p>

            <h2>背景</h2>
<p>バブルスは、ホワイトスプリング・リゾート内に配置されているのミス・ナニーの個体であり、様々な種類の<a href="nuka-cola.html" class="auto-link">ヌカ・コーラ</a>を専門に扱うベンダーです。</p>

<p>バブルスは、（戦前のテーマパークである）<a href="nuka-world.html" class="auto-link">ヌカ・ワールド</a>でしか見つけることのできないような、地域限定の大変珍しいフレーバーを販売しています。<br>この個体はまた、特別な独占販売イベントのプロモーションの一環として<a href="nuka-cola-quantum.html" class="auto-link">ヌカ・コーラ・クアンタム</a>などの製品も提供するようにプログラムされています。</p>
<p>・「ホワイトスプリングの独占販売。最新の驚異的なコーラ、ヌカ・コーラ・クアンタムを先行リリース！」<br>・「何か違うものをお探しですか？ヌカ・ワールド以外では見られない地域限定のフレーバーをご用意しています」</p>

            <h2>販売されるアイテム</h2>
<p>バブルスのインベントリからは、<a href="nuka-cola-orange.html" class="auto-link">ヌカ・コーラ・オレンジ</a>、<a href="nuka-grape.html" class="auto-link">ヌカ・グレープ</a>、<a href="nuka-cola-dark.html" class="auto-link">ヌカ・コーラ・ダーク</a>など、戦後のアパラチアでは通常は見つけるのが非常に難しい「珍しいヌカ・コーラのバリエーション」を常時・確実にキャップで購入することができます。</p>
<ul class="loot-list">
    <li>各種ヌカ・コーラ製品</li>
    <li>（ベンダー共有の1400キャップ枠を所持）</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                「ホワイトスプリング避難所」の内部の隅っこ（切手ベンダーであるジュゼッペの横のソーダファウンテン）にあるヌカ・コーラ専用ベンダーです。<br>珍しい種類のヌカ・コーラである（オレンジ、ワイルド、グレープ等）を各種ほぼ確定で仕入れて売ってくれるため、日々のデイリーチャレンジの課題クリアのためや、各種のヌカ・コーラをCAMPにコレクションしたいプレイヤーにとって、非常に重宝するロボットです。<br>可愛らしいミス・ナニーの女性の音声で明るくコーラ製品の案内をしてくれるため、賑やかな避難所の癒やし枠の1人でもありますね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Bubbles</h3><img src="images/note_extracted/bubbles/img_main.png" alt="Bubbles"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="miss-nanny.html" class="auto-link">ミス・ナニー</a>（ベンダー）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="the-whitespring-refuge.html" class="auto-link">ホワイトスプリング避難所</a></span></div><div class="infobox-row"><span class="infobox-label">取引</span><span>各種ヌカ・コーラ製品</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Bubbles<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">バブルス</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_bubbles" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Bubbles<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">バブルス</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Bubbles" target="_blank" rel="noopener">Bubbles</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_bubbles';const _n='Bubbles';const _u='bubbles.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Bubbles</h3><img src="images/note_extracted/bubbles/img_main.png" alt="Bubbles"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="miss-nanny.html" class="auto-link">ミス・ナニー</a>（ベンダー）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="the-whitespring-refuge.html" class="auto-link">ホワイトスプリング避難所</a></span></div><div class="infobox-row"><span class="infobox-label">取引</span><span>各種ヌカ・コーラ製品</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Bubbles<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">バブルス</span></h1>");

fs.writeFileSync('f:/Fallout/bubbles.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

バブルス（Bubbles）
https://www.fallout-jp.com/bubbles.html

概要

ホワイトスプリング避難所の内部にある隠れた「ヌカ・コーラ」専門のベンダーロボット。

---

💭 感想

オレンジ、ワイルド、グレープ、ダークなどの非常に「珍しい種類のヌカ・コーラ」を各種確定で仕入れて売ってくれるため、日々のデイリーチャレンジの課題クリアや、CAMPのディスプレイ目当てのプレイヤーにとって非常に重宝するロボットです。可愛らしいミス・ナニーの癒やし枠ですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/bubbles', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/bubbles/post.md', postContent);

console.log('Done.');
