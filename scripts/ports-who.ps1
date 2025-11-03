Param(
  [int[]]$Ports = @(5173,5174)
)

Write-Host "Listeners on ports: $($Ports -join ', ')" -ForegroundColor Cyan
foreach ($p in $Ports) {
  try {
    $conns = Get-NetTCPConnection -State Listen -LocalPort $p -ErrorAction SilentlyContinue
    if (!$conns) { Write-Host "Port $p: <none>"; continue }
    foreach ($c in $conns) {
      $pid = $c.OwningProcess
      $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
      $cmd = try { (Get-CimInstance Win32_Process -Filter "ProcessId=$pid").CommandLine } catch { '' }
      Write-Host ("Port {0} -> PID {1} [{2}]" -f $p, $pid, ($proc?.ProcessName))
      if ($cmd) { Write-Host ("  CMD: {0}" -f $cmd) }
    }
  } catch {}
}

