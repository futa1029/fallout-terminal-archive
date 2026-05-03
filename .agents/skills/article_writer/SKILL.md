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
  | Kanawha | カナー |
  | Fort Atlas | アトラス砦 |
  | Whitespring Resort | ホワイトスプリング・リゾート |
  | Mount Blair | ブレア山 |
  | Grafton Steel | グラフトン鉄鋼 |
  | Top of the World | 世界の頂上 |
  | Snallygaster | スナリーギャスター |
  | Ally / Lite ally | 同居人 |
  | Gold bullion | 金塊 |
  | Overseer | 監督官（※「オーバーシアー」はNG） |
  | Hornwright summer villa | ホーンライト夏の別荘 |
  | Kanawha | カナー（※「カナワ」はNG） |
  | Chemistry station | ケミストリーステーション（※「薬品作業台」はNG） |
  | Cave cricket | カマドウマ（※「洞窟コオロギ」はNG） |
  | Starlight creeper | スターライト・ベリー（※「スターライト・クリーパー」はNG） |
  | Fever blossom | 熱の花（※「フィーバーブロッサム」はNG） |
  | Owlet | フクロウ（※「アウレット」はNG） |
  | Order of Mysteries | オーダー・オブ・ミステリー（※「ミステリーの騎士団」はNG） |
  | Ash Heap | 積灰の山（※「アッシュ・ヒープ」はNG） |
  | Vertibird | ベルチバード（※「バーティバード」はNG） |
  | Serum | 設計図（※「セラム」はNG） |

- **ホロテープ・メモ・ターミナルエントリの引用ルール**（全記事タイプ共通）：
  - 記事のWikitext内でリンクされている**ホロテープ、メモ（ノート）、ターミナルエントリ、ログ**がある場合、それらのリンク先ページにFandom APIでアクセスし、**全文を取得して日本語に翻訳**すること
  - **Notable loot（主なアイテム）セクションに列挙されたアイテムも必ず全文取得の対象とする**。アイテム名だけの一覧で終わらせず、各アイテムの中身（テキスト内容）をAPIで取得し、翻訳して記事に挿入すること
  - **ターミナルエントリ**：Infoboxの `|terminal =` フィールドにリンクがある場合、そのリンク先ページ（例: `[[○○ terminal entries]]`）をFandom APIで取得し、全文を翻訳して記事に「ターミナルエントリ」セクションとして挿入すること。ターミナルの内容が長い場合は、ロア的に重要なエントリを選別して掲載してもよいが、可能な限り網羅すること
  - **⚠️ 取得漏れ防止チェックリスト**（HTML生成前に必ず確認）：

    > [!CAUTION]
    > **メモ・ホロテープの省略は絶対禁止**。記事に含まれるメモ・ホロテープが多い場合（例: 8件以上）でも、**全件をFandom APIで個別に取得し、全文を翻訳・挿入する**こと。「主要なもの」だけ選んで残りを省略してはならない。フィードバックフォームのような類似内容のメモでも、各々の記入内容やコメントが異なるため、すべて個別に全文翻訳して掲載する。

    0. **【最初に実行】Wikitext全体を走査し、`[[...]]` リンクの中からホロテープ・メモ・ノート・日誌・ターミナルエントリに該当するものを全てリストアップする**。`<ref>` タグ内のリンクも見落とさないこと。リストアップしたリンク先は全件APIで取得し、全文を翻訳してHTML記事に `holotape-box` / `note-box` / ターミナルセクションとして挿入する
    1. Wikitextの `==Notable loot==` セクションに列挙された全アイテムの中身をAPIで取得したか？（ホロテープ・メモ・ノートは名前だけでなく全文を取得する）
    2. Infoboxの `|terminal =` で指定されたターミナルエントリページを取得したか？
    3. Infoboxの `|quests =` にリンクされたクエスト関連のホロテープ・メモを見落としていないか？
    4. 本文中（`<ref>` タグ内を含む）でリンクされているホロテープ・メモ（例: `[[Note to Mac]]`、`[[Jack's journal]]`）をすべて取得したか？
    5. 取得した全てのコンテンツ（ホロテープ・メモ・ターミナルエントリ）がHTML記事に翻訳・挿入されているか？
    6. **最終確認**: 生成したHTMLに「ホロテープ・メモ」セクションが必要なのに存在しない場合は、記事を完了として報告しない。全件の内容挿入が完了するまで作業を続行する

    > [!CAUTION]
    > **MAP画像の取得は必須**。場所記事の場合、Fandom APIレスポンスの images リストに map.png を含むファイル名がある場合、必ずダウンロードして記事に含めること。MAP画像はInfoboxのメイン画像の直下に配置する。本文中には配置しない。MAP画像を省略してはならない。
    6. **場所記事の場合、images リストにMAP画像があれば必ずダウンロードし、Infoboxに配置したか？（本文中には不要）**
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
  - Chem → **薬物**（「ケム」は使わない）
  - Chemistry station → **ケミストリーステーション**（「薬物作業台」は使わない）

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

