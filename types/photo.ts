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
  },
  links: {
    download: string
  }
}

export interface PhotoByAPI {
  id: string
  alt_description: string
  created_at: string
  orientation: 'landscape' | 'portrait'
  aspect_ratio: string
  previewUrl: string
  sizes: {
    thumb: string
    small: string
    regular: string
    full_hd: string
    full: string
    blurHash: string
  },
  links: {
    download: string,
    html: string
  }
  exif: {
    name: string,
    exposure_time: string,
    aperture: string,
    focal_length: string,
    iso: string
  }
  tags: { type: string, title: string }[]
  views: number,
  downloads: number
}