import { mountAll } from '@core/components/runtime';
import '@core/components/Table';
import '@core/components/Card';
import '@core/components/ChartWidget';
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
  root.querySelectorAll<HTMLButtonElement>('.row-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      if (confirm('Delete this user?')) {
        state.users = state.users.filter(u => u.id !== id);
        toast.success('User deleted');
        renderUsers(root);
      }
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
    <div data-component="ThemeSwitcher"></div>
  `;
  mountAll();
}

function setBreadcrumb(route: string[]) {
  const el = document.getElementById('breadcrumb');
  if (!el) return;
  el.textContent = route.join(' / ');
  document.title = `BetoDashboard — ${route[0] || 'Overview'}`;
}

export async function startRouter() {
  await loadUsers();
  const content = document.getElementById('route-content') as HTMLElement;
  const nav = () => {
    const hash = location.hash.replace(/^#\//, '') || 'overview';
    const route = hash.split('/');
    setBreadcrumb(route);
    switch (route[0]) {
      case 'users':
        renderUsers(content);
        break;
      case 'settings':
        renderSettings(content);
        break;
      default:
        renderOverview(content);
    }
  };
  window.addEventListener('hashchange', nav);
  nav();
}
