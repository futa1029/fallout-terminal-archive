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

// 1. Hank Madigan
const fixHankMadigan = () => {
    const file = `f:/Fallout/hank-madigan.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('レスポンダーズに関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>世界の頂上の檻の中で無惨な遺体として発見される、元B.O.S.にしてファイヤーブリーザーの小隊長、ハンク・マディガン。<br><br>スコーチ病からアパラチアを救うという使命感を持ち、派閥間の和平交渉という極めて困難な任務に挑もうとした彼の足跡は、探索を進めるほどにプレイヤーの胸を打ちます。彼の遺志を継ぐ展開は、メインクエスト序盤の大きな原動力になりますね。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('hank-madigan', `ファイヤーブリーザーの小隊長「ハンク・マディガン」のロア記事をアップデートしました！🔥
世界の頂上で待ち受ける彼の悲劇的な結末と、アパラチアを救うために奔走した英雄的な足跡をまとめました。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/hank-madigan.html`);
    console.log('Hank Madigan fixed.');
};

// 2. John Holloway
const fixJohnHolloway = () => {
    const file = `f:/Fallout/john-holloway.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const h1 = document.querySelector('h1');
    if (h1 && !h1.innerHTML.includes('<br>')) {
        h1.innerHTML = `John Holloway<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">ジョン・ホロウェイ</span>`;
    }

    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('Gleaming Depthsに関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>今後のレイドコンテンツ「Gleaming Depths（輝く深淵）」に関連して登場するキャラクターです。<br><br>巨大な地下施設を舞台に繰り広げられる過酷な戦いのバックグラウンドとして、彼のような研究所の警備員の存在が、エンクレイヴの非道な実験や地下深くの恐怖をよりリアルに引き立ててくれることでしょう。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('john-holloway', `Gleaming Depthsに関連するNPC「ジョン・ホロウェイ」の記事をアップデートしました！🔦
来たる地下レイドコンテンツに向けた、エンクレイヴ施設に関わる新たなバックストーリー情報です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/john-holloway.html`);
    console.log('John Holloway fixed.');
};

// 3. Johnny Weston
const fixJohnnyWeston = () => {
    const file = `f:/Fallout/johnny-weston.html`;
    let html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    let impressionBox = quoteBoxes.find(qb => qb.textContent.includes('レイダー（クレーター）に関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>レイダー（クレーター）の幹部であり、Vault 79への金塊強奪作戦における重要な潜入担当、ジョニー・ウェストン。<br><br>「ジェントルマン」の異名通り、洗練された言葉遣いや伊達男ぶりを見せますが、裏にある詐欺師としての冷酷さや自己中心的で傲慢な一面、そしてメグらとの複雑な人間関係が非常に人間臭く描かれています。カリスマ性と危うさを併せ持つ、魅力的な悪党ですね。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('johnny-weston', `レイダーの伊達男「ジョニー・ウェストン」のロア記事をアップデートしました！♠️
Vault 79襲撃作戦の要となる凄腕の詐欺師。彼の生い立ちからメグらとの複雑な愛憎関係まで、深掘りすると非常に人間臭い悪党です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/johnny-weston.html`);
    console.log('Johnny Weston fixed.');
};

fixHankMadigan();
fixJohnHolloway();
fixJohnnyWeston();
