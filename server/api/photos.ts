import { defineEventHandler, getQuery } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  const username = process.env.UNSPLASH_USERNAME

  const query = getQuery(event)
  const page = query.page ? Number(query.page) : 1
  const perPage = 30

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
    ...photo,
    orientation: photo.width > photo.height ? 'landscape' : 'portrait'
  }))

  return photos
})
