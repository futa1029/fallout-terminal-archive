const fs = require('fs');
const path = require('path');

const dir = 'f:\\Fallout';
// 処理対象のファイルリスト（lore.html自身やindex.htmlは除く）
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

const cssToInject = `
        /* Action Header */
        .action-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .action-header .back-link {
            margin-bottom: 0;
        }

        .like-button {
            background: transparent;
            border: 1px solid var(--accent-color);
            color: var(--accent-color);
            padding: 5px 15px;
            font-size: 1.1em;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: 'Share Tech Mono', monospace;
            transition: all 0.2s;
            border-radius: 4px;
        }

        .like-button:hover {
            box-shadow: 0 0 8px var(--accent-color);
        }

        .like-button.liked {
            background: var(--accent-color);
            color: var(--bg-color);
        }

        @media (max-width: 768px) {
            .like-button {
                padding: 10px 15px;
                font-size: 1em;
            }
        }
    </style>`;

const jsToInject = `
    <script>
        function toggleLike(btn) {
            const articleId = btn.getAttribute('data-article-id');
            let isLiked = localStorage.getItem(articleId + '_liked') === 'true';
            let count = parseInt(localStorage.getItem(articleId + '_count') || '0', 10);

            if (isLiked) {
                isLiked = false;
                count = Math.max(0, count - 1);
            } else {
                isLiked = true;
                count++;
            }

            localStorage.setItem(articleId + '_liked', isLiked);
            localStorage.setItem(articleId + '_count', count);
            updateLikeButton(btn, isLiked, count);
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

        document.addEventListener('DOMContentLoaded', () => {
            const btn = document.querySelector('.like-button');
            if (btn) {
                const articleId = btn.getAttribute('data-article-id');
                // 初期値のランダム設定（初回のみ）
                let countStr = localStorage.getItem(articleId + '_count');
                if (!countStr) {
                    let initialLikes = Math.floor(Math.random() * 80) + 12; 
                    localStorage.setItem(articleId + '_count', initialLikes);
                    countStr = initialLikes.toString();
                }
                const count = parseInt(countStr, 10);
                const isLiked = localStorage.getItem(articleId + '_liked') === 'true';
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
    if (content.includes('like-button')) {
        console.log('Already processed ' + file);
        return;
    }

    const articleId = file.replace('.html', '');

    // CSSの挿入
    content = content.replace('    </style>', cssToInject);

    // HTMLの挿入 (Back link部分を置換)
    const htmlRegex = /<main class="content">\s*<a href="([^"]+)" class="back-link">\s*<\s*BACK TO TERMINAL\s*<\/a>/;

    // vault_dweller_jp.html と wayward_jp.html は back-link の構造が少し違う可能性があるため、フォールバックも用意
    // kimball.html等の形式:
    // <main class="content">
    //     <a href="lore.html" class="back-link">
    //         < BACK TO TERMINAL</a>

    const match = content.match(htmlRegex);
    if (match) {
        const backLinkHref = match[1];
        const replacementHtml = `<main class="content">
            <div class="action-header">
                <a href="${backLinkHref}" class="back-link">
                    < BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>`;
        content = content.replace(htmlRegex, replacementHtml);
    } else {
        console.log('Warning: back-link format did not match in ' + file);
    }

    // JSの挿入
    content = content.replace('</body>', jsToInject);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed ' + file);
});
