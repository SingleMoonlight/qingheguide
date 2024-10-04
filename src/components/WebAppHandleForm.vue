<script setup>
import { ref, onMounted } from 'vue'
import ButtonWrap from '@/components/ButtonWrap.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import CheckBox from '@/components/CheckBox.vue'
import CardContainer from '@/components/CardContainer.vue'
import { isValidURL } from '@/utils/common'

const emit = defineEmits(['close', 'delete', 'edit', 'add', 'getIcon'])
const props = defineProps({
    type: String,
    app: Object,
    iconPlaceholder: String,
})

const webAppNameInputRef = ref()
const webAppUrlInputRef = ref()
const webAppIconImgRef = ref()
const webAppIconInputRef = ref()
const showHandler = ref(false)
const deleteNotice = ref(false)
let isAutoGetWebAppIcon = false
let webAppIconSource = 'none'
let webAppIconFile = null

function setCustomWebAppIcon(e) {
    let imgFile = e.target.files[0];
    if (imgFile) {
        webAppIconImgRef.value.src = window.URL.createObjectURL(imgFile);
        isAutoGetWebAppIcon = false;
        webAppIconFile = imgFile;
        webAppIconSource = 'custom';
    }
}

function handleGetWebAppIconSuccess() {
    if (isAutoGetWebAppIcon) {
        webAppIconSource = 'auto';
    }
    emit('getIcon', 'LoadIconSuccess');
}

function handleGetWebAppIconError() {
    webAppIconImgRef.value.src = props.iconPlaceholder;
    webAppIconSource = 'none';

    if (isAutoGetWebAppIcon) {
        emit('getIcon', 'AutoGetIconError');
    } else {
        emit('getIcon', 'CustomIconLoadError');
    }
}

function autoGetWebAppIcon() {
    let webAppUrlInputDom = webAppUrlInputRef.value;
    let webAppUrlInputValue = webAppUrlInputDom.value.trim();

    if (!isValidURL(webAppUrlInputValue)) {
        emit('getIcon', 'URLInvalid');
        return;
    }

    let regex = new RegExp('/' + '+$');
    let iconUrl = webAppUrlInputValue.replace(regex, '') + "/favicon.ico";

    webAppIconImgRef.value.src = iconUrl;
    isAutoGetWebAppIcon = true;

    emit('getIcon', 'AutoGetIcon');
}

function uploadCustomWebAppIcon() {
    webAppIconImgRef.value.src = props.iconPlaceholder;
    webAppIconSource = 'none';

    let webAppIconInputDom = webAppIconInputRef.value;
    webAppIconInputDom.click();
}

function handleCancelBtnClick() {
    emit('close');
}

function handleOkBtnClick() {
    if (props.type === 'delete') {
        emit('delete', props.app, !deleteNotice.value);
    } else if (props.type === 'edit') {
        emit('edit', props.app, {
            name: webAppNameInputRef.value.value,
            url: webAppUrlInputRef.value.value,
            iconSource: webAppIconSource,
            iconUrl: webAppIconImgRef.value.src,
            iconFile: webAppIconFile,
        });
    } else if (props.type === 'add') {
        emit('add', {
            name: webAppNameInputRef.value.value,
            url: webAppUrlInputRef.value.value,
            iconSource: webAppIconSource,
            iconUrl: webAppIconImgRef.value.src,
            iconFile: webAppIconFile,
        });
    }
}

onMounted(() => {
    if (props.type === 'edit') {
        webAppNameInputRef.value.value = props.app.name;
        webAppUrlInputRef.value.value = props.app.url;
        webAppIconImgRef.value.src = props.app.icon;
        webAppIconSource = props.app.iconSource;
    } else if (props.type === 'add') {
        webAppIconImgRef.value.src = props.iconPlaceholder;
    }
    showHandler.value = true;
})

</script>

<template>
    <div class="web-app-handler-container">
        <Transition name="extension-from-center">
            <div class="web-app-handler" v-show="showHandler">
                <div class="web-app-handler-header">
                    <div class="web-app-handler-title">
                        <div v-if="props.type === 'edit'">编辑APP</div>
                        <div v-if="props.type === 'add'">添加APP</div>
                        <div v-if="props.type === 'delete'">删除APP</div>
                    </div>
                    <ButtonWrap :type="'icon'" @click="emit('close')">
                        <CloseIcon></CloseIcon>
                    </ButtonWrap>
                </div>
                <div class="web-app-handler-body">
                    <div v-if="props.type === 'delete'">
                        <div class="web-app-handler-delete-des">
                            您确定要删除 {{ props.app.name }} 吗？
                        </div>
                        <div class="web-app-handle-delete-checkbox">
                            <CheckBox :checked="deleteNotice" :label="'下次不再提示'" @change="deleteNotice = !deleteNotice">
                            </CheckBox>
                        </div>
                    </div>
                    <div v-else>
                        <CardContainer :card-name="'名称'">
                            <div class="web-app-handler-input-container">
                                <input ref="webAppNameInputRef" class="web-app-handler-input" type="text"
                                    placeholder="请输入APP名称" />
                            </div>
                        </CardContainer>
                        <CardContainer :card-name="'网址'" :card-des="'APP网址应以http://或https://开头。'">
                            <div class="web-app-handler-input-container">
                                <input ref="webAppUrlInputRef" class="web-app-handler-input" type="text"
                                    placeholder="请输入APP网址" @input="handleWebAppUrlInputChange" />
                            </div>
                        </CardContainer>
                        <CardContainer :card-name="'图标'">
                        </CardContainer>
                        <div class="web-app-icon-container">
                            <img ref="webAppIconImgRef" class="web-app-icon" @load="handleGetWebAppIconSuccess"
                                @error="handleGetWebAppIconError">
                            <div class="web-app-icon-handle-btn">
                                <ButtonWrap :type="'text'" :text="'自动获取'" @click="autoGetWebAppIcon">
                                </ButtonWrap>
                                <div style="width: 10px;"></div>
                                <ButtonWrap :type="'text'" :text="'自定义'" @click="uploadCustomWebAppIcon">
                                </ButtonWrap>
                            </div>
                            <div v-show="false">
                                <input ref="webAppIconInputRef" type="file" accept="image/*"
                                    @change="setCustomWebAppIcon" />
                            </div>
                        </div>
                    </div>
                    <div class="web-app-handler-btn">
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
.web-app-handler-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
    background-color: transparent;
    backdrop-filter: blur(10px);
}

.web-app-handler {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 600px;
    max-width: 80%;
    max-height: 80%;
    color: var(--primary-font-color);
    background-color: var(--common-background-color);
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
    padding: 0 20px 20px 20px;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
}

.web-app-handler-delete-des {
    font-size: 14px;
}

.web-app-handle-delete-checkbox {
    margin-top: 20px;
}

.web-app-handler-btn {
    display: flex;
    justify-content: flex-end;
}

.web-app-handler-input-container {
    width: 100%;
    height: 30px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
}

.web-app-handler-input {
    width: 100%;
    height: 100%;
    min-width: 10px;
    box-sizing: border-box;
    font-size: 14px;
    color: var(--primary-font-color);
    background-color: transparent;
}

.web-app-icon-container {
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-top: -20px;
}

.web-app-icon {
    display: block;
    width: 100px;
    height: 100px;
    border: none;
    border-radius: 10px;
    box-shadow: var(--common-box-shadow);
}

.web-app-icon-handle-btn {
    display: flex;
    align-items: center;
    justify-content: end;
}
</style>