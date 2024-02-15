<script setup>
import Time from '@/components/Time.vue'
import Date from '@/components/Date.vue'
import Copyright from '@/components/Copyright.vue'
import { usePageStore } from '@/stores/page'
import { useSettingStore } from '@/stores/setting'
import { copyrightInfo } from '@/utils/constant'

const pageStore = usePageStore()
const settingStore = useSettingStore()

</script>

<template>
    <div class="home-container">
        <button @click="pageStore.pageForward('Setting')">goto Setting</button>

        <div class="time-container">
            <Time :show-time="settingStore.$state.showTime" :show-second="settingStore.$state.showSecond"
                :blink-semicolon="settingStore.$state.blinkSemicolon">
            </Time>
        </div>
        <div class="date-container">
            <Date :show-date="settingStore.$state.showDate"></Date>
        </div>
        <div class="copyright-container">
            <Copyright :show-copyright="settingStore.$state.showCopyright" :copyright-info="copyrightInfo"></Copyright>
        </div>
    </div>
</template>

<style>
.home-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
}
.time-container {
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
    color: var(--primary-font-color);
}
.date-container {
    position: absolute;
    left: 50%;
    top: 160px;
    transform: translateX(-50%);
    color: var(--primary-font-color);
}
.copyright-container {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    color: var(--seconda-font-color);
}
</style>