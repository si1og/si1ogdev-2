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
          <div class="photo__image photo__image--stacked">
          <NuxtImg
            v-if="data"
            :src="data.sizes.thumb"
            :alt="data.alt_description || 'Photo preview'"
            class="preview-img"
            format="webp"
            quality="30"
            loading="eager"
            placeholder="empty"
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
        </div>
        
        <div class="photo__info">
          <ul class="photo__info--tags">
            <li class="photo__tag" v-for="tag in data?.tags">
              <NuxtLink :to="`/gallery/tag/${tag.title}`">{{ tag.title }}</NuxtLink>
            </li>
          </ul>
          <div class="photo__info--base">
            <div class="photo__views">Views {{ data?.views }}</div>
            <div class="photo__downloads">Downloads {{ data?.downloads }}</div>
          </div>
          <div class="photo__info--time" v-if="data?.created_at">
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

/* .photo__image--stacked {
  position: relative;
}

.preview-img,
.gallery-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  transition: opacity 0.5s ease;
}

.preview-img {
  filter: blur(8px);
  opacity: 1;
  z-index: 1;
} */

</style>
