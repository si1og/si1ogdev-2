import { startCacheAutoUpdate } from '~/server/utils/cacheUpdater'

export default defineNitroPlugin(() => {
  startCacheAutoUpdate()
})