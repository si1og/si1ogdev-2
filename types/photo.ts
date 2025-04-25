export interface Photo {
  id: string
  created_at: string
  urls: {
    small: string
    full: string
    regular: string
    thumb: string
  }
  alt_description: string | null
}
