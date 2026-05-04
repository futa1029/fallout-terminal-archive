const fs = require('fs');
const file = 'f:/Fallout/.agents/skills/article_writer/SKILL.md';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// 30行目から100行目付近を再構築
const head = lines.slice(0, 29);
const tail = lines.slice(75); // 75行目以降は「ホロテープ・メモ...」

const restoredSection = [
    '',
    '- **ギャラリー画像のキャプション（`.caption`）と `alt` 属性は必ず日本語に翻訳すること**。英語のままにしてはならない。翻訳は「Vault 12：ドアが正常に閉まらない設計で放射線を人体に照射する実験Vault」のように「Vault番号：説明」の形式で記述する。',
    '- **X投稿用の画像は4枚まで**。ダウンロードした全画像の中から、記事の内容が最も伝わりやすいと判断した**印象的な4枚**を厳選して `_X/<slug>/images/` に格納する',
    '- 本文中で使わなかった画像はページ下部の**GALLERYセクション**に、元のWikiと同じカテゴリ分け（作品別等）で追加する',
    '- **英語原文のカッコ書きは残さない**。本文中でも見出し（h1/h2/h3）では、英語のカッコ書きは一切使わないこと。例：',
    '  - 本文: 「仲間(Allies)」→「仲間」、「C.A.M.P.ペット(C.A.M.P. pets)」→「C.A.M.P.ペット」',
    '  - 見出し: 「概要（Background）」→「概要」、「起源（Origins）」→「起源」、「バッド・アスキンス（Bud Askins）」→「バッド・アスキンス」',
    '  - HTMLの記事本文・見出し・X投稿のすべてに適用する',
    '- **「。」の後に文が続く場合は改行する**。HTML本文では `。<br>` とし、一文ごとに改行して日本語を見やすく配置すること。段落末尾（`</p>` や `</li>` の直前）では不要',
    '- **場所名・地名は日本語に翻訳する**。Wikiに登場する地名・ロケーション名は可能な限り日本語に翻訳すること。例：「Charleston」→「チャールストン」、「Morgantown」→「モーガンタウン」、「The Forest」→「森林地帯」、「Cranberry Bog」→「クランベリー湿原」、「Harpers Ferry」→「ハーパーズ・フェリー」',
    '- **固有名詞の統一翻訳テーブル**。以下の用語は記事全体で統一して日本語表記を使用すること：',
    '',
    '  | 英語 | 日本語 |',
    '  |---|---|',
    '  | West Tek | West Tek（※「ウエストイーク」はNG） |',
    '  | Scorched Plague | スコーチ病 |',
    '  | Scorchbeast | スコーチビースト |',
    '  | Scorched | スコーチ |',
    '  | Great War | 大戦 |',
    '  | Wasteland | ウエイストランド |',
    '  | Brotherhood of Steel | ブラザーフッド・オブ・スティール（B.O.S.） |',
    '  | Responders | レスポンダーズ |',
    '  | Free States | フリー・ステイツ |',
    '  | Settlers | 入植者 |',
    '  | Raiders | レイダー |',
    '  | Enclave | エンクレイヴ |',
    '  | Super mutant | スーパーミュータント |',
    '  | Feral ghoul | フェラル・グール |',
    '  | The Forest | 森林地帯 |',
    '  | Ash Heap | 積灰の山 |',
    '  | Toxic Valley | 毒の峡谷 |',
    '  | Savage Divide | 荒れた境域 |',
    '  | The Mire | 沼地地帯 |',
    '  | Cranberry Bog | クランベリー湿原 |',
    '  | Skyline Valley | スカイライン・バレー |',
    '  | Burning Springs | バーニング・スプリングス |',
    '  | Watoga | ワトガ |',
    '  | Kanawha | カナー |',
    '  | Fort Atlas | アトラス砦 |',
    '  | Whitespring Resort | ホワイトスプリング・リゾート |',
    '  | Mount Blair | ブレア山 |',
    '  | Grafton Steel | グラフトン鉄鋼 |',
    '  | Top of the World | 世界の頂上 |',
    '  | Snallygaster | スナリーギャスター |',
    '  | Ally / Lite ally | 同居人 |',
    '  | Gold bullion | 金塊 |',
    '  | Overseer | 監督官（※「オーバーシアー」はNG） |',
    '  | Hornwright summer villa | ホーンライト夏の別荘 |',
    '  | Kanawha | カナー（※「カナワ」はNG） |',
    '  | Chemistry station | ケミストリーステーション（※「薬品作業台」はNG） |',
    '  | Cave cricket | カマドウマ（※「洞窟コオロギ」はNG） |',
    '  | Starlight creeper | スターライト・ベリー（※「スターライト・クリーパー」はNG） |',
    '  | Fever blossom | 熱の花（※「フィーバーブロッサム」はNG） |',
    '  | Owlet | フクロウ（※「アウレット」はNG） |',
    '  | Order of Mysteries | オーダーオブミステリー（※「ミステリーの騎士団」はNG） |',
    '  | Ash Heap | 積灰の山（※「アッシュ・ヒープ」はNG） |',
    '  | Vertibird | ベルチバード（※「バーティバード」はNG） |',
    '  | Serum | 設計図（※「セラム」はNG） |',
    ''
];

const finalContent = head.join('\n') + restoredSection.join('\n') + tail.join('\n');
fs.writeFileSync(file, finalContent, 'utf8');
console.log('SKILL.md successfully restored and West Tek rule applied.');
