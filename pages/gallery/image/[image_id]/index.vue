<script setup lang="ts">
import { NuxtLink } from '#components'
import { formatDistanceToNow } from 'date-fns'

import type { PhotoByAPI } from '~/types/photo'

definePageMeta({
  layout: 'gallery'
})

const router = useRouter()
const previousUrl = (router.options.history.state as {back?: string}).back

const route = useRoute()
const image_id = route.params.image_id as string
let currentPath = route.path

const shareText = ''

if (import.meta.client) currentPath = window.location.origin + currentPath


const { data, error, pending } = await useLazyFetch<PhotoByAPI>('/api/photo', {
  query: { id: image_id },
  key: `photo-${image_id}`
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

// Share Dialog Code

const dialog = ref<HTMLDialogElement | null>(null)
const isDialogOpen = ref(false)

watchEffect(() => {
  if (route.hash === '#share') {
    isDialogOpen.value = true;
  } else {
    isDialogOpen.value = false;
  }
})

function handleDialogClick(event: MouseEvent) {
  if (dialog.value && event.target === dialog.value) {
    isDialogOpen.value = false;
  }
}

onMounted(() => {
  if (!dialog.value) return
  if (isDialogOpen.value) dialog.value?.showModal()

  dialog.value.addEventListener('close', () => {
    isDialogOpen.value = false
  })
  dialog.value.addEventListener('cancel', () => {
    isDialogOpen.value = false
  })
  dialog.value.addEventListener('click', (e) => {
    if (e.target === dialog.value) {
      isDialogOpen.value = false
    }
  })
})

watch(isDialogOpen, (isOpen) => {
  if (!isOpen && route.hash === '#share') {
    router.replace({
      path: route.path,
      query: route.query
    })

    dialog.value?.close()
  }

  if (isOpen) {
    dialog.value?.showModal()
  }
})

const isCopied = ref<boolean>(false)

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    isCopied.value = true
    
    setTimeout(() => {
      isCopied.value = false
    }, 1500)
  })
}
</script>

