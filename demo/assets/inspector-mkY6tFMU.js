function x(){try{if(new URLSearchParams(location.search).get("devtools")==="1")return!0;const s=(window.localStorage?.getItem("bdDevtools")||"").toLowerCase();if(s==="1"||s==="true")return!0}catch{}return!1}if(typeof document<"u"&&x()){let p=function(e){for(;e&&e instanceof HTMLElement;){if(e.matches("[data-component]"))return e;e=e.parentElement}return null},s=function(e){if(!e){d.textContent="Hover any component…";return}const t=e.getAttribute("data-component")||"unknown";let o={};try{o=e.dataset.props?JSON.parse(e.dataset.props):{}}catch{}const r=Array.from(e.querySelectorAll("template[data-slot]")).map(i=>i.getAttribute("data-slot"));d.textContent=`${t}  props=${JSON.stringify(o)}  slots=${JSON.stringify(r)}`,d._json={name:t,props:o,slots:r}};const b=document.createElement("style");b.textContent=`
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
  `,document.head.appendChild(b);let c=null;const n=document.createElement("div");n.className="bd-devtools-panel",n.innerHTML='<div class="bd-card"><div class="bd-row"><span class="bd-badge">Beto Devtools</span></div><div class="bd-row bd-mono" id="bd-info">Hover any component…</div><div class="bd-actions"><button class="bd-btn secondary" id="bd-copy">Copy JSON</button><button class="bd-btn" id="bd-freeze">Freeze</button></div></div>',document.body.appendChild(n);const d=n.querySelector("#bd-info"),l=n.querySelector("#bd-copy"),f=n.querySelector("#bd-freeze");let a=!1;if(document.addEventListener("mousemove",e=>{if(a)return;const t=e.target,o=p(t);o!==c&&(c?.classList.remove("bd-devtools-highlight"),c=o,o?.classList.add("bd-devtools-highlight"),s(o))},!0),l.addEventListener("click",async()=>{const e=d._json?JSON.stringify(d._json,null,2):"{}";try{await navigator.clipboard.writeText(e),l.textContent="Copied",setTimeout(()=>l.textContent="Copy JSON",1e3)}catch{}}),f.addEventListener("click",()=>{a=!a,f.textContent=a?"Unfreeze":"Freeze"}),new URLSearchParams(location.search).get("metrics")==="1"){let e=function(u){if(r++,u-i>=1e3){const g=r;r=0,i=u;const m=window.__BD_METRICS||{};o.textContent=`FPS: ${g}
renderCycles: ${m.renderCycles??"--"}
reflows: ${m.reflows??"--"}`}requestAnimationFrame(e)};const t=document.createElement("div");t.className="bd-devtools-panel",t.style.right="12px",t.style.bottom="120px",t.innerHTML=`<div class="bd-card bd-mono" id="bd-hud">FPS: --
renderCycles: --
reflows: --</div>`,document.body.appendChild(t);const o=t.querySelector("#bd-hud");let r=0,i=performance.now();requestAnimationFrame(e)}}
