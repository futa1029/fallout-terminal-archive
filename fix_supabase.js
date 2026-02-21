/**
 * fix_supabase.js
 * 全HTMLファイルの Supabase 変数名衝突バグを UTF-8を保ちながら修正する。
 * 修正内容: `const supabase = supabase.createClient(...)` 
 *        -> `const supabase = window.supabase.createClient(...)`
 */
const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));

let fixedCount = 0;
let skippedCount = 0;

for (const file of files) {
    const filePath = path.join(DIR, file);
    // UTF-8で読み込む
    const html = fs.readFileSync(filePath, 'utf8');

    if (!html.includes('const supabase = supabase.createClient')) {
        skippedCount++;
        continue;
    }

    // window.supabase.createClient に修正
    const fixed = html.replace(
        /const supabase = supabase\.createClient/g,
        'const supabase = window.supabase.createClient'
    );

    // UTF-8で書き戻す
    fs.writeFileSync(filePath, fixed, 'utf8');
    fixedCount++;
    console.log(`[修正] ${file}`);
}

console.log(`\n完了: ${fixedCount}件修正、${skippedCount}件スキップ`);
