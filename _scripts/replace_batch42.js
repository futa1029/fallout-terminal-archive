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

// 1. MODUS science terminal
const fixModusScience = () => {
    const file = `f:/Fallout/modus-science-terminal.html`;
    let html = fs.readFileSync(file, 'utf8');
    
    html = html.replace(/\[\[Fallout 76 vendors/g, 'ベンダー');
    
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const h1 = document.querySelector('h1');
    if (h1 && !h1.innerHTML.includes('<br>')) {
        h1.innerHTML = `MODUS science terminal<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">MODUSサイエンス・ターミナル</span>`;
    }

    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    let impressionBox = quoteBoxes.find(qb => qb.textContent.includes('エンクレイヴに所属するキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ホワイトスプリング・バンカー内にある、変異の血清（完成品）などを扱うMODUSの専用端末です。<br><br>非常に高額な変異の血清を直接販売しているほか、一部の設計図も取り扱っており、エンクレイヴの高度な科学力をプレイヤーに提供してくれる重要なベンダーです。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('modus-science-terminal', `エンクレイヴの科学力を結集した「MODUSサイエンス・ターミナル」のロア記事をアップデートしました！🧪
完成品の変異血清が直接購入できる、アパラチアの突然変異ライフを支えるベンダーです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/modus-science-terminal.html`);
    console.log('MODUS Science fixed.');
};

// 2. Monty
const fixMonty = () => {
    const file = `f:/Fallout/monty-tv.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('荒野の厳しさを垣間見せるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ドラマ版「Fallout」にて、ルーシーが荒野で出くわす人物の一人。<br><br>浄水器の修理や水について尋ねるルーシーに荒野の現実を教える短い登場ながら、Vault居住者の無知さとウェイストランドの過酷な生活ぶりのギャップを如実に見せつける象徴的なシーンを担っています。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('monty-tv', `ドラマ版Falloutに登場した荒野の住人「モンティ」のロア記事をアップデートしました！🏜️
世間知らずのルーシーにウェイストランドの過酷な現実を教える、象徴的なシーンに登場するキャラクターです。
#FalloutTV #フォールアウト
https://www.fallout-jp.com/monty-tv.html`);
    console.log('Monty fixed.');
};

// 3. Mr.Squeeze
const fixMrSqueeze = () => {
    const file = `f:/Fallout/mr-squeeze.html`;
    let html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Check if quote-box exists
    let quoteBox = document.querySelector('.quote-box');
    if (!quoteBox) {
        // Find a good place to insert, right after h1 maybe, or before tags
        const tagsDiv = document.querySelector('div[style*="margin-top: 30px; border-top: 1px dashed"]');
        if (tagsDiv) {
            tagsDiv.insertAdjacentHTML('beforebegin', `
            <div class="quote-box">
                <b>感想</b><br><br>
                アパラチアの各地にランダムで出現する、手作りのレモネードスタンドをひっそりと営むベンダーロボット。<br><br>彼の健気なセリフと「L∃MONADE」の看板は荒野の癒やしですが、売られているレモネードの材料に「レモン」が一切含まれておらず、木材や酸から作られているという狂気のレシピにはFalloutらしいブラックユーモアを感じざるを得ません。
            </div>\n`);
        }
    }
    
    // Also check copyright
    if (!html.includes('creative')) {
        const donationPara = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('寄付を受け付けております'));
        if (donationPara) {
            donationPara.insertAdjacentHTML('beforebegin', `<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Mr._Squeeze" target="_blank" rel="noopener">Mr. Squeeze</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>\n`);
        }
    }

    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('mr-squeeze', `ランダムで出会える癒しのベンダー「Mr.スクイーズ」のロア記事をアップデートしました！🍋
彼が売ってくれる「レモネード」のレシピを見直すと、Fallout特有の狂気を感じられるはずです…。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/nb7f1d352a89c.html`); 
    console.log('Mr.Squeeze fixed.');
};

fixModusScience();
fixMonty();
fixMrSqueeze();
