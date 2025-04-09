<script setup lang="ts">
import { navbarData, socialLinks } from '../../data'

const route = useRoute()

const path = computed(() => route.fullPath.replace('/', ''))
function isActive(path: string) {
  return route.path.startsWith(path)
}
</script>

<template>
  <footer class="footer">
    <div class="content">
      <IconLogo />
      <nav>
        <ul>
          <li v-for="social in socialLinks" :class="social.icon">
            <NuxtLink :to="`${social.link}`">
              <IconUse :id="social.icon" :width="social.sizes[0]" :height="social.sizes[1]" />
            </NuxtLink>
          </li>
        </ul>
      </nav>
			<NuxtLink to="https://github.com/si1og/si1ogdev-2"> 
				Handcrafted by me
			</NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background: var(--bg-color-1);
	box-shadow: 0 0 12px #00000009;

  &>div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 20px var(--page-padding);
  }
  ul {
    margin: 0;
    padding: 0;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      background: var(--text-color-1);
      border-radius: 50%;
    }
  }
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

<style>
  .footer svg {
    fill: var(--bg-color-1);
  }
</style>
