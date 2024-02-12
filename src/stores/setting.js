import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        themeMode: 'Default',
        searchEngine: 'Baidu',
        //
    })
})
