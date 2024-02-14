<script setup>
import { usePageStore } from '@/stores/page'

const pageStore = usePageStore()
</script>

<template>
    <div class="navigation-container">
        Navigation
        <button @click="pageStore.pageForward('Home')">goto Home</button>

        <button @click="pageStore.pageForward('About')">goto about</button>

        <button @click="pageStore.pageForward('Setting')">goto Setting</button>
    </div>
</template>

<style>
.navigation-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
}
</style>