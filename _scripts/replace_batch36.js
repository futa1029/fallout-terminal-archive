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

// 1. Former Raider
const fixFormerRaider = () => {
    const file = `f:/Fallout/former-raider.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Find the quote-box with standard text without "感想"
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('レイダー（クレーター）に関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>アパラチア各地でランダムエンカウントする「元レイダー」のNPCです。<br><br>過酷なレイダーとしての生活から足を洗い、新たな生き方を模索する彼らの姿からは、ウェイストランドで生き抜くことの厳しさと人間らしい葛藤が垣間見えます。派閥にとらわれない等身大の視点で話を聞くことができる、アパラチアのモブの中でもどこか憎めない存在ですね。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('former-raider', `アパラチア各地でランダムに出会うNPC「元レイダー」のロア記事をアップデートしました！🏕️
過酷なレイダー稼業から足を洗い、ウェイストランドで新たな生き方を模索する等身大の人々。話しかけてみると意外と人間らしい葛藤が聞けたりします。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/former-raider.html`);
    console.log('Former Raider fixed.');
};

// 2. Fraternity Row
const fixFraternityRow = () => {
    const file = `f:/Fallout/fraternity-row.html`;
    let html = fs.readFileSync(file, 'utf8');
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
                ヴォルト・テック大学の学生たちがかつて謳歌していた、活気ある学生生活の跡が色濃く残るロケーションです。<br>
                ゴミ箱の中の悲痛なメモや玄関マットの下の置き手紙など、戦前の人々の何気ない日常や不穏な予兆を感じさせるディテールが随所に散りばめられており、探索していて非常に引き込まれます。<br>
                なんといっても、クエスト「Wasted on Nukashine」の重要な舞台であり、ここからアパラチアでの「お酒造り」の長い長い旅が始まると思うと感慨深い場所ですね。
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
    
    writePost('fraternity-row', `モーガンタウンの学生街「フラタニティ・ロウ」のロア記事をアップデートしました！🎓
戦前の学生たちの日常や悲劇的なメモが残されるロケーション。クエスト「Wasted on Nukashine」の舞台であり、ここからお酒造りの旅が始まります。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/fraternity-row.html`);
    console.log('Fraternity Row fixed.');
};

// 3. Freddie Lang
const fixFreddieLang = () => {
    const file = `f:/Fallout/freddie-lang.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Find the quote-box with standard text without "感想"
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('レイダーに関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>ブラックウォーター鉱山の奥深くで、発光するフェラル・グール（光りし者）として立ちはだかる悲劇の元レイダー、フレディ・ラング。<br><br>部下の不注意による放射線漏れに気づかず、少しずつ被曝して正気を失っていく過程がターミナルに綴られており、非常に生々しく恐ろしいバックストーリーを持っています。<br>クエスト「The Missing Link」で見つけるレイダーの死体の数増や、戦前の恋人を想う彼女の悲哀など、アパラチア初期の絶望感が凝縮されたようなキャラクターです。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('freddie-lang', `ブラックウォーター鉱山の光りし者「フレディ・ラング」のロア記事をアップデートしました！☢️
放射線漏れにより徐々に正気を失っていく過程がターミナルに残されている、悲劇的なバックストーリーを持つ元レイダーのリーダーです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/freddie-lang.html`);
    console.log('Freddie Lang fixed.');
};

fixFormerRaider();
fixFraternityRow();
fixFreddieLang();
