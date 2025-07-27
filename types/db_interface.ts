export interface DbPhoto {
  id: string
  alt_description: string
  created_at: string
  orientation: 'landscape' | 'portrait'
  previewUrl: string
  thumb: string
  small: string
  full: string
  blurHash: string
  download_link: string
}

export interface DbCacheMeta {
  updated_at: string
}
