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

// 1. thunder-mountain-pp-yard
const fixThunder = () => {
    const file = `f:/Fallout/thunder-mountain-pp-yard.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    const quotes = document.querySelectorAll('.quote-box');
    quotes.forEach(q => {
        if (q.textContent.includes('発電所の付属施設')) {
            q.innerHTML = `<b>感想</b><br><br>サンダーマウンテン発電所の敷地内にあるヤード。<br><br>メインの発電所探索のついでに立ち寄る小規模なエリアですが、パワーアーマーやジャンクなどの戦利品が点在しており、序盤から中盤にかけての物資補給ポイントとして地味に役立ちます。発電所復旧イベントのついでに探索するプレイヤーも多いのではないでしょうか。`;
        }
    });

    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('This article was created by translating')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Thunder_Mountain_Power_Plant_yard" target="_blank" rel="noopener">Thunder Mountain Power Plant Yard</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    fs.writeFileSync(file, dom.serialize());
    writePost('thunder-mountain-pp-yard', `マイア地域のロケーション「サンダー・マウンテン発電所ヤード」のロア記事を更新しました！⚡
発電所のすぐ脇にある小規模なエリアですが、パワーアーマーや役立つジャンクが配置されている、探索の穴場スポットでもあります。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/thunder-mountain-pp-yard.html`);
    console.log('Thunder Mountain fixed.');
};

// 2. vault-13
const fixVault13 = () => {
    const file = `f:/Fallout/vault-13.html`;
    let html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // Add Impression Quote Box before tags
    const targetTagContainer = Array.from(document.querySelectorAll('div')).find(div => 
        div.textContent.includes('TAGS:') && div.style.marginBottom === '10px'
    );

    if (targetTagContainer && !document.querySelector('.quote-box')) {
        targetTagContainer.parentElement.insertAdjacentHTML('beforebegin', `
            <div class="quote-box">
                <b>感想</b><br><br>
                Falloutシリーズにおける「原点」といえるVault。<br><br>初代Falloutの主人公であるVault居住者の故郷であり、ここから追放されるという冷酷な結末は、シリーズ特有の容赦ない悲観的な世界観を見事に決定づけました。後続の作品でも度々言及され、Fallout 2では言葉を話すデスクローの平和的なコミュニティが形成されていたりと、シリーズファンにとっては非常に思い入れの深いロケーションです。
            </div>\n`);
    }

    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('Endor') || p.textContent.includes('Fallout wiki')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Vault_13" target="_blank" rel="noopener">Vault 13</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    fs.writeFileSync(file, dom.serialize());
    writePost('vault-13', `Falloutシリーズの原点にして伝説の場所、「Vault 13」のロア記事を更新しました！⚙️
初代主人公の故郷でもあり、Fallout 2では知性を持つデスクローが暮らしていたりと、シリーズを通じて非常に数奇な運命を辿った実験施設です。
#Fallout #ClassicFallout
https://www.fallout-jp.com/nc778ca640f7d.html`); // Using the unique link nc778ca640f7d.html
    console.log('Vault 13 fixed.');
};

// 3. watoga-station
const fixWatoga = () => {
    const file = `f:/Fallout/watoga-station.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    const quotes = document.querySelectorAll('.quote-box');
    quotes.forEach(q => {
        if (q.textContent.includes('ワトガ探索の拠点')) {
            q.innerHTML = `<b>感想</b><br><br>クランベリー湿原の南部、ワトガのすぐ近くにある鉄道駅。<br><br>このエリアを探索する際の非常に重要な中継拠点となります。ベンダーボット・フェニックスが店番をしており、貴重な設計図やモジュールを仕入れるために通うプレイヤーも多い場所です。高レベル帯のプレイヤーが集うこともあり、常に誰かしら訪れている印象がありますね。`;
        }
    });

    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('This article was created by translating')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Watoga_Station" target="_blank" rel="noopener">Watoga Station</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    fs.writeFileSync(file, dom.serialize());
    writePost('watoga-station', `クランベリー湿原探索の重要拠点、「ワトガ駅」の記事を更新しました！🚉
ベンダーボット・フェニックスから設計図やモジュールを仕入れるため、多くのレジデントが日夜通い詰めるお馴染みの駅です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/watoga-station.html`);
    console.log('Watoga Station fixed.');
};

fixThunder();
fixVault13();
fixWatoga();
