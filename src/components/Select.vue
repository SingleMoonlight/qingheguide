<script setup>

</script>

<template>
    <div class="select">
        <slot></slot>
    </div>
</template>

<style scoped>
.select {
    width: 100%;
    border-radius: 10px;
    background: var(--commom-background-color);
    box-shadow: var(--common-box-shadow);
    overflow: hidden;
}
</style>