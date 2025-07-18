import { defineEventHandler, getQuery } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  const username = process.env.UNSPLASH_USERNAME

  const query = getQuery(event)
  const page = query.page ? Number(query.page) : 1
  const perPage = 15

  const res = await $fetch<any[]>(`https://api.unsplash.com/users/${username}/photos`, {
    params: {
      per_page: perPage,
      page,
      order_by: 'latest',
    },
    headers: {
      Authorization: `Client-ID ${accessKey}`
    }
  })
  
  const photos = res.map(photo => ({
    id: photo.id,
    alt_description: photo.alt_description,
    created_at: photo.created_at,
    orientation: photo.width > photo.height ? 'landscape' : 'portrait',
    previewUrl: `${photo.urls.raw}&w=32&h=32&q=10&fit=crop`,
    sizes: {
      thumb: photo.urls.thumb,
      small: photo.urls.small,
      full: photo.urls.full,
      blurHash: photo.blur_hash
    },
    links: {
      download: photo.links.download
    }
  }))

  return photos
})
