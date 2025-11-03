Param(
  [int[]]$Ports = @(5173,5174)
)

function Get-PidTree {
  param([int]$Pid)
  $seen = New-Object System.Collections.Generic.HashSet[int]
  $result = New-Object System.Collections.Generic.List[int]
  $queue = New-Object System.Collections.Generic.Queue[int]
  $queue.Enqueue($Pid)
  while ($queue.Count -gt 0) {
    $cur = $queue.Dequeue()
    if ($seen.Add($cur)) {
      $result.Add($cur)
      try {
        $children = Get-CimInstance Win32_Process -Filter "ParentProcessId=$cur" | Select-Object -ExpandProperty ProcessId -ErrorAction SilentlyContinue
        foreach ($c in $children) { $queue.Enqueue([int]$c) }
      } catch {}
    }
  }
  return $result
}

Write-Host "Killing listeners on ports: $($Ports -join ', ')"
foreach ($p in $Ports) {
  try {
    # Gather PIDs bound to the port via netstat and Get-NetTCPConnection
    $pids = @()
    try {
      $conns = Get-NetTCPConnection -State Listen -LocalPort $p -ErrorAction SilentlyContinue
      if ($conns) { $pids += ($conns | Select-Object -ExpandProperty OwningProcess) }
    } catch {}
    $lines = netstat -ano | Select-String -Pattern ":$p\s"
    foreach ($l in $lines) {
      $parts = ($l.ToString() -split '\s+') | Where-Object { $_ -ne '' }
      if ($parts.Length -ge 5) { $pids += $parts[-1] }
    }
    $pids = $pids | Where-Object { $_ -match '^[0-9]+$' } | ForEach-Object { [int]$_ } | Select-Object -Unique

    foreach ($pid in $pids) {
      $tree = Get-PidTree -Pid $pid
      foreach ($tp in ($tree | Sort-Object -Descending)) {
        try {
          $proc = Get-Process -Id $tp -ErrorAction SilentlyContinue
          if ($proc) { Write-Host "Killing PID $tp ($($proc.ProcessName)) from port $p" }
          Stop-Process -Id $tp -Force -ErrorAction SilentlyContinue
        } catch {}
      }
    }

    # As a fallback, kill lingering vite preview/node processes referencing the demo config
    $procs = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object {
      ($_.CommandLine -match 'vite(\.cmd)?\s+preview' -or $_.CommandLine -match 'vite(\.cmd)?\s+--config') -and ($_.CommandLine -match 'examples/betodashboard-demo')
    }
    foreach ($pinfo in $procs) {
      try {
        Write-Host "Killing lingering process PID $($pinfo.ProcessId): $($pinfo.CommandLine)"
        Stop-Process -Id $pinfo.ProcessId -Force -ErrorAction SilentlyContinue
      } catch {}
    }
  } catch {}
}

