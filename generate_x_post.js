/**
 * generate_x_post.js
 * _drafts/*.md から _X/<slug>/post.md（X投稿フォーマット）を自動生成するスクリプト
 *
 * 使い方:
 *   node generate_x_post.js
 *
 * 処理内容:
 *   1. _drafts/*.md を読み込む（TEMPLATE.mdは除外）
 *   2. フロントマター（Title, Category, Appearance, Date）と本文を解析
 *   3. _X/<slug>/ フォルダを作成し post.md を生成
 *   4. 対応する画像を _X/<slug>/images/ にコピー
 */

const fs = require("fs");
const path = require("path");

// ---- 設定 ----
const DRAFTS_DIR = path.join(__dirname, "_drafts");
const X_DIR = path.join(__dirname, "_X");
const IMG_SRC_DIR = path.join(__dirname, "images", "note_extracted");
const WIKI_URL =
    "https://futa1029.github.io/fallout-terminal-archive/lore.html";

// カテゴリごとの絵文字マップ
const CATEGORY_EMOJI = {
    勢力: "🏛️",
    人物: "👤",
    クリーチャー: "🦗",
    武器: "🔫",
    アイテム: "🧪",
    場所: "🗺️",
    読み物: "📖",
    その他: "⚙️",
};

// 登場作品ごとのハッシュタグマップ
const APPEARANCE_HASHTAGS = {
    "Fallout TV": "#FalloutTV",
    "Fallout 76": "#Fallout76",
    "Fallout 4": "#Fallout4",
    "Fallout 3": "#Fallout3",
    "Fallout: New Vegas": "#FalloutNewVegas",
};

/**
 * フロントマターをパースして返す
 * @param {string} content - ファイル全文
 * @returns {{ meta: Object, body: string }}
 */
function parseFrontmatter(content) {
    const meta = {};
    const lines = content.replace(/\r\n/g, "\n").split("\n");
    let bodyStart = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith("---") && i > 0) {
            bodyStart = i + 1;
            break;
        }
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match) {
            meta[match[1]] = match[2].trim();
        }
    }

    const body = lines.slice(bodyStart).join("\n");
    return { meta, body };
}

/**
 * 本文のセクション（# 見出し）を配列として抽出する
 * @param {string} body - 本文テキスト
 * @returns {{ heading: string, content: string }[]}
 */
function extractSections(body) {
    const sections = [];
    const lines = body.split("\n");
    let current = null;

    for (const line of lines) {
        if (line.startsWith("## ")) {
            if (current) sections.push(current);
            current = { heading: line.replace("## ", "").trim(), content: "" };
        } else if (line.startsWith("# ")) {
            // トップレベルセクション（翻訳・校正・感想）は見出しとして記録
            if (current) sections.push(current);
            current = { heading: line.replace("# ", "").trim(), content: "" };
        } else if (current) {
            // 画像タグと画像キャプションは除外
            if (line.startsWith("[画像:") || line.startsWith("[画像キャプション:")) {
                return sections; // ここではスキップするだけ
            }
            current.content += line + "\n";
        }
    }
    if (current) sections.push(current);
    return sections;
}

/**
 * 「校正」セクションを抽出して概要とサブセクションに分ける
 * @param {string} body - 本文全体
 * @returns {{ summary: string, subsections: { heading: string, content: string }[] }}
 */
function extractProofreadSection(body) {
    const lines = body.replace(/\r\n/g, "\n").split("\n");
    let inProof = false;
    const subsections = [];
    let current = null;
    let summary = "";

    for (const line of lines) {
        if (line.startsWith("# 校正")) {
            inProof = true;
            continue;
        }
        if (inProof && line.startsWith("# ") && !line.startsWith("# 校正")) {
            break; // 次の大セクションに入ったら終了
        }
        if (!inProof) continue;

        if (line.startsWith("## ")) {
            if (current) subsections.push(current);
            current = { heading: line.replace("## ", "").trim(), content: "" };
        } else if (current) {
            current.content += line + "\n";
        } else {
            summary += line + "\n";
        }
    }
    if (current) subsections.push(current);
    return { summary: summary.trim(), subsections };
}

/**
 * 「感想」セクションのテキストを抽出する
 * @param {string} body - 本文全体
 * @returns {string}
 */
function extractImpression(body) {
    const lines = body.replace(/\r\n/g, "\n").split("\n");
    let inImpression = false;
    let result = "";

    for (const line of lines) {
        if (line.startsWith("# 感想")) {
            inImpression = true;
            continue;
        }
        if (inImpression && line.startsWith("# ")) break;
        if (inImpression) result += line + "\n";
    }
    return result.trim();
}

/**
 * タイトルからスラッグ（英数字+アンダースコア）を生成する
 * titleがASCIIなら小文字化、日本語などはメタから推定しファイル名から取得する
 * @param {string} filename - 元のファイル名（拡張子なし）
 * @returns {string}
 */
function toSlug(filename) {
    return filename.replace(/\s+/g, "_").toLowerCase();
}

