/**
 * fix_links.js
 * 
 * リポジトリ内の全HTMLファイルをスキャンし、存在しないページ（.html）へのリンクを
 * 自動的に解除（テキスト化）します。
 */

const fs = require('fs');
const path = require('path');

// 修正対象のディレクトリ（ルート）
const ROOT_DIR = path.join(__dirname, '..');

// スキャンから除外するファイル
const EXCLUDE_FILES = [
    'admin.html',
    'admin-drafts.html',
    'admin-publish.html',
    'lore.html',
    'index.html'
];

function fixLinksInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 内部リンク（.htmlで終わるもの）を抽出する正規表現
    // グループ1: hrefの内容, グループ2: リンクテキスト
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href=["'](?:\/)?([^"']+\.html)["'](?:[^>]*?)>([\s\S]*?)<\/a>/gi;

    const newContent = content.replace(linkRegex, (match, href, text) => {
        // 相対パスの解決（単純化のためルート基準でチェック）
        const targetFileName = path.basename(href);
        const targetPath = path.join(ROOT_DIR, targetFileName);

        // ファイルが存在するかチェック
        if (!fs.existsSync(targetPath)) {
            console.log(`[UNLINK] ${path.basename(filePath)}: "${targetFileName}" が見つからないためリンクを解除しました。 ("${text.trim()}")`);
            modified = true;
            return text; // リンクタグを消してテキストのみにする
        }

        return match; // 存在するならそのまま
    });

    if (modified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
    }
}

function main() {
    const files = fs.readdirSync(ROOT_DIR);
    const htmlFiles = files.filter(f => f.endsWith('.html') && !EXCLUDE_FILES.includes(f));

    console.log(`${htmlFiles.length} 個のファイルをスキャン中...`);

    htmlFiles.forEach(file => {
        fixLinksInFile(path.join(ROOT_DIR, file));
    });

    console.log('完了しました。');
}

main();
