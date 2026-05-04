const fs = require('fs');
const file = 'f:/Fallout/.agents/skills/article_writer/SKILL.md';
let content = fs.readFileSync(file, 'utf8');

const tableStart = '- **固有名詞の統一翻訳テーブル**。以下の用語は記事全体で統一して日本語表記を使用すること：';
const tableEnd = '- **ホロテープ・メモ・ターミナルエントリの引用ルール**';

const correctTable = `
- **固有名詞の統一翻訳テーブル**。以下の用語は記事全体で統一して日本語表記を使用すること：

  | 英語 | 日本語 |
  |---|---|
  | West Tek | West Tek（※「ウエストイーク」はNG） |
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
  | Order of Mysteries | オーダーオブミステリー（※「ミステリーの騎士団」はNG） |
  | Ash Heap | 積灰の山（※「アッシュ・ヒープ」はNG） |
  | Vertibird | ベルチバード（※「バーティバード」はNG） |
  | Serum | 設計図（※「セラム」はNG） |

`;

// 壊れた箇所を特定して置換
const startIndex = content.indexOf(tableStart);
const endIndex = content.indexOf(tableEnd);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + correctTable + content.substring(endIndex);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('SKILL.md repaired and West Tek rule added.');
} else {
    console.error('Could not find table boundaries.');
}
