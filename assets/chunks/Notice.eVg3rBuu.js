import{define as s}from"./runtime.gEiicSNP.js";import{C as c}from"./morph.D2RopPs8.js";import"./BaseComponent.CGITZmRy.js";import"./store.FDtkuwoP.js";import"./dom.Bppo_qQO.js";const n=c.create("Notice",{render:({props:t,slots:o})=>{const i=t.type||"info",e=t.message||o.default||"";return`
      <div class="notice" data-type="${i}" role="status" aria-live="polite">
        <div class="notice-body">${e}</div>
        <button class="notice-close" aria-label="Dismiss notice">×</button>
      </div>
    `},events:{".notice-close":(t,o,{root:i})=>{var e;(e=o.closest(".notice"))==null||e.remove(),i.dispatchEvent(new CustomEvent("notice:closed",{bubbles:!0}))}}});s("Notice",n);export{n as default};
