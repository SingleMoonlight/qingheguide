<script setup>
const props = defineProps({
    type: String,
})

</script>

<template>
    <div class="update-tag" v-if="props.type === 'fix'" style="background-color: rgba(252, 208, 0, 0.4);">
        修复
    </div>
    <div class="update-tag" v-else-if="props.type === 'opt'" style="background-color: rgba(71, 207, 115, 0.4);">
        优化
    </div>
    <div class="update-tag" v-else-if="props.type === 'add'" style="background-color: rgba(14, 190, 255, 0.4);">
        新增
    </div>
    <div class="update-tag" v-else-if="props.type === 'del'" style="background-color: rgba(255, 60, 65, 0.4);">
        移除
    </div>
</template>

<style scoped>
.update-tag {
    min-width: 24px;
    height: 16px;
    margin-top: 1px;
    padding: 0 3px;
    border-radius: 4px;
    font-size: 12px;
    color: var(--primary-font-color);
}
</style>