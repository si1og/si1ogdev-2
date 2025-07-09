<script setup lang="ts">
import { navbarData } from '../../data'

const route = useRoute()
function isActive(path: string) {
  return route.path.startsWith(path)
}
</script>

<template>
  <header>
    <NuxtLink to="#main" class="skip-nav">
      Skip to main content
    </NuxtLink>
    <div class="split">
      <IconLogo />
      <nav>
        <ul>
          <li class="gallery">
            <NuxtLink to="/gallery" :class="{ underline: isActive(`/${navbarData.gallery.rote}`) }"> {{
              navbarData.gallery.text }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/projects" :class="{ underline: isActive(`/${navbarData.projects.rote}`) }"> {{
              navbarData.projects.text }} </NuxtLink>
          </li>
					<li class="theme-switch--conteiner">
						<ThemeSwitcher />
					</li>
        </ul>
      </nav>
    </div>
  </header>

</template>
<style>
header {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 50px;
  background: var(--bg-color-11);
	box-shadow: 0 0 12px #00000009;
  z-index: 10;

  &>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0px 42px;
    box-sizing: border-box;
  }
}

nav>ul {
  display: flex;
	align-items: center;
  gap: 35px;
  list-style: none;
  flex-wrap: wrap;

	.gallery {
		background: linear-gradient(60deg,coral,violet); 
		background-clip: border-box;
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		font-variation-settings: "wght" 550, "ital" 0;

		&:hover {
			background-position: right center;
			-webkit-text-fill-color: transparent;
		}

		a {
			transition: .3s ease;
			text-decoration: none;
			&:hover,
			&:focus,
      &.underline {
				font-style: italic;
				font-variation-settings: "wght" 800, "ital" 1;
			}
	}
	}
  a {
    position: relative;
    transition: .2s ease;
	}

  &.gap-80 {
    gap: 80px;
  }
}

.skip-nav {
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
</style>