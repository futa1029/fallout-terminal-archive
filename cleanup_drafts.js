const fs = require('fs');
const path = require('path');

const draftsDir = 'f:/Fallout/_drafts';
const publishedDir = path.join(draftsDir, 'published');
const rootDir = 'f:/Fallout';

fs.readdir(draftsDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (!file.endsWith('.md') && !file.endsWith('_wikitext.txt')) return;
        if (file.startsWith('TEMPLATE')) return;

        let basename = '';
        if (file.endsWith('.md')) {
            basename = file.replace('.md', '');
        } else if (file.endsWith('_wikitext.txt')) {
            basename = file.replace('_wikitext.txt', '');
        }

        // The HTML file may have a dash instead of underscore if it was auto converted.
        let htmlName1 = `${basename}.html`;
        let htmlName2 = `${basename.replace(/_/g, '-')}.html`;

        if (fs.existsSync(path.join(rootDir, htmlName1)) || fs.existsSync(path.join(rootDir, htmlName2))) {
            const oldPath = path.join(draftsDir, file);
            const newPath = path.join(publishedDir, file);
            fs.renameSync(oldPath, newPath);
            console.log(`Moved ${file} to published/`);
        }
    });
});
