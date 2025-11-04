import DefaultTheme from 'vitepress/theme'
import DocsDemo from './components/DocsDemo.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }){
    try {
      import('../../../packages/core/src/schemas').then(mod => {
        // @ts-ignore
        window['__BD_SCHEMAS'] = mod
      })
    } catch {}
    
    app.component('DocsDemo', DocsDemo)
    // Best-effort: dynamically register common components so DocsDemo can mount them.
    try {
      const mods = [
        'Modal','Table','ThemeSwitcher','ConfirmDialog','Card','ChartWidget',
        'List','FormGroup','FormGroupValidated','Sidebar','Loader','ToastContainer','ModalBasic'
      ];
      Promise.all(mods.map((name) => import(../../../packages/core/src/components/.ts).catch(() => null))).then(()=>{}).catch(()=>{})
    } catch {}

    // Expose schemas for validation in DocsDemo
    try {
      import('../../../packages/core/src/schemas').then(mod => {
        // @ts-ignore
        (window as any)['__BD_SCHEMAS'] = mod
      })
    } catch {}
    try {
      const mods = [
        'Modal','Table','ThemeSwitcher','ConfirmDialog','Card','ChartWidget',
        'List','FormGroup','FormGroupValidated','Sidebar','Loader','ToastContainer','ModalBasic'
      ]
      Promise.all(mods.map(name => import(../../../packages/core/src/components/{name}.ts).catch(() => null))).then(()=>{}).catch(()=>{})
    } catch {}
    // expose runtime mountAll in docs (if loaded by the site)
    try {
      // @ts-ignore
      import('../../../packages/core/src/components/runtime').then(mod => {
        // @ts-ignore
        window['__BD_RUNTIME'] = mod
      })
    } catch {}
  }
}


