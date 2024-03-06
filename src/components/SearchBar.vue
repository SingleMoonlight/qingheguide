<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import SearchEngineIcon from '@/components/icons/SearchEngineIcon.vue'
import { useSettingStore } from '@/stores/setting'

const props = defineProps({
    historyList: Object,
    suggestList: Object,
})

const settingStore = useSettingStore()
const emit = defineEmits(['focusInput', 'inputUpdate', 'doSearch'])

function inputChange() {
    const value = document.getElementsByClassName('search-bar-input')[0].value;
    emit('inputUpdate', value);
}

</script>

<template>
    <div class="search-bar-input-container">
        <input type="text" class="search-bar-input" @focus="emit('focusInput')" @input="inputChange">
        <button class="search-engine-btn" @click="emit('focusInput')">
            <SearchEngineIcon :engine-name="settingStore.$state.searchEngine"></SearchEngineIcon>
        </button>
        <button class="search-action-btn" @click="emit('doSearch')">
            <SearchIcon></SearchIcon>
        </button>
    </div>

    <div class="search-bar-suggest">
        搜索建议
    </div>
    <div class="search-bar-history">
        搜索历史
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
.search-action-btn{
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