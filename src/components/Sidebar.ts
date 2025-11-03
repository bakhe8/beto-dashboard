import { define } from "./runtime";
import { store, State } from "../js/store";
import { sanitize } from "../js/utils/sanitize";

const navItems = [
  { href: "#", label: "Dashboard" },
  { href: "#", label: "Users" },
  { href: "#", label: "Settings" },
];

export const Sidebar = (root: HTMLElement) => {
  const render = () => {
    const currentState = store.get("sidebar");
    root.dataset.state = currentState;

    const navLinks = navItems
      .map(item => `<li><a href="${item.href}">${item.label}</a></li>`)
      .join("");

    root.innerHTML = sanitize(`
      <header class="sidebar-header">
        <h2 class="sidebar-title">Beto</h2>
        <button class="sidebar-toggle" aria-label="Toggle sidebar" aria-controls="sidebar-nav" aria-expanded="${currentState !== 'collapsed'}">☰</button>
      </header>
      <nav id="sidebar-nav" class="sidebar-nav">
        <ul>${navLinks}</ul>
      </nav>
    `);
  };

  const handleClick = (e: Event) => {
    if ((e.target as HTMLElement).closest(".sidebar-toggle")) {
      const current = store.get("sidebar");
      const nextState = current === "collapsed" ? "default" : "collapsed";
      store.set("sidebar", nextState);
    }
  };

  root.addEventListener("click", handleClick);

  const unsubscribe = store.on("sidebar", render);
  render();

  return () => {
    root.removeEventListener("click", handleClick);
    unsubscribe();
  };
};

define("Sidebar", Sidebar);
