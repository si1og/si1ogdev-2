<script setup lang="ts">
import { socialLinks, licensing } from '../../data'

defineProps<{
  isGalleryView?: boolean
  isEmptyLayout?: boolean
}>()


const { locales, setLocale } = useI18n()

</script>

<template>
  <footer class="footer">
    <div class="content">
      <IconLogo />
      <nav>
        <ul>
          <li v-for="social in socialLinks" :key="social.name" :class="social.icon">
            <NuxtLink :to="`${social.link}`">
              <IconUse :id="social.icon" :width="social.sizes[0]" :height="social.sizes[1]" />
              <span class="tooltip ex-link">
                <span class="copy-icon">
                  <IconUse id="external-link" :width="20" :height="20" />
                </span>
                {{ social.tooltip }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="licensing">
        <span class="copyright">
          © {{ new Date().getFullYear() }} · Ilya Semenov
        </span>
        <ul>
          <li v-for="item in licensing" :key="item.name">
            <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
          </li>
          <li>
            <div>
              <button v-for="locale in locales" :key="locale.code" @click="setLocale(locale.code)">
                {{ locale.name }}
              </button>
              <span>{{ $t('welcome') }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="unsplash">
        <ul>
          <li>
            <NuxtLink to="https://github.com/si1og/si1ogdev-2" >Handcrafted by me</NuxtLink>
          </li>
          <li>
            Powered by
            <NuxtLink to="https://unsplash.com/developers" >Unsplash API</NuxtLink>
            to display images
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background: var(--bg-color-1);
	box-shadow: 0 0 6px #00000009;
  border-top: 1px solid var(--decoration-border-color);

  &>div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 20px var(--page-padding);
  }
  nav ul {
    display: flex;
    flex-wrap: wrap;
    gap: 35px;
    margin: 0;
    padding: 0;
    list-style: none;
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
  }
}

.licensing,
.unsplash {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 15px 0 0 0;
  &::before {
    content: "";

    position: absolute;
    top: -10px;
    width: 100%;
    height: 1px;
    border-top: 1px dashed var(--text-color-1);
    opacity: .15;
  }
  ul {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.unsplash {
  font-size: 16px;
  margin: 5px !important;
  justify-content: center !important;
  a {
    font-size: inherit;
  }
  li {
    position: relative;
    &:not(:first-of-type)::before {
      position: absolute;
      left: -12px;
      top: 2px;
      content: "·";
    }
  }
}

.copyright {
  padding: 5px 10px;
  border-radius: 20px;
  background: var(--text-color-1);
  color: var(--bg-color-1);
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.sitemap {
  display: flex;
  gap: 5px;
  padding: 7px 12px;
  border-radius: 30px;
  border: 1px solid var(--decoration-border-color);
  box-shadow: 0 0 6px #0000000a;
  transform-origin: bottom;
  text-decoration: none;
  &:hover,
  &:focus {
    background: var(--bg-color-11);
    transform: scale(1.03);
  }
}
</style>

<style>
  .footer a:not(.sitemap) svg {
    color: var(--bg-color-1);
  }
</style>
