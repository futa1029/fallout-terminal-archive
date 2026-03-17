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
- 画像は**一つ残らず**ダウンロードし、元のWikiと同じ箇所に配置する。**ロア記事（HTML）での画像取得数に上限はない**。Wikiページおよびその関連ページ（TVシリーズ版など）に掲載されている全画像をダウンロードし、本文やギャラリーに漏れなく配置すること。（※過去に「メディアに登場するVault」のような大規模ギャラリーの画像が抜け落ちるケースがあったため、いかに数が多くても絶対に省略・スキップしないよう徹底する）
- **ギャラリー画像 + 本文中画像の全取得チェック手順**（必須）：
  1. Wikitextの `<gallery>` セクションに列挙されているファイル名を**すべてリストアップ**する
  2. Infobox画像（`|image =`）も別途リストに加える
  3. **本文中の `[[file:...]]` / `[[File:...]]` タグで参照されている画像も全てリストに加える**。これらはセクションごとのサムネイル画像（`|thumb|` 指定）であり、記事の視覚的構成に不可欠。`gallery` セクション以外に本文中に直接埋め込まれている画像を見落としてはならない
  4. Fandom APIの `images` リストに含まれる全画像と、上記1〜3のリストを照合し、**漏れがないことを確認**する
  5. 各ファイルのダウンロードURLをFandom APIで取得し、**全ファイルをダウンロード**する
  6. HTMLの本文中に**Wiki原文と同じ位置（同じセクション）に画像を配置**し、ギャラリーセクションにも**リストアップした全画像を漏れなく配置**する
  7. ダウンロードした画像ファイル数とWikitext上の画像ファイル数を照合し、一致していることを確認する
- **画像の省略・間引きは一切禁止**。「代表的な画像のみ」「重要な画像のみ」といった判断でダウンロード枚数を減らしてはならない。Wikiの `images` リストに含まれる全画像ファイル（Perkアイコン、実績アイコン、マップアイコン、プレイヤーアイコン、ロケーションアイコン等を含む）をすべてダウンロードすること。ただし、サイト共通UIアイコン（`Icon_sic.png`、`Gametitle-*.png`、`Bugintro.png` 等のWiki運営用画像）は除外してよい
- Fandom APIで画像URLを取得する際は、1回のリクエストで最大10ファイルまで指定可能。全画像を漏れなく取得するため、**必要なバッチ数を事前に計算し、すべてのバッチを実行すること**

- **ギャラリー画像のキャプション（`.caption`）と `alt` 属性は必ず日本語に翻訳すること**。英語のままにしてはならない。翻訳は「Vault 12：ドアが正常に閉まらない設計で放射線を人体に照射する実験Vault」のように「Vault番号：説明」の形式で記述する。
- **X投稿用の画像は4枚まで**。ダウンロードした全画像の中から、記事の内容が最も伝わりやすいと判断した**印象的な4枚**を厳選して `_X/<slug>/images/` に格納する
- 本文中で使わなかった画像はページ下部の**GALLERYセクション**に、元のWikiと同じカテゴリ分け（作品別等）で追加する
- **英語原文のカッコ書きは残さない**。本文中でも見出し（h1/h2/h3）でも、英語のカッコ書きは一切使わないこと。例：
  - 本文: 「仲間(Allies)」→「仲間」、「C.A.M.P.ペット(C.A.M.P. pets)」→「C.A.M.P.ペット」
  - 見出し: 「概要（Background）」→「概要」、「起源（Origins）」→「起源」、「バッド・アスキンス（Bud Askins）」→「バッド・アスキンス」
  - HTMLの記事本文・見出し・X投稿のすべてに適用する
