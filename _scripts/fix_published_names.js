/**
 * 公開済みで英語名のままの25エントリを日本語名に修正するスクリプト
 */
const fs = require('fs');

// 手動のマッピング（公開済みの英語名 → 日本語名）
const nameMap = {
    'Vault-Tec Industries': 'ボルトテック・コーポレーション',
    'Vault': 'Vault（ボルト）',
    'Mistress of Mystery': 'ミストレス・オブ・ミステリー',
    'Vault 108': 'Vault 108',
    'Vault 13': 'Vault 13',
    'Vault 101': 'Vault 101',
    'Wasted on Nukashine': 'ヌカシャインで酩酊',
    'H&H Tools Company': 'H&Hツールズ・カンパニー',
    "The Vault Dweller's Official Cookbook": 'Vault居住者の公式料理本',
    'Project Paradise': 'プロジェクト・パラダイス',
    'SPECIAL': 'S.P.E.C.I.A.L.',
    'RobCo Auto-Cache #001': 'ロブコ・オートキャッシュ #001',
    'The Mothman Equinox': 'モスマンの春分/秋分',
    'JES-2R': 'JES-2R',
    'Mischief Night': 'ミスチフ・ナイト',
    'Invaders from Beyond': '宇宙からの侵略者',
    'Fasnacht Day': 'ファスナハト・デイ',
    'The Big Bloom': 'ザ・ビッグ・ブルーム',
    'Rad-X': 'Rad-X（ラッドX）',
    'RadAway': 'RadAway（ラッドアウェイ）',
    'Vault 51': 'Vault 51',
    'Pip-Boy': 'Pip-Boy（ピップボーイ）',
    'G.O.A.T.': 'G.O.A.T.（適性検査）',
    'Vault76': 'Vault 76（はじまりの場所）',
    'The WayWard': 'ウェイワード（酒場）'
};

let loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf8');
let fixedCount = 0;

for (const [engName, jpName] of Object.entries(nameMap)) {
    // engNameに含まれる特殊文字をエスケープ
    const escaped = engName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`name: "${escaped}"`, 'g');
    const matches = loreHtml.match(pattern);
    if (matches) {
        // isDraft: trueでないエントリのみ置換したいが、
        // まず全部置換（ドラフトも日本語にして問題ない）
        loreHtml = loreHtml.replace(pattern, `name: "${jpName}"`);
        fixedCount += matches.length;
        console.log(`[Fixed] ${engName} -> ${jpName} (${matches.length} occurrences)`);
    } else {
        console.log(`[Not found] ${engName}`);
    }
}

fs.writeFileSync('f:/Fallout/lore.html', loreHtml);
console.log(`\nTotal fixed: ${fixedCount} occurrences`);
