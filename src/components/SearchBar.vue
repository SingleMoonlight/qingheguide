<script setup>
const emit = defineEmits(['focusInput'])

</script>

<template>
    <div class="search-bar-input-container">
        <input type="text" class="search-bar-input" @focus="emit('focusInput')">
        <button class="search-engine-btn" @click="emit('focusInput')">search engine</button>
        <button class="search-action-btn">do search</button>
    </div>

    <div class="search-bar-suggest">
        搜索建议
    </div>
    <div class="search-bar-history">
        搜索历史
    </div>
</template>


<style scoped>
.search-bar-input-container {
    width: 100%;
    height: 43px;
    border: none;
    border-radius: 30px;
    box-shadow: var(--common-box-shadow);
    backdrop-filter: var(--common-backdrop-filter);
    background-color: var(--commom-background-color);
}
.search-bar-input {
    width: 100%;
    height: 100%;
    padding: 0 48px;
    border: none;
    box-sizing: border-box;
    outline: 0;
    font-size: 14px;
    color: inherit; 
    background-color: transparent;
}
.search-engine-btn {
    position: absolute;
    left: 5px;
}
.search-action-btn{
    position: absolute;
    right: 5px;
}
</style>