<script setup lang="ts">
const { data: photos } = await useFetch('/api/photos')

const groupedByYear = computed(() => {
  if (!photos.value) return {}
  return photos.value.reduce((acc: Record<string, any[]>, photo: any) => {
    const year = new Date(photo.created_at).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(photo)
    return acc
  }, {})
})
</script>

<template>
  <div class="gallery-wrapper">
    <div v-for="(images, year) in groupedByYear" :key="year" class="year-section">
      <h2 class="year-title">{{ year }}</h2>
      <div class="image-grid">
        <img
          v-for="photo in images"
          :key="photo.id"
          :src="photo.urls.small"
          :alt="photo.alt_description"
          class="gallery-img"
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
.year-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
.gallery-img {
  border-radius: 0.75rem;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.gallery-img:hover {
  transform: scale(1.03);
}
</style>
