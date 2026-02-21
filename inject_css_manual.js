const fs = require('fs');
const path = require('path');

const manualFiles = [
    "kimball.html",
    "raiders_76.html",
    "lee_moldaver.html",
    "vault_dweller_lore.html",
    "assaultron_head.html",
    "blight.html",
    "tandi.html",
    "prize_bot.html",
    "ncr.html",
    "buffalo-gourd-seed.html"
];

const cssToInject = `
        .content a {
            color: var(--accent-color);
            text-decoration: none;
            border-bottom: 1px solid transparent;
        }

        .content a:hover {
            border-bottom: 1px solid var(--accent-color);
        }

        /* Auto Cross-Links */
        .auto-link {
            color: var(--accent-color) !important;
            font-weight: bold;
            text-decoration: none;
            border-bottom: 1px dashed var(--accent-color) !important;
            transition: all 0.2s;
            padding: 0 2px;
        }

        .auto-link:hover {
            background-color: color-mix(in srgb, var(--accent-color) 20%, transparent);
            border-bottom: 1px solid var(--accent-color) !important;
        }
    </style>`;

manualFiles.forEach(file => {
    const filePath = path.join('f:\\Fallout', file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Only inject if it doesn't already have .auto-link
        if (!content.includes('.auto-link {')) {
            content = content.replace('    </style>', cssToInject);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Injected CSS into: ${file}`);
        } else {
            // Already has auto-link, but let's make sure it's the correct var(--accent-color) version
            content = content.replace(/color:\s*#ffce07\s*!important/gi, 'color: var(--accent-color) !important');
            content = content.replace(/border-bottom:\s*1px\s+dashed\s*#ffce07\s*!important/gi, 'border-bottom: 1px dashed var(--accent-color) !important');
            content = content.replace(/background-color:\s*rgba\(\s*255\s*,\s*206\s*,\s*7\s*,\s*0\.2\s*\)/gi, 'background-color: color-mix(in srgb, var(--accent-color) 20%, transparent)');
            content = content.replace(/border-bottom:\s*1px\s+solid\s*#ffce07\s*!important/gi, 'border-bottom: 1px solid var(--accent-color) !important');

            if (!content.includes('.content a {')) {
                const addContentA = `
        .content a {
            color: var(--accent-color);
            text-decoration: none;
            border-bottom: 1px solid transparent;
        }

        .content a:hover {
            border-bottom: 1px solid var(--accent-color);
        }
    </style>`;
                content = content.replace('    </style>', addContentA);
            }

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated CSS in: ${file}`);
        }
    }
});
