<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { onMounted, ref } from 'vue';

const emit = defineEmits(['closeAbout'])
const showAbtouPane = ref(false)

onMounted(() => {
    showAbtouPane.value = true
})

</script>

<template>
    <div class="about-container">
        <Transition name="extension-from-center">
            <div class="about-pane" v-show="showAbtouPane">
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
        </Transition>
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
    padding: 0 20px 0 20px;
    width: 100%;
    height: calc(100% - 72px - 20px);
    box-sizing: border-box;
    overflow: auto;
}
</style>