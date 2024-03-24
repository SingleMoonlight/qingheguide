<script setup>
import SettingCard from '@/components/SettingCard.vue'
import SettingItem from '@/components/SettingItem.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import BackIcon from '@/components/icons/BackIcon.vue'
import Background from '@/components/Background.vue'
import { useSettingStore } from '@/stores/setting'
import { setBackgroundImg, deleteBackgroundImg } from '@/utils/indexedDB'
import { themeList, bgSourceList, defaultBackgroundUrl, timeFontWeight, searchOpenMode } from '@/utils/constant'
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
    document.getElementById("qinghe-guide").setAttribute("class", settingStore.$state.theme);
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
                    <div class="setting-pane-close-btn" @click="emit('closeSetting')">
                        <CloseIcon></CloseIcon>
                    </div>
                </div>
                <div class="setting-pane-body">
                    <SettingCard :card-name="'外观'">
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
                    </SettingCard>
                    <SettingCard :card-name="'时间日期'">
                        <SettingItem :label="'时间'" :type="'switch'" :onoff="settingStore.showTime"
                            @switch-onoff="settingStore.showTime = !settingStore.showTime">
                        </SettingItem>
                        <SettingItem :label="'日期'" :type="'switch'" :onoff="settingStore.showDate"
                            @switch-onoff="settingStore.showDate = !settingStore.showDate">
                        </SettingItem>
                        <SettingItem :label="'秒钟'" :type="'switch'" :onoff="settingStore.showSecond"
                            @switch-onoff="settingStore.showSecond = !settingStore.showSecond">
                        </SettingItem>
                        <SettingItem :label="'时间分隔符闪烁'" :type="'switch'" :onoff="settingStore.blinkTimeSeparator"
                            @switch-onoff="settingStore.blinkTimeSeparator = !settingStore.blinkTimeSeparator">
                        </SettingItem>
                        <SettingItem :label="'时间字体粗细'" :type="'next'"
                            :next-value="getTimeFontWeightName(settingStore.timeFontWeight)"
                            @open-next="goToNext(mainSettingPaneRef, timeFontWeightSettingPaneRef)">
                        </SettingItem>
                    </SettingCard>
                    <SettingCard :card-name="'搜索'">
                        <SettingItem :label="'搜索历史'" :type="'switch'" :onoff="settingStore.openHistory"
                            @switch-onoff="settingStore.openHistory = !settingStore.openHistory">
                        </SettingItem>
                        <SettingItem :label="'搜索建议'" :type="'switch'" :onoff="settingStore.openSuggest"
                            @switch-onoff="settingStore.openSuggest = !settingStore.openSuggest">
                        </SettingItem>
                        <SettingItem :label="'搜索打开方式'" :type="'next'"
                            :next-value="getSearchOpenModeName(settingStore.searchOpenMode)"
                            @open-next="goToNext(mainSettingPaneRef, searchOpenModeSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'自定义搜索引擎'" :type="'next'" :next-value="settingStore.customSearchEngineUrl"
                            @open-next="goToNext(mainSettingPaneRef, customSearchEngineSettingPaneRef)">
                        </SettingItem>
                    </SettingCard>
                </div>
            </div>
        </Transition>
        <div ref="themeSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(themeSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    主题
                </div>
            </div>
            <div class="setting-pane-body">
                <SettingCard>
                    <SettingItem v-for="(item, index) in themeList" :type="'list'" :label="item.name"
                        :checked="getThemeIndex(settingStore.theme) === index" @checked-list-item="selectTheme(index)">
                    </SettingItem>
                </SettingCard>
            </div>
        </div>
        <div ref="bgSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(bgSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    背景
                </div>
            </div>
            <div class="setting-pane-body">
                <SettingCard>
                    <SettingItem v-for="(item, index) in bgSourceList" :type="'list'" :label="item.name"
                        :checked="getBgSourceIndex(settingStore.backgroundSource) === index"
                        @checked-list-item="selectBgSource(index)">
                    </SettingItem>
                </SettingCard>
                <SettingCard :card-name="'预览'" style="">
                    <Background :background-url="settingStore.$state.backgroundUrl">
                    </Background>
                </SettingCard>
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
                    时间字体粗细
                </div>
            </div>
            <div class="setting-pane-body">
                <SettingCard>
                    <SettingItem v-for="(item, index) in timeFontWeight" :type="'list'" :label="item.name"
                        :checked="getTimeFontWeightIndex(settingStore.timeFontWeight) === index"
                        @checked-list-item="selectTimeFontWeight(index)">
                    </SettingItem>
                </SettingCard>
            </div>
        </div>
        <div ref="blurBackgroundSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(blurBackgroundSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    背景遮罩
                </div>
            </div>
            <div class="setting-pane-body">
                <SettingCard :card-des="'关闭后搜索、导航、设置和关于页面背景不显示毛玻璃效果，组件毛玻璃效果不受影响。'">
                    <SettingItem :label="'背景遮罩'" :type="'switch'" :onoff="settingStore.blurBackground"
                        @switch-onoff="settingStore.blurBackground = !settingStore.blurBackground">
                    </SettingItem>
                </SettingCard>
            </div>
        </div>
        <div ref="copyrightSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(copyrightSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    备案信息
                </div>
            </div>
            <div class="setting-pane-body">
                <SettingCard :card-des="'根据国家有关法律规定，网站首页底部默认需要展示网站相关备案信息。'">
                    <SettingItem :label="'显示备案信息'" :type="'switch'" :onoff="settingStore.showCopyright"
                        @switch-onoff="settingStore.showCopyright = !settingStore.showCopyright">
                    </SettingItem>
                </SettingCard>
            </div>
        </div>
        <div ref="searchOpenModeSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(searchOpenModeSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    搜索打开方式
                </div>
            </div>
            <div class="setting-pane-body">
                <SettingCard>
                    <SettingItem v-for="(item, index) in searchOpenMode" :type="'list'" :label="item.name"
                        :checked="getSearchOpenModeIndex(settingStore.searchOpenMode) === index"
                        @checked-list-item="selectSearchOpenMode(index)">
                    </SettingItem>
                </SettingCard>
            </div>
        </div>
        <div ref="customSearchEngineSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(customSearchEngineSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    自定义搜索引擎
                </div>
            </div>
            <div class="setting-pane-body">
                <SettingCard>
                    <SettingItem :type="'input'" :label="'自定义搜索引擎URL'" @ensure-input="updateCustomSearchEngineUrl">
                    </SettingItem>
                </SettingCard>
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

.setting-pane-close-btn {
    width: 32px;
    height: 32px;
    border-radius: 40px;
    transition: .25s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.setting-pane-close-btn:hover {
    background-color: var(--icon-hover-background-color);
    transform: rotate(180deg);
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