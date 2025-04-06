<script lang="ts" setup>
interface Props {
  id: string | null
  customClass?: string
  width: number
  height: number
}

withDefaults(defineProps<Props>(), {
  id: 'default',
  customClass: '',
  width: 20,
  height: 20
})
</script>

<template>
  <div :class="`icon ${customClass}`">
    <svg :width="width" :height="height" aria-hidden="true">
      <use :href="`/icons/icons.svg#${id}`" />
    </svg>
  </div>
</template>

<style scoped>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>