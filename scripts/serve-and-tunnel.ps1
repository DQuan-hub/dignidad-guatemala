$workDir = "C:\Users\diego\OneDrive\Escritorio\ia chamba\dignidad guatemala"
Set-Location $workDir

# 1. Stop any running cloudflared
Get-Process cloudflared -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

$logNext = "$env:TEMP\next_dignidad.log"
$logCf = "$env:TEMP\cloudflared_dignidad.log"
Remove-Item $logCf -ErrorAction SilentlyContinue

# 2. Check if Next.js is responding on 3005
$serverReady = $false
try {
  $r = Invoke-WebRequest -Uri "http://127.0.0.1:3005" -UseBasicParsing -TimeoutSec 2
  if ($r.StatusCode -eq 200) { $serverReady = $true }
} catch {
  $serverReady = $false
}

if (-not $serverReady) {
  Write-Output "Iniciando Next.js en puerto 3005..."
  Start-Process -FilePath "powershell.exe" -ArgumentList "-NoProfile -Command Set-Location '$workDir'; npx next start -p 3005 *> '$logNext'" -WindowStyle Hidden
  
  $attempts = 0
  while (-not $serverReady -and $attempts -lt 25) {
    Start-Sleep -Milliseconds 600
    $attempts++
    try {
      $r = Invoke-WebRequest -Uri "http://127.0.0.1:3005" -UseBasicParsing -TimeoutSec 2
      if ($r.StatusCode -eq 200) { $serverReady = $true }
    } catch {}
  }
}

if (-not $serverReady) {
  Write-Error "No se pudo iniciar Next.js en puerto 3005."
  exit 1
}

Write-Output "Servidor local Next.js activo en http://127.0.0.1:3005"

# 3. Start Cloudflare Tunnel
$cfExe = "$env:TEMP\cloudflared.exe"
Write-Output "Iniciando tunel Cloudflare Edge..."
Start-Process -FilePath $cfExe -ArgumentList "tunnel --no-autoupdate --no-prechecks --url http://127.0.0.1:3005 --http-host-header 127.0.0.1:3005 --logfile `"$logCf`"" -WindowStyle Hidden

# 4. Wait for URL in log
$foundUrl = ""
$waitCount = 0
while (-not $foundUrl -and $waitCount -lt 20) {
  Start-Sleep -Seconds 1
  $waitCount++
  if (Test-Path $logCf) {
    $content = Get-Content $logCf -Raw -ErrorAction SilentlyContinue
    if ($content -match '(https://[a-zA-Z0-9\-]+\.trycloudflare\.com)') {
      $foundUrl = $matches[1]
    }
  }
}

if ($foundUrl) {
  Write-Output "URL_EN_VIVO: $foundUrl"
  Start-Sleep -Seconds 2
  try {
    $headers = @{ "User-Agent" = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15" }
    $check = Invoke-WebRequest -Uri $foundUrl -Headers $headers -UseBasicParsing -TimeoutSec 10
    Write-Output "VERIFICACION_MOVIL: HTTP $($check.StatusCode) OK"
  } catch {
    Write-Output "VERIFICACION_MOVIL: Propagando DNS..."
  }
} else {
  Write-Error "No se pudo extraer la URL. Revisa $logCf"
}
