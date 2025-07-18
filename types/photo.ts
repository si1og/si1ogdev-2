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
  previewUrl: string
  sizes: {
    thumb: string
    small: string
    regular: string
    full: string
    blurHash: string
  },
  links: {
    download: string,
    html: string
  }
  exif: {
    make: string,
    model: string,
    name: string,
    exposure_time: string,
    aperture: string,
    focal_length: string,
    iso: number
  }
  tags: { type: string, title: string }[]
  views: number,
  downloads: number
}