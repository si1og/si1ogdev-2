<script setup lang="ts">
import type { Photo } from '~/types/photo'

const { data: photos } = await useFetch<Photo[]>('/api/photos')

const groupedByYear = computed(() => {
  if (!photos.value) return {}
  return photos.value.reduce((acc: Record<string, Photo[]>, photo) => {
    const year = new Date(photo.created_at).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(photo)
    return acc
  }, {})
})

onMounted(() => {
  const hash = window.location.hash
  if (hash) {
    const el = document.getElementById(hash.slice(1))
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }
})
</script>

<template>
  <div class="gallery-wrapper">
    <div
      v-for="(images, year) in groupedByYear"
      :key="year"
      class="year-section"
      :id="year.toString()"
    >
      <h2>{{ year }}</h2>
      <div class="image-grid">
        <GalleryImage
          v-for="(photo, index) in images"
          :key="photo.id"
          :src="photo.urls.small"
          :alt="photo.alt_description"
          :index="index"
        />
      </div>
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
