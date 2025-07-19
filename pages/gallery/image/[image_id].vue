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

const isPreviewLoaded = ref(false)

function handlePreviewLoaded() {
  isPreviewLoaded.value = true
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
    <div class="photo" v-else>
      <div class="photo__image photo__image--stacked" :class="data?.orientation" :style="`aspect-ratio: ${data?.aspect_ratio};`">
        <NuxtImg
          v-if="data"
          :src="data.sizes.thumb"
          :alt="data.alt_description || 'Photo preview'"
          class="preview-img animate"
          format="webp"
          quality="30"
          loading="eager"
          placeholder="empty"
          :style="`aspect-ratio: ${data.aspect_ratio};`"
          @load="handlePreviewLoaded"
        />
        <NuxtImg
          v-if="data && isPreviewLoaded"
          :src="data.sizes.regular"
          :alt="data.alt_description || 'Photo'"
          fit="cover"
          loading="lazy"
          decoding="async"
          class="gallery-img animate"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
          format="webp"
          quality="80"
        />
      </div>
      <div class="photo__about">
        <div class="photo__info">
          <h2>Stats</h2>
          <div class="photo__info--base" v-if="data?.created_at">
            <div class="photo__views">Views {{ data?.views }}</div>
            <div class="photo__downloads">Downloads {{ data?.downloads }}</div>
            <div class="photo__date-from-pub"> 📅 {{ getTimeFromPublished(data.created_at) }}</div>
          </div>
          <h2>Tech info</h2>
          <div class="photo__info--exif" v-if="data?.exif">
            <ul class="photo__exif">
              <li v-for="value, key in data.exif">
                <NuxtLink :to="`/gallery/camera/${key}/${value}`">{{ value }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="photo__controls">
          <div class="photo__controls--left">
            <NuxtLink class="photo__download" :to="data?.links.download">Download</NuxtLink>
            <NuxtLink class="photo__view" :to="data?.links.html">View on Unsplash</NuxtLink>
          </div>
          <div class="photo__controls--right">
            <NuxtLink class="photo__download" :to="data?.links.download">Share</NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <ul class="tags" v-if="data?.tags">
      <li class="tags__item" v-for="tag in data.tags">
        <NuxtLink :to="`/gallery/tag/${tag.title}`">{{ tag.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2, p {
  margin: 0;
  text-wrap: balance;
}
h2 {
  font-family: 'Vollkorn';
  font-style: italic;
}

.photo-wrapper {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
}

.photo {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 20px;
  width: 100%;
}

.photo__image {
  position: relative;
  border-radius: 20px;
  box-shadow: 0 0 10px #00000021;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    object-fit: contain;
  }
}
.photo__about {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
