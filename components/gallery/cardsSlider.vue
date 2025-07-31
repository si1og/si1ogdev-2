<script setup lang="ts">
import { GalleryCard } from '#components'
import { galleryContent } from '~/data/gallery'

const { year } = defineProps<{ year: number }>()

// Получаем список отчётов
const content = computed(() => galleryContent[year]?.reports ?? [])

// Разбиваем массив по 8 элементов (4x2)
const chunkedContent = computed(() => {
  const result = []
  const items = content.value.slice().reverse()
  for (let i = 0; i < items.length; i += 8) {
    result.push(items.slice(i, i + 8))
  }
  return result
})
</script>

<template>
  <div class="cards-slider">
    <h2 v-if="year === new Date().getFullYear()">Recent reports</h2>
    <h2 v-else>Reports of the {{ year }}</h2>

    <ClientOnly>
      <swiper-container
        :slides-per-view="1"
        :space-between="30"
        :navigation="true"
        :pagination="true"
        style="--swiper-navigation-color: var(--text-color-1); --swiper-pagination-color: var(--text-color-1)"
      >
        <swiper-slide v-for="(chunk, i) in chunkedContent" :key="i">
          <div class="reports-grid">
            <GalleryCard
              v-for="report in chunk"
              :key="report.id"
              :label="report.name"
              :image-name="report.image"
              :link="report.link"
              :alt="report.name"
              :is-limited-acces="report.isLimitedAccess"
            />
          </div>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>

<style scoped>
.reports-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 300px);
}
h2 {
  font-family: 'Vollkorn';
  font-style: italic;
}
</style>
