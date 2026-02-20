const https = require('https');
const fs = require('fs');
const path = require('path');

const SAVE_DIR = 'f:\\Fallout';
const DATA_FILE = path.join(SAVE_DIR, 'note_articles_data.json');

async function fetchAllArticles() {
    console.log('Fetching note articles for futaiwamoto...');
    let articles = [];
    let page = 1;
    let hasMore = true;

    // 1. 記事リストの取得
    while (hasMore) {
        const url = `https://note.com/api/v2/creators/futaiwamoto/contents?kind=note&page=${page}`;

        try {
            const data = await new Promise((resolve, reject) => {
                https.get(url, (res) => {
                    let body = '';
                    res.on('data', chunk => body += chunk);
                    res.on('end', () => resolve(JSON.parse(body)));
                }).on('error', reject);
            });

            if (data && data.data && data.data.contents && data.data.contents.length > 0) {
                data.data.contents.forEach(item => {
                    articles.push({
                        title: item.name,
                        key: item.key,
                        date: item.publishAt,
                        likeCount: item.likeCount,
                        coverImage: item.eyecatch, // サムネイルなどに使うかも
                        bodyHtml: null // あとで埋める
                    });
                });
                console.log(`Fetched page ${page} (${data.data.contents.length} articles)`);
                page++;
            } else {
                hasMore = false;
            }
        } catch (e) {
            console.error('Error fetching list:', e);
            hasMore = false;
        }
    }

    console.log(`\nTotal articles found: ${articles.length}`);
    console.log('Fetching body contents for each article...');

    // 2. 各記事の本文(HTML)を取得
    // note.com/api/v3/notes/[key] で本文が取れることが多い
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        console.log(`[${i + 1}/${articles.length}] Fetching body: ${article.title}`);

        const noteUrl = `https://note.com/api/v3/notes/${article.key}`;

        try {
            const detailData = await new Promise((resolve, reject) => {
                https.get(noteUrl, (res) => {
                    let body = '';
                    res.on('data', chunk => body += chunk);
                    res.on('end', () => {
                        try {
                            resolve(JSON.parse(body));
                        } catch (e) {
                            reject(e);
                        }
                    });
                }).on('error', reject);
            });

            if (detailData && detailData.data && detailData.data.body) {
                article.bodyHtml = detailData.data.body;
            } else {
                console.log(`  -> Could not parse body for ${article.key}`);
            }
        } catch (e) {
            console.error(`  -> Failed to fetch ${article.key}`, e.message);
        }

        // API制限を避けるため少し待機
        await new Promise(r => setTimeout(r, 500));
    }

    // 全データをJSONとして保存
    fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2));
    console.log(`\nSaved all article data to ${DATA_FILE}`);
}

fetchAllArticles();
