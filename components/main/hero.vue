<script setup lang="ts">
import { homePage } from '~/data'
import { homePageSocial } from '~/data'


</script>

<template>
  <div class="main-content">
    <div class="main-content__title">
      <h1>{{ homePage.name }}</h1>
      <p>{{ homePage.nameSubtitle }}</p>
      <SvgBackgroundGrid class="main-content__grid" />
    </div>
    <div class="description">
      <div class="description__info">
        <h2>{{ homePage.title }}</h2>
        <p>{{ homePage.description }}</p>
        <ul class="description__connect">
          <li v-for="item in homePageSocial">
            
          </li>
        </ul>
      </div>
      <div class="description__icon"></div>
    </div>
  </div>
</template>

<style scoped >
.main-content {
  display: flex;
  flex-direction: column;
}

.main-content__title {
  position: relative;
  --margin: 35px;
  h1, p {
    text-align: center;
    font-family: 'Vollkorn';
  }
  h1 {
    margin: var(--margin) 0 2px 0;
    font-size: 52px;
  }
  p {
    margin: 0 0 var(--margin) 0;
    font-size: 21px;
    font-style: italic;
  }
}

.main-content__grid {
  position: absolute;
  top: 11px;
  opacity: .5;
  pointer-events: none;
}
</style>