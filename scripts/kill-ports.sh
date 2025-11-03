#!/usr/bin/env bash
set -euo pipefail
ports=("${@:-5173}" "${@:-5174}")
echo "Killing listeners on ports: ${ports[@]}"
for p in 5173 5174; do
  if lsof -i :$p -t >/dev/null 2>&1; then
    echo "Killing PID(s) on port $p"
    lsof -i :$p -t | xargs -r kill -9 || true
  fi
done

