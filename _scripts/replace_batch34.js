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

// 1. Del Lawson
const fixDel = () => {
    const file = `f:/Fallout/del-lawson.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Check if quote-box with "感想" exists
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    let hasImpression = quoteBoxes.some(qb => qb.innerHTML.includes('感想'));
    
    if (!hasImpression) {
        // Find copyright block
        const copyrightBlock = document.querySelector('div[style*="margin-top: 30px; border-top: 1px dashed var(--accent-color)"]');
        if (copyrightBlock) {
            const impressionHtml = `
            <div class="quote-box">
                <b>感想</b><br><br>
                B.O.S.のイニシエイトとして、そしてキャンプの仲間である「同居人」としてキャンプに滞在してくれるキャラクターです。<br>
                整備士としての確かな腕を持ちながらも、一人になるのを嫌がったり、親から農業の才能がないと言われていたりと、親近感のわく人間らしいバックストーリーを持っています。<br>
                見た目や生い立ち、声優の起用に至るまで、実写ドラマ版Falloutの「マキシマス」を強く意識してデザインされている点が非常に面白いです。装備を修理してくれるデイリーバフも実用的ですね。<br>
                ただ、B.O.S.は私の敵です。
            </div>
            `;
            
            // Remove the old "まとめ" block
            const headings = Array.from(document.querySelectorAll('h2'));
            const summaryHeading = headings.find(h => h.textContent.includes('まとめ'));
            if (summaryHeading) {
                let current = summaryHeading.nextElementSibling;
                while (current && current.tagName !== 'DIV' && !current.tagName.match(/^H\d/)) {
                    const next = current.nextElementSibling;
                    current.remove();
                    current = next;
                }
                const hr = summaryHeading.previousElementSibling;
                if (hr && hr.tagName === 'HR') hr.remove();
                summaryHeading.remove();
            }

            copyrightBlock.insertAdjacentHTML('beforebegin', impressionHtml);
        }
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('del-lawson', `Atlantic Cityアップデートで追加されたB.O.S.イニシエイトの同居人「デル・ローソン」のロア記事をアップデートしました！🔧
背負っている大きなバッグや声優など、ドラマ版の「マキシマス」を意識してデザインされたと思われる、愛嬌のあるキャラクターです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/del-lawson.html`);
    console.log('Del Lawson fixed.');
};

// 2. Dorothea Dias
const fixDorothea = () => {
    const file = `f:/Fallout/dorothea-dias.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Find the quote-box with standard text without "感想"
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('WastelandersにてVault 79への侵入を目指す中'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>WastelandersにてVault 79への侵入を目指す中、「有能なブレイン」を探しにロブコ研究センターを訪れた際に出会う脳みその一人。<br><br>倫理委員会の反対を押し切って研究チーム全員の脳摘出プログラムを自ら推進したという生粋のマッドサイエンティストで、「ロボブレインへの搭載が遅すぎる！」と激しくご立腹の模様です。他二人よりも明らかに我が強くて傲慢な性格ですが、「Vault 79のタレットを設計した責任者本人」であるため、侵入チームの力強い味方になってくれます。見事にロボブレインに乗り移った際のハイテンションなセリフが最高です。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('dorothea-dias', `ロブコ研究センターに保存されている生きた脳みそ「ディアス博士」のロア記事をアップデートしました！🧠
 Vault 79侵入に必要な「有能なブレイン」候補の1人。強気で傲慢なマッドサイエンティストっぷりと、ロボブレインにインストールされた際のハイテンションなセリフが最高です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/dorothea-dias.html`);
    console.log('Dorothea Dias fixed.');
};

// 3. Dotty
const fixDotty = () => {
    const file = `f:/Fallout/dotty.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Check if quote-box with "感想" exists
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    let hasImpression = quoteBoxes.some(qb => qb.innerHTML.includes('感想'));
    
    if (!hasImpression) {
        // Find copyright block
        const copyrightBlock = document.querySelector('div[style*="margin-top: 30px; border-top: 1px dashed var(--accent-color)"]');
        if (copyrightBlock) {
            const impressionHtml = `
            <div class="quote-box">
                <b>感想</b><br><br>
                キャンプの同居人の中でも非常にキャラが濃い、独特な陰謀論を語るグールです。<br>
                自分のグール化を「思春期」で片付けたり、ランプが反乱を起こすのを警戒して銃を構えたりと、予測不能な言動がキャンプ生活に彩りを与えてくれます。<br>
                ヴォルト・テックを信頼しつつ、月を偽物だと言い張ったり、「トッド・ハワード」のミーム発言（It just works）をパクったりと、Falloutらしいユーモアに満ちていて最高ですね。<br>
                エネルギー耐性＋30に加え、INTとENDが上がるデイリーバフは、エネルギー武器を多用する敵と戦う際の実用性も兼ね備えています。
            </div>
            `;
            
            // Remove the old "感想" h3 block
            const headings = Array.from(document.querySelectorAll('h3'));
            const summaryHeading = headings.find(h => h.textContent.includes('感想'));
            if (summaryHeading) {
                let current = summaryHeading.nextElementSibling;
                while (current && current.tagName !== 'DIV' && !current.tagName.match(/^H\d/)) {
                    const next = current.nextElementSibling;
                    current.remove();
                    current = next;
                }
                const hr = summaryHeading.previousElementSibling;
                if (hr && hr.tagName === 'HR') hr.remove();
                summaryHeading.remove();
            }

            copyrightBlock.insertAdjacentHTML('beforebegin', impressionHtml);
        }
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('dotty', `怪しげな陰謀論を語る同居人「ドッティ」のロア記事をアップデートしました！👽
自分のグール化を「思春期」だと思い込んでいたり、月は偽物だと主張したりと、強烈な個性を持った愛すべき変人です。優秀なデイリーバフも付与してくれます。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/dotty.html`);
    console.log('Dotty fixed.');
};

fixDel();
fixDorothea();
fixDotty();
