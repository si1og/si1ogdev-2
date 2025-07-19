<script setup lang="ts">
import { NuxtImg } from '#components'

defineProps<{
  src: string
  image_id: string
  alt?: string | null
  orientation?: 'portrait' | 'landscape'
  download_link?: string
}>()
</script>

<template>
  <NuxtLink :to="`gallery/image/${image_id}`" class="gallery-item" :class="orientation">
    <div class="_blank-indacator">
      <IconUse id="external-link" :width="20" :height="20" />
    </div>
    <NuxtImg
      :src="src"
      :alt="alt || 'Photo'"
      loading="lazy"
      decoding="async"
      class="gallery-img animate"
      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
      format="webp"
      quality="80"
    />
    <NuxtLink :to="download_link" class="download">
      <IconUse id="download" :width="20" :height="20" />
      <span class="download__text">
        Download
      </span>
    </NuxtLink>
  </NuxtLink>
</template>

<style scoped>
.gallery-item {
  position: relative;
  grid-row-end: span var(--rows, 11);
  width: 100%;
  display: block;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: .2s ease;
  box-shadow: 0 0 8px #00000014;
  animation: fade-in .2s ease;
  z-index: 0;

  &:not(:has(.download:hover)):hover ._blank-indacator,
  &:focus ._blank-indacator,
  &:hover .download,
  &:focus .download,
  &:has(:focus) .download {
    transform: translate(0);
    opacity: 1;
  }
}

.gallery-item:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.4s ease, transform 0.4s ease;
  color: transparent;
}

/* Управление размером */
.gallery-item.portrait {
  --rows: 20;
}
.gallery-item.landscape {
  --rows: 7;
}

.download {
  position: absolute;
  bottom: 0;
  left: 0;
  width: auto;
  height: 30px;
  padding: 0 0 0 30px;
  border-radius: 0 10px 0 0;
  background: var(--bg-color-1);
  transition: .2s ease;
  overflow: hidden;

  /* On not avtive */
  transform: translate(-40%, 40%);
  opacity: 0;
  & > span {
    position: absolute;
    top: 50%;
    right: 7px;
    font-size: 16px;
    color: var(--text-color-1);
    opacity: 0;
    transition: inherit;
    transform: translate(0, -50%);
  }

  &:hover,
  &:focus {
    width: auto;
    padding: 0 75px 0 30px;
    span {
      opacity: 1;
    }
  }

  &::after {
    content: "";

    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background: var(--bg-color-1);
  }
}


</style>


<style>
._blank-indacator {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 0 0 0 10px;
  box-shadow: 0 0 8px #00000014;
  background: var(--bg-color-1);
  opacity: 0;
  transform: translate(40%, -40%);
  transition: .2s ease;
  svg {
    top: 5px;
    position: absolute;
    stroke: var(--text-color-1);
  }
}

.download svg {
  fill: var(--bg-color-1);
  position: absolute;
  top: 3px;
  left: 5px;
  z-index: 1;
}
</style>