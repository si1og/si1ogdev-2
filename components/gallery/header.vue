<script setup lang="ts">
import { navbarData } from '../../data'

const route = useRoute()
const isScrolled = ref(false)

function isActive(path: string) {
  return route.path.startsWith(path)
}

function currentPage() {
  const segments = route.path.split('/').filter(Boolean)
  const key = segments[0] || 'home'

  for (const navKey of Object.keys(navbarData) as (keyof typeof navbarData)[]) {
    const item = navbarData[navKey]
    if (item.rote === key) {
      return { key, label: item.text }
    }
  }

  return { key, label: key }
}


function handleScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
  <header>
    <NuxtLink to="#main" class="skip-nav">
      Skip to main content
    </NuxtLink>
    <div class="split">
      <div class="page-indicator">
        <IconLogo />
        /
        <div class="page-indicator__switcher">
          <button class="page-indicator__select" :class="{scrolled: isScrolled}">
            <NuxtLink :to="`/${currentPage().key}`" class="underline" :class="currentPage().key" > 
              {{ currentPage().label }}
            </NuxtLink>
            <IconUse :id="'next'" :width="6" :height="11" />
          </button>
          <ul class="page-indicator__popup">
            <li v-for="key in Object.keys(navbarData).filter(element => element !== currentPage().key)">
              <NuxtLink :to="`/${key}`" :class="key" > 
                {{ key }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <nav>
        <ul>
          <li class="year" :class="`year-${year}`" v-for="year in [2025, 2024, 2023]">
            <NuxtLink :to="`/gallery/${year}`" :class="{ underline: isActive(`/${year}`) }"> 
              {{ year }}
            </NuxtLink>
          </li>
					<li class="theme-switch--conteiner">
						<ThemeSwitcher />
					</li>
        </ul>
      </nav>
    </div>
    <div class="backdrop"></div>
    <div class="backdrop-edge"></div>
  </header>

</template>
<style scoped>
header {
  --thickness: 1px;
  
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 50px;
  background: var(--bg-color-11);
  box-shadow: 0 0 6px #00000011;
  z-index: 10;
  
  .split {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0px 42px;
    box-sizing: border-box;
  }
  .backdrop {
    position: absolute;
    inset: 0;
    
    backdrop-filter: blur(16px);
    pointer-events: none;
    z-index: -1;
  }
  .backdrop-edge {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--thickness);
    background: hsl(0deg 0% 100% / 0.1);
    backdrop-filter: blur(12px) brightness(0.96);
    transform: translateY(100%);
    pointer-events: none;
    z-index: -1;
  }
  @supports
    (mask-image: none) or
    (-webkit-mask-image: none)
  {
    .backdrop {
      height: 200%;
      -webkit-mask-image: linear-gradient(
        to bottom,
        black 0% 50%,
        transparent 50% 100%
      );
      mask-image: linear-gradient(
        to bottom,
        black 0% 50%,
        transparent 50% 100%
      );
    }
    .backdrop-edge {
      height: 100%;
      inset: 0;
      mask-image: linear-gradient(
        to bottom,
        black 0,
        black var(--thickness),
        transparent var(--thickness)
      );
    }
  }
}

nav>ul {
  display: flex;
	align-items: center;
  list-style: none;
  flex-wrap: wrap;
  gap: 28px;
}

.gallery {
  background: linear-gradient(60deg,coral,violet); 
  background-clip: border-box;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  font-variation-settings: "wght" 550, "ital" 0;
  transition: .3s ease;
  text-decoration: none;

  &:hover,
  &:focus,
  &.underline {
    font-style: italic;
    font-variation-settings: "wght" 800, "ital" 1;
    background-position: right center;
    -webkit-text-fill-color: transparent;
  }
}
a {
  position: relative;
  transition: .2s ease;
}

.skip-nav {
  display: none;
  position: absolute;
  width: 100%;
  background: var(--text-color-1);
  color: var(--bg-color-1) !important;
  text-align: center;
  padding: 5px 11px;
  opacity: 0;
  outline: none !important;
  text-decoration: none;
  pointer-events: none;
}

.skip-nav:focus-visible {
  position: relative;
  opacity: 1;
}

.page-indicator {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  font-size: large;
}
.page-indicator__switcher {
  position: relative;

}

.page-indicator__select {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px 12px;
  border: 1px solid var(--decoration-border-color);
  background: none;
  border-radius: 10px;

  &.scrolled {
    border: 1px solid transparent;
    background: var(--page-indicator-select-on-scroll-color);
    &:hover,
    &:focus {
      border: 1px solid var(--page-indicator-select-on-scroll-color-active);
    }
  }
}

.page-indicator__popup {
  position: absolute;
  top: 30px;
  opacity: 0;
}
</style>

<style>
.page-indicator__select {
  svg {
    rotate: 180deg;
    fill: var(--text-color-1);
    opacity: .3;
    transition: .2s ease;
  }

  &:hover {
    background: var(--bg-color-12);
    svg {
      rotate: 270deg;
      opacity: .5;
    }
  } 
}
</style>