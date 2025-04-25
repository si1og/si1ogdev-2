<script setup lang="ts">
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

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentTheme.value === 'system') {
      applyTheme('system');
    }
  });
});
</script>

<template>
  <button class="theme-switch">
    <IconUse :id="`theme-${buttonTheme}`" :width="20" :height="20" />
  </button>
  <div class="theme-switch__popover" id="theme-switch">
    <button 
      v-for="theme in themes" 
      :key="theme.functionTrigger"
      :class="['theme-switch__select-button', { active: theme.functionTrigger === currentTheme }]" 
      @click="setTheme(theme.functionTrigger)"
    >
      <IconUse :id="theme.iconId" :width="20" :height="20" />
      {{ theme.name }}
    </button>
  </div>
</template>

<style>
.theme-switch--conteiner {
	position: relative;
}
.theme-switch {
  border: none;
  border-radius: 50%;
  padding: 0.3rem;
  cursor: pointer;
  background: none;
  transition: background 0.2s ease;
  svg {
    fill: var(--text-color-1);
  }
}

.theme-switch:hover,
.theme-switch--conteiner:has(button:focus) .theme-switch,
.theme-switch--conteiner:has(.theme-switch__popover:hover) .theme-switch {
  background: var(--bg-color-12);
}

.theme-switch__popover {
	position: absolute;
	right: 0;
	top: 30px;
  display: flex;
  flex-direction: column;
  min-width: 120px;
  padding: 0.5rem 0;
  border: none;
  border-radius: 1rem;
  background: var(--bg-color-1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: 0;
  transform: scale(0.95);
  transform-origin: top center;
  pointer-events: none;
	z-index: 1;
}

.theme-switch__popover::before {
  position: absolute;
  left: 50px;
  top: -30px;
  content: "";
  width: 50px;
  height: 30px;
}

.theme-switch:hover ~ .theme-switch__popover,
.theme-switch:focus ~ .theme-switch__popover,
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
  svg {
    fill: var(--text-color-1)
  }
}

.theme-switch__select-button:hover {
  background: var(--bg-color-12);
}

.theme-switch__select-button.active {
  background: var(--bg-color-12);
  font-weight: 500;
}
</style>