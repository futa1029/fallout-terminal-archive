$ErrorActionPreference = "Stop"

$baseDir = "f:\Fallout\images\note_extracted"

$images = @(
    @{ Slug = "biggie"; Url = "https://static.wikia.nocookie.net/fallout/images/3/35/FOTV_Season1_ep1_Biggie.jpg"; Filename = "FOTV_Season1_ep1_Biggie.jpg" },
    @{ Slug = "bill-tv-series"; Url = "https://static.wikia.nocookie.net/fallout/images/d/d9/FOTV_S02E01_The_Innovator_Bill_a_construction_worker.png"; Filename = "FOTV_S02E01_The_Innovator_Bill_a_construction_worker.png" },
    @{ Slug = "birdie"; Url = "https://static.wikia.nocookie.net/fallout/images/b/bf/Birdie.ogg"; Filename = "Birdie.ogg" },
    @{ Slug = "birdie"; Url = "https://static.wikia.nocookie.net/fallout/images/4/46/Birdie.png"; Filename = "Birdie.png" },
    @{ Slug = "birdie"; Url = "https://static.wikia.nocookie.net/fallout/images/1/11/FOTV_Birdie_worship.png"; Filename = "FOTV_Birdie_worship.png" },
    @{ Slug = "birthday-party-guest"; Url = "https://static.wikia.nocookie.net/fallout/images/f/f0/Birthday_party_guests.png"; Filename = "Birthday_party_guests.png" },
    @{ Slug = "bob-spencer"; Url = "https://static.wikia.nocookie.net/fallout/images/4/4f/FoTV_S1_Episode1_Bob_Spencer.png"; Filename = "FoTV_S1_Episode1_Bob_Spencer.png" }
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
