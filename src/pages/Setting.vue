<script setup>
import Card from '@/components/Card.vue'
import SettingItem from '@/components/SettingItem.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import BackIcon from '@/components/icons/BackIcon.vue'
import { useSettingStore } from '@/stores/setting'
import { setBackgroundImg } from '@/utils/indexedDB'
import { themeList } from '@/utils/constant'
import { ref } from 'vue'

const emit = defineEmits(['closeSeting'])
const settingStore = useSettingStore()
const mainSettingPaneRef = ref()
const themeSettingPaneRef = ref()


function setBackground(e) {
    let imgFile = e.target.files[0];
    // 将图片保存至indexedDB
    setBackgroundImg(imgFile);
}

function getThemeName(mode) {
    return themeList.filter(obj => obj.mode === mode)[0].name;
}

function getThemeIndex(mode) {
    return themeList.findIndex(obj => obj.mode === mode);
}

function selectTheme(index) {
    settingStore.$state.themeMode = themeList[index].mode;
    document.getElementById("app").setAttribute("class", settingStore.$state.themeMode);
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

</script>

<template>
    <div class="setting-container">
        <div ref="mainSettingPaneRef" class="setting-pane setting-pane-enter">
            <div class="setting-pane-header">
                <div class="setting-pane-title">
                    设置
                </div>
                <div class="setting-pane-close-btn" @click="emit('closeSeting')">
                    <CloseIcon></CloseIcon>
                </div>
            </div>
            <div class="setting-pane-body">
                <Card :card-name="'背景'">
                    <input type="file" accept="image/*" @change="setBackground" />
                </Card>
                <Card :card-name="'外观'">
                    <SettingItem :label="'主题'" :type="'next'" :next-value="getThemeName(settingStore.themeMode)"
                        @open-next="goToNext(mainSettingPaneRef, themeSettingPaneRef)">
                    </SettingItem>
                    <SettingItem :label="'显示背景遮罩'" :type="'switch'" :onoff="settingStore.blurBackground"
                        @switch-onoff="settingStore.blurBackground = !settingStore.blurBackground">
                    </SettingItem>
                </Card>
            </div>
        </div>
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
                <Card>
                    <SettingItem v-for="(item, index) in themeList" :type="'list'" 
                        :label="item.name"
                        :checked="getThemeIndex(settingStore.themeMode) === index" @checked-list-item="selectTheme(index)">
                    </SettingItem>
                </Card>
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
    background-color: var(--commom-background-color);
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