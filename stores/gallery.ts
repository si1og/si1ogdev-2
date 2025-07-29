import { defineStore } from 'pinia'
import type { Photo } from '~/types/photo'

export const useGalleryStore = defineStore('gallery', () => {
  const page = ref(1)
  const photos = ref<Photo[]>([])
  const isEndReached = ref(false)
  const scrollY = ref(0)

  function addPhoto(photo: Photo) {
    photos.value.push(photo)
  }

  function incrementPage() {
    page.value++
  }

  function resetGallery() {
    page.value = 1
    photos.value = []
    isEndReached.value = false
    scrollY.value = 0
  }

  return {
    page,
    photos,
    isEndReached,
    scrollY,
    addPhoto,
    incrementPage,
    resetGallery
  }
})
