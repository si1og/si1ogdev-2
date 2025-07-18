import { defineEventHandler } from 'h3'
import { $fetch } from 'ofetch'

import type { Stats } from '~/types/stats'

export default defineEventHandler(async () => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  const username = process.env.UNSPLASH_USERNAME

  const res = await $fetch<any>(`https://api.unsplash.com/users/${username}/statistics`, {
    headers: {
      Authorization: `Client-ID ${accessKey}`
    }
  })
  
  const stats: Stats = {
    views: res.views.total,
    downloads: res.downloads.total
  }

  return stats
})
  