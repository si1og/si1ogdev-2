import { defineEventHandler, getQuery } from 'h3'
import { $fetch } from 'ofetch'

import type { PhotoByAPI } from '~/types/photo'

export default defineEventHandler(async (event) => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY

  const query = getQuery(event)
  const id = query.id

  if (!id || typeof id !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing or invalid ID'
    })
  }

  let res: any

  try {
    res = await $fetch(`https://api.unsplash.com/photos/${id}`, {
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    })
  } catch (err: any) {
    if (err?.response?.status === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Image not found'
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch photo data'
    })
  }

// console.log(res)

  const photo: PhotoByAPI = {
    id: res.id,
    alt_description: res.alt_description,
    created_at: res.created_at,
    orientation: res.width > res.height ? 'landscape' : 'portrait',
    previewUrl: `${res.urls.raw}&w=32&h=32&q=10&fit=crop`,
    sizes: {
      thumb: res.urls.thumb,
      small: res.urls.small,
      regular: res.urls.regular,
      full: res.urls.full,
      blurHash: res.blur_hash
    },
    links: {
      download: res.links.download,
      html: res.links.html
    },
    exif: {
      make: res.exif.make,
      model: res.exif.model,
      name: res.exif.name,
      exposure_time: res.exif.exposure_time,
      aperture: res.exif.aperture,
      focal_length: res.exif.focal_length,
      iso: res.exif.iso
    },
    tags: res.tags,
    views: res.views,
    downloads: res.downloads
  }

  return photo
})
