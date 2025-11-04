import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'BetoDashboard',
  description: 'Developer documentation',
  base: '/beto-dashboard/',
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/index' },
      { text: 'Components', link: '/components/modal' },
    ],
    sidebar: [
      { text: 'Guide', items: [
        { text: 'Getting Started', link: '/getting-started' },
        { text: 'Architecture', link: '/architecture' },
      ]},
      { text: 'Components', items: [
        { text: 'Modal', link: '/components/modal' },
        { text: 'Table', link: '/components/table' },
        { text: 'Card', link: '/components/card' },
        { text: 'ChartWidget', link: '/components/chartwidget' },
        { text: 'ThemeSwitcher', link: '/components/themeswitcher' },
      ]}
    ]
  }
})
