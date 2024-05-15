<script setup>
import CurrentTime from '@/components/CurrentTime.vue'
import TodayDate from '@/components/TodayDate.vue'
import CopyrightStatement from '@/components/CopyrightStatement.vue'
import SearchBar from '@/components/SearchBar.vue'
import { copyrightInfo, searchEngineList } from '@/utils/constant'
import { printLog } from '@/utils/common'
import { getSearchSuggest, doSearch } from '@/api/search'
import { useSettingStore } from '@/stores/settingStore'
import { useSearchHistoryStore } from '@/stores/searchHistoryStore'
import { useFlagStore } from '@/stores/flagStore'
import { ref } from 'vue'

const emit = defineEmits(['openSearch', 'closeSearch', 'openNavigate'])

const settingStore = useSettingStore()
const searchHistoryStore = useSearchHistoryStore()
const flagStore = useFlagStore()
const suggest = ref([])

function closeSearch(e) {
    if (e.currentTarget !== e.target) {
        // 不处理子元素的冒泡点击事件
        return;
    }
    emit('closeSearch');
}

function handleSearchBarInputUpdate(value) {
    // 注释掉可以解决拼音输入时无法选择建议的问题
    // suggest.value.splice(0, suggest.value.length);

    getSearchSuggest(value).then(res => {
        suggest.value = [...res];
        printLog('result', 'handleSearchBarInputUpdate getSearchSuggest', res)
    }).catch(err => {
        printLog('error', 'handleSearchBarInputUpdate getSearchSuggest', err)
    })
}

function handleSearchEngineUpdate(index) {
    settingStore.$state.searchEngine = searchEngineList[index].settingValue;
}

function clearSearchHistory() {
    searchHistoryStore.$state.history = [...[]];
}

function startSearch(value) {
    let searchUrl = '';
    if (value === '') {
        return;
    }
    searchHistoryStore.historyAdd(value);
    if (settingStore.$state.searchEngine === 'custom') {
        searchUrl = settingStore.$state.customSearchEngineUrl;
    } else {
        searchUrl = searchEngineList.filter(obj => obj.settingValue === settingStore.$state.searchEngine)[0].url;
    }

    if (searchUrl === '') {
        // 自定义搜索引擎为空，使用默认搜索引擎
        searchUrl = searchEngineList[0].url;
    }

    doSearch(searchUrl, value, settingStore.$state.searchOpenMode);
}
</script>

<template>
    <div class="home-container" @click="closeSearch" @contextmenu="emit('openNavigate')">
        <div class="time-container" @click="emit('openNavigate')">
            <CurrentTime :show-time="settingStore.showTime" :show-second="settingStore.showSecond"
                :blink-time-separator="settingStore.blinkTimeSeparator" :font-weight="settingStore.timeFontWeight">
            </CurrentTime>
        </div>
        <div class="date-container">
            <TodayDate :show-date="settingStore.showDate"></TodayDate>
        </div>
        <div class="search-bar-container">
            <SearchBar @focus-input="emit('openSearch')" @blur-input="emit('closeSearch')"
                @update-input="handleSearchBarInputUpdate" @start-search="startSearch"
                @update-search-engine="handleSearchEngineUpdate" @clear-search-history="clearSearchHistory"
                :auto-focus="settingStore.autoFocusSearchInput" :auto-clean="settingStore.autoCleanSearchInput"
                :close-search="flagStore.searchIsClose" :search-engine="settingStore.searchEngine"
                :search-engine-list="searchEngineList" :open-history="settingStore.openHistory"
                :history-list="searchHistoryStore.history" :open-suggest="settingStore.openSuggest"
                :suggest-list="suggest">
            </SearchBar>
        </div>
        <div class="copyright-container">
            <CopyrightStatement :show-copyright="settingStore.$state.showCopyright" :copyright-info="copyrightInfo">
            </CopyrightStatement>
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
    color: rgb(255, 255, 255);
}

.date-container {
    position: absolute;
    left: 50%;
    top: 160px;
    transform: translateX(-50%);
    color: rgb(255, 255, 255);
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
    color: rgb(255, 255, 255);
}
</style>