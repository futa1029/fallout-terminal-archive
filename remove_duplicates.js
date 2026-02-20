const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';
const DATA_FILE = path.join(DIR, 'note_articles_data.json');
const LORE_HTML = path.join(DIR, 'lore.html');

// 既存の9件の手動定義データ（維持するオリジナル版）
const manualEntries = [
    { name: "アーロン・キンボール", yomi: "あーろん・きんぼーる", url: "kimball.html", category: "人物", appearance: ["Fallout: New Vegas"], date: "2026-02-19" },
    { name: "レイダー (Fallout 76)", yomi: "れいだー", url: "raiders_76.html", category: "勢力", appearance: ["Fallout 76"], date: "2026-02-19" },
    { name: "リー・モルデイヴァー", yomi: "りー・もるでいゔぁー", url: "lee_moldaver.html", category: "人物", appearance: ["Fallout TV"], date: "2026-02-19" },
    { name: "Vaultの居住者", yomi: "ぼるとのきょじゅうしゃ", url: "vault_dweller_lore.html", category: "人物", appearance: ["Fallout"], date: "2026-02-18" },
    { name: "回収されたアサルトロン頭部", yomi: "かいしゅうされたあさるとろんとうぶ", url: "assaultron_head.html", category: "武器", appearance: ["Fallout 4", "Fallout 76"], date: "2026-02-20" },
    { name: "ブライト", yomi: "ぶらいと", url: "blight.html", category: "植物", appearance: ["Fallout 76"], date: "2026-02-20" },
    { name: "タンディ", yomi: "たんでぃ", url: "tandi.html", category: "人物", appearance: ["Fallout", "Fallout 2"], date: "2026-02-20" },
    { name: "ミスター・プライズボット", yomi: "みすたー・ぷらいずぼっと", url: "prize_bot.html", category: "人物", appearance: ["Fallout 76"], date: "2026-02-20" },
    { name: "新カリフォルニア共和国 (NCR)", yomi: "しんかりふぉるにあきょうわこく", url: "ncr.html", category: "勢力", appearance: ["Fallout", "Fallout 2", "Fallout: New Vegas", "Fallout TV"], date: "2026-02-20" },
    { name: "バッファロー・ゴードの種", yomi: "ばっふぁろー・ごーどのたね", url: "buffalo-gourd-seed.html", category: "植物", appearance: ["Fallout: New Vegas"], date: "2026-02-21" }
];

// 重複判定に用いるベースキーワード
const duplicateKeywords = [
    "アーロン・キンボール",
    "レイダー",
    "リー・モルデイヴァー",
    "Vaultの居住者",
    "アサルトロン頭部",
    "ブライト",
    "タンディ",
    "プライズボット",
    "新カリフォルニア共和国"
];

function isDuplicate(title) {
    for (let kw of duplicateKeywords) {
        if (title.includes(kw)) {
            return true;
        }
    }
    return false;
}

function guessCategoryAndAppearance(title, bodyText) {
    let cat = "";
    let apps = new Set();
    const t = title.toLowerCase();
    const b = bodyText ? bodyText.toLowerCase() : "";

    if (/(駅|小屋|邸宅|集会所|タワー|農場|工場|キャンプ|・リッジ|ロッジ|会社|製造所|橋|灯台|研究所|パビリオン|酒場|教会|Vault|廃品集積場)/.test(t)) cat = "場所";
    if (/(ピストル|ガン|ライフル|アサルト|ブランダーバス|剣|弓|頭部|フレア)/.test(t)) cat = "武器";
    if (/(レイダー|エンクレイヴ|入植者|フリーラジカルズ|レスポンダー|ブラザーフッド|BOS|カルト)/.test(t)) cat = "勢力";
    if (/(おばあちゃん|ダッチェス|モート|ソール|ポリー|キンボール|タンディ|モルデイヴァー|デル・ローソン|モルデカイ|居住者|フランク|ジョン・ハンコック|マジソン・リー|チェイス|サパースタイン)/.test(t)) cat = "人物";
    if (/(アングラー|スコーチ|ウェンディゴ|ブロートフライ|アサルトロン|ハンディ|プロテクトロン|モールラット|アリ|デスクロー|ビーバー|犬|ラット|ゼータ|モスマン)/.test(t)) cat = "クリーチャー";
    if (/(花|ハルシジェン|ブライト|ユッカ|キノコ|茸|カボチャ|スーザン|マリーゴールド)/.test(t)) cat = "植物";
    if (/(メンタス|スティムパック|rad-x|radaway|サイコ|アディクトール|ヌカシャイン|コーラ|サルサパリラ|フード|シュガーボム)/.test(t)) cat = "アイテム";

    apps.add("Fallout 76");
    if (t.includes("fallout tv") || t.includes("ドラマ") || b.includes("ドラマ版")) apps.add("Fallout TV");
    if (t.includes("new vegas") || b.includes("new vegas") || b.includes("ニューベガス")) apps.add("Fallout: New Vegas");
    if (t.includes("fallout 4") || b.includes("連邦")) apps.add("Fallout 4");
    if (t.includes("fallout 3") || b.includes("キャピタル")) apps.add("Fallout 3");
    if (b.includes("fallout 1") || b.includes("fallout 2")) {
        if (b.includes("fallout 1")) apps.add("Fallout");
        if (b.includes("fallout 2")) apps.add("Fallout 2");
    }
    return { category: cat, appearance: Array.from(apps) };
}

