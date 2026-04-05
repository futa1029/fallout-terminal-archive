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

// 1. Reflection
const fixReflection = () => {
    const file = `f:/Fallout/reflection.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Add viewport
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // Remove Star wars warning
    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('Star Wars wiki')) {
            p.remove();
        }
    }
    
    // Add Impression
    const tagsDiv = document.querySelector('div[style*="margin-top: 30px; border-top: 1px dashed"]');
    if (tagsDiv && !html.includes('<b>感想</b>')) {
        tagsDiv.insertAdjacentHTML('beforebegin', `
            <div class="quote-box">
                <b>感想</b><br><br>
                デイリーオプス等で猛威を振るう変異「反射」に対応するための解説記事。<br><br>初めて反射に出会ったときは「即死チート！？」と錯覚するほどですが、対策（ヴァンパイア武器やパワーアーマーの着用など）を知れば十分に対処可能なのがFallout 76の面白いところですね。
            </div>\n`);
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('reflection', `厄介な変異「反射」対策の解説記事をアップデートしました！🛡️
デイリーオプスなどで遭遇しがちですが、被ダメージの仕組みを理解してパワーアーマーやヴァンパイア武器を使えば逆に回復チャンスになりますよ！
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/n40b44ac80f81.html`);
    console.log('Reflection fixed.');
};

// 2. Registration Guard
const fixRegistrationGuard = () => {
    const file = `f:/Fallout/registration-guard.html`;
    let html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Add viewport
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // Replace Quote box
    const oldQuote = document.querySelector('.quote-box');
    if (oldQuote) {
        oldQuote.outerHTML = `
            <div class="quote-box">
                <b>感想</b><br><br>
                ワトガ・シビックセンターに登場するクレーター系レイダーです。<br><br>名前の通り、何らかの「登録」を監視しているようですが、特に名有りの固有キャラクターという扱いではなく、背景に溶け込んだモブレイダーの一人ですね。
            </div>\n`;
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('registration-guard', `ワトガにいるクレーター系モブレイダー「Registration guard」のロア記事をアップデートしました！📝
固有のダイアログはないものの、クレーターの進出を感じさせるキャラクターですね。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/registration-guard.html`);
    console.log('Registration Guard fixed.');
};

// 3. Robyn the Brute
const fixRobyn = () => {
    const file = `f:/Fallout/robyn-the-brute.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Add viewport
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // Replace text and Quote box
    const h2 = document.querySelector('h2');
    if (h2 && h2.textContent.includes('概要')) {
        const nextP = h2.nextElementSibling;
        if (nextP && nextP.tagName === 'P') {
            nextP.outerHTML = `
<p>ロビン・ザ・ブルート（Robyn the Brute）は戦前の無法者です。<br>
アーチー・ザ・キッドやダーウィン・ザ・デビルと同じ無法者グループでした。<br><br>
彼女の白骨死体はルート33の交通渋滞の車列の中にひっそりと残されており、アーチーが彼女に宛てて書いたと思われる<a href="archie-the-kids-letter.html" class="auto-link">アーチー・ザ・キッドの手紙</a>を所持しています。</p>`;
        }
    }

    const oldQuote = document.querySelector('.quote-box');
    if (oldQuote) {
        oldQuote.outerHTML = `
            <div class="quote-box">
                <b>感想</b><br><br>
                アーチー、ダーウィンと共に無法者としてアパラチアを駆け抜けた女性。<br><br>「手紙」を見るに、アーチーからは愛または強い執着を向けられていたようですが、本人の物語はルート33の車列で命を落とし、そこで終わっています。
            </div>\n`;
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('robyn-the-brute', `戦前の無法者「ロビン・ザ・ブルート」のロア記事をアップデートしました！🚓
彼女の遺体はルート33の渋滞の中にあり、仲間のアーチーから愛と執着を向けられた「手紙」を持っています…。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/robyn-the-brute.html`);
    console.log('Robyn the Brute fixed.');
};

fixReflection();
fixRegistrationGuard();
fixRobyn();
