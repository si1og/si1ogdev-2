<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

import type { PhotoByAPI } from '~/types/photo'

definePageMeta({
  layout: 'gallery'
})

const route = useRoute()
const image_id = route.params.image_id as string

const { data, error, pending } = await useLazyFetch<PhotoByAPI>('/api/photo', {
  query: { id: image_id }
})

function getTimeFromPublished(published_at: string): string {
  return `Published ${formatDistanceToNow(new Date(published_at), {
    addSuffix: true
  })}`
}
</script>

<template>
  <div class="photo-wrapper">
    <div class="sceleton" v-if="pending">
      <div class="sceleton__image"></div>
      <div class="sceleton__description"></div>
    </div>
    <div v-else-if="error">
      <p class="error">Ошибка: {{ error.statusCode }} – {{ error.statusMessage }}</p>
    </div>
    <div class="photo-conteiner" v-else>
      <div class="photo">
        <div class="photo__layout">
          <div class="photo__controls">
            <div class="photo__controls--left">
              <NuxtLink class="photo__download" :to="data?.links.download">Download</NuxtLink>
              <NuxtLink class="photo__view" :to="data?.links.html">View on Unsplash</NuxtLink>
            </div>
            <div class="photo__controls--right">
              <NuxtLink class="photo__download" :to="data?.links.download">Share</NuxtLink>
            </div>
          </div>
          <div class="photo__image">
            <NuxtImg
            :src="data?.sizes.regular"
            :alt="data?.alt_description || 'Photo'"
            fit="cover"
            loading="lazy"
            decoding="async"
            class="gallery-img animate"
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
            format="webp"
            quality="80"
          />
          </div>
        </div>
        <div class="photo__info">
          <div class="photo__info--left">
            <div class="photo__views">Views {{ data?.views }}</div>
            <div class="photo__downloads">Downloads {{ data?.downloads }}</div>
          </div>
          <div class="photo__info--right" v-if="data?.created_at">
            <div class="photo__date-from-pub"> 📅 {{ getTimeFromPublished(data.created_at) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo-wrapper {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
