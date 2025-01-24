// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'FE Reviews',
      meta: [
        {
          name: 'description',
          content: 'FE Reviews test app',
        },
      ],
    },
  },

  vite: {
    build: {
      target: 'ESNext',
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use 'sass:list'; @import '~/styles/imports.scss';`,
          api: 'modern-compiler',
          silenceDeprecations: ['import'],
        },
      },
    },
  },

  css: ['normalize.css/normalize.css'],

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    [
      'dayjs-nuxt',
      {
        plugins: ['duration', 'relativeTime'],
      },
    ],
  ],

  piniaPluginPersistedstate: {
    key: 'pinia_%id',
  },

  googleFonts: {
    families: {
      Roboto: '100..900',
    },
  },

  runtimeConfig: {
    public: {
      BASE_API_URL: 'https://679374835eae7e5c4d8eb46f.mockapi.io/fe/api/',
    },
  },

  devServer: {
    port: 3000,
    https: {
      key: './certs/privkey.pem',
      cert: './certs/cert.pem',
    },
  },

  compatibilityDate: '2025-01-24',
})
