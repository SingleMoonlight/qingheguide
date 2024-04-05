<script setup>
import { onMounted, ref, watch } from 'vue'

const emit = defineEmits(['loaded'])
const props = defineProps({
    backgroundUrl: String,
    defaultBackgroundUrl: String,
    backgroundBlur: Number,
    backgroundScale: Number
})
const bgImgRef = ref()

function failLoadBackground(target) {
    // 防止onerror无限触发
    target.srcElement.onerror = '';
    // 加载失败使用默认背景
    target.srcElement.src = props.defaultBackgroundUrl;
}

watch(() => props.backgroundBlur, (newValue) => {
    if (newValue === 0) {
        bgImgRef.value.style.filter = '';
    } else {
        bgImgRef.value.style.filter = `blur(${newValue}px)`;
    }
})

watch(() => props.backgroundScale, (newValue) => {
    if (newValue === 1) {
        bgImgRef.value.style.transform = '';
    } else {
        bgImgRef.value.style.transform = `scale(${newValue})`;
    }
})

onMounted(() => {
    emit('loaded');
})

</script>

<template>
    <img ref="bgImgRef" v-if="props.backgroundUrl === ''" class="background" :src="props.defaultBackgroundUrl"
        :onerror="failLoadBackground">
    <img ref="bgImgRef" v-else class="background" :src="props.backgroundUrl" :onerror="failLoadBackground">
</template>

<style scpoed>
.background {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    transition: transform .25s, filter .25s;
}
</style>