import { defineEventHandler, getQuery } from 'h3'

import db from '~/server/utils/db'

async function getPhotosFromDB(
  page: number = 1,
  perPage: number = 30,
  year?: number
): Promise<any[]> {
  const offset = (page - 1) * perPage

  let query = 'SELECT * FROM photos'
  const params: string | number[] = []

  if (year) {
    query += ' WHERE YEAR(created_at) = ?'
    params.push(year)
  }

  query += ' ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?'
  params.push(perPage, offset)

  const [results] = await db.query<any[]>(query, params)
  return results
}


export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = query.page ? Number(query.page) : 1
  const perPage = 20
  const year = query.year ? Number(query.year) : 0

  const res = await getPhotosFromDB(page, perPage, year)

  const photos = res.map(photo => ({
    id: photo.id,
    alt_description: photo.alt_description,
    created_at: photo.created_at,
    orientation: photo.orientation,
    previewUrl: photo.preview_url,
    sizes: {
      thumb: photo.thumb_url,
      small: photo.small_url,
      full: photo.full_url,
      blurHash: photo.blur_hash
    },
    links: {
      download: photo.download_link
    }
  }))

  return photos
})
