<script setup>
import Time from '@/components/Time.vue'
import Date from '@/components/Date.vue'
import Copyright from '@/components/Copyright.vue'
import { useSettingStore } from '@/stores/setting'
import { copyrightInfo } from '@/utils/constant'
import SearchBar from '@/components/SearchBar.vue'
import { ref } from 'vue'

const settingStore = useSettingStore()
const emit = defineEmits(['openNavigate', 'openSearch'])
const suggest = ref([])

function searchBarInputUpdate(value) {
    console.log(value);
}

function doSearch() {
    console.log('do search');
}
</script>

<template>
    <div class="home-container">
        <div class="time-container" @click="emit('openNavigate')">
            <Time :show-time="settingStore.$state.showTime" :show-second="settingStore.$state.showSecond"
                :blink-semicolon="settingStore.$state.blinkSemicolon" :font-weight="settingStore.$state.timeFontWeight">
            </Time>
        </div>
        <div class="date-container">
            <Date :show-date="settingStore.$state.showDate"></Date>
        </div>
        <div class="search-bar-container">
            <SearchBar @focus-input="emit('openSearch')" @input-update="searchBarInputUpdate" @do-search="doSearch" :suggest-list="suggest"></SearchBar>
        </div>
        <div class="copyright-container">
            <Copyright :show-copyright="settingStore.$state.showCopyright" :copyright-info="copyrightInfo"></Copyright>
        </div>
    </div>
</template>

<style scpoed>
.home-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
}
.time-container {
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
    color: var(--primary-font-color);
}
.date-container {
    position: absolute;
    left: 50%;
    top: 160px;
    transform: translateX(-50%);
    color: var(--primary-font-color);
}
.search-bar-container {
    position: absolute;
    width: 530px;
    max-width: 80%;
    left: 50%;
    top: 200px;
    transform: translateX(-50%);
    color: var(--primary-font-color);
}
.copyright-container {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    color: var(--seconda-font-color);
}
</style>