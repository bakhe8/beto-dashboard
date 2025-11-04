import{define as d}from"./runtime.gEiicSNP.js";import{s as o}from"./store.FDtkuwoP.js";import{s as f}from"./dom.Bppo_qQO.js";import{a as u}from"./events.BRqanfQM.js";const b=e=>{const a=()=>{const n=o.get("toasts");f(e,n.map(s=>`
        <div class="toast" data-id="${s.id}" data-type="${s.type}" role="status" aria-live="polite">
          <p>${s.message}</p>
          <button class="toast-close" aria-label="Close">×</button>
        </div>
      `).join(""))},c=u(e,"click",".toast-close",(n,s)=>{var r;const t=s.closest(".toast"),m=((r=t==null?void 0:t.querySelector("p"))==null?void 0:r.textContent)??"",l=o.get("toasts");o.set("toasts",l.filter(p=>p.message!==m)),t==null||t.remove()}),i=o.on("toasts",a);return a(),()=>{c(),i()}};d("ToastContainer",b);export{b as ToastContainer};
