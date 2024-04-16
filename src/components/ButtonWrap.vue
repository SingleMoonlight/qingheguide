<script setup>
import { ref } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
    type: String,
    text: String,
    hoverColor: String,
    activeColor: String,
})
const buttonWrapRef = ref()
let buttonDefaultBgColor = ''

function handelMouseEnter() {
    buttonDefaultBgColor = window.getComputedStyle(buttonWrapRef.value).backgroundColor;

    if (props.hoverColor !== '' && props.hoverColor !== undefined) {
        buttonWrapRef.value.style.backgroundColor = props.hoverColor;
    }
}

function handelMouseLeave() {
    if (props.hoverColor !== '' && props.hoverColor !== undefined) {
        buttonWrapRef.value.style.backgroundColor = buttonDefaultBgColor;
    }
}

function handelMouseDown() {
    if (props.activeColor !== '' && props.activeColor !== undefined && event.button === 0) {
        buttonWrapRef.value.style.backgroundColor = props.activeColor;
    }
}

function handelMouseUp(event) {
    if (props.hoverColor !== '' && props.hoverColor !== undefined && event.button === 0) {
        buttonWrapRef.value.style.backgroundColor = props.hoverColor;
    }
}

</script>

<template>
    <button ref="buttonWrapRef" v-if="props.type === 'icon'" class="icon-btn" @mouseenter="handelMouseEnter" @mouseleave="handelMouseLeave"
        @mousedown="handelMouseDown" @mouseup="handelMouseUp" @click="emit('click')" @click.stop>
        <slot></slot>
    </button>
    <button ref="buttonWrapRef" v-if="props.type === 'text'" class="text-btn" @mouseenter="handelMouseEnter" @mouseleave="handelMouseLeave"
        @mousedown="handelMouseDown" @mouseup="handelMouseUp" @click="emit('click');" @click.stop>
        {{ props.text }}
    </button>
</template>


<style scoped>
.icon-btn {
    min-width: 32px;
    min-height: 32px;
    border-radius: 40px;
    transition: .25s;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-btn:hover {
    background-color: var(--icon-button-hover-background-color);
}

.icon-btn:active {
    background-color: var(--icon-button-active-background-color);
}

.text-btn {
    min-width: 60px;
    min-height: 30px;
    padding: 0 16px;
    border-radius: 5px;
    transition: .25s;
    box-shadow: var(--common-box-shadow);
    backdrop-filter: var(--common-backdrop-filter);
    background-color: var(--text-button-background-color);
    color: var(--primary-font-color);
    font-size: 14px;
}

.text-btn:hover {
    background-color: var(--text-button-hover-background-color);
}

.text-btn:active {
    background-color: var(--text-button-active-background-color);
}
</style>