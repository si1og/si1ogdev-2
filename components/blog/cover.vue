<script setup lang="ts">
interface Props {
  image: string
  alt: string
}

withDefaults(defineProps<Props>(), {
  image: '#',
  alt: 'no-img',
})

let isShowPlaceholder = ref(true)
</script>

<template>
  <div class="cover">
    <NuxtImg fit="cover" :alt="alt" :src="image" :placeholder="isShowPlaceholder ? [200, 31, 90, 8] : false" @load="() => {
      isShowPlaceholder = false;
    }" :class="{ 'fade-in': !isShowPlaceholder }" />
  </div>
</template>
<style scoped>
.cover {
  position: relative;
  max-width: var(--content-max-width);
  width: 100%;
  height: 300px;
  overflow: hidden;
  pointer-events: none;

  img {
    height: auto;
    width: 100%;
  }
}
</style>