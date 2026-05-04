const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/vera-fallout-76.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ヴェラ（Vera / AM-12）</b>は、<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>で見つけることができる<a href="assaultron.html" class="auto-link">アサルトロン</a>です。</p>

            <h2>背景</h2>
<p>ヴェラは、ホワイトスプリング・リゾートのスパ（美容・リラクゼーション施設）における案内係・接客ロボットを務めています。<br>彼女は元々、強すぎるマッサージによって顧客の脊髄損傷のリスクを引き起こし問題になっていた<a href="lotus.html" class="auto-link">ロータス</a>の代わりとして、後任として配置されたロボットでした。<br>しかしアサルトロンはそもそも繊細な圧力を感知するセンサーを持たないため、（彼女への交代による一時しのぎの後）ホワイトスプリングでのロボットを起用したカイロプラクティックやマッサージのサービスは最終的に完全に中止されました。<br>現在の彼女の元を訪れると、「脊髄挫傷の報告があったため、ロボットのカイロプラクティックおよびマッサージサービスは現在ご利用いただけません」と案内してくれます。</p>

            <h2>豆知識（Behind the scenes）</h2>
<ul class="loot-list">
    <li>彼女の名前（Vera）は、同僚のロータスに代わって配属されたロボット「<a href="aloe.html" class="auto-link">アロエ（Aloe）</a>」の名前と組み合わせることで、現実世界におけるスキンケアの用途で広く知られる植物「アロエベラ（Aloe vera）」の言葉遊びになるように名付けられています。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ホワイトスプリング避難所のスパエリアで稼働している、受付係のアサルトロンです。<br>「アロエ」とのコンビで（美容で有名な）アロエベラの名前をもじっているというお茶目な背景設定を持つロボットですが、「殺戮マシンである強力なアサルトロンがマッサージやカイロプラクティックを試みて、客に大事故（脊髄損傷）を引き起こす」というブラックジョークも盛り込まれており、Fallout世界の企業らしい笑えない狂気が詰まっていますね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Vera</h3><img src="images/note_extracted/vera-fallout-76/img_main.png" alt="Vera"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="assaultron.html" class="auto-link">アサルトロン</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>スパ案内係</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Vera<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ヴェラ</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_vera" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Vera<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ヴェラ</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Vera_(Fallout_76)" target="_blank" rel="noopener">Vera</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_vera';const _n='Vera';const _u='vera-fallout-76.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Vera</h3><img src="images/note_extracted/vera-fallout-76/img_main.png" alt="Vera"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="assaultron.html" class="auto-link">アサルトロン</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>スパ案内係</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Vera<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ヴェラ</span></h1>");

fs.writeFileSync('f:/Fallout/vera-fallout-76.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ヴェラ（Vera / ヴェラ）
https://www.fallout-jp.com/vera-fallout-76.html

概要

ホワイトスプリングのスパの受付係を務めるアサルトロン。

---

💭 感想

「アロエ」とのコンビでアロエベラの名前をもじっているというお茶目な背景設定を持つロボットですが、「殺戮マシンである強力なアサルトロンがマッサージを試みて客に大事故（脊髄損傷）を引き起こす」というブラックジョークも盛り込まれています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/vera-fallout-76', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/vera-fallout-76/post.md', postContent);

console.log('Done.');
