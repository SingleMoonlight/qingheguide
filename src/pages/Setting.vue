<script setup>
import Card from '@/components/Card.vue'
import SettingItem from '@/components/SettingItem.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { useSettingStore } from '@/stores/setting'
import { setBackgroundImg } from '@/utils/indexedDB'
import { themeList } from '@/utils/constant'

const emit = defineEmits(['closeSeting'])

const settingStore = useSettingStore()

function setBackground(e) {
    let imgFile = e.target.files[0];
    // 将图片保存至indexedDB
    setBackgroundImg(imgFile);
}

function openNext() {
    
}

</script>

<template>
    <div class="setting-container">
        <div class="setting-pane">
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
                    <SettingItem :label="'显示背景遮罩'"
                        :type="'switch'" :onoff="settingStore.blurBackground" @switch-onoff="settingStore.blurBackground = !settingStore.blurBackground">
                    </SettingItem>
                </Card>
                <Card :card-name="'测试'">
                    <SettingItem :label="'测试'" :type="'switch'">
                    </SettingItem>
                    <SettingItem :label="'测试'" :type="'switch'">
                    </SettingItem>
                    <SettingItem :label="'测试'" :type="'next'" :next-value="'默认'" @open-next="openNext">
                    </SettingItem>
                    <SettingItem :label="'测试'" :type="'next'">
                    </SettingItem>
                </Card>
            </div>
        </div>
        <div class="setting-pane" v-show="false">
            <div class="setting-pane-header">
                <div class="setting-pane-title">
                    主题
                </div>
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
    transition: .25s;
    overflow: hidden;
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

.setting-pane-body {
    position: absolute;
    padding: 0 20px 0 20px;
    width: 100%;
    height: calc(100% - 72px - 20px);
    box-sizing: border-box;
    overflow: auto;
}
</style>