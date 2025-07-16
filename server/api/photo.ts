import { Link } from '#components'
import { defineEventHandler, getQuery } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  const username = process.env.UNSPLASH_USERNAME

  const query = getQuery(event)
  const id = query.id

  const res = await $fetch<any[]>(`https://api.unsplash.com/photos/${id}`, {
    headers: {
      Authorization: `Client-ID ${accessKey}`
    }
  })
  
  const photo = {
    ...res
  }

  return photo
})
