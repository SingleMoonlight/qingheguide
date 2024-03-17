<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import SearchEngineIcon from '@/components/icons/SearchEngineIcon.vue'
import Select from './Select.vue'
import SelectItem from './SelectItem.vue'
import { watch, ref } from 'vue'

const emit = defineEmits(['focusInput', 'inputUpdate', 'doSearch', 'searchEngineUpdate'])
const props = defineProps({
    closeSearch: Boolean,
    searchEngine: String,
    searchEngineList: Object,
    openHistory: Boolean,
    openSuggest: Boolean,
    historyList: Object,
    suggestList: Object,
})
const searchBarInputRef = ref()
const searchSuggestRef = ref()
const searchHistoryRef = ref()
const showHistory = ref(false)
const showSuggest = ref(false)
const showEngine = ref(false)

function focusInput() {
    let searchInputDom = searchBarInputRef.value;
    let value = searchInputDom.value.trim();

    searchInputDom.focus();
    emit('focusInput');

    showHistory.value = value.trim() === '';
    showSuggest.value = value.trim() !== '';
    showEngine.value = false;
}

function inputChange() {
    let searchInputDom = searchBarInputRef.value;
    let value = searchInputDom.value.trim();

    emit('inputUpdate', value);

    showHistory.value = value.trim() === '';
    showSuggest.value = value.trim() !== '';
}

function selectSuggest(index) {
    let searchInputDom = searchBarInputRef.value;
    searchInputDom.value = props.suggestList[index];
    searchInputDom.focus();

    emit('inputUpdate', props.suggestList[index]);
}

function selectHistory(index) {
    let searchInputDom = searchBarInputRef.value;
    searchInputDom.value = props.historyList[index];
    searchInputDom.focus();

    emit('inputUpdate', props.historyList[index]);
}

function doSearch() {
    let searchInputDom = searchBarInputRef.value;
    let value = searchInputDom.value.trim();

    emit('doSearch', value);
}

function openSearchEngineMenu() {
    let searchInputDom = searchBarInputRef.value;

    emit('focusInput');

    showHistory.value = false;
    showSuggest.value = false;
    showEngine.value = !showEngine.value;
    if (!showEngine.value) {
        searchInputDom.focus();
    }
}

function selectSearchEngine(index) {
    emit('searchEngineUpdate', index);
    showEngine.value = false;
}

function getSearchEngineIconName(searchEngine) {
    return searchEngine;
}

watch(() => props.closeSearch, (newValue) => {
    let searchInputDom = searchBarInputRef.value;

    // 关闭搜索
    if (newValue) {
        searchInputDom.value = '';

        showHistory.value = false;
        showSuggest.value = false;
        showEngine.value = false;
    }
})

</script>

<template>
    <div class="search-bar-input-container">
        <input ref="searchBarInputRef" type="text" class="search-bar-input" placeholder="搜索" autocomplete="none"
            @focus="focusInput" @input="inputChange" @keydown.enter="doSearch">
        <button class="search-engine-btn" @click="openSearchEngineMenu">
            <SearchEngineIcon :icon-name="getSearchEngineIconName(props.searchEngine)"></SearchEngineIcon>
        </button>
        <button class="search-action-btn" @click="doSearch">
            <SearchIcon></SearchIcon>
        </button>
    </div>
    <div class="search-engine-container">
        <Select v-show="showEngine">
            <SelectItem v-for="(item, index) in props.searchEngineList" :index="index" :label="item.name"
                @select="selectSearchEngine">
                <div class="search-engine-item-icon">
                    <SearchEngineIcon :icon-name="item.iconName"></SearchEngineIcon>
                </div>
                <div class="search-engine-item-label">{{ item.name }}</div>
            </SelectItem>
        </Select>
    </div>
    <div ref="searchSuggestRef" class="search-suggest-container" v-show="props.openSuggest">
        <Select v-show="showSuggest">
            <SelectItem v-for="(item, index) in props.suggestList" :index="index" :label="item" @select="selectSuggest">
            </SelectItem>
        </Select>
    </div>
    <div ref="searchHistoryRef" class="search-history-container" v-show="props.openHistory">
        <Select v-show="showHistory">
            <SelectItem v-for="(item, index) in props.historyList" :index="index" :label="item" @select="selectHistory">
            </SelectItem>
        </Select>
    </div>
</template>


<style scoped>
.search-bar-input-container {
    width: 100%;
    height: 42px;
    border-radius: 30px;
    box-shadow: var(--common-box-shadow);
    backdrop-filter: var(--common-backdrop-filter);
    background-color: var(--commom-background-color);
}

.search-bar-input {
    width: 100%;
    height: 100%;
    padding: 0 48px;
    border: none;
    box-sizing: border-box;
    outline: 0;
    font-size: 14px;
    color: inherit;
    background-color: transparent;
}

.search-engine-btn {
    position: absolute;
    width: 32px;
    height: 32px;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 40px;
    transition: .25s;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-action-btn {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 40px;
    transition: .25s;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-action-btn:hover {
    background-color: var(--icon-hover-background-color);
}

.search-engine-btn:hover {
    background-color: var(--icon-hover-background-color);
}

.search-engine-container {
    width: 130px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: var(--commom-background-color);
    backdrop-filter: var(--common-backdrop-filter);
}

.search-engine-item-icon {
    width: 20px;
    height: 20px;
    padding-right: 10px;
    float: left;
}

.search-engine-item-label {
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.search-suggest-container {
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
    background-color: var(--commom-background-color);
    backdrop-filter: var(--common-backdrop-filter);
}

.search-history-container {
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
    background-color: var(--commom-background-color);
    backdrop-filter: var(--common-backdrop-filter);
}
</style>