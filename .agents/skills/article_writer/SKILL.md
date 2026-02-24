---
name: Fallout Article Writer
description: FalloutターミナルWikiの新規記事作成と、インデックス一覧や相互リンクを自動調整するためのスキル
---

# Fallout Theme Article Writer

このスキルは、ユーザーから「〇〇についての記事を書いて」と依頼された場合に、Falloutターミナル風のHTMLページを新しく生成し、サイト全体（相互リンクや記事一覧）と整合性が取れるように調整するための手順書です。

## 記事作成の基本原則（4つの鉄則）

「記事を作成してください」という指示を受けた場合、以下の4ステップを**必ず**実行すること：

### 原則1: 全文・全画像の完全取得

- 貼られたURLの**全文**と**すべての画像**を取得し、日本語に翻訳する
- **省略は一切しない**。すべてのセクション・サブセクションを漏れなく翻訳する
- 画像は**一つ残らず**ダウンロードし、元のWikiと同じ箇所に配置する
- 本文中で使わなかった画像はページ下部の**GALLERYセクション**に、元のWikiと同じカテゴリ分け（作品別等）で追加する
- **英語原文のカッコ書きは残さない**。本文中でも見出し（h1/h2/h3）でも、英語のカッコ書きは一切使わないこと。例：
  - 本文: 「仲間(Allies)」→「仲間」、「C.A.M.P.ペット(C.A.M.P. pets)」→「C.A.M.P.ペット」
  - 見出し: 「概要（Background）」→「概要」、「起源（Origins）」→「起源」、「バッド・アスキンス（Bud Askins）」→「バッド・アスキンス」
  - HTMLの記事本文・見出し・X投稿のすべてに適用する
- **「。」の後に文が続く場合は改行する**。HTML本文では `。<br>` とし、一文ごとに改行して日本語を見やすく配置すること。段落末尾（`</p>` や `</li>` の直前）では不要

### 原則2: 感想の充実

- 感想（quote-box）は**簡略化・要約を行わない**。文字数制限は設けず、記事（翻訳内容や背景）から得たインスピレーションや感情をすべて吐き出すように「ツラツラと」語ること。
- **感想（quote-box）はHTMLの本文末尾（全セクション終了後、フッター・ライセンス表記の直前）に配置すること。h1タイトル直後には絶対に置かない。**
- ユーザーのX（@IwamotoFuta）での口調を模倣し、親しみやすく、かつ熱量のあるプレイヤー目線の「丁寧語ベースの語りかけスタイル（w や ！、〜などを自然に交える）」で記述する。
- **箇条書きや小見出しによる分割は禁止**。一つのまとまった文章として、頭に浮かんだ想いや、ゲームプレイ体験と結びつくワクワク感、ロケーションの魅力などを流れるように連続的に記述すること。

### 原則3: loreページからのリンク

- ページを作成したら `lore.html` の `loreEntries` 配列にエントリーを追加する
- `remove_duplicates.js` と `generate_notes_html.js` を実行して相互リンクを反映する

> [!CAUTION]
> **`remove_duplicates.js` への登録を絶対に忘れないこと。** `remove_duplicates.js` を実行すると `lore.html` の `loreEntries` 配列が**完全に再構築**される。lore.htmlに手動で追加したエントリは上書きされて消える。新規記事を追加する際は、`remove_duplicates.js` 内の以下3箇所に必ず登録すること：
>
> 1. `manualEntries` 配列 — 記事のメタデータ（name, yomi, url, category, appearance, date）
> 2. `duplicateKeywords` 配列 — 重複を防止するための日本語キーワード
> 3. `protectedFiles` 配列 — スクリプトによるファイル削除から保護するスラッグ名（拡張子なし）

### 原則4: X投稿素材の作成

- X用の文章（文字数制限なし）を `_X/<slug>/post.md` に作成する
- 記事内から**印象的な4枚の画像**を選び `_X/<slug>/images/` フォルダに格納する
- 画像は記事の画像アセットからコピーし、X投稿時にすぐ使える状態にする