## Step 1.5: ホロテープ・メモ・ターミナル全文の事前取得（HTML生成前の必須ステップ）

> [!CAUTION]
> **このステップを完了するまで、Step 2（HTML生成）に進んではならない。**
> 過去に「背景・レイアウト等の骨格翻訳に集中してしまい、ホロテープ/メモ/ターミナルの全文取得を飛ばして記事を生成してしまう」というミスが繰り返し発生している。
> これを防ぐため、**HTML生成の前に**以下の全文取得を完了させること。

### 手順

1. **Wikitextから参照コンテンツを列挙し、数を数える**
   - `==Notable loot==` セクションからホロテープ・メモ・ノートを**全て**リストアップ
   - Infoboxの `|terminal =` で指定されたターミナルエントリページをリストに追加
   - 本文中の `[[ホロテープ名]]` / `[[メモ名]]` リンクも全てリストに追加
   - `<ref>` タグ内のリンクも確認
   - **リストアップ完了後、ホロテープ数・メモ数・ターミナル数をそれぞれカウントし、明示的に記載する**
     - 例：「ホロテープ: 11本、メモ: 15枚、ターミナル: 1件 → 合計 27件」

2. **Fandom APIで全文を一括取得する**
   - リストアップした**全アイテム**について、`api.php?action=parse&page=アイテム名&prop=wikitext&format=json` で内容を取得
   - `{{Transcript|text=...}}` 部分を抽出し、日本語に翻訳
   - **並列リクエストで効率的に取得すること（1回のAPIリクエストで1ページずつ、ただし複数のread_url_contentを同時に呼び出す）**
   - ⚠️ **Damaged holotape等の「内容がない」アイテムも含め、全件APIでアクセスすること。内容がない場合は「内容なし」と記録する**

3. **数値カウント検証**（★ゲート条件★）

   > [!CAUTION]
   > **チェックボックスだけでは不十分。数値の一致を明示的に確認すること。**
   > 過去にチェックボックス方式でも漏れが発生した実績がある。

   - 手順1でカウントした数と、実際にAPIで取得した数を照合する：
     - [ ] ホロテープ：リスト上 N 本 → 取得済み N 本（一致？）
     - [ ] メモ/ノート：リスト上 N 枚 → 取得済み N 枚（一致？）
     - [ ] ターミナル：リスト上 N 件 → 取得済み N 件（一致？）
   - **数が一致しない場合はStep 2に進まず、不足分をAPIで取得する**
   - **数が一致したことを明示的に宣言してからStep 2に進むこと**

4. **翻訳済みコンテンツの一時保存**
   - 取得した全コンテンツの翻訳文は、HTML生成スクリプトに直接含めるか、変数として保持する
   - HTML生成時に「ホロテープの内容」「メモの内容」「ターミナルエントリ」セクションとして挿入する

