$baseDir = "f:\Fallout\images\note_extracted"

function Download-Image {
    param (
        [string]$url,
        [string]$folderName,
        [string]$fileName
    )
    $dir = "$baseDir\$folderName"
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    $path = "$dir\$fileName"
    Invoke-WebRequest -Uri $url -OutFile $path
    Write-Host "Downloaded: $path"
}

# Bald raider
Download-Image -url "https://static.wikia.nocookie.net/fallout/images/b/b4/Bald_raider_The_End.png" -folderName "bald-raider" -fileName "Bald_raider_The_End.png"
Download-Image -url "https://static.wikia.nocookie.net/fallout/images/f/f8/FoTV_Sterling_Mk_IV_The_End2.jpg" -folderName "bald-raider" -fileName "FoTV_Sterling_Mk_IV_The_End2.jpg"

# Bar patron
Download-Image -url "https://static.wikia.nocookie.net/fallout/images/f/fa/FOTV_bar_patrons.png" -folderName "bar-patron-tv-series" -fileName "FOTV_bar_patrons.png"
