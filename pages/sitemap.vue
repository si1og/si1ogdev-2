<script setup lang="ts">
const { data: links } = await useAsyncData('sitemap', async () => {
  const response = await <any>$fetch('/sitemap.xml')
  const xml = await response.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'application/xml')

  const urls = [...doc.querySelectorAll('url > loc')].map((el) => el.textContent)
  console.log(urls)
  return urls
})
</script>

<template>
  <ClientOnly>
    <div class="sitemap">
      <h1>Sitemap</h1>
      <ul>
        <li v-for="url in links" :key="url">
          <NuxtLink to="url?.replace(location?.origin, '')">{{ url }}</NuxtLink>
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>

<style scoped>
.sitemap {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
}
.sitemap ul {
  list-style: none;
  padding: 0;
}
.sitemap li {
  margin: 0.5rem 0;
}
</style>