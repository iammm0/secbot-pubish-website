# Record SecBot TUI window to GIF (Windows console + ffmpeg gdigrab)
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Ffmpeg = Join-Path $Root "tools\ffmpeg\ffmpeg.exe"
$OutDir = Join-Path $Root "public\demos"
$RawDir = Join-Path $Root "tmp\demo-raw"
New-Item -ItemType Directory -Force -Path $OutDir, $RawDir | Out-Null

if (-not (Test-Path $Ffmpeg)) { throw "ffmpeg missing: $Ffmpeg" }

$SecbotRoot = Resolve-Path (Join-Path $Root "..\secbot")
Write-Host "[tui] launching SecBot TUI from $SecbotRoot"

# Launch TUI in a titled console window (spawn backend inside TUI)
$bat = Join-Path $env:TEMP "secbot-tui-record.bat"
@"
@echo off
cd /d "$SecbotRoot\terminal-ui"
set SECBOT_PACKAGE_ROOT=$SecbotRoot
set SECBOT_TUI_BACKEND=service
set SECBOT_API_URL=http://127.0.0.1:8000
call npm.cmd run tui
"@ | Set-Content -Path $bat -Encoding ASCII

Start-Process -FilePath "cmd.exe" -ArgumentList "/c","start","Secbot TUI Demo","cmd.exe","/k",$bat | Out-Null
Start-Sleep -Seconds 6

$mp4 = Join-Path $RawDir "tui-capture.mp4"
$gif = Join-Path $OutDir "tui-console.gif"

Write-Host "[tui] capturing desktop region for 8s..."
# Capture primary desktop; crop later if needed. Title grab is flaky on Win11.
& $Ffmpeg -y -f gdigrab -framerate 10 -t 8 -i desktop -vf "scale=1280:-1" -c:v libx264 -pix_fmt yuv420p $mp4
if ($LASTEXITCODE -ne 0) { throw "ffmpeg gdigrab failed" }

Write-Host "[tui] converting to gif..."
$palette = Join-Path $RawDir "tui-palette.png"
& $Ffmpeg -y -i $mp4 -vf "fps=8,scale=960:-1:flags=lanczos,palettegen=stats_mode=diff" $palette
& $Ffmpeg -y -i $mp4 -i $palette -lavfi "fps=8,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" -loop 0 $gif

# Also copy existing product demo if present
$existing = Join-Path $SecbotRoot "assets\secbot-demo.gif"
if (Test-Path $existing) {
  Copy-Item $existing (Join-Path $OutDir "tui-product.gif") -Force
  Write-Host "[tui] copied assets\secbot-demo.gif -> demos\tui-product.gif"
}

$size = (Get-Item $gif).Length
Write-Host "[ok] $gif ($([math]::Round($size/1KB)) KB)"
