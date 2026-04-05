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

// 1. Josie
const fixJosie = () => {
    const file = `f:/Fallout/josie-milepost-zero.html`;
    let html = fs.readFileSync(file, 'utf8');
    
    // Fix broken wiki links
    html = html.replace(/\[\[Brahmin \(Fallout 76\)/g, 'バラモン');
    html = html.replace(/\[\[Milepost Zero \(location\)/g, 'マイルポスト・ゼロ');
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const h1 = document.querySelector('h1');
    if (h1 && !h1.innerHTML.includes('<br>')) {
        h1.innerHTML = `Josie<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">ジョージー</span>`;
    }

    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('Milepost Zeroに関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>マイルポスト・ゼロを拠点とするブルーリッジ・キャラバンが連れているパック・バラモンの一頭です。<br><br>アパラチアの過酷な道のりを、大量の荷物を背負って黙々と歩き続ける頼もしい相棒。プレイヤーがキャラバン護衛を行う際にも、彼女らバラモンのペースに合わせて進むことになり、そのユーモラスな足取りや鳴き声に癒やされることでしょう。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('josie-milepost-zero', `マイルポスト・ゼロのパック・バラモン「ジョージー」のロア記事をアップデートしました！🐮
過酷なキャラバン護衛において、大量の荷物を運んでくれる重要なパートナーです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/josie-milepost-zero.html`);
    console.log('Josie fixed.');
};

// 2. Leamon Price
const fixLeamonPrice = () => {
    const file = `f:/Fallout/leamon-price.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('Ghoul Withinに関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>エメット山処理場での探索中に被曝して余命宣告を受け、レディアント・ヒルズでグール化する道を選んだスカベンジャー、レモン・プライス。<br><br>「自分を誇ってもらえるような生きがいを見つけたい」という夢を抱え、不治の病と盗賊の襲撃という絶望的な状況に直面しながらも、ただ死を待つのではなく人間性を残した「グール」として再生する彼の決断は、Fallout世界の過酷さと微かな希望を体現する非常に印象深いサイドストーリーです。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('leamon-price', `グール化の道を選択したスカベンジャー「レモン・プライス」のロア記事をアップデートしました！☢️
不治の被曝と盗賊の襲撃に直面しながらも「生きがい」を諦めなかった彼の決断を描く、印象的なサイドストーリーです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/leamon-price.html`);
    console.log('Leamon Price fixed.');
};

// 3. Luke
const fixLuke = () => {
    const file = `f:/Fallout/luke-milepost-zero.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const h1 = document.querySelector('h1');
    if (h1 && !h1.innerHTML.includes('<br>')) {
        h1.innerHTML = `Luke<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">ルーク</span>`;
    }

    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    let impressionBox = quoteBoxes.find(qb => qb.textContent.includes('アパラチアで命を落としたキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ストーニーマン監視施設などで無惨な遺体として発見される、ブルーリッジ・キャラバンの商人兼護衛、ルーク。<br><br>「Milepost Zero」アップデートで追加されたキャラクターの一人ですが、生きた姿を見ることはなく、彼の遺した痕跡から過酷なキャラバン稼業の厳しい現実とアパラチアの山の恐ろしさを思い知らされることになります。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('luke-milepost-zero', `ブルーリッジの商人「ルーク」のロア記事をアップデートしました！🎒
Milepost Zeroアップデートで登場したものの、無惨な遺体としてのみ発見される悲運のキャラクター。護衛稼業の過酷さを物語っています。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/luke-milepost-zero.html`);
    console.log('Luke fixed.');
};

fixJosie();
fixLeamonPrice();
fixLuke();
