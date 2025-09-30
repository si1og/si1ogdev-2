import { seoData } from './data'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-30',

  modules: [
    'nuxt-icon',
    '@nuxt/image',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxt/content',
    'nuxt-og-image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@formkit/auto-animate',
    '@stefanobartoletti/nuxt-social-share',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxtjs/i18n'
  ],

  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      title: seoData.title,
      titleTemplate: `%s - ${seoData.title}`,
    },
    pageTransition:  { name: 'page',   mode: 'out-in' },
    layoutTransition:{ name: 'layout', mode: 'out-in' }
  },

  css: ['~/assets/css/page-transitions.css'],

  sitemap: {
    strictNuxtContentPaths: true,
  },

  site: {
    url: seoData.mySite,
    identity: {
      type: 'Person',
    },
    twitter: seoData.twitterHandle,
  },

  typescript: {
    strict: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/rss.xml'],
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'dark',
  },

  content: {
    highlight: {
      theme: 'dracula',
    },
  },

  devtools: {
    enabled: true,
  },

  image: {
    domains: ['images.unsplash.com']
  },
    i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Russian', file: 'ru.json' }
    ],
    defaultLocale: 'en',
  }
})