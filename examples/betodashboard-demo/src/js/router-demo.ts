import "@core/css/base.css";
import "@core/components/ThemeSwitcher";
import { startRouter } from './router';
import { store } from '@core';
import '@core/components/FormGroup';
import '@core/components/FormGroupValidated';

startRouter();

// Apply document direction from store
function applyDir() {
  document.documentElement.setAttribute('dir', store.get('dir'));
}
applyDir();
store.on('dir', applyDir);
