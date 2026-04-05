const fs = require('fs');
const head = fs.readFileSync('frankie-beckett.html', 'utf8').split('<main class="content">')[0] + '<main class="content">\n';
const mainStr = `            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_ulysses" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Ulysses</h1>
            
            <h2>概要</h2>
            <p>Ulysses background.</p>

            <div class="quote-box" style="margin-top: 40px; border-top: 3px solid var(--accent-color);"><p class="quote-text">Ulysses Impression</p></div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#FalloutNewVegas</span>
                </div>
                
                <!-- 著作権表示 -->
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Ulysses" target="_blank" rel="noopener">Ulysses</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p>&copy; Overseer Mohi's Terminal — Fallout Lore Archive</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>
`;
const part2 = fs.readFileSync('frankie-beckett.html', 'utf8').split('<!-- Comments Section -->')[1];
const tail = '            <!-- Comments Section -->' + part2;

let out = head + mainStr + tail;
out = out.replace(/<title>.*?<\/title>/, '<title>Ulysses | Overseer Mohi\'s Terminal</title>');
out = out.replace(/フランキー・ベケット/g, 'Ulysses');
out = out.replace(/<body data-article-category="人物" data-article-appearance="Fallout 76">/, '<body data-article-category="人物" data-article-appearance="Fallout: New Vegas">');
out = out.replace(/n59f014d21b63/g, 'ulysses');
fs.writeFileSync('ulysses.html', out, 'utf8');
console.log('Fixed ulysses.html');