---

## Step 1: 記事コンテンツとファイル名の決定

1. 依頼された対象（キャラクター、アイテム、場所、勢力など）に関するFalloutの情報を調査します。
2. ファイル名は「**記事タイトル.html**」とし、ファイル名に使用できない記号（`\/:*?"<>|`）が含まれる場合は `_` に置換してください。
3. すでに同じ名前のファイルが存在する場合は、連番（`_2.html` など）を付与して回避します。
4. **重要**: `f:\Fallout\title_to_slug.json` を開き、新しく作成する記事のタイトルと、推奨される英語のファイル名（スラッグ）のペアを追加してください。これにより、次回の自動生成時に一貫したファイル名が維持されます。

## Step 2: ターミナルHTMLの生成

新規作成するHTMLは、既存の `billings-homestead.html` や `kimball.html` と**完全に同一のCSS構造・レイアウト・スクリプト構成**を使用してください。

> [!CAUTION]
> **ページ構成の一貫性は絶対に崩さないこと。** 独自のCRT風オーバーレイ、スキャンライン背景、Flexbox中心のレイアウト等は絶対に使用しないこと。必ず以下のパターンに従うこと：
>
> - **CSSレイアウト**: `grid-template-columns: 300px 1fr` の2カラムグリッド（`.container`）
> - **CSS変数**: `--bg-color`, `--text-color`, `--accent-color`, `--header-bg`, `--panel-bg` の5つ
> - **フォント**: `Noto Sans JP` (本文) + `Share Tech Mono` (見出し)
> - **Supabase初期化**: `supabase-config.js` を使わず、インラインで `supabaseUrl` / `supabaseKey` を定義し `window.supabase.createClient()` で初期化
> - **Lightbox**: シンプルな `.lightbox-overlay` + `#lightbox` / `#lightbox-img` 構成。閉じるボタンは overlay の `onclick` で `classList.remove('active')`
> - **いいねボタン**: `♡` / `♥` のテキスト切替方式。`increment_like` / `decrement_like` RPC + `localStorage` による状態管理

> [!IMPORTANT]
> **lore.html への戻りリンクは必須。** `<a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>` を `action-header` 内に必ず配置すること。このリンクが欠落すると、読者がインデックスに戻れなくなるため、絶対に忘れないこと。

- **DATE行は不要**: `<div class="date">DATE: ...</div>` のような日付表示は**一切使わない**こと
- **スタイル（CSS変数）**: ベースカラー `--bg-color: #0f0f0f`、テキスト・メイン枠 `--accent-color: #00ff00`
- **フォント**: `Share Tech Mono` および `Noto Sans JP` (`<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">`)
- **アクションヘッダ**:
  - `lore.html` に戻るための `<a href="lore.html" class="back-link">< BACK TO TERMINAL</a>` をページ上部に配置します。
  - Supabase連携用の `<button class="like-button" data-article-id="..." onclick="toggleLike(this)">` を配置します（一意なキーを作成）。
- インラインの画像がある場合は `<div class="note-figure">...</div>` などで囲んでも構いません。
- **寄付リンク**: フッター（copyright文の後）に必ず以下を追加すること：

  ```html
  <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
  ```

- **記事タイトルは英語名を使用する**: HTMLの `<title>`, `<h1>`, OGPメタタグ, サイドバーの `<h3>` では**英語のタイトル**（例: "Vault-Tec", "Aaron Kimball"）を使用すること。本文中では日本語名と英語名を併記可。

### ⚠️ 相互リンク（auto-link）の誤リンク防止ルール

記事内のキーワードに `<a href="..." class="auto-link">` を手動で付ける際は、必ず以下を確認してください：

