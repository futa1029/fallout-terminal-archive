// カテゴリ・登場作品の一括修正スクリプト
const fs = require('fs');
const path = 'note_articles_data.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// 修正マップ: name の部分一致 → { category, appearance(任意) }
const fixes = [
    { match: "中傷ボット", category: "人物" },
    { match: "シェイディ・サンズ", category: "場所" },
    { match: "Vault 76の監督官", category: "人物" },
    { match: "フランキー・ベケット", category: "人物" },
    { match: "アラデシュ", category: "人物" },
    { match: "ロニー", category: "人物" },
    { match: "ブラッド・イーグル", category: "勢力" },
    { match: "エドウィン", category: "人物" },
    { match: "B.O.S.アウトキャスト", category: "勢力" },
    { match: "ベケット", category: "人物", exactName: "ベケット" },
    { match: "ゲイリー", category: "人物" },
    { match: "Vault 108", category: "場所" },
    { match: "コズワース", category: "人物" },
    { match: "プリドゥエン", category: "武器" },
    { match: "ブラッドバグ", category: "クリーチャー" },
    { match: "Vault 13", category: "場所", exactName: "Vault 13" },
    { match: "バブルガム", category: "道具" },
    { match: "Vault 101", category: "場所" },
    { match: "ジェームス", category: "人物" },
    { match: "スローカム・ジョー・コーポレート", category: "勢力" },
    { match: "スローカム・ジョー", category: "場所", exactName: "スローカム・ジョー" },
    { match: "ジェフ・ナカムラ", category: "人物" },
    { match: "ゴーリー鉱山", category: "場所" },
    { match: "エイミー・ケリー", category: "人物" },
    { match: "孤立したキャビン", category: "場所", appearance: ["Fallout 76"] },
    { match: "タイガード水処理", category: "場所" },
    { match: "サマーズビル", category: "場所" },
    { match: "ダンカン&ダンカン・ロボティクス", category: "場所" },
    { match: "パイパーライト", category: "人物", appearance: ["Fallout 4"] },
    { match: "アッシュ・ローズ", category: "植物" },
    { match: "ロボブレイン", category: "クリーチャー", appearance: ["Fallout", "Fallout 2", "Fallout 3", "Fallout: New Vegas", "Fallout 4", "Fallout 76"] },
    { match: "アリステラ", category: "人物" },
    { match: "蜂の群れ", category: "クリーチャー" },
    { match: "オルガン洞窟", category: "場所" },
    { match: "アデレート", category: "人物", appearance: ["Fallout 76"] },
    { match: "ラッドガル", category: "クリーチャー", appearance: ["Fallout 4"] },
    { match: "ドッティ", category: "人物" },
    { match: "アンストッパブル", category: "人物", addAppearance: "Fallout 4" },
    { match: "イータ・プサイ・ハウス", category: "場所" },
    { match: "パイハウス", category: "場所" },
    { match: "グレロック", category: "人物" },
    { match: "フラタニティ・ロウ", category: "場所" },
    { match: "ドクター・ゾルボ", category: "人物" },
    { match: "ムーンモンキーのジャングルズ", category: "人物", appearance: ["Fallout 3", "Fallout: New Vegas", "Fallout 4", "Fallout 76"] },
];

let changeCount = 0;

data.forEach(entry => {
    if (!entry || !entry.title) return;
    const entryName = entry.title.trim();

    for (const fix of fixes) {
        let matched = false;

        if (fix.exactName) {
            matched = (entryName === fix.exactName);
        } else {
            matched = entryName.includes(fix.match);
        }

        if (matched) {
            const oldCat = entry.category;
            const oldApp = JSON.stringify(entry.appearance);

            entry.category = fix.category;

            if (fix.appearance) {
                entry.appearance = fix.appearance;
            }

            if (fix.addAppearance && entry.appearance && !entry.appearance.includes(fix.addAppearance)) {
                entry.appearance.push(fix.addAppearance);
            }

            console.log(`[FIXED] ${entryName}: ${oldCat} -> ${fix.category}` +
                (fix.appearance ? ` | appearance: ${oldApp} -> ${JSON.stringify(fix.appearance)}` : '') +
                (fix.addAppearance ? ` | +${fix.addAppearance}` : ''));
            changeCount++;
            break;
        }
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log(`\n合計 ${changeCount} 件修正しました。`);
