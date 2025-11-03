import "./css/base.css";
import { withErrorBoundary } from "./js/error-boundary";
import "./js/ui-manager";
// Import all components to register them with the runtime
import "./components/Modal";
import "./components/Table";
import "./components/Loader";
import "./components/ThemeSwitcher";
import "./components/Sidebar";

import { mountAll } from "./components/runtime";

// Mount all components declared in the HTML
withErrorBoundary(async () => mountAll());