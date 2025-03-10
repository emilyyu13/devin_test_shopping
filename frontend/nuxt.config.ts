// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3000/api/v1'
    }
  },

  compatibilityDate: '2025-03-10',
  
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  }
}
