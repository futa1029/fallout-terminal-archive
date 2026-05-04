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

// 1. Prize Bot
const fixPrizeBot = () => {
    const file = `f:/Fallout/prize_bot.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('prize_bot', `近づいてきてすぐ破壊されがちなロボット「ミスター・プライズボット」のロア記事をアップデートしました！🎁
彼が持ってくる「G.A.S.賞品証明書」の内容を読むと、戦前の企業の恐ろしい倫理観が見えてきます…。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/prize_bot.html`);
    console.log('Prize Bot fixed.');
};

// 2. PTS Update
const fixPtsUpdate = () => {
    const file = `f:/Fallout/pts-update-january-16-2026.html`;
    let html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    if (!html.includes('quote-box')) {
        const tagsDiv = document.querySelector('div[style*="margin-top: 30px; border-top: 1px dashed"]');
        if (tagsDiv) {
            tagsDiv.insertAdjacentHTML('beforebegin', `
            <div class="quote-box">
                <b>感想</b><br><br>
                2026年1月に行われたPTSアップデートの記録。<br><br>自爆ダメージの大幅な減少や、ピップボーイUIの刷新など、多くのQoL改善が含まれており、より快適なアパラチア生活の足掛かりとなったアップデートです。
            </div>\n`);
        }
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('pts-update-january-16-2026', `2026年1月の「PTSアップデート」記録記事を整理しました！📋
自爆ダメージのカットやピップボーイのUI刷新など、プレイがより快適になる大きな調整が入った歴史的なアップデートです。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/n079a207b462c.html`);
    console.log('PTS Update fixed.');
};

// 3. Public Party
const fixPublicParty = () => {
    const file = `f:/Fallout/public-party.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    if (!html.includes('quote-box')) {
        const tagsDiv = document.querySelector('div[style*="margin-top: 30px; border-top: 1px dashed"]');
        if (tagsDiv) {
            tagsDiv.insertAdjacentHTML('beforebegin', `
            <div class="quote-box">
                <b>感想</b><br><br>
                アパラチアで見知らぬプレイヤーと気軽にチームを組むことができる「パブリックパーティー（パブリックチーム）」システム。<br><br>この機能のおかげで、ソロプレイヤーも手軽にチームの恩恵を受けられるようになり、オンラインゲームとしてのFallout 76の楽しさが大きく広がりました。
            </div>\n`);
        }
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('public-party', `プレイを快適にする必須機能「パブリックパーティー」の解説記事をアップデートしました！👥
初心者の方も恐れずに、ログインしたらまずはカジュアルチームに入ることをオススメします！
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/nb5d107c47227.html`);
    console.log('Public Party fixed.');
};

fixPrizeBot();
fixPtsUpdate();
fixPublicParty();
