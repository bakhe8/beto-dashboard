function r(l,a){const n=document.activeElement,e=document.createElement("div");e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.className="fixed inset-0 bg-black/50 flex items-center justify-center z-50",e.tabIndex=-1;const c=`modalbasic-title-${Math.random().toString(36).slice(2)}`;e.setAttribute("aria-labelledby",c),e.innerHTML=`
    <div class="bg-white rounded-lg p-6 shadow-xl w-96 max-w-full mx-4 relative" role="document">
      <h2 id="${c}" class="text-xl font-semibold mb-4">${a.title||"Modal"}</h2>
      <div class="modal-content">
        <slot></slot>
      </div>
      <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors" aria-label="Close modal">&times;</button>
    </div>`;const s=e.querySelector("button"),i=()=>{e.remove(),document.removeEventListener("keydown",t),window.removeEventListener("keydown",t);const o=document.getElementById("open-basic-modal-btn");setTimeout(()=>{let d=!1;try{n&&typeof n.focus=="function"&&(n.focus(),d=document.activeElement===n)}catch{}if(!d)try{o?.focus()}catch{}},0)},t=o=>{o.key==="Escape"&&(o.preventDefault(),i())};return document.addEventListener("keydown",t,!0),window.addEventListener("keydown",t,!0),s?.addEventListener("click",i),e.addEventListener("click",o=>{o.target===e&&i()}),l.appendChild(e),setTimeout(()=>{try{e.focus()}catch{}s?.focus()},100),{close:()=>{e.remove(),s?.removeEventListener("click",i),document.removeEventListener("keydown",t),window.removeEventListener("keydown",t)}}}export{r as M};
