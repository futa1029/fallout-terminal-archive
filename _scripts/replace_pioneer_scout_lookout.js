const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/pioneer-scout-lookout.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>パイオニア・スカウトの監視地点（Pioneer Scout lookout）</b>は、アパラチアの<a href="toxic-valley.html" class="auto-link">毒の谷</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>背景</h2>
<p>パイオニア・スカウトの監視地点は、<a href="pioneer-scout-camp.html" class="auto-link">パイオニア・スカウトのキャンプ</a>（キャンプ・ルイス）のそばの丘の中腹に建つ監視塔です。<br>恐らく、下方の<a href="grafton-lake.html" class="auto-link">グラフトン湖</a>のほとりでキャンプをしている見習いスカウトたちが、危険な<a href="grafton-dam.html" class="auto-link">グラフトンダム</a>や<a href="grafton-steel.html" class="auto-link">グラフトン鉄鋼</a>に許可なく近づきすぎないよう監視するために建てられたと考えられています。</p>
<p><a href="great-war.html" class="auto-link">最終戦争</a>後のいつかの時点で、<a href="bosley.html" class="auto-link">ボズリー</a>という名のレイダーが<a href="henrick.html" class="auto-link">ヘンリック</a>を狙撃する依頼（ヒット）を引き受け、この監視塔を有利な狙撃ポイントとして利用しました。<br>しかしその反面、標的であるヘンリックもまた、ボズリーを仕留めるためにグラフトン鉄鋼の屋根の上に陣取っていました。<br>結局のところ、彼らが別々に残したメモのすぐ横に彼ら自身の死体が転がっていることからもわかる通り、この二人の男は相打ちとなって互いに殺し合ってしまいました。</p>

            <h2>レイアウト</h2>
<p>この監視塔からは、南にあるキャンプ・ルイス全体を見渡すことができます。<br>塔の最上部にある小部屋には<a href="beds.html" class="auto-link">ベッド</a>があり、その下には<a href="duffle-bag.html" class="auto-link">ダッフルバッグ</a>、足元には鍵のかかった<a href="footlocker.html" class="auto-link">フットロッカー</a>があります。また、<a href="first-aid.html" class="auto-link">救急箱</a>が収められたロッカーや、壁にはアパラチアの大きな地図が貼られています。<br>外の通路（キャットウォーク）には、<a href="hunting-rifle.html" class="auto-link">ハンティングライフル</a>を握りしめたボズリーの死体があり、その横には彼が狙撃しようとしていた標的に関する詳細が書かれた「<a href="bosleys-note.html" class="auto-link">ボズリーのメモ</a>」が遺されています。通路の北側の隅には<a href="cooking-station.html" class="auto-link">クッキングステーション</a>も設置されています。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b><a href="bosleys-note.html" class="auto-link">ボズリーのメモ（Bosley's note）</a></b>：監視塔の最上部の外、レイダーの死体（ボズリー）の横に落ちているメモ。</li>
    <li><b><a href="the-domestics-note-3.html" class="auto-link">ドメスティックのメモ3（The Domestics note 3）</a></b>：監視塔から北東の方向、ワールドマップ上で蝶が描かれている場所の南西付近。崖上の屋外リビングルームエリアにあるテーブルの上。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                毒の谷にある森林監視塔（ファストトラベル地点）の一つです。マップ上の周囲の未発見ロケーションをアンロックするために訪れることが多いはずです。<br>塔の最上部からはグラフトン鉄鋼が見渡せますが、そのグラフトン鉄鋼との間で繰り広げられたスナイパー同士の死闘の痕跡（ボズリーとヘンリックの相打ち劇）が死体とメモで語られており、Fallout特有の「環境ストーリーテリング」の醍醐味を味わえる場所になっています。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Pioneer Scout lookout</h3><img src="images/note_extracted/pioneer-scout-lookout/img_main.png" alt="Pioneer Scout lookout"><div class="infobox-row"><span class="infobox-label">種類</span><span>監視塔（ファストトラベル地点）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の谷</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Pioneer Scout lookout<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">パイオニア・スカウトの監視地点</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_pioneer_scout_lookout" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Pioneer Scout lookout<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">パイオニア・スカウトの監視地点</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Pioneer_Scout_lookout" target="_blank" rel="noopener">Pioneer Scout lookout</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_pioneer_scout_lookout';const _n='Pioneer Scout lookout';const _u='pioneer-scout-lookout.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Pioneer Scout lookout</h3><img src="images/note_extracted/pioneer-scout-lookout/img_main.png" alt="Pioneer Scout lookout"><div class="infobox-row"><span class="infobox-label">種類</span><span>監視塔（ファストトラベル地点）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の谷</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Pioneer Scout lookout<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">パイオニア・スカウトの監視地点</span></h1>");

fs.writeFileSync('f:/Fallout/pioneer-scout-lookout.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

パイオニア・スカウトの監視地点（Pioneer Scout lookout）
https://www.fallout-jp.com/pioneer-scout-lookout.html

概要

毒の谷にある監視塔。見習いスカウトたちがグラフトンダムなどに近づかないよう監視するために建てられたと考えられています。

---

💭 感想

塔の最上部からはグラフトン鉄鋼が見渡せますが、ここで遠距離狙撃を企てたレイダー同士の死闘の痕跡（ボズリーとヘンリックの相打ち劇）が死体とメモで語られており、Fallout特有の「環境ストーリーテリング」の醍醐味を味わえる場所になっています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/pioneer-scout-lookout', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/pioneer-scout-lookout/post.md', postContent);

console.log('Done.');
