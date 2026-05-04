$ErrorActionPreference = "Stop"

$baseDir = "f:\Fallout\images\note_extracted"

$images = @(
    @{ Slug = "border-agent"; Url = "https://static.wikia.nocookie.net/fallout/images/6/65/Border_Agent%27s_corpse.png"; Filename = "Border_Agent's_corpse.png" },
    @{ Slug = "border-agent"; Url = "https://static.wikia.nocookie.net/fallout/images/4/4a/Border_Agent_Main_image.png"; Filename = "Border_Agent_Main_image.png" },
    @{ Slug = "brotherhood-medic"; Url = "https://static.wikia.nocookie.net/fallout/images/d/d1/Brotherhood_medic_The_End.png"; Filename = "Brotherhood_medic_The_End.png" },
    @{ Slug = "brotherhood-officer"; Url = "https://static.wikia.nocookie.net/fallout/images/a/af/BOS_officer_-_Alireza_Mirmontazeri.jpg"; Filename = "BOS_officer_-_Alireza_Mirmontazeri.jpg" },
    @{ Slug = "brotherhood-officer"; Url = "https://static.wikia.nocookie.net/fallout/images/d/d4/Bald_Brotherhood_officer_1_The_End.png"; Filename = "Bald_Brotherhood_officer_1_The_End.png" },
    @{ Slug = "brotherhood-officer"; Url = "https://static.wikia.nocookie.net/fallout/images/9/9d/Bald_Brotherhood_officer_2_The_End.png"; Filename = "Bald_Brotherhood_officer_2_The_End.png" },
    @{ Slug = "brotherhood-officer"; Url = "https://static.wikia.nocookie.net/fallout/images/d/d4/Bearded_Brotherhood_officer_1_The_End.png"; Filename = "Bearded_Brotherhood_officer_1_The_End.png" },
    @{ Slug = "brotherhood-officer"; Url = "https://static.wikia.nocookie.net/fallout/images/5/59/Bearded_Brotherhood_officer_2_The_End.png"; Filename = "Bearded_Brotherhood_officer_2_The_End.png" },
    @{ Slug = "brotherhood-officer"; Url = "https://static.wikia.nocookie.net/fallout/images/f/f4/Brotherhood_officer_1_The_Beginning.png"; Filename = "Brotherhood_officer_1_The_Beginning.png" },
    @{ Slug = "brotherhood-officer"; Url = "https://static.wikia.nocookie.net/fallout/images/5/56/Brotherhood_officer_1_The_End.png"; Filename = "Brotherhood_officer_1_The_End.png" },
    @{ Slug = "brotherhood-officer"; Url = "https://static.wikia.nocookie.net/fallout/images/2/28/Brotherhood_officer_1_The_Head.png"; Filename = "Brotherhood_officer_1_The_Head.png" },
    @{ Slug = "brotherhood-officer"; Url = "https://static.wikia.nocookie.net/fallout/images/4/4a/Brotherhood_officer_2_The_Beginning.png"; Filename = "Brotherhood_officer_2_The_Beginning.png" },
    @{ Slug = "brotherhood-officer"; Url = "https://static.wikia.nocookie.net/fallout/images/2/28/Brotherhood_officer_2_The_End.png"; Filename = "Brotherhood_officer_2_The_End.png" },
    @{ Slug = "brotherhood-soldier-tv-series"; Url = "https://static.wikia.nocookie.net/fallout/images/7/79/Brotherhood_soldiers.png"; Filename = "Brotherhood_soldiers.png" },
    @{ Slug = "bud-askins"; Url = "https://static.wikia.nocookie.net/fallout/images/8/80/Bud_Askins_robobrain.png"; Filename = "Bud_Askins_robobrain.png" },
    @{ Slug = "bud-askins"; Url = "https://static.wikia.nocookie.net/fallout/images/b/be/FOTV_Bud_Askins.png"; Filename = "FOTV_Bud_Askins.png" },
    @{ Slug = "bud-askins"; Url = "https://static.wikia.nocookie.net/fallout/images/7/7c/FOTV_The_Winning_Team%21_Bud_Askins.png"; Filename = "FOTV_Winning_Team.png" }
)

foreach ($img in $images) {
    if ($img.Filename -eq "FOTV_Winning_Team.png") {
        # Fallback fetch using API since the url might be slightly off
        $title = "File:FOTV The Winning Team! Bud Askins.png"
        $apiurl = "https://fallout.fandom.com/api.php?action=query&titles=$($title -replace ' ', '_')&prop=imageinfo&iiprop=url&format=json"
        try {
            $json = Invoke-WebRequest -Uri $apiurl | ConvertFrom-Json
            $pages = $json.query.pages
            foreach ($p in $pages.psobject.properties.value) {
                if ($p.imageinfo.Length -gt 0) {
                    $img.Url = $p.imageinfo[0].url
                }
            }
        } catch {}
    }

    $dir = Join-Path $baseDir $img.Slug
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
    }
    
    $dest = Join-Path $dir $img.Filename
    if (-not (Test-Path $dest)) {
        Write-Host "Downloading $($img.Filename) to $($img.Slug)..."
        try {
            $url = $img.Url -replace '/revision/latest.*', ''
            Invoke-WebRequest -Uri $url -OutFile $dest
        } catch {
            Write-Host "Failed to download $($img.Url): $_" -ForegroundColor Red
        }
    } else {
        Write-Host "Skip $($img.Filename), already exists."
    }
}
Write-Host "Done!"
