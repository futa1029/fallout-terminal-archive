const fs = require('fs');

let txt = fs.readFileSync('f:/Fallout/game-of-thrones.html', 'utf8');

// Fix headers
txt = txt.replace(/<title>ゲ \| Overseer Mohi's Terminal<\/title>/, '<title>Game of Thrones | Overseer Mohi\'s Terminal<\/title>');
txt = txt.replace(/<meta property="og:title" content="ゲ \| Overseer Mohi's Terminal">/, '<meta property="og:title" content="Game of Thrones | Overseer Mohi\'s Terminal">');
txt = txt.replace(/<meta property="og:description" content="ゲ。Falloutのロア記事。">/, '<meta property="og:description" content="ゲーム・オブ・スローンズ。Fallout 76の未発見ロケーション。">');

// Fix JS
txt = txt.replace(/const _commentArticleName = 'ゲ';/, "const _commentArticleName = 'Game of Thrones';");

// Fix body replacement
const badBodyRegex = /<aside class="infobox">([\s\S]*?)<\/aside>\s*<main class="content">\s*<div class="action-header">([\s\S]*?)<\/div>\s*<h1>ゲ<br><span[^>]*>ゲ<\/span><\/h1>\s*<\/header>\s*<div class="sidebar">([\s\S]*?)<\/div>\s*<div class="main-content">([\s\S]*?)<h2>ギャラリー<\/h2>\s*<div class="gallery">([\s\S]*?)<\/div>\s*<div class="quote-box">([\s\S]*?)<\/div>\s*<div style="margin-top: 30px;[^>]*>\s*<p name="copyright-default">This article was created by translating and editing <a href="https:\/\/fallout.fandom.com\/wiki\/ゲ" target="_blank" rel="noopener">ゲ<\/a> from([\s\S]*?)<\/div>/;

const newBody = `<aside class="infobox">
            <h3 style="margin-top:0; text-align:center;">Game of Thrones</h3>
            <img src="images/note_extracted/game-of-thrones/FO76_Game_of_Thrones_01.png" alt="Game of Thrones" onerror="this.src='images/placeholder.jpg'">
            <img src="images/note_extracted/game-of-thrones/img_map_marker.png" alt="マップ" style="width:100%;margin-top:5px;">
            <div style="text-align:center;font-style:italic;color:#888;font-size:0.8em;margin-bottom:10px;">マップ上の位置</div>
            <div class="infobox-row"><span class="infobox-label">ゲーム</span><span>Fallout 76</span></div>
            <div class="infobox-row"><span class="infobox-label">種類</span><span>未発見ロケーション</span></div>
            <div class="infobox-row"><span class="infobox-label">地域</span><span>森林地帯</span></div>
        </aside>

        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_game_of_thrones" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Game of Thrones<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">ゲーム・オブ・スローンズ</span></h1>

            <h2>概要</h2>
            <p><b>ゲーム・オブ・スローンズ</b>は、アパラチアの森林地帯にあるFallout 76の未発見ロケーションである。サンシャイン・メドウズ工業牧場の北に位置する。</p>

            <h2>レイアウト</h2>
            <p>このロケーションは、ヌカシャインとワインを飲んだことによるアルコールが原因の決闘の末、2体のスケルトンが残された丘陵地帯である。スケルトンたちは、岩だらけの荒野には不釣り合いな2つの便器に座っている。彼らの足元には武器（10mmピストルを含む）があり、近くには空のボトルが散乱している。</p>

            <h2>備考</h2>
            <p>ここはヌカシャインを飲んだ後に目覚める可能性のあるロケーションの一つである。</p>

            <h2>登場作品</h2>
            <p>ゲーム・オブ・スローンズは『Fallout 76』にのみ登場する。</p>

            <h2>舞台裏</h2>
            <p>『Fallout 76 Vault Dweller's Survival Guide』に記載されているこのロケーションの名前は、HBOのファンタジードラマシリーズ『ゲーム・オブ・スローンズ』への文化的なパロディである。</p>

            <div class="gallery-section">
                <h2>GALLERY</h2>
                <div class="gallery-grid">
                    <div class="gallery-item">
                        <img src="images/note_extracted/game-of-thrones/FO76_Game_of_Thrones_02.png" alt="森林地帯を見下ろす" onerror="this.src='images/placeholder.jpg'">
                        <div class="caption">森林地帯を見下ろす</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/note_extracted/game-of-thrones/FO76_Game_of_Thrones_03.png" alt="ヌカシャインのボトル" onerror="this.src='images/placeholder.jpg'">
                        <div class="caption">ヌカシャインのボトル</div>
                    </div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
アパラチアを旅していると、時折奇妙な光景に出くわすものだが、この「ゲーム・オブ・スローンズ」と呼ばれる場所は、その中でも特に印象深い。<br>
便器に座ったまま決闘の末に命を落としたであろう2体のスケルトン。足元にはヌカシャインとワインの空き瓶が転がっているのを見ると、彼らがどれほどの酩酊状態にあったのか、想像するだけで恐ろしくなる。<br>
ヌカシャインの副作用でここに飛ばされてきた者もいると聞くが、この場所はまさに、アパラチアの荒廃した世界における人間の愚かさ、そして酒の恐ろしさを象徴しているかのようだ。<br>
旅人よ、この地を訪れた際は、彼らの最期に静かに敬意を表し、そして何よりも、飲みすぎにはくれぐれも注意するべきだろう。
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Game_of_Thrones" target="_blank" rel="noopener">Game of Thrones</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>`;

txt = txt.replace(badBodyRegex, newBody);

fs.writeFileSync('f:/Fallout/game-of-thrones.html', txt, 'utf8');
console.log('Fixed game-of-thrones.html format successfully.');
