<script setup>
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

const settingStore = useSettingStore()
const { backgroundUrl } = storeToRefs(settingStore)

</script>

<template>
    <img class="background" :src="backgroundUrl">
</template>

<style>
.background {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
    object-fit: cover;
}
</style>