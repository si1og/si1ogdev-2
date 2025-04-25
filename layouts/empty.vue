<template>
  <div class="page">
    <header>
      <NuxtLink to="#main" class="skip-nav">
        Skip to main content
      </NuxtLink>
      <div class="split">
        <IconLogo />
        <nav class="theme-switch--conteiner">
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
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

header {
  position: fixed;
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
