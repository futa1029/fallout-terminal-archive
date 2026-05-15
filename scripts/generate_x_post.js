/**
 * Fallout Lore Archive - X Post Generator (Stealth Boy Parity)
 */

const fs = require('fs');
const path = require('path');

function generateXPost(articlePath) {
    const htmlContent = fs.readFileSync(articlePath, 'utf8');
    const slug = path.basename(articlePath, '.html');
    const xDir = path.join(path.dirname(articlePath), '_X', slug);

    if (!fs.existsSync(xDir)) {
        fs.mkdirSync(xDir, { recursive: true });
    }

    // 1. 本文抽出
    const bodyMatch = htmlContent.match(/<main class="content">([\s\S]*?)<\/main>/);
    if (!bodyMatch) return;
    let rawBody = bodyMatch[1];

    // 2. 著作権表示の取得
    let copyright = "";
    const copyrightMatch = htmlContent.match(/This article was created by[\s\S]*?CC BY-SA 3.0/i);
    if (copyrightMatch) {
        copyright = copyrightMatch[0].replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
    }

    // 3. 感想セクションの抽出 (最後のquote-box)
    const quoteBoxes = rawBody.match(/<div class="quote-box">([\s\S]*?)<\/div>/gi);
    let finalQuote = "";
    if (quoteBoxes && quoteBoxes.length > 0) {
        finalQuote = quoteBoxes[quoteBoxes.length - 1].replace(/<[^>]*>?/gm, '').trim();
    }

    // 4. 本文の整形用クリーンアップ
    let body = rawBody;
    body = body.replace(/<img[^>]*>/gi, '');
    body = body.replace(/<div class="action-header"[\s\S]*?<\/div>/g, '');
    body = body.replace(/<h2 id="gallery">[\s\S]*?<div class="gallery">[\s\S]*?<\/div>/gi, '');
    body = body.replace(/<div class="comments-section"[\s\S]*$/g, '');
    body = body.replace(/<script[\s\S]*$/g, '');
    body = body.replace(/<div style="margin-top: 30px;[\s\S]*?<\/div>/g, '');

    // 5. パーツの分割
    let intro = body.match(/^[\s\S]*?(?=<h2)/i)?.[0] || "";
    let mainContent = body.match(/<h2[\s\S]*/i)?.[0] || "";

    const clean = (text) => {
        let t = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n---\n\n$1\n\n');
        t = t.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n$1\n\n');
        t = t.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n■ $1\n\n');
        t = t.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
        t = t.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '・$1\n');
        t = t.replace(/<br\s*\/?>/gi, '\n');
        t = t.replace(/<[^>]*>?/gm, '');
        
        const trash = [
            '< BACK TO TERMINAL', '♡ 0', '♥ 0', 
            'コミュニティ維持のため、寄付を受け付けております。', 
            'SUBMIT >', 'LOADING...',
            'This article was created by translating and editing',
            'バーブにキスをするクーパー',
            'アラスカ戦線でT-45パワーアーマーを着たクーパー',
            'アラスカ戦線で中国人民解放軍の兵士と対峙するクーパー',
            'クーパーの象徴的な「親指を立てる」ポーズ',
            '打ち上げパーティーでアスキンスをあしらうクーパー',
            'Vault-TecがVaultへの犬の同伴を許可しないことに苛立つクーパー',
            '若いベティ・ピアソンに部屋へ案内されるクーパー',
            '大戦争の日、ジェイニーを連れて逃げるクーパー',
            'Vault 76の外にいるグール'
        ];
        trash.forEach(term => t = t.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), ''));
        
        return t.split('\n').map(l => l.trim()).join('\n').replace(/\n{3,}/g, '\n\n').trim();
    };

    let cleanIntro = clean(intro);
    let cleanMain = clean(mainContent);
    let cleanQuote = clean(finalQuote).replace(/^(Geminiアノテーション|Geminiの感想|感想)\n+/i, '');

    // 6. 組み立て
    // タグの修正: #FalloutOnPrime #FalloutTV
    let categoryTag = "#Falloutシリーズ";
    if (htmlContent.includes('Fallout TV') || htmlContent.includes('TVシリーズ')) {
        categoryTag = "#FalloutOnPrime #FalloutTV";
    }

    const title = htmlContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1].replace(/<[^>]*>?/gm, '').trim() || slug;
    const url = `https://www.fallout-jp.com/${slug}.html`;

    const finalPost = `${categoryTag}

${title}
${url}

概要

${cleanIntro}

${cleanMain}

---

💭 感想

${cleanQuote}

---

${copyright}`;

    fs.writeFileSync(path.join(xDir, 'post.md'), finalPost);
    console.log(`Generated: ${path.join(xDir, 'post.md')}`);
}

const target = process.argv[2];
if (target) generateXPost(target);
