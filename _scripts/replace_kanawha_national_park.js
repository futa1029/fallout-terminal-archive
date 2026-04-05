const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/kanawha-national-park.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>カノーワ国立公園（Kanawha National Park）</b>は、アパラチアにある（かつて存在した）<a href="locations.html" class="auto-link">ロケーション</a>名称です。</p>

            <h2>背景</h2>
<p>この国立公園は戦前、後に変異して<a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a>となる広大な森林とレクリエーションのエリアでした。</p>

<p>公園内にあるレンジャーオフィスの1つには、2人の<a href="national-park-service.html" class="auto-link">国立公園局</a>のパークレンジャーが勤務していましたが、彼らは日々の業務管理や方針について激しく意見が対立していました。<br>彼らはパークレンジャーとしての独自の役割や、観光目当ての訪問客が公園の自然や地元の動物（<a href="beavers.html" class="auto-link">ビーバー</a>）の生態系に与えている被害の規模について口論しました。<br>特に片方のレンジャーは、地元のビーバーの個体数が崩壊の危機にあると信じており、動物を保護するために頑なに狩猟許可証の署名を拒否していました（ターミナル記録「<a href="hunting.html" class="auto-link">狩りの許可証</a>」より）。</p>

            <h2>レイアウト</h2>
<p>カノーワ国立公園は、アパラチアの豊かな大自然の中に位置する大規模な国立公園です。<br>公園は、<a href="ranger-district-office.html" class="auto-link">レンジャー地区オフィス</a>などのいくつかの管理棟と、各種のレクリエーション施設やキャンプ場などのエリアで構成されていました。</p>

            <h2>豆知識（Behind the scenes）</h2>
<ul class="loot-list">
    <li>この公園は、現実世界のウェストバージニア州チャールストンの近くに実在する「<a href="https://en.wikipedia.org/wiki/Kanawha_State_Forest" target="_blank" rel="noopener" class="auto-link" style="border-bottom: 1px dashed var(--accent-color) !important;">カノーワ州立の森（Kanawha State Forest）</a>」がモデルになっています。</li>
    <li>レンジャー地区オフィスの外にあるカノーワ国立公園の看板には、「<a href="united-states-forest-service.html" class="auto-link">米国森林局（United States Forest Service）</a>」のシールが貼られています。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                戦前に存在していたアパラチア南東部の巨大な国立公園の名称です。<br>現在ではその大部分が真っ赤な植物に覆われた「クランベリー湿原」へと変貌してしまっていますが、レンジャー地区オフィスなどの一部の建物や看板に、当時の立派な国立公園としての名残を見ることができます。<br>残されたターミナルやメモからは、当時のレンジャーたちが地元の自然（特にビーバーの狩猟規制など）を守りながら、日々の観光客の管理業務に苦心していた様子が伺えますね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Kanawha National Park</h3><img src="images/note_extracted/kanawha-national-park/img_main.png" alt="Kanawha National Park"><div class="infobox-row"><span class="infobox-label">種類</span><span>国立公園（広範エリア）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>クランベリー湿原一帯</span></div><div class="infobox-row"><span class="infobox-label">関連施設</span><span><a href="ranger-district-office.html" class="auto-link">レンジャー地区オフィス</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Kanawha National Park<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">カノーワ国立公園</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_kanawha_national_park" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Kanawha National Park<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">カノーワ国立公園</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Kanawha_National_Park" target="_blank" rel="noopener">Kanawha National Park</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_kanawha_national_park';const _n='Kanawha National Park';const _u='kanawha-national-park.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Kanawha National Park</h3><img src="images/note_extracted/kanawha-national-park/img_main.png" alt="Kanawha National Park"><div class="infobox-row"><span class="infobox-label">種類</span><span>国立公園（広範エリア）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>クランベリー湿原一帯</span></div><div class="infobox-row"><span class="infobox-label">関連施設</span><span><a href="ranger-district-office.html" class="auto-link">レンジャー地区オフィス</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Kanawha National Park<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">カノーワ国立公園</span></h1>");

fs.writeFileSync('f:/Fallout/kanawha-national-park.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

カノーワ国立公園（Kanawha National Park）
https://www.fallout-jp.com/kanawha-national-park.html

概要

現在のクランベリー湿原一帯の広大なエリア。戦前は森林とレクリエーションの国立公園でした。

---

💭 感想

現在ではその大部分が真っ赤な植物に覆われた「クランベリー湿原」へと変貌してしまっていますが、レンジャー地区オフィスなどの建物や看板に、当時の立派な観光地としての名残を見ることができます。戦前はビーバーの狩猟規制などを巡ってレンジャーたちが苦心していた設定が残されています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/kanawha-national-park', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/kanawha-national-park/post.md', postContent);

console.log('Done.');
