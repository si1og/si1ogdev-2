<script setup lang="ts">
let isShowPlaceholder = ref(true);
</script>

<template>
    <div class="cover">
        <NuxtImg fit="cover" alt="Обложка страницы" src="/covers/cover.jpg"
            :placeholder="isShowPlaceholder ? [200, 31, 90, 8] : false" @load="() => {
                isShowPlaceholder = false;
            }" :class="{ 'fade-in': !isShowPlaceholder }" />
    </div>
</template>
<style scoped>
.cover {
    position: relative;
    max-width: 1920px;
    width: 100vw;
    height: 300px;
    margin: 0 calc(-1 * var(--page-padding));
    overflow: hidden;
    pointer-events: none;

    img {
        height: 100%;
        width: auto;
    }
}
</style>