- **「。」の後に文が続く場合は改行する**。HTML本文では `。<br>` とし、一文ごとに改行して日本語を見やすく配置すること。段落末尾（`</p>` や `</li>` の直前）では不要
- **場所名・地名は日本語に翻訳する**。Wikiに登場する地名・ロケーション名は可能な限り日本語に翻訳すること。例：「Charleston」→「チャールストン」、「Morgantown」→「モーガンタウン」、「The Forest」→「森林地帯」、「Cranberry Bog」→「クランベリー湿原」、「Harpers Ferry」→「ハーパーズ・フェリー」
- **固有名詞の統一翻訳テーブル**。以下の用語は記事全体で統一して日本語表記を使用すること：

  | 英語 | 日本語 |
  |---|---|
  | Scorched Plague | スコーチ病 |
  | Scorchbeast | スコーチビースト |
  | Scorched | スコーチ |
  | Great War | 大戦 |
  | Wasteland | ウエイストランド |
  | Brotherhood of Steel | ブラザーフッド・オブ・スティール（B.O.S.） |
  | Responders | レスポンダーズ |
  | Free States | フリー・ステイツ |
  | Settlers | 入植者 |
  | Raiders | レイダー |
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
  | Burning Springs | バーニング・スプリングス |
  | Watoga | ワトガ |
  | Fort Atlas | アトラス砦 |
  | Whitespring Resort | ホワイトスプリング・リゾート |
  | Mount Blair | ブレア山 |
  | Grafton Steel | グラフトン鉄鋼 |
  | Top of the World | 世界の頂上 |
  | Snallygaster | スナリーギャスター |
  | Ally / Lite ally | 同居人 |
  | Gold bullion | 金塊 |

- **ホロテープ・メモ・ターミナルエントリの引用ルール**（全記事タイプ共通）：
  - 記事のWikitext内でリンクされている**ホロテープ、メモ（ノート）、ターミナルエントリ、ログ**がある場合、それらのリンク先ページにFandom APIでアクセスし、**全文を取得して日本語に翻訳**すること
  - **Notable loot（主なアイテム）セクションに列挙されたアイテムも必ず全文取得の対象とする**。アイテム名だけの一覧で終わらせず、各アイテムの中身（テキスト内容）をAPIで取得し、翻訳して記事に挿入すること
  - **ターミナルエントリ**：Infoboxの `|terminal =` フィールドにリンクがある場合、そのリンク先ページ（例: `[[○○ terminal entries]]`）をFandom APIで取得し、全文を翻訳して記事に「ターミナルエントリ」セクションとして挿入すること。ターミナルの内容が長い場合は、ロア的に重要なエントリを選別して掲載してもよいが、可能な限り網羅すること
  - 翻訳した内容は記事本文中に**引用ブロック**として盛り込む：
    - ホロテープ → `holotape-box`（オレンジ色の左ボーダー）で表示
    - メモ・ノート → `note-box`（青色の左ボーダー）で表示
    - ターミナルエントリ → 専用セクション（例: `<h2>ターミナルエントリ</h2>`）を設けて掲載。各エントリは `note-box` で表示
  - 引用元のリンク先ページに**画像**がある場合は、その画像もFandom APIで取得してダウンロードし、引用ブロック付近に配置すること
  - **ロケーション記事**の場合は、そのロケーションで発見できるノート・ホロテープ・ターミナルエントリを**専用セクション**（例: `<h2>発見できるホロテープ・メモ</h2>`）にまとめて掲載し、1つの記事ページ内で完結するようにする
  - **人物・勢力・その他の記事**でも、Wikitext内に `[[ホロテープ名]]` や `[[メモ名]]` のリンクがある場合は同様にAPIで全文取得・翻訳・引用すること
  - 引用は**背景セクション等の関連する文脈の近く**に配置し、読者がストーリーの流れの中で自然に読めるようにする

- **感想セクション（`quote-box`）の文体ルール**：
  - 「アイロニー」「メタファー」「カタルシス」等の**抽象的・文学的な用語は使わない**
  - 何が起きたか、なぜ印象的かを**ストレートで分かりやすい言葉**で伝える
  - 例: ×「悲劇的なアイロニーの一つです」 → ○「愛する人を救おうとした行動が、その人を殺してしまった——これほど残酷な結末はありません」

- **翻訳用語の統一ルール**：
  - Overseer → **監督官**（「オーバーシアー」は使わない）
  - Overseer's stash / cache → **監督官のスタッシュ**（「隠し場所」は使わない）
  - Scorched → **スコーチ**（「スコーチド」は使わない）
  - Snallygaster → **スナリーギャスター**（「スナリーガスター」は使わない）
  - Responders → **レスポンダー**（「レスポンダーズ」は使わない）
  - Fire Breathers → **ファイア・ブリーザー**（「ファイア・ブリーザーズ」は使わない）
  - Garrahan Mining → **ガラハン鉱業**（「ギャラハン鉱業」は使わない）

### 原則2: 感想の充実

