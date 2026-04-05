const fs = require('fs');

const finalHtml = `
            <h2>舞台裏 (Behind the scenes)</h2>
            <ul style="list-style-type: none; padding-left: 0;">
                <li style="margin-bottom: 10px;">・ブラザーフッド・オブ・スティールは、『Fallout: A Post Nuclear Role Playing Game』から最新の『Fallout TVシリーズ』まで、全てのFallout主要作品に登場している数少ない組織（もう一つはVault-Tec等の戦前企業）です。</li>
                <li style="margin-bottom: 10px;">・Falloutの開発者であるTim Cain氏によれば、彼らが修道院や騎士団のような階級（パラディン、ナイト、スクライブ等）を持っているのは「放射能によって突然変異した怪物たちが潜む世界で、輝く鎧を着た騎士（Knights in shining armor）を登場させたかったから」という明確なデザイン意図によるものです。</li>
                <li style="margin-bottom: 10px;">・Fallout 3での東海岸B.O.S.がそれまでの「技術第一の隔離主義」から「博愛的な守護者」へと路線変更したことは、長年のファンの間で大きな議論を呼びました。Fallout 4でアーサー・マクソンが伝統的で強力な軍事路線に回帰させたのは、そうした古典的なB.O.S.の威圧感を再び取り戻すためでもありました。</li>
                <li style="margin-bottom: 10px;">・彼らの有名なモットーである「<b>Ad Victoriam</b>（アド・ヴィクトリアム）」は、ラテン語で「勝利へ（To Victory）」を意味します。</li>
            </ul>

            <div class="gallery">
                <div class="gallery-title">GALLERY</div>
                <div class="gallery-grid">
                    <img class="gallery-item" src="images/Faction_BoS.png" alt="ギャラリー画像_1" onclick="openLightbox(this.src)">
                    <img class="gallery-item" src="https://static.wikia.nocookie.net/fallout_gamepedia/images/0/00/Fo4_Prydwen_approaching_Boston_Airport.png" alt="ギャラリー画像_2" onclick="openLightbox(this.src)" onerror="this.style.display='none'">
                    <img class="gallery-item" src="https://static.wikia.nocookie.net/fallout_gamepedia/images/f/fc/Cvt19_Liberty_Prime.png" alt="ギャラリー画像_3" onclick="openLightbox(this.src)" onerror="this.style.display='none'">
                    <img class="gallery-item" src="https://static.wikia.nocookie.net/fallout_gamepedia/images/7/77/Maxson_FO4.png" alt="ギャラリー画像_4" onclick="openLightbox(this.src)" onerror="this.style.display='none'">
                </div>
            </div>

            <div class="quote-box">
                <b>Impression</b><br><br>
                Falloutシリーズといえば「青いジャンプスーツ（Vault）」と並んで、彼らブラザーフッド・オブ・スティール（そしてパワーアーマー）の存在を思い浮かべる人も多いのではないでしょうか。<br>
                マクソンの反乱から始まり、西海岸での衰退、そして東海岸での圧倒的なミリタリー国家への飛躍と、彼らの歴史はそっくりそのままFallout世界の歴史とシンクロしています。<br>
                ただの「正義の味方」ではなく、独善的で、狂信的で、時としてレイダーやミュータントよりも暴力的にテクノロジーをむしり取っていく姿勢こそが、いかにもFalloutらしくて最高にクールです！「Ad Victoriam！」と叫びながらベルチバードからパワーアーマーで降下してくる彼らを見ると、やはりテンションが上がらずにはいられません。
            </div>

            <p style="font-size:0.8em; color:#888;">Category:Brotherhood of Steel<br>Category:Brotherhood of Steel factions</p>

            <div class="copyright">
                <p>This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Brotherhood_of_Steel" target="_blank" rel="noopener">Brotherhood of Steel</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p>&copy; Overseer Mohi&#39;s Terminal — Fallout Lore Archive</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>
        </main>
    </div>

    <!-- Lightbox -->
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')">
        <img id="lightbox-img" src="" alt="拡大画像">
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script>
        const supabaseUrl = 'YOUR_SUPABASE_URL';
        const supabaseKey = 'YOUR_SUPABASE_KEY';
        let supabase;
        try { supabase = window.supabase.createClient(supabaseUrl, supabaseKey); } catch (e) {}

        function openLightbox(src) {
            document.getElementById('lightbox-img').src = src;
            document.getElementById('lightbox').classList.add('active');
        }

        async function toggleLike(btn) {
            const articleId = btn.getAttribute('data-article-id');
            const isLiked = localStorage.getItem('liked_' + articleId) === 'true';
            
            if (isLiked) {
                localStorage.setItem('liked_' + articleId, 'false');
                btn.classList.remove('liked');
                btn.querySelector('span').textContent = '♡';
            } else {
                localStorage.setItem('liked_' + articleId, 'true');
                btn.classList.add('liked');
                btn.querySelector('span').textContent = '♥';
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const btns = document.querySelectorAll('.like-button');
            btns.forEach(btn => {
                const articleId = btn.getAttribute('data-article-id');
                if (localStorage.getItem('liked_' + articleId) === 'true') {
                    btn.classList.add('liked');
                    btn.querySelector('span').textContent = '♥';
                }
            });
        });
    </script>
</body>
</html>
`;

fs.appendFileSync('f:/Fallout/brotherhood-of-steel.html', finalHtml, 'utf8');
console.log("Appended Final HTML parts (Behind the scenes, Gallery, Impression, Footer).");
