<script setup lang="ts">
import type { PhotoByAPI } from '~/types/photo'

definePageMeta({
  layout: 'gallery'
})

const route = useRoute()
const image_id = route.params.image_id as string

const { data, error, pending } = await useLazyFetch<PhotoByAPI>('/api/photo', {
  query: { id: image_id }
})

</script>

<template>
  <div class="gallery-wrapper">
    <h2>{{ image_id }}</h2>

    <div v-if="pending">Загрузка...</div>
    <div v-else-if="error">
      <p class="error">Ошибка: {{ error.statusCode }} – {{ error.statusMessage }}</p>
    </div>
    <div v-else>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<style scoped>
.gallery-wrapper {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
