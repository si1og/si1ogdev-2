import { $fetch } from 'ofetch'
import db from './db'
import type { DbCacheMeta } from '~/types/db_interface'

const accessKey = process.env.UNSPLASH_ACCESS_KEY
const username = process.env.UNSPLASH_USERNAME

export async function getMeta() {
  const [meta] = await db.query<DbCacheMeta[]>(
    'SELECT updated_at FROM cache_meta WHERE id = ?',
    ['photos']
  )

  return meta
}

export async function updateDBCacheMeta(): Promise<void> {
  await db.query(
    `INSERT INTO cache_meta (id, updated_at)
     VALUES (?, NOW())
     ON DUPLICATE KEY UPDATE updated_at = NOW()`,
    ['photos']
  )
}

export async function refreshPhotoCache(): Promise<void> {
  let allPhotos: any[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const photos = await $fetch<any[]>(`https://api.unsplash.com/users/${username}/photos`, {
      params: {
        per_page: 30,
        page,
        order_by: 'latest'
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    })

    if (!photos.length) {
      hasMore = false
    } else {
      allPhotos.push(...photos)
      page++
    }

    if (page > 100) break
  }

  const values = allPhotos.map(photo => [
    photo.id,
    photo.alt_description ? photo.alt_description : 'photo',
    new Date(photo.created_at).toISOString().slice(0, 19).replace('T', ' '),
    photo.width > photo.height ? 'landscape' : 'portrait',
    `${photo.urls.raw}&w=32&h=32&q=10&fit=crop`,
    photo.urls.thumb,
    photo.urls.small,
    photo.urls.full,
    photo.blur_hash,
    photo.links.download
  ])

if (values.length) {
  await db.query(
    `INSERT INTO photos (
      id, alt_description, created_at, orientation,
      preview_url, thumb_url, small_url, full_url,
      blur_hash, download_link
    ) VALUES ?
     ON DUPLICATE KEY UPDATE
      alt_description = VALUES(alt_description),
      created_at = VALUES(created_at),
      orientation = VALUES(orientation),
      preview_url = VALUES(preview_url),
      thumb_url = VALUES(thumb_url),
      small_url = VALUES(small_url),
      full_url = VALUES(full_url),
      blur_hash = VALUES(blur_hash),
      download_link = VALUES(download_link)`,
    [values]
  )
}

  await updateDBCacheMeta()
  console.log(`[Cache] Photo cache refreshed and meta updated at ${new Date().toISOString()}`)
}