1. **同名でも別エンティティには絶対にリンクしない**
   - 例：「ロニー・マッカーティ（Vault 31の社員）」→ `ronnie.html`（Fallout 76のロニー）には**リンクしない**
   - 例：「エンクレイヴ」→ `forced-evolution-virus-fev.html`（FEV記事）には**リンクしない**

2. **リンク先の記事が「同一の概念・同一人物・同一組織」を扱っているときのみリンクする**
   - 登場作品・所属組織・役割が一致しているかを必ず照合すること

3. **不確かな場合はリンクしない**（プレーンテキストのままにする）

### ✍️ 感想セクションの文体ルール

感想（quote-box）を書く際は、以下の表現を**使用禁止**とする：

- **「マジで」** → 「本当に」「とにかく」などに置き換える
- **「俺」** → 一人称は使わない。「みんな」「プレイヤー」など不特定多数の表現か、主語を省略する
- **「〜するか！」「〜してみるか」** → 「〜してみたい」「〜してみたいところ」に置き換える

## Step 3: `lore.html` のインデックス更新

- `f:\Fallout\lore.html` 内の `const loreEntries = [...]` 配列を探し、**先頭**または適切な位置に新しい記事のオブジェクトを追加してください。
- **🚨【注意】作業漏れ防止🚨**: 追加操作を行った後は、確実に `loreEntries` 配列内に新しい要素が追加されたかを確認してください。ファイルの最後に追記でなく、JavaScriptの配列の中に追加する必要があります。

  ```javascript
  {
      name: "新しい記事タイトル",  // 日本語のみ。英語名(日本語名)は禁止
      yomi: "よみがな",
      url: "記事タイトル.html",
      category: "人物 / 勢力 / 武器 など",
      appearance: ["Fallout 76", "Fallout 4" など],
      date: "YYYY-MM-DD"
  }
  ```

  > **`name` は日本語のみで記載する。** 「Billings homestead (ビリングス農場)」のように英語名＋日本語カッコ書きにしないこと。正しくは「ビリングス農場」。ただし同名記事の区別に必要なカッコ書き（例: 「ペット (Fallout 76)」「新カリフォルニア共和国 (NCR)」）はそのまま残してよい

## Step 4: 全体再構成スクリプトの実行（相互リンクの更新）

新規記事を追加したことで、その単語が他のすべての記事の「相互リンク候補」になります。そのため、以下のコマンドを実行して全体を再生成してください。

```bash
node remove_duplicates.js
node generate_notes_html.js
node generate_thumbnails.js
```

※ `generate_notes_html.js` を実行することで、作成した新しい記事のタイトルが辞書に登録され、別記事の本文中にある同名キーワードが `<a href="新しい記事.html" class="auto-link">` に自動で置換されます。

> [!IMPORTANT]
> **保護ファイル（protectedFiles）には自動リンクが適用されません。**
> 新記事を追加した際、保護ファイル（`vault_tec.html`, `buffalo-gourd-seed.html` 等）の本文中に新記事のキーワードが含まれている場合は、**手動で `<a href='...' class='auto-link'>` を追加**してください。
> 逆に、保護ファイルの記事名が他の自動生成記事に含まれている場合は、スクリプト再実行で自動的にリンクされます。

## Step 5: 「下書き (Drafts) 投稿機能」の処理方法

ユーザーから「_draftsの中にある記事を投稿して」と依頼された場合、以下の手順で作業を自動化します：

