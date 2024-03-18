<script setup>
import { ref } from 'vue'
import Select from './Select.vue'
import SelectItem from './SelectItem.vue'

const emit = defineEmits(['selectItem'])
const props = defineProps({
    value: String,
    list: Object,
})
const showList = ref(false)

function openDropList() {
    showList.value = !showList.value;
}

function selectItem(index) {
    emit('selectItem', index)
    showList.value = false
}

</script>

<template>
    <button class="drop-list-btn" @click="openDropList">{{ props.value }}</button>
    <div class="drop-list" v-show="showList">
        <Select v-show="showSuggest">
            <SelectItem v-for="(item, index) in props.list" :index="index" :label="item" @select="selectItem">
            </SelectItem>
        </Select>
    </div>
</template>

<style scoped>
.drop-list-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: auto;
    min-width: 60px;
    max-width: 70px;
    height: 30px;
    border-radius: 5px;
    padding: 0 5px;
    cursor: pointer;
    color: var(--primary-font-color);
    box-shadow: var(--common-box-shadow);
    background-color: var(--button-background-color);
    transition: .25s ease;
}

.drop-list-btn:hover {
    background-color: var(--button-hover-background-color);
}

.drop-list {
    width: 130px;
    padding: 10px;
    border-radius: 5px;
    backdrop-filter: var(--common-backdrop-filter);
    transition:.25s ease;
}
</style>