<script setup>
import { siteMetaData } from './data'
import '~/assets/css/global.css'

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

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.12s ease;
}

.page-enter-from {
  transform: translateX(15px);
  opacity: 0;
}

/* .page-leave-to {
  transform: translateX(-40px);
  opacity: 0;
} */

.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: .5;
}

html.dark {
  color-scheme: dark;
}

body {
  background: var(--background);
  margin: 0;
}

a,
p,
div,
h1,
h2,
h3,
h4,
h5,
li,
ol,
button,
input,
textarea {
  font-family: 'Jost', sans-serif;
  color: var(--main-text-color);
  text-decoration: none;
}

a,
button,
input,
textarea {
  outline: 2px solid transparent;
  transition: .2s ease;
  font-size: 18px;

  &:focus-visible {
    outline: 2px solid var(--blue-text-color);
  }
}

* {
  box-sizing: border-box;
}
</style>