---

## Step 2: ターミナルHTMLの生成

> [!IMPORTANT]
> **Step 1.5 が完了していることを確認してから、このステップに進むこと。**
> HTML生成時に、Step 1.5で取得・翻訳した全てのホロテープ/メモ/ターミナルエントリの内容を記事に含めること。

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

> [!CAUTION]
> **コメントセクションのCSS定義は必ず `<style>` ブロック内に含めること。**
> コメント入力欄（`.comment-textarea`）には `box-sizing: border-box` が必須。これが無いとtextareaが親要素からはみ出しレイアウトが崩壊する。
> 以下のCSS定義を全て `<style>` 内に含めること（`daphne.html` L313-448を参照）：
> `.comments-section`, `.comments-title`, `.comment-form`, `.comment-textarea`, `.comment-textarea:focus`, `.comment-form-footer`, `.char-count`, `.comment-submit-btn`, `.comment-submit-btn:hover`, `.comment-submit-btn:disabled`, `.comment-msg`, `.comments-list`, `.comment-item`, `.comment-meta`, `.comment-time`, `.comment-body`, `.comment-delete-btn`, `.comment-delete-btn:hover`, `.comment-empty`, `.comment-loading`

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

### 🛡️ `lore_index.js` 構文安全性ルール（再発防止・必須）

> [!CAUTION]
> **`js/lore_index.js` に構文エラーがあると、`lore.html` と `admin.html` の両方で記事が0件表示になり、サイト全体が機能不全に陥る。** 2026-05-03に実際に発生したインシデントであり、以下のルールを厳守すること。

#### 禁止パターン（構文エラーの原因になる）

1. **エスケープされていないダブルクォート**
   - ❌ `name: "ドクター・"ノーズ"・エドモンドソン"`
   - ✅ `name: "ドクター・\"ノーズ\"・エドモンドソン"`
   - ニックネームや通称をダブルクォートで囲む場合は、必ず `\"` でエスケープすること

2. **HTMLタグを含む値**
   - ❌ `name: "「セリフ本文...<br>続きの文...<span>...」"`
   - ✅ `name: "セリフのキャラクター名"` （短い識別名のみにする）
   - `name` / `yomi` フィールドに `<br>` や `<span>` 等のHTMLタグを含めてはならない。セリフの引用をnameに入れないこと

3. **複数行にわたる値**
   - ❌ name/yomi の値が改行を含んで複数行にまたがっている
   - ✅ 全てのフィールド値は1行で完結させること

4. **二重セミコロン**
   - ❌ `];;`
   - ✅ `];`

#### 変更後の必須検証（★毎回実行★）

`lore_index.js` を変更した後は、**必ず**以下のコマンドで構文チェックを行うこと：

```bash
node -e "const fs=require('fs');const c=fs.readFileSync('f:/Fallout/js/lore_index.js','utf8');try{new Function(c);console.log('OK')}catch(e){console.error('ERROR:',e.message);process.exit(1)}"
```

- `OK` が出力されれば問題なし
- `ERROR` が出力された場合は、**コミット・プッシュせずにエラーを修正すること**
- `remove_duplicates.js` でインデックスを再構築した後も、必ずこの検証を実行すること

#### トラブルシューティング（構文エラー発生時）

構文エラーでサイトが壊れた場合の修復手順：

1. `scripts/find_syntax_error.js` を実行してエラー箇所を特定する
2. エスケープされていないダブルクォート → `\"` に修正
3. HTMLタグを含むname/yomi → HTMLを除去して短い名前に修正
4. 修正後に上記の構文チェックコマンドで `OK` を確認する


## Step 4: 全体再構成スクリプトの実行（相互リンクの更新）

新規記事を追加したことで、その単語が他のすべての記事の「相互リンク候補」になります。そのため、以下のコマンドを実行して全体を再生成してください。

```bash
node remove_duplicates.js
node generate_notes_html.js
node generate_thumbnails.js
```