<template>
  <div class="photo-wrapper">
    <div class="roting">
      <NuxtLink class="roting__back" :to="previousUrl ? previousUrl : '/gallery'">
        <IconUse id="back-arrow" :width="20" :height="20" /> 
        <span>{{ previousUrl ? 'Back to previous page' : 'Go to gallery' }}</span>
      </NuxtLink>
      <div v-if="pending" class="loading-handle">
        <div class="loading-handle__msg">
          Getting data from server...
        </div>
        <div class="loading-animation">
          <span class="animation">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
    </div>
    <div v-if="error">
      <p class="error">Ошибка: {{ error.statusCode }} – {{ error.statusMessage }}</p>
    </div>
    <div v-else-if="!pending" class="photo">
      <div class="photo__image photo__image--stacked" :class="data?.orientation" :style="`aspect-ratio: ${data?.aspect_ratio};`">
        <NuxtImg
          v-if="data"
          :key="data.id"
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
          :key="data.id"
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
          <div v-if="data?.created_at" class="photo__info--base">
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
          <div v-if="data?.exif" class="photo__info--exif">
            <ul class="photo__exif">
              <li v-for="value, key in data.exif" :key="key">
                {{ value }}
              </li>
            </ul>
          </div>
        </div>
        <ul class="photo__controls">
          <li>
            <NuxtLink class="photo__share" :to="`${data?.id}#share`">
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
      <div v-if="data?.tags.length" class="tags-conteiner">
        <h2>Tags</h2>
        <ul class="tags">
          <li v-for="tag in data.tags" :key="tag.title" class="tags__item">
            <NuxtLink :to="`/gallery/tag/${tag.title}`">
              <span>{{ tag.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <dialog ref="dialog" class="share-dialog" @click="handleDialogClick">
        <div class="share-dialog__content">
          <header>
            <h2>Share this photo</h2>
            <button autofocus @click="isDialogOpen = false">
              <IconUse id="close" :width="15" :height="15" />
            </button>
          </header>
          <main>
            <ul>
              <li>
                <NuxtLink
                  :to="`https://t.me/share/url?url=${currentPath}&text=${shareText}`"
                  target="_blank"
                  rel="noopener"
                  >
                  <IconUse id="telegram" :width="20" :height="20" />
                  Share to Telegram
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  :to="`https://wa.me/?text=${currentPath}`"
                  target="_blank"
                  rel="noopener"
                  >
                  <IconUse id="whatsapp" :width="20" :height="20" />
                  Share to WhatsApp
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  :to="`mailto:?subject=${shareText}&body=${currentPath}`"
                  target="_blank"
                  rel="noopener"
                  >
                  <IconUse id="mail" :width="20" :height="20" />
                  Share via Email
                </NuxtLink>
              </li>
            </ul>
            <div class="manual-share">
              <span class="manual-share__url">
                {{ currentPath  }}
              </span>
              <button class="manual-sahre__copy" @click="copyToClipboard(currentPath)">
                <div v-if="!isCopied" class="manual-sahre__button-value">
                  <IconUse id="copy" :width="20" :height="20" />
                  Copy!
                </div>
                <div v-else class="manual-sahre__button-value">
                  Copied!
                </div>
              </button>
            </div>
          </main>
        </div>
      </dialog>
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
  padding: 20px 0;
}

.photo,
.sceleton {
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

.roting {
  display: flex;
  gap: 10px;
}

.roting__back,
.loading-handle__msg,
.manual-sahre__copy {
  display: flex;
  gap: 7px;
  margin: 0 0 10px 0;
  padding: 2px 10px;
  border-radius: 30px;
  border: 1px solid var(--decoration-border-color);
  box-shadow: 0 0 6px #0000000a;
  transform-origin: bottom;
  background: transparent;
  font-size: 18px;
  text-decoration: none;
  &:hover,
  &:focus {
    transform: scale(1.03);
    background: var(--bg-color-11);
  }
}

.share-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  border: 1px solid var(--decoration-border-color);
  border-radius: 20px;
  box-shadow: 0 0 10px #0000000a;
  background: none;
  transform: translate(-50%, -50%);
}

::backdrop {
  background: #0000007a;
  mask-image: radial-gradient(#0000006f, rgb(0, 0, 0));
}

.share-dialog__content {
  background: var(--bg-color-2);
  padding: 20px;
  h2 {
    margin: 0 0 15px 0;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--text-color-1);
      &:hover,
      &:focus-visible {
        background: var(--element-active-color);
      }
    }
  }
  main {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        padding: 0;
        &:last-of-type:nth-of-type(2n+1) {
          grid-column-start: 1;
          grid-column-end: 3;
        }
        a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 10px 5px 5px;
          border: 1px solid var(--decoration-border-color);
          border-radius: 30px;
          box-shadow: 0 0 6px #0000000a;
          background: var(--bg-color-1);
          transform-origin: bottom;
          text-decoration: none;
          &:hover,
          &:focus {
            background: var(--bg-color-11);
          }
          .icon {
            padding: 7px;
            border: 1px solid var(--text-color-1);
            border-radius: 50%;
          }
        }
      }
    }
  }
}
.manual-share {
  display: flex;
  gap: 10px;
}
.manual-share__url {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 30px;
  background: var(--element-active-color);
  color: color-mix(in srgb, var(--text-color-1) 40%, transparent 60%);
}
.manual-sahre__copy {
  justify-content: center;
  min-width: 100px;
  margin: 0;
  padding: 8px 12px;
  div {
    display: flex;
    align-items: center;
    gap: 7px;
  }
}
.loading-handle {
  display: flex;
  gap: 10px;
  align-items: center;
}
.loading-animation {
  position: relative;
  top: -4px;
	width: 30px;
	height: 30px;
	border-radius: 25px;
	box-shadow: 0 0 6px #0000000a;
  border: 1px solid var(--decoration-border-color);
}
.loading-animation .animation {
	top: -9px;
	left: -3px;
}
.animation {
	display: inline-block;
	position: relative;
	width: 10px;
	height: 10px;
}
.animation span {
	position: absolute;
	box-sizing: border-box;
	display: block;
	width: 18px;
	height: 18px;
	margin: 8px;
	border: 2px solid #fff;
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: var(--text-color-1) transparent transparent transparent;
}
.animation span:nth-child(1) {
	animation-delay: -0.45s;
}
.animation span:nth-child(2) {
	animation-delay: -0.3s;
}
.animation span:nth-child(3) {
	animation-delay: -0.15s;
}
@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
@keyframes modal-background-add {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.preview-img {
  color: transparent;
}
</style>
