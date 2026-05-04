$path = 'C:\Users\futa1\.gemini\antigravity\brain\3fa8df43-f20e-4473-af4f-19206b613f25\.system_generated\steps\338\content.md'
$raw = Get-Content $path -Raw
$jsonStart = $raw.IndexOf('{')
$jsonText = $raw.Substring($jsonStart)
$json = $jsonText | ConvertFrom-Json
$wikitext = $json.parse.wikitext.'*'
$wikitext | Set-Content 'f:\Fallout\scratch\bos_wikitext.txt' -Encoding utf8