※ `remove_duplicates.js` および `generate_notes_html.js` の実行完了時に、`_scripts/fix_links.js` が自動的に呼び出され、全記事内の存在しないファイルへのリンクを自動解除（テキスト化）します。


## Step 4.5: ホロテープ/メモ/ターミナルの数値検証（HTML生成後の必須ステップ）

> [!CAUTION]
> **HTML生成後、Step 5に進む前に必ずこの検証を実行すること。**
> HTML内の `holotape-box` と `note-box` の数をカウントし、Step 1.5で把握した総数と照合する。
> 不一致があれば欠落箇所を特定して追加する。

### 検証方法

以下のコマンドで生成済みHTMLファイル内のコンテンツブロック数をカウントする：

```powershell
# ホロテープの全文ブロック数
(Select-String -Path "<記事>.html" -Pattern 'holotape-box' -AllMatches).Matches.Count
# メモの全文ブロック数
(Select-String -Path "<記事>.html" -Pattern 'note-box' -AllMatches).Matches.Count
```

### 検証チェックリスト

- [ ] HTML内の `holotape-box` 数 = Step 1.5でリストアップしたホロテープ数？
- [ ] HTML内の `note-box` 数 = Step 1.5でリストアップしたメモ/ノート数？（※既存の「放射線の問題」等も含む）
- [ ] ターミナルエントリセクションの存在確認（`|terminal =` がある場合のみ）
- **不一致がある場合は欠落アイテムを特定し、HTMLに追加してから次のステップに進む**

> [!IMPORTANT]
> **保護ファイル（protectedFiles）には自動リンクが適用されません。**
> 新記事を追加した際、保護ファイル（`vault_tec.html`, `buffalo-gourd-seed.html` 等）の本文中に新記事のキーワードが含まれている場合は、**手動で `<a href='...' class='auto-link'>` を追加**してください。
> 逆に、保護ファイルの記事名が他の自動生成記事に含まれている場合は、スクリプト再実行で自動的にリンクされます。

## Step 4.6: 完了前の最終コンテンツ検証（必須）

> [!CAUTION]
> **このステップを完了するまで、完了報告（notify_user）に進んではならない。**
> 過去に「ホロテープ・メモ・ターミナルエントリの全文取得を忘れたまま記事を完了報告してしまう」というミスが繰り返し発生している。
> **ビルドスクリプト実行後、X投稿素材作成後に、必ずこの最終検証を行うこと。**

### 検証手順

1. **Wikitextから参照コンテンツを再度照合する**
   - Wikitextの `==Notable loot==` セクションに列挙されたホロテープ・メモ・ノートを**全てリストアップ**する
   - Infoboxの `|terminal =` で指定されたターミナルエントリページを確認する
   - 本文の `<ref>` タグ内や `[[リンク]]` で参照されているホロテープ・メモも確認する
   - **リストアップしたアイテム数を明示的にカウントする**

2. **生成済みHTMLとの照合**
   - HTML内を検索し、リストアップした各アイテムの**全文**が記事内に存在するか確認する
   - ターミナルエントリセクションが必要な場合（`|terminal =` がある場合）、そのセクションが存在するか確認する

3. **不足分の追記**
   - 照合の結果、HTMLに含まれていないメモ・ホロテープ・ターミナルがあれば：
     1. Fandom APIで全文を取得
     2. 日本語に翻訳
     3. HTMLに `holotape-box` / `note-box` / ターミナルセクションとして追記
     4. ビルドスクリプトを再実行
   - **全件がHTMLに含まれていることを確認してから完了報告する**

### 検証チェックリスト（★必ず全項目を確認★）

