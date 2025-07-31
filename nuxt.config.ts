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
    'nuxt-swiper'
  ],

  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      title: seoData.title,
      titleTemplate: `%s - ${seoData.title}`,
    },
    // Folder with pages
    pageTransition: { name: 'page', mode: 'out-in' },
    // Folder with layouts
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

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
  }
})