1. `f:\Fallout\_drafts` 内にあるすべての `.md` 形式の下書きファイルを読み込みます（`TEMPLATE.md` は除外）。
2. そのMarkdownファイルのFrontmatter（Title, Category, Appearance, Date）と本文を解析し、HTML形式で新しい記事ファイル（`[英語のslug].html`）を生成してください。本ターミナルの共通CSS、ヘッダ、SupabaseのLikeボタン、構造（`.note-figure` や `<main class="content">` など）を必ず完全に踏襲すること。
3. `lore.html` および `note_articles_data.json` を更新し、インデックスに追加します。
4. Step 4（`remove_duplicates.js` と `generate_notes_html.js` の実行）を行い、相互リンクを反映します。
5. 処理が完了した `.md` ファイルは `f:\Fallout\_drafts\published\` フォルダに移動して退避させてください。

## Step 5.1: X投稿フォーマットの生成

Step 5のウェブ記事生成と同時に、X（Twitter）投稿用フォーマットも必ず生成してください：

1. 以下のコマンドを実行する（または手動で同等の処理を行う）：

   ```bash
   node generate_x_post.js
   ```

   これにより `_X/<slug>/post.md` と `_X/<slug>/images/` が生成されます。

2. **X投稿フォーマットのレイアウトルール**：

   以下の構造を厳守すること。`_X/fallout-76-pets/post.md` を正式なリファレンスとして参照する。

   #### 全体構成

   ```
   #ハッシュタグ（登場作品タグのみ、#と文字の間にスペースなし）

   記事タイトル（日本語名）
   URL（https://www.fallout-jp.com/<slug>.html 形式、角括弧なし、プレーンテキスト）

   セクション見出し（1行目）
   （空行）
   本文...

   ---

   次のセクション見出し
   （空行）
   本文...

   ---

   💭 感想
   （空行）
   感想本文（一文ずつ改行）...

   ---

   ライセンス文
   ```

   #### 段落・空行の詳細ルール

   - **ハッシュタグ行**（`#Fallout76` 等）は `#` と文字の間に**スペースを入れない**（マークダウン見出しではなくハッシュタグとして記述）
   - ハッシュタグの後に**空行1行**、その次に**記事タイトル（英語名）**、さらにその次行に**URL**（角括弧 `<>` で囲まない、プレーンテキスト）
   - **セクション見出し**（概要、インタラクション、開発 等）の直後に**空行1行**を入れてから本文を開始する
   - **小見出し**（アトミックショップ、シーズン報酬 等）の直後は**空行なし**で箇条書きを開始する
   - **`---` セパレータ**の前後に**空行1行ずつ**を入れる
   - **「。」の後は改行**して一文ずつ読みやすくする
   - **メモ・舞台裏セクション**の `・` 箇条書きは、各項目の間に**空行1行**を入れて視認性を上げる
   - **感想セクション**も一文ごとに改行する

   #### コンテンツルール

   - ハッシュタグは**登場作品タグのみ**（`#Fallout4` `#Fallout76` `#FalloutNV` `#FalloutTV` 等）。カテゴリ名・記事名・#ロア解説 等の独自タグは一切付けない
   - `#Fallout`（FO1）は**Fallout 1が登場作品の記事のみ**付ける
   - **見出しに絵文字は使わない**（ただし感想セクションのみ「💭 感想」とする）
   - 見出しや本文中の英単語カッコ書き（「概要（Overview）」等）は**すべて削除**し日本語のみにする
   - **フロントマター（title/category/date等の---ブロック）は一切記載しない**
   - 画像は最大**4枚**まで（`_X/<slug>/images/`に格納）
   - **内容の言い換え・要約・省略・追加は一切禁止**。HTMLページの本文と**完全に同一の文章**をそのまま転記し、X投稿フォーマット（改行・---）だけを付加する
   - **セクション構成**：HTMLページの全セクションをすべて記載。一つも省かない
   - **末尾に必ず以下のライセンス文を `---` で区切って追記する**：

     ```
     This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
     ```

3. **GitHub公開時の移動先**：
   - X投稿済みの `_X/<slug>/` フォルダは `_drafts/published/X/<slug>/` に移動して件数管理します。

## Step 6: 完了報告

作業完了後は、ユーザーに以下を必ず報告します：

- 作成したHTML記事と相互リンク反映の完了
- 生成されたX投稿ファイル (`_X/<slug>/post.md`) の場所
- ブラウザでの確認依頼
