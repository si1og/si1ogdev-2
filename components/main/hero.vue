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
        <ul class="description__connect" style="margin: 10px 0 0 0;">
          <li v-for="item in homePageSocial">
            <button v-if="item.link === 'copy-type'" class="copy" :data-copy="item.tooltip">
              <IconUse :id="item.icon" :width="item.sizes[0]" :height="item.sizes[1]" />
              <span class="tooltip">
                <span class="copy-icon">
                  <IconUse id="copy" :width="20" :height="20" />
                </span>
                {{ item.tooltip }}
              </span>
            </button>
            <NuxtLink v-else :to="`${item.link}`">
              <IconUse :id="item.icon" :width="item.sizes[0]" :height="item.sizes[1]" />
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="description__photo-social">
        <h2>Find my photos in</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.main-content__title {
  position: relative;
  margin: 20px 0 0 0;
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
  top: 10px;
  opacity: .5;
  pointer-events: none;
}
.description {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
}
.description__info,
.description__photo-social {
  background: var(--bg-color-1);
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 0 8px #0000000a;
  h2, p {
    margin: 0;
    text-wrap: balance;
  }
  h2 {
    font-family: 'Vollkorn';
    font-style: italic;
  }
  p {
    font-weight: 320;
  }
}
.description__info {
  ul {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    li {
      background: none;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      background: var(--text-color-1);
      border-radius: 50%;
    }
    button {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      background: var(--text-color-1);
      &>span {
        position: absolute;
      }
    }
  }
}
</style>

<style>
.description__info svg {
  fill: var(--bg-color-1);
}
.tooltip {
  top: -40px;
  left: 50%;
  display: flex;
  gap: 2px;
  padding: 5px 10px;
  border-radius: 20px;
  box-shadow: 0 0 10px #00000018;
  background: var(--text-color-1);
  color: var(--bg-color-1);
  transform: translate(-50%, 3px) scale(.9);
  transition: .2s ease;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  &>.copy-icon {
    position: relative;
    top: 2px;
  }
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: var(--text-color-1) transparent transparent transparent;
  }
}
.description__info button {
  &:hover,
  &:focus {
    cursor: pointer;
    .tooltip {
      opacity: 1 !important;
      pointer-events: all !important;
      visibility: visible !important;
      transform: translate(-50%, 0) scale(1) !important;
      z-index: inherit;
    }
  }
  &:hover {
    z-index: 10;
  }
}
</style>