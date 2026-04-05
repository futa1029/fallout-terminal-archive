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

// 1. Freed Ghoul (TV)
const fixFreedGhoul = () => {
    const file = `f:/Fallout/freed-ghoul-tv.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('グールとしての悲哀を体現する脇役キャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ドラマ版「Fallout」にて、クーパー（ザ・グール）の手によって捕らえられ利用されていたグールの1人です。<br><br>過酷なウェイストランドにおいて、理性を失いフェラル化する恐怖と隣り合わせに生きる彼らの悲哀と、賞金稼ぎとしてのザ・グールの冷酷さを印象付けるための重要な役割を担っていました。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('freed-ghoul-tv', `ドラマ版Falloutに登場した「解放されたグール」のロア記事をアップデートしました！📺
ザ・グールに捕らえられ、過酷なウェイストランドでフェラル化の恐怖に怯えながら生きる彼らの悲哀が描かれました。
#FalloutTV #フォールアウト
https://www.fallout-jp.com/freed-ghoul-tv.html`);
    console.log('Freed Ghoul TV fixed.');
};

// 2. George Yaffe
const fixGeorgeYaffe = () => {
    const file = `f:/Fallout/george-yaffe.html`;
    let html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('大戦前の時代背景を支えるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ドラマ版「Fallout」第1話の大戦前のシーンに登場するキャラクターです。<br><br>クーパー・ハワード（ザ・グール）が娘と仕事で訪れていた誕生日パーティーの出席者の一人。彼らを通して、大戦直前のアメリカ上流階級の不穏な空気感や、来るべき崩壊を微塵も感じさせない日常のコントラストが見事に描かれていました。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('george-yaffe', `ドラマ版Fallout第1話に登場する「ジョージ・ヤッフェ」のロア記事をアップデートしました！📺
大戦前の不穏な空気感と、破滅直前の平穏な日常のコントラストを描く上で重要な背景キャラクターです。
#FalloutTV #フォールアウト
https://www.fallout-jp.com/george-yaffe.html`);
    console.log('George Yaffe fixed.');
};

// 3. Gyro
const fixGyro = () => {
    const file = `f:/Fallout/gyro.html`;
    let html = fs.readFileSync(file, 'utf8');
    
    // Fix the broken [[Milepost Zero (location) tag
    html = html.replace('[[Milepost Zero (location)', 'マイルポスト・ゼロ');
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Add ruby string to h1 if not present
    const h1 = document.querySelector('h1');
    if (h1 && !h1.innerHTML.includes('<br>')) {
        h1.innerHTML = `Gyro<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">ジャイロ</span>`;
    }

    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    let impressionBox = quoteBoxes.find(qb => qb.textContent.includes('Milepost Zeroに関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>マイルポスト・ゼロを拠点とするブルーリッジ・キャラバンの護衛の1人です。<br><br>アップデート「Milepost Zero」で追加された過酷な護衛ミッションを共にする逞しい顔ぶれの一人。日々のキャラバン業務を通して、彼らの働きぶりに愛着が湧くプレイヤーも多いのではないでしょうか。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('gyro', `マイルポスト・ゼロを拠点とするブルーリッジの護衛の1人「ジャイロ」のロア記事をアップデートしました！🎒
アップデート「Milepost Zero」で追加された護衛ミッションで、過酷なキャラバンの荷運びをサポートしてくれる頼もしい存在です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/gyro.html`);
    console.log('Gyro fixed.');
};

fixFreedGhoul();
fixGeorgeYaffe();
fixGyro();
