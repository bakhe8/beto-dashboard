import { define } from "./runtime";
import { store } from "../js/store";

define("Sidebar", (root) => {
  const render = () => {
    const sidebarState = store.get("sidebar");
    root.dataset.state = sidebarState;

    root.innerHTML = `
      <div class="sidebar-header">
        <button data-action="toggle-sidebar" aria-label="Toggle Sidebar">
          <!-- Icon would go here -->
          <span>☰</span>
        </button>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </nav>
    `;
  };

  const handleToggle = () => {
    const currentState = store.get("sidebar");
    const nextState = currentState === "default" ? "collapsed" : "default";
    store.set("sidebar", nextState);
  };

  render();

  root.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("[data-action='toggle-sidebar']")) {
      handleToggle();
    }
  });

  return store.on((key) => {
    if (key === "sidebar") render();
  });
});