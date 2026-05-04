const fs = require('fs');
const file = 'f:/Fallout/.agents/skills/article_writer/SKILL.md';
let content = fs.readFileSync(file, 'utf8');

const target1 = '- **内容の言い換え・要約・省略・追加は一切禁止**。HTMLページの本文と**完全に同一の文章**をそのまま転記し、X投稿フォーマット（改行・---）だけを付加する';
const target2 = '- **セクション構成**：HTMLページの全セクションをすべて記載。一つも省かない';

const replacement1 = '- **内容の言い換え・要約・省略・追加は一切禁止（厳格に遵守）**。HTMLページの本文と**完全に同一の文章**をそのまま転記し、X投稿フォーマット（改行・---）だけを付加すること。「紹介文」として短くまとめたり、一部のセクションや詳細を削ったりすることは、記事の熱量を損なうため絶対に行ってはならない。';
const replacement2 = '- **セクション構成**：HTMLページの全セクションをすべて記載。一つも省かない。ホロテープやメモ、ターミナルエントリの引用ブロックもすべてそのままの文章で転記すること。';

if (content.includes(target1) && content.includes(target2)) {
    content = content.replace(target1, replacement1);
    content = content.replace(target2, replacement2);
    fs.writeFileSync(file, content, 'utf8');
    console.log('SKILL.md rules reinforced.');
} else {
    // 曖昧一致を試みる
    console.log('Direct match failed, trying fuzzy match...');
    const lines = content.split('\n');
    let found = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('内容の言い換え・要約・省略・追加は一切禁止')) {
            lines[i] = '    ' + replacement1;
            if (lines[i+1] && lines[i+1].includes('セクション構成')) {
                lines[i+1] = '    ' + replacement2;
            }
            found = true;
            break;
        }
    }
    if (found) {
        fs.writeFileSync(file, lines.join('\n'), 'utf8');
        console.log('SKILL.md rules reinforced (fuzzy).');
    } else {
        console.error('Could not find the target rules in SKILL.md');
    }
}
