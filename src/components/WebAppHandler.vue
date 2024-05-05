<script setup>
import { ref, onMounted } from 'vue'
import ButtonWrap from '@/components/ButtonWrap.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

const emit = defineEmits(['closeWebAppHandler'])
const props = defineProps({
    type: String,
})

const showHandler = ref(false)

onMounted(() => {
    showHandler.value = true
})

</script>

<template>
    <div class="web-app-handler-container">
        <Transition name="extension-from-center">
            <div class="web-app-handler" v-show="showHandler">
                <div class="web-app-handler-header">
                    <div class="web-app-handler-title">
                        <div v-if="props.type === 'edit'">编辑App</div>
                        <div v-if="props.type === 'add'">添加App</div>
                        <div v-if="props.type === 'delete'">删除App</div>
                    </div>
                    <ButtonWrap :type="'icon'" @click="emit('closeWebAppHandler')">
                        <CloseIcon></CloseIcon>
                    </ButtonWrap>
                </div>
                <div class="web-app-handler-body">
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.web-app-handler-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
    background-color: var(--common-background-color);
    backdrop-filter: var(--common-backdrop-filter);
}

.web-app-handler {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 600px;
    height: fit-content;
    max-width: 80%;
    max-height: 80%;
    color: var(--primary-font-color);
    box-shadow: var(--common-box-shadow);
    transition: .25s ease;
    overflow: hidden;
}

.web-app-handler-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.web-app-handler-title {
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.web-app-handler-back-btn {
    width: 32px;
    height: 32px;
    border-radius: 40px;
    transition: .25s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.web-app-handler-body {
    position: absolute;
    padding: 0 20px 0 20px;
    width: 100%;
    height: calc(100% - 72px - 20px);
    box-sizing: border-box;
    overflow: auto;
}
</style>