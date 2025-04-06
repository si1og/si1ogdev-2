<script lang="ts" setup>
import { navbarData } from '~/data'

useHead({
  title: 'Главная',
  meta: [
    {
      name: 'description',
      content:
        'Добро пожаловать на наш блог!',
    },
  ],
})

// // Generate OG Image
// defineOgImageComponent('About', {
//   headline: 'Greetings 👋',
//   title: navbarData.homeTitle,
//   description: 'Dive into web development with me and learn Js, Ts, Vue, Nuxt, Docker, k8s',
//   link: '/riyad.jpg',
// })
</script>

<template>
  <main class="main" id="main">
    <IndexCover />
  </main>
</template>

<style></style>