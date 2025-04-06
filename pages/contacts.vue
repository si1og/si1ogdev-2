<script setup lang="ts">
import { NuxtLink } from '#components';
import { footerData, contactsData } from '~/data'

type FormFeedbackType = 'incomplete' | 'consent' | 'invalid' | 'success' | null

const name = ref('')
const email = ref('')
const message = ref('')
const consent = ref(false)
const isLoading = ref(false)
const formFeedback: Ref<FormFeedbackType> = ref(null)
const success = ref(true)

const submitForm = async () => {
  isLoading.value = true
  formFeedback.value = null

  if (!name.value.trim() || !email.value.trim()) {
    formFeedback.value = 'incomplete'
    isLoading.value = false
    return
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  if (email.value && !regex.test(email.value)) {
    formFeedback.value = 'invalid'
    success.value = false
    isLoading.value = false
    return
  }

  if (!consent.value) {
    formFeedback.value = 'consent'
    success.value = false
    isLoading.value = false
    return
  }

  setTimeout(() => {
    // If the execution reaches here, it means that all checks have passed.
    success.value = true
    formFeedback.value = 'success'
    isLoading.value = false
  }, 1000);
};

useHead({
  title: 'Контакты',
  meta: [
    {
      name: 'description',
      content: footerData.aboutAuthor,
    },
  ],
})

</script>

<template>
  <div class="center-box">
    <div class="layout">
      <div class="info">
        <h2>Контактная информация</h2>
        <ul class="copy">
          <li v-for="link in contactsData.textLinks">
            <NuxtLink :to="link.url">
              <IconUse :id="link.icon" :width="14" :height="15" />
              {{ link.text }}
            </NuxtLink>
          </li>
        </ul>
        <ul class="social">
          <li v-for="link in contactsData.social">
            <NuxtLink :to="link.url">
              <IconUse :id="link.icon" :width="40" :height="40" />
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="feedback">
        <h2>Напишите нам</h2>
        <form @submit.prevent="submitForm">
          <input v-model="name" type="text" placeholder="Ваше имя" class="form-input" />
          <input v-model="email" type="email" placeholder="Телефон или E-mail" class="form-input" />
          <textarea v-model="message" placeholder="Сообщение..."></textarea>
          <button v-if="!isLoading" type="submit" class="submit" @click.prevent="submitForm">
            Отправить
            <IconUse :id="'send'" :width="21" :height="19" />
          </button>
          <button v-else type="submit" class="submit" @click.prevent="submitForm">
            Подтверждение...
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.center-box {
  display: flex;
  align-items: center;
  max-width: 1160px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 40px 0;
}

.layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  width: 100%;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 30px;

  li,
  ul,
  h2 {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  h2 {
    margin: 40px 0 0 0;
    font-size: 30px;
  }

  .copy {
    display: flex;
    flex-direction: column;
    gap: 10px;

    a {
      --color: var(--blue-text-color);
      display: inline-flex;
      gap: 10px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--color);
      font-size: 18px;
      transition: .2s ease;

      svg {
        fill: var(--color);
        transition: inherit;

      }

      &:hover,
      &:focus {
        --color: var(--blue-active-text-color);
      }
    }
  }

  .social {
    display: flex;
    gap: 18px;

    svg {
      fill: var(--blue-text-color);
      transition: .2s ease;

      &:hover,
      &:focus {
        fill: var(--blue-active-text-color);
      }
    }
  }
}

.feedback {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px 60px;
  border-radius: 20px;
  background: var(--main-component-color);
  box-shadow: 0 5px 30px #0000001f;

  h2 {
    margin: 0;
    font-size: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    input,
    textarea,
    button {
      width: 100%;
      border: none;
      border-radius: 20px;
      padding: 13px 30px;
    }

    input,
    textarea {
      background: var(--form-background-color);
      font-size: 16px;

      &:hover,
      &:focus {
        background: var(--form-active-background-color);
      }
    }

    input {
      height: 50px;
    }

    textarea {
      min-height: 81px;
      resize: none;
    }
  }

  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: var(--blue-text-color);
    cursor: pointer;
    font-size: 18px;
    color: var(--img-text-color);

    svg {
      fill: var(--img-text-color);
    }

    &:hover,
    &:focus {
      background: var(--blue-active-text-color);
    }
  }
}
</style>