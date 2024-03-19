<script setup>
import Switch from './Switch.vue'
import MoreIcon from './icons/MoreIcon.vue'

const emit = defineEmits(['switchOnoff', 'openNext'])
const props = defineProps({
    label: String,
    type: String,
    onoff: Boolean,
    next: Object,
    nextValue: String,
})

function clickSettingItem() {
    if (props.type === 'next') {
        emit('openNext');
    }
}

</script>

<template>
    <div class="setting-item" @click="clickSettingItem">
        <div class="setting-item-label">{{ props.label }}</div>
        <div v-if="props.type === 'switch'" class="setting-switch">
            <Switch :onoff="props.onoff" @change-onoff="emit('switchOnoff')"></Switch>
        </div>
        <div v-else-if="props.type === 'next'" class="setting-next">
            <div class="setting-next-value">{{ props.nextValue }}</div>
            <MoreIcon></MoreIcon>
        </div>
    </div>

</template>

<style scoped>
.setting-item {
    width: 100%;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: .25s;
}

.setting-item:hover {
    background: var(--item-hover-background-color);
}

.setting-item:active {
    background: var(--item-active-background-color);
}

.setting-item-label {
    display: block;
    line-height: 20px;
    font-size: 14px;
    color: var(--primary-font-color);
}

.setting-switch {
    display: block;
}

.setting-next {
    display: flex;
    align-items: center;
}

.setting-next-value {
    line-height: 20px;
    font-size: 14px;
    color: var(--secondary-font-color);
}

</style>
