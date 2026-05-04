const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

(async () => {
    const manor = fs.readFileSync('clancy-manor.html', 'utf8');
    const mansion = fs.readFileSync('clancy-mansion.html', 'utf8');

    const prompt = `You are an expert Frontend Developer and Fallout lore master. I have TWO HTML files for the same article "Clancy Manor".
1. 'clancy-manor.html' (Published structure): Has the correct Fandom image paths (like F76WL_Clancy_Manor_X.png), the correct gallery section at the bottom, the correct 'remove_duplicates.js' linking, and a quote-box.
2. 'clancy-mansion.html' (Unpublished dump): Has the FULL RICH LORE TEXT representing the paragraphs and exact holotape quotes which are missing in manor, but has useless hashed image names (n788142face15_img...).

TASK:
Output a single PERFECT HTML document.
1. Use 'clancy-manor.html' as the precise HTML template (preserve the <head>, container, styles, gallery grid, copyright tags, and supabase scripts exactly).
2. For the main body article content (<main class="content">... h1, h2, paragraphs until the gallery), REPLACE 'clancy-manor.html's stub text with the full rich text and holotape blockquotes from 'clancy-mansion.html'. DO NOT use the hashed image names (n78...). Replace any inline images in the text with the equivalent clean Fandom image filenames found in the clancy-manor.html gallery, or just leave them out of the paragraphs if they are already in the gallery at the bottom.
3. IMPORTANT: In the <aside class="infobox">, the img_map_marker_png is completely tiny. Find this line:
   <img src="images/note_extracted/clancy-manor/img_map_marker.png" alt="マップマーカー画像" class="map-marker-icon" style="width:auto; max-height:80px; margin-bottom:0; display:inline-block; border:none; cursor:default;">
   And REPLACE its style with EXACTLY: style="width: 100%; margin-top: 5px; border: 1px solid #555; cursor: default;" to make it large.
4. Keep the original 'clancy-manor.html' gallery AND quote-box at the bottom of the article. Let them co-exist.
5. Provide ONLY the final code. No markdown fences if possible, or clean it.

Here is clancy-manor.html:
${manor}

====================

Here is clancy-mansion.html:
${mansion}
`;

    console.log('Requesting merge from Gemini 2.5 Flash...');
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    let merged = response.text;
    if (merged.startsWith('```html')) {
        merged = merged.replace(/^```html\n|\n```$/g, '');
    } else if (merged.startsWith('```')) {
        merged = merged.replace(/^```\n|\n```$/g, '');
    }

    fs.writeFileSync('clancy-manor.html', merged, 'utf8');
    console.log('Merged successfully! deleting clancy-mansion.html...');
    fs.unlinkSync('clancy-mansion.html');
})();
