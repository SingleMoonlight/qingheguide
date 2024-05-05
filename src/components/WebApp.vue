<script setup>
const emit = defineEmits(['click'])
const props = defineProps({
    name: String,
    icon: String,
    showName: Boolean,
})

</script>

<template>
    <div class="web-app" @click="emit('click')">
        <img class="web-app-icon" :src="props.icon">
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