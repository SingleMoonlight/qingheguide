import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        backgroundUrl: 'https://cdn.ifback.com/website/qhGuide/guide_default_bg.jpg',
        themeMode: 'default',
        showTime: true,
        showSecond: false,
        blinkSemicolon: true,
        timeFontWeight: 'normal',
        showDate: true,
        showCopyright: true,
        blurBackground: true,
        searchEngine: 'baidu',
        openHistory: true,
        openSuggest: true,
        openSearchInNewPage: true,
    })
})
