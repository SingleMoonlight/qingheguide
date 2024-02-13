<script setup>
import { useSettingStore } from '@/stores/setting'
import { MutationType } from 'pinia'
import { usePageStore } from '@/stores/page'
import { getLocalSetting, setLocalSetting } from '@/utils/localStorage'


const pageStore = usePageStore()
const settingStore = useSettingStore()

settingStore.$subscribe((mutation, state) => {
    // 每当状态发生变化时，将整个 state 持久化到本地存储
    setLocalSetting(state)
}, { detached: true })

function changeTheme() {
    settingStore.$state.themeMode = 'default'
    document.getElementById("app").setAttribute("class", settingStore.$state.themeMode)
}


</script>

<template>
    <div class="setting-container">
        Setting
        <button @click="changeTheme">change theme</button>
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