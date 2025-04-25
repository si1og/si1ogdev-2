import { defineEventHandler } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async () => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  const username = process.env.UNSPLASH_USERNAME

  const res = await $fetch(`https://api.unsplash.com/users/${username}/photos`, {
    params: {
      per_page: 30,
      order_by: 'latest'
    },
    headers: {
      Authorization: `Client-ID ${accessKey}`
    }
  })

  return res
})
