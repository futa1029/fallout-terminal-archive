const fs = require('fs');

let txt = fs.readFileSync('f:/Fallout/brotherhood-of-steel.html', 'utf8');

const quoteAndFooter = `
        <div class="quote-box">
            <b>感想</b><br><br>
            Falloutシリーズのまさに「顔」とも言える存在、ブラザーフッド・オブ・スティール。初代から最新作のTV版に至るまで、彼らが紡いできた歴史や信念の移り変わりは、そのままウェイストランドの歴史そのものと言っても過言ではありません。<br>
            初期の排他的で秘密主義なカルト集団としての姿から、リオンズ・エルダーによるキャピタル・ウェイストランドでの人道的な活動、そしてマクソン体制下の軍事的で強硬な巨大派閥への変遷など、時代や地域ごとに異なる「正義」の在り方を提示してくれるのが本当に魅力的です。<br>
            アパラチアにおけるタガーディの悲壮な決断や、TVシリーズにおける宗教的なテイストを強めた姿など、常に新しい一面を見せてくれる彼らの物語からは目が離せません。<br>
            パワーアーマーに身を包み、ベルチバードで空を駆ける彼らの威容は、何度見てもプレイヤーの心を熱くさせてくれますね。
        </div>

        <div class="copyright">
            <p>This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Brotherhood_of_Steel" target="_blank" rel="noopener">Brotherhood of Steel</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
            <p>&copy; Overseer Mohi's Terminal — Fallout Lore Archive</p>
            <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
        </div>
`;

if (!txt.includes('<b>感想</b>')) {
    txt = txt.replace(/<\/main>\s*<\/div>\s*<\/body>\s*<\/html>/, quoteAndFooter + '\n        </main>\n    </div>\n</body>\n</html>\n');
    fs.writeFileSync('f:/Fallout/brotherhood-of-steel.html', txt, 'utf8');
    console.log('Appended quote-box and copyright footer successfully.');
} else {
    console.log('Quote-box already exists.');
}
