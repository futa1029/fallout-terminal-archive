// スナリーギャスター記事 完全版HTML生成スクリプト
const fs = require('fs');
const slug = 'snallygaster-fo76';
const imgDir = \`images/note_extracted/\${slug}\`;

// 構成要素テンプレート
const template = fs.readFileSync('scorchbeast-fo76.html', 'utf8');
const styleMatch = template.match(/<style>([\\s\\S]*?)<\\/style>/);
const commonStyle = styleMatch ? styleMatch[1] : '';

const html = \`<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8"><title>Snallygaster | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/\${slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="Snallygaster | Overseer Mohi's Terminal"><meta property="og:description" content="スナリーギャスター — ウエストブラザーズの実験から生まれた、6本脚と無数の目を持つ異形の怪物。"><meta property="og:url" content="https://www.fallout-jp.com/\${slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
<style>\${commonStyle}</style>
</head>
<body data-article-category="クリーチャー" data-article-appearance="Fallout 76">
    <div class="container">
        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">Snallygaster</h3><img src="\${imgDir}/img_main.png" alt="スナリーギャスター"><div class="infobox-row"><span class="infobox-label">種別</span><span>ミュータント（FEV変異体）</span></div><div class="infobox-row"><span class="infobox-label">分類</span><span>未確認生物（クリプティッド）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>アパラチア全域（主に汚染地域）</span></div><div class="infobox-row"><span class="infobox-label">攻撃</span><span>酸性の唾液、舌による鞭打ち、爪</span></div><div class="infobox-row"><span class="infobox-label">耐性</span><span>放射線：免疫</span></div><div class="infobox-row"><span class="infobox-label">弱点</span><span>頭部（150%ダメージ）</span></div><div class="infobox-row"><span class="infobox-label">バリアント</span><span>発生期 / 悪臭 / ブラッディ / グロウイング / スコーチ / 被爆 / プライム</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>
        <main class="content">
            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_snallygaster_fo76" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>
            <h1>Snallygaster<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">スナリーギャスター</span></h1>

<p><b>スナリーギャスター</b>は、Fallout 76に登場する未確認生物（クリプティッド）である。</p>

<h2>背景</h2>
<p>当時のウエスト・テック研究センターでのFEV（強制進化ウイルス）の組み換え株の実験は、数多くの失敗した変異を生み出したが、2つの例外が存在した。<br>最初の成功例が、2077年10月14日に誕生した「被験体AM52（FEVS-006443）」であり、これが後のスナリーギャスターである。<br>この第2段階の組み換え株は、複数の異なる種の生物の形質を組み合わせたものであった。</p>

<p>研究者たちはその結果を不気味なものと見なしたが、FEVの再結合能力の貴重な知見を得ることができた。<br>身体的な変化として、肥大化した上半身の側面に沿った複数の眼球器官、鉤爪のついた指を持つ2つ目の腕のセット、そして各内趾にある大きな鎌状の爪が挙げられる。<br>この被験体は生きて安定しており、自らを正常に維持していた（これはプログラムにとって大きな成果だった）。<br>その後、実験が成熟した段階でハンターズビルでの解放が計画されていた。</p>

<p>このミュータントは2078年1月3日になるまでこの地域に戻されず、その時点で収容施設から逃亡した。<br>その後ミュータントは繁殖し、アパラチア全土に出没するスナリーギャスターの脅威へと繋がることになった。</p>

<h2>特徴</h2>

<h3>生態</h3>
<p>スナリーギャスターは四足歩行のクリーチャーである。<br>3本の爪（うち1本は対向する親指）を持つ2本の腕と、体の後部にある2本の小さな手足を持ち、座っている間は後肢で体を支える。<br>はっきりとした顔面を持たず、酸で覆われた触手のような長い舌を持つ口と、背中に沿って無数に並ぶ目玉を持つ。<br>スナリーギャスターは近距離では舌を鞭のように使い、遠距離では酸の塊を吐き出す。</p>

<p>背中には少なくとも40個の目、2列の歯、そして棘がある。<br>「隣接するDCの郊外に出没する、ドラゴンのような悪魔」と形容されてきた。<br>特徴的なクリック音と、周囲に漂う強烈で刺激的な悪臭により、遠くからでも容易に認識できる。</p>

<h3>ゲームプレイ</h3>
<p>スナリーギャスターは、最大4体の群れで、主に毒性が強いか放射能汚染されたエリアで見られる。<br>挑発されると口から有毒なスライムの塊を吐き出し、毒ダメージを与える。<br>その後プレイヤーキャラクターに向かって走り寄り、爪で引っ掻くか舌で叩く近接攻撃を行う。<br>アイドル状態でまだプレイヤーを発見していないときは、様々な唸り声や鼻を鳴らす音が聞こえる。</p>
<p>放射線ダメージには免疫があり、頭部への攻撃は150%のダメージを与える。</p>

<h2>バリアント</h2>

<table class="variant-table">
<tr><th>名称</th><th>レベル</th><th>知覚</th><th>放射線耐性</th><th>備考</th></tr>
<tr><td>発生期のスナリーギャスター</td><td>14</td><td>5</td><td>免疫</td><td>基本バリアント（弱）</td></tr>
<tr><td>スナリーギャスター</td><td>22</td><td>5</td><td>免疫</td><td>基本バリアント</td></tr>
<tr><td>悪臭のスナリーギャスター</td><td>38</td><td>5</td><td>免疫</td><td>有毒な黄褐色の汚れに覆われている</td></tr>
<tr><td>ブラッディ・スナリーギャスター</td><td>38</td><td>5</td><td>免疫</td><td>血にまみれたような暗赤色の皮膚</td></tr>
<tr><td>グロウイング・スナリーギャスター</td><td>46</td><td>5</td><td>免疫</td><td>放射線により緑色に発光</td></tr>
<tr><td>プライム・スナリーギャスター</td><td>46</td><td>5</td><td>免疫</td><td>Primal Cuts（Toxic Valley）限定</td></tr>
</table>

<h3>スコーチ・スナリーギャスター</h3>
<p>スコーチ病に感染した黒焦げの肉厚なスナリーギャスター。<br>あらゆる通常バリアントに対応するスコーチ化バージョンが存在する（Lv14〜46）。<br>スコーチビーストやスコーチビースト・クイーンに攻撃された際にスコーチ化することがあり、他のスコーチクリーチャーと同盟関係になる。</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
<div class="gallery-item"><img src="\${imgDir}/img_fetid.png" alt="悪臭のスナリーギャスター"><div class="caption">悪臭のスナリーギャスター</div></div>
<div class="gallery-item"><img src="\${imgDir}/img_bloody.png" alt="ブラッディ・スナリーギャスター"><div class="caption">ブラッディ・スナリーギャスター</div></div>
<div class="gallery-item"><img src="\${imgDir}/img_glowing.jpg" alt="グロウイング・スナリーギャスター"><div class="caption">グロウイング・スナリーギャスター</div></div>
<div class="gallery-item"><img src="\${imgDir}/img_scorched.png" alt="スコーチ・スナリーギャスター"><div class="caption">スコーチ・スナリーギャスター</div></div>
</div>

<h2>ドロップ</h2>
<ul class="loot-list">
<li>スナリーギャスターの皮</li>
<li>生の生石綿（アスベスト）</li>
<li>廃酸</li>
</ul>
<p>グロウイング個体の追加ドロップ：</p>
<ul class="loot-list">
<li>光る血</li>
<li>光る肉</li>
<li>核廃棄物</li>
</ul>

<h2>出現場所</h2>
<img src="\${imgDir}/img_map.jpg" alt="スナリーギャスター出現マップ" class="article-image">
<div class="image-caption">アパラチアにおけるスナリーギャスター出現のパーセンテージマップ</div>

<ul class="loot-list">
<li><b>浸水した操車場</b> — 常に7体が出現</li>
<li><b>トキシック・ラリーのミート＆ゴー</b> — 常に3体が出現</li>
<li><b>チャールストン</b> — ホーンライト・インダストリアル本社とチャールストン議事堂の間に常に2体出現</li>
<li><b>キディーコーナー・キャビン</b> — 頻繁に3体出現</li>
<li><b>パイロンV-13</b> — 頻繁に2体出現</li>
<li>ガラハン邸 — 5階に1体出現することが多い</li>
<li>連邦処分場HZ-21 — 1体が配置されている</li>
<li>ヘムロック・ホールズ裏手の墜落したベルチバード — 時折出現</li>
<li>ツリートップス — 時折出現</li>
</ul>

<h2>舞台裏</h2>
<ul class="loot-list">
<li>「スナリーギャスター（Snallygaster）」は、メリーランド州フレデリック郡周辺に伝わる実際の民間伝承に基づいているが、FO76のデザインは神話上の外見（ドラゴンや鳥のような姿）とはあまり一致していない。</li>
<li>名付けの語源はドイツ語の「schnelle geister（素早い精霊）」に由来する。</li>
<li>コンセプトアート担当のレイ・レデラー氏によれば、「神話上の恐ろしい獣というよりは、高度に変異したクリーチャーとしてアプローチした」とのこと。</li>
</ul>

<div class="quote-box"><b>感想</b><br><br>とにかく見た目がグロテスク。人間の顔がない代わりに口の中に酸性の舌があり、背中には無数の目が付いているというデザインは、何度見ても慣れません。<br>しかし、これらが単なるモンスターではなく「ウエスト・テックのFEV実験の失敗作（AM52）」であるという設定がFalloutのロアとして非常に重みを持たせています。<br>酸による遠距離攻撃が強力なので、見つけたらクリック音が聞こえる前に先手を取って一気に倒すのが定石ですね。<br>廃酸とアスベストという、拠点建築やクラフトで不足しがちな素材を確実に入手できるため、トキシック・ラリーのミート＆ゴーや浸水した操車場は常に狩猟ルートに組み込んでいます。</div>

            <div class="copyright" style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <p>This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Snallygaster" target="_blank" rel="noopener">Snallygaster</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p>&copy; Overseer Mohi's Terminal &mdash; Fallout Lore Archive</p>
            </div>
            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>
        </main>
    </div>
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>
    <script>
        const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);
        async function toggleLike(btn){const articleId=btn.getAttribute('data-article-id');let isLiked=localStorage.getItem(articleId+'_liked')==='true';btn.disabled=true;if(isLiked){isLiked=false;const{data,error}=await supabaseClient.rpc('decrement_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}else{isLiked=true;const{data,error}=await supabaseClient.rpc('increment_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}btn.disabled=false;}
        function updateLikeButton(btn,isLiked,count){const heart=btn.querySelector('.heart');const countSpan=btn.querySelector('.like-count');if(isLiked){btn.classList.add('liked');heart.textContent='♥';}else{btn.classList.remove('liked');heart.textContent='♡';}countSpan.textContent=count;}
        document.addEventListener('DOMContentLoaded',async()=>{const btn=document.querySelector('.like-button');if(btn){const articleId=btn.getAttribute('data-article-id');const isLiked=localStorage.getItem(articleId+'_liked')==='true';const{data,error}=await supabaseClient.from('likes').select('like_count').eq('article_id',articleId).single();let count=0;if(!error&&data)count=data.like_count;updateLikeButton(btn,isLiked,count);}const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-img');document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img=>{img.addEventListener('click',(e)=>{e.stopPropagation();lightboxImg.src=img.src;lightbox.classList.add('active');});});});
        const _commentArticleId='note_snallygaster_fo76';const _commentArticleName='Snallygaster';const _commentArticleUrl='\${slug}.html';
        const ADMIN_TOKEN_KEY='fallout_admin_token';const ADMIN_PASSWORD='tq7jtq7j';const RATE_LIMIT_KEY='comment_last_posted';const RATE_LIMIT_SEC=60;let _isAdminMode=false;
        function updateCharCount(){const len=document.getElementById('comment-input').value.length;const el=document.getElementById('char-count');if(el){el.textContent=len;el.style.color=len>90?'#ff6b6b':'var(--accent-color)';}}
        function relativeTime(s){const d=(Date.now()-new Date(s).getTime())/1000;if(d<60)return'たった今';if(d<3600)return Math.floor(d/60)+'分前';if(d<86400)return Math.floor(d/3600)+'時間前';if(d<86400*7)return Math.floor(d/86400)+'日前';return new Date(s).toLocaleDateString('ja-JP');}
        function escapeHtml(str){return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
        function renderComments(comments){const list=document.getElementById('comments-list');if(!list)return;if(!comments||comments.length===0){list.innerHTML='<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';return;}list.innerHTML=comments.map(c=>\`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode?\`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\`:''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join('');}
        async function loadComments(){const list=document.getElementById('comments-list');if(!list)return;const{data,error}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50);if(error){list.innerHTML='<div class="comment-empty">コメントを読み込めませんでした。</div>';return;}renderComments(data||[]);}
        async function submitComment(){const input=document.getElementById('comment-input');const content=input?input.value.trim():'';if(!content){showCommentMsg('コメントを入力してください。',false);return;}if(content.length>100){showCommentMsg('100文字以内で入力してください。',false);return;}const lastPosted=parseInt(localStorage.getItem(RATE_LIMIT_KEY)||'0');const now=Date.now();if(now-lastPosted<RATE_LIMIT_SEC*1000){showCommentMsg('あと'+Math.ceil((RATE_LIMIT_SEC*1000-(now-lastPosted))/1000)+'秒後に投稿できます。',false);return;}const btn=document.querySelector('.comment-submit-btn');if(btn)btn.disabled=true;const{error}=await supabaseClient.from('comments').insert({article_id:_commentArticleId,article_name:_commentArticleName,article_url:_commentArticleUrl,content:content});if(btn)btn.disabled=false;if(error){showCommentMsg('投稿に失敗しました。',false);return;}localStorage.setItem(RATE_LIMIT_KEY,now.toString());input.value='';updateCharCount();showCommentMsg('コメントを投稿しました！',true);await loadComments();}
        function showCommentMsg(text,ok){const el=document.getElementById('comment-msg');if(!el)return;el.textContent=text;el.style.color=ok?'var(--accent-color)':'#ff6b6b';setTimeout(()=>{el.textContent='';},3000);}
        async function deleteComment(commentId){if(!_isAdminMode)return;if(!confirm('このコメントを削除しますか？'))return;const{error}=await supabaseClient.rpc('delete_comment_admin',{comment_id:commentId,admin_token:localStorage.getItem(ADMIN_TOKEN_KEY)||''});if(error){alert('削除失敗: '+error.message);return;}await loadComments();}
        document.addEventListener('keydown',(e)=>{if(e.ctrlKey&&e.shiftKey&&e.key==='D'){e.preventDefault();if(_isAdminMode){_isAdminMode=false;localStorage.removeItem(ADMIN_TOKEN_KEY);loadComments();alert('管理者モードを終了しました。');return;}const pw=prompt('管理者パスワードを入力してください:');if(!pw)return;if(pw===ADMIN_PASSWORD){_isAdminMode=true;localStorage.setItem(ADMIN_TOKEN_KEY,pw);loadComments();alert('管理者モードに入りました。');}else{alert('パスワードが違います。');}}});
        document.addEventListener('DOMContentLoaded',()=>{loadComments();});
    </script>
    <script src="article-common.js" defer></script>
</body>
</html>\`;

fs.writeFileSync(\`\${slug}.html\`, html, 'utf8');
console.log('✅ Generated', slug);
