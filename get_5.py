import urllib.request, json, urllib.parse

titles = ["Wilson_Brother's_Auto_Repair", "Doc_Stanley", "Max_Posey", "Mega_mansion", "Vendor_bot_Greg", "Artemis_(Wastelanders)", "Marie_(Fallout_76)"]
for title in titles:
    url = "https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=" + urllib.parse.quote(title) + "&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            pages = data['query']['pages']
            page_id = list(pages.keys())[0]
            if str(page_id) != "-1":
                content = pages[page_id]['revisions'][0]['slots']['main']['*']
                with open(f"f:/Fallout/_drafts/{title.replace('_', '').replace('(', '').replace(')', '').replace(\"'\", '')}.txt", "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Saved {title}")
            else:
                print(f"NOT FOUND: {title}")
    except Exception as e:
        print(f"Error {title}: {e}")
