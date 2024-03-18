<script setup>
import { onMounted, ref, watch } from 'vue'

const emit = defineEmits(['changeOnoff'])
const props = defineProps({
    onoff: Boolean,
})
const switchRoundRef = ref()

function changeOnoff() {
    emit('changeOnoff');
}

watch(() => props.onoff, (newValue) => {
    if (newValue) {
        switchRoundRef.value.style.transform = 'translateX(16px)'
    } else {
        switchRoundRef.value.style.transform = 'translateX(0)'
    }
})

onMounted(() => {
    if (props.onoff) {
        switchRoundRef.value.style.transform = 'translateX(16px)'
    } else {
        switchRoundRef.value.style.transform = 'translateX(0)'
    }
})
</script>

<template>
    <div class="switch" @click="changeOnoff">
        <div ref="switchRoundRef" class="switch-round"></div>
    </div>
</template>

<style scoped>
.switch {
    width: 36px;
    height: 20px;
    border-radius: 20px;
    box-shadow: var(--common-box-shadow);
    background-color: var(--switch-background-color);
    position: relative;
    cursor: pointer;
}
.switch-round {
    width: 16px;
    height: 16px;
    border-radius: 20px;
    position: absolute;
    top: 2px;
    left: 2px;
    background-color: var(--switch-round-background-color);
    transition: 0.25s ease;
}
</style>
