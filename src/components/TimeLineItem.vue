<script setup>
const props = defineProps({
    time: String,
    des: String,
})
</script>

<template>
    <div class="time-line-item-container">
        <div class="time-line"></div>
        <div class="time-line-item-dot"></div>
        <div class="time-line-item-content">
            <div class="time-line-item-time">
                {{ props.time }}
            </div>
            <div class="time-line-item-des">
                {{ props.des }}
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.time-line-item-container {
    position: relative;
    color: var(--primary-font-color);
    font-size: 14px;
}

.time-line {
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: var(--time-line-background-color);
}

.time-line-item-dot {
    position: absolute;
    margin-top: 15px;
    margin-left: -2px;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background-color: var(--time-line-background-color);
}

.time-line-item-des {
    margin-bottom: 10px;
}

.time-line-item-content {
    margin-left: 10px;
    padding: 10px 0;
}
</style>