<script setup>
import { watch, ref } from 'vue';

const emit = defineEmits(['select'])
const props = defineProps({
    index: Number,
    label: String,
    focus: Boolean,
})
const selectItemRef = ref()

function select() {
    emit('select', props.index);
}

watch(() => props.focus, (newValue) => {
    if (newValue) {
        selectItemRef.value.classList.add('select-item-focus');
    } else {
        selectItemRef.value.classList.remove('select-item-focus');
    }
})

</script>

<template>
    <div ref="selectItemRef" class="select-item" @click="select">
        <slot>
            <div class="select-item-label">
                {{ props.label }}
            </div>
        </slot>
    </div>

</template>

<style scoped>
.select-item {
    width: 100%;
    height: 36px;
    line-height: 20px;
    padding: 8px 20px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: var(--common-font-color);
    transition: .25s;
}

.select-item-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.select-item:hover {
    padding-left: 10px;
    background: var(--item-hover-background-color);
}

.select-item:active {
    background: var(--item-active-background-color);
    transform: scale(0.95);
    transition: .25s;
}

.select-item-focus {
    padding-left: 10px;
    background: var(--item-hover-background-color);
}
</style>