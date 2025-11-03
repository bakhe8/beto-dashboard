import "@core/css/base.css";

import "@core/components/Loader";
import "@core/components/Modal";
import "@core/components/Table";
import "@core/components/ThemeSwitcher";
import "@core/components/Sidebar";
import "@core/components/ToastContainer";

import { mountAll } from "@core/components/runtime";
import { store, State } from "@core/js/store";
import "@core/js/error-boundary";
import { initWebVitals } from "@core/js/web-vitals";
import { ModalBasic } from "@core";

function applyTheme(theme: State["theme"]) {
  const root = document.documentElement;
  if (theme === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = prefersDark ? "dark" : "light";
  } else {
    root.dataset.theme = theme;
  }
}

const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const handleThemeChange = () => { applyTheme(store.get("theme")); };
handleThemeChange();
store.on("theme", handleThemeChange);

themeMediaQuery.addEventListener("change", () => {
  if (store.get("theme") === "auto") handleThemeChange();
});

mountAll();

document.getElementById("open-modal-btn")?.addEventListener("click", () => {
  store.set("modal", { open: true, title: "Confirm Action" });
});

initWebVitals();

// Wire up Basic Modal demo using accessible ModalBasic API
const basicRoot = document.getElementById('modal-basic-root') as HTMLElement | null;
document.getElementById('open-basic-modal-btn')?.addEventListener('click', () => {
  if (basicRoot) {
    ModalBasic(basicRoot, { open: true, title: 'Basic Modal', onClose: () => {} });
  }
});
// E2E metrics instrumentation (enabled with ?metrics=1)
const params = new URLSearchParams(location.search);
if (params.get('metrics') === '1') {
  (window as any).__BD_COLLECT = true;
  (window as any).__BD_METRICS = { fragmentDiffMs: 0, renderCycles: 0, reflows: 0 };
  // MutationObserver as a proxy for render cycles
  const mo = new MutationObserver((muts) => {
    (window as any).__BD_METRICS.renderCycles += muts.filter(m => m.type === 'childList').length;
  });
  mo.observe(document.body, { childList: true, subtree: true });
  // Layout Shift observer as a proxy for reflow count
  try {
    const po = new PerformanceObserver((list) => {
      const entries = list.getEntries() as any[];
      (window as any).__BD_METRICS.reflows += entries.length;
    });
    po.observe({ type: 'layout-shift', buffered: true } as any);
  } catch {}
  (window as any).getMetrics = () => ({ ...(window as any).__BD_METRICS });
}
