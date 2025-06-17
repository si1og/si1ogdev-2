<script setup lang="ts">
import { NuxtImg } from '#components'

defineProps<{
  src: string
  alt?: string | null
  orientation?: 'portrait' | 'landscape'
}>()
</script>

<template>
  <div class="gallery-item" :class="orientation">
    <NuxtImg
      :src="src"
      :alt="alt || 'Photo'"
      loading="lazy"
      decoding="async"
      class="gallery-img animate"
      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
      format="webp"
      quality="80"
    />
  </div>
</template>

<style scoped>
.gallery-item {
  grid-row-end: span var(--rows, 11);
  width: 100%;
  display: block;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: .2s ease;
  box-shadow: 0 0 8px #00000014;
  animation: fade-in .2s ease;
}

.animate {
  background: linear-gradient(90deg, rgba(177, 177, 178, 0.29) 0%, rgba(225, 224, 224, 0.25) 50%, rgba(178, 178, 179, 0.29) 100%);
  background-size: 1000% 1000%;
  animation: background-animation 4s ease infinite;
}

@keyframes background-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes fade-in {
  from {
    transform: translateY(5px);
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.gallery-item:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.4s ease, transform 0.4s ease;
  color: transparent;
}

/* Управление размером */
.gallery-item.portrait {
  --rows: 20;
}
.gallery-item.landscape {
  --rows: 7;
}
</style>
