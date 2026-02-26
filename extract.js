const fs = require('fs');
const html = fs.readFileSync('f:/Fallout/_vault_fandom.html', 'utf-8');
const start = html.indexOf('id="Vaults_from_media"');
if (start !== -1) {
    const end = html.indexOf('<h2', start + 20);
    const sectionHtml = end !== -1 ? html.substring(start, end) : html.substring(start);
    fs.writeFileSync('f:/Fallout/_media_section.html', sectionHtml);
    console.log('Section extracted to _media_section.html');
} else {
    console.log('Section not found');
}
