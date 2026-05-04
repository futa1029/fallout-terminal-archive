const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/woods-estate.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ウッズ・エステート（Woods Estate）</b>は、アパラチア北部の<a href="toxic-valley.html" class="auto-link">毒の谷</a>地域にある<a href="locations.html" class="auto-link">ロケーション</a>（家屋敷の跡地）です。</p>

            <h2>背景</h2>
<p>ウッズ・エステートは、戦前にアーサー・ウッド（Arthur Wood）、モリー・ウッド（Molly Wood）、そして（その10歳の息子である）<a href="freddy-wood.html" class="auto-link">フレディ・ウッド</a>が住んでいた家族の邸宅でした（<a href="woods-estate-terminal-entries.html" class="auto-link">ウッズ・エステートのターミナル</a>より）。</p>
<p>当主のアーサー・ウッドはアメリカ政府（財務省）の要職に就いており、秘密裏に行われていた「<a href="vault-79.html" class="auto-link">Vault 79</a>」の建設計画を監査していましたが、その中で一部の政府関係者たちが企てた資金の横領工作やストライキについて嗅ぎ回りました。<br>そして、その暗殺（政治的な陰謀）の脅迫として、工作員のオーティス・パイク（Otis Pike）らによる息子フレディ・ウッドの誘拐事件が引き起こされます。</p>
<p>フレディ・ウッドはその後、機転を利かせてオーティスによる誘拐から逃れることに成功し、奇しくも<a href="great-war.html" class="auto-link">爆弾が落ちる（最終戦争）</a>の直前にこの家族の家へと生還しました。<br>その後、この家において父親（アーサー）の事前手配によって政府や<a href="vault-tec-corporation.html" class="auto-link">Vault-Tec</a>の担当者がフレディを迎えに来て、彼を無事に地元のVaultへと連れて行った場所でもあります（<a href="freddys-hasty-note.html" class="auto-link">フレディの走り書き</a>より）。</p>

            <h2>レイアウト</h2>
<p>ウッズ・エステートは2102年までにその大部分が破壊されており、崩れかけた二階建てのメインの家、温室（グリーンハウス）、そして入ることのできないガレージで構成されています。</p>

<p>温室の中には1体の<a href="petrified-corpse.html" class="auto-link">石化した死体（スコーチスタチュー）</a>と、<a href="flower-pot.html" class="auto-link">植木鉢</a>や<a href="bag-of-fertilizer.html" class="auto-link">肥料の袋</a>などのガーデニング関連の様々なジャンク品が含まれています。<br>メインの家（母屋）の内部はすでに焼け跡になっており、注目すべきアイテムは3つの<a href="ammo-box.html" class="auto-link">弾薬箱（Ammo box）</a>、<a href="woods-estate-terminal-entries.html" class="auto-link">ターミナル</a>、そして上階のドレッサーの上にあるフレディ・ウッドの（男の子の）写真くらいしかありません。<br>数人の<a href="crater-raiders.html" class="auto-link">クレーター・レイダー</a>たちが温室の裏手周辺をうろつき、コンテナをあさっていることがあります。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="freddys-hasty-note.html" class="auto-link">フレディの走り書き</a></b>（メモ）：2階の上階にあるターミナルが置かれた机の中にあり、クエスト「<a href="cold-case.html" class="auto-link">Cold Case</a>」の中で入手することができます。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                メインクエストの1つである「Cold Case」で重要な手がかりとなる、誘拐された少年フレディ・ウッドの実家の跡地です。<br>このロケーションに残されたターミナルやメモを通していくことで、父親のアーサーが暗殺されそうになっていた政府の政治的陰謀（Vault 79関連）のスケールの大きさや、不穏な足跡、そして最終的にフレディがVaultに逃げ込んで戦火を生き延びた顛末などの背景ロアをここで知ることができます。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Woods Estate</h3><img src="images/note_extracted/woods-estate/img_main.png" alt="Woods Estate"><div class="infobox-row"><span class="infobox-label">種類</span><span>集落・農場</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の谷</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="cold-case.html" class="auto-link">Cold Case</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Woods Estate<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウッズ・エステート</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_woods_estate" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Woods Estate<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ウッズ・エステート</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Woods_Estate" target="_blank" rel="noopener">Woods Estate</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_woods_estate';const _n='Woods Estate';const _u='woods-estate.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Woods Estate</h3><img src="images/note_extracted/woods-estate/img_main.png" alt="Woods Estate"><div class="infobox-row"><span class="infobox-label">種類</span><span>集落・農場</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の谷</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="cold-case.html" class="auto-link">Cold Case</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Woods Estate<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウッズ・エステート</span></h1>");

fs.writeFileSync('f:/Fallout/woods-estate.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ウッズ・エステート（Woods Estate）
https://www.fallout-jp.com/woods-estate.html

概要

メインクエスト「Cold Case」で訪れる、誘拐された少年フレディ・ウッドの実家の跡地。

---

💭 感想

父親のアーサーは「Vault 79」の建設に関わっていた政府の要人であり、その子供であるフレディを誘拐・暗殺しようとするオーティス達による政治的陰謀の足跡や、最終的に彼が奇跡的にVaultに逃げ込んで助かった顛末などの背景ロアをここで知ることができます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/woods-estate', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/woods-estate/post.md', postContent);

console.log('Done.');
