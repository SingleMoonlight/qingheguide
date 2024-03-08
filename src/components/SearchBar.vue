<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import SearchEngineIcon from '@/components/icons/SearchEngineIcon.vue'
import { ref } from 'vue'

const emit = defineEmits(['focusInput', 'inputUpdate', 'doSearch'])
const props = defineProps({
    searchEngine: String,
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

function focusInput() {
    const searchInputDom = searchBarInputRef.value;
    const value = searchInputDom.value.trim();

    searchInputDom.focus();
    emit('focusInput');

    showHistory.value = value.trim() === '';
    showSuggest.value = value.trim() !== '';
}

function blurInput() {
    showHistory.value = false;
    showSuggest.value = false;
}

function inputChange() {
    const searchInputDom = searchBarInputRef.value;
    const value = searchInputDom.value.trim();

    emit('inputUpdate', value);

    showHistory.value = value.trim() === '';
    showSuggest.value = value.trim() !== '';
}

function selectSuggest(index) {
    const searchInputDom = searchBarInputRef.value;
    searchInputDom.value = props.suggestList[index];
    searchInputDom.focus();

    emit('inputUpdate', props.suggestList[index]);
}

function doSearch() {
    const searchInputDom = searchBarInputRef.value;
    const value = searchInputDom.value.trim();

    emit('doSearch', value);
}

</script>

<template>
    <div class="search-bar-input-container">
        <input ref="searchBarInputRef" type="text" class="search-bar-input" placeholder="搜索" autocomplete="none"
            @focus="focusInput" @blur="blurInput" @input="inputChange" @keydown.enter="doSearch">
        <button class="search-engine-btn" @click="focusInput">
            <SearchEngineIcon :engine-name="props.searchEngine"></SearchEngineIcon>
        </button>
        <button class="search-action-btn" @click="doSearch">
            <SearchIcon></SearchIcon>
        </button>
    </div>

    <div ref="searchSuggestRef" class="search-bar-suggest-container" v-show="props.openSuggest">
        <div v-show="showSuggest">
            <div v-for="(item, index) in props.suggestList" @click="selectSuggest(index)">
                {{ item }}
            </div>
        </div>
    </div>
    <div ref="searchHistoryRef" class="search-bar-history-container" v-show="props.openHistory">
        <div v-show="showHistory">
            <div v-for="(item, index) in props.historyList">
                {{ item }}
            </div>
        </div>
    </div>
</template>


<style scoped>
.search-bar-input-container {
    width: 100%;
    height: 43px;
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
    width: 33px;
    height: 33px;
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
    width: 33px;
    height: 33px;
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

.search-bar-suggest-container {
    width: 100%;
    margin-top: 10px;
    background-color: var(--commom-background-color);
}

.search-bar-history-container {
    width: 100%;
    margin-top: 10px;
    background-color: var(--commom-background-color);
}
</style>