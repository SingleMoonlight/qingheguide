<script setup>

const emit = defineEmits(['closeAbout'])

</script>

<template>
    <div class="about-container">
        关于
        <button @click="emit('closeAbout')">导航</button>
    </div>
</template>

<style scpoed>
.about-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
}
</style>