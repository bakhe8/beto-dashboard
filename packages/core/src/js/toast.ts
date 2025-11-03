import { store } from './store';

type ToastType = 'info' | 'success' | 'warning' | 'danger';
let uid = 1;

function push(message: string, type: ToastType = 'info', ms = 3000) {
  const list = store.get('toasts');
  const id = uid++;
  store.set('toasts', [...list, { id, message, type } as any]);
  if (ms > 0) setTimeout(() => {
    const cur = store.get('toasts');
    store.set('toasts', cur.filter(t => t.id !== id));
  }, ms);
}

export const toast = {
  info: (m: string, ms?: number) => push(m, 'info', ms),
  success: (m: string, ms?: number) => push(m, 'success', ms),
  warning: (m: string, ms?: number) => push(m, 'warning', ms),
  danger: (m: string, ms?: number) => push(m, 'danger', ms),
};

export default toast;

