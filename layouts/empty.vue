<template>
  <div class="page">

    <main class="main" id="main">
      <div />
      <slot />
    </main>

  </div>
</template>

<style scoped>
.main {
  width: 100%;
  max-width: var(--content-max-width);
  padding: 0 42px;
}

.page {
  display: grid;
  grid-template-rows: 1fr;
  justify-items: center;
  min-height: 100vh;
}
</style>
