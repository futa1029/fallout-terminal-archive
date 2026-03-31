const fs = require('fs');

const forestDrafts = JSON.parse(fs.readFileSync('drafts_forest.json', 'utf8'));
const nextBatch = forestDrafts.slice(0, 5);

let taskContent = `# 森林地帯（The Forest）翻訳品質改善タスク

## 進行中
- \`[/]\` ロケーション: Draft修正グループ2（5件）
${nextBatch.map(d => `  - \`[ ]\` ${d.title} (\`${d.slug}.html\`)`).join('\n')}

## 待機中
- \`[ ]\` ロケーション Draft残り（全${forestDrafts.length - 5}件）
- \`[ ]\` 人物 Draft記事（森林地帯関連から順次対応）
`;

fs.writeFileSync('C:\\Users\\futa1\\.gemini\\antigravity\\brain\\2277f4ed-4cb9-4917-a279-480896e08aaf\\task.md', taskContent, 'utf8');
console.log('Task updated.');
