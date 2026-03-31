import re
import os

with open('lore.html', 'r', encoding='utf-8') as f:
    html = f.read()

start = html.find('const loreEntries = [')
end = html.find('];', start)
entries_str = html[start+20:end+1]

# Each entry is enclosed in {}
entries = re.findall(r'\\{([^}]+)\\},', entries_str)

batch = []
for entry in entries:
    # check category
    if \"'category': '場所'\" in entry or '\"category\": \"場所\"' in entry:
        # get url
        url_match = re.search(r\"'url':\\s*'([^']+)'\", entry)
        if url_match:
            url = url_match.group(1)
            # check draft
            if os.path.exists(url):
                with open(url, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if '※このページは作成中のドラフト記事です' in content:
                        batch.append(url)
    
    if len(batch) >= 10:
        break

print(\"\\n\".join(batch))
