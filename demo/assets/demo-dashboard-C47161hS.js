const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-C6T8AfKs.js","./ChartWidget-DSiWwCac.js","./demo-Bm_NOEom.js","./demo-CG4JlaaA.css","./ModalBasic-hXqThWwD.js"])))=>i.map(i=>d[i]);
import{o as S,a as w,n as y,b as k,m as b,s as L}from"./ChartWidget-DSiWwCac.js";import{t as E}from"./demo-Bm_NOEom.js";import"./inspector-mkY6tFMU.js";const T="modulepreload",q=function(e,t){return new URL(e,t).href},A={},D=function(t,s,o){let r=Promise.resolve();if(s&&s.length>0){let v=function(i){return Promise.all(i.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");r=v(s.map(i=>{if(i=q(i,o),i in A)return;A[i]=!0;const u=i.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(o)for(let f=a.length-1;f>=0;f--){const g=a[f];if(g.href===i&&(!u||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${d}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":T,u||(m.as="script"),m.crossOrigin="",m.href=i,c&&m.setAttribute("nonce",c),document.head.appendChild(m),u)return new Promise((f,g)=>{m.addEventListener("load",f),m.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${i}`)))})}))}function p(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return r.then(a=>{for(const l of a||[])l.status==="rejected"&&p(l.reason);return t().catch(p)})},M=S({id:y(),name:w(),role:w()}),P=k(M),N=S({kpis:S({users:y(),active:y(),sales:y(),conversion:y()}),series:S({labels:k(w()),values:k(y())})}),x=[{id:1,name:"Alice Johnson",role:"Admin"},{id:2,name:"Bob Smith",role:"Editor"},{id:3,name:"Charlie Kim",role:"Viewer"},{id:4,name:"Dana Lee",role:"Editor"},{id:5,name:"Evan Diaz",role:"Viewer"},{id:6,name:"Farah Ali",role:"Admin"},{id:7,name:"George Xu",role:"Viewer"},{id:8,name:"Hana Park",role:"Editor"}],U={users:1280,active:932,sales:246,conversion:4.2},_={labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],values:[120,160,180,220,200,140,100]},I={kpis:U,series:_};async function O(){return P.parse(x)}async function R(){return N.parse(I)}const n={users:[],sortKey:"name",sortDir:"asc",page:1,pageSize:5,search:""};async function B(){n.users.length||(n.users=await O())}function H(){const{users:e,sortKey:t,sortDir:s,search:o}=n;return(o?e.filter(a=>a.name.toLowerCase().includes(o.toLowerCase())):e).slice().sort((a,l)=>{const c=String(a[t]).toLowerCase(),v=String(l[t]).toLowerCase();return c<v?s==="asc"?-1:1:c>v?s==="asc"?1:-1:0})}function h(e){const t=H(),s=(n.page-1)*n.pageSize,o=t.slice(s,s+n.pageSize);e.innerHTML=`
    <h2>Users</h2>
    <div class="toolbar">
      <input id="search" placeholder="Search users..." value="${n.search}" />
      <button id="sort-name">Sort: Name (${n.sortDir})</button>
      <button id="sort-role">Sort: Role (${n.sortDir})</button>
    </div>
    <div
      data-component="Table"
      data-props='${JSON.stringify({columns:[{key:"name",label:"Name"},{key:"role",label:"Role"},{key:"actions",label:"Actions"}],data:o.map(a=>({...a,actions:`<button class="row-delete" data-id="${a.id}">Delete</button>`}))})}'
    ></div>
    <div class="pager">
      <button id="prev" ${n.page===1?"disabled":""}>Prev</button>
      <span>Page ${n.page} / ${Math.max(1,Math.ceil(t.length/n.pageSize))}</span>
      <button id="next" ${s+n.pageSize>=t.length?"disabled":""}>Next</button>
    </div>
  `,b();const r=document.getElementById("dialogs");let p=null;e.querySelectorAll(".row-edit").forEach(a=>{a.addEventListener("click",()=>{if(!r)return;const l=Number(a.dataset.id),c=n.users.find(d=>d.id===l);if(!c)return;r.innerHTML=`
        <div data-component="ConfirmDialog" data-props='{"title":"Edit user","confirmLabel":"Save","cancelLabel":"Cancel"}'>
          <template data-slot="default">
            <div class="cd-form">
              <label>Name <input id="edit-name" value="${c.name}" /></label>
              <label>Role
                <select id="edit-role">${["Admin","Editor","Viewer"].map(d=>`<option value="${d}" ${d===c.role?"selected":""}>${d}</option>`).join("")}</select>
              </label>
            </div>
          </template>
        </div>`,b();const v=()=>{const d=r.querySelector("#edit-name"),m=r.querySelector("#edit-role");if(d&&m){const f=d.value.trim(),g=m.value;f?(c.name=f,c.role=g,E.success("User updated"),h(e)):E.warning("Name is required")}u()},i=()=>u();function u(){r&&(r.innerHTML="",r.removeEventListener("confirm:ok",v),r.removeEventListener("confirm:cancel",i))}r.addEventListener("confirm:ok",v,{once:!0}),r.addEventListener("confirm:cancel",i,{once:!0})})}),e.querySelectorAll(".row-delete").forEach(a=>{a.addEventListener("click",()=>{const l=Number(a.dataset.id);if(!r)return;p=l,r.innerHTML=`
        <div data-component="ConfirmDialog" data-props='{"title":"Delete user","message":"Are you sure you want to delete this user?","confirmLabel":"Delete","cancelLabel":"Cancel"}'></div>
      `,b();const c=()=>{p!=null&&(n.users=n.users.filter(u=>u.id!==p),E.success("User deleted"),h(e)),i()},v=()=>{i()};function i(){r.innerHTML="",r.removeEventListener("confirm:ok",c),r.removeEventListener("confirm:cancel",v),p=null}r.addEventListener("confirm:ok",c,{once:!0}),r.addEventListener("confirm:cancel",v,{once:!0})})}),e.querySelector("#sort-name")?.addEventListener("click",()=>{n.sortKey="name",n.sortDir=n.sortDir==="asc"?"desc":"asc",h(e)}),e.querySelector("#sort-role")?.addEventListener("click",()=>{n.sortKey="role",n.sortDir=n.sortDir==="asc"?"desc":"asc",h(e)}),e.querySelector("#search")?.addEventListener("input",a=>{n.search=a.target.value,n.page=1,h(e)}),e.querySelector("#prev")?.addEventListener("click",()=>{n.page=Math.max(1,n.page-1),h(e)}),e.querySelector("#next")?.addEventListener("click",()=>{n.page+=1,h(e)})}async function V(e){const t=await R(),s=t.kpis;e.innerHTML=`
    <h2>Overview</h2>
    <div class="cards">
      <div data-component="Card" data-props='{"title":"Users"}'><template data-slot="default"><strong>${s.users}</strong></template></div>
      <div data-component="Card" data-props='{"title":"Active"}'><template data-slot="default"><strong>${s.active}</strong></template></div>
      <div data-component="Card" data-props='{"title":"Sales"}'><template data-slot="default"><strong>${s.sales}</strong></template></div>
      <div data-component="Card" data-props='{"title":"Conversion"}'><template data-slot="default"><strong>${s.conversion}%</strong></template></div>
    </div>
    <div data-component="ChartWidget" data-props='${JSON.stringify({labels:t.series.labels,data:t.series.values,title:"Weekly Activity"})}'></div>
  `,b()}function z(e){e.innerHTML=`
    <h2>Settings</h2>
    <section class="toolbar" style="margin:8px 0;">
      <label><input type="checkbox" id="rtl-toggle" /> RTL</label>
    </section>
    <div data-component="ThemeSwitcher"></div>
    <h3 style="margin-top:12px;">Profile</h3>
    <div data-component="FormGroupValidated" data-props='{"name":"username","label":"Username","minLength":3,"placeholder":"yourname"}'></div>
    <div data-component="FormGroupValidated" data-props='{"name":"email","label":"Email","pattern":"^.+@.+\\..+$","placeholder":"you@example.com"}'></div>
    <button id="save-profile">Save</button>
  `,b();const t=document.getElementById("rtl-toggle");t.checked=document.documentElement.getAttribute("dir")==="rtl",t.addEventListener("change",()=>{const s=t.checked?"rtl":"ltr";D(async()=>{const{store:o}=await import("./index-C6T8AfKs.js");return{store:o}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({store:o})=>o.set("dir",s))}),document.getElementById("save-profile")?.addEventListener("click",()=>{const s=document.querySelector("#fgv-username"),o=document.querySelector("#fgv-email"),r=s?.value?.trim(),p=o?.value?.trim();if(!r||!p){E.warning("Please fill all fields");return}D(async()=>{const{store:a}=await import("./index-C6T8AfKs.js");return{store:a}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({store:a})=>{a.set("user",{id:"1",name:r}),E.success("Profile saved")})})}function j(e){e.innerHTML=`
    <h2>Lab</h2>
    <div data-component="Card" data-props='{"title":"Experimental"}'>
      <template data-slot="default">
        <p>Experimental widgets will appear here when enabled.</p>
      </template>
    </div>
  `,b()}function F(e){const t=document.getElementById("breadcrumb");t&&(t.textContent=e.join(" / "),document.title=`BetoDashboard — ${e[0]||"Overview"}`)}function K(e){document.querySelectorAll("nav a").forEach(t=>{(t.getAttribute("href")||"").replace(/^#\//,"").startsWith(e)?t.classList.add("active"):t.classList.remove("active")})}async function W(){await B();const e=document.getElementById("route-content"),t=()=>{const o=(location.hash.replace(/^#\//,"")||"overview").split("/");switch(F(o),K(o[0]),o[0]){case"users":h(e);break;case"settings":z(e);break;case"lab":j(e);break;default:V(e)}};window.addEventListener("hashchange",t),t()}W();function C(){document.documentElement.setAttribute("dir",L.get("dir"))}C();L.on("dir",C);function $(e){const t=document.documentElement;if(e==="auto"){const s=window.matchMedia("(prefers-color-scheme: dark)").matches;t.dataset.theme=s?"dark":"light"}else t.dataset.theme=e}$(L.get("theme"));L.on("theme",e=>$(e));const G=window.matchMedia("(prefers-color-scheme: dark)");G.addEventListener("change",()=>{L.get("theme")==="auto"&&$("auto")});
