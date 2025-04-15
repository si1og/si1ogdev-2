<script setup lang="ts">
import { homePage } from '~/data'
import { homePageSocial } from '~/data'


</script>

<template>
  <div class="main-content">
    <div class="main-content__title">
      <h1>{{ homePage.name }}</h1>
      <p>{{ homePage.nameSubtitle }}</p>
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
