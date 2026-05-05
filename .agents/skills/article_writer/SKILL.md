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
- 画像は**一つ残らず**ダウンロードし、元のWikiと同じ箇所に配置する。**ロア記事（HTML）での画像取得数に上限はない**。
- **画像の省略・間引きは一切禁止**。Wikiの `images` リストに含まれる全画像ファイルをすべてダウンロードすること。
- **ギャラリー画像のキャプション（`.caption`）と `alt` 属性は必ず日本語に翻訳すること**。
- **X投稿用の画像は4枚まで**。厳選して `_X/<slug>/images/` に格納する。
- **英語原文のカッコ書きは残さない**。本文中でも見出し（h1/h2/h3）では、英語のカッコ書きは一切使わないこと。
- **「。」の後に文が続く場合は改行する**。HTML本文では `。<br>` とし、一文ごとに改行して日本語を見やすく配置すること。
- **場所名・地名は日本語に翻訳する**。
- **固有名詞の統一翻訳テーブル**。以下の用語は記事全体で統一して日本語表記を使用すること：

  | 英語 | 日本語 |
  |---|---|
  | West Tek | West Tek |
  | Scorched Plague | スコーチ病 |
  | Scorchbeast | スコーチビースト |
  | Scorched | スコーチ |
  | Great War | 大戦 |
  | Wasteland | ウエイストランド |
  | Brotherhood of Steel | ブラザーフッド・オブ・スティール（B.O.S.） |
  | Responders | レスポンダー |
  | Free States | フリー・ステイツ |
  | Enclave | エンクレイヴ |
  | Super mutant | スーパーミュータント |
  | Feral ghoul | フェラル・グール |
  | The Forest | 森林地帯 |
  | Ash Heap | 積灰の山 |
  | Toxic Valley | 毒の峡谷 |
  | Savage Divide | 荒れた境域 |
  | The Mire | 沼地地帯 |
  | Cranberry Bog | クランベリー湿原 |
  | Skyline Valley | スカイライン・バレー |
  | Overseer | 監督官 |
  | Chemistry station | ケミストリーステーション |
  | Cave cricket | カマドウマ |

### 原則2: 感想の充実と末尾必須セクションの完備（★最重要★）

> [!CAUTION]
> **「感想」「タグ」「ライセンス」「コピーライト」「寄付リンク」の5点セットは、記事末尾の絶対必須コンポーネントである。**
> 過去にこれらを忘れて記事を生成するミスが何度も繰り返されている。HTML生成時、完了報告前には必ずこれら5つが `<div class="comments-section">` の直前に存在することを確認せよ。

- 感想（quote-box）は**簡略化・要約を行わない**。文字数制限は設けず、記事から得たインスピレーションや感情をすべて吐き出すように語ること。
- **感想（quote-box）はHTMLの本文末尾（全セクション終了後、フッター・ライセンス表記の直前）に配置すること。h1タイトル直後には絶対に置かない。**
- **感想の文体ルール**:
  - 「マジで」「俺」「〜するか！」等の表現は**使用禁止**。
  - カジュアルなブログ調で、あくまで軽く・自然に書くこと。「w」は記事あたり最大1回まで。
  - 箇条書きや小見出しによる分割は禁止。一つのまとまった文章として記述すること。

- **記事末尾の構成テンプレート（必須）**: 以下のHTML構造をそのまま使用し、`<main class="content">` の終端（コメントセクションの前）に配置すること。

  ```html
  <!-- Impression Section -->
  <div class="quote-box">
      <b>感想</b><br><br>
      <div class="note-figure">
          <div class="note-figcaption">
              感想本文（プレイヤー目線の熱い語り）
          </div>
      </div>
  </div>

  <!-- Footer Metadata Section -->
  <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
      <div style="margin-bottom: 10px;">
          TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#作品タグ</span>
      </div>
      
      <p>This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Slug" target="_blank" rel="noopener">Article Title</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.</p>
      <p>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
      <p>&copy; Overseer Mohi's Terminal — Fallout Lore Archive</p>
      <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
  </div>
  ```

### 原則3: インデックス更新と相互リンク

- ページを作成したら `lore.html` および `changelog-data.json` にエントリを追加する。
- **`remove_duplicates.js` への登録を絶対に忘れないこと。**
- スクリプト（`remove_duplicates.js`, `generate_notes_html.js`）を実行して整合性を取る。

### 原則4: X投稿素材の作成

- X用の文章を `_X/<slug>/post.md` に作成し、画像を4枚格納する。
- **ハッシュタグの `#` の後にスペースを入れない**（例: `#Fallout76`）。
- **URLは `<>` で囲まない**（プレーンテキストで記載）。

---

## 🛠️ 技術仕様・検証手順

### HTML生成時の注意事項
- **BOMなしUTF-8**で保存すること。
- `grid-template-columns: 300px 1fr` の2カラムグリッドを維持。
- **lore.html への戻りリンク** (`< BACK TO TERMINAL`) を必ず配置。
- コメントセクションのCSS（`box-sizing: border-box` 等）を必ず含める。
- **画像は必ず行間に配置（ブロック要素）**。テキストの左右への回り込み（`float`）は禁止。

### コンテンツ完全性チェック
- **Notable loot** にあるホロテープ・メモ・ターミナルの全文を取得・翻訳したか？
- **場所記事**の場合、マップ画像（`img_map_marker.png`）をInfoboxに配置したか？
- 生成後に `holotape-box` や `note-box` の数がWikitextと一致するか検証すること。

### 🛡️ `lore_index.js` 構文安全性
- `JSON.stringify()` を使用して値を注入し、エスケープ漏れを防ぐ。
- 変更後は必ず `node -e "..."` で構文チェックを実行すること。

---

## Step-by-Step ワークフロー

1. **調査・スラッグ決定**: `title_to_slug.json` に登録。
2. **全文・画像取得**: ホロテープ・メモ・ターミナル・マップ画像を漏れなくDL。
3. **HTML生成**: テンプレートに従い、必須5大セクションを含めて構築。
4. **インデックス更新**: `remove_duplicates.js` 等を実行。
5. **最終検証**: コンテンツ数と構文のチェック。
6. **X素材作成**: `post.md` と画像の用意。
7. **完了報告**: ファイル名とリンク状況をユーザーに伝える。
