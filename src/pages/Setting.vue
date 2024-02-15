<script setup>
import { useSettingStore } from '@/stores/setting'
import { MutationType } from 'pinia'
import { usePageStore } from '@/stores/page'
import { getLocalSetting, setLocalSetting } from '@/utils/localStorage'
import { getBackgroundImg, setBackgroundImg } from '@/utils/indexedDB'


const pageStore = usePageStore()
const settingStore = useSettingStore()

function setBackground(e) {
    let imgFile = e.target.files[0];
    // 将图片保存至indexedDB
    setBackgroundImg(imgFile);
}

</script>

<template>
    <div class="setting-container">
        Setting
        <input type="file" accept="image/*" @change="setBackground" />
        <button @click="pageStore.pageForward('Navigate')">goto navigate</button>
    </div>
</template>

<style>
.setting-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
}
</style>