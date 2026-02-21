/**
 * fix_supabase_rename.js
 * 全HTMLファイルで、`const supabase = ...createClient(...)` という宣言と
 * 後続のすべての `supabase.rpc(...)` / `supabase.from(...)` 参照を
 * `supabaseClient` 変数名にリネームする。
 * CDNグローバル `supabase` との名前衝突によるサイレントTDZエラーを解消するため。
 */
const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));

let fixedCount = 0;
let skippedCount = 0;

for (const file of files) {
    const filePath = path.join(DIR, file);
    const html = fs.readFileSync(filePath, 'utf8');

    // 既に supabaseClient 変数名を使っている場合はスキップ
    // (generate_notes_html.jsで生成されたファイルはすでに正しい)
    if (!html.includes('const supabase = ') && !html.includes('const supabase=')) {
        skippedCount++;
        continue;
    }

    let fixed = html;

    // 1. 変数宣言を修正:
    //    const supabase = window.supabase.createClient(...)
    //    -> const supabaseClient = window.supabase.createClient(...)
    fixed = fixed.replace(
        /const supabase = (window\.supabase|supabase)\.createClient\(/g,
        'const supabaseClient = window.supabase.createClient('
    );

    // 2. その後の supabase.rpc(...) / supabase.from(...) を supabaseClient に置換
    //    ただし window.supabase.createClient は除外（すでに処理済み）
    //    また CDN の script src や og:description 内の文字列 "supabase" は除外
    fixed = fixed.replace(/\bsupabase\.(rpc|from|auth|storage)\b/g, 'supabaseClient.$1');

    if (fixed !== html) {
        fs.writeFileSync(filePath, fixed, 'utf8');
        fixedCount++;
        console.log(`[修正] ${file}`);
    } else {
        skippedCount++;
    }
}

console.log(`\n完了: ${fixedCount}件修正、${skippedCount}件スキップ`);