- 感想（quote-box）は**簡略化・要約を行わない**。文字数制限は設けず、記事（翻訳内容や背景）から得たインスピレーションや感情をすべて吐き出すように「ツラツラと」語ること。
- **感想（quote-box）はHTMLの本文末尾（全セクション終了後、フッター・ライセンス表記の直前）に配置すること。h1タイトル直後には絶対に置かない。**
- **感想のCSS・HTML構造は以下に厳格に従うこと：**

  CSS:

  ```css
  .quote-box {
      border-left: 4px solid var(--accent-color);
      margin: 40px 0 20px 0;
      background: color-mix(in srgb, var(--accent-color) 10%, transparent);
      padding: 15px 15px 15px 20px;
      border-radius: 0 5px 5px 0;
      line-height: 1.6;
  }
  .quote-box b {
      color: var(--accent-color);
      font-size: 1.05em;
  }
  ```

  HTML（必ず `<b>感想</b><br><br>` で開始すること）:

  ```html
  <div class="quote-box">
      <b>感想</b><br><br>
      感想本文...<br>
  </div>
  ```

- ユーザーのX（@IwamotoFuta）での口調を模倣し、親しみやすく、かつ熱量のあるプレイヤー目線の「丁寧語ベースの語りかけスタイル（w や ！、〜などを自然に交える）」で記述する。
- **箇条書きや小見出しによる分割は禁止**。一つのまとまった文章として、頭に浮かんだ想いや、ゲームプレイ体験と結びつくワクワク感、ロケーションの魅力などを流れるように連続的に記述すること。

### 原則3: loreページからのリンク

- ページを作成したら `lore.html` の `loreEntries` 配列にエントリーを追加する
- **`changelog-data.json` にも新規記事のエントリを追加すること**。changelog-data.jsonは `changelog.html` が読み込む更新履歴データであり、ここにエントリを追加しないとchangelogページに新記事が反映されない。エントリのフォーマットは `{ "name", "yomi", "url", "category", "appearance", "date", "status" }` で、配列の先頭に追加する。**未公開記事は `"status": "draft"` を付与すること**（公開済みの記事はstatusフィールド省略可＝published扱い）
- `remove_duplicates.js` と `generate_notes_html.js` を実行して相互リンクを反映する

> [!CAUTION]
> **`remove_duplicates.js` への登録を絶対に忘れないこと。** `remove_duplicates.js` を実行すると `lore.html` の `loreEntries` 配列が**完全に再構築**される。lore.htmlに手動で追加したエントリは上書きされて消える。新規記事を追加する際は、`remove_duplicates.js` 内の以下3箇所に必ず登録すること：
>
> 1. `manualEntries` 配列 — 記事のメタデータ（name, yomi, url, category, appearance, date, status）。**未公開記事は `status: "draft"` を指定**すること。draft記事はlore.htmlの一覧から自動除外される
> 2. `duplicateKeywords` 配列 — 重複を防止するための日本語キーワード
> 3. `protectedFiles` 配列 — スクリプトによるファイル削除から保護するスラッグ名（拡張子なし）

### 原則4: X投稿素材の作成

- X用の文章（文字数制限なし）を `_X/<slug>/post.md` に作成する
- **ハッシュタグは `#` の直後にスペースを入れない**（例: `#Fallout76 #FalloutTV`）。`# Fallout76` のように `#` の後にスペースを入れるとMarkdownの見出し記法として解釈されてしまうため、必ず `#タグ名` と詰めて書くこと
- **URLは `<>` で囲まない**。`https://www.fallout-jp.com/...` とプレーンテキストのまま記載すること。`<https://...>` とするとXで正しくリンクにならない

> [!CAUTION]
> **post.md生成時に最も間違えやすい2つのミス：**
>
> **ミス1: ハッシュタグの `#` の後にスペースを入れる**
>
> - ❌ NG: `# Fallout #Fallout76` → Markdownの見出しになってしまう
> - ✅ OK: `#Fallout #Fallout76`
> - 特に**1行目の先頭ハッシュタグ**は `#` + スペースで見出し化しやすいので最も注意すること
>
> **ミス2: URLを `<>` で囲む**
>
> - ❌ NG: `<https://www.fallout-jp.com/vault.html>`
> - ✅ OK: `https://www.fallout-jp.com/vault.html`
> - Markdownのオートリンク記法 `<URL>` は使わず、URLをそのまま書くこと
>
- 記事内から**印象的な4枚の画像**を選び `_X/<slug>/images/` フォルダに格納する
- 画像は記事の画像アセットからコピーし、X投稿時にすぐ使える状態にする

---

## ⚠️ HTMLファイル操作時のエンコーディング注意事項

