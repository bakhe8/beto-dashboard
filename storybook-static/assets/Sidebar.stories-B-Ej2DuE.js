const n={title:"Components/Sidebar (static)"},a={render:()=>`
  <aside data-component="Sidebar" data-state="default">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Menu</h2>
      <button class="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </aside>`},e={render:()=>`
  <aside data-component="Sidebar" data-state="collapsed">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Menu</h2>
      <button class="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </aside>`};var s,r,l;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => \`
  <aside data-component="Sidebar" data-state="default">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Menu</h2>
      <button class="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </aside>\`
}`,...(l=(r=a.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};var i,t,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => \`
  <aside data-component="Sidebar" data-state="collapsed">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Menu</h2>
      <button class="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </aside>\`
}`,...(d=(t=e.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};const o=["Default","Collapsed"];export{e as Collapsed,a as Default,o as __namedExportsOrder,n as default};
