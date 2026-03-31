const fs = require('fs');
let html = fs.readFileSync('f:/Fallout/deathclaw.html', 'utf8');

const targetStr = `<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Deathclaw" target="_blank" rel="noopener">Deathclaw</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <div style="margin-top: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Fallout</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#クリーチャー</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#デスクロー</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#ロア</span>
                </div>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>`;

const startIdx = html.indexOf('<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color);');
const endIdx = html.indexOf('</div>', html.indexOf('<p style="margin-top: 15px;">', startIdx)) + 6;

if (startIdx !== -1 && endIdx !== -1) {
    html = html.slice(0, startIdx) + targetStr + html.slice(endIdx);
    fs.writeFileSync('f:/Fallout/deathclaw.html', html, 'utf8');
    console.log('Footer fixed');
} else {
    console.log('Could not find footer');
}
