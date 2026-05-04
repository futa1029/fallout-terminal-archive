/**
 * admin-drafts.html の loreEntries 配列を lore.html から同期するスクリプト
 * lore.html にあるが admin-drafts.html にない記事を追加する
 */
const fs = require('fs');
const path = require('path');

// ファイル読み込み
const lorePath = path.join(__dirname, 'lore.html');
const adminPath = path.join(__dirname, 'admin-drafts.html');

const loreHtml = fs.readFileSync(lorePath, 'utf8');
const adminHtml = fs.readFileSync(adminPath, 'utf8');

// lore.html からエントリを抽出する関数
function extractEntries(html) {
    // loreEntries 配列の開始と終了を検出
    const startMarker = 'const loreEntries = [';
    const startIdx = html.indexOf(startMarker);
    if (startIdx === -1) {
        throw new Error('loreEntries が見つかりません');
    }
    
    // 配列の終了 ]; を探す（ネストを考慮）
    let depth = 0;
    let endIdx = -1;
    for (let i = startIdx + startMarker.length - 1; i < html.length; i++) {
        if (html[i] === '[') depth++;
        if (html[i] === ']') {
            depth--;
            if (depth === 0) {
                endIdx = i + 1;
                // ]; の ; も含める
                if (html[i + 1] === ';') endIdx = i + 2;
                break;
            }
        }
    }
    
    if (endIdx === -1) {
        throw new Error('配列の終了が見つかりません');
    }
    
    // 配列部分のテキストを取得
    const arrayText = html.substring(startIdx + startMarker.length - 1, endIdx);
    
    return { startIdx, endIdx, arrayText };
}

// lore.html からエントリ配列テキストを抽出
const loreResult = extractEntries(loreHtml);
console.log(`[lore.html] 配列抽出完了`);

// admin-drafts.html の配列部分を特定
const adminResult = extractEntries(adminHtml);
console.log(`[admin-drafts.html] 配列抽出完了`);

// admin-drafts.html の配列部分を lore.html のもので置換
const newAdminHtml = 
    adminHtml.substring(0, adminResult.startIdx + 'const loreEntries = '.length) +
    loreResult.arrayText +
    adminHtml.substring(adminResult.endIdx);

// バックアップ作成
const backupPath = path.join(__dirname, 'admin-drafts.html.backup2');
fs.writeFileSync(backupPath, adminHtml, 'utf8');
console.log(`[バックアップ] ${backupPath} に保存`);

// 書き込み
fs.writeFileSync(adminPath, newAdminHtml, 'utf8');

// 確認
const verifyHtml = fs.readFileSync(adminPath, 'utf8');
const verifyEntries = extractEntries(verifyHtml);
const dateMatches = verifyEntries.arrayText.match(/date:\s*"/g);
const draftMatches = verifyEntries.arrayText.match(/isDraft:\s*true/g);

console.log(`\n========== 同期完了 ==========`);
console.log(`エントリ総数 (推定): ${dateMatches ? dateMatches.length : 0}`);
console.log(`非公開 (isDraft: true): ${draftMatches ? draftMatches.length : 0}`);
console.log(`公開済み: ${(dateMatches ? dateMatches.length : 0) - (draftMatches ? draftMatches.length : 0)}`);
