<script setup lang="ts">
import type { Photo } from '~/types/photo'

definePageMeta({
  layout: 'gallery'
})

const route = useRoute()
const image_id = route.params.image_id as string

  const { data } = await useLazyFetch<Photo[]>('/api/photo', {
    query: { id: image_id },
    default: () => []
  })

</script>

<template>
  <div class="gallery-wrapper">
    <h2>{{ image_id }}</h2>
    {{ data }}
  </div>
</template>

<style scoped>
.gallery-wrapper {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.year-section {
  margin-bottom: 3rem;
}
.image-grid {
  column-count: 1;
  column-gap: 1rem;
}

@media (width >= 600px) {
  .image-grid {
    column-count: 2;
  }
}

@media (width >= 900px) {
  .image-grid {
    column-count: 3;
  }
}
</style>
