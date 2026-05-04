/**
 * 未追跡のHTMLファイルを lore.html と admin-drafts.html の loreEntries に登録するスクリプト
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const today = "2026-04-06"; // 最近の日付として今日を使用

// 1. 未登録ファイルのリストを取得
const loreHtmlStr = fs.readFileSync('lore.html', 'utf8');
const loreUrls = new Set([...loreHtmlStr.matchAll(/url:\s*["']([^"']+)["']/g)].map(m => m[1]));

const untrackedRaw = execSync('git ls-files --others --exclude-standard', { encoding: 'utf8' });
const untrackedHtml = untrackedRaw.trim().split('\n')
    .filter(f => f.endsWith('.html') && !f.includes('/') && !f.includes('backup') && !f.startsWith('_'));

const notInIndex = untrackedHtml.filter(f => !loreUrls.has(f));

if (notInIndex.length === 0) {
    console.log("追加すべき未登録のファイルはありません。");
    process.exit(0);
}

console.log(`${notInIndex.length} 件の未登録ファイルを処理します...`);

const newEntries = [];

for (const file of notInIndex) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // データの抽出
        let name = "不明";
        let yomi = "";
        let category = "その他";
        let appearancePattern = "Fallout";
        
        // category & appearance
        const bodyMatch = content.match(/<body[^>]*data-article-category=["']([^"']*)["'][^>]*data-article-appearance=["']([^"']*)["'][^>]*>/);
        if (bodyMatch) {
            category = bodyMatch[1] || category;
            appearancePattern = bodyMatch[2] || appearancePattern;
        } else {
            // body タグにデータがない場合のフォールバック
            if (content.includes('Fallout TV')) appearancePattern = 'Fallout TV';
            else if (content.includes('Fallout 4')) appearancePattern = 'Fallout 4';
            else if (content.includes('Fallout 3')) appearancePattern = 'Fallout 3';
            else if (content.includes('Fallout: New Vegas')) appearancePattern = 'Fallout: New Vegas';
        }
        const appearanceArr = appearancePattern.split(',').map(s => s.trim()).filter(s => s);

        // name & yomi
        // <h1>Title<br><span ...>yomi</span></h1> or similar
        const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
        if (h1Match) {
            let innerH1 = h1Match[1];
            // yomi extraction
            const spanMatch = innerH1.match(/<span[^>]*>([\s\S]*?)<\/span>/);
            if (spanMatch) {
                yomi = spanMatch[1].trim();
                // <span> を取り除く
                innerH1 = innerH1.replace(spanMatch[0], '');
            }
            // <br> 以降を取り除く
            name = innerH1.replace(/<br\s*\/?>[\s\S]*$/, '').trim();
        }

        // オブジェクトの構築文字列
        const entryStr = `            {
                name: "${name}",
                yomi: "${yomi}",
                url: "${file}",
                category: "${category}",
                appearance: ${JSON.stringify(appearanceArr)},
                date: "${today}",
                isDraft: true
            }`;
        
        newEntries.push(entryStr);
        
    } catch (e) {
        console.error(`${file} の処理中にエラー:`, e.message);
    }
}

const entriesToInject = ",\n" + newEntries.join(",\n");

// 2. HTML ファイルへの挿入関数
function injectEntries(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    
    const startMarker = 'const loreEntries = [';
    const startIdx = html.indexOf(startMarker);
    if (startIdx === -1) throw new Error(`${filePath} に loreEntries が見つかりません`);
    
    // 배열の終了を探す
    let depth = 0;
    let endIdx = -1;
    for (let i = startIdx + startMarker.length - 1; i < html.length; i++) {
        if (html[i] === '[') depth++;
        if (html[i] === ']') {
            depth--;
            if (depth === 0) {
                endIdx = i; // ']' の位置
                break;
            }
        }
    }
    
    if (endIdx === -1) throw new Error(`${filePath} に配列の終了が見つかりません`);
    
    // 現在のエントリ部分が何か含まれているか（空でないか）を確認し、
    // ']' の直前にカンマがなければ挿入前にカンマをつけるなど調整する
    // ... と言っても、既存の配列が数百件あるので、']'の直前にカンマを入れてから追加エントリを入れる。
    // ※今回は format 上改行等の調整
    
    const beforeEnd = html.substring(0, endIdx).replace(/\s+$/, ''); // 最後の余白を消す
    
    const newHtml = beforeEnd + entriesToInject + "\n        " + html.substring(endIdx);
    
    fs.writeFileSync(filePath + '.backup3', html, 'utf8');
    fs.writeFileSync(filePath, newHtml, 'utf8');
    console.log(`${filePath} に ${newEntries.length} 件のエントリを追加し保存しました。`);
}

// 3. 実行
try {
    injectEntries('lore.html');
    injectEntries('admin-drafts.html');
} catch(e) {
    console.error("挿入エラー:", e);
}
