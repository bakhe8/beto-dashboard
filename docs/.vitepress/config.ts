import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'BetoDashboard',
  description: 'Developer documentation',
  base: '/beto-dashboard/',
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
      { text: 'Components', items: [\n        { text: 'Modal', link: '/components/modal' },\n        { text: 'Table', link: '/components/table' },\n        { text: 'Card', link: '/components/card' },\n        { text: 'ChartWidget', link: '/components/chartwidget' },\n        { text: 'ThemeSwitcher', link: '/components/themeswitcher' },\n      ]}
    ]
  }
})

