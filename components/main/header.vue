<script setup lang="ts">
import { navbarData } from '../../data'
import { themes } from '~/data/themes'

const currentTheme = ref('system');
const buttonTheme = ref('');

const setTheme = (value: string) => {
  currentTheme.value = value;
  localStorage.setItem('theme', value);
  applyTheme(value);
};

const applyTheme = (value: string) => {
  const html = document.documentElement;

  if (value === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		let userTheme = prefersDark ? 'dark' : 'light';
    html.dataset.theme = userTheme;
		buttonTheme.value = userTheme;
  } else {
    html.dataset.theme = value;
		buttonTheme.value = value;
  }
};

onMounted(() => {
  const saved = localStorage.getItem('theme') || 'system';
  currentTheme.value = saved;
  applyTheme(saved);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (currentTheme.value === 'system') {
      applyTheme('system');
    }
  });
});


const route = useRoute()
function isActive(path: string) {
  return route.path.startsWith(path)
}
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
						<button class="theme-switch">
							<IconUse :id="`theme-${buttonTheme}`" :width="20" :height="20" />
						</button>
						<div class="theme-switch__popover" id="theme-switch">
							<button v-for="theme in themes" 
							:class="['theme-switch__select-button', { active: theme.functionTrigger === currentTheme }]" 
							@click="setTheme(theme.functionTrigger)">
								<IconUse :id="theme.iconId" :width="20" :height="20" />
								{{ theme.name }}
							</button>
						</div>
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
  min-height: 50px;
  background: var(--bg-color-1);
	box-shadow: 0 0 12px #00000009;

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
			&:focus {
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

.theme-switch--conteiner {
	position: relative;
}
.theme-switch {
  background: #f3f3f3;
  border: none;
  border-radius: 50%;
  padding: 0.3rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.2s ease;
}

.theme-switch:hover {
  background: #e6e6e6;
}

.theme-switch__popover {
	position: absolute;
	right: 0;
	top: 36px;
  display: flex;
  flex-direction: column;
  min-width: 120px;
  gap: 0.25rem;
  padding: 0.5rem 0;
  border: none;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: 0;
  transform: scale(0.95); /* центрирование + уменьшение */
  transform-origin: top center;
  pointer-events: none;
	z-index: 1;
}

.theme-switch:hover ~ .theme-switch__popover,
.theme-switch__popover:hover,
.theme-switch__popover:has(button:focus) {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.theme-switch__select-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  width: 100%;
  padding: 0.2rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.2s ease;
}

.theme-switch__select-button:hover {
  background: #f0f0f0;
}

.theme-switch__select-button.active {
  background: #e5e5e5;
  font-weight: 500;
}
</style>