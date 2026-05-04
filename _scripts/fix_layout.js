const fs = require('fs');

let txt = fs.readFileSync('f:/Fallout/brotherhood-of-steel.html', 'utf8');

// 1. Remove all \r characters (carriage returns) globally to normalize line endings
txt = txt.replace(/\r/g, '');

// 2. Remove the middle closing tags which break the layout
const middleTagsRegex = /<\/main>\s*<\/div>\s*<\/body>\s*<\/html>/;
const match = txt.match(middleTagsRegex);
if (match) {
    console.log('Found middle tags at index', match.index);
    // Remove only the first occurrence of these tags (in the middle)
    txt = txt.substring(0, match.index) + txt.substring(match.index + match[0].length);
    console.log('Removed middle tags.');
} else {
    console.log('Middle tags not found. Maybe already removed?');
}

// 3. Fix the end tags. The current end tags from my chunk14 append are:
//        </div>
//    </div>
//    <!-- <footer>タグやその他の終了処理があればここに追加 -->
// </body>
// </html>
//
// We want to replace it with:
//        </main>
//    </div>
// </body>
// </html>
const endTagsRegex = /<\/div>\s*<\/div>\s*<!-- <footer[^>]*>\s*<\/body>\s*<\/html>\s*$/;
if (endTagsRegex.test(txt)) {
    txt = txt.replace(endTagsRegex, '\n        </main>\n    </div>\n</body>\n</html>\n');
    console.log('Replaced bottom tags successfully.');
} else {
    console.log('Could not find the exact bottom tags. Forcing fix at the end...');
    // If we can't find it with the regex, let's just forcefully replace the last `</div></div></body></html>` variant
    const fallbackRegex = /<\/div>\s*<\/div>[\s\S]*<\/body>\s*<\/html>\s*$/;
    txt = txt.replace(fallbackRegex, '\n        </main>\n    </div>\n</body>\n</html>\n');
}

fs.writeFileSync('f:/Fallout/brotherhood-of-steel.html', txt, 'utf8');
console.log('File successfully fixed.');
