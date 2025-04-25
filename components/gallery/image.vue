<script setup lang="ts">
import { NuxtImg } from '#components'

defineProps<{
  src: string
  alt?: string | null
  index: number
}>()

const isLoaded = ref(false)
</script>

<template>
  <div class="gallery-item">
    <NuxtImg
      :src="src"
      :alt="alt || 'Photo'"
      loading="lazy"
      decoding="async"
      class="gallery-img"
      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
      format="webp"
      quality="80"
      :class="{ 'is-loaded': isLoaded }"
      @load="isLoaded = true"
    />
  </div>
</template>

<style scoped>
.gallery-item {
  display: inline-block;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.gallery-item:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.gallery-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.02);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.gallery-img.is-loaded {
  opacity: 1;
  transform: scale(1);
}
</style>
