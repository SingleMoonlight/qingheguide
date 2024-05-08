<script setup>
import ButtonWrap from '@/components/ButtonWrap.vue'
import MessageBoxIcon from '@/components/icons/MessageBoxIcon.vue'

const emit = defineEmits(['close'])
const props = defineProps({
    show: Boolean,
    type: String,
    title: String,
    content: String,
    cancelBtnText: String,
    okBtnText: String,
    cancelHandler: Function,
    okHandler: Function,
})

function handleCancelBtnClick() {
    if (props.cancelHandler) {
        props.cancelHandler();
    }
    emit('close');
}

function handleOkBtnClick() {
    if (props.okHandler) {
        props.okHandler();
    }
    emit('close');
}

</script>


<template>
    <Transition name="fade">
        <div class="message-box-container" v-show="props.show">
            <Transition name="extension-from-center">
                <div class="message-box" v-show="props.show">
                    <div class="message-box-header">
                        <div class="message-box-icon">
                            <MessageBoxIcon :icon-name="props.type"></MessageBoxIcon>
                        </div>
                        <div class="message-box-title">{{ props.title }}</div>
                    </div>
                    <div class="message-box-content">{{ props.content }}</div>
                    <div class="message-box-btn">
                        <ButtonWrap v-if="props.cancelBtnText !== '' && props.cancelBtnText !== undefined" :type="'text'"
                            :text="props.cancelBtnText" @click="handleCancelBtnClick">
                        </ButtonWrap>
                        <div style="width: 10px;"></div>
                        <ButtonWrap v-if="props.okBtnText !== '' && props.okBtnText !== undefined" :type="'text'"
                            :text="props.okBtnText" @click="handleOkBtnClick">
                        </ButtonWrap>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>


<style scoped>
.message-box-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
    background-color: transparent;
    backdrop-filter: blur(10px);
}

.message-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 420px;
    max-width: 80%;
    max-height: 40%;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    background: var(--common-background-color);
    backdrop-filter: var(--common-backdrop-filter);
    box-shadow: var(--common-box-shadow);
    color: var(--primary-font-color);
    overflow: hidden;
}

.message-box-header {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 10px;
}

.message-box-icon {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.message-box-title {
    font-size: 16px;
}

.message-box-content {
    margin-left: 32px;
    margin-bottom: 20px;
    font-size: 14px;
}

.message-box-btn {
    display: flex;
    justify-content: flex-end;
}
</style>