const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/wicker.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ウィッカー（Wicker）</b>は、<a href="the-pitt.html" class="auto-link">ピット（The Pitt）</a>の拠点「ペン（The Penn）」に駐在している、<a href="pittsburgh-union.html" class="auto-link">ピッツバーグ・ユニオン</a>のメンバー（NPC）です。</p>

            <h2>背景</h2>
<p>彼はユニオンの組織の生き残りのために、様々な雑用（雑多な物資調達の仕事など）を自らこなしています。<br>彼は最近、（敵対勢力である）<a href="fanatics.html" class="auto-link">ファナティック</a>の監視の目が周辺に及んでいないタイミングを見計らって、連合の拠点のための新しい資源や物資を集めるために奔走しています。</p>

<p>・「おい、おい、おい…礼儀はどこで習ったんだ？相手の名前（ウィッカー＝枝編み細工の意）の意味を不用意に尋ねるんじゃない。そんなことはしてはならないんだ…」</p>

            <h2>クエスト関連</h2>
<ul class="loot-list">
    <li><b><a href="union-dues.html" class="auto-link">Union Dues</a></b>（組合の証）：ウィッカーは、アパラチアから遠征してきたプレイヤー（連合の支援者）に対して、ピットのファウンドリー（Foundry）内でファナティックに奪われた物資の回収を探すのと同時に、5個の<a href="steel-ingots.html" class="auto-link">鉄のインゴット（Steel ingot）</a>を見つけるという追加ルールのタスク（クエスト目標）を与えます。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ピット（The Pitt）への遠征ミッションである「組合の証（Union Dues）」でお世話になる重要NPCの1人です。<br>開始地点であるペンの拠点のゲート前に立っており、彼に話しかけることで必ず発生する「鉄のインゴットを5つ集める」という追加目標は、クリア報酬の「切手（ stamps ）」を最大化させるために毎回ほぼ必須でこなすことになります。そのため、プレイヤーによっては何十回・何百回と遠征で顔を合わせることになるおじさんですね。装備は「きれいな鉄鋼作業員の制服」です。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Wicker</h3><img src="images/note_extracted/wicker/img_main.png" alt="Wicker"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="the-penn.html" class="auto-link">ペン（The Penn）</a></span></div><div class="infobox-row"><span class="infobox-label">所属派閥</span><span><a href="pittsburgh-union.html" class="auto-link">ピッツバーグ・ユニオン</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Wicker<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウィッカー</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_wicker" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Wicker<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">ウィッカー</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Wicker" target="_blank" rel="noopener">Wicker</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_wicker';const _n='Wicker';const _u='wicker.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Wicker</h3><img src="images/note_extracted/wicker/img_main.png" alt="Wicker"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="the-penn.html" class="auto-link">ペン（The Penn）</a></span></div><div class="infobox-row"><span class="infobox-label">所属派閥</span><span><a href="pittsburgh-union.html" class="auto-link">ピッツバーグ・ユニオン</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Wicker<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウィッカー</span></h1>");

fs.writeFileSync('f:/Fallout/wicker.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ウィッカー（Wicker）
https://www.fallout-jp.com/wicker.html

概要

ピット（The Pitt）のペンに駐在して物資集めの裏方をしているピッツバーグ・ユニオンのメンバー。

---

💭 感想

遠征ミッションの「組合の証（Union Dues）」でお世話になる重要NPCです。「鉄のインゴットを5つ集める」という追加目標は切手の報酬をアップさせるためにほぼ必須となるタスクであるため、プレイヤーによっては何百回と遠征で顔を合わせることになるおじちゃんですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/wicker', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/wicker/post.md', postContent);

console.log('Done.');
