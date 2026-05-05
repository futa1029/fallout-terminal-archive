const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qkdjufvdeisnunismgaw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function updateVisibility() {
    console.log('Updating visibility for aaron-kimball.html...');
    
    // upsert を試みる（もし許可されていれば）
    const { data, error } = await supabase
        .from('article_visibility')
        .upsert({ url: 'aaron-kimball.html', is_published: true }, { onConflict: 'url' });

    if (error) {
        console.error('Error updating visibility:', error);
        
        // もし upsert が権限不足なら、単に確認するだけ（または管理者キーが必要）
        // しかし、Anon Key でも RLS 設定によっては可能な場合がある
    } else {
        console.log('Successfully updated visibility:', data);
    }
}

updateVisibility();
