Param(
  [int[]]$Ports = @(5173,5174)
)

Write-Host "Killing listeners on ports: $($Ports -join ', ')"
foreach ($p in $Ports) {
  try {
    $lines = netstat -ano | Select-String -Pattern ":$p\s"
    $pids = @()
    foreach ($l in $lines) {
      $parts = ($l.ToString() -split '\s+') | Where-Object { $_ -ne '' }
      if ($parts.Length -ge 5) { $pids += $parts[-1] }
    }
    $pids = $pids | Select-Object -Unique
    foreach ($pid in $pids) {
      Write-Host "Killing PID $pid on port $p"
      cmd /c "taskkill /PID $pid /F >NUL 2>&1"
    }
  } catch {}
}

