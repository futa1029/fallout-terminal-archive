const fs = require('fs');

const inputFile = 'note_articles_data.json';
const outputFile = 'note_articles_data_sanitized.json';

try {
    const buffer = fs.readFileSync(inputFile);
    
    // 不正なバイトシーケンスを除去しつつ、有効なUTF-8を維持する
    // バッファを一度文字列として読み込み（この際不正なバイトは置換される）、
    // 再度書き出すことで安全なUTF-8にする
    const content = buffer.toString('utf8');
    
    // さらに、制御文字や明らかに壊れている特定のパターンがあれば除去する
    // 今回は単純なtoString('utf8')で十分なケースが多い（Node.jsは不正なバイトをU+FFFDに置換する）
    
    fs.writeFileSync(outputFile, content, 'utf8');
    console.log('Sanitization complete. Check note_articles_data_sanitized.json');
} catch (err) {
    console.error('Error during sanitization:', err);
}