> [!CAUTION]
> **PowerShellの `Set-Content` でHTMLファイルを書き換えてはならない。** `-Encoding UTF8` を指定してもBOM（Byte Order Mark: `EF BB BF`）付きUTF-8で出力されるため、日本語が文字化けする。HTMLファイルの内容を変更する際は、以下の方法のみを使用すること：
>
> **✅ 安全な方法（推奨順）：**
> 1. **エディタツール**（`replace_file_content` / `multi_replace_file_content`）— テキスト置換はこれを最優先で使う
> 2. **Node.js** の `fs.writeFileSync(path, content, 'utf8')` — BOMなしUTF-8で出力される。大量の行削除など、エディタツールでは対処しにくい場合に使用する
>
> **❌ 禁止：**
> - `Set-Content -Encoding UTF8` — BOM付きUTF-8になり文字化け
> - `Out-File -Encoding utf8` — 同上
> - `[System.IO.File]::WriteAllText()` をエンコーディング指定なしで使用 — システムデフォルトのエンコーディングになる可能性がある
>
> **テンプレートからのコピー後の書き換え手順：**
> 1. 既存記事をテンプレートとして `Copy-Item` でコピーする（これは安全）
> 2. コピーしたファイルの内容変更はすべてエディタツール（`replace_file_content` / `multi_replace_file_content`）で行う
> 3. 旧本文の一括削除が必要な場合は Node.js スクリプト（`fs.readFileSync` → 行フィルタ → `fs.writeFileSync`）を使用する

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
- **SPECIAL行は不要**: キャラクターのインフォボックスに `SPECIAL` ステータス（`S8 P4 A5` のような値）は**記載しない**こと。この情報はロア記事として不要
- **スタイル（CSS変数）**: ベースカラー `--bg-color: #0f0f0f`、テキスト・メイン枠 `--accent-color: #00ff00`
- **フォント**: `Share Tech Mono` および `Noto Sans JP` (`<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">`)
- **アクションヘッダ**:
  - `lore.html` に戻るための `<a href="lore.html" class="back-link">< BACK TO TERMINAL</a>` をページ上部に配置します。
  - Supabase連携用の `<button class="like-button" data-article-id="..." onclick="toggleLike(this)">` を配置します（一意なキーを作成）。
- インラインの画像がある場合は `<div class="note-figure">...</div>` などで囲んでも構いません。
- **著作権表示（ライセンスクレジット）**: 記事末尾の著作権表示は、CC BY-SA 3.0 準拠の**英語フォーマット**で記載すること。以下の3要件を必ず満たすこと：

  ```html
  <div class="copyright">
      <p>This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/元記事のWikiスラッグ" target="_blank" rel="noopener">元記事の英語タイトル</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
      <p>&copy; Overseer Mohi's Terminal — Fallout Lore Archive</p>
      <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
  </div>
  ```

  > [!CAUTION]
  > **CC BY-SA 3.0 に準拠するため、以下の3点を必ず満たすこと：**
  > 1. **元記事への個別リンク** — `https://fallout.fandom.com/wiki/記事スラッグ` への `<a>` タグ。出典名は「Nukapedia: The Fallout Wiki」を使用
  > 2. **翻訳・編集した旨の明示** — 「translating and editing」の文言
  > 3. **ライセンスへのリンク** — CC BY-SA 3.0 ページへの `<a>` タグ
  >
  > 元記事のWikiスラッグが不明な場合は、h1タイトルのスペースをアンダースコアに置換して使用する。
  > それでも特定できない場合は、Fallout Wikiトップ (`https://fallout.fandom.com/`) へのリンクで代替する。

- **寄付リンク**: フッター（copyright文の後）に必ず以下を追加すること：

  ```html
  <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
  ```

- **記事タイトルは英語名を使用する**: HTMLの `<title>`, `<h1>`, OGPメタタグ, サイドバーの `<h3>` では**英語のタイトル**（例: "Vault-Tec", "Aaron Kimball"）を使用すること。本文中では日本語名と英語名を併記可。
- **h1の直下に日本語名サブタイトルを必ず追加する**: `<br>`タグの後に `<span>` で日本語名を小さく表示すること。形式は以下の通り：

  ```html
  <h1>Bloodleaf<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">ブラッドリーフ</span></h1>
  ```

### ⚠️ 相互リンク（auto-link）の誤リンク防止ルール

