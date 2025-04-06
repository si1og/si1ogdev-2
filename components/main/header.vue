<script setup lang="ts">
import { navbarData } from '../../data'

const colorMode = useColorMode()
function onClick(val: string) {
  colorMode.preference = val
}

const route = useRoute()
function isActive(path: string) {
  return route.path.startsWith(path)
}

// Default theme is light. Dark may be added in future
onClick('light')
</script>

<template>
  <header>
    <NuxtLink to="#main" class="skip-nav">
      Перейти к основному контенту
    </NuxtLink>
    <div class="split">
      <IconLogo />
      <nav>
        <ul>
          <li>
            <NuxtLink to="/" :class="{ underline: $route.path === '/' }"> {{ navbarData.home.text }} </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" :class="{ underline: isActive(`/${navbarData.about.rote}`) }"> {{
              navbarData.about.text }} </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contacts" :class="{ underline: isActive(`/${navbarData.contacts.rote}`) }"> {{
              navbarData.contacts.text }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/search" :class="{ underline: isActive(`/${navbarData.search.rote}`) }"> {{
              navbarData.search.text }} </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="'tel:+798788787'" class="phone">
              <IconUse :id="'phone'" :width="14" :height="15" />
              <div class="tel-text">+7 (987) 887-87</div>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

</template>
<style>
header {
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
  min-height: 70px;
  background: var(--main-component-color);

  &>div {
    display: flex;
    justify-content: space-between;
    align-content: center;
    gap: 20px;
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 11px 42px;
    box-sizing: border-box;
  }
}

nav>ul {
  display: flex;
  gap: 40px;
  list-style: none;
  flex-wrap: wrap;

  a {
    position: relative;
    transition: .2s ease;

    &::after {
      position: absolute;
      left: 0;
      bottom: 1px;
      content: "";
      width: 100%;
      height: 1px;
      background: var(--blue-background-color);
      opacity: 0;
      transform: translateY(3px);
      transition: inherit;
    }
  }

  a:not(.phone).underline,
  a:not(.phone):hover,
  a:not(.phone):focus {
    color: var(--blue-text-color);

    &::after {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &.gap-80 {
    gap: 80px;
  }
}

.skip-nav {
  position: absolute;
  width: 100%;
  background: var(--blue-background-color);
  color: var(--img-text-color);
  text-align: center;
  padding: 2px 11px;
  opacity: 0;
  outline: none;
}

.skip-nav:focus-visible {
  position: relative;
  opacity: 1;
}

.phone {
  --color: var(--blue-text-color);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;

  div {
    color: var(--color);
  }

  svg {
    fill: var(--color);
  }
}
</style>