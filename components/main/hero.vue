<script setup lang="ts">
import { homePageSocial, findMyPhotosIn, homePage } from '~/data'

import type { Stats } from '~/types/stats'

const copiedId = ref<string | null>(null)

function copyToClipboard(text: string, id: string) {
  navigator.clipboard.writeText(text).then(() => {
    copiedId.value = id
    
    setTimeout(() => {
      if (copiedId.value === id) copiedId.value = null
    }, 1500)
  })
}

function convertDownloads(count: number): string {
  const rounded = Math.floor(count / 100) * 100
  return `${rounded.toLocaleString()}+`
}

function convertViews(count: number): string {
  const rounded = Math.floor(count / 10000) * 10000
  return `${rounded.toLocaleString()}+`
}

const { data, error, pending } = await useLazyFetch<Stats>('/api/stats', {server: false})

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
          <li v-for="item in homePageSocial" :key="item.name">
            <button v-if="item.link === 'copy-type'" class="copy" @click="copyToClipboard(item.tooltip, item.icon)">
              <IconUse :id="item.icon" :width="item.sizes[0]" :height="item.sizes[1]" />
              <span v-if="copiedId !== item.icon" class="tooltip">
                <span class="copy-icon">
                  <IconUse id="copy" :width="20" :height="20" />
                </span>
                {{ item.tooltip }}
              </span>
              <span v-else class="tooltip">
                Copied!
              </span>
            </button>
            <NuxtLink v-else :to="`${item.link}`">
              <IconUse :id="item.icon" :width="item.sizes[0]" :height="item.sizes[1]" />
              <span class="tooltip ex-link">
                <span class="copy-icon">
                  <IconUse id="external-link" :width="20" :height="20" />
                </span>
                {{ item.tooltip }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="description__photo-social">
        <h2>Find my photos in</h2>
        <div>
          <ul>
            <li v-for="item in findMyPhotosIn" :key="item.name">
              <NuxtLink :to="item.link">
                <span class="icon-cont">
                  <IconUse :id="item.icon" :width="item.sizes[0]" :height="item.sizes[1]" />
                </span>
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="!error" class="description__unsplash">
        <p>
          😱 Currently my photos on upspash have 
          <span class="views">
            <span v-if="pending" class="skeleton animate">290,000+</span>
            <span v-if="data?.views">{{ convertViews(data.views) }}</span>
          </span> 
          views and 
          <span class="downloads">
            <span v-if="pending" class="skeleton animate">1,500+</span>
            <span v-if="data?.downloads">{{ convertDownloads(data.downloads) }}</span>
          </span> 
          downloads!
        </p>
        <IconUse id="arrow-1" class="arrow" :width="80" :height="80" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 85px;
}

.main-content__title {
  position: relative;
  margin: 30px 0 10px 0;
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
  position: relative;
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 20px;
}
.description__info,
.description__photo-social,
.description__unsplash {
  background: var(--bg-color-1);
  padding: 20px;
  border-radius: 30px;
  border: 1px solid var(--decoration-border-color);
  box-shadow: 0 0 6px #0000000a;
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
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      background: var(--text-color-1);
      border-radius: 50%;
    }
    button {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 50%;
      background: var(--text-color-1);
    }
  }
}
.description__photo-social {
  &>div {
    display: flex;
    justify-content: center;
  }
  ul {
    display: flex;
    gap: 10px;
    list-style: none;
    padding: 0;
    margin: 5px 0 0 0;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 10px;
      border-radius: 15px;
      &:hover,
      &:focus {
        background: var(--element-active-color);
      }
    }
  }
}
.description__unsplash {
  position: absolute;
  bottom: -20px;
  right: 130px;
  transform: translateY(100%);
  .skeleton {
    color: transparent;
    user-select: none;
  }
  .arrow {
    position: absolute;
    right: -79px;
    top: -32px;
    transform: rotate(-40deg);
  }
  p {
    text-align: right;
  }
}
</style>

<style>
.description__photo-social .icon-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid var(--text-color-1);
}
.description__info svg {
  color: var(--bg-color-1);
}
.description__photo-social svg {
  color: var(--text-color-1);
}
</style>