記事内のキーワードに `<a href="..." class="auto-link">` を手動で付ける際は、必ず以下を確認してください：

1. **リンク先のHTMLファイルが実在することを必ず確認する**
   - `f:\Fallout\` ディレクトリにリンク先の `.html` ファイルが存在するかを検証すること
   - **存在しないHTMLファイルへのリンクは絶対に貼らない**。不確かな場合はプレーンテキストのままにする
   - 例：`great-war.html`, `foundation.html`, `the-unstoppables.html` 等が存在しない場合、「大戦」「入植者」「ジ・アンストッパブルズ」にはリンクを付けない

2. **同名でも別エンティティには絶対にリンクしない**
   - 例：「ロニー・マッカーティ（Vault 31の社員）」→ `ronnie.html`（Fallout 76のロニー）には**リンクしない**
   - 例：「エンクレイヴ」→ `forced-evolution-virus-fev.html`（FEV記事）には**リンクしない**

3. **リンク先の記事が「同一の概念・同一人物・同一組織」を扱っているときのみリンクする**
   - 登場作品・所属組織・役割が一致しているかを必ず照合すること

4. **不確かな場合はリンクしない**（プレーンテキストのままにする）

### ✍️ 感想セクションの文体ルール

感想（quote-box）を書く際は、以下の表現を**使用禁止**とする：

- **「マジで」** → 「本当に」「とにかく」などに置き換える
- **「俺」** → 一人称は使わない。「みんな」「プレイヤー」など不特定多数の表現か、主語を省略する
- **「〜するか！」「〜してみるか」** → 「〜してみたい」「〜してみたいところ」に置き換える
- **大げさ・文学的な表現は使わない**。以下はNG例：
  - ❌ 「〜は、本当に切ない」「胸が締め付けられます」
  - ❌ 「笑いと涙の両方を届けてくれる、〜を代表する名キャラクターだと思います！」
  - ❌ 「〜という夢の描写は…」のように作中のセリフや描写を引用して感動を演出する書き方
  - カジュアルなブログ調で、あくまで軽く・自然に書くこと。感動や感嘆を過度に強調しない

### 🎬 YouTubeリンクの埋め込みルール

Wikiページや参考資料にYouTubeリンク（`youtube.com/watch?v=...` または `youtu.be/...`）が含まれる場合は、以下のルールに従ってiframeで埋め込むこと：

1. **埋め込みURLへの変換**：
   - `https://www.youtube.com/watch?v=VIDEO_ID` → `https://www.youtube.com/embed/VIDEO_ID`
   - `https://youtu.be/VIDEO_ID` → `https://www.youtube.com/embed/VIDEO_ID`

2. **HTML構造**（必ずこの形式を使用すること）：

   ```html
   <div class="video-container">
       <iframe
           src="https://www.youtube.com/embed/VIDEO_ID"
           title="動画タイトル（日本語）"
           frameborder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen>
       </iframe>
   </div>
   ```

3. **CSS**（`<style>` タグ内に追加）：

   ```css
   .video-container {
       position: relative;
       padding-bottom: 56.25%; /* 16:9 アスペクト比 */
       height: 0;
       overflow: hidden;
       margin: 30px 0;
       border: 1px solid var(--accent-color);
   }
   .video-container iframe {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
   }
   ```

4. **配置場所**：動画に関連するセクションの説明文の直後に配置する。複数ある場合はギャラリーセクションの前にまとめて配置してもよい。

5. **キャプション**：埋め込みの直下に `<div class="image-caption">` で動画タイトルを日本語で記載すること。

> [!NOTE]
> YouTubeの埋め込みは必ずiframeで行い、プレーンテキストのURLや `<a>` タグのみのリンクで代替しないこと。ページを開いた状態で動画が再生できる状態にすること。

---

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

## Step 5.2: 記事のステータス管理（公開/非公開）

記事は `draft`（非公開）/ `published`（公開済み）のステータスで管理する。

### 記事作成時（draft）

- `remove_duplicates.js` の `manualEntries` に `status: "draft"` を付与して登録
- `changelog-data.json` にも `"status": "draft"` を付与して追加
- **draft記事はPushしない**（URL直打ちアクセス不可にするため）

### 公開日（draft → published）

以下の手順で公開する：

1. `changelog-data.json` の該当エントリから `"status": "draft"` を削除（または `"published"` に変更）
2. `changelog-data.json` の `"date"` を公開日に変更
3. `remove_duplicates.js` の `manualEntries` からも `status: "draft"` を削除（または `"published"` に変更）
4. `node remove_duplicates.js` を実行（lore.htmlに記事を反映）
5. Git push

