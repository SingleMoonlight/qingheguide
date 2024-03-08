<script setup>
import Time from '@/components/Time.vue'
import Date from '@/components/Date.vue'
import Copyright from '@/components/Copyright.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useSettingStore } from '@/stores/setting'
import { copyrightInfo } from '@/utils/constant'
import { ref } from 'vue'
import { getSearchSuggest } from '@/api/search'
import { useSearchHistoryStore } from '@/stores/searchHistory'

const settingStore = useSettingStore()
const searchHistoryStore = useSearchHistoryStore()
const emit = defineEmits(['openNavigate', 'openSearch'])
const suggest = ref([])

function searchBarInputUpdate(value) {
    // 先删除，在获取，防止input change过快时suggest更新不及时，页面显示不正确
    // 比如input输入后快速删除，suggest数据依旧存在
    suggest.value.splice(0, suggest.value.length);

    getSearchSuggest(value).then(res => {
        suggest.value = [...res];
    }).catch(err => {
    })
}

function doSearch(value) {
    searchHistoryStore.historyAdd(value);
    console.log("search" + value);
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
            <SearchBar @focus-input="emit('openSearch')" @input-update="searchBarInputUpdate" @do-search="doSearch"
                :search-engine="settingStore.$state.searchEngine" :open-history="settingStore.$state.openHistory"
                :open-suggest="settingStore.$state.openSuggest" :suggest-list="suggest"
                :history-list="searchHistoryStore.$state.history"></SearchBar>
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