- [ ] Wikitextの Notable loot セクションに列挙されたホロテープ・メモを全てリストアップしたか？
- [ ] リストアップした各アイテムの**全文**がHTML記事内に翻訳・掲載されているか？（名前だけのリストは不可）
- [ ] Infoboxの `|terminal =` にターミナルエントリがあり、ロア的に重要なエントリが記事に含まれているか？
- [ ] 本文中（`<ref>` タグ内を含む）でリンクされたメモ・ホロテープが全て取得・翻訳・掲載されているか？
- [ ] **不足がある場合、全件を追加してから完了報告するか？**

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

- 作成したHTMLファイル名（例: `lakeside-cabins.html`）
- 相互リンク反映の完了
- 生成されたX投稿ファイル (`_X/<slug>/post.md`) の場所

> [!IMPORTANT]
> **記事作成後のブラウザ確認（browser_subagent）は不要。** スクリプト実行が正常に完了した時点で作業は完了とし、ブラウザでのプレビュー確認ステップは省略すること。

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

> [!CAUTION]
> **ロケーション記事では、マップ画像（`map marker image`）の取得・配置が必須。** カテゴリが「場所」「ロケーション」「unmarked location」のいずれかに該当する記事は、以下の手順を**HTML生成前に必ず実行**すること。過去に複数回取得漏れが発生しているため、チェックを怠ってはならない。

### マップ画像の取得・配置手順（必須チェックリスト）

1. **Wikitextの `|map marker image =` フィールドを確認する**
   - Wikitext取得後、infobox内の `|map marker image =` を検索する
   - 画像ファイル名が記載されている場合は、Fandom APIでURLを取得しダウンロードする
   - `|map marker image =` が空欄またはフィールドが存在しない場合のみスキップ可

2. **ダウンロードと配置**
   - ファイル名: `img_map_marker.png` として `images/note_extracted/<slug>/` に保存する
   - 配置位置: インフォボックスのメイン画像の**直後**
   - HTML構造:
     ```html
     <img src="images/note_extracted/<slug>/img_map_marker.png" alt="マップ上の位置" style="width:100%; margin-top:5px;">
     <div style="text-align:center; font-style:italic; color:#888; font-size:0.8em; margin-bottom:10px;">マップ上の位置</div>
     ```
   - Wikitext の `|map marker =` に記載されている最寄りロケーション名もインフォボックスに記載すること

3. **HTML生成前の最終確認**（★必ず実行★）
   - [ ] Wikitextに `|map marker image =` があるか確認したか？
   - [ ] ある場合、画像をDLして `img_map_marker.png` として保存したか？
   - [ ] HTMLのインフォボックスにマップ画像を配置したか？
   - この3点を確認してからHTML生成を実行すること

- 本文中に配置するレンジャーの地図等の画像（`img_map.png`）とは別物。マップマーカー画像はゲーム内マップ上の位置を示すもの

## インフォボックスの項目ルール

- **セルID（cell name）は記載しない** — Wikiのinfoboxに `|cell name =` があっても、HTML記事のインフォボックスには含めない
- **Ref ID（refid）は記載しない** — 同様に `|refid =` も含めない
- これらはゲーム内部のデータであり、ロア記事として不要

## 関連メモ・ノート・ホロテープの内容取得ルール

> [!CAUTION]
> **Wikitextで参照されているメモ（paper note）、ホロテープ（holotape）、ノートの内容は必ず取得してHTML記事に含めること。** 過去に取得漏れが複数回発生しているため、チェックを怠ってはならない。

### 取得手順（必須チェックリスト）

1. **Wikitextの `<ref>` タグやリンクを確認する**
   - `[[メモ名]]` や `<ref>[[メモ名]]</ref>` で参照されているメモ・ノート・ホロテープを全て列挙する
   - ターミナルエントリ（`terminal entries`）は別途取得済みだが、メモ・ノートも忘れずに確認

2. **Fandom APIで各メモの内容を取得する**
   - `api.php?action=parse&page=メモ名&prop=wikitext&format=json` でTranscript部分を取得
   - `{{Transcript|text=...}}` 内のテキストが本文

