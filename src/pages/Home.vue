<script setup>
import { usePageStore } from '@/stores/page'

const pageStore = usePageStore()


</script>

<template>
    <div class="home-container">
        Home
        <button @click="pageStore.pageForward('Navigate')">goto navigate</button>
    </div>
</template>

<style>
.home-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
    color: var(--primary-color);
}
</style>