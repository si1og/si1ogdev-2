<script setup>
import { siteMetaData } from './data'
import '~/assets/css/global.css'
import '~/assets/css/colors.css'
import '~/assets/css/animations.css'

useHead({
  htmlAttrs: {
    lang: 'ru',
  },
  meta: () => siteMetaData,
})
</script>

<template>
  <div class="page">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
