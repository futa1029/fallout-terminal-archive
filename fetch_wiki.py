import urllib.request
import json
import urllib.parse
import os

def get_api_data(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode('utf-8'))

os.makedirs(r"f:\Fallout\_drafts", exist_ok=True)

# 1. Get wikitext
url = "https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=Billings_homestead&format=json"
data = get_api_data(url)
pages = data['query']['pages']
page_id = list(pages.keys())[0]
if page_id == "-1":
    print("Page not found")
else:
    wikitext = pages[page_id]['revisions'][0]['slots']['main']['*']
    with open(r"f:\Fallout\_drafts\billings_homestead_wikitext.txt", "w", encoding="utf-8") as f:
        f.write(wikitext)
    print("Saved wikitext")

# 2. Get images info
images_url = "https://fallout.fandom.com/api.php?action=query&prop=images&titles=Billings_homestead&format=json&imlimit=50"
img_data = get_api_data(images_url)
img_pages = img_data['query']['pages']
if list(img_pages.keys())[0] != "-1":
    img_list = img_pages[list(img_pages.keys())[0]].get('images', [])
    
    img_info = []
    for img in img_list:
        title = img['title']
        safe_title = urllib.parse.quote(title)
        info_url = f"https://fallout.fandom.com/api.php?action=query&titles={safe_title}&prop=imageinfo&iiprop=url&format=json"
        try:
            info_data = get_api_data(info_url)
            ipages = info_data['query']['pages']
            ipage_id = list(ipages.keys())[0]
            if 'imageinfo' in ipages[ipage_id]:
                img_url = ipages[ipage_id]['imageinfo'][0]['url']
                img_info.append(f"{title}: {img_url}")
        except Exception as e:
            print(f"Error fetching {title}: {e}")
    
    with open(r"f:\Fallout\_drafts\billings_homestead_images.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(img_info))
    print("Saved image info")
