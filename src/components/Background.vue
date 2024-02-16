<script setup>
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

const props = defineProps({
    backgroundUrl: String,
    defaultBackground: String,
    backgroundBlur: Number,
    backgroundScale: Number
})
let imgElem = null

function loadBackgroundFail(target) {
    // 防止onerror无限触发
    target.srcElement.onerror = '';
    // 加载失败使用默认背景
    target.srcElement.src = props.defaultBackground;
}

onMounted(() => {
    imgElem = getCurrentInstance().refs.bgImg;
})

watch(() => props.backgroundBlur, (newValue) => {
    if (newValue === 0) {
        imgElem.style.filter = '';
    } else {
        imgElem.style.filter = `blur(${newValue}px)`;
    }
})

watch(() => props.backgroundScale, (newValue) => {
    if (newValue === 1) {
        imgElem.style.transform = '';
    } else {
        imgElem.style.transform = `scale(${newValue})`;
    }
})

</script>

<template>
    <img ref="bgImg" v-if="props.backgroundUrl === ''" class="background" :src="props.defaultBackground" :onerror="loadBackgroundFail">
    <img ref="bgImg" v-else class="background" :src="props.backgroundUrl" :onerror="loadBackgroundFail">
</template>

<style scpoed>
.background {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    transition: transform .25s, filter .25s;
}
</style>