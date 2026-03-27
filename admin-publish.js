#!/usr/bin/env node
/**
 * admin-publish.js
 * 
 * lore.html内の指定記事からisDraft: trueを除去して公開状態にするスクリプト。
 *
 * 使い方:
 *   node admin-publish.js <article-url> [<article-url2> ...]
 *   node admin-publish.js --all       # 全ドラフトを一括公開
 *   node admin-publish.js --list      # ドラフト記事の一覧表示
 *
 * 例:
 *   node admin-publish.js charleston-station.html
 *   node admin-publish.js charleston-station.html charleston-trainyard.html
 */

const fs = require('fs');
const path = require('path');

// 定数
const LORE_FILE = path.join(__dirname, 'lore.html');

// カラー出力用ヘルパー
const colors = {
    green: (s) => `\x1b[32m${s}\x1b[0m`,
    yellow: (s) => `\x1b[33m${s}\x1b[0m`,
    red: (s) => `\x1b[31m${s}\x1b[0m`,
    cyan: (s) => `\x1b[36m${s}\x1b[0m`,
    dim: (s) => `\x1b[2m${s}\x1b[0m`,
    bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

/**
 * lore.htmlの内容を読み込む
 */
function readLoreFile() {
    if (!fs.existsSync(LORE_FILE)) {
        console.error(colors.red(`エラー: ${LORE_FILE} が見つかりません`));
        process.exit(1);
    }
    return fs.readFileSync(LORE_FILE, 'utf-8');
}

/**
 * ドラフト記事のURL一覧を取得する
 */
function getDraftUrls(content) {
    const drafts = [];
    // isDraft: true を持つエントリのURLを正規表現で抽出
    // 各エントリのブロック { ... } を抽出
    const entryPattern = /\{\s*\n\s*name:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"[\s\S]*?isDraft:\s*true\s*\n\s*\}/g;
    let match;
    while ((match = entryPattern.exec(content)) !== null) {
        drafts.push({ name: match[1], url: match[2] });
    }
    return drafts;
}

/**
 * 指定URLの記事からisDraft: trueを除去する
 * 
 * エントリの形式:
 *   {
 *       name: "...",
 *       ...
 *       date: "...",
 *       isDraft: true
 *   },
 * 
 * → isDraft: true の行と、前の行末のカンマを処理
 */
function publishArticle(content, targetUrl) {
    // 方法: 対象URLを含むエントリブロック内のisDraft行を除去
    // isDraft: true は常にエントリの最後のプロパティなので、
    // 前の行の末尾にカンマがあり、isDraft行にはカンマがない
    // → isDraft行を削除し、前の行のカンマを残す（JSONとして正しい形）

    // パターン: "url: "targetUrl"" の後ろにある "isDraft: true" を含む行を削除
    // まず対象URLのエントリ全体を見つける
    const escapedUrl = targetUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // isDraft: true の行（前にある,\n も含めて）を削除
    // パターン: date行のカンマの後 + 改行 + isDraft行
    const pattern = new RegExp(
        `(url:\\s*"${escapedUrl}"[\\s\\S]*?date:\\s*"[^"]*")(,\\s*\\n\\s*isDraft:\\s*true)`,
        'g'
    );

    const newContent = content.replace(pattern, '$1');

    if (newContent === content) {
        return { success: false, content: content };
    }

    return { success: true, content: newContent };
}

/**
 * メイン処理
 */
function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log(colors.cyan('使い方:'));
        console.log('  node admin-publish.js <article-url> [<article-url2> ...]');
        console.log('  node admin-publish.js --all    # 全ドラフトを一括公開');
        console.log('  node admin-publish.js --list   # ドラフト記事の一覧表示');
        console.log('');
        console.log(colors.dim('例:'));
        console.log('  node admin-publish.js charleston-station.html');
        console.log('  node admin-publish.js charleston-station.html charleston-trainyard.html');
        process.exit(0);
    }

    let content = readLoreFile();

    // --list: ドラフト一覧表示
    if (args.includes('--list')) {
        const drafts = getDraftUrls(content);
        console.log(colors.cyan(`\n> ドラフト記事一覧 (${drafts.length}件)\n`));
        drafts.forEach((d, i) => {
            console.log(`  ${colors.yellow(`${(i + 1).toString().padStart(3)}.`)} ${d.name}`);
            console.log(`       ${colors.dim(d.url)}`);
        });
        console.log('');
        process.exit(0);
    }

    // --all: 全ドラフトを投稿
    let targetUrls;
    if (args.includes('--all')) {
        const drafts = getDraftUrls(content);
        if (drafts.length === 0) {
            console.log(colors.green('\n> ドラフト記事はありません。すべて公開済みです。\n'));
            process.exit(0);
        }
        targetUrls = drafts.map(d => d.url);
        console.log(colors.yellow(`\n> 全 ${targetUrls.length} 件のドラフトを公開します...\n`));
    } else {
        targetUrls = args;
    }

    // バックアップ作成
    const backupPath = LORE_FILE + '.bak';
    fs.writeFileSync(backupPath, content, 'utf-8');
    console.log(colors.dim(`バックアップ: ${backupPath}`));
    console.log('');

    // 各記事を公開処理
    let successCount = 0;
    let failCount = 0;

    for (const url of targetUrls) {
        const result = publishArticle(content, url);
        if (result.success) {
            content = result.content;
            successCount++;
            console.log(colors.green(`  ✓ 公開: ${url}`));
        } else {
            failCount++;
            console.log(colors.red(`  ✗ 失敗: ${url} (isDraft: trueが見つかりません)`));
        }
    }

    // ファイル保存
    if (successCount > 0) {
        fs.writeFileSync(LORE_FILE, content, 'utf-8');
    }

    // 結果サマリー
    console.log('');
    console.log(colors.cyan('─'.repeat(45)));
    console.log(colors.bold(`  結果: ${colors.green(`${successCount}件 公開`)}${failCount > 0 ? `, ${colors.red(`${failCount}件 失敗`)}` : ''}`));

    // 残りのドラフト数を表示
    const remainingDrafts = getDraftUrls(content);
    console.log(colors.dim(`  残りのドラフト: ${remainingDrafts.length}件`));
    console.log(colors.cyan('─'.repeat(45)));
    console.log('');

    if (failCount > 0) {
        process.exit(1);
    }
}

main();
