<script setup lang="ts">
const router = useRouter()

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
      <NuxtImg alt="Страница не найдена" src="/msg/404.png" />
      <h3>Что-то пошло не так...</h3>
      <button @click="$router.back()">
        <IconUse :id="'next'" :width="6" :height="11" />
        Вернуться назад
      </button>
    </div>
  </div>
</template>
<style>
.p404 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 40px 30px;
}

.p404__content {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;

  h3,
  img {
    margin: 0;
  }

  h3 {
    font-size: 30px;
  }

  img {
    width: 326px;
    height: 326px;
  }

  button {
    --color: var(--blue-text-color);

    display: inline-flex;
    gap: 8px;
    padding: 10px 16px;
    border: 0;
    border-radius: 8px;
    background: var(--non-active-button-color);
    color: var(--color);

    svg {
      fill: var(--color);
    }

    &:hover,
    &:focus {
      cursor: pointer;
      background: var(--button-hover-color);
    }

    &:active {
      background: var(--button-active-color);
    }

  }
}
</style>