<script setup>
const emit = defineEmits(['select'])
const props = defineProps({
    index: Number,
    label: String,
})

function select() {
    emit('select', props.index);
}

</script>

<template>
    <div class="select-item" @click="select">
        <slot>
            {{ props.label }}
        </slot>
    </div>

</template>

<style scoped>
.select-item {
    width: 100%;
    height: 36px;
    line-height: 20px;
    padding: 8px 20px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    box-sizing: border-box;
    color: var(--common-font-color);
    transition: .25s;
}

.select-item:hover {
    padding-left: 10px;
    background: var(--select-item-hover-background-color);
}

.select-item:active {
    background: var(--select-item-active-background-color);
    transform: scale(0.99, 0.99);
    transition: .25s;
}
</style>