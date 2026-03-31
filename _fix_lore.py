import os
import re

with open('lore.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the duplicate vault-tec entry
dup_regex = r\"\\s*\\{[\\s]*'name':\\s*'Vault-Tec農業研究センター',[\\s]*'yomi':\\s*'vault-tec農業研究センター',[\\s]*'url':\\s*'vault-tec-agricultural-research\\.html',[\\s]*'category':\\s*'場所',[\\s]*'appearance':\\s*\\['Fallout 76'\\],[\\s]*'date':\\s*'[^']*',[\\s]*'isDraft':\\s*true[\\s]*\\},\"

html = re.sub(dup_regex, '', html)

slugs = [
  'west-charleston-bridge.html', 'clancy-manor.html', 'cultist-totem.html',
  'cow-spots-creamery.html', 'deathclaw-island.html', 'east-kanawha-lookout.html',
  'vault-tec-agricultural-research-center.html', 'flatwoods-lookout.html',
  'flatwoods-river.html', 'fujiniya-intelligence-base.html'
]

for s in slugs:
    # Match the block up to 'isDraft': true,
    pattern = r\"('url':\\s*'\" + re.escape(s) + r\"',[\\s\\S]*?),\\s*'isDraft':\\s*true(\\s*\\})\"
    html = re.sub(pattern, r\"\\1\\2\", html)

with open('lore.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(\"Fixed in Python\")
