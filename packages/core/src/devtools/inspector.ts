// Lightweight devtools overlay and performance HUD.
// Entire file is a no-op in production unless explicitly enabled via flags.

// Enable flags (any one):
//  - URL query: ?devtools=1 (component inspector)
//  - URL query: ?metrics=1 (perf HUD hooks; some metrics come from app-main.ts)
//  - localStorage: bdDevtools = '1' | 'true'

function enabled(): boolean {
  try {
    const qs = new URLSearchParams(location.search);
    if (qs.get('devtools') === '1') return true;
    const ls = (window.localStorage?.getItem('bdDevtools') || '').toLowerCase();
    if (ls === '1' || ls === 'true') return true;
  } catch {}
  return false;
}

if (typeof document !== 'undefined' && enabled()) {
  // Inject minimal styles
  const style = document.createElement('style');
  style.textContent = `
    .bd-devtools-highlight { outline: 2px solid #0046ff; outline-offset: 2px; }
    .bd-devtools-panel { position: fixed; right: 12px; bottom: 12px; z-index: 2147483646; font: 12px/1.3 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #111; }
    .bd-card { background:#fff; color:#111; border:1px solid #e5e7eb; border-radius:8px; box-shadow: 0 8px 24px rgba(0,0,0,.08); padding:10px; max-width: 320px; }
    .bd-row { margin: 4px 0; }
    .bd-badge { display:inline-block; padding:2px 6px; border-radius:6px; background:#eef2ff; color:#0046ff; font-weight:600; }
    .bd-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11px; }
    .bd-actions { display:flex; gap:6px; margin-top:8px; }
    .bd-btn { background:#0046ff; color:#fff; border:none; padding:6px 8px; border-radius:6px; cursor:pointer; }
    .bd-btn.secondary { background:#eef2ff; color:#111; }
    @media (prefers-color-scheme: dark) {
      .bd-card { background:#0d1117; color:#e6edf3; border-color:#30363d; }
      .bd-mono { color:#c9d1d9; }
    }
  `;
  document.head.appendChild(style);

  let lastHighlight: HTMLElement | null = null;

  function nearestComponent(el: Element | null): HTMLElement | null {
    while (el && el instanceof HTMLElement) {
      if (el.matches('[data-component]')) return el;
      el = el.parentElement;
    }
    return null;
  }

  // Floating panel
  const panel = document.createElement('div');
  panel.className = 'bd-devtools-panel';
  panel.innerHTML = `<div class="bd-card"><div class="bd-row"><span class="bd-badge">Beto Devtools</span></div><div class="bd-row bd-mono" id="bd-info">Hover any component…</div><div class="bd-actions"><button class="bd-btn secondary" id="bd-copy">Copy JSON</button><button class="bd-btn" id="bd-freeze">Freeze</button></div></div>`;
  document.body.appendChild(panel);
  const info = panel.querySelector('#bd-info') as HTMLElement;
  const btnCopy = panel.querySelector('#bd-copy') as HTMLButtonElement;
  const btnFreeze = panel.querySelector('#bd-freeze') as HTMLButtonElement;
  let frozen = false;

  function describe(el: HTMLElement | null) {
    if (!el) { info.textContent = 'Hover any component…'; return; }
    const name = el.getAttribute('data-component') || 'unknown';
    let props: any = {};
    try { props = el.dataset.props ? JSON.parse(el.dataset.props) : {}; } catch {}
    const slots = Array.from(el.querySelectorAll('template[data-slot]')).map(t => (t as HTMLElement).getAttribute('data-slot'));
    info.textContent = `${name}  props=${JSON.stringify(props)}  slots=${JSON.stringify(slots)}`;
    (info as any)._json = { name, props, slots };
  }

  document.addEventListener('mousemove', (ev) => {
    if (frozen) return;
    const target = ev.target as Element | null;
    const comp = nearestComponent(target);
    if (comp !== lastHighlight) {
      lastHighlight?.classList.remove('bd-devtools-highlight');
      lastHighlight = comp;
      comp?.classList.add('bd-devtools-highlight');
      describe(comp);
    }
  }, true);

  btnCopy.addEventListener('click', async () => {
    const json = (info as any)._json ? JSON.stringify((info as any)._json, null, 2) : '{}';
    try { await navigator.clipboard.writeText(json); btnCopy.textContent = 'Copied'; setTimeout(()=>btnCopy.textContent='Copy JSON',1000); } catch {}
  });
  btnFreeze.addEventListener('click', () => { frozen = !frozen; btnFreeze.textContent = frozen ? 'Unfreeze' : 'Freeze'; });

  // Performance HUD (basic FPS + counters)
  const qs = new URLSearchParams(location.search);
  if (qs.get('metrics') === '1') {
    const hud = document.createElement('div');
    hud.className = 'bd-devtools-panel';
    hud.style.right = '12px';
    hud.style.bottom = '120px';
    hud.innerHTML = `<div class="bd-card bd-mono" id="bd-hud">FPS: --\nrenderCycles: --\nreflows: --</div>`;
    document.body.appendChild(hud);
    const box = hud.querySelector('#bd-hud') as HTMLElement;
    // FPS meter
    let frames = 0; let last = performance.now();
    function loop(t: number){
      frames++;
      if (t - last >= 1000){
        const fps = frames; frames = 0; last = t;
        const m = (window as any).__BD_METRICS || {};
        box.textContent = `FPS: ${fps}\nrenderCycles: ${m.renderCycles ?? '--'}\nreflows: ${m.reflows ?? '--'}`;
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
}

