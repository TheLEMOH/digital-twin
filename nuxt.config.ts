// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  fonts: { provider: 'google' },
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },

  nitro: {
    routeRules: {
      '/gis/**': {
        proxy: 'https://gis.krasn.ru/**'
      }
    }
  },

  routeRules: {
    '/sqlite': {
      proxy: 'https://gis.krasn.ru/twin-files/index.sqlite',
    },

    '/gis/**': {
      proxy: 'https://gis.krasn.ru/**'
    }

  },

  app: {
    baseURL: '/twin/',
  },
})
