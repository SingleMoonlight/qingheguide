<script setup>

const props = defineProps({
    backgroundUrl: String,
    defaultBackground: String
})

function loadBackgroundFail(target) {
    // 防止onerror无限触发
    target.srcElement.onerror = '';
    // 加载失败使用默认背景
    target.srcElement.src = props.defaultBackground;
}

</script>

<template>
    <img v-if="props.backgroundUrl === ''" class="background" :src="props.defaultBackground" :onerror="loadBackgroundFail">
    <img v-else class="background" :src="props.backgroundUrl" :onerror="loadBackgroundFail">
</template>

<style>
.background {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
}
</style>