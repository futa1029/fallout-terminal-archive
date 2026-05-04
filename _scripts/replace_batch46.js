const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const writePost = (id, text) => {
    ensureDir(`f:/Fallout/_X/${id}`);
    fs.writeFileSync(`f:/Fallout/_X/${id}/post.md`, text);
};

// 1. Ronnie
const fixRonnie = () => {
    const file = `f:/Fallout/ronnie.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Add viewport
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // Replace copyright
    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('Endor')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Ronnie" target="_blank" rel="noopener">Ronnie</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }
    
    // Add Impression
    const tagsDiv = document.querySelector('div[style*="margin-top: 30px; border-top: 1px dashed"]');
    if (tagsDiv && !document.documentElement.innerHTML.includes('<b>感想</b>')) {
        tagsDiv.insertAdjacentHTML('beforebegin', `
            <div class="quote-box">
                <b>感想</b><br><br>
                ベケットのメインクエスト終盤で登場する女性リーダー。<br><br>いかにもレイダーらしい口の悪さですが、ベケットの家族や過去を理解して手助けしてくれる義理堅い一面もあります。
            </div>\n`);
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('ronnie', `ベケットのクエストで登場するレイダー「ロニー」の記事をアップデートしました！👩‍🎤
口は悪いですが、ベケットの家族の問題を理解して手を貸してくれる意外と義理堅い人物です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/n10e2d406ec9b.html`);
    console.log('Ronnie fixed.');
};

// 2. Slander Bot (Insult Bot)
const fixSlanderBot = () => {
    const file = `f:/Fallout/slander-bot.html`;
    let html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Add viewport
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // Rewrite Impression
    const h3s = document.querySelectorAll('h3');
    for (let h of h3s) {
        if (h.textContent === '感想') {
            const nextP = h.nextElementSibling;
            const nextUl = nextP ? nextP.nextElementSibling : null;
            
            h.outerHTML = `
            <div class="quote-box">
                <b>感想</b><br><br>
                中傷ボットは、殺伐としたアパラチアの生活において最も奇妙で、かつ愛されている（あるいは忌まわしき）ユーモアの一つですね。<br><br>
                ・<b>無機質な毒舌</b>: 感情のこもっていないプロテクトロン音声で容赦のない罵倒を浴びせられる体験は、Falloutならではのシュールな笑いを提供してくれます。<br>
                ・<b>偏執的な追跡</b>: どれほど危険な敵と戦っていようが平然と現れて罵倒だけして去っていくその姿は、ある意味でアパラチア最強の精神力の持ち主です。
            </div>\n`;
            if (nextP) nextP.remove();
            if (nextUl) nextUl.remove();
        }
    }
    
    // Replace copyright
    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('Endor')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Insult_Bot" target="_blank" rel="noopener">Insult Bot</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('slander-bot', `アパラチアのアイドル(?!)「中傷ボット」のロア記事をアップデートしました！🤖💔
どんな僻地や危険地帯にも現れて、ロボットの無機質な声で的確な罵倒を浴びせて去っていく彼の胆力は凄まじいです（笑）
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/n5fe3f99b2bf1.html`);
    console.log('Slander Bot fixed.');
};

fixRonnie();
fixSlanderBot();
