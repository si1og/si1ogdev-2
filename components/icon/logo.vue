<template>
  <NuxtLink to="/" class="logo">
    <div class="circle"></div>
  </NuxtLink>
</template>

<style scoped>
.logo {
  position: relative;
  width: 48px;
  height: 48px;

  .circle {
    position: absolute;
    width: 48px;
    aspect-ratio: 1;
    background: var(--blue-background-color);
    border-radius: 50%;

    &::after {
      position: absolute;
      content: "";
      top: 22px;
      left: 24px;
      width: 26px;
      aspect-ratio: 1;
      background: var(--main-component-color);
      border-radius: inherit;
      box-shadow: 0px 4px 4px #00000025;
    }
  }
}
</style>