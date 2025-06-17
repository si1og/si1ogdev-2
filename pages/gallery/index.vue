<script setup lang="ts">
import type { Photo } from '~/types/photo'

const page = ref(1)
const photos = ref<Photo[]>([])
const isLoading = ref(false)
const isEndReached = ref(false)

async function fetchPhotos() {
  isLoading.value = true

  const { data } = await useLazyFetch<Photo[]>('/api/photos', {
    query: { page: page.value },
    default: () => []
  })

  if (data.value && data.value.length > 0) {
    for (const element of data.value) {
      await addPhotoOnPage(element);
    }
  } else {
    isEndReached.value = true
  }

  isLoading.value = false
}

async function addPhotoOnPage(photo: Photo): Promise<void> {
  return new Promise(resolve => {  
    setTimeout(() => {
      photos.value.push(photo);
      resolve();
    }, 50);
  })
    
}

const observer = ref<IntersectionObserver>()

onMounted(() => {
  const sentinel = document.getElementById('scroll-sentinel')
  if (sentinel) {
    observer.value = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading.value && !isEndReached.value) {
        page.value++
        fetchPhotos()
      }
    })
    observer.value.observe(sentinel)
  }
})

onBeforeUnmount(() => {
  observer.value?.disconnect()
})

onNuxtReady(() => {
  fetchPhotos()
})

</script>

<template>
  <div class="gallery-wrapper">
    <div class="image-grid">
      <GalleryImage
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.urls.small"
        :alt="photo.alt_description"
        :orientation="photo.orientation"
      />
    </div>

    <!-- Страж -->
    <div id="scroll-sentinel"></div>

    <!-- Спиннер -->
    <div v-if="isLoading" class="spinner">
      Loading...
    </div>

    <!-- Сообщение о завершении -->
    <div v-else-if="isEndReached" class="end-message">
      No more photos.
    </div>
  </div>
</template>

<style scoped>
.gallery-wrapper {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px; /* размер строки в пикселях */
  gap: 1rem;
}

.spinner, .end-message {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.2rem;
  color: var(--text-color-2);
}

.spinner {
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

#scroll-sentinel {
  width: 100%;
  height: 1px;
}
</style>
