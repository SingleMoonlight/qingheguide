import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        backgroundUrl: 'https://cdn.smilingly.cn/website/qhGuide/guide_default_bg.jpg',
        showTime: true,
        showSecond: false,
        blinkSemicolon: true,
        showDate: true,
        themeMode: 'default',
        searchEngine: 'Baidu',
    })
})
