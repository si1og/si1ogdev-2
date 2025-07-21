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
      <div class="sceleton__image animate"></div>
      <div class="sceleton__description">
        <div class="sceleton__stats">
          <div class="sceleton__panel animate" style="width: 139px;"></div>
          <div class="sceleton__panel animate" style="width: 100px;"></div>
          <div class="sceleton__panel animate" style="width: 100px;"></div>
        </div>
        <div class="sceleton__info">
          <div class="sceleton__panel animate" style="width: 100px;"></div>
          <div class="sceleton__panel animate" style="width: 100px;"></div>
          <div class="sceleton__panel animate" style="width: 100px;"></div>
        </div>
      </div>
    </div>
    <div v-else-if="error">
      <p class="error">Ошибка: {{ error.statusCode }} – {{ error.statusMessage }}</p>
    </div>
    <div class="photo" v-else>
      <div class="photo__image photo__image--stacked" :class="data?.orientation" :style="`aspect-ratio: ${data?.aspect_ratio};`">
        <NuxtImg
          v-if="data"
          :src="data.sizes.small"
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
          :src="data.sizes.full_hd"
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
            <div class="photo__views">
              <IconUse id="views" :width="20" :height="20" /> 
              <span>
                Views {{ data?.views }}
              </span>
            </div>
            <div class="photo__downloads">
              <IconUse id="download" :width="20" :height="20" /> 
              <span>
                Downloads {{ data?.downloads }}
              </span>
            </div>
            <div class="photo__date-from-pub">
              <IconUse id="calendar" :width="20" :height="20" /> 
              <span>
                {{ getTimeFromPublished(data.created_at) }}
              </span>
            </div>
          </div>
          <h2>Camera info</h2>
          <div class="photo__info--exif" v-if="data?.exif">
            <ul class="photo__exif">
              <li v-for="value, key in data.exif">
                {{ value }}
              </li>
            </ul>
          </div>
        </div>
        <ul class="photo__controls">
          <li>
            <NuxtLink class="photo__share" to="share">
              <IconUse id="share" :width="20" :height="20" />
              Share
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="photo__download" :to="data?.links.download">
              <IconUse id="download" :width="20" :height="20" />
              Download
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="photo__view" :to="data?.links.html">
              <IconUse id="unsplash-icon" :width="20" :height="20" />
              View on Unsplash
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="tags-conteiner" v-if="data?.tags.length">
      <h2>Tags</h2>
      <ul class="tags">
        <li class="tags__item" v-for="tag in data.tags">
          <NuxtLink :to="`/gallery/tag/${tag.title}`">
            <span>{{ tag.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h2, p {
  margin: 12px 0 5px 0;
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
  grid-template-columns: 1fr 215px;
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
.photo__info--base,
.photo__exif,
.photo__controls,
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  & > div {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 7px 12px;
    border-radius: 30px;
    border: 1px solid var(--decoration-border-color);
    box-shadow: 0 0 6px #0000000a;
    span {
      text-wrap: balance;
    }
  }
}

.photo__exif {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    gap: 7px;
    padding: 7px 12px;
    border-radius: 30px;
    border: 1px solid var(--decoration-border-color);
    box-shadow: 0 0 6px #0000000a;
    transform-origin: bottom;
    transition: .2s ease;
  }
}

:where(.photo__controls, .tags) {
  margin: 0;
  padding: 0;
  list-style: none;
  a {
    display: flex;
    gap: 7px;
    padding: 7px 12px;
    border-radius: 30px;
    border: 1px solid var(--decoration-border-color);
    box-shadow: 0 0 6px #0000000a;
    transform-origin: bottom;
    text-decoration: none;
    &:hover,
    &:focus {
      background: var(--bg-color-11);
      transform: scale(1.03);
    }
  }
}

.tags span::first-letter {
  text-transform: uppercase;
}



</style>
