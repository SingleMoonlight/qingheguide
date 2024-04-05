<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import SearchEngineIcon from '@/components/icons/SearchEngineIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import SelectList from './SelectList.vue'
import SelectItem from './SelectItem.vue'
import ButtonWrap from './ButtonWrap.vue'
import { watch, ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['focusInput', 'blurInput', 'inputUpdate', 'doSearch', 'searchEngineUpdate', 'clearSearchHistory'])
const props = defineProps({
    autoFocus: Boolean,
    closeSearch: Boolean,
    searchEngine: String,
    searchEngineList: Object,
    openHistory: Boolean,
    openSuggest: Boolean,
    historyList: Object,
    suggestList: Object,
})
const searchBarInputRef = ref()
const showHistory = ref(false)
const showSuggest = ref(false)
const showEngine = ref(false)
const searchSuggestIndex = ref(-1)
const searchHistoryIndex = ref(-1)

function focusInput() {
    let searchInputDom = searchBarInputRef.value;
    let value = searchInputDom.value.trim();

    searchInputDom.focus();
    emit('focusInput');

    showHistory.value = value.trim() === '';
    showSuggest.value = value.trim() !== '';
    showEngine.value = false;
}

function blurInput() {
    let searchInputDom = searchBarInputRef.value;

    searchInputDom.value = '';
    searchInputDom.blur();
    emit('blurInput');

    showHistory.value = false;
    showSuggest.value = false;
    showEngine.value = false;

    searchSuggestIndex.value = -1;
    searchHistoryIndex.value = -1;
}

function searchInputChange() {
    let searchInputDom = searchBarInputRef.value;
    let value = searchInputDom.value.trim();

    emit('inputUpdate', value);

    showHistory.value = value.trim() === '';
    searchHistoryIndex.value = -1;

    // 输入改变时，不显示建议，触发消失动画，当搜索建议获取成功后，触发出现动画
    showSuggest.value = false;
}

function selectSearchSuggest(index) {
    let searchInputDom = searchBarInputRef.value;
    searchInputDom.value = props.suggestList[index];
    searchInputDom.focus();

    emit('inputUpdate', props.suggestList[index]);
    showSuggest.value = false;
}

function selectSearchHistory(index) {
    let searchInputDom = searchBarInputRef.value;
    searchInputDom.value = props.historyList[index];
    searchInputDom.focus();

    emit('inputUpdate', props.historyList[index]);
}

function clearSearchHistory() {
    emit('clearSearchHistory');

    showHistory.value = false;
}

function goToSearch() {
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
    return props.searchEngineList.filter(obj => obj.engine === searchEngine)[0].iconName;
}

function getNextSearchEngineIndex(currentSearchEngine) {
    let index = 0;

    props.searchEngineList.forEach((obj, i) => {
        if (obj.engine === currentSearchEngine) {
            index = (i + 1) % (props.searchEngineList.length);
        }
    });

    return index;
}

function handleArrowUp() {
    let searchInputDom = searchBarInputRef.value;

    if (showSuggest.value && props.suggestList.length > 0) {
        if (searchSuggestIndex.value === -1) {
            searchSuggestIndex.value = props.suggestList.length - 1;
        } else {
            searchSuggestIndex.value = (searchSuggestIndex.value - 1 + props.suggestList.length) % props.suggestList.length;
        }
        searchInputDom.value = props.suggestList[searchSuggestIndex.value];
    }
    if (showHistory.value && props.historyList.length > 0) {
        if (searchHistoryIndex.value === -1) {
            searchHistoryIndex.value = props.historyList.length - 1;
        } else {
            searchHistoryIndex.value = (searchHistoryIndex.value - 1 + props.historyList.length) % props.historyList.length;
        }
        searchInputDom.value = props.historyList[searchHistoryIndex.value];
    }

    searchInputDom.focus();
}

function handleArrowDown() {
    let searchInputDom = searchBarInputRef.value;

    if (showSuggest.value && props.suggestList.length > 0) {
        if (searchSuggestIndex.value === -1) {
            searchSuggestIndex.value = 0;
        } else {
            searchSuggestIndex.value = (searchSuggestIndex.value + 1) % props.suggestList.length;
        }
        searchInputDom.value = props.suggestList[searchSuggestIndex.value];
    }
    if (showHistory.value && props.historyList.length > 0) {
        if (searchHistoryIndex.value === -1) {
            searchHistoryIndex.value = 0;
        } else {
            searchHistoryIndex.value = (searchHistoryIndex.value + 1) % props.historyList.length;
        }
        searchInputDom.value = props.historyList[searchHistoryIndex.value];
    }

    searchInputDom.focus();
}

