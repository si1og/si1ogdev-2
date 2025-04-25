export interface Photo {
  id: string
  created_at: string
  alt_description: string | null
  width: number
  height: number
  orientation: 'portrait' | 'landscape'
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
}