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

// 1. MODUS armory terminal
const fixModusArmory = () => {
    const file = `f:/Fallout/modus-armory-terminal.html`;
    let html = fs.readFileSync(file, 'utf8');
    
    html = html.replace(/\[\[Fallout 76 vendors/g, 'ベンダー');
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const h1 = document.querySelector('h1');
    if (h1 && !h1.innerHTML.includes('<br>')) {
        h1.innerHTML = `MODUS armory terminal<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">MODUSアーマリー・ターミナル</span>`;
    }

    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('エンクレイヴに所属するキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ホワイトスプリング・バンカー内にある、エンクレイヴ仕様の武器やアーマーなどを取り扱うMODUSの専用端末です。<br><br>エンクレイヴの技術が結集された強力な装備品の数々を販売しており、将軍となったプレイヤーがより上位の火力を求めて通うことになる、重要な拠点のひとつですね。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('modus-armory-terminal', `エンクレイヴの武器商人「MODUSアーマリー・ターミナル」のロア記事をアップデートしました！🔫
強力なエンクレイヴ装備が販売されており、多くの将軍がお世話になるベンダー端末です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/modus-armory-terminal.html`);
    console.log('MODUS Armory fixed.');
};

// 2. MODUS medical terminal
const fixModusMedical = () => {
    const file = `f:/Fallout/modus-medical-terminal.html`;
    let html = fs.readFileSync(file, 'utf8');
    
    html = html.replace(/\[\[Fallout 76 vendors/g, 'ベンダー');
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const h1 = document.querySelector('h1');
    if (h1 && !h1.innerHTML.includes('<br>')) {
        h1.innerHTML = `MODUS medical terminal<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">MODUSメディカル・ターミナル</span>`;
    }

    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('エンクレイヴに所属するキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ホワイトスプリング・バンカー内にある、スティムパックや各種薬品類を取り扱うMODUSの専用端末です。<br><br>血清のレシピという超高額かつ重要なアイテムを販売する端末でもあり、変異を極めるためにキャップを貯めてはここを訪れるという日課をこなすプレイヤーも多い、非常に利用頻度の高いベンダーです。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('modus-medical-terminal', `ホワイトスプリング・バンカーの薬品販売機「MODUSメディカル・ターミナル」のロア記事をアップデートしました！💉
高額な「変異の血清レシピ」を求めて皆が通う、エンクレイヴの超重要ベンダーです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/modus-medical-terminal.html`);
    console.log('MODUS Medical fixed.');
};

// 3. MODUS production terminal
const fixModusProduction = () => {
    const file = `f:/Fallout/modus-production-terminal.html`;
    let html = fs.readFileSync(file, 'utf8');
    
    html = html.replace(/\[\[Fallout 76 vendors/g, 'ベンダー');
    
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const h1 = document.querySelector('h1');
    if (h1 && !h1.innerHTML.includes('<br>')) {
        h1.innerHTML = `MODUS production terminal<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">MODUSプロダクション・ターミナル</span>`;
    }

    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    let impressionBox = quoteBoxes.find(qb => qb.textContent.includes('エンクレイヴに所属するキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ホワイトスプリング・バンカー内にある、バルク素材などのジャンク品や日用品を取り扱うMODUSの専用端末です。<br><br>特殊な装備品ではないものの、クラフト素材が急に必要になった時に頼りになるベンダーであり、MODUS特有の無機質ながらどこか愛嬌のある通信音声を聞きながら取引できるのが魅力ですね。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('modus-production-terminal', `生産部門の担当AI「MODUSプロダクション・ターミナル」のロア記事をアップデートしました！🔧
武器や薬品ほど目立ちませんが、不足しがちなクラフト素材の調達で頼りになるベンダー端末です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/modus-production-terminal.html`);
    console.log('MODUS Production fixed.');
};

fixModusArmory();
fixModusMedical();
fixModusProduction();
