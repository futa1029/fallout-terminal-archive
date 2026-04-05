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

// 1. Mutation
const fixMutation = () => {
    const file = `f:/Fallout/mutation.html`;
    let html = fs.readFileSync(file, 'utf8');

    // Fix broken incorrect copyright "Endor" from Star Wars
    html = html.replace(/<p[^>]*>\s*This article uses material from the “Endor” article on the Star Wars wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License\.\s*<\/p>/g, '');
    
    // Add quote box if missing
    if (!html.includes('quote-box')) {
        const target = `<p name="82c88aca-e036-4e88-bf74-6e75fb3d068b" id="82c88aca-e036-4e88-bf74-6e75fb3d068b">後どうでもいい豆知識としてClass Freakは変異を抑制しますが、スピード狂に関しては抑制しません。<br>又、例としてClass FreakLv3で75%抑制すると、エッグヘッド変異のデメリットが<a href="pip-boy.html" class="auto-link">Pip-Boy</a>上で「STR &gt;-1 END &gt;-1」と表示されるのは、3の75%が整数でないためですが、これらに基づく運搬重量、アクションポイント、体力などのステータスはわずかに減少します。</p>`;
        const quoteHtml = `\n<div class="quote-box"><b>感想</b><br><br>Fallout 76におけるキャラクタービルドの要となるシステム。<br><br>かつてのシリーズではただのデバフであった放射能による変異を、プレイスタイルを劇的に変化させる強力なバフへと昇華させており、空高くジャンプしたり敵に血を浴びせてダメージを与えたりと、アパラチアの過酷な環境を象徴する重要な要素と言えます。</div>`;
        html = html.replace(target, target + quoteHtml);
    }
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Check if the correct copyright string is present
    if (!html.includes('Nukapedia: The Fallout Wiki')) {
        const donationPara = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('寄付を受け付けております'));
        if (donationPara) {
            donationPara.insertAdjacentHTML('beforebegin', `<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Mutation" target="_blank" rel="noopener">Mutation</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>\n`);
        }
    }

    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('mutation', `キャラクタービルドの要となるシステム「変異」のロア記事をアップデートしました！🧬
放射能による恐ろしい影響を強力なバフとして利用する、Fallout 76ならではの要素について解説しています。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/n73e8736701ca.html`);
    console.log('Mutation fixed.');
};

// 2. Party Hat
const fixPartyHat = () => {
    const file = `f:/Fallout/party-hat.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const targetP = document.getElementById('c3abca38-22ae-4c55-bef0-f397b6cb602b');
    const targetH2 = document.getElementById('ef2c0068-2437-447c-b5f0-6a81c7ac5c73');
    
    if (targetP && targetH2 && !document.querySelector('.quote-box')) {
        const quoteHtml = `<div class="quote-box"><b>感想</b><br><br>Vault 76を旅立つ際に最初に手に入れるアパレル装備。<br><br>お祭り気分のまま外の世界へ飛び出していくVault居住者の「浮かれっぷり」を象徴するようなアイテムですが、これを被ったままスコーチやグールに襲われている姿は非常にシュールで、アパラチアの冷酷な現実を際立たせてくれますね。<br><br>（※旧サイトでの100記事目を記念した記事でした。初心にかえりたい人はモーガンタウンへ！）</div>`;
        targetP.insertAdjacentHTML('beforebegin', quoteHtml);
        targetP.remove();
        targetH2.remove();
    }
    
    // Check if the correct copyright string is present
    const overallHtml = dom.serialize();
    if (!overallHtml.includes('Nukapedia: The Fallout Wiki')) {
        const donationPara = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('寄付を受け付けております'));
        if (donationPara) {
            donationPara.insertAdjacentHTML('beforebegin', `<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Party_hat_(Fallout_76)" target="_blank" rel="noopener">Party hat</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>\n`);
        }
    }

    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('party-hat', `Vault居住者の最初の装備「パーティーハット」のロア記事をアップデートしました！🥳
お祭り気分で外に出た直後にウェイストランドの洗礼を受ける、なんともシュールなアイテムです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/n33e5725b2558.html`);
    console.log('Party Hat fixed.');
};

// 3. Pop
const fixPop = () => {
    const file = `f:/Fallout/pop.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('Burning Springsに関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ウェイストランドの過酷な環境下で生きる入植者の一人。<br><br>荒廃した世界の中でも日々の生活を営もうとする人々の姿を描くモブキャラクター的存在ですが、彼らのような一般人がいるからこそ、アパラチアの世界観に深みとリアリティが生まれているのを感じますね。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('pop', `アパラチアで生きる入植者「Pop」のロア記事をアップデートしました！👨‍🌾
名もなきNPCたちの存在が、ウェイストランドの世界にリアリティを与えてくれていますね。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/pop.html`);
    console.log('Pop fixed.');
};

fixMutation();
fixPartyHat();
fixPop();
