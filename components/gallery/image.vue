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
      class="gallery-img"
      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
      format="webp"
      quality="80"
    />
  </div>
</template>

<style scoped>
.gallery-item {
  width: 100%;
  display: block;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.3s ease;
  grid-row-end: span var(--rows, 11);
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
}

/* Управление размером */
.gallery-item.portrait {
  --rows: 20;
}
.gallery-item.landscape {
  --rows: 7;
}
</style>
