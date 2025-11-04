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

