/**
 * Brotherhood of Steel 完全版HTML生成スクリプト
 * セクション別コンテンツモジュールを統合してHTML出力する
 */
const fs = require('fs');
const path = require('path');

// コンテンツモジュールを読み込み
const contentDir = path.join(__dirname, 'bos_content');
const modules = [
  'background',
  'society_p1',
  'society_p2',
  'society_p3',
  'divisions',
  'foreign_relations',
  'technology',
  'notes_behind',
  'gallery'
];

// 各モジュールからHTMLを取得
let contentHTML = '';
for (const mod of modules) {
  const modPath = path.join(contentDir, mod + '.js');
  if (fs.existsSync(modPath)) {
    const section = require(modPath);
    contentHTML += section.html + '\n\n';
    console.log(`  [OK] ${mod}: ${section.html.length} chars`);
  } else {
    console.log(`  [SKIP] ${mod}: ファイル未作成`);
  }
}

// HTMLテンプレートを読み込んで組み立て
const templatePath = path.join(__dirname, 'bos_template.html');
const template = fs.readFileSync(templatePath, 'utf8');
const output = template.replace('<!-- CONTENT_PLACEHOLDER -->', contentHTML);

const outputPath = path.join(__dirname, '..', 'brotherhood-of-steel.html');
// バックアップ
const backupPath = outputPath + '.bak';
if (fs.existsSync(outputPath)) {
  fs.copyFileSync(outputPath, backupPath);
  console.log(`バックアップ: ${backupPath}`);
}
fs.writeFileSync(outputPath, output, 'utf8');
console.log(`\n出力完了: ${output.length} chars -> ${outputPath}`);
console.log(`行数: ${output.split('\n').length}`);
