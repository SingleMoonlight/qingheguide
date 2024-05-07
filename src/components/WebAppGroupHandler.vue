<script setup>
import { ref, onMounted } from 'vue'
import ButtonWrap from '@/components/ButtonWrap.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import CheckBox from '@/components/CheckBox.vue'
import CardContainer from '@/components/CardContainer.vue'

const emit = defineEmits(['closeWebAppGroupHandler', 'deleteWebAppGroup', 'editWebAppGroup', 'addWebAppGroup'])
const props = defineProps({
    type: String,
    groupName: String,
})
const webAppGroupNameInputRef = ref()
const showHandler = ref(false)
const deleteNotice = ref(false)

function handleCancelBtnClick() {
    emit('closeWebAppGroupHandler');
}

function handleOkBtnClick() {
    emit('closeWebAppGroupHandler');

    if (props.type === 'delete') {
        emit('deleteWebAppGroup', !deleteNotice.value);
    } else if (props.type === 'edit') {
        emit('editWebAppGroup', webAppGroupNameInputRef.value.value);
    } else if (props.type === 'add') {
        emit('addWebAppGroup', webAppGroupNameInputRef.value.value);
    }
}

onMounted(() => {
    if (props.type === 'edit') {
        webAppGroupNameInputRef.value.value = props.groupName;
    }
    showHandler.value = true;
})

</script>

<template>
    <div class="web-app-group-handler-container">
        <Transition name="extension-from-center">
            <div class="web-app-group-handler" v-show="showHandler">
                <div class="web-app-group-handler-header">
                    <div class="web-app-group-handler-title">
                        <div v-if="props.type === 'edit'">编辑分组</div>
                        <div v-if="props.type === 'add'">添加分组</div>
                        <div v-if="props.type === 'delete'">删除分组</div>
                    </div>
                    <ButtonWrap :type="'icon'" @click="emit('closeWebAppGroupHandler')">
                        <CloseIcon></CloseIcon>
                    </ButtonWrap>
                </div>
                <div class="web-app-group-handler-body">
                    <div v-if="props.type === 'delete'">
                        <div class="web-app-group-handler-delete-des">
                            您确定要删除 {{ props.groupName }} 吗？
                        </div>
                        <div class="web-app-group-handle-delete-checkbox">
                            <CheckBox :checked="deleteNotice" :label="'下次不再提示'" @change="deleteNotice = !deleteNotice">
                            </CheckBox>
                        </div>
                    </div>
                    <div v-else>
                        <CardContainer :card-name="'名称'">
                            <div class="web-app-group-handler-input-container">
                                <input ref="webAppGroupNameInputRef" class="web-app-group-handler-input" type="text"
                                    placeholder="请输入分组名称" />
                            </div>
                        </CardContainer>
                    </div>
                    <div class="web-app-group-handler-btn">
                        <ButtonWrap :type="'text'" :text="'取消'" @click="handleCancelBtnClick">
                        </ButtonWrap>
                        <div style="width: 10px;"></div>
                        <ButtonWrap :type="'text'" :text="'确定'" @click="handleOkBtnClick">
                        </ButtonWrap>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.web-app-group-handler-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
    background-color: var(--common-background-color);
    backdrop-filter: var(--common-backdrop-filter);
}

.web-app-group-handler {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 600px;
    max-width: 80%;
    max-height: 80%;
    color: var(--primary-font-color);
    box-shadow: var(--common-box-shadow);
    transition: .25s ease;
    overflow: hidden;
}

.web-app-group-handler-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.web-app-group-handler-title {
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.web-app-group-handler-back-btn {
    width: 32px;
    height: 32px;
    border-radius: 40px;
    transition: .25s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.web-app-group-handler-body {
    padding: 0 20px 20px 20px;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
}

.web-app-group-handler-delete-des {
    font-size: 14px;
}

.web-app-group-handle-delete-checkbox {
    margin-top: 20px;
}

.web-app-group-handler-btn {
    display: flex;
    justify-content: flex-end;
}

.web-app-group-handler-input-container {
    width: 100%;
    height: 30px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
}

.web-app-group-handler-input {
    width: 100%;
    height: 100%;
    min-width: 10px;
    box-sizing: border-box;
    font-size: 14px;
    color: var(--primary-font-color);
    background-color: transparent;
}
</style>