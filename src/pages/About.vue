<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue'

const emit = defineEmits(['closeAbout'])

</script>

<template>
    <div class="about-container">
        <div class="about-pane">
            <div class="about-pane-header">
                <div class="about-pane-title">
                    关于
                </div>
                <div class="about-pane-close-btn" @click="emit('closeAbout')">
                    <CloseIcon></CloseIcon>
                </div>
            </div>
            <div class="about-pane-body">
            </div>
        </div>
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

.about-pane {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 600px;
    height: 500px;
    max-width: 80%;
    max-height: 80%;
    color: var(--primary-font-color);
    box-shadow: var(--common-box-shadow);
    background-color: var(--commom-background-color);
    backdrop-filter: var(--common-backdrop-filter);
    transition: .25s;
    overflow: hidden;
}

.about-pane-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.about-pane-title {
    font-size: 20px;
    font-weight: bold;
}

.about-pane-close-btn {
    width: 32px;
    height: 32px;
    border-radius: 40px;
    transition: .25s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.about-pane-close-btn:hover {
    background-color: var(--icon-hover-background-color);
    transform: rotate(180deg);
}

.about-pane-body {
    position: absolute;
    padding: 0 20px 0  20px;
    width: 100%;
    height: calc(100% - 72px - 20px);
    box-sizing: border-box;
    overflow: auto;
}
</style>