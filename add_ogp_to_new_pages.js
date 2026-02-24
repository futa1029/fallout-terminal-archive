/**
 * add_ogp_to_new_pages.js
 * 新ページ（about/rules/resources/changelog）にOGP・Twitter Card・canonicalを追加する
 */

const fs = require('fs');

const pages = [
    {
        file: 'about.html',
        url: 'https://www.fallout-jp.com/about.html',
        title: 'About | Fallout JP Community',
        description: 'Fallout JP Communityのサイト紹介。運営者・コンテンツ方針・参加コミュニティについて。'
    },
    {
        file: 'rules.html',
        url: 'https://www.fallout-jp.com/rules.html',
        title: 'Rules | Fallout JP Community',
        description: 'Fallout JP Communityのコメントルール・利用規約・禁止事項・著作権表示。'
    },
    {
        file: 'resources.html',
        url: 'https://www.fallout-jp.com/resources.html',
        title: 'Resources | Fallout JP Community',
        description: 'Falloutプレイヤー向け外部リソースリンク集。公式サイト・Wiki・ビルドツール・マップ・コミュニティ。'
    },
    {
        file: 'changelog.html',
        url: 'https://www.fallout-jp.com/changelog.html',
        title: 'Changelog | Fallout JP Community',
        description: 'Fallout JP ロア・アーカイブの更新履歴・新着記事一覧。日付順で全記事をタイムライン表示。'
    }
];

function buildOgp(p) {
    return [
        '    <link rel="canonical" href="' + p.url + '">',
        '    <!-- OGP -->',
        '    <meta property="og:type" content="website">',
        '    <meta property="og:url" content="' + p.url + '">',
        '    <meta property="og:title" content="' + p.title + '">',
        '    <meta property="og:description" content="' + p.description + '">',
        '    <meta property="og:image" content="https://www.fallout-jp.com/images/og-image.png">',
        '    <meta property="og:locale" content="ja_JP">',
        '    <meta property="og:site_name" content="Fallout JP Community">',
        '    <!-- Twitter Card -->',
        '    <meta name="twitter:card" content="summary_large_image">',
        '    <meta name="twitter:site" content="@IwamotoFuta">',
        '    <meta name="twitter:title" content="' + p.title + '">',
        '    <meta name="twitter:description" content="' + p.description + '">',
        '    <meta name="twitter:image" content="https://www.fallout-jp.com/images/og-image.png">',
    ].join('\n');
}

pages.forEach(p => {
    let content = fs.readFileSync(p.file, 'utf8');
    if (content.includes('og:title')) {
        console.log(p.file + ': OGP already exists, skipping');
        return;
    }
    // <title> タグの直前にOGPを挿入
    content = content.replace('    <title>', buildOgp(p) + '\n    <title>');
    fs.writeFileSync(p.file, content, 'utf8');
    console.log(p.file + ': OGP added');
});
