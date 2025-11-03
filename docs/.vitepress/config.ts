import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/beto-dashboard/',
  title: "BetoDashboard",
  description: "BetoDashboard Framework Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/getting-started' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Architecture', link: '/architecture' },
          { text: 'Security', link: '/security' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Deployment', link: '/deployment' },
          { text: 'Code Style', link: '/code-style' },
          { text: 'Testing', link: '/testing' }
        ]
      },
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
        text: 'Recipes',
        items: [
          { text: 'Dynamic Data Table', link: '/recipes' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bakhe8/beto-dashboard' }
    ]
  }
})