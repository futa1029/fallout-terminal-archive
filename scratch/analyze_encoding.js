const fs = require('fs');
const buffer = fs.readFileSync('arcade-gannon.html');
const iconv = require('util').inspect; // No iconv-lite, but we can check bytes

console.log('First 100 bytes:', buffer.slice(0, 100).toString('hex'));
console.log('Contains UTF-8 BOM?', buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF);

// Try to decode as UTF-8
const utf8Str = buffer.toString('utf8');
if (utf8Str.includes('')) {
    console.log('UTF-8 decoding has errors.');
} else {
    console.log('UTF-8 decoding looks OK.');
}
