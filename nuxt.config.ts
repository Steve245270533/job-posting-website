// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/better-auth'],
  css: ['~/assets/css/global.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  routeRules: {
    '/': { redirect: '/jobs' },
  },
  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      "* * * * *": ["console"],
    }
  }
})