function keyHandler(e) {
    if (e.code === 'Space') {
        focusInput();
    } else if (e.code === 'Escape') {
        blurInput();
    } else if (e.code === 'Tab') {
        selectSearchEngine(getNextSearchEngineIndex(props.searchEngine));
    } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        handleArrowUp();
    } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        handleArrowDown();
    }
}

onMounted(() => {
    window.addEventListener('keydown', keyHandler);
})

onUnmounted(() => {
    window.removeEventListener('keydown', keyHandler);
})

watch(() => props.suggestList, (newValue) => {
    showSuggest.value = newValue.length > 0;
})

watch(() => props.autoFocus, (newValue) => {
    if (newValue) {
        focusInput();
    }
})

watch(() => props.closeSearch, (newValue) => {
    // 关闭搜索
    if (newValue) {
        blurInput();
    }
})

</script>

<template>
    <div class="search-bar-input-container">
        <ButtonWrap :type="'icon'" @click="openSearchEngineMenu">
            <SearchEngineIcon :icon-name="getSearchEngineIconName(props.searchEngine)"></SearchEngineIcon>
        </ButtonWrap>
        <input ref="searchBarInputRef" type="text" class="search-bar-input" placeholder="搜索" autocomplete="none"
            @focus="focusInput" @input="searchInputChange" @keydown.enter="goToSearch">
        <ButtonWrap :type="'icon'" @click="goToSearch">
            <SearchIcon></SearchIcon>
        </ButtonWrap>
    </div>
    <div class="search-engine-container">
        <SelectList :show="showEngine" :transition="'extension-from-left-top'">
            <SelectItem v-for="(item, index) in props.searchEngineList" :key="index" :index="index" :label="item.name"
                @select="selectSearchEngine">
                <div class="search-engine-item-icon">
                    <SearchEngineIcon :icon-name="item.iconName"></SearchEngineIcon>
                </div>
                <div class="search-engine-item-label">{{ item.name }}</div>
            </SelectItem>
        </SelectList>
    </div>
    <div class="search-suggest-container" v-show="props.openSuggest">
        <SelectList :show="showSuggest" :transition="'stretch'">
            <SelectItem v-for="(item, index) in props.suggestList" :key="index" :index="index" :label="item"
                :focus="index === searchSuggestIndex" @select="selectSearchSuggest">
            </SelectItem>
        </SelectList>
    </div>
    <div class="search-history-container" v-show="props.openHistory">
        <SelectList :show="showHistory" :transition="'stretch'">
            <SelectItem v-for="(item, index) in props.historyList" :key="index" :index="index" :label="item"
                :focus="index === searchHistoryIndex" @select="selectSearchHistory">
            </SelectItem>
            <SelectItem class="search-history-clear-item" v-if="props.historyList.length > 0"
                @select="clearSearchHistory">
                <div class="search-history-clear-label">清除搜索历史</div>
                <div class="search-history-clear-icon">
                    <DeleteIcon></DeleteIcon>
                </div>
            </SelectItem>
        </SelectList>
    </div>
</template>


<style scoped>
.search-bar-input-container {
    width: 100%;
    height: 42px;
    border-radius: 30px;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: var(--common-box-shadow);
    backdrop-filter: var(--common-backdrop-filter);
    background-color: var(--common-background-color);
}

.search-bar-input {
    width: 100%;
    height: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    font-size: 14px;
    color: inherit;
    background-color: transparent;
}

.search-engine-container {
    position: absolute;
    width: 130px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: var(--common-background-color);
    backdrop-filter: var(--common-backdrop-filter);
}

.search-engine-item-icon {
    width: 20px;
    height: 20px;
    padding-right: 10px;
}

.search-engine-item-label {
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.search-suggest-container {
    position: absolute;
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
    background-color: var(--common-background-color);
    backdrop-filter: var(--common-backdrop-filter);
}

.search-history-container {
    position: absolute;
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
    background-color: var(--common-background-color);
    backdrop-filter: var(--common-backdrop-filter);
}

.search-history-clear-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.search-history-clear-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-history-clear-label {
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>