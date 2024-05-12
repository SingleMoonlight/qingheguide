<script setup>
const emit = defineEmits(['change'])
const props = defineProps({
    checked: Boolean,
    label: String,
})

function changeChecked() {
    emit('change');
}

</script>

<template>
    <div class="checkbox-container">
        <input class="checkbox" type="checkbox" :checked="props.checked">
        <span class="checkmark" @click="changeChecked"></span>
        <div class="checkbox-label">
            {{ props.label }}
        </div>
    </div>
</template>

<style scoped>
.checkbox-container {
    display: flex;
    align-items: center;
}

.checkbox-container input[type="checkbox"] {
    display: none;
}

.checkbox-container .checkmark {
    cursor: pointer;
    min-width: 12px;
    min-height: 12px;
    background-color: transparent;
    margin-right: 8px;
    border-radius: 12px;
    border: 1px solid rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.checkbox-container .checkmark:after {
    content: "";
    background: rgb(255, 255, 255);
    width: 8px;
    height: 8px;
    border-radius: 8px;
    opacity: 0;
    transition: .25s;
}

.checkbox-container input[type="checkbox"]:checked+.checkmark:after {
    opacity: 1;
}

.checkbox-label {
    font-size: 14px;
    color: var(--secondary-font-color);
}
</style>