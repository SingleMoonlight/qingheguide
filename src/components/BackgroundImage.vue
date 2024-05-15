<script setup>
import { onMounted, ref, watch } from 'vue'

const emit = defineEmits(['mounted', 'loadSuccess', 'loadFail'])
const props = defineProps({
    backgroundUrl: String,
    backgroundBlur: Number,
    backgroundScale: Number
})
const bgImgRef = ref()

function failLoadBackground() {
    emit('loadFail');
}

function successLoadBackground() {
    emit('loadSuccess');
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
    emit('mounted');
})

</script>

<template>
    <img ref="bgImgRef" class="background-image" :src="props.backgroundUrl" @error="failLoadBackground"
        @load="successLoadBackground">
</template>

<style scpoed>
.background-image {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    transition: transform .25s, filter .25s;
}
</style>