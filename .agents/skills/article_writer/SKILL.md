---
name: Fallout Article Writer
description: FalloutターミナルWikiの新規記事作成と、インデックス一覧や相互リンクを自動調整するためのスキル
---

# Fallout Theme Article Writer

このスキルは、ユーザーから「〇〇についての記事を書いて」と依頼された場合に、Falloutターミナル風のHTMLページを新しく生成し、サイト全体（相互リンクや記事一覧）と整合性が取れるように調整するための手順書です。

## Step 1: 記事コンテンツとファイル名の決定
1. 依頼された対象（キャラクター、アイテム、場所、勢力など）に関するFalloutの情報を調査します。
2. ファイル名は「**記事タイトル.html**」とし、ファイル名に使用できない記号（`\/:*?"<>|`）が含まれる場合は `_` に置換してください。
3. すでに同じ名前のファイルが存在する場合は、連番（`_2.html` など）を付与して回避します。

## Step 2: ターミナルHTMLの生成
新規作成するHTMLは、既存の `kimball.html` や `tandi.html`、あるいは `generate_notes_html.js` 内のテンプレートと全く同じCSS構造・配分を使用してください。
- **スタイル（CSS変数）**: ベースカラー `--bg-color: #0f0f0f`、テキスト・メイン枠 `--accent-color: #00ff00`
- **フォント**: `Share Tech Mono` および `Noto Sans JP` (`<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">`)
- **アクションヘッダ**:
  - `lore.html` に戻るための `<a href="lore.html" class="back-link">< BACK TO TERMINAL</a>` をページ上部に配置します。
  - Supabase連携用の `<button class="like-button" data-article-id="..." onclick="toggleLike(this)">` を配置します（一意なキーを作成）。
- インラインの画像がある場合は `<div class="note-figure">...</div>` などで囲んでも構いません。

## Step 3: `lore.html` のインデックス更新
- `f:\Fallout\lore.html` 内の `const loreEntries = [...]` 配列を探し、**先頭**または適切な位置に新しい記事のオブジェクトを追加してください。
  ```javascript
  {
      name: "新しい記事タイトル",
      yomi: "よみがな",
      url: "記事タイトル.html",
      category: "人物 / 勢力 / 武器 など",
      appearance: ["Fallout 76", "Fallout 4" など],
      date: "YYYY-MM-DD"
  }
  ```

## Step 4: 全体再構成スクリプトの実行（相互リンクの更新）
新規記事を追加したことで、その単語が他のすべての記事の「相互リンク候補」になります。そのため、以下のコマンドを実行して全体を再生成してください。
```bash
node remove_duplicates.js
node generate_notes_html.js
```
※ `generate_notes_html.js` を実行することで、作成した新しい記事のタイトルが辞書に登録され、別記事の本文中にある同名キーワードが `<a href="新しい記事.html" class="auto-link">` に自動で置換されます。

## Step 5: 「下書き (Drafts) 投稿機能」の処理方法
ユーザーから「_draftsの中にある記事を投稿して」と依頼された場合、以下の手順で作業を自動化します：
1. `f:\Fallout\_drafts` 内にあるすべての `.md` 形式の下書きファイルを読み込みます（`TEMPLATE.md` は除外）。
2. そのMarkdownファイルのFrontmatter（Title, Category, Appearance, Date）と本文を解析し、HTML形式で新しい記事ファイル（`[英語のslug].html`）を生成してください。本ターミナルの共通CSS、ヘッダ、SupabaseのLikeボタン、構造（`.note-figure` や `<main class="content">` など）を必ず完全に踏襲すること。
3. `lore.html` および `note_articles_data.json` を更新し、インデックスに追加します。
4. Step 4（`remove_duplicates.js` と `generate_notes_html.js` の実行）を行い、相互リンクを反映します。
5. 処理が完了した `.md` ファイルは `f:\Fallout\_drafts\published\` フォルダに移動して退避させてください。

## Step 6: 完了報告
作業完了後は、ユーザーに作成した記事（や相互リンク反映の完了）について必ず報告し、ブラウザで確認をしてもらいます。
