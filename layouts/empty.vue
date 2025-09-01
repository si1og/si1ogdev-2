<template>
  <div class="page">
    <main-header :is-header-empty="true"/>
    <main class="main" id="main">
      <div />
      <slot />
    </main>
    <main-footer :is-empty-layout="true" />
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  max-width: var(--content-max-width);
  padding: 0 42px;
}

header {
  position: fixed;
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
