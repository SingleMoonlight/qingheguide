<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import SearchEngineIcon from '@/components/icons/SearchEngineIcon.vue'
import { useSettingStore } from '@/stores/setting'
import { ref } from 'vue'

const props = defineProps({
    historyList: Object,
    suggestList: Object,
})
const searchBarInputRef = ref()

const settingStore = useSettingStore()
const emit = defineEmits(['focusInput', 'inputUpdate', 'doSearch'])

function inputChange() {
    const searchInputDom = searchBarInputRef.value;
    const value = searchInputDom.value.trim();
    emit('inputUpdate', value);
}

function selectSuggest(index) {
    const searchInputDom = searchBarInputRef.value;
    searchInputDom.value = props.suggestList[index];
    searchInputDom.focus();
    emit('inputUpdate', props.suggestList[index]);
}

</script>

<template>
    <div class="search-bar-input-container">
        <input ref="searchBarInputRef" type="text" class="search-bar-input" placeholder="搜索" autocomplete="none" @focus="emit('focusInput')"
            @input="inputChange" @keydown.enter="emit('doSearch')">
        <button class="search-engine-btn" @click="emit('focusInput')">
            <SearchEngineIcon :engine-name="settingStore.$state.searchEngine"></SearchEngineIcon>
        </button>
        <button class="search-action-btn" @click="emit('doSearch')">
            <SearchIcon></SearchIcon>
        </button>
    </div>

    <div class="search-bar-suggest">
        <div v-for="(item, index) in props.suggestList" @click="selectSuggest(index)">
            {{ item }}
        </div>
    </div>
    <div class="search-bar-history">
        <div v-for="(item, index) in props.historyList">
            {{ item }}
        </div>
    </div>
</template>


<style scoped>
.search-bar-input-container {
    width: 100%;
    height: 43px;
    border: none;
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
    border: 0;
    border-radius: 40px;
    transition: .25s;
    background-color: transparent;
    cursor: pointer;
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
    border: 0;
    border-radius: 40px;
    transition: .25s;
    background-color: transparent;
    cursor: pointer;
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
</style>