<script setup>
import Button from '@/components/Button.vue'
import MessageBoxIcon from '@/components/icons/MessageBoxIcon.vue'

const emit = defineEmits(['closeMessageBox'])
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
    emit('closeMessageBox');
}

function handleOkBtnClick() {
    if (props.okHandler) {
        props.okHandler();
    }
    emit('closeMessageBox');
}

</script>


<template>
    <Transition name="fade">
        <div class="message-box-container" v-show="props.show">
            <div class="message-box-mask"></div>
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
                        <Button v-if="props.cancelBtnText !== '' && props.cancelBtnText !== undefined" :type="'text'"
                            :text="props.cancelBtnText" @click="handleCancelBtnClick">
                        </Button>
                        <div style="width: 10px;"></div>
                        <Button v-if="props.okBtnText !== '' && props.okBtnText !== undefined" :type="'text'"
                            :text="props.okBtnText" @click="handleOkBtnClick">
                        </Button>
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
    position: absolute;
}

.message-box-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
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
    margin-bottom: 10px;
    font-size: 14px;
}

.message-box-btn {
    display: flex;
    justify-content: flex-end;
}
</style>