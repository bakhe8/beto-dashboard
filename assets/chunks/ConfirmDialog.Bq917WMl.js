import{define as a}from"./runtime.gEiicSNP.js";import{C as d}from"./morph.D2RopPs8.js";import"./BaseComponent.CGITZmRy.js";import"./store.FDtkuwoP.js";import"./dom.Bppo_qQO.js";const l=d.create("ConfirmDialog",{render:({props:t,slots:c})=>{const e=t.title||"Confirm",i=t.message||c.default||"",n=t.confirmLabel||"Confirm",o=t.cancelLabel||"Cancel";return`
      <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="cd-title" aria-describedby="cd-desc">
        <div class="cd-header"><h3 id="cd-title">${e}</h3></div>
        <div id="cd-desc" class="cd-body">${i}</div>
        <div class="cd-footer">
          <button type="button" class="cd-cancel">${o}</button>
          <button type="button" class="cd-confirm">${n}</button>
        </div>
      </div>
    `},events:{"click:.cd-confirm":(t,c,{root:e})=>{e.dispatchEvent(new CustomEvent("confirm:ok",{bubbles:!0})),e.innerHTML=""},"click:.cd-cancel":(t,c,{root:e})=>{e.dispatchEvent(new CustomEvent("confirm:cancel",{bubbles:!0})),e.innerHTML=""}}});a("ConfirmDialog",l);export{l as default};
