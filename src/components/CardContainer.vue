<script setup>
const props = defineProps({
    cardName: String,
    cardDes: String,
})
</script>

<template>
    <div class="card">
        <div class="card-name">
            {{ props.cardName }}
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
        <div class="card-des">
            {{ props.cardDes }}
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 100%;
    padding: 0 0 10px 0;
}

.card-name {
    padding: 0 0 10px 0;
    font-size: 16px;
}

.card-body {
    width: 100%;
    border-radius: 10px;
    background: var(--card-background-color);
    box-shadow: var(--common-box-shadow);
    overflow: hidden;
}

.card-des {
    padding: 10px;
    color: var(--secondary-font-color);
    font-size: 12px;
}
</style>