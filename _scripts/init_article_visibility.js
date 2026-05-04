/**
 * Supabase article_visibility テーブルに初期データを投入するスクリプト
 * 現在の公開状態（229件公開）をデータベースに反映する
 */
const fs = require('fs');

const SUPABASE_URL = 'https://qkdjufvdeisnunismgaw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';

async function main() {
    // lore.html から全エントリを取得
    const content = fs.readFileSync('f:/Fallout/lore.html', 'utf8');
    const match = content.match(/const loreEntries = \[([\s\S]*?)\];/);
    const fn = new Function('return [' + match[1] + '];');
    const entries = fn();

    console.log(`全エントリ数: ${entries.length}`);

    // 全エントリの公開状態をテーブルに投入
    const rows = entries.map(e => ({
        url: e.url,
        is_published: !e.isDraft  // isDraftがない/falseなら公開
    }));

    const published = rows.filter(r => r.is_published).length;
    const draft = rows.filter(r => !r.is_published).length;
    console.log(`公開: ${published}件, 非公開: ${draft}件`);

    // 100件ずつバッチ投入（upsert）
    const BATCH_SIZE = 100;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(rows.length / BATCH_SIZE);

        const res = await fetch(`${SUPABASE_URL}/rest/v1/article_visibility`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates,return=minimal'
            },
            body: JSON.stringify(batch)
        });

        if (res.ok) {
            successCount += batch.length;
            console.log(`バッチ ${batchNum}/${totalBatches}: ${batch.length}件 OK`);
        } else {
            const errText = await res.text();
            errorCount += batch.length;
            console.error(`バッチ ${batchNum}/${totalBatches}: エラー - ${res.status} ${errText}`);
        }
    }

    console.log(`\n完了: 成功=${successCount}, 失敗=${errorCount}`);
}

main().catch(console.error);