> [!IMPORTANT]
> `status` フィールドが省略された場合は `published`（公開済み）扱いとなる。既存エントリはすべてstatus未設定＝公開済みとして動作する。

## Step 6: 完了報告

作業完了後は、ユーザーに以下を必ず報告します：

- 作成したHTML記事と相互リンク反映の完了
- 生成されたX投稿ファイル (`_X/<slug>/post.md`) の場所
- ブラウザでの確認依頼

## 翻訳統一ルール

以下のFallout用語は、記事・post.mdともに必ず指定の日本語訳を使うこと。カタカナ音写や他の訳を使ってはならない。

| 英語 | 日本語訳 | NG例 |
|------|---------|------|
| Overseer | 監督官 | オーバーシアー、オーバーシーア |
| Scorched | スコーチ | スコーチド |
| Charleston Herald | チャールストン・ヘラルド | チャールストンヘラルド |
| the Christmas Flood | クリスマスの大洪水 | クリスマス洪水 |
| Kanawha River | カナー川 | カナワ川 |
| Clancy Manor | クランシー邸宅 | クランシー・マノー |
| Cow Spots Creamery | カウスポット乳製品製造所 | カウ・スポッツ・クリーマリー |

## 場所記事のマップ画像ルール

場所（ロケーション）の記事を作成する際は、Wikiのinfoboxに `map marker image` がある場合、そのマップ画像も必ずダウンロードして使用すること。

- マップ画像はインフォボックスのメイン画像の直後に配置する
- キャプションに「マップ上の位置（最寄り地名付近）」のような説明を付ける
- Wikitext の `|map marker image =` フィールドから画像ファイル名を取得する

## 感想セクションのスタイルガイド

- 「w」の使用は**記事あたり最大1回**に留める。多用するとカジュアルすぎる印象になる
- 丁寧で親しみやすいトーンは維持しつつ、過剰なネットスラングは避ける
## HTML生成時の重複防止ルール

- テンプレートHTMLからCSS/scriptを抽出して結合する方式は**重複出力のリスクが高い**ため禁止する
- HTMLファイルは**1つのNode.jsスクリプトで全体を一括生成**すること（テンプレートの部分抽出は行わない）
- 生成後に必ず以下の検証を行い、各要素が**1個ずつ**であることを確認する：
  - `</html>`, `</body>`, `</main>` がそれぞれ1個
  - `<script>` タグが1個（supabase CDNの `<script src=...>` は別カウント）
  - ファイルが `</html>` で正しく終了している

## ゲームタイトル記事の作成ガイド

Falloutシリーズのゲームタイトル記事（Fallout 4、Fallout 76 等）は通常記事より大規模なため、以下の手順に従う。

### テンプレートと参照先

| ゲーム | ファイル名 | 備考 |
| --- | --- | --- |
| Fallout | `fallout-1.html` | |
| Fallout 2 | `fallout-2.html` | |
| Fallout 3 | `fallout-3.html` | |
| Fallout: New Vegas | `fallout-new-vegas.html` | |
| Fallout 4 | `fallout-4.html` | CSS/JS構造のリファレンス |
| Fallout 76 | `fallout76.html` | 大型記事の分割生成例 |
| Fallout Tactics | `fallout-tactics.html` | |

### 大型記事の分割生成

トークン制限に達する可能性がある大規模記事（60KB超）は、以下の分割戦略を使う：

1. **Part 1**: HEAD + CSS + Infobox（既存記事 `fallout-4.html` からCSS/Scriptを流用）
2. **Part 2**: 概要、ゲームプレイ等の前半セクション
3. **Part 3**: ストーリー、クエスト等の後半セクション
4. **Part 4**: 開発、評価、ギャラリー、フッター + Supabaseスクリプト

各パートは `fs.appendFileSync` で同一ファイルに追記する方式とする。

### 画像の格納場所

- ゲームタイトル記事の画像は `images/note_extracted/<slug>/` にまとめて格納する
  - 例: `images/note_extracted/fallout76/Fallout_76_box_cover.jpg`
- 通常のロケーション/人物記事は `images/note_extracted/<noteId>_img_N.png` 形式

### カテゴリ

- ゲームタイトル記事のカテゴリは**「記録」**を使用する
- `data-article-category="記録"` を body タグに設定する
