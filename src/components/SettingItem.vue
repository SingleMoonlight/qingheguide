<script setup>
import Switch from './Switch.vue'
import DropList from './DropList.vue'

const emit = defineEmits(['switchOnoff', 'selectItem', 'clickBtn'])
const props = defineProps({
    label: String,
    des: String,
    type: String,
    isFirst: Boolean,
    isLast: Boolean,
    onoff: Boolean,
    list: Object,
    btnValue: String,
    listValue: String,
})
</script>

<template>
    <div class="setting-item">
        <div v-if="props.isFirst" class="setting-padding"></div>
        <div class="setting-item-label">{{ props.label }}</div>
        <div class="setting-item-des">{{ props.des }}</div>
        <div v-if="props.type === 'switch'" class="setting-switch">
            <Switch :onoff="props.onoff" @change-onoff="emit('switchOnoff')"></Switch>
        </div>
        <div v-else-if="props.type === 'button'">
            <button class="setting-button" @click="emit('clickBtn')">{{ props.btnValue }}</button>
        </div>
        <div v-else-if="props.type === 'list'">
            <DropList :value="props.listValue" :list="props.list"></DropList>
        </div>
        <div v-if="props.des === undefined && props.isLast" class="setting-padding"></div>
    </div>

</template>

<style scoped>
.setting-item {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
}

.setting-item-label {
    display: block;
    line-height: 20px;
    width: calc(100% - 70px);
    font-size: 14px;
    color: var(--primary-font-color);
}

.setting-item-des {
    display: block;
    width: calc(100% - 70px);
    font-size: 12px;
    color: var(--secondary-font-color);
}

.setting-switch {
    position: absolute;
    top: 10px;
    right: 10px;
}

.setting-button {
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

.setting-button:hover {
    background: var(--button-hover-background-color);
}

.setting-padding {
    height: 15px;
}
</style>
