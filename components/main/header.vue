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
    max-width: var(--content-max-width);
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
</style>