import { mountAll } from '@core/components/runtime';
import '@core/components/Table';
import '@core/components/Card';
import '@core/components/ChartWidget';
// Advanced widgets are omitted in this worktree to avoid missing-module build failures.
// If/when they exist under packages/core/src/components, re-enable these imports.
// import '@core/components/AdaptiveGrid';
// import '@core/components/WidgetHost';
// import '@core/components/ThemeLab';
// import '@core/components/InsightWidget';
// import '@core/components/StreamChartWidget';
// import '@core/components/SplitPane';
import { toast } from '@core';
import { getUsers, getAnalytics } from './api';
import type { User } from './schemas';

const state = {
  users: [] as User[],
  sortKey: 'name' as keyof User,
  sortDir: 'asc' as 'asc' | 'desc',
  page: 1,
  pageSize: 5,
  search: ''
};

async function loadUsers() { if (!state.users.length) state.users = await getUsers(); }

function sortedFiltered(): User[] {
  const { users, sortKey, sortDir, search } = state;
  const filtered = search ? users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())) : users;
  const sorted = filtered.slice().sort((a, b) => {
    const av = String(a[sortKey]).toLowerCase();
    const bv = String(b[sortKey]).toLowerCase();
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

function renderUsers(root: HTMLElement) {
  const data = sortedFiltered();
  const start = (state.page - 1) * state.pageSize;
  const slice = data.slice(start, start + state.pageSize);
  root.innerHTML = `
    <h2>Users</h2>
    <div class="toolbar">
      <input id="search" placeholder="Search users..." value="${state.search}" />
      <button id="sort-name">Sort: Name (${state.sortDir})</button>
      <button id="sort-role">Sort: Role (${state.sortDir})</button>
    </div>
    <div
      data-component="Table"
      data-props='${JSON.stringify({ columns: [{ key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "actions", label: "Actions" }], data: slice.map(u => ({...u, actions: `<button class="row-delete" data-id="${u.id}">Delete</button>`})) })}'
    ></div>
    <div class="pager">
      <button id="prev" ${state.page === 1 ? 'disabled' : ''}>Prev</button>
      <span>Page ${state.page} / ${Math.max(1, Math.ceil(data.length / state.pageSize))}</span>
      <button id="next" ${start + state.pageSize >= data.length ? 'disabled' : ''}>Next</button>
    </div>
  `;
  mountAll();
  // Dialog host and state for destructive actions / edit modal
  const dialogs = document.getElementById('dialogs') as HTMLElement | null;
  let pendingDeleteId: number | null = null;

  // Inline edit via modal dialog (ConfirmDialog with inputs)
  root.querySelectorAll<HTMLButtonElement>('.row-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!dialogs) return;
      const id = Number(btn.dataset.id);
      const user = state.users.find(u => u.id === id);
      if (!user) return;
      dialogs.innerHTML = `
        <div data-component=\"ConfirmDialog\" data-props='{"title":"Edit user","confirmLabel":"Save","cancelLabel":"Cancel"}'>
          <template data-slot=\"default\">
            <div class=\"cd-form\">
              <label>Name <input id=\"edit-name\" value=\"${user.name}\" /></label>
              <label>Role
                <select id=\"edit-role\">${['Admin','Editor','Viewer'].map(r => `<option value=\"${r}\" ${r===user.role?'selected':''}>${r}</option>`).join('')}</select>
              </label>
            </div>
          </template>
        </div>`;
      mountAll();
      const onOk = () => {
        const nameEl = dialogs.querySelector('#edit-name') as HTMLInputElement | null;
        const roleEl = dialogs.querySelector('#edit-role') as HTMLSelectElement | null;
        if (nameEl && roleEl) {
          const nm = nameEl.value.trim();
          const rl = roleEl.value;
          if (nm) {
            user.name = nm;
            user.role = rl as any;
            toast.success('User updated');
            renderUsers(root);
          } else {
            toast.warning('Name is required');
          }
        }
        cleanup();
      };
      const onCancel = () => cleanup();
      function cleanup() {
        if (!dialogs) return;
        dialogs.innerHTML = '';
        dialogs.removeEventListener('confirm:ok' as any, onOk as any);
        dialogs.removeEventListener('confirm:cancel' as any, onCancel as any);
      }
      dialogs.addEventListener('confirm:ok' as any, onOk as any, { once: true });
      dialogs.addEventListener('confirm:cancel' as any, onCancel as any, { once: true });
    });
  });
  // (Removed) legacy inline injection of an Edit button; edit is handled by the ConfirmDialog modal above.
  // (Removed) legacy prompt-based edit flow; we now use a modal editor.
  root.querySelectorAll<HTMLButtonElement>('.row-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      if (!dialogs) return;
      pendingDeleteId = id;
      dialogs.innerHTML = `
        <div data-component="ConfirmDialog" data-props='{"title":"Delete user","message":"Are you sure you want to delete this user?","confirmLabel":"Delete","cancelLabel":"Cancel"}'></div>
      `;
      mountAll();
      const onOk = () => {
        if (pendingDeleteId != null) {
          state.users = state.users.filter(u => u.id !== pendingDeleteId);
          toast.success('User deleted');
          renderUsers(root);
        }
        cleanup();
      };
      const onCancel = () => { cleanup(); };
      function cleanup() {
        dialogs.innerHTML = '';
        dialogs.removeEventListener('confirm:ok' as any, onOk as any);
        dialogs.removeEventListener('confirm:cancel' as any, onCancel as any);
        pendingDeleteId = null;
      }
      dialogs.addEventListener('confirm:ok' as any, onOk as any, { once: true });
      dialogs.addEventListener('confirm:cancel' as any, onCancel as any, { once: true });
    });
  });
  root.querySelector<HTMLButtonElement>('#sort-name')?.addEventListener('click', () => {
    state.sortKey = 'name';
    state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    renderUsers(root);
  });
  root.querySelector<HTMLButtonElement>('#sort-role')?.addEventListener('click', () => {
    state.sortKey = 'role';
    state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    renderUsers(root);
  });
  root.querySelector<HTMLInputElement>('#search')?.addEventListener('input', (e) => {
    state.search = (e.target as HTMLInputElement).value;
    state.page = 1;
    renderUsers(root);
  });
  root.querySelector<HTMLButtonElement>('#prev')?.addEventListener('click', () => { state.page = Math.max(1, state.page - 1); renderUsers(root); });
  root.querySelector<HTMLButtonElement>('#next')?.addEventListener('click', () => { state.page += 1; renderUsers(root); });
}

async function renderOverview(root: HTMLElement) {
  const analytics = await getAnalytics();
  const k = analytics.kpis;
  root.innerHTML = `
    <h2>Overview</h2>
    <div class="cards">
      <div data-component="Card" data-props='{"title":"Users"}'><template data-slot="default"><strong>${k.users}</strong></template></div>
      <div data-component="Card" data-props='{"title":"Active"}'><template data-slot="default"><strong>${k.active}</strong></template></div>
      <div data-component="Card" data-props='{"title":"Sales"}'><template data-slot="default"><strong>${k.sales}</strong></template></div>
      <div data-component="Card" data-props='{"title":"Conversion"}'><template data-slot="default"><strong>${k.conversion}%</strong></template></div>
    </div>
    <div data-component="ChartWidget" data-props='${JSON.stringify({ labels: analytics.series.labels, data: analytics.series.values, title: "Weekly Activity" })}'></div>
  `;
  mountAll();
}

function renderSettings(root: HTMLElement) {
  root.innerHTML = `
    <h2>Settings</h2>
    <section class="toolbar" style="margin:8px 0;">
      <label><input type="checkbox" id="rtl-toggle" /> RTL</label>
    </section>
    <div data-component="ThemeSwitcher"></div>
    <h3 style="margin-top:12px;">Profile</h3>
    <div data-component="FormGroupValidated" data-props='{"name":"username","label":"Username","minLength":3,"placeholder":"yourname"}'></div>
    <div data-component="FormGroupValidated" data-props='{"name":"email","label":"Email","pattern":"^.+@.+\\..+$","placeholder":"you@example.com"}'></div>
    <button id="save-profile">Save</button>
  `;
  mountAll();
  const rtl = document.getElementById('rtl-toggle') as HTMLInputElement;
  rtl.checked = document.documentElement.getAttribute('dir') === 'rtl';
  rtl.addEventListener('change', () => {
    const dir = rtl.checked ? 'rtl' : 'ltr';
    import('@core').then(({ store }) => store.set('dir', dir as any));
  });
  (document.getElementById('save-profile') as HTMLButtonElement)?.addEventListener('click', () => {
    const nameInput = document.querySelector('#fgv-username') as HTMLInputElement | null;
    const emailInput = document.querySelector('#fgv-email') as HTMLInputElement | null;
    const name = nameInput?.value?.trim();
    const email = emailInput?.value?.trim();
    if (!name || !email) { toast.warning('Please fill all fields'); return; }
    import('@core').then(({ store }) => {
      store.set('user', { id: '1', name });
      toast.success('Profile saved');
    });
  });
}

function renderLab(root: HTMLElement) {
  // Minimal placeholder Lab route (advanced widgets disabled in this worktree)
  root.innerHTML = `
    <h2>Lab</h2>
    <div data-component="Card" data-props='{"title":"Experimental"}'>
      <template data-slot="default">
        <p>Experimental widgets will appear here when enabled.</p>
      </template>
    </div>
  `;
  mountAll();
}

function setBreadcrumb(route: string[]) {
  const el = document.getElementById('breadcrumb');
  if (!el) return;
  el.textContent = route.join(' / ');
  document.title = `BetoDashboard — ${route[0] || 'Overview'}`;
}

function setActiveNav(current: string) {
  document.querySelectorAll('nav a').forEach(a => {
    const href = (a as HTMLAnchorElement).getAttribute('href') || '';
    const r = href.replace(/^#\//,'');
    if (r.startsWith(current)) a.classList.add('active'); else a.classList.remove('active');
  });
}

export async function startRouter() {
  await loadUsers();
  const content = document.getElementById('route-content') as HTMLElement;
  const nav = () => {
    const hash = location.hash.replace(/^#\//, '') || 'overview';
    const route = hash.split('/');
    setBreadcrumb(route);
    setActiveNav(route[0]);
    switch (route[0]) {
      case 'users':
        renderUsers(content);
        break;
      case 'settings':
        renderSettings(content);
        break;
      case 'lab':
        renderLab(content);
        break;
      default:
        renderOverview(content);
    }
  };
  window.addEventListener('hashchange', nav);
  nav();
}
