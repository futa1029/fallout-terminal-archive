const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/bellhop.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ベルホップ（Bellhop）</b>は、アパラチアの<a href="pleasant-valley-ski-resort.html" class="auto-link">プレザントバレー・スキーリゾート</a>で見つけることができるユニークな<a href="protectron.html" class="auto-link">プロテクトロン</a>です。</p>

            <h2>背景と機能</h2>
<p>このプロテクトロンは、プレイヤーが所持している「<a href="pleasant-valley-claim-ticket.html" class="auto-link">プレザントバレーの引換券（Pleasant Valley claim ticket）</a>」と引き換えに、ランダムな報酬を提供してくれます。受付係として稼働しており、引換券を渡すと以下の報酬リストのいずれかがプレイヤーに与えられます。</p>
<ul class="loot-list">
    <li><b>レア報酬：</b>ファンシーポンプアクションショットガン、ファンシーシングルアクションリボルバー、ウェスタン衣装、ウェスタン衣装・チャップス付き、スキーウェアなど</li>
    <li><b>ジャンク品：</b>金時計、銀の懐中時計など</li>
    <li><b>その他：</b>戦前の紙幣</li>
</ul>

            <h2>豆知識（Behind the scenes）</h2>
<ul class="loot-list">
    <li>「引換券」を使った彼との全てのインタラクション（このベルホップの存在や報酬のデータ）はゲームの発売当初から存在していましたが、『Wastelanders（ウェイストランダーズ）』アップデートが配信されるまでは、「プレザントバレーの引換券」をゲーム内で正規に入手する方法は存在していませんでした（没データのようになっていました）。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                プレザントバレー・スキーリゾートの地下エリア（レイダーの拠点）で稼働し続けている特別なプロテクトロンです。<br>グールやスコーチの死体から手に入れた大量の引換券をちまちまと渡して、ユニークな武器（ファンシー・リボルバーやショットガン）を引き当てようと粘ったプレイヤーも少なくないはずです。「こんにちは。引換券はお持ちですか？」と延々と繰り返す彼のボイスが耳に残ります。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Bellhop</h3><img src="images/note_extracted/bellhop/img_main.png" alt="Bellhop"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>チケット引換係</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="pleasant-valley-ski-resort.html" class="auto-link">プレザントバレー・スキーリゾート</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Bellhop<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ベルホップ</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_bellhop" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Bellhop<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ベルホップ</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Bellhop" target="_blank" rel="noopener">Bellhop</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_bellhop';const _n='Bellhop';const _u='bellhop.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Bellhop</h3><img src="images/note_extracted/bellhop/img_main.png" alt="Bellhop"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>チケット引換係</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="pleasant-valley-ski-resort.html" class="auto-link">プレザントバレー・スキーリゾート</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Bellhop<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ベルホップ</span></h1>");

fs.writeFileSync('f:/Fallout/bellhop.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ベルホップ（Bellhop）
https://www.fallout-jp.com/bellhop.html

概要

プレザントバレー・スキーリゾートの地下で稼働している、チケット引換係のプロテクトロンです。

---

💭 感想

「こんにちは。引換券はお持ちですか？」と延々と繰り返す彼のボイスが耳にこびり付いている人も多いのではないでしょうか。彼に大量の引換券をちまちまと渡して、ユニークなショットガンやリボルバーを引き当てようと粘ったプレイヤーも少なくないはずです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/bellhop', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/bellhop/post.md', postContent);

console.log('Done.');
