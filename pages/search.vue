<script lang="ts" setup>
let searchContent = ref('');

async function search() {
  console.log('search');
}

useHead({
  title: 'Поиск',
  meta: [
    {
      name: 'description',
      content: 'Поиск по блогу',
    },
  ],
})
</script>

<template>
  <div class="search-box">
    <div class="search">
      <form @submit.prevent="search" class="search__form">
        <input type="text" v-model="searchContent" class="search__input" placeholder="Введите что-нибудь...">
        <button class="search__button">
          Найти
          <IconUse :id="'search'" :width="20" :height="20" />
        </button>
      </form>
      <ClientOnly>
        <div class="search-suggests">
          <NuxtLink :to="'#'" class="search-suggests__suggest" v-for="elem in 3">
            <p class="search-suggests__label">
              Управление ИТ-активами – скучная рутина или творческая задача?
            </p>
            <div class="search-suggests__date">13 дек 2020</div>
          </NuxtLink>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
<style>
.search-box {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 80px 30px 30px 30px;
}

.search {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 1040px;
  width: 100%;

}

.search__form {
  display: flex;
  gap: 20px;
  padding: 25px 40px;
  border-radius: 20px;
  box-shadow: 4px 8px 40px #08186F33;
  background: var(--main-component-color);

  input {
    width: 100%;
    height: 50px;
    padding: 14px 40px;
    border-radius: inherit;
    border: none;
    background: var(--form-background-color);

    &:hover,
    &:focus {
      background: var(--form-active-background-color);
    }
  }

  button {
    --color: var(--img-text-color);

    display: flex;
    gap: 10px;
    padding: 14px 60px;
    border: none;
    border-radius: inherit;
    background: var(--blue-text-color);
    color: var(--color);

    svg {
      fill: var(--color);
    }

    &:hover,
    &:focus {
      background: var(--blue-active-text-color);
      cursor: pointer;
    }
  }
}

.search-suggests {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 40px;
  border-radius: 20px;
  box-shadow: 4px 8px 40px #08186F33;
  background: var(--main-component-color);

  a {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &:nth-of-type(n+2)::after {
      position: absolute;
      top: -10px;
      content: "";
      width: 100%;
      height: 1px;
      background: var(--dividing-string-color);
    }

    p {
      margin: 0;
      transition: .2s ease;
    }

    div {
      font-size: 14px;
      opacity: .5;
    }

    &:hover,
    &:focus {
      p {
        color: var(--blue-text-color);
      }
    }
  }
}
</style>