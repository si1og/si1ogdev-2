export interface Photo {
  id: string
  alt_description: string
  created_at: string
  orientation: 'landscape' | 'portrait'
  previewUrl: string
  sizes: {
    thumb: string
    small: string
    full: string
    blurHash: string
  }
}
