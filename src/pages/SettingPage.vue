<script setup>
import CardContainer from '@/components/CardContainer.vue'
import SettingItem from '@/components/SettingItem.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import BackIcon from '@/components/icons/BackIcon.vue'
import BackgroundImage from '@/components/BackgroundImage.vue'
import ButtonWrap from '@/components/ButtonWrap.vue'
import { useSettingStore } from '@/stores/settingStore'
import { setBackgroundImg, deleteBackgroundImg } from '@/utils/indexedDB'
import { themeList, bgSourceList, defaultBackgroundUrl, timeFontWeight, searchOpenMode } from '@/utils/constant'
import { setClassForElement } from '@/utils/common'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['closeSetting'])
const settingStore = useSettingStore()
const mainSettingPaneRef = ref()
const themeSettingPaneRef = ref()
const bgSettingPaneRef = ref()
const settingBgInputRef = ref()
const timeFontWeightSettingPaneRef = ref()
const blurBackgroundSettingPaneRef = ref()
const copyrightSettingPaneRef = ref()
const searchOpenModeSettingPaneRef = ref()
const customSearchEngineSettingPaneRef = ref()
const autoFocusSearchInputPaneRef = ref()
const showSettingPane = ref(false)


function setBackground(e) {
    let imgFile = e.target.files[0];
    if (imgFile) {
        // 将图片保存至indexedDB
        setBackgroundImg(imgFile);
        settingStore.$state.backgroundSource = 'custom';
    }
}

function getThemeName(theme) {
    return themeList.filter(obj => obj.theme === theme)[0].name;
}

function getThemeIndex(theme) {
    return themeList.findIndex(obj => obj.theme === theme);
}

function selectTheme(index) {
    settingStore.$state.theme = themeList[index].theme;
    setClassForElement('qinghe-guide', settingStore.$state.theme);
}

function getBgSourceName(source) {
    return bgSourceList.filter(obj => obj.source === source)[0].name;
}

function getBgSourceIndex(source) {
    return bgSourceList.findIndex(obj => obj.source === source);
}

function selectBgSource(index) {
    if (bgSourceList[index].source === 'custom') {
        let bgInputDom = settingBgInputRef.value;
        bgInputDom.click();
    } else if (bgSourceList[index].source === 'default') {
        settingStore.$state.backgroundUrl = defaultBackgroundUrl;
        settingStore.$state.backgroundSource = 'default';

        deleteBackgroundImg();
    }
}

function getTimeFontWeightName(weight) {
    return timeFontWeight.filter(obj => obj.weight === weight)[0].name;
}

function getTimeFontWeightIndex(weight) {
    return timeFontWeight.findIndex(obj => obj.weight === weight);
}

function selectTimeFontWeight(index) {
    settingStore.$state.timeFontWeight = timeFontWeight[index].weight;
}

function getSearchOpenModeName(mode) {
    return searchOpenMode.filter(obj => obj.mode === mode)[0].name;
}

function getSearchOpenModeIndex(mode) {
    return searchOpenMode.findIndex(obj => obj.mode === mode);
}

function selectSearchOpenMode(index) {
    settingStore.$state.searchOpenMode = searchOpenMode[index].mode;
}

function getOnoffName(onoff) {
    return onoff ? '打开' : '关闭';
}

function updateCustomSearchEngineUrl(url) {
    settingStore.$state.customSearchEngineUrl = url;
}

function goToNext(cur, next) {
    if (cur === null || cur === undefined) return;
    if (next === null || next === undefined) return;

    cur.classList.remove("setting-pane-enter");
    cur.classList.add("setting-pane-leave");

    next.classList.remove("setting-pane-before-enter");
    next.classList.add("setting-pane-enter");
}

function backToPrev(cur, prev) {
    if (cur === null || cur === undefined) return;
    if (prev === null || prev === undefined) return;

    cur.classList.remove("setting-pane-enter");
    cur.classList.add("setting-pane-before-enter");

    prev.classList.remove("setting-pane-leave");
    prev.classList.add("setting-pane-enter");
}

