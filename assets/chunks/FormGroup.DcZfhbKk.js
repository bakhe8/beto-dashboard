import{define as l}from"./runtime.gEiicSNP.js";import{C as u}from"./morph.D2RopPs8.js";import"./BaseComponent.CGITZmRy.js";import"./store.FDtkuwoP.js";import"./dom.Bppo_qQO.js";const m=u.create("FormGroup",{render:({props:e})=>{const t=e.type||"text",a=e.label||e.name,n=e.value||"",r=e.placeholder||"",o=e.required?"required":"";return`
      <div class="form-group">
        <label for="fg-${e.name}">${a}</label>
        <input id="fg-${e.name}" name="${e.name}" type="${t}" value="${n}" placeholder="${r}" ${o} />
      </div>
    `},events:{"input:input":(e,t,{root:a,props:n})=>{const r=t;a.dispatchEvent(new CustomEvent("form:update",{bubbles:!0,detail:{name:n.name,value:r.value}}))}}});l("FormGroup",m);export{m as default};
