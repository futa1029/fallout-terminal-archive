const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/jooky-hair-salon.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ジューキー・ヘアサロン（Jooky Hair Salon）</b>は、アパラチアの<a href="watoga-underground.html" class="auto-link">ワトガ・アンダーグラウンド</a>にある<a href="pre-war-companies.html" class="auto-link">戦前の企業</a>および<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>背景</h2>
<p>ワトガ・コンプレックス内にあるヘアケアおよびスキンケア施設であり、<a href="great-war.html" class="auto-link">最終戦争</a>の前は駐車場の利用客向けにサービスを提供していました。</p>
<p>施設の管理ターミナルには、彼らの目的が単なる美容室以上のものであると書かれており、「これはセラピーであり、精神的指導であり、私たちのヘア・ジャーニー（髪の旅）をともに歩みながら心や思考を形作るチャンスなのです」と記載されています。<br>このターミナルには他にも、予約の無断キャンセル（No-show）に厳格に対処するポリシーや、新商品のセールストークに関するガイドラインなどの方針が詳しく記録されています。</p>

            <h2>製品・サービス</h2>
<p>先月に特集した製品を続けて販売しないという厳格なガイドラインに加えて、管理運営側は従業員に対し、新商品を売り込む最善のテクニックとして「自然に商品の話題を会話に組み込むこと」や「製品を描写する際の形容詞の具体的な選び方」を指示していました。</p>
<ul class="loot-list">
    <li><b>ジューキー・クランベリー・フェイスピール（JOOKY cranberry face peel）</b>：<br>推奨されるキーワードは「爽やかな」「素晴らしい」「無機質の」「グルテンフリーの」。</li>
    <li><b>プロクレイム・ヘアカラー製品（PROCLAIM hair color products）</b>：<br>推奨されるキーワードは「鮮やかな」「変身できる」「神聖な」。</li>
    <li><b>シャスボ・フェイシャルマッサージシステム（SHASBO facial massage system）</b>：<br>推奨されるキーワードは「賢い」「インスピレーションを与える」「振動的な」。</li>
</ul>

            <h2>レイアウト</h2>
<p><a href="watoga-underground.html" class="auto-link">ワトガ・アンダーグラウンド</a>内の、ガレージAとガレージBの間に位置する商業エリアの中にあります。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ワトガ・アンダーグラウンドの駐車場の間の商業エリアにある、戦前のヘアサロン跡地です。<br>このロケーション内のターミナルからは、客に新商品を売りつけるためのマニュアルや、美容室の方針がカルトめいたもの（「髪の旅を通じて心を形作る」など）になっている様子が窺えます。戦前からこういった洗脳まがいのセールストークや誇大広告が繰り広げられていたと思うと、なんともFallout世界の企業らしい狂気と皮肉を感じますね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Jooky Hair Salon</h3><img src="images/note_extracted/jooky-hair-salon/img_main.png" alt="Jooky Hair Salon"><div class="infobox-row"><span class="infobox-label">種類</span><span>美容室（戦前の企業）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="watoga-underground.html" class="auto-link">ワトガ・アンダーグラウンド</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Jooky Hair Salon<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ジューキー・ヘアサロン</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_jooky_hair" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Jooky Hair Salon<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ジューキー・ヘアサロン</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Jooky_Hair_Salon" target="_blank" rel="noopener">Jooky Hair Salon</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_jooky_hair';const _n='Jooky Hair Salon';const _u='jooky-hair-salon.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Jooky Hair Salon</h3><img src="images/note_extracted/jooky-hair-salon/img_main.png" alt="Jooky Hair Salon"><div class="infobox-row"><span class="infobox-label">種類</span><span>美容室（戦前の企業）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="watoga-underground.html" class="auto-link">ワトガ・アンダーグラウンド</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Jooky Hair Salon<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ジューキー・ヘアサロン</span></h1>");

fs.writeFileSync('f:/Fallout/jooky-hair-salon.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ジューキー・ヘアサロン（Jooky Hair Salon）
https://www.fallout-jp.com/jooky-hair-salon.html

概要

ワトガ・アンダーグラウンドにある戦前のヘアケア・スキンケア施設。利用客に対してセラピーや洗脳まがいのセールストークが行われていたことがターミナルから確認できます。

---

💭 感想

客に新商品を売りつけるためのマニュアルや、美容室の方針が少しカルトめいたもの（「髪の旅を通じて心を形作る」など）になっている様子が窺えます。戦前からこういったセールスや誇大広告が繰り広げられていたと思うと、なんともFallout世界の企業らしい狂気と皮肉を感じますね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/jooky-hair-salon', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/jooky-hair-salon/post.md', postContent);

console.log('Done.');
