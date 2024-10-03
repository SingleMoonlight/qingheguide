<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
    name: String,
    icon: String,
    defaultIcon: String,
    showName: Boolean,
})
const webAppIconRef = ref()

function handleWebAppIconLoadError() {
    webAppIconRef.value.src = props.defaultIcon;
}

watch(() => props.icon, (newValue) => {
    webAppIconRef.value.src = newValue;
})

onMounted(() => {
    webAppIconRef.value.src = props.icon;
})

</script>

<template>
    <div class="web-app">
        <img class="web-app-icon" ref="webAppIconRef" @error="handleWebAppIconLoadError">
        <div class="web-app-name" v-show="props.showName">
            {{ props.name }}
        </div>
    </div>
</template>

<style scoped>
.web-app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
}

.web-app-icon {
    width: 60%;
    height: 60%;
    border-radius: 10px;
    transition: transform 0.25s ease-in-out;
}

.web-app-icon:hover {
    transform: scale(1.1);
}

.web-app-name {
    color: rgb(255, 255, 255);
    font-size: 12px;
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>