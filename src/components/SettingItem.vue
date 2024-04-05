<script setup>
import SwitchOnoff from './SwitchOnoff.vue'
import MoreIcon from './icons/MoreIcon.vue'
import CheckedIcon from './icons/CheckedIcon.vue'
import ButtonWrap from './ButtonWrap.vue'
import { ref } from 'vue'

const emit = defineEmits(['switchOnoff', 'openNext', 'checkedListItem', 'ensureInput'])
const props = defineProps({
    label: String,
    type: String,
    onoff: Boolean,
    next: Object,
    nextValue: String,
    checked: Boolean,
    inputValue: String,
})
const settingInputRef = ref()

function clickSettingItem() {
    if (props.type === 'next') {
        emit('openNext');
    } else if (props.type === 'list') {
        emit('checkedListItem');
    }
}

function settingInputEnsure() {
    let settingInputDom = settingInputRef.value;

    emit('ensureInput', settingInputDom.value.trim());
}

</script>

<template>
    <div class="setting-item" @click="clickSettingItem">
        <div class="setting-item-label">{{ props.label }}</div>
        <div v-if="props.type === 'switch'" class="setting-switch">
            <SwitchOnoff :onoff="props.onoff" @change-onoff="emit('switchOnoff')"></SwitchOnoff>
        </div>
        <div v-else-if="props.type === 'next'" class="setting-next">
            <div class="setting-next-value">{{ props.nextValue }}</div>
            <MoreIcon></MoreIcon>
        </div>
        <div v-else-if="props.type === 'list'">
            <Transition mode="out-in" name="fade">
                <div v-show="props.checked" class="setting-list-item-checked-icon">
                    <CheckedIcon></CheckedIcon>
                </div>
            </Transition>
        </div>
        <div v-else-if="props.type === 'input'" class="setting-input-container">
            <input ref="settingInputRef" class="setting-input" :placeholder="'请输入'" />
            <ButtonWrap :type="'icon'" @click="settingInputEnsure">
                <CheckedIcon></CheckedIcon>
            </ButtonWrap>
        </div>
    </div>

</template>

<style scoped>
.setting-item {
    width: 100%;
    height: 40px;
    padding: 10px;
    border-radius: 10px;
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
    max-width: 50%;
    line-height: 20px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--primary-font-color);
}

.setting-switch {
    display: block;
}

.setting-next {
    max-width: 50%;
    display: flex;
    align-items: center;
}

.setting-next-value {
    line-height: 20px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--secondary-font-color);
}


.setting-list-item-checked-icon {
    display: flex;
    align-items: center;
    transition: .25s;
}

.setting-input-container {
    display: flex;
    align-items: center;
    flex: 0.8;
    min-width: 60px;
}

.setting-input {
    width: 100%;
    height: 100%;
    min-width: 10px;
    box-sizing: border-box;
    font-size: 14px;
    color: inherit;
    background-color: transparent;
}
</style>
