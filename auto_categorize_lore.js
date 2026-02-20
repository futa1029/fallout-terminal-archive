const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';
const DATA_FILE = path.join(DIR, 'note_articles_data.json');
const LORE_HTML = path.join(DIR, 'lore.html');

// 既存の9件の手動定義データ
const manualEntries = [
    { name: "アーロン・キンボール", yomi: "あーろん・きんぼーる", url: "kimball.html", category: "人物", appearance: ["Fallout: New Vegas"], date: "2026-02-19" },
    { name: "レイダー (Fallout 76)", yomi: "れいだー", url: "raiders_76.html", category: "勢力", appearance: ["Fallout 76"], date: "2026-02-19" },
    { name: "リー・モルデイヴァー", yomi: "りー・もるでいゔぁー", url: "lee_moldaver.html", category: "人物", appearance: ["Fallout TV"], date: "2026-02-19" },
    { name: "Vaultの居住者", yomi: "ぼるとのきょじゅうしゃ", url: "vault_dweller_lore.html", category: "人物", appearance: ["Fallout"], date: "2026-02-18" },
    { name: "回収されたアサルトロン頭部", yomi: "かいしゅうされたあさるとろんとうぶ", url: "assaultron_head.html", category: "武器", appearance: ["Fallout 4", "Fallout 76"], date: "2026-02-20" },
    { name: "ブライト", yomi: "ぶらいと", url: "blight.html", category: "植物", appearance: ["Fallout 76"], date: "2026-02-20" },
    { name: "タンディ", yomi: "たんでぃ", url: "tandi.html", category: "人物", appearance: ["Fallout", "Fallout 2"], date: "2026-02-20" },
    { name: "ミスター・プライズボット", yomi: "みすたー・ぷらいずぼっと", url: "prize_bot.html", category: "人物", appearance: ["Fallout 76"], date: "2026-02-20" },
    { name: "新カリフォルニア共和国 (NCR)", yomi: "しんかりふぉるにあきょうわこく", url: "ncr.html", category: "勢力", appearance: ["Fallout", "Fallout 2", "Fallout: New Vegas", "Fallout TV"], date: "2026-02-20" }
];

function guessCategoryAndAppearance(title, bodyText) {
    let cat = "";
    let apps = new Set();

    const t = title.toLowerCase();
    const b = bodyText ? bodyText.toLowerCase() : "";

    // -- Category Guessing --
    if (/(駅|小屋|邸宅|集会所|タワー|農場|工場|キャンプ|・リッジ|ロッジ|会社|製造所|橋|灯台|研究所|パビリオン|酒場|教会|Vault|廃品集積場)/.test(t)) cat = "場所";
    if (/(ピストル|ガン|ライフル|アサルト|ブランダーバス|剣|弓|頭部|フレア)/.test(t)) cat = "武器";
    if (/(レイダー|エンクレイヴ|入植者|フリーラジカルズ|レスポンダー|ブラザーフッド|BOS|カルト)/.test(t)) cat = "勢力";
    if (/(おばあちゃん|ダッチェス|モート|ソール|ポリー|キンボール|タンディ|モルデイヴァー|デル・ローソン|モルデカイ|居住者|フランク|ジョン・ハンコック|マジソン・リー|チェイス|サパースタイン)/.test(t)) cat = "人物";
    if (/(アングラー|スコーチ|ウェンディゴ|ブロートフライ|アサルトロン|ハンディ|プロテクトロン|モールラット|アリ|デスクロー|ビーバー|犬|ラット|ゼータ|モスマン)/.test(t)) cat = "クリーチャー";
    if (/(花|ハルシジェン|ブライト|ユッカ|キノコ|茸|カボチャ|スーザン|マリーゴールド)/.test(t)) cat = "植物";
    if (/(メンタス|スティムパック|rad-x|radaway|サイコ|アディクトール|ヌカシャイン|コーラ|サルサパリラ|フード|シュガーボム)/.test(t)) cat = "アイテム";

    // Appearance Guessing
    // 基本的に提供されたノートはFO76のプレイ日記や解説が多いのでデフォルトはFO76
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

    // Remove existing `const loreEntries = [...];` array block
    const regex = /const loreEntries = \[[\s\S]*?\];/;

    // manualEntriesと被っているタイトルは、自動取得側をスキップする（キムボールなど）
    const manualTitles = manualEntries.map(e => e.name);

    let finalEntriesObjStr = `const loreEntries = [\n`;

    // まず手動分を追加
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

    // 次に自動分を追加
    articles.forEach(article => {
        // 重複チェック（完全に一致、または一部一致で弾くのは難しいので、今回は厳密に(Note)記事で統一）
        // ユーザーが手作業で作った9件は既に追加済みなので、Note版は同じタイトルでも"note_xxx.html"として被って表示されるが、
        // もしタイトルが全く同じなら除外する。
        if (manualTitles.includes(article.title)) {
            return;
        }

        const safeTitle = article.title.replace(/"/g, '\\"');
        const dateStr = new Date(article.date).toISOString().split('T')[0];

        const { category, appearance } = guessCategoryAndAppearance(article.title, article.bodyHtml);

        finalEntriesObjStr += `            {
                name: "${safeTitle}",
                yomi: "${safeTitle}",
                url: "note_${article.key}.html",
                category: "${category}",
                appearance: ${JSON.stringify(appearance)},
                date: "${dateStr}"
            },\n`;
    });

    finalEntriesObjStr = finalEntriesObjStr.slice(0, -2) + `\n        ];`; // 最後のカンマを消す

    if (regex.test(loreContent)) {
        loreContent = loreContent.replace(regex, finalEntriesObjStr);
        // HTMLのフィルタボタンに「アイテム」「クリーチャー」「その他」等があるか確認し、
        // 無くても「ALL」で表示されるので問題ないが、ボタンを追加することも可能（今回はデータ側のみ変更）
        fs.writeFileSync(LORE_HTML, loreContent, 'utf8');
        console.log('Successfully categorized and replaced loreEntries!');
    } else {
        console.log('Could not find existing loreEntries bracket!');
    }
}

rebuildLoreHtml();
