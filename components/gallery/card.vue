<script setup lang="ts">
defineProps<{
  label: string
  imageName: string
  link: string
  alt?: string | null
  isLimitedAcces?: boolean
}>()
</script>

<template>
  <NuxtLink :to="link" class="gallery-card">
    <div class="_blank-indacator">
      <IconUse id="external-link" :width="20" :height="20" />
    </div>
    <NuxtImg
      :src="`/gallery-content/${imageName}.jpg`"
      :alt="alt || 'Photo'"
      loading="lazy"
      decoding="async"
      class="card-img animate"
      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
      format="webp"
      quality="80"
    />
    <div class="gallery-card__description">
      <h3>{{ label }}</h3>
    </div>
  </NuxtLink>
</template>

<style scoped>
.gallery-card {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 12px;
  border-radius: 20px;
  border: 1px solid var(--decoration-border-color);
  overflow: hidden;
  transition: .2s ease;
  box-shadow: 0 0 8px #00000014;
  background: var(--bg-color-1);
  text-decoration: none;
  animation: fade-in .2s ease;
  z-index: 0;
  
  &:not(:has(.download:hover)):hover ._blank-indacator,
  &:focus ._blank-indacator {
    transform: translate(0);
    opacity: 1;
  }
  
  h3 {
    margin: 0;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 650;
    font-style: italic;
  }
}

.gallery-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-img {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 4/3.5;
  object-fit: cover;
  border-bottom: 1px solid var(--decoration-border-color);
  border-radius: 0 0 20px 20px ;
  transition: opacity 0.4s ease, transform 0.4s ease;
  color: transparent;
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