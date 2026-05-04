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

// 1. Soapy Skeleton
const fixSoapy = () => {
    console.log('Soapy Skeleton already fine. Just creating post.');
    writePost('soapy-skeleton', `送電塔の下のバスタブに横たわる「石鹸まみれの骸骨」を紹介！🧼💀
核戦争後も入浴を欠かさなかった（？）彼ですが、おかげで周囲から石鹸が24個も回収できます。オイル不足の時はぜひ！
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/soapy-skeleton.html`);
};

// 2. Splint
const fixSplint = () => {
    const file = `f:/Fallout/splint.html`;
    let html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Add viewport
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // Fix infobox
    const infobox = document.querySelector('.infobox');
    if (infobox) {
        infobox.innerHTML = `
            <h3 style="margin-top:0;text-align:center;">Splint</h3>
            <img src="images/note_extracted/splint/img_main.png" alt="Splint">
            <div class="infobox-row"><span class="infobox-label">所属</span><span>ブラッドイーグル</span></div>
            <div class="infobox-row"><span class="infobox-label">場所</span><span>バーニングスプリングス</span></div>
            <div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div>
        `;
    }
    
    // Fix Main Text
    const h2 = document.querySelector('h2');
    if (h2 && h2.textContent.includes('概要')) {
        const nextP = h2.nextElementSibling;
        if (nextP && nextP.tagName === 'P') {
            nextP.outerHTML = `
<p>スプリント（Splint）は、積灰の山のバーニングスプリングスにいるブラッドイーグルのメンバーです。<br>彼自身に特別なクエストや独自のダイアログは用意されておらず、名前付きのモブキャラクターといった立ち位置です。</p>`;
        }
    }

    // Replace Quote box
    const oldQuote = document.querySelector('.quote-box');
    if (oldQuote) {
        oldQuote.outerHTML = `
            <div class="quote-box">
                <b>感想</b><br><br>
                バーニングスプリングスで見かけることができるブラッドイーグルの一人。<br><br>特別な背景は語られていませんが、名前がついているというだけで「彼にも何かしらの物語があったのだろうか」と想像が膨らみますね。
            </div>\n`;
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('splint', `バーニングスプリングスにいるブラッドイーグル「スプリント（Splint）」の記事を更新しました！🦅
固有のクエはない名有りのモブですが、名前があるだけでちょっと背景を想像しちゃいますね。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/splint.html`);
    console.log('Splint fixed.');
};

// 3. Sutton
const fixSutton = () => {
    const file = `f:/Fallout/sutton.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Add viewport
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // Convert "一言" to Impression
    const h2s = document.querySelectorAll('h2');
    for (let h of h2s) {
        if (h.textContent.includes('一言')) {
            const nextP = h.nextElementSibling;
            
            h.outerHTML = `
            <div class="quote-box">
                <b>感想</b><br><br>
                フラットウッズを抜けて監督官の足跡を追っていくと辿り着く町。<br><br>ちなみにゲームのサットン駅の前と川の間のエリアは、私が初めてC.A.M.Pを設営した思い出の土地であり、景色も良くて初心者にもとてもおすすめの良いロケーションです。<br>教会で行われた悲惨な物語についても、ぜひ探ってみてください。
            </div>\n`;
            if (nextP) nextP.remove();
        }
    }
    
    // Replace copyright
    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('Star Wars wiki')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Sutton" target="_blank" rel="noopener">Sutton</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('sutton', `フラットウッズのお隣の町「サットン」のロケーション記事をアップデートしました！🏘️
監督官の幼少期の家があったり、教会では恐ろしい集団毒殺事件があったりと、探索のしがいがある町です。駅前はCAMP構築にもオススメ！
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/n97721b676a0a.html`);
    console.log('Sutton fixed.');
};

fixSoapy();
fixSplint();
fixSutton();
