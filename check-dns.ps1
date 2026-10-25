# Checks whether the domain is correctly pointed at GitHub Pages.
# Run it from this folder:   powershell -ExecutionPolicy Bypass -File .\check-dns.ps1

$domain  = "nitheesh920.qd.je"
$expected = @("185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153")

Write-Host "`nChecking $domain ...`n" -ForegroundColor Cyan

$found = @()
try {
    $found = (Resolve-DnsName -Name $domain -Type A -Server 8.8.8.8 -ErrorAction Stop |
              Where-Object { $_.IPAddress } | Select-Object -ExpandProperty IPAddress)
} catch {
    Write-Host "No A records found yet. DNS has not been added or is still propagating." -ForegroundColor Yellow
    exit 1
}

$missing = $expected | Where-Object { $found -notcontains $_ }

Write-Host "A records found: $($found -join ', ')"
if ($missing.Count -eq 0) {
    Write-Host "All 4 GitHub IPs present. DNS is correct." -ForegroundColor Green
} else {
    Write-Host "Missing: $($missing -join ', ')" -ForegroundColor Yellow
}

Write-Host "`nChecking www ..." -ForegroundColor Cyan
try {
    $www = (Resolve-DnsName -Name "www.$domain" -Type CNAME -Server 8.8.8.8 -ErrorAction Stop |
            Where-Object { $_.NameHost } | Select-Object -First 1 -ExpandProperty NameHost)
    if ($www) { Write-Host "www -> $www" -ForegroundColor Green }
} catch {
    Write-Host "No www CNAME yet (optional, but nice to have)." -ForegroundColor Yellow
}

Write-Host "`nChecking HTTPS ..." -ForegroundColor Cyan
try {
    $r = Invoke-WebRequest -Uri "https://$domain/" -UseBasicParsing -TimeoutSec 20
    Write-Host "https://$domain/ -> $($r.StatusCode) OK" -ForegroundColor Green
    if ($r.Content -match "<title>(.*?)</title>") {
        Write-Host "Page title: $($Matches[1])" -ForegroundColor Green
    }
} catch {
    Write-Host "HTTPS not ready yet. GitHub issues the certificate after DNS works; can take up to a few hours." -ForegroundColor Yellow
}
Write-Host ""