3. **HTMLへの配置**
   - `note-block` クラスの `<div>` で囲み、各メモのTranscriptを翻訳して掲載する
   - ホロテープは `holotape-box` クラス、ペーパーノートは `note-block` クラスを使用
   - 配置位置: 背景セクションの後、またはレイアウトセクションの後の適切な場所

4. **HTML生成前の最終確認**（★必ず実行★）
   - [ ] Wikitextに `<ref>` や `[[リンク]]` でメモ・ノート・ホロテープが参照されているか確認したか？
   - [ ] 参照されている場合、Fandom APIで内容を取得したか？
   - [ ] HTMLに翻訳済みの内容を `note-block` / `holotape-box` で配置したか？
   - この3点を確認してからHTML生成を実行すること

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

### 固有名詞の統一翻訳ルール

以下の用語は必ず統一表記を使用すること：

| 英語 | 日本語訳 |
|------|----------|
| Overseer | 監督官 |
| Scorched | スコーチ |
| Responders | レスポンダー |
| Fire Breathers | ファイア・ブリーザー |
| first responders | ファースト・レスポンダー |
| Ash Heap | 積灰の山 |

- 「Overseer」は「オーバーシアー」ではなく**「監督官」**と訳すこと（例: Overseer's log → 監督官のログ、Overseer's cache → 監督官のキャッシュ）
- 「Scorched」は「スコーチド」ではなく**「スコーチ」**と訳すこと
- 「first responders」は「第一応答者」ではなく**「ファースト・レスポンダー」**と訳すこと
- 「Ash Heap」は「アッシュ・ヒープ」ではなく**「積灰の山」**と訳すこと

### 感想セクションの文体ルール

- **「最も」を連呼しない**。1記事の感想セクション内で「最も」は最大1回まで。表現を変えて多様性を持たせること（例: 「屈指の」「随一の」「際立った」「印象深い」「特筆すべき」など）

### ギャラリーセクションの閉じタグルール

- ギャラリーは `<div class="gallery">` で開くので、必ず `</div>` で閉じること。**絶対に `</ul>` で閉じてはならない**。
- HTML生成後にタグの開閉が正しいか検証すること。

### 後からの文字列置換ルール

- BOM付きUTF-8ファイルの文字列置換は、Node.jsの `readFileSync('utf8')` + `replace` では失敗する場合がある。必ず **`view_file` + `replace_file_content`（エディタツール）** で置換すること。
- PowerShellでの日本語文字列置換は信頼性が低いため、避けること。

### ロケーション記事のコンテンツ完全性ルール

- **ロケーション記事でも、Notable loot（注目アイテム）に列挙されたノート・ホロテープ・ターミナルエントリの全文取得・翻訳は必須**。アイテム名と入手場所だけのリストで終わらせず、「ノート」「ホロテープ」「ターミナルエントリ」セクションを別途作成し、全テキスト内容を翻訳・掲載すること。
- **HTML生成前チェック**: `注目アイテム`セクションにノート/ホロテープ/ターミナルエントリが含まれていたら、それらのFandom APIでの全文取得が完了しているか確認する。未取得のまま生成に進まないこと。
- **Infoboxの `|terminal =` フィールド**に記載があるターミナルエントリも必ずAPIで取得し、翻訳して「ターミナルエントリ」セクションとして掲載すること。

### 翻訳固定用語

以下の用語は指定された日本語訳を**必ず**使用すること。例外は認めない。

| 英語 | 日本語訳 | 備考 |
|---|---|---|
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

- 作成したHTMLファイル名（例: `lakeside-cabins.html`）
- 相互リンク反映の完了
- 生成されたX投稿ファイル (`_X/<slug>/post.md`) の場所

> [!IMPORTANT]
> **記事作成後のブラウザ確認（browser_subagent）は不要。** スクリプト実行が正常に完了した時点で作業は完了とし、ブラウザでのプレビュー確認ステップは省略すること。

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

