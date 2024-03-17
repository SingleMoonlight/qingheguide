<script setup>
import { useSettingStore } from '@/stores/setting'
import { setBackgroundImg } from '@/utils/indexedDB'

const emit = defineEmits(['closeSeting'])

const settingStore = useSettingStore()

function setBackground(e) {
    let imgFile = e.target.files[0];
    // 将图片保存至indexedDB
    setBackgroundImg(imgFile);
}

</script>

<template>
    <div class="setting-container">
        设置
        <input type="file" accept="image/*" @change="setBackground" />
        <button @click="settingStore.blurBackground=!settingStore.blurBackground">背景模糊</button>
        <button @click="emit('closeSeting')">导航</button>
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
</style>