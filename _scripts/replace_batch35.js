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

// 1. Dr. Zorbo
const fixZorbo = () => {
    const file = `f:/Fallout/dr-zorbo.html`;
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
                自尊心が非っっっ常に高い宇宙の皇帝ですが、有能な相手はちゃんと褒めたり、元敵とも手を組んだりと、意外と柔軟で「コミュ力の高い悪役」といった感じで面白いキャラクターです。<br>
                キャプテン・コスモスに帝国を奪われても諦めず、わざわざ「地球破壊兵器」を作ろうとする執念とエネルギーは悪役の鑑ですね。<br>
                Fallout 76のシーズンボード「Zorbo's Revenge」などでお馴染みの顔ですが、彼の背景を知ると、あの派手な衣装にも彼の並々ならぬ「皇帝のプライド」を感じてしまいます。
            </div>
            `;
            
            // Remove the old "まとめ" block
            const headings = Array.from(document.querySelectorAll('h2'));
            const summaryHeading = headings.find(h => h.textContent.includes('まとめ'));
            if (summaryHeading) {
                let current = summaryHeading.nextElementSibling;
                while (current && current.tagName !== 'DIV' && !current.tagName.match(/^H\d/)) {
                    if (current.classList && current.classList.contains('note-figure')) {
                        // Keep images
                        current = current.nextElementSibling;
                        continue;
                    }
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
    
    writePost('dr-zorbo', `キャプテン・コスモスの宿敵でもある悪の皇帝「ドクター・ゾルボ」のロア記事をアップデートしました！👽
傲慢でエゴイストな性格の一方で、有能な者は敵でも称賛し、かつてのライバルとも手を組むなど、意外と度量の広い名ヴィランです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/dr-zorbo.html`);
    console.log('Dr Zorbo fixed.');
};

// 2. Eugenie
const fixEugenie = () => {
    const file = `f:/Fallout/eugenie.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Find the quote-box
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    const impressionBox = quoteBoxes.find(qb => qb.textContent.includes('ブルーリッジ・キャラバンに関わるキャラクター'));
    
    if (impressionBox && !impressionBox.innerHTML.includes('感想')) {
        impressionBox.innerHTML = `<b>感想</b><br><br>「Riding Shotgun」イベントなどでビッグベンド・トンネルを往復するブルーリッジ・キャラバンの商人グール。<br>無口で無骨なキーランと、おしゃべりで社交的なユージニーのコンビは見ていて微笑ましいものがあります。<br>過去にグールだけのコミュニティ（レヴェナント）に属していたものの、自らの足で外の世界を歩くことを決意した彼女の逞しさと、友人たちに見せる気遣いは、過酷なアパラチアにおける一服の清涼剤のような存在です。`;
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('eugenie', `ブルーリッジ・キャラバンの商人グール「ユージニー」のロア記事をアップデートしました！🐮
 無口なキーランとおしゃべりなユージニーのデコボココンビが好きという方も多いのではないでしょうか。安全なグールのコミュニティを飛び出し、自分の力で道を切り開くたくましい女性です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/eugenie.html`);
    console.log('Eugenie fixed.');
};

// 3. Foosball Game
const fixFoosball = () => {
    const file = `f:/Fallout/foosball-game.html`;
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
                シーズナルアイテム解説としての追加でしたが、なんと「Fallout TVシリーズ」でもVault 33の居住者たちが楽しそうにプレイしている様子が描かれていました！<br>
                C.A.M.P.に設置して使用すると「STR+2」の優秀なバフが得られるため、近接ビルドや所持重量を確保したいプレイヤーには嬉しいアイテムです。<br>
                日本のゲームセンターなどではエアホッケーに取って代わられた感があるためあまり馴染みがありませんが、アメリカのバーテンダー文化やレクリエーションとしては非常にポピュラーな遊びです。
            </div>
            `;
            
            // Look for the paragraphs that talk about its impression
            const paras = Array.from(document.querySelectorAll('p'));
            const impressionParaStart = paras.find(p => p.textContent.includes('というわけでシーズナルアイテム徹底解説マンです。'));
            if (impressionParaStart) {
                let current = impressionParaStart;
                while (current && current.tagName !== 'DIV' && !current.tagName.match(/^H\d/)) {
                    const next = current.nextElementSibling;
                    current.remove();
                    current = next;
                }
                const hr = impressionParaStart.previousElementSibling;
                if (hr && hr.tagName === 'HR') hr.remove();
            }

            copyrightBlock.insertAdjacentHTML('beforebegin', impressionHtml);
        }
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('foosball-game', `シーズン報酬等で入手できる家具「フーズボールゲーム」の記事をアップデートしました！⚽
使用するとSTR+2の優秀なバフが得られるアイテムです。ドラマ版FalloutでもVault居住者たちが遊んでいる様子が描かれていましたね。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/foosball-game.html`);
    console.log('Foosball Game fixed.');
};

fixZorbo();
fixEugenie();
fixFoosball();