> [!CAUTION]
> **ロケーション記事では、マップ画像（`map marker image`）の取得・配置が必須。** カテゴリが「場所」「ロケーション」「unmarked location」のいずれかに該当する記事は、以下の手順を**HTML生成前に必ず実行**すること。過去に複数回取得漏れが発生しているため、チェックを怠ってはならない。

### マップ画像の取得・配置手順（必須チェックリスト）

1. **Wikitextの `|map marker image =` フィールドを確認する**
   - Wikitext取得後、infobox内の `|map marker image =` を検索する
   - 画像ファイル名が記載されている場合は、Fandom APIでURLを取得しダウンロードする
   - `|map marker image =` が空欄またはフィールドが存在しない場合のみスキップ可

2. **ダウンロードと配置**
   - ファイル名: Wikiの元ファイル名をそのまま使用し `images/note_extracted/<slug>/` に保存する
   - 配置位置: インフォボックスのメイン画像の**直後**（キャプションdivは不要）
   - HTML構造:
     ```html
     <img src="images/note_extracted/<slug>/元のファイル名.png" alt="マップ上の位置"
         style="margin-top:-10px; object-fit: contain; height:100px;">
     ```
   - Wikitext の `|map marker =` に記載されている最寄りロケーション名もインフォボックスに記載すること

3. **HTML生成前の最終確認**（★必ず実行★）
   - [ ] Wikitextに `|map marker image =` があるか確認したか？
   - [ ] ある場合、画像をDLして `img_map_marker.png` として保存したか？
   - [ ] HTMLのインフォボックスにマップ画像を配置したか？
   - この3点を確認してからHTML生成を実行すること

- 本文中に配置するレンジャーの地図等の画像（`img_map.png`）とは別物。マップマーカー画像はゲーム内マップ上の位置を示すもの

## インフォボックスの項目ルール

- **セルID（cell name）は記載しない** — Wikiのinfoboxに `|cell name =` があっても、HTML記事のインフォボックスには含めない
- **Ref ID（refid）は記載しない** — 同様に `|refid =` も含めない
- これらはゲーム内部のデータであり、ロア記事として不要

## 関連メモ・ノート・ホロテープの内容取得ルール

> [!CAUTION]
> **Wikitextで参照されているメモ（paper note）、ホロテープ（holotape）、ノートの内容は必ず取得してHTML記事に含めること。** 過去に取得漏れが複数回発生しているため、チェックを怠ってはならない。

### 取得手順（必須チェックリスト）

1. **Wikitextの `<ref>` タグやリンクを確認する**
   - `[[メモ名]]` や `<ref>[[メモ名]]</ref>` で参照されているメモ・ノート・ホロテープを全て列挙する
   - ターミナルエントリ（`terminal entries`）は別途取得済みだが、メモ・ノートも忘れずに確認

2. **Fandom APIで各メモの内容を取得する**
   - `api.php?action=parse&page=メモ名&prop=wikitext&format=json` でTranscript部分を取得
   - `{{Transcript|text=...}}` 内のテキストが本文

3. **HTMLへの配置**
   - `note-block` クラスの `<div>` で囲み、各メモのTranscriptを翻訳して掲載する
   - ホロテープは `holotape-box` クラス、ペーパーノートは `note-block` クラスを使用
   - 配置位置: 背景セクションの後、またはレイアウトセクションの後の適切な場所

4. **HTML生成前の最終確認**（★必ず実行★）
   - [ ] Wikitextに `<ref>` や `[[リンク]]` でメモ・ノート・ホロテープが参照されているか確認したか？
   - [ ] 参照されている場合、Fandom APIで内容を取得したか？
   - [ ] HTMLに翻訳済みの内容を `note-block` / `holotape-box` で配置したか？
   - この3点を確認してからHTML生成を実行すること

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

### 固有名詞の統一翻訳ルール

以下の用語は必ず統一表記を使用すること：

