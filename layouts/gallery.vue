<template>
  <div class="page">
    <GalleryHeader />

    <main class="main" id="main">
      <div />
      <slot />
    </main>

    <MainFooter />
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  max-width: 1440px;
  padding: 0 42px;
}

.page {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  justify-items: center;
  min-height: 100vh;
}
</style>