/**
 * ハッシュタグ文字列を生成する
 * @param {string} category - カテゴリ
 * @param {string} appearance - 登場作品（カンマ区切り）
 * @param {string} titleJa - 日本語タイトル
 * @returns {string}
 */
function buildHashtags(category, appearance, titleJa) {
    const tags = ["#Fallout"];
    const apps = appearance.split(",").map((a) => a.trim());
    for (const app of apps) {
        if (APPEARANCE_HASHTAGS[app]) tags.push(APPEARANCE_HASHTAGS[app]);
    }
    // カテゴリタグ
    const catTag = "#" + category;
    tags.push(catTag);
    // タイトルタグ（スペース除去）
    const titleTag = "#" + titleJa.replace(/[（）\s・]/g, "");
    tags.push(titleTag);
    tags.push("#ロア解説");
    return tags.join(" ");
}

/**
 * X投稿テキスト（post.md）を生成する
 * @param {Object} meta - フロントマターのメタデータ
 * @param {string} body - 本文
 * @param {string} slug - スラッグ
 * @param {string[]} imageFiles - 使用する画像ファイル名の配列（最大4枚）
 * @returns {string}
 */
function buildPostMd(meta, body, slug, imageFiles) {
    const emoji = CATEGORY_EMOJI[meta.Category] || "⚙️";
    const hashtags = buildHashtags(
        meta.Category,
        meta.Appearance || "",
        meta.Title
    );
    const { summary, subsections } = extractProofreadSection(body);
    const impression = extractImpression(body);

    // 画像リスト（frontmatter用）
    const imageLines = imageFiles
        .slice(0, 4)
        .map((f) => `  - images/${f}`)
        .join("\n");

    let post = `---
title: ${meta.Title}
source_draft: _drafts/${slug}.md
category: ${meta.Category}
appearance: ${meta.Appearance || ""}
date: ${meta.Date || ""}
images:
${imageLines || "  # 画像なし"}
---

${hashtags}

${emoji}【${meta.Title}】

`;

    // 概要があれば導入として加える
    if (summary) {
        const summaryLines = summary
            .split("。")
            .filter((s) => s.trim())
            .map((s) => s + "。")
            .join("\n");
        post += summaryLines + "\n\n---\n\n";
    }

    // サブセクションをX用に整形
    const SUBSECTION_EMOJIS = ["☢️", "🔍", "🤝", "💥", "🏚️", "🔪", "🍳"];
    subsections.forEach((sec, i) => {
        const secEmoji = SUBSECTION_EMOJIS[i % SUBSECTION_EMOJIS.length];
        const contentFormatted = sec.content
            .trim()
            .split("。")
            .filter((s) => s.trim())
            .map((s) => s + "。")
            .join("\n");
        post += `${secEmoji}【${sec.heading}】\n\n${contentFormatted}\n\n---\n\n`;
    });

    // 感想
    if (impression) {
        const impressionFormatted = impression
            .split("。")
            .filter((s) => s.trim())
            .map((s) => s + "。")
            .join("\n");
        post += `💬【感想】\n\n${impressionFormatted}\n\n---\n\n`;
    }

    // 末尾リンク
    post += `🔗 詳しくはWikiで！\n${WIKI_URL}\n`;

    return post;
}

/**
 * メイン処理
 */
function main() {
    // _draftsフォルダのMDファイル一覧を取得
    const files = fs
        .readdirSync(DRAFTS_DIR)
        .filter(
            (f) =>
                f.endsWith(".md") &&
                f !== "TEMPLATE.md" &&
                f !== "TEMPLATE copy.md" &&
                !f.startsWith(".")
        );

    if (files.length === 0) {
        console.log("処理対象のMDファイルがありません。");
        return;
    }

    for (const file of files) {
        const slug = toSlug(path.basename(file, ".md"));
        const filePath = path.join(DRAFTS_DIR, file);
        const content = fs.readFileSync(filePath, "utf-8");

        const { meta, body } = parseFrontmatter(content);

        if (!meta.Title) {
            console.warn(`[SKIP] ${file}: Titleが見つかりません。`);
            continue;
        }

        // 出力フォルダ作成
        const outDir = path.join(X_DIR, slug);
        const imgOutDir = path.join(outDir, "images");
        fs.mkdirSync(imgOutDir, { recursive: true });

        // 画像ファイルを検索（note_extracted にスラッグが含まれるもの）
        const allImgs = fs.existsSync(IMG_SRC_DIR)
            ? fs.readdirSync(IMG_SRC_DIR).filter((f) => f.startsWith(slug))
            : [];
        const usedImgs = allImgs.slice(0, 4);

        // 画像コピー
        for (const img of usedImgs) {
            fs.copyFileSync(
                path.join(IMG_SRC_DIR, img),
                path.join(imgOutDir, img)
            );
        }

        // post.md 生成
        const postContent = buildPostMd(meta, body, slug, usedImgs);
        fs.writeFileSync(path.join(outDir, "post.md"), postContent, "utf-8");

        console.log(
            `✅ [${meta.Title}] → _X/${slug}/post.md (画像: ${usedImgs.length}枚)`
        );
    }

    console.log("\n🎉 X投稿フォーマット生成完了！");
}

main();
