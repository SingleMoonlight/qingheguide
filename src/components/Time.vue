<script setup>
import { onMounted, onUnmounted } from 'vue'
import { ref } from 'vue'
import { numLeftPadding } from '@/utils/common'

const props = defineProps({
    showTime: Boolean,
    showSecond: Boolean,
    blinkSemicolon: Boolean
})
const currentTime = ref({
    hour: '',
    minute: '',
    second: ''
})

let currentTimeGetTimer = null
let time = null

function getCurrentTime() {
    time = new Date();
    // 不足两位左补0
    currentTime.value.hour = numLeftPadding(time.getHours(), 2, '0');
    currentTime.value.minute = numLeftPadding(time.getMinutes(), 2, '0');
    currentTime.value.second = numLeftPadding(time.getSeconds(), 2, '0');

    currentTimeGetTimer = setTimeout(() => {
        getCurrentTime();
    }, 1000);
}

function mouseenterTime(el) {
    el.srcElement.style.transform = 'scale(1.15)';
    setTimeout(() => {
        el.srcElement.style.transform = 'scale(1.1)';
    }, 250);
}

function mouseleaveTime(el) {
    el.srcElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        el.srcElement.style.transform = '';
    }, 250);
}

onMounted(() => {
    // 组件创建初始化渲染后就获取时间，防止刷新引起的时间获取延迟
    getCurrentTime();

    // 时间分隔符是否闪烁
    if (props.blinkSemicolon) {
        [...document.getElementsByClassName('time-semicolon')]
            .forEach(element => {
                element.style.animation = 'blink 1s infinite';
            });
    }
})

onUnmounted(() => {
    clearTimeout(currentTimeGetTimer);
})

</script>

<template>
    <div class="time" v-show="props.showTime" @mouseenter="mouseenterTime" @mouseleave="mouseleaveTime">
        {{ currentTime.hour }}
        <div class="time-semicolon">:</div>
        {{ currentTime.minute }}
        <div class="time-second" v-show="props.showSecond">
            <div class="time-semicolon">:</div>
            {{ currentTime.second }}
        </div>
    </div>
</template>

<style>
.time {
    font-size: 36px;
    font-weight: lighter;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    transition: .25s;
}

.time-semicolon {
    position: relative;
    bottom: 3px;
    display: inline-block;
}

.time-second {
    display: inline-block;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}
</style>