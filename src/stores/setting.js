import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        backgroundUrl: 'https://cdn.ifback.com/website/qhGuide/guide_default_bg.jpg',
        theme: 'default',
        showTime: true,
        showSecond: false,
        blinkTimeSeparator: true,
        timeFontWeight: 'normal',
        showDate: true,
        showCopyright: true,
        blurBackground: true,
        searchEngine: 'baidu',
        customSearchEngineUrl: '',
        openHistory: true,
        openSuggest: true,
        searchOpenMode: 'newPage',
    })
})
