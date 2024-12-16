import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  title: 'JY-UI',
  description: 'Vue3 Component Library',
  base: '/jy-ui/',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/components/icon' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickstart' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [{ text: 'Icon 图标', link: '/components/icon' }],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/zjydipingxian/zhongJy-ui' }],
  },

  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../packages', import.meta.url)),
        '@theme': fileURLToPath(new URL('./theme', import.meta.url)),
        'jy-ui': fileURLToPath(new URL('../../packages/jy-ui', import.meta.url)),
      },
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
  },
})
