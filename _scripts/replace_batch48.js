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

// 1. the-fisherman
const fixFisherman = () => {
    const file = `f:/Fallout/the-fisherman.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // Fix Quote Box Label
    const quotes = document.querySelectorAll('.quote-box');
    quotes.forEach(q => {
        if (q.textContent.includes('Gone Fissionアップデート')) {
            q.innerHTML = `<b>感想</b><br><br>Gone Fissionアップデートで追加された、謎に包まれたNPC。<br><br>うめき声のような彼独自の深海語（？）で相方のレイモンド・クラークと会話をしており、プレイヤーには全く内容が理解できませんが、何かを聞かれそうになったクラークに強烈な頭痛を引き起こさせて口封じする不気味な描写がみられます。知性を持ち、フレンドリーなNPCではありますが、その外見と不気味な背景設定とが相まって、非常に強烈なインパクトを残すクトゥルフ的なキャラクターとなっています。`;
        }
    });

    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('This article was created by translating')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/The%20Fisherman" target="_blank" rel="noopener">The Fisherman</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    fs.writeFileSync(file, dom.serialize());
    writePost('the-fisherman', `不気味な深海語を話し、相棒の精神を支配するクトゥルフ的な旅の商人「フィッシャーマン」のロア記事をアップデートしました！🎣🦑
彼らはいったいどこから来て、何の目的でウェイストランドの水質に干渉しているのでしょうか…？
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/the-fisherman.html`);
    console.log('Fisherman fixed.');
};

// 2. the-motherlode-robot
const fixMotherlode = () => {
    const file = `f:/Fallout/the-motherlode-robot.html`;
    let html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    const quotes = document.querySelectorAll('.quote-box');
    quotes.forEach(q => {
        if (q.textContent.includes('メインクエストに関わるロボット')) {
            q.outerHTML = `
            <div class="quote-box">
                <b>感想</b><br><br>
                アパラチアの地下深くに眠る巨大な掘削プラットフォーム。<br><br>メインクエストで初めてその巨体を目の当たりにした時の圧倒される感じは、Fallout 76ならではの体験ですね。戦前の「利益を最優先して労働者を切り捨てた」という生々しい企業倫理の闇を象徴する存在でもあります。
            </div>\n`;
        }
    });

    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('This article was created by translating')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/The_Motherlode_(robot)" target="_blank" rel="noopener">The Motherlode</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    fs.writeFileSync(file, dom.serialize());
    writePost('the-motherlode-robot', `ホーンライト社の巨大掘削プラットフォーム「マザーロード」の記事を更新しました！🚜
メインクエストで初めてその巨体とご対面した時は圧倒されましたね！戦前の冷酷な自動化計画を象徴する、悲しきロボットです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/the-motherlode-robot.html`);
    console.log('Motherlode fixed.');
};

// 3. the-wayward
const fixWayward = () => {
    const file = `f:/Fallout/the-wayward.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    const h2s = document.querySelectorAll('h2');
    for (let h of h2s) {
        if (h.textContent.includes('個人的な感想やらなんやら')) {
            const nextP = h.nextElementSibling;
            
            h.outerHTML = `
            <div class="quote-box">
                <b>感想</b><br><br>
                Wastelandersのアップデートで追加され、アパラチアに「生きた人間」が帰ってきたことを象徴する記念すべき場所です。<br><br>
                ダッチェスをはじめとする登場人物が非常に多く、それぞれが個性豊かな背景を持っているため、ロアを追っていくととても読み応えがあります。<br>個人的には、ゲーム初期の「まだ人間のNPCがいなかった頃」から遊んでいた身として、ここで初めて人間NPCから直接クエストを受けた時の衝撃は忘れられません。<br>（ちなみに毎週月曜日にスマイリーに金塊が入荷されるので、キャップに余裕がある方は忘れずに購入しましょう！）
            </div>\n`;
            if (nextP && nextP.tagName === 'P') nextP.remove();
        }
    }
    
    const hr = document.querySelectorAll('hr');
    hr.forEach(h => {
        if (h.nextElementSibling && h.nextElementSibling.classList && h.nextElementSibling.classList.contains('quote-box')) {
             h.remove(); // Remove trailing hr
        }
    });

    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('Star Wars wiki')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/The_Wayward" target="_blank" rel="noopener">The Wayward</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    fs.writeFileSync(file, dom.serialize());
    writePost('the-wayward', `アパラチアの新規プレイヤーが集う憩いの酒場「ザ・ウェイワード」のロア記事をアップデートしました！🍺
ダッチェスたちの過去や店の裏設定など、Wastelandersで「人間」が帰還した象徴的なロケーションの歴史をまとめています。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/n622f5b80604a.html`);
    console.log('Wayward fixed.');
};

fixFisherman();
fixMotherlode();
fixWayward();
