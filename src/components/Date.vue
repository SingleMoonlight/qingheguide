<script setup>
import { onMounted, ref } from 'vue'
import { numLeftPadding } from '@/utils/common'
import { getLunar } from 'chinese-lunar-calendar'

const props = defineProps({
    showDate: Boolean,
})
const currentDate = ref({
    year: '',
    month: '',
    day: '',
    week: '',
    lunar: ''
})
const weekString = [
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
]

function getDate() {
    let date = new Date();
    currentDate.value.year = numLeftPadding(date.getFullYear(), 4, '0');
    currentDate.value.month = numLeftPadding(date.getMonth() + 1, 2, '0');
    currentDate.value.day = numLeftPadding(date.getDate(), 2, '0');
    currentDate.value.week = date.getDay();
    currentDate.value.lunar = getLunar(date.getFullYear(), date.getMonth() + 1, date.getDate()).dateStr;
}

onMounted(() => {
    getDate();
})

</script>

<template>
    <div class="date" v-show="props.showDate">
        {{ currentDate.year }}
        年
        {{ currentDate.month }}
        月
        {{ currentDate.day }}
        日
        {{ currentDate.lunar }}
        {{ weekString[currentDate.week] }}
    </div>
</template>

<style scpoed>
.date {
    font-size: 14px;
    font-weight: lighter;
    white-space: nowrap;
    text-align: center;
    display: inline-block;
    transition: .25s;
}
</style>
