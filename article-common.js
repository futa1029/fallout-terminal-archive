/**
 * article-common.js
 * 全記事ページに共通で読み込まれるスクリプト。
 * 以下の3機能を提供：
 * 1. 目次（Table of Contents）の自動生成
 * 2. パンくずリスト（Breadcrumb）の自動挿入
 * 3. 関連記事セクションの自動挿入
 */
(function () {
    'use strict';

    // ============================================================
    // 定数・ユーティリティ
    // ============================================================
    const LORE_URL = 'lore.html';
    const THUMBNAILS_JSON = 'lore-thumbnails.json';
    const ACCENT = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#00ff00';

    // ============================================================
    // 1. 目次（TOC）
    // ============================================================
    function buildTOC() {
        const content = document.querySelector('.content');
        if (!content) return;

        const headings = content.querySelectorAll('h2');
        if (headings.length < 2) return; // セクションが少ない場合は不要

        // 各h2にIDを付与
        headings.forEach((h, i) => {
            if (!h.id) {
                h.id = 'section-' + i;
            }
        });

        // TOC HTML生成
        const tocContainer = document.createElement('div');
        tocContainer.className = 'toc-container';
        tocContainer.innerHTML = `
            <button class="toc-toggle" aria-expanded="false" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded')==='true'?'false':'true'); this.nextElementSibling.classList.toggle('toc-open')">
                ▶ 目次 <span class="toc-count">(${headings.length})</span>
            </button>
            <nav class="toc-list" role="navigation" aria-label="目次">
                ${Array.from(headings).map(h =>
            `<a href="#${h.id}" class="toc-link">${h.textContent}</a>`
        ).join('')}
            </nav>
        `;

        // action-headerの後に挿入
        const actionHeader = content.querySelector('.action-header');
        const h1 = content.querySelector('h1');
        const insertAfter = h1 || actionHeader;
        if (insertAfter && insertAfter.nextSibling) {
            insertAfter.parentNode.insertBefore(tocContainer, insertAfter.nextSibling);
        } else {
            content.prepend(tocContainer);
        }

        // スムーズスクロール
        tocContainer.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // モバイルでは閉じる
                    if (window.innerWidth <= 768) {
                        const toggle = tocContainer.querySelector('.toc-toggle');
                        const list = tocContainer.querySelector('.toc-list');
                        toggle.setAttribute('aria-expanded', 'false');
                        list.classList.remove('toc-open');
                    }
                }
            });
        });
    }

    // ============================================================
    // 2. パンくずリスト
    // ============================================================
    function buildBreadcrumb() {
        const content = document.querySelector('.content');
        if (!content) return;

        // 記事タイトルをOGまたはh1から取得
        const ogTitle = document.querySelector('meta[property="og:title"]');
        let title = '';
        if (ogTitle) {
            title = ogTitle.getAttribute('content').replace(/\s*\|.*$/, '');
        } else {
            const h1 = content.querySelector('h1');
            if (h1) title = h1.textContent.trim();
        }

        // カテゴリをdata属性から取得
        const categoryAttr = document.body.getAttribute('data-article-category');
        const category = categoryAttr && categoryAttr !== '' ? categoryAttr : null;

        // パンくずHTML生成
        const bc = document.createElement('nav');
        bc.className = 'breadcrumb';
        bc.setAttribute('aria-label', 'パンくず');

        let breadcrumbHtml = `<a href="${LORE_URL}">ロア・アーカイブ</a>`;
        if (category) {
            breadcrumbHtml += ` <span class="bc-sep">›</span> <span>${category}</span>`;
        }
        breadcrumbHtml += ` <span class="bc-sep">›</span> <span class="bc-current">${title}</span>`;
        bc.innerHTML = breadcrumbHtml;

        // action-headerの前に挿入
        const actionHeader = content.querySelector('.action-header');
        if (actionHeader) {
            actionHeader.parentNode.insertBefore(bc, actionHeader);
        } else {
            content.prepend(bc);
        }
    }

    // ============================================================
    // 3. 関連記事
    // ============================================================
    async function buildRelatedArticles() {
        const content = document.querySelector('.content');
        if (!content) return;

        // 現在の記事情報を取得
        const currentUrl = location.pathname.split('/').pop();
        const categoryAttr = document.body.getAttribute('data-article-category') || '';
        const appearanceAttr = document.body.getAttribute('data-article-appearance') || '';
        const appearances = appearanceAttr ? appearanceAttr.split(',').map(s => s.trim()) : [];

        // ===== sessionStorage キャッシュを使った fetch ヘルパー =====
        async function cachedFetch(url) {
            const cacheKey = 'ac_cache_' + url;
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) return cached;
            const res = await fetch(url);
            const text = await res.text();
            try { sessionStorage.setItem(cacheKey, text); } catch (e) { /* ストレージが満杯でも続行 */ }
            return text;
        }

        // サムネイルJSONを読み込み（キャッシュ付き）
        let thumbnails = {};
        try {
            const text = await cachedFetch(THUMBNAILS_JSON);
            thumbnails = JSON.parse(text);
        } catch (e) {
            return; // JSON取得失敗時は関連記事を表示しない
        }

        // lore.html のエントリを解析（キャッシュ付き）
        let loreEntries = [];
        try {
            const html = await cachedFetch(LORE_URL);
            const match = html.match(/const loreEntries = \[([\s\S]*?)\];/);
            if (match) {
                // JSONとして解析可能にする
                const entriesStr = '[' + match[1]
                    .replace(/(\w+):/g, '"$1":')    // キーにクォートを追加
                    .replace(/'/g, '"')               // シングルクォートをダブルに
                    .replace(/,\s*}/g, '}')           // trailing commas 削除
                    .replace(/,\s*\]/g, ']')
                    + ']';
                loreEntries = JSON.parse(entriesStr);
            }
        } catch (e) {
            return;
        }

        // 関連記事をスコアリング
        const scored = loreEntries
            .filter(e => e.url !== currentUrl)
            .map(entry => {
                let score = 0;
                // 同じカテゴリ: +3
                if (categoryAttr && entry.category === categoryAttr) score += 3;
                // 共通の登場作品: 各+1
                if (entry.appearance) {
                    entry.appearance.forEach(app => {
                        if (appearances.includes(app)) score += 1;
                    });
                }
                return { ...entry, score };
            })
            .filter(e => e.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

        if (scored.length === 0) return;

        // 関連記事セクション生成
        const section = document.createElement('div');
        section.className = 'related-section';
        section.innerHTML = `
            <h2>関連記事</h2>
            <div class="related-scroll">
                ${scored.map(entry => {
            const thumb = thumbnails[entry.url] || '';
            const thumbHtml = thumb
                ? `<img src="${thumb}" alt="" class="related-thumb" loading="lazy">`
                : `<div class="related-thumb related-thumb-placeholder">?</div>`;
            return `
                        <a href="${entry.url}" class="related-card">
                            ${thumbHtml}
                            <span class="related-name">${entry.name}</span>
                        </a>
                    `;
        }).join('')}
            </div>
        `;

        // copyright-defaultの前に挿入
        const copyright = content.querySelector('[name="copyright-default"]');
        if (copyright) {
            copyright.parentNode.parentNode.insertBefore(section, copyright.parentNode);
        } else {
            content.appendChild(section);
        }
    }

    // ============================================================
    // CSSの注入
    // ============================================================
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* ===== パンくずリスト ===== */
            .breadcrumb {
                font-size: 0.85em;
                margin-bottom: 15px;
                font-family: 'Share Tech Mono', monospace;
                color: #888;
            }
            .breadcrumb a {
                color: var(--accent-color, #00ff00);
                text-decoration: none;
            }
            .breadcrumb a:hover {
                text-decoration: underline;
            }
            .bc-sep {
                margin: 0 6px;
                color: #555;
            }
            .bc-current {
                color: var(--accent-color, #00ff00);
                opacity: 0.8;
            }

            /* ===== 目次 ===== */
            .toc-container {
                margin: 20px 0;
                border: 1px solid var(--accent-color, #00ff00);
                border-radius: 4px;
                background: rgba(0, 255, 0, 0.03);
            }
            .toc-toggle {
                width: 100%;
                background: rgba(0, 255, 0, 0.08);
                border: none;
                color: var(--accent-color, #00ff00);
                padding: 12px 15px;
                font-family: 'Share Tech Mono', monospace;
                font-size: 1em;
                cursor: pointer;
                text-align: left;
                transition: background 0.2s;
            }
            .toc-toggle:hover {
                background: rgba(0, 255, 0, 0.15);
            }
            .toc-toggle[aria-expanded="true"] {
                border-bottom: 1px solid var(--accent-color, #00ff00);
            }
            .toc-toggle[aria-expanded="true"]::first-letter {
                /* 矢印の向きを変更 - CSSだけでは限界があるのでJSで処理 */
            }
            .toc-count {
                opacity: 0.6;
                font-size: 0.9em;
            }
            .toc-list {
                display: none;
                padding: 10px 0;
            }
            .toc-list.toc-open {
                display: block;
            }
            .toc-link {
                display: block;
                color: var(--text-color, #e0e0e0);
                text-decoration: none;
                padding: 8px 20px;
                font-size: 0.95em;
                border-left: 2px solid transparent;
                transition: all 0.2s;
            }
            .toc-link:hover {
                background: rgba(0, 255, 0, 0.08);
                border-left-color: var(--accent-color, #00ff00);
                color: var(--accent-color, #00ff00);
            }

            /* デスクトップでは常時表示 */
            @media (min-width: 769px) {
                .toc-toggle {
                    pointer-events: none;
                }
                .toc-toggle::after {
                    content: '';
                }
                .toc-list {
                    display: block !important;
                }
            }

            /* ===== 関連記事 ===== */
            .related-section {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px dashed var(--accent-color, #00ff00);
            }
            .related-scroll {
                display: flex;
                gap: 12px;
                overflow-x: auto;
                padding-bottom: 10px;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: thin;
                scrollbar-color: var(--accent-color, #00ff00) #222;
            }
            .related-scroll::-webkit-scrollbar {
                height: 6px;
            }
            .related-scroll::-webkit-scrollbar-thumb {
                background: var(--accent-color, #00ff00);
                border-radius: 3px;
            }
            .related-scroll::-webkit-scrollbar-track {
                background: #222;
            }
            .related-card {
                flex: 0 0 140px;
                text-decoration: none;
                background: var(--panel-bg, #222);
                border: 1px solid #444;
                border-radius: 4px;
                overflow: hidden;
                transition: all 0.3s;
                display: flex;
                flex-direction: column;
            }
            .related-card:hover {
                border-color: var(--accent-color, #00ff00);
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
                transform: translateY(-2px);
            }
            .related-thumb {
                width: 100%;
                height: 90px;
                object-fit: cover;
                display: block;
                background: #1a1a1a;
            }
            .related-thumb-placeholder {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2em;
                color: #444;
                font-family: 'Share Tech Mono', monospace;
            }
            .related-name {
                padding: 8px;
                font-size: 0.8em;
                color: var(--accent-color, #00ff00);
                text-align: center;
                line-height: 1.3;
                font-family: 'Noto Sans JP', sans-serif;
            }

            /* モバイル調整 */
            @media (max-width: 768px) {
                .toc-link {
                    padding: 12px 20px;
                    font-size: 1em;
                }
                .related-card {
                    flex: 0 0 120px;
                }
                .related-thumb {
                    height: 75px;
                }
                .breadcrumb {
                    font-size: 0.8em;
                    line-height: 1.5;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // トグル矢印の制御
    // ============================================================
    function setupToggleIcons() {
        const toggle = document.querySelector('.toc-toggle');
        if (!toggle) return;

        const update = () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.textContent = '';
            toggle.innerHTML = `${expanded ? '▼' : '▶'} 目次 <span class="toc-count">(${document.querySelectorAll('.toc-link').length})</span>`;
        };

        toggle.addEventListener('click', () => setTimeout(update, 10));

        // デスクトップでは常時展開表示
        if (window.innerWidth > 768) {
            toggle.setAttribute('aria-expanded', 'true');
            const list = toggle.nextElementSibling;
            if (list) list.classList.add('toc-open');
            update();
        }
    }

    // ============================================================
    // 初期化
    // ============================================================
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        buildBreadcrumb();
        buildTOC();
        setupToggleIcons();
        buildRelatedArticles();
    });
})();
