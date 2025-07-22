import { defineStore } from 'pinia'
import type { Photo } from '~/types/photo'

interface GalleryState {
  photos: Photo[]
  page: number
  isEndReached: boolean
}


export const useGalleryStore = defineStore('gallery', {
  state: (): GalleryState => ({
    photos: [] as Photo[],
    page: 1,
    isEndReached: false
  }),
  actions: {
    setPhotos(photos: Photo[]) {
      this.photos = photos
    },
    addPhoto(photo: Photo) {
      this.photos.push(photo)
    },
    incrementPage() {
      this.page++
    },
    setEndReached(value: boolean) {
      this.isEndReached = value
    },
    reset() {
      this.photos = []
      this.page = 1
      this.isEndReached = false
    }
  },
  persist: true
})