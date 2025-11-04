import "@core/css/base.css";
import "@core/components/ThemeSwitcher";
import { startRouter } from './router';
import { store } from '@core';
import '@core/components/FormGroup';
import '@core/components/FormGroupValidated';
// Advanced demo widgets removed to avoid build-time missing modules in this worktree.
// If/when these components are added under packages/core/src/components, re-enable the imports below.
// import '@core/components/AdaptiveGrid';
// import '@core/components/WidgetHost';
// import '@core/components/ThemeLab';
// import '@core/components/InsightWidget';
// import '@core/components/StreamChartWidget';
// import '@core/components/SplitPane';

startRouter();

// Apply document direction from store
function applyDir() {
  document.documentElement.setAttribute('dir', store.get('dir'));
}
applyDir();
store.on('dir', applyDir);

// Theme application (light/dark/auto → system default)
function applyTheme(theme: 'light' | 'dark' | 'auto') {
  const root = document.documentElement;
  if (theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = prefersDark ? 'dark' : 'light';
  } else {
    root.dataset.theme = theme;
  }
}
// initial
applyTheme(store.get('theme') as any);
// react to store changes
store.on('theme', (t) => applyTheme(t as any));
// react to system changes when in auto
const mql = window.matchMedia('(prefers-color-scheme: dark)');
mql.addEventListener('change', () => { if (store.get('theme') === 'auto') applyTheme('auto'); });

import '@core/devtools/inspector';
