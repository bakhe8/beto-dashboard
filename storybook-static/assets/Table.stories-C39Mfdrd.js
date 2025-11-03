const h={title:"Components/Table (static)"},t={render:()=>`
  <div class="table-wrapper">
    <table>
      <thead>
        <tr><th>Name</th><th>Role</th></tr>
      </thead>
      <tbody>
        <tr><td>John Doe</td><td>Admin</td></tr>
        <tr><td>Jane Smith</td><td>Editor</td></tr>
      </tbody>
    </table>
  </div>`},e={render:()=>`
  <div class="table-wrapper">
    <table>
      <thead>
        <tr><th>Name</th><th>Role</th></tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    <p>No rows.</p>
  </div>`};var r,a,d;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
  <div class="table-wrapper">
    <table>
      <thead>
        <tr><th>Name</th><th>Role</th></tr>
      </thead>
      <tbody>
        <tr><td>John Doe</td><td>Admin</td></tr>
        <tr><td>Jane Smith</td><td>Editor</td></tr>
      </tbody>
    </table>
  </div>\`
}`,...(d=(a=t.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};var n,o,s;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => \`
  <div class="table-wrapper">
    <table>
      <thead>
        <tr><th>Name</th><th>Role</th></tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    <p>No rows.</p>
  </div>\`
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const l=["WithData","Empty"];export{e as Empty,t as WithData,l as __namedExportsOrder,h as default};