| 英語 | 日本語訳 |
|------|----------|
| Overseer | 監督官 |
| Scorched | スコーチ |
| Responders | レスポンダー |
| Fire Breathers | ファイア・ブリーザー |
| first responders | ファースト・レスポンダー |
| Ash Heap | 積灰の山 |

- 「Overseer」は「オーバーシアー」ではなく**「監督官」**と訳すこと（例: Overseer's log → 監督官のログ、Overseer's cache → 監督官のキャッシュ）
- 「Scorched」は「スコーチド」ではなく**「スコーチ」**と訳すこと
- 「first responders」は「第一応答者」ではなく**「ファースト・レスポンダー」**と訳すこと
- 「Ash Heap」は「アッシュ・ヒープ」ではなく**「積灰の山」**と訳すこと

### 感想セクションの文体ルール

- **「最も」を連呼しない**。1記事の感想セクション内で「最も」は最大1回まで。表現を変えて多様性を持たせること（例: 「屈指の」「随一の」「際立った」「印象深い」「特筆すべき」など）

### ギャラリーセクションの閉じタグルール

- ギャラリーは `<div class="gallery">` で開くので、必ず `</div>` で閉じること。**絶対に `</ul>` で閉じてはならない**。
- HTML生成後にタグの開閉が正しいか検証すること。

### 後からの文字列置換ルール

- BOM付きUTF-8ファイルの文字列置換は、Node.jsの `readFileSync('utf8')` + `replace` では失敗する場合がある。必ず **`view_file` + `replace_file_content`（エディタツール）** で置換すること。
- PowerShellでの日本語文字列置換は信頼性が低いため、避けること。

### ロケーション記事のコンテンツ完全性ルール

- **ロケーション記事でも、Notable loot（注目アイテム）に列挙されたノート・ホロテープ・ターミナルエントリの全文取得・翻訳は必須**。アイテム名と入手場所だけのリストで終わらせず、「ノート」「ホロテープ」「ターミナルエントリ」セクションを別途作成し、全テキスト内容を翻訳・掲載すること。
- **HTML生成前チェック**: `注目アイテム`セクションにノート/ホロテープ/ターミナルエントリが含まれていたら、それらのFandom APIでの全文取得が完了しているか確認する。未取得のまま生成に進まないこと。
- **Infoboxの `|terminal =` フィールド**に記載があるターミナルエントリも必ずAPIで取得し、翻訳して「ターミナルエントリ」セクションとして掲載すること。

### 翻訳固定用語

以下の用語は指定された日本語訳を**必ず**使用すること。例外は認めない。

| 英語 | 日本語訳 | 備考 |
|---|---|---|
| Scorched | スコーチ | ×スコーチド |
| Chemistry station | ケミストリーステーション | ×薬品作業台 |
| Kanawha | カナー | ×カナワ |
| New River | ニューリバー | ×ニュー川 |

### 画像レイアウトのルール

- **画像は必ず行間に配置する（ブロック要素）**。テキストの左右に画像を回り込ませるレイアウト（`float`等）は、レスポンシブ表示やターミナルUIの視認性を損なうため**一切禁止**する。
- **HTML構造**: 画像は必ず独立した `article-image` クラスを持つ `<img>` タグ、または `note-figure` クラスを持つ `<div>` で囲み、前後の段落（`<p>`）の間に配置すること。
- **CSS仕様**: 画像は `display: block; margin: 30px auto; max-width: 100%;` を基本とし、中央揃えで配置する。
- **例外**: インフォボックス（`.infobox`）内のメイン画像およびマップ画像のみ、指定の場所への配置を許可する。記事本文中では例外なく行間配置を徹底すること。

### 記事作成後の確認

- **記事作成後にブラウザでの表示確認は不要**。HTMLの構造検証（`</html>`, `</body>`, `</main>` の数の確認等）のみ行えばよい。ローカルサーバーを起動してのブラウザプレビューやスクリーンショット撮影は行わないこと。
