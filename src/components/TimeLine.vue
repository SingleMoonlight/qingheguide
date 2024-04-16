<script setup>

</script>

<template>
    <div class="time-line-container">
        <div class="time-line-arrow"></div>
        <slot></slot>
    </div>
</template>

<style scoped>
.time-line-container {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 10px;
}

.time-line-arrow::before {
    transform: rotate(40deg);
    content: "";
    position: absolute;
    margin-top: -2px;
    margin-left: -2px;
    width: 2px;
    height: 8px;
    border-radius: 2px;
    background-color: var(--time-line-background-color);
}

.time-line-arrow::after {
    transform: rotate(-40deg);
    margin-top: -2px;
    margin-left: 2px;
    content: "";
    position: absolute;
    width: 2px;
    height: 8px;
    border-radius: 2px;
    background-color: var(--time-line-background-color);
}
</style>