<script setup>
import { siteMetaData } from './data'
import '~/assets/css/global.css'
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

<style>
* {
  box-sizing: border-box;
}

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
  background: var(--bg-color-2);
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
  font-family: 'Source Sans Variable', 'Source Sans Pro', sans-serif;
  color: var(--text-color-1);
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

a {
	text-decoration-color: 
    color-mix(in srgb, currentColor, transparent 75%);
	text-underline-offset: 2px;
}
a:hover,
a:focus {
	text-decoration-color: color-mix(in srgb, currentColor, transparent 20%);
	color: var(--text-color-5);
}

@font-face {
  font-family: 'Source Sans Variable';
  src: url('@/assets/fonts/SourceSans3VF-Upright.ttf') format('truetype-variations');
  font-weight: 300 900;
  font-style: normal;
}
@font-face {
  font-family: 'Source Sans Variable';
  src: url('@/assets/fonts/SourceSans3VF-Italic.ttf') format('truetype-variations');
  font-weight: 300 900;
  font-style: italic;
}

</style>
