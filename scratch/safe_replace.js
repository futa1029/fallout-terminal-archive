const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
};

const targetDirs = ['f:/Fallout'];
const targetExts = ['.html', '.md', '.js'];
const searchStr = 'アトラス砦';
const replaceStr = 'アトラス砦';

targetDirs.forEach(dir => {
    walk(dir, (filePath) => {
        const ext = path.extname(filePath);
        if (targetExts.includes(ext) && !filePath.includes('node_modules') && !filePath.includes('.git')) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                if (content.includes(searchStr)) {
                    console.log(`Updating: ${filePath}`);
                    let newContent = content.split(searchStr).join(replaceStr);
                    fs.writeFileSync(filePath, newContent, 'utf8');
                }
            } catch (e) {
                console.error(`Error reading ${filePath}: ${e.message}`);
            }
        }
    });
});
