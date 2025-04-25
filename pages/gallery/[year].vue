<script setup lang="ts">
import type { Photo } from '~/types/photo'

const route = useRoute()
const year = route.params.year as string

const { data: photos } = await useFetch<Photo[]>('/api/photos')

const filteredPhotos = computed(() => {
  if (!photos.value) return []
  return photos.value.filter((photo) => {
    const photoYear = new Date(photo.created_at).getFullYear()
    return photoYear.toString() === year
  })
})
</script>

<template>
  <div class="gallery-wrapper">
    <h2>{{ year }}</h2>

    <div v-if="filteredPhotos.length > 0" class="image-grid">
      <img
        v-for="photo in filteredPhotos"
        :key="photo.id"
        :src="photo.urls.small"
        :alt="photo.alt_description || 'Photo'"
        class="gallery-img"
      />
    </div>

    <div v-else>
      <p>No photos found for {{ year }}</p>
    </div>
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
