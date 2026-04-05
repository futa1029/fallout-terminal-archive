$ErrorActionPreference = "Stop"

$baseDir = "f:\Fallout\images\note_extracted"

$images = @(
    @{ Slug = "barv"; Url = "https://static.wikia.nocookie.net/fallout/images/7/7e/FoTV_Barv.jpg"; Filename = "FoTV_Barv.jpg" },
    @{ Slug = "benjamin-tv-series"; Url = "https://static.wikia.nocookie.net/fallout/images/b/be/FOTV_Benjamin%27s_huge_bomb.png"; Filename = "FOTV_Benjamin%27s_huge_bomb.png" },
    @{ Slug = "bert-tv-series"; Url = "https://static.wikia.nocookie.net/fallout/images/d/da/FOTV_S01E01.The.End._%285%29.jpg"; Filename = "FOTV_Season1_ep1_Bert.jpg" },
    @{ Slug = "betty-pearson"; Url = "https://static.wikia.nocookie.net/fallout/images/f/f6/FOTV_s1_ep5_Betty.png"; Filename = "FOTV_s1_ep5_Betty.png" },
    @{ Slug = "betty-pearson"; Url = "https://static.wikia.nocookie.net/fallout/images/e/ed/Young_Betty_Pearson.png"; Filename = "Young_Betty_Pearson.png" },
    @{ Slug = "betty-pearson"; Url = "https://static.wikia.nocookie.net/fallout/images/2/26/Betty_smiling.png"; Filename = "Betty_smiling.png" },
    @{ Slug = "biff-tv-series"; Url = "https://static.wikia.nocookie.net/fallout/images/a/aa/BiffEpisode3.png"; Filename = "BiffEpisode3.png" }
)

foreach ($img in $images) {
    $dir = Join-Path $baseDir $img.Slug
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
    }
    
    $dest = Join-Path $dir $img.Filename
    if (-not (Test-Path $dest)) {
        Write-Host "Downloading $($img.Filename) to $($img.Slug)..."
        try {
            # Trim revision parameters if present
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
