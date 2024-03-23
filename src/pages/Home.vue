<script setup>
import Time from '@/components/Time.vue'
import Date from '@/components/Date.vue'
import Copyright from '@/components/Copyright.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useSettingStore } from '@/stores/setting'
import { copyrightInfo, searchEngineList } from '@/utils/constant'
import { getSearchSuggest } from '@/api/search'
import { useSearchHistoryStore } from '@/stores/searchHistory'
import { useFlagStore } from '@/stores/flag'
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

function searchBarInputUpdate(value) {
    // 注释掉可以解决拼音输入时无法选择建议的问题
    // suggest.value.splice(0, suggest.value.length);

    getSearchSuggest(value).then(res => {
        suggest.value = [...res];
    }).catch(err => {
    })
}

function searchEngineUpdate(index) {
    settingStore.$state.searchEngine = searchEngineList[index].iconName;
}

function doSearch(value) {
    let searchUrl = '';
    if (value === '') {
        return;
    }
    searchHistoryStore.historyAdd(value);
    if (settingStore.$state.searchEngine === 'custom') {
        searchUrl = settingStore.$state.customSearchEngineUrl;
    } else {
        searchUrl = searchEngineList.filter(obj => obj.iconName === settingStore.$state.searchEngine)[0].url;
    }

    if (searchUrl === '') {
        // 自定义搜索引擎为空，使用默认搜索引擎
        searchUrl = searchEngineList[0].url;
    }

    if (settingStore.$state.searchOpenMode === 'currentPage') {
        window.location.href = searchUrl + value;
    } else if (settingStore.$state.searchOpenMode === 'newPage') {
        window.open(searchUrl + value, '_blank');
    }
}
</script>

<template>
    <div class="home-container" @click="closeSearch" @contextmenu="emit('openNavigate')">
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
                @search-engine-update="searchEngineUpdate" :close-search="flagStore.$state.closeSearch"
                :search-engine="settingStore.$state.searchEngine" :search-engine-list="searchEngineList"
                :open-history="settingStore.$state.openHistory" :history-list="searchHistoryStore.$state.history"
                :open-suggest="settingStore.$state.openSuggest" :suggest-list="suggest">
            </SearchBar>
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
    color: var(--secondary-font-color);
}
</style>