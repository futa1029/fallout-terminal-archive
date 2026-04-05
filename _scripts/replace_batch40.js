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

// 1. Marianne
const fixMarianne = () => {
    const file = `f:/Fallout/marianne-tv.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('Vault 33コミュニティの一員として'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ドラマ版「Fallout」にて、Vault 33の居住者の一人として登場するキャラクターです。<br><br>外界から隔絶されたのどかなVault生活の中で、住人同士の和気あいあいとした、あるいは少し閉鎖的なコミュニティの雰囲気を表現する一人として描かれています。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('marianne-tv', `ドラマ版Falloutに登場したVault 33の居住者「マリアン」のロア記事をアップデートしました！📺
閉鎖された平和なVaultコミュニティの空気感を彩る、背景キャラクターの一人です。
#FalloutTV #フォールアウト
https://www.fallout-jp.com/marianne-tv.html`);
    console.log('Marianne fixed.');
};

// 2. Mentats
const fixMentats = () => {
    const file = `f:/Fallout/mentas.html`;
    let html = fs.readFileSync(file, 'utf8');
    
    const mentasOld1 = `<p name="09fca04a-4909-410e-a2d7-de399c576ee4" id="09fca04a-4909-410e-a2d7-de399c576ee4">子どもの頃から薬物漬けのアメリカ終わってますね..。<br>かくいう私もメンタスベリーにはまっており、レイド以外では延々と齧り続けてます。<br>案外中毒にもならないし、なってもCharismaが下がるだけなので<a href="ghoul.html" class="auto-link">グール</a>にはオススメですねーﾊﾞﾘﾎﾞﾘ。</p>`;
    const mentasOld2 = `<p name="35c34c28-5fa9-4733-811d-328fd6ba483d" id="35c34c28-5fa9-4733-811d-328fd6ba483d">ちなみに日本人にとって馴染の深いメントスはミントの主成分である『メントール（menthol）』から名前の由来が来てるようなので別物ですね~。</p>`;
    
    const mentasImpression = `<div class="quote-box"><p class="quote-text"><b>感想</b><br><br>子どもの頃から薬物漬けのアメリカ終わってますね..。<br>かくいう私もメンタスベリーにはまっており、レイド以外では延々と齧り続けてます。<br>案外中毒にもならないし、なってもCharismaが下がるだけなので<a href="ghoul.html" class="auto-link">グール</a>にはオススメですねーﾊﾞﾘﾎﾞﾘ。<br><br>ちなみに日本人にとって馴染の深いメントスはミントの主成分である『メントール（menthol）』から名前の由来が来てるようなので別物ですね~。</p></div>`;
    
    if (html.includes(mentasOld1)) {
        html = html.replace(mentasOld1 + mentasOld2, mentasImpression);
    } else if (html.includes(mentasOld1) && html.includes(mentasOld2)) {
        html = html.replace(mentasOld1, mentasImpression).replace(mentasOld2, '');
    }

    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('mentas', `Fallout世界を代表するお薬「メンタス」のロア記事をアップデートしました！💊
知能を高めるための子供向け薬物というイカれた設定と、プレイヤーの頼れる（そして癖になる）味方としての実用性をまとめました。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/mentas.html`);
    console.log('Mentats fixed.');
};

// 3. Millstone
const fixMillstone = () => {
    const file = `f:/Fallout/millstone.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const h1 = document.querySelector('h1');
    if (h1 && !h1.innerHTML.includes('<br>')) {
        h1.innerHTML = `Millstone<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">ミルストーン</span>`;
    }

    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    let impressionBox = quoteBoxes.find(qb => qb.textContent.includes('Burning Springsに関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ハイウェイ・タウンなどでバーテンダーを務めるキャラクターです。<br><br>マップ拡張で登場したNPCの一人。荒廃した世界の中でも一時の安らぎを提供する酒場の存在は、アパラチアの居住者たちの生活感と、そこを訪れる様々な人々の息遣いを見事に演出してくれます。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('millstone', `ハイウェイ・タウンのバーテンダー「ミルストーン」のロア記事をアップデートしました！🍸
過酷なウェイストランドの旅人に安らぎを提供する、酒場の生活感あふれるキャラクターです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/millstone.html`);
    console.log('Millstone fixed.');
};

fixMarianne();
fixMentats();
fixMillstone();
