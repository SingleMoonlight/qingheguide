import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        backgroundUrl: 'https://cdn.smilingly.cn/website/qhGuide/guide_default_bg.jpg',
        themeMode: 'default',
        searchEngine: 'Baidu',
        //
    })
})
