<script setup>
import { usePageStore } from '@/stores/page'

const pageStore = usePageStore()


</script>

<template>
    <div class="search-container">
        Search
        <button @click="pageStore.pageForward('Home')">goto home</button>

        <button @click="pageStore.pageForward('Navigate')">goto navigate</button>
    </div>
</template>

<style>
.search-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
}
</style>