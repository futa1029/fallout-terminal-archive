const fs = require('fs');
const path = require('path');

const dir = 'f:\\Fallout';
// 処理対象のファイル
const files = [
    'kimball.html',
    'tandi.html',
    'raiders_76.html',
    'blight.html',
    'ncr.html',
    'prize_bot.html',
    'assaultron_head.html',
    'lee_moldaver.html',
    'vault_dweller_lore.html',
    'vault_dweller_jp.html',
    'wayward_jp.html'
];

// ユーザーから提供されたSupabaseの情報
const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co';
const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';

const newScriptBlock = `    <!-- Supabase CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script>
        const supabaseUrl = '${supabaseUrl}';
        const supabaseKey = '${supabaseKey}';
        const supabase = supabase.createClient(supabaseUrl, supabaseKey);

        async function toggleLike(btn) {
            const articleId = btn.getAttribute('data-article-id');
            // ローカルには自分が「押したかどうか(true/false)」だけを記録
            let isLiked = localStorage.getItem(articleId + '_liked') === 'true';

            // ボタン連打防止のため一時的に無効化
            btn.disabled = true;

            if (isLiked) {
                // いいね解除 (-1)
                isLiked = false;
                const { data, error } = await supabase.rpc('decrement_like', { article_id_param: articleId });
                if (!error) {
                    localStorage.setItem(articleId + '_liked', isLiked);
                    updateLikeButton(btn, isLiked, data);
                } else {
                    console.error('Error decrementing:', error);
                }
            } else {
                // いいね！ (+1)
                isLiked = true;
                const { data, error } = await supabase.rpc('increment_like', { article_id_param: articleId });
                if (!error) {
                    localStorage.setItem(articleId + '_liked', isLiked);
                    updateLikeButton(btn, isLiked, data);
                } else {
                    console.error('Error incrementing:', error);
                }
            }
            
            btn.disabled = false;
        }

        function updateLikeButton(btn, isLiked, count) {
            const heart = btn.querySelector('.heart');
            const countSpan = btn.querySelector('.like-count');
            
            if (isLiked) {
                btn.classList.add('liked');
                heart.textContent = '♥';
            } else {
                btn.classList.remove('liked');
                heart.textContent = '♡';
            }
            countSpan.textContent = count;
        }

        // ページ読み込み時にデータベースから現在の総いいね数を取得して表示
        document.addEventListener('DOMContentLoaded', async () => {
            const btn = document.querySelector('.like-button');
            if (btn) {
                const articleId = btn.getAttribute('data-article-id');
                const isLiked = localStorage.getItem(articleId + '_liked') === 'true';

                // DBから現在のカウントを取得
                const { data, error } = await supabase
                    .from('likes')
                    .select('like_count')
                    .eq('article_id', articleId)
                    .single();

                let count = 0;
                if (!error && data) {
                    count = data.like_count;
                } else if (error && error.code === 'PGRST116') {
                    // まだ誰もいいねしていない（行がない）場合
                    count = 0;
                }

                updateLikeButton(btn, isLiked, count);
            }
        });
    </script>
</body>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
        console.log('Skipping ' + file + ' (not found)');
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 既存の <script> ... </script></body> の部分を取り除く
    const scriptStartRegex = /<script>\s*function toggleLike[\s\S]*?<\/script>\s*<\/body>/;

    if (scriptStartRegex.test(content)) {
        content = content.replace(scriptStartRegex, newScriptBlock);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated to Supabase in: ' + file);
    } else {
        console.log('Script block not found in: ' + file);
    }
});
