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

# Barb Howard
Download-Image -url "https://static.wikia.nocookie.net/fallout/images/0/0e/FOTV_Barb.png" -folderName "barb-howard" -fileName "FOTV_Barb.png"

# Bartender (Los Angeles)
Download-Image -url "https://static.wikia.nocookie.net/fallout/images/4/40/FOTV_bartender.png" -folderName "bartender-los-angeles" -fileName "FOTV_bartender.png"

# Bartender (Lucky 38)
Download-Image -url "https://static.wikia.nocookie.net/fallout/images/7/79/FOTV_Lucky_38_Bartender_01.png" -folderName "bartender-lucky-38" -fileName "FOTV_Lucky_38_Bartender_01.png"
