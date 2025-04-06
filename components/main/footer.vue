<script setup lang="ts">
import { navbarData } from '../../data'

const route = useRoute()

const path = computed(() => route.fullPath.replace('/', ''))
function isActive(path: string) {
  return route.path.startsWith(path)
}
</script>

<template>
  <footer>
    <div class="content">
      <IconLogo />
      <nav>
        <ul class="gap-80">
          <li>
            <NuxtLink :to="`/${navbarData.about.rote}`" :class="{ underline: isActive(`/${navbarData.about.rote}`) }">
              {{
                navbarData.about.text }} </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="`/${navbarData.gallery.rote}`"
              :class="{ underline: isActive(`/${navbarData.gallery.rote}`) }"> {{
                navbarData.gallery.text }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="`/${navbarData.news.rote}`" :class="{ underline: isActive(`/${navbarData.news.rote}`) }"> {{
              navbarData.news.text }} </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="`/${navbarData.search.rote}`" :class="{ underline: isActive(`/${navbarData.search.rote}`) }">
              {{
                navbarData.search.text }} </NuxtLink>
          </li>
        </ul>
      </nav>
      <p class="credits">
        ООО “Организация” 2020. Все права защищены
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  background: var(--footer-background-color);

  &>div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 40px var(--page-padding);
  }

  &.hide {
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
  }
}

ul {
  margin: 0;
  padding: 0;
}

.credits {
  margin: 24px 0 0 0;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
