#!/usr/bin/env node
/**
 * generate_sitemap.js
 * sitemap.xml と robots.txt を生成するスクリプト。
 * 実行: node generate_sitemap.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.fallout-jp.com';

// 固定ページ（優先度順）
const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/lore.html', priority: '0.9', changefreq: 'daily' },
    { url: '/about.html', priority: '0.7', changefreq: 'monthly' },
    { url: '/rules.html', priority: '0.6', changefreq: 'monthly' },
    { url: '/changelog.html', priority: '0.8', changefreq: 'daily' },
    { url: '/resources.html', priority: '0.6', changefreq: 'monthly' },
    { url: '/donate.html', priority: '0.5', changefreq: 'monthly' },
];

// 記事ページを lore.html から取得する
const loreHtml = fs.readFileSync('lore.html', 'utf8');
const match = loreHtml.match(/const loreEntries = (\[[\s\S]*?\]);/);
let articleUrls = [];

// サイトマップから除外する旧ページ・重複ページのパターン
const excludePatterns = [
    /_2\.html$/,           // _2.html で終わるファイル（旧バージョン）
    /^\/lee_moldaver\.html$/,    // 旧ファイル名（新: lee-mouldaver.html）
    /^\/raiders_76\.html$/,      // 旧ファイル名（新: raider-fallout-76.html）
    /^\/prize_bot\.html$/,       // 旧ファイル名（新: mr-prizebot.html）
    /^\/vault_dweller_jp\.html$/,// 旧ファイル名
    /^\/vault_dweller_lore\.html$/,// 旧ファイル名
    /^\/wayward_jp\.html$/,      // 旧ファイル名
    /^\/cave_cricket\.html$/,    // 旧ファイル名
    /^\/buds_buds\.html$/,       // 旧ファイル名
    /[^\x00-\x7F]/,              // 非ASCII文字（日本語ファイル名）を含むURL
];

if (match) {
    const entries = eval(match[1]);
    articleUrls = entries
        .map(e => ({
            url: '/' + e.url,
            priority: '0.6',
            changefreq: 'monthly',
            lastmod: e.date || null,
        }))
        .filter(p => !excludePatterns.some(pattern => pattern.test(p.url)));
    console.log(`記事ページ ${articleUrls.length} 件を取得しました。`);
}

const today = new Date().toISOString().split('T')[0];
const allPages = [
    ...staticPages.map(p => ({ ...p, lastmod: today })),
    ...articleUrls,
];

// sitemap.xml 生成
const sitemapUrls = allPages.map(p => `
    <url>
        <loc>${BASE_URL}${p.url}</loc>
        <lastmod>${p.lastmod || today}</lastmod>
        <changefreq>${p.changefreq}</changefreq>
        <priority>${p.priority}</priority>
    </url>`).join('');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapXml, 'utf8');
console.log(`sitemap.xml を生成しました（${allPages.length} 件）。`);

// robots.txt 生成
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync('robots.txt', robotsTxt, 'utf8');
console.log('robots.txt を生成しました。');
