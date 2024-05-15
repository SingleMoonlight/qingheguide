import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        bgUrl: 'https://cdn.ifback.com/website/qhGuide/guide_default_bg.jpg',
        bgSource: 'default',
        theme: 'default',
        showTime: true,
        showSecond: false,
        blinkTimeSeparator: true,
        timeFontWeight: 'normal',
        showDate: true,
        showCopyright: true,
        showBgBlurMask: true,
        showBgBrightnessMask: false,
        searchEngine: 'baidu',
        customSearchEngineUrl: '',
        openHistory: true,
        openSuggest: true,
        searchOpenMode: 'new',
        autoFocusSearchInput: false,
        autoCleanSearchInput: false,
        showWeather: true,
        weatherLocationMode: 'custom',
        webAppGroupIndex: 0,
        circularSliding: true,
        flippingEffect: 'slide',
        webAppOpenMode: 'new',
        showWebAppName: true,
        deleteWebAppNotice: true,
        deleteWebAppGroupNotice: true,
    })
})
