/**
 * FandomMadisonLi.html の削除および lore.html, admin-drafts.html からの登録解除スクリプト
 */
const fs = require('fs');

// 対象ファイル
const deleteTarget = 'FandomMadisonLi.html';

// 1. ファイル自体の削除
if (fs.existsSync(deleteTarget)) {
    try {
        fs.unlinkSync(deleteTarget);
        console.log(`${deleteTarget} を削除しました。`);
    } catch(e) {
        console.error(`${deleteTarget} の削除に失敗しました:`, e);
    }
} else {
    console.log(`${deleteTarget} は既に存在しません。`);
}

// 2. インデックスファイルからのエントリ削除関数
function removeEntryFromIndex(filePath) {
    if (!fs.existsSync(filePath)) return;
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 正規表現で対象のオブジェクト（要素）を大まかに探して削除
        // {name:...url: "FandomMadisonLi.html",...}のようなブロックを探す
        // かなり単純に、`url: "FandomMadisonLi.html"`を含む`{ ... }` を特定して消す
        
        // より正確に解析するために、単純な置換を使用
        // { から }, (および最後なら , 無し、途中なら , 有りかも) までを消したい
        
        // とりあえず正規表現ベースで試みる
        const regex = /{[^{}]*url:\s*"FandomMadisonLi\.html"[^{}]*},?\s*/g;
        
        if (regex.test(content)) {
            let newContent = content.replace(regex, '');
            
            // 処理後、配列の最後が `,  ]` のようにカンマが余るケースを防ぐための簡易クリーニング
            // newContent = newContent.replace(/,\s*\]/, '\n        ]');
            
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`${filePath} から ${deleteTarget} のエントリを削除しました。`);
        } else {
            console.log(`${filePath} には ${deleteTarget} のエントリが見つかりませんでした。`);
        }
    } catch(e) {
        console.error(`${filePath} の更新に失敗しました:`, e);
    }
}

removeEntryFromIndex('lore.html');
removeEntryFromIndex('admin-drafts.html');
