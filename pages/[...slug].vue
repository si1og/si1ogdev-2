<script setup lang="ts">

definePageMeta({
  layout: 'empty'
})

useHead({
  title: 'Страница не найдена',
  meta: [
    {
      name: 'description',
      content: 'Страница не найдена',
    },
  ],
})

</script>

<template>
  <div class="p404">
    <div class="p404__content">
      <div class="p404__info">
        <h1>Page not found</h1>
        <p>Hmm, the page you were looking for doesn’t seem to exist anymore.</p>
        <SvgBackgroundGrid class="p404__grid" />
      </div>
      <NuxtLink to="/">
        <IconUse :id="'next'" :width="6" :height="11" />
        Back to main page
      </NuxtLink>
    </div>
  </div>
</template>
<style>
.p404 {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 40px 30px;
}

.p404__info {
  position: relative;
  width: 100%;
}
.p404__grid {
  top: 0;
  position: absolute;
  pointer-events: none;
  opacity: .5;
}
.p404__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h1 {
    margin: 27px 0 0 0;
    font-size: 50px;
    font-family: 'Vollkorn';
    text-align: center;
  }

  p {
    margin: 5px 0 30px 0;
    font-family: 'Vollkorn';
    font-style: italic;
    text-align: center;

  }

  a {
    --color: var(--text-color-1);

    display: inline-flex;
    gap: 8px;
    padding: 10px 16px;
    border: 0;
    border-radius: 30px;
    background: var(--bg-color-1);
    color: var(--color);
    box-shadow: 0 0 6px #00000014;
    text-decoration: none;

    svg {
      fill: var(--color);
    }

    &:hover,
    &:focus {
      cursor: pointer;
      transform: translateY(-3px);
      box-shadow: 0 2px 8px #0000001d;
    }

    &:active {
      background: var(--button-active-color);
    }

  }
}
</style>