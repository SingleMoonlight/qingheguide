<script setup>
const emit = defineEmits(['click'])
const props = defineProps({
    type: String,
    text: String,
    hoverColor: String,
    activeColor: String,
})

function handelMouseEnter(event) {
    if (props.hoverColor !== '' && props.hoverColor !== undefined) {
        event.target.style.backgroundColor = props.hoverColor;
    }
}

function handelMouseLeave(event) {
    if (props.hoverColor !== '' && props.hoverColor !== undefined) {
        event.target.style.backgroundColor = '';
    }
}

function handelMouseDown(event) {
    if (props.activeColor !== '' && props.activeColor !== undefined && event.button === 0) {
        event.target.style.backgroundColor = props.activeColor;
    }
}

function handelMouseUp(event) {
    if (props.hoverColor !== '' && props.hoverColor !== undefined && event.button === 0) {
        event.target.style.backgroundColor = props.hoverColor;
    }
}

</script>

<template>
    <button v-if="props.type === 'icon'" class="icon-btn" @mouseenter="handelMouseEnter" @mouseleave="handelMouseLeave"
        @mousedown="handelMouseDown" @mouseup="handelMouseUp" @click="emit('click')" @click.stop>
        <slot></slot>
    </button>
    <button v-if="props.type === 'text'" class="text-btn" @mouseenter="handelMouseEnter" @mouseleave="handelMouseLeave"
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
    background-color: var(--button-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-btn:hover {
    background-color: var(--button-hover-background-color);
}

.icon-btn:active {
    background-color: var(--button-active-background-color);
}

.text-btn {
    min-width: 60px;
    min-height: 30px;
    border-radius: 5px;
    transition: .25s;
    box-shadow: var(--common-box-shadow);
    backdrop-filter: var(--common-backdrop-filter);
    background-color: var(--common-background-color);
    color: var(--primary-font-color);
}

.text-btn:hover {
    background-color: var(--button-hover-background-color);
}

.text-btn:active {
    background-color: var(--button-active-background-color);
}
</style>