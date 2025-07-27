import { getMeta, updateDBCacheMeta, refreshPhotoCache } from './photoCache'

let isRunning = false

export async function startCacheAutoUpdate(intervalMs: number = 1000 * 60 * 60 * 3) {
  if (isRunning) return
  isRunning = true

  const loop = async () => {
    try {
      const meta = await getMeta()

      if (meta.length === 0) {
        await updateDBCacheMeta()
        return setTimeout(loop, intervalMs)
      }

      const dbCacheDate = new Date(meta[0].updated_at)
      const now = new Date()
      const diffInMs = now.getTime() - dbCacheDate.getTime()
      const diffInHours = diffInMs / (1000 * 60 * 60)

      if (diffInHours > 3) {
        await refreshPhotoCache()
      }
    } catch (err) {
      console.error('Error during cache update:', err)
    } finally {
      setTimeout(loop, intervalMs)
    }
  }

  loop()
}