onMounted(() => {
    showSettingPane.value = true
})

</script>

<template>
    <div class="setting-container">
        <Transition name="extension-from-center">
            <div ref="mainSettingPaneRef" class="setting-pane setting-pane-enter" v-show="showSettingPane">
                <div class="setting-pane-header">
                    <div class="setting-pane-title">
                        设置
                    </div>
                    <ButtonWrap :type="'icon'" @click="emit('closeSetting')">
                        <CloseIcon></CloseIcon>
                    </ButtonWrap>
                </div>
                <div class="setting-pane-body">
                    <CardContainer :card-name="'外观'">
                        <SettingItem :label="'主题'" :type="'next'" :next-value="getThemeName(settingStore.theme)"
                            @open-next="goToNext(mainSettingPaneRef, themeSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'背景'" :type="'next'"
                            :next-value="getBgSourceName(settingStore.backgroundSource)"
                            @open-next="goToNext(mainSettingPaneRef, bgSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'背景遮罩'" :type="'next'"
                            :next-value="getOnoffName(settingStore.blurBackground)"
                            @open-next="goToNext(mainSettingPaneRef, blurBackgroundSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'备案信息'" :type="'next'"
                            :next-value="getOnoffName(settingStore.showCopyright)"
                            @open-next="goToNext(mainSettingPaneRef, copyrightSettingPaneRef)">
                        </SettingItem>
                    </CardContainer>
                    <CardContainer :card-name="'时间日期'">
                        <SettingItem :label="'时间'" :type="'switch'" :onoff="settingStore.showTime"
                            @turn-switch="settingStore.showTime = !settingStore.showTime">
                        </SettingItem>
                        <SettingItem :label="'日期'" :type="'switch'" :onoff="settingStore.showDate"
                            @turn-switch="settingStore.showDate = !settingStore.showDate">
                        </SettingItem>
                        <SettingItem :label="'秒钟'" :type="'switch'" :onoff="settingStore.showSecond"
                            @turn-switch="settingStore.showSecond = !settingStore.showSecond">
                        </SettingItem>
                        <SettingItem :label="'时间分隔符闪烁'" :type="'switch'" :onoff="settingStore.blinkTimeSeparator"
                            @turn-switch="settingStore.blinkTimeSeparator = !settingStore.blinkTimeSeparator">
                        </SettingItem>
                        <SettingItem :label="'时间字体粗细'" :type="'next'"
                            :next-value="getTimeFontWeightName(settingStore.timeFontWeight)"
                            @open-next="goToNext(mainSettingPaneRef, timeFontWeightSettingPaneRef)">
                        </SettingItem>
                    </CardContainer>
                    <CardContainer :card-name="'搜索'">
                        <SettingItem :label="'搜索历史'" :type="'switch'" :onoff="settingStore.openHistory"
                            @turn-switch="settingStore.openHistory = !settingStore.openHistory">
                        </SettingItem>
                        <SettingItem :label="'搜索建议'" :type="'switch'" :onoff="settingStore.openSuggest"
                            @turn-switch="settingStore.openSuggest = !settingStore.openSuggest">
                        </SettingItem>
                        <SettingItem :label="'自动聚焦搜索框'" :type="'next'"
                            :next-value="getOnoffName(settingStore.autoFocusSearchInput)"
                            @open-next="goToNext(mainSettingPaneRef, autoFocusSearchInputPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'搜索打开方式'" :type="'next'"
                            :next-value="getSearchOpenModeName(settingStore.searchOpenMode)"
                            @open-next="goToNext(mainSettingPaneRef, searchOpenModeSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'自定义搜索引擎'" :type="'next'" :next-value="settingStore.customSearchEngineUrl"
                            @open-next="goToNext(mainSettingPaneRef, customSearchEngineSettingPaneRef)">
                        </SettingItem>
                    </CardContainer>
                </div>
            </div>
        </Transition>
        <div ref="themeSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(themeSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer>
                    <SettingItem v-for="(item, index) in themeList" :key="index" :type="'list'" :label="item.name"
                        :checked="getThemeIndex(settingStore.theme) === index" @checked-list-item="selectTheme(index)">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="bgSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(bgSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer>
                    <SettingItem v-for="(item, index) in bgSourceList" :key="index" :type="'list'" :label="item.name"
                        :checked="getBgSourceIndex(settingStore.backgroundSource) === index"
                        @checked-list-item="selectBgSource(index)">
                    </SettingItem>
                </CardContainer>
                <CardContainer :card-name="'预览'" style="">
                    <BackgroundImage :background-url="settingStore.$state.backgroundUrl">
                    </BackgroundImage>
                </CardContainer>
                <div v-show="false">
                    <input ref="settingBgInputRef" type="file" accept="image/*" @change="setBackground" />
                </div>
            </div>
        </div>
        <div ref="timeFontWeightSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(timeFontWeightSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer>
                    <SettingItem v-for="(item, index) in timeFontWeight" :key="index" :type="'list'" :label="item.name"
                        :checked="getTimeFontWeightIndex(settingStore.timeFontWeight) === index"
                        @checked-list-item="selectTimeFontWeight(index)">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="blurBackgroundSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(blurBackgroundSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-des="'关闭后搜索、导航、设置和关于页面背景不显示毛玻璃效果，组件毛玻璃效果不受影响。'">
                    <SettingItem :label="'背景遮罩'" :type="'switch'" :onoff="settingStore.blurBackground"
                        @turn-switch="settingStore.blurBackground = !settingStore.blurBackground">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="copyrightSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(copyrightSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-des="'根据国家有关法律规定，网站首页底部默认需要展示网站相关备案信息。'">
                    <SettingItem :label="'显示备案信息'" :type="'switch'" :onoff="settingStore.showCopyright"
                        @turn-switch="settingStore.showCopyright = !settingStore.showCopyright">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="searchOpenModeSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(searchOpenModeSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer>
                    <SettingItem v-for="(item, index) in searchOpenMode" :key="index" :type="'list'" :label="item.name"
                        :checked="getSearchOpenModeIndex(settingStore.searchOpenMode) === index"
                        @checked-list-item="selectSearchOpenMode(index)">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="customSearchEngineSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(customSearchEngineSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-des="'搜索引擎URL 一般以https://开头，搜索关键字参数及连接符结尾。'">
                    <SettingItem :type="'input'" :label="'自定义搜索引擎URL'" @ensure-input="updateCustomSearchEngineUrl">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="autoFocusSearchInputPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(autoFocusSearchInputPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-des="'开启后，在进入页面时搜索框将直接处于输入状态。'">
                    <SettingItem :label="'自动聚焦搜索框'" :type="'switch'" :onoff="settingStore.autoFocusSearchInput"
                        @turn-switch="settingStore.autoFocusSearchInput = !settingStore.autoFocusSearchInput">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
    </div>
</template>

<style scpoed>
.setting-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
}

.setting-pane {
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
    background-color: var(--common-background-color);
    backdrop-filter: var(--common-backdrop-filter);
    transition: .25s ease;
    overflow: hidden;
}

.setting-pane-before-enter {
    opacity: 0;
    transform: translate(50%, -50%);
}

.setting-pane-enter {
    opacity: 1;
    transform: translate(-50%, -50%);
}

.setting-pane-leave {
    opacity: 0;
}

.setting-pane-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.setting-pane-title {
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.setting-pane-child-header {
    justify-content: left;
}

.setting-pane-back-btn {
    width: 32px;
    height: 32px;
    border-radius: 40px;
    transition: .25s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.setting-pane-body {
    position: absolute;
    padding: 0 20px 0 20px;
    width: 100%;
    height: calc(100% - 72px - 20px);
    box-sizing: border-box;
    overflow: auto;
}
</style>