async function rebuildLoreHtml() {
    if (!fs.existsSync(DATA_FILE) || !fs.existsSync(LORE_HTML)) {
        console.log('Required files not found.');
        return;
    }

    const dataRaw = fs.readFileSync(DATA_FILE, 'utf8');
    const articles = JSON.parse(dataRaw);
    let loreContent = fs.readFileSync(LORE_HTML, 'utf8');

    const regex = /const loreEntries = \[[\s\S]*?\];/;
    let finalEntriesObjStr = `const loreEntries = [\n`;

    // 1. まず手作業で作った完全版を配列へ追加
    manualEntries.forEach(e => {
        finalEntriesObjStr += `            {
                name: "${e.name}",
                yomi: "${e.yomi}",
                url: "${e.url}",
                category: "${e.category}",
                appearance: ${JSON.stringify(e.appearance)},
                date: "${e.date}"
            },\n`;
    });

    let removedCount = 0;
    const usedFilenames = new Set();
    const protectedFiles = ['kimball', 'tandi', 'raiders_76', 'blight', 'ncr', 'prize_bot', 'assaultron_head', 'lee_moldaver', 'vault_dweller_lore', 'vault_dweller_jp', 'wayward_jp', 'buffalo-gourd-seed'];
    protectedFiles.forEach(f => usedFilenames.add(`${f}.html`));

    let titleToSlug = {};
    const slugPath = path.join(DIR, 'title_to_slug.json');
    if (fs.existsSync(slugPath)) {
        titleToSlug = JSON.parse(fs.readFileSync(slugPath, 'utf8'));
    }

    // 2. Note記事を追加（ただし重複するものは除外＆ファイルを削除）
    articles.forEach(article => {
        let sanitized = '';
        if (titleToSlug[article.title]) {
            sanitized = titleToSlug[article.title];
        } else {
            sanitized = article.title.replace(/[\\/:*?"<>|]/g, '_').trim();
            if (!sanitized) sanitized = 'untitled';
        }
        let htmlFilename = `${sanitized}.html`;
        let counter = 2;
        while (usedFilenames.has(htmlFilename)) {
            htmlFilename = `${sanitized}_${counter}.html`;
            counter++;
        }
        usedFilenames.add(htmlFilename);

        // 重複判定
        if (isDuplicate(article.title)) {
            removedCount++;
            console.log(`[Removed Duplicate] ${article.title}`);
            const htmlFilePath = path.join(DIR, htmlFilename);
            if (fs.existsSync(htmlFilePath)) {
                fs.unlinkSync(htmlFilePath);
            }
            return;
        }

        const safeTitle = article.title.replace(/"/g, '\\"');
        const dateStr = new Date(article.date).toISOString().split('T')[0];
        const { category, appearance } = guessCategoryAndAppearance(article.title, article.bodyHtml);

        finalEntriesObjStr += `            {
                name: "${safeTitle}",
                yomi: "${safeTitle}",
                url: "${htmlFilename}",
                category: "${category}",
                appearance: ${JSON.stringify(appearance)},
                date: "${dateStr}"
            },\n`;
    });

    finalEntriesObjStr = finalEntriesObjStr.slice(0, -2) + `\n        ];`;

    if (regex.test(loreContent)) {
        loreContent = loreContent.replace(regex, finalEntriesObjStr);
        fs.writeFileSync(LORE_HTML, loreContent, 'utf8');
        console.log(`Successfully removed ${removedCount} duplicate articles and regenerated loreEntries!`);
    } else {
        console.log('Could not find existing loreEntries bracket!');
    }
}

rebuildLoreHtml();
