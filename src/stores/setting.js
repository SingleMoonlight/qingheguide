import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        backgroundUrl: 'https://cdn.ifback.com/website/qhGuide/guide_default_bg.jpg',
        showTime: true,
        showSecond: false,
        blinkSemicolon: true,
        timeFontWeight: 'normal',
        showDate: true,
        showCopyright: true,
        blurBackground: true,
        themeMode: 'default',
        searchEngine: 'Baidu',
    })
})
