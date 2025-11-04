import{define as d}from"./runtime.gEiicSNP.js";import{s as r}from"./store.FDtkuwoP.js";import{s as c}from"./dom.Bppo_qQO.js";const o=[{href:"#",label:"Dashboard"},{href:"#",label:"Users"},{href:"#",label:"Settings"}],b=e=>{const t=()=>{const a=r.get("sidebar");e.dataset.state=a;const l=o.map(s=>`<li><a href="${s.href}">${s.label}</a></li>`).join("");c(e,`
      <header class="sidebar-header">
        <h2 class="sidebar-title">Beto</h2>
        <button class="sidebar-toggle" aria-label="Toggle sidebar" aria-controls="sidebar-nav" aria-expanded="${a!=="collapsed"}">☰</button>
      </header>
      <nav id="sidebar-nav" class="sidebar-nav">
        <ul>${l}</ul>
      </nav>
    `)},n=a=>{if(a.target.closest(".sidebar-toggle")){const s=r.get("sidebar")==="collapsed"?"default":"collapsed";r.set("sidebar",s)}};e.addEventListener("click",n);const i=r.on("sidebar",t);return t(),()=>{e.removeEventListener("click",n),i()}};d("Sidebar",b);export{b as Sidebar};
