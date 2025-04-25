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
