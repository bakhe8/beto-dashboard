import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BetoDashboard",
  description: "BetoDashboard Framework Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/modal' },
      { text: 'Security', link: '/security' }
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Modal', link: '/components/modal' },
          { text: 'Table', link: '/components/table' },
          { text: 'ThemeSwitcher', link: '/components/themeswitcher' },
          { text: 'Sidebar', link: '/components/sidebar' },
          { text: 'Loader', link: '/components/loader' }
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Security', link: '/security' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bakhe8/beto-dashboard' }
    ]
  }
})
