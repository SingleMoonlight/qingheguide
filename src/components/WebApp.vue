<script setup>
import { onMounted, ref, watch } from 'vue';

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
    cursor: pointer;
    text-align: center;
}

.web-app-icon {
    width: 70%;
    height: 70%;
    border-radius: 10px;
}

.web-app-name {
    color: var(--primary-font-color);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>