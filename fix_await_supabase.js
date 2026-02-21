/**
 * fix_await_supabase.js
 * `await supabase` (複数行にまたがる参照) を `await supabaseClient` に修正する。
 * \bsupabase\.from\b の正規表現で検出できなかった改行を挟む参照への対応。
 */
const fs = require('fs');
const path = require('path');
const dir = 'f:\\Fallout';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;

for (const file of files) {
    const fp = path.join(dir, file);
    const html = fs.readFileSync(fp, 'utf8');
    // "await supabase" で始まる部分 (改行を挟む .from(...) への参照 含む)
    // ただし "await supabaseClient" は除外
    if (!html.includes('await supabase\n') && !html.includes('await supabase\r\n') && !html.includes('await supabase.')) {
        continue;
    }
    const fixed = html
        // 改行ありパターン (CRLF)
        .replace(/await supabase\r\n/g, 'await supabaseClient\r\n')
        // 改行ありパターン (LF)
        .replace(/await supabase\n/g, 'await supabaseClient\n')
        // 同一行に続くパターン (await supabase.from など)
        .replace(/await supabase\./g, 'await supabaseClient.');
    if (fixed !== html) {
        fs.writeFileSync(fp, fixed, 'utf8');
        count++;
        console.log('[修正] ' + file);
    }
}
console.log('完了: ' + count + '件');
