import { defineEventHandler } from 'h3'
import { $fetch } from 'ofetch'

import type { Stats } from '~/types/stats'

export default defineEventHandler(async () => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  const username = process.env.UNSPLASH_USERNAME
  let res

  try {
    res = await $fetch(`https://api.unsplash.com/users/${username}/statistics`, {
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    })
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch photo data'
    })
  }
  
  const stats: Stats = {
    views: res.views.total,
    downloads: res.downloads.total
  }

  return stats
})
  