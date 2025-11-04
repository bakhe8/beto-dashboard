import{define as a}from"./runtime.gEiicSNP.js";import{C as d}from"./morph.D2RopPs8.js";import"./BaseComponent.CGITZmRy.js";import"./store.FDtkuwoP.js";import"./dom.Bppo_qQO.js";const c=d.create("Card",{render:({props:r,slots:t})=>{const e=r.title||"",o=r.footer||"";return`
      <section class="card">
        ${e?`<header class="card-header">${e}</header>`:""}
        <div class="card-body">${t.default||""}</div>
        ${o?`<footer class="card-footer">${o}</footer>`:""}
      </section>
    `}});a("Card",c);export